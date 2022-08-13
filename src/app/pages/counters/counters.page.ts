import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { calculatePercentage } from 'src/app/helpers/maths';
import { Counter } from 'src/app/models/counter';
import { CountersCalculation } from 'src/app/models/counters-calculation';
import { Mission } from 'src/app/models/Mission';
import { CounterRepository } from 'src/app/repositories/counter.repository';
import { MissionRepository } from 'src/app/repositories/mission.repository';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.page.html',
  styleUrls: ['./counters.page.scss'],
})
export class CountersPage implements OnInit {

  missionId: number;
  mission: Mission = {} as Mission;
  counters: Counter[] = [];
  countersCalculated: CountersCalculation = {} as CountersCalculation;
  differentAmountForm = this.formBuilder.group({
    amount: null
  });

  public checkoutForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private counterRepository: CounterRepository, private missionRepository: MissionRepository, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.missionId = params.id;
    });

    this.get();

    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  async get() {
    this.counters = await this.counterRepository.getCountersByMissionId(this.missionId);
    this.mission = await this.missionRepository.getMissionById(this.missionId);
    this.countersCalculated = this.getCountersExtentionObject(this.counters);
  }


  getCountersExtentionObject(counters: Counter[]) {
    let countersToday = counters.filter(counter => new Date(counter.createdAt).getDate() === new Date().getDate());

    let x: CountersCalculation = {} as CountersCalculation;//x is counters calculated
    x.total = counters.reduce((acc, curr) => acc + curr.amount, 0);
    x.amountDoneToday = countersToday.reduce((acc, curr) => acc + curr.amount, 0);
    x.startTimeToday = countersToday.length > 0 ? new Date(countersToday[0].createdAt) : null;
    x.endTimeToday = countersToday.length > 1 ? new Date(countersToday[countersToday.length - 1].createdAt) : null;
    x.timeBetweenToday = x.startTimeToday !== undefined && x.endTimeToday !== undefined ? this.calculateTimeDifference(x.startTimeToday, x.endTimeToday) : null;
    x.unitsLeft = (this.mission.endAmount - x.total);
    x.experienceCurrently = calculatePercentage(x.total, this.mission.endAmount);
    x.experiencePerUnit = calculatePercentage(1, this.mission.endAmount);
    x.experiencePer10Unit = calculatePercentage(10, this.mission.endAmount);
    x.amountToDoFor1Percent = this.mission.endAmount / 100;
    console.log("🚀 ~ file: counters.page.ts ~ line 54 ~ CountersPage ~ getCountersExtentionObject ~ x", x)
    return x;
  }


  calculateTimeDifference = (date1: Date | null, date2: Date | null): Date => {
    if (date1 !== null && date2 !== null) {
      let seconds = Math.round((date2.getTime() - date1.getTime()));
      let newDate = new Date(seconds);
      newDate.setHours(newDate.getHours() - 1);
      return newDate;
    }
    return null;
  }

  async onCreateCounter(amount: number) {
    this.createCounter(amount);
  }

  onAddDifferentCounter() {
    let amount = this.differentAmountForm.get('amount').value;

    this.differentAmountForm.reset();

    this.createCounter(+amount);
  }

  async createCounter(amount: number) {
    let counter: Counter = {
      id: null,
      amount: amount,
      missionId: this.missionId,
      createdAt: null

    };
    let lastId = await this.counterRepository.createCounter(counter);

    let addedCounter = await this.counterRepository.getCounterById(lastId);

    this.counters.push(addedCounter);
  }

  async deleteCounter(id: number) {

    await this.counterRepository.deleteCounterById(id);

    this.counters = this.counters.filter(counter => counter.id !== id);
  }

  onDeleteClick(id: number) {
    this.deleteCounter(id);
  }



}