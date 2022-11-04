import { Mission } from "../database/models/database-models";

export class MissionClass {
  id: number;
  name: string;
  description: string;
  endAmount: number;
  countersAmountTotal: number;
  percentage?: number;

  constructor(mission: Mission) {
    this.id = mission.id;
    this.name = mission.name;
    this.description = mission.description;
    this.endAmount = mission.endAmount;
    this.countersAmountTotal = mission.countersAmountTotal;
    this.percentage = this.calculatePercentage(this.countersAmountTotal, this.endAmount);
  }

  calculatePercentage(partialValue: number, totalValue: number): number {
    let x: number = (100 * partialValue) / totalValue;
    return !isNaN(x) ? parseFloat(x.toFixed(2)) : 0;
  }
}
