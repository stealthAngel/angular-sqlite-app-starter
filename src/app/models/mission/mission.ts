import { Mission_DB } from "src/app/database/models/database-models";

export class Mission {
  id: number;
  name: string;
  description: string;
  endAmount: number;
  countersAmountTotal: number;
  createdAt: Date;
  percentage?: number;

  constructor() {}

  init(x: Mission_DB) {
    this.id = x.id;
    this.name = x.name;
    this.description = x.description;
    this.endAmount = x.endAmount;
    this.countersAmountTotal = x.countersAmountTotal;
    this.createdAt = new Date(x.createdAt);
    this.percentage = this.calculatePercentage(this.countersAmountTotal);
    return this;
  }

  calculatePercentage(partialAmount: number): number {
    let x: number = (100 * partialAmount) / this.endAmount;
    return !isNaN(x) ? parseFloat(x.toFixed(2)) : 0;
  }
}
