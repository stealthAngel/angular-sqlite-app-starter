import { Injectable } from "@angular/core";
import { CounterRepository } from "src/app/database/repositories/counter.repository";
import { CounterServant } from "src/app/models/counter/counter.servant";
import { Counter } from "./counter";

@Injectable()
export class CounterService {
  constructor(private counterRepository: CounterRepository, private counterServant: CounterServant) {}

  async getCountersByMissionId(missionId: number) {
    var counters = await this.counterRepository.getCountersByMissionId(missionId);
    return this.counterServant.toClasses(counters);
  }

  async getCounterById(id: number) {
    var counter = await this.counterRepository.getCounterById(id);
    return this.counterServant.toClass(counter);
  }

  async insertCounter(counter: Counter) {
    var counterDB = this.counterServant.toDB(counter);
    return await this.counterRepository.insertCounter(counterDB);
  }

  async updateCounter(counter: Counter) {
    var counterDB = this.counterServant.toDB(counter);
    return await this.counterRepository.updateCounter(counterDB);
  }

  async deleteCounterById(id: number) {
    return await this.counterRepository.deleteCounterById(id);
  }
}
