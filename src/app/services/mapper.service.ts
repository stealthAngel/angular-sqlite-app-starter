

import { Injectable } from '@angular/core';
import { calculatePercentage } from '../helpers/maths';
import { Mission } from '../models/Mission';
import { MissionDto } from '../models/MissionDto';


@Injectable()
export class MapperService {

  constructor() { }

  mapMissionToDto(mission: Mission): MissionDto {
    var dto: MissionDto = {
      id: mission.id,
      name: mission.name,
      description: mission.description,
      countersAmountTotal: mission.countersAmountTotal ?? 0,
      endAmount: mission.endAmount,
      percentage: 0
    };

    dto.percentage = calculatePercentage(dto.countersAmountTotal, dto.endAmount);

    return dto;
  }

  mapDtoToMission(missionDto: MissionDto): Mission {
    var mission: Mission = {
      id: missionDto.id,
      name: missionDto.name,
      description: missionDto.description,
      countersAmountTotal: missionDto.countersAmountTotal,
      endAmount: missionDto.endAmount,
    };

    return mission;
  }

}
