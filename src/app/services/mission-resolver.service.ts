import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { MissionRepository } from "../database/repositories/mission.repository";
import { Mission } from "../database/models/database-models";
import { MissionClass } from "../models/mission";
import { MissionGate } from "../gate/mission.servant";

@Injectable({
  providedIn: "root",
})
export class MissionResolverService implements Resolve<MissionClass[]> {
  constructor(private missionRepository: MissionRepository, private missionGate: MissionGate) {}

  async resolve(): Promise<MissionClass[]> {
    var missions: Mission[] = await this.missionRepository.getMissions();

    var missionClasses = this.missionGate.toClasses(missions);

    return missionClasses;
  }
}
