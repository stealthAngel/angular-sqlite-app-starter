import { Injectable } from "@angular/core";
import { MissionRepository } from "src/app/database/repositories/mission.repository";
import { MissionServant } from "src/app/models/mission/mission.servant";
import { Mission } from "./mission";
@Injectable()
export class MissionService {
  constructor(private missionRepository: MissionRepository, private missionServant: MissionServant) {}

  async getMissions() {
    var missions = await this.missionRepository.getMissions();
    return this.missionServant.toClasses(missions);
  }

  async getMissionById(id: number) {
    var mission = await this.missionRepository.getMissionById(id);
    return this.missionServant.toClass(mission);
  }

  async insertMission(mission: Mission) {
    var missionDB = this.missionServant.toDB(mission);
    return await this.missionRepository.insertMission(missionDB);
  }

  async updateMission(mission: Mission) {
    var missionDB = this.missionServant.toDB(mission);
    return await this.missionRepository.updateMission(missionDB);
  }

  async deleteMissionById(id: number) {
    return await this.missionRepository.deleteMissionById(id);
  }
}
