import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MissionService } from "src/app/models/mission/mission.service";
import { CounterService } from "src/app/models/counter/counter.service";
import { Counter } from "src/app/models/counter/counter";
import { CountersCalculation } from "src/app/models/counter/counters-calculation";
import { Mission } from "src/app/models/mission/mission";
import { CountersCalculationServant } from "src/app/models/counter/counters-calculation.servant";

@Component({
  selector: "app-counters",
  templateUrl: "./counters.page.html",
  styleUrls: ["./counters.page.scss"],
})
export class CountersPage implements OnInit {
  mission: Mission = {} as Mission;
  counters: Counter[] = [];
  countersExtentionObject: CountersCalculation = {} as CountersCalculation;
  missionId: number;

  differentAmountForm = this.formBuilder.group({
    amount: null,
  });

  constructor(private activatedRoute: ActivatedRoute, private missionService: MissionService, private counterService: CounterService, private countersCalculationServant: CountersCalculationServant, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.init(+params.id);
    });
  }

  async init(missionId: number) {
    this.missionId = missionId;
    this.mission = await this.missionService.getMissionById(missionId);

    this.counters = await this.counterService.getCountersByMissionId(missionId);

    this.countersExtentionObject = this.countersCalculationServant.toClass(this.mission, this.counters);
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

    //this.countersExtentionObject = this.getCountersExtentionObject(this.counters);
  }

  async onDeleteClick(id: number) {
    await this.counterService.deleteCounterById(id);

    this.counters = this.counters.filter((counter) => counter.id !== id);
  }
}
