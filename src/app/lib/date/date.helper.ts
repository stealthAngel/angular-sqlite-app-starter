export function calculateTimeDifference(date1: Date | null, date2: Date | null): Date {
  if (date1 !== null && date2 !== null) {
    let seconds = Math.round(date2.getTime() - date1.getTime());
    let newDate = new Date(seconds);
    newDate.setHours(newDate.getHours() - 1);
    return newDate;
  }
  return null;
}
