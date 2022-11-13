import { Injectable } from "@angular/core";
import { Mission_DB } from "../../database/models/database-models";
import { Mission } from "./mission";

@Injectable()
export class MissionServant {
  constructor() {}

  toClass(x: Mission_DB): Mission {
    return new Mission().init(x);
  }

  toClasses(x: Mission_DB[]): Mission[] {
    return x.map((y) => this.toClass(y));
  }

  toDB(x: Mission): Mission_DB {
    return {
      id: x.id,
      name: x.name,
      description: x.description,
      endAmount: x.endAmount,
      countersAmountTotal: x.countersAmountTotal,
      createdAt: x.createdAt.toISOString(),
    };
  }
}
