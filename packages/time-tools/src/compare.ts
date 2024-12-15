import { Time } from "./types";

export function compare(a: Time, b: Time): number {
  if (a.hours !== b.hours) {
    return a.hours - b.hours;
  }
  if (a.minutes !== b.minutes) {
    return a.minutes - b.minutes;
  }
  return a.seconds - b.seconds;
}
