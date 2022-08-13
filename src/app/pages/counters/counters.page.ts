import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Counter } from 'src/app/models/counter';
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
    console.log("🚀 ~ file: counters.page.ts ~ line 32 ~ CountersPage ~ get ~ this.mission ", this.mission)
  }

  onCreateCounter(amount: number) {
    let counter: Counter = {
      id: null,
      amount: amount,
      missionId: this.missionId,
      createdAt: null
    };
    this.counterRepository.createCounter(counter);
    this.get();
  }

  onAddDifferentCounter(amount: number) {
    let counter: Counter = {
      id: null,
      amount: amount,
      missionId: this.missionId,
      createdAt: null
    };
    console.log("🚀 ~ file: counters.page.ts ~ line 53 ~ CountersPage ~ onAddDifferentCounter ~ counter ", counter);
  }

}
