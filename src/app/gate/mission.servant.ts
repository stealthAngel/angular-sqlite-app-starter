import { Injectable } from "@angular/core";
import { Mission } from "../database/models/database-models";
import { MissionClass } from "../models/mission";

@Injectable()
export class MissionGate {
  constructor() {}

  toClass(mission: Mission): MissionClass {
    return new MissionClass(mission);
  }

  toClasses(missions: Mission[]): MissionClass[] {
    return missions.map((mission) => this.toClass(mission));
  }

  toDatabaseModel(mission: MissionClass): Mission {
    return {
      id: mission.id,
      name: mission.name,
      description: mission.description,
      endAmount: mission.endAmount,
      countersAmountTotal: mission.countersAmountTotal,
    };
  }
}
