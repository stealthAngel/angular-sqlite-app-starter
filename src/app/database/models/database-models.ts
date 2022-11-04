export interface Counter {
  id: number;
  amount: number;
  missionId: number;
  createdAt: Date;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  endAmount: number;
  countersAmountTotal: number;
}

export interface Migration {
  id: number;
  name: string;
  createdAt: Date;
}
