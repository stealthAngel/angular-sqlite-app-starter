export interface CountersCalculation {
  total: number,
  amountDoneToday: number,
  timesToday: Date,
  startTimeToday: Date,
  endTimeToday: Date,
  timeBetweenToday: Date | null,
  unitsLeft: number,
  experienceCurrently: number,
  experiencePerUnit: number,
  experiencePer10Unit: number,
  amountToDoFor1Percent: number,
}
