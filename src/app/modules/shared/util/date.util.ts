const MILLISECONDS = 1000;
export function getDifferenceDatetimeInSeconds(date1: Date, date2: Date) {
  let difference = (date1.getTime() - date2.getTime())  / MILLISECONDS;
  return Math.abs(difference);
}
