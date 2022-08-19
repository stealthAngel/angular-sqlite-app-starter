import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getMissions(): Observable<MissionDto[]> {
    return this.missionsSubject.asObservable();
  }

  async createMission(mission: Mission) {
    var id = await this.missionRepository.createMission(mission);

    let storedMission = await this.missionRepository.getMissionById(id);

    let missionDto = this.mapperService.mapMissionToDto(storedMission);

    this.missionsSubject.next([...this.missionsSubject.getValue(), missionDto]);
  }

  async deleteMission(id: number) {
    this.missionsSubject.next(this.missionsSubject.getValue().filter(mission => mission.id !== id));
    await this.missionRepository.deleteMissionById(id);
  }

  async updateMission(missionDto: MissionDto) {
    let mission: Mission = this.mapperService.mapDtoToMission(missionDto);

    await this.missionRepository.updateMission(mission);

    await this.reloadMission(mission.id);
  }

  async reloadMission(id: number) {
    let mission = await this.missionRepository.getMissionById(id);
    let missionDto = this.mapperService.mapMissionToDto(mission);
    this.missionsSubject.next(this.missionsSubject.getValue().map(mission => mission.id === id ? missionDto : mission));
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
