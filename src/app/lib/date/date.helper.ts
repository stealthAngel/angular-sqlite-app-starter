export function calculateTimeDifference(date1: Date | null, date2: Date | null): Date {
  if (date1 !== null && date2 !== null) {
    let seconds = Math.round(date2.getTime() - date1.getTime());
    let newDate = new Date(seconds);
    newDate.setHours(newDate.getHours() - 1);
    return newDate;
  }
  return null;
}

export {};
declare global {
  interface Date {
    addDays(days: number): Date;
    removeDays(days: number): Date;
    isBetween(minDate: Date | undefined, maxDate: Date | undefined): boolean;
    calculateTimeDifference(date: Date | null): Date;
    toLocalIsoString(): string;
  }
}

Date.prototype.addDays = function (days: number) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.removeDays = function (days: number) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

Date.prototype.isBetween = function (minDate: Date | undefined, maxDate: Date | undefined) {
  if (minDate && maxDate) {
    return this >= minDate && this <= maxDate;
  }
  if (minDate && !maxDate) {
    return this >= minDate;
  }
  if (!minDate && maxDate) {
    return this <= maxDate;
  }
  if (!minDate && !maxDate) {
    return true;
  }
  return false;
};

Date.prototype.toLocalIsoString = function () {
  let date = new Date(this.valueOf());
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num) {
      return (num < 10 ? "0" : "") + num;
    };

  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()) + dif + pad(Math.floor(Math.abs(tzo) / 60)) + ":" + pad(Math.abs(tzo) % 60);
};
