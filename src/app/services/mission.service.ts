import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { calculatePercentage } from '../helpers/maths';
import { Mission } from '../models/Mission';
import { MissionDto } from '../models/MissionDto';
import { MissionRepository } from '../repositories/mission.repository';
import { MapperService } from './mapper.service';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private missionsSubject = new BehaviorSubject<MissionDto[]>([]);
  public missions$ = this.missionsSubject.asObservable();

  async createMission(mission: Mission) {
    let missionDto = this.mapperService.mapMissionToDto(mission);
    var id = await this.missionRepository.createMission(mission);
    missionDto.id = id;

    this.missionsSubject.next([...this.missionsSubject.getValue(), missionDto]);
  }

  async deleteMission(id: number) {
    this.missionsSubject.next(this.missionsSubject.getValue().filter(mission => mission.id !== id));
    this.missionRepository.deleteMissionById(id);
  }

  async updateMission(mission: Mission) {
    let missionDto = this.mapperService.mapMissionToDto(mission);
    const updatedMission = await this.missionRepository.updateMission(mission);
    missionDto.id = updatedMission.id;
    this.missionsSubject.next(this.missionsSubject.getValue().map(m => m.id === missionDto.id ? missionDto : m));
  }

  async addCountersAmountTotalToMissionObservable(id: number, amount: number) {
    const mission = this.missionsSubject.getValue().find(m => m.id === id);
    mission.countersAmountTotal += amount;
    mission.percentage = calculatePercentage(mission.countersAmountTotal, mission.endAmount);
  }

  async init() {
    let missions = await this.missionRepository.getMissions();
    const missionsDtos = missions.map(mission => this.mapperService.mapMissionToDto(mission));
    this.missionsSubject.next(missionsDtos);
  }

  constructor(private missionRepository: MissionRepository, private mapperService: MapperService) {
    this.init();
  }
}
