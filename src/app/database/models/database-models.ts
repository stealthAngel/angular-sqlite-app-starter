export interface Counter_DB {
  id: number;
  amount: number;
  missionId: number;
  createdAt: string;
}

export interface Mission_DB {
  id: number;
  name: string;
  description: string;
  endAmount: number;
  countersAmountTotal: number;
  createdAt: string;
}

export interface Migration_DB {
  id: number;
  name: string;
  createdAt: string;
}

export interface Setting_DB {
  id: number;
  name: string;
  value: string;
  orderIndex: number;
}
