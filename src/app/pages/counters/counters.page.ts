import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MissionService } from "src/app/models/mission/mission.service";
import { CounterService } from "src/app/models/counter/counter.service";
import { Counter } from "src/app/models/counter/counter";
import { CountersCalculation } from "src/app/models/counter/counters-calculation";
import { Mission } from "src/app/models/mission/mission";
import { CountersCalculationServant } from "src/app/models/counter/counters-calculation.servant";
import { AlertService } from "src/app/alert.service";

@Component({
  selector: "app-counters",
  templateUrl: "./counters.page.html",
  styleUrls: ["./counters.page.scss"],
})
export class CountersPage implements OnInit {
  mission: Mission = {} as Mission;
  counters: Counter[] = [];
  filteredCounters: Counter[] = [];
  countersCalculation: CountersCalculation = {} as CountersCalculation;
  missionId: number;
  numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedButton: "today" | "week" | "month" | "all" | "custom" = "today";
  filterStartDate: Date;
  filterEndDate: Date;

  differentAmountForm = this.formBuilder.group({
    amount: null,
  });

  constructor(private activatedRoute: ActivatedRoute, private missionService: MissionService, private counterService: CounterService, private alertService: AlertService, private countersCalculationServant: CountersCalculationServant, private formBuilder: FormBuilder) {}

  ngOnInit() {
    //into chunks of 5
    this.numberButtons = this.numberButtons.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 5);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);

    this.activatedRoute.params.subscribe((params) => {
      this.init(+params.id);
    });
  }

  async init(missionId: number) {
    this.missionId = missionId;
    this.mission = await this.missionService.getMissionById(missionId);

    this.counters = await this.counterService.getCountersByMissionId(missionId);
    this.filteredCounters = this.counters;

    this.countersCalculation = this.countersCalculationServant.toClass(this.mission, this.counters);
  }

  async onNumberButton(number: number) {
    this.createCounter(number, this.missionId);
  }

  onAddDifferentCounter() {
    let amount = this.differentAmountForm.get("amount").value;

    this.createCounter(+amount, this.missionId);

    this.differentAmountForm.reset();
  }

  async createCounter(amount: number, missionId: number) {
    var counter = new Counter();
    counter.amount = amount;
    counter.missionId = missionId;

    let lastId = await this.counterService.insertCounter(counter);

    let insertedCounter = await this.counterService.getCounterById(lastId);

    this.counters.unshift(insertedCounter);

    this.countersCalculation = this.countersCalculationServant.toClass(this.mission, this.counters);
  }

  async onDeleteClick(id: number) {
    await this.counterService.deleteCounterById(id);

    this.counters = this.counters.filter((counter) => counter.id !== id);
  }

  async onEditDateClick(counterId: number) {
    let counter = this.counters.find((counter) => counter.id === counterId);

    var handler = async (value: Date) => {
      counter.createdAt = value;

      await this.counterService.updateCounter(counter);

      this.countersCalculation = this.countersCalculationServant.toClass(this.mission, this.counters);
    };

    await this.alertService.presentDateTimeInput(handler.bind(this), null, counter.createdAt);
  }

  async onEditAmountClick(counterId: number) {
    let counter = this.counters.find((counter) => counter.id === counterId);

    var handler = async (value: number) => {
      counter.amount = value;
      await this.counterService.updateCounter(counter);
    };

    await this.alertService.presenNumberInput(handler.bind(this), `Current Amount ${counter.amount}`);
  }

  async onFilterButton(filter: string) {
    switch (filter) {
      case "today":
        this.filteredCounters = this.counters.filter((counter) => counter.createdAt.toDateString() === new Date().toDateString());
        break;
      case "week":
        this.filteredCounters = this.counters.filter((counter) => counter.createdAt > new Date(new Date().setDate(new Date().getDate() - 7)));
        break;
      case "month":
        this.filteredCounters = this.counters.filter((counter) => counter.createdAt > new Date(new Date().setDate(new Date().getDate() - 30)));
        break;
      case "all":
        this.filteredCounters = this.counters;
        break;
      case "custom":
        var handler = async (value: any) => {
          this.filterStartDate = value.startDate;
          this.filterEndDate = value.endDate;

          this.filteredCounters = this.counters.filter((counter) => counter.createdAt.isBetween(this.filterStartDate, this.filterEndDate));
        };
        await this.alertService.presentDateTimeRangeInput(handler.bind(this), null, this.filterStartDate, this.filterEndDate);
        return;
    }
    this.filterStartDate = null;
    this.filterEndDate = null;
  }
}
