import { Time } from "./types.js";

export function toYouTubeTimeString(time: Time): string {
  if (time.hours === 0) {
    if (time.minutes < 10) {
      return `${time.minutes}:${time.seconds.toString().padStart(2, "0")}`;
    }
    return `${time.minutes}:${time.seconds.toString().padStart(2, "0")}`;
  }
  return `${time.hours}:${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
}

export function toString(time: Time): string {
  return `${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
}
