import { Injectable } from "@angular/core";
import { Counter_DB } from "../../database/models/database-models";
import { Counter } from "./counter";

@Injectable()
export class CounterServant {
  constructor() {}

  toClass(counter: Counter_DB): Counter {
    return new Counter().init(counter);
  }

  toClasses(counters: Counter_DB[]): Counter[] {
    console.log(counters);
    return counters.map((counter) => this.toClass(counter));
  }

  toDB(x: Counter): Counter_DB {
    return {
      id: x.id,
      amount: x.amount,
      missionId: x.missionId,
      createdAt: null, //done by database
    };
  }
}
