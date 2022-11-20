import { Mission_DB } from "src/app/database/models/database-models";

export class Mission {
  id: number;
  name: string;
  description: string;
  targetAmount: number;
  currentTotalAmount: number;
  createdAt: Date;
  percentage?: number;

  constructor() {}

  init(x: Mission_DB) {
    this.id = x.id;
    this.name = x.name;
    this.description = x.description;
    this.targetAmount = x.targetAmount;
    this.currentTotalAmount = x.currentTotalAmount;
    this.createdAt = new Date(x.createdAt);
    this.percentage = this.calculatePercentage(this.currentTotalAmount);
    return this;
  }

  init_insert(name: string, targetAmount: number, description: string) {
    this.name = name;
    this.description = description;
    this.targetAmount = targetAmount;
    this.createdAt = new Date();

    return this;
  }

  calculatePercentage(partialAmount: number): number {
    let x: number = (100 * partialAmount) / this.targetAmount;
    return !isNaN(x) ? parseFloat(x.toFixed(2)) : 0;
  }

  isCompleted(): boolean {
    return this.currentTotalAmount >= this.targetAmount;
  }

  getPercentage(): string {
    return this.percentage + "%";
  }
}
