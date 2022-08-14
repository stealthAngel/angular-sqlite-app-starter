import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mission } from '../models/Mission';
import { MissionRepository } from '../repositories/mission.repository';
import { MapperService } from './mapper.service';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  public missionsSubject = new BehaviorSubject<Mission[]>([]);
  public missions$ = this.missionsSubject.asObservable();

  async createMission(mission: Mission) {
    this.missionsSubject.next([...this.missionsSubject.getValue(), mission]);
    this.missionRepository.createMission(mission);
  }

  async deleteMission(id: number) {
    this.missionsSubject.next(this.missionsSubject.getValue().filter(mission => mission.id !== id));
    this.missionRepository.deleteMissionById(id);
  }

  async updateMission(mission: Mission) {
    this.missionsSubject.next(this.missionsSubject.getValue().map(m => m.id === mission.id ? mission : m));
    this.missionRepository.updateMission(mission);
  }

  public set(missions: Mission[]) {
    this.missionsSubject.next(missions);
  }

  constructor(private missionRepository: MissionRepository, private mapperService: MapperService) {
    this.missionRepository.getMissions().then((missions) => {
      this.set(missions);
    });
  }
}
