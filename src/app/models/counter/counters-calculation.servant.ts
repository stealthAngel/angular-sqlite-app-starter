import { Injectable } from "@angular/core";
import { calculateTimeDifference } from "../../lib/date/date.helper";
import { Counter } from "./counter";
import { CountersCalculation } from "./counters-calculation";
import { Mission } from "../mission/mission";

@Injectable()
export class CountersCalculationServant {
  constructor() {}

  toClass(mission: Mission, counters: Counter[]): CountersCalculation {
    let countersToday = counters.filter((counter) => counter.createdAt.getDate() === new Date().getDate());

    let x: CountersCalculation = {} as CountersCalculation;

    x.total = counters.reduce((acc, curr) => acc + curr.amount, 0);

    x.amountDoneToday = countersToday.reduce((acc, curr) => acc + curr.amount, 0);
    x.startTimeToday = countersToday.length > 0 ? countersToday[0].createdAt : null;
    x.endTimeToday = countersToday.length > 1 ? countersToday[countersToday.length - 1].createdAt : null;
    x.timeBetweenToday = x.startTimeToday && x.endTimeToday ? calculateTimeDifference(x.startTimeToday, x.endTimeToday) : null;

    x.unitsLeft = mission.targetAmount - x.total;

    x.experienceCurrently = mission.calculatePercentage(x.total);
    x.experiencePerUnit = mission.calculatePercentage(1);
    x.experiencePer10Unit = mission.calculatePercentage(10);
    x.amountToDoFor1Percent = mission.targetAmount / 100;

    return x;
  }
}
