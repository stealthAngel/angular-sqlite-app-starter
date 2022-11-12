import { Injectable } from "@angular/core";
import { MissionRepository } from "../../database/repositories/mission.repository";
import { Mission_DB } from "../../database/models/database-models";
import { MissionServant } from "./mission.servant";
import { Resolve } from "@angular/router";
import { Mission } from "./mission";

@Injectable({
  providedIn: "root",
})
export class MissionResolverService implements Resolve<Mission[]> {
  constructor(private missionRepository: MissionRepository, private missionServant: MissionServant) {}

  async resolve(): Promise<Mission[]> {
    var missions: Mission_DB[] = await this.missionRepository.getMissions();

    var missionClasses = this.missionServant.toClasses(missions);

    return missionClasses;
  }
}
