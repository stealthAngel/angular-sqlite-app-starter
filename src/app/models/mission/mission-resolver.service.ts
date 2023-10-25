import { Injectable } from "@angular/core";
import { MissionServant } from "./mission.servant";

import { Mission } from "./mission";
import { MissionService } from "./mission.service";

@Injectable({
  providedIn: "root",
})
export class MissionResolverService  {
  constructor(private missionService: MissionService, private missionServant: MissionServant) {}

  async resolve(): Promise<Mission[]> {
    var missions: Mission[] = await this.missionService.getMissions();

    return missions;
  }
}
