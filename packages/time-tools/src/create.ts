import { Time } from "./types.js";

export function fromString(time: string, delimiter: string = ":"): Time {
  const components = time.split(delimiter).map(Number);
  if (components.length !== 2 && components.length !== 3) {
    throw new Error(
      `Time must be in format "MM${delimiter}SS" or "HH${delimiter}MM${delimiter}SS": ${time}`
    );
  }

  if (components.length === 2) {
    const [minutes, seconds] = components;
    if (minutes === undefined || seconds === undefined) {
      throw new Error(`Time must be in format "MM${delimiter}SS": ${time}`);
    }
    return create(0, minutes, seconds);
  } else {
    const [hours, minutes, seconds] = components;
    if (hours === undefined || minutes === undefined || seconds === undefined) {
      throw new Error(
        `Time must be in format "HH${delimiter}MM${delimiter}SS": ${time}`
      );
    }
    return create(hours, minutes, seconds);
  }
}

export function create(hours: number, minutes: number, seconds: number): Time {
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    throw new Error(
      `Time components must be valid numbers: ${hours}, ${minutes}, ${seconds}`
    );
  }
  if (hours < 0) {
    throw new Error(`Hours cannot be negative: ${hours}`);
  }
  if (minutes < 0) {
    throw new Error(`Minutes cannot be negative: ${minutes}`);
  }
  if (seconds < 0) {
    throw new Error(`Seconds cannot be negative: ${seconds}`);
  }
  if (minutes > 59) {
    throw new Error(`Minutes must be between 0 and 59: ${minutes}`);
  }
  if (seconds > 59) {
    throw new Error(`Seconds must be between 0 and 59: ${seconds}`);
  }
  return { hours, minutes, seconds };
}
