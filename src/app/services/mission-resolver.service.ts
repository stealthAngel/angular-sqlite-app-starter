import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Mission } from '../models/Mission';
import { MissionDto } from '../models/MissionDto';
import { MissionRepository } from '../repositories/mission.repository';
import { MapperService } from './mapper.service';

@Injectable({
  providedIn: 'root'
})
export class MissionResolverService implements Resolve<Promise<MissionDto[]>>{

  constructor(private missionRepository: MissionRepository, private mapperService: MapperService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<MissionDto[]> {
    var missions: Mission[] = await this.missionRepository.getMissions();
    var missiondtos = missions.map(mission => this.mapperService.mapMissionToDto(mission));
    return missiondtos;
  }
}
