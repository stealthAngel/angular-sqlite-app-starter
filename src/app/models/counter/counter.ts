import { Counter_DB } from "../../database/models/database-models";

export class Counter {
  id: number;
  amount: number;
  missionId: number;
  createdAt: Date;

  init(x: Counter_DB) {
    this.id = x.id;
    this.amount = x.amount;
    this.missionId = x.missionId;
    this.createdAt = new Date(x.createdAt);

    return this;
  }

  init_insert(amount: number, missionId: number) {
    this.amount = amount;
    this.missionId = missionId;
    this.createdAt = new Date();

    return this;
  }
}
