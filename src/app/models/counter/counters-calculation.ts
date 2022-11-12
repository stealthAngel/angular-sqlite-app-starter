export interface CountersCalculation {
  total: number;

  amountDoneToday: number;
  startTimeToday: Date | null;
  endTimeToday: Date | null;
  timeBetweenToday: Date | null;

  unitsLeft: number;
  
  experienceCurrently: number;
  experiencePerUnit: number;
  experiencePer10Unit: number;
  amountToDoFor1Percent: number;
}
