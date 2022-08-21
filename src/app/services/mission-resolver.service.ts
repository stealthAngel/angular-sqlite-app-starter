import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Mission } from '../models/Mission';
import { MissionRepository } from '../repositories/mission.repository';

@Injectable({
  providedIn: 'root'
})
export class MissionResolverService implements Resolve<Promise<Mission[]>>{

  constructor(private missionRepository: MissionRepository) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Mission[]> {
    return this.missionRepository.getMissions();
  }
}
