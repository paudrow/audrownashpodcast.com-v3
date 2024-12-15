import { Outline } from "./types.js";
import { fromString as parseTime } from "@repo/time-tools/create";
import { create as createTime } from "@repo/time-tools/create";
import { compare } from "@repo/time-tools/compare";

export function parse(text: string): Outline {
  // Split into lines
  const lines = text.trim().split("\n");
  if (lines.length === 0 || (lines.length === 1 && lines[0] === "")) {
    throw new Error("Invalid outline: no data");
  }

  const rows = lines.map((line) => {
    // Split on first space to separate time from text
    const firstSpaceIndex = line.indexOf(" ");
    if (firstSpaceIndex === -1) {
      throw new Error(`Invalid outline line: ${line}`);
    }

    const timeStr = line.slice(0, firstSpaceIndex);
    const text = line.slice(firstSpaceIndex + 1);

    return {
      time: parseTime(timeStr),
      text,
    };
  });

  // Check if there's a 0:00 entry
  const hasStartEntry = rows.some(
    (row) =>
      row.time.hours === 0 && row.time.minutes === 0 && row.time.seconds === 0
  );

  // If no start entry exists, add one
  if (!hasStartEntry) {
    rows.unshift({
      time: createTime(0, 0, 0),
      text: "Start",
    });
  }

  // Sort rows by time using compare function
  rows.sort((a, b) => compare(a.time, b.time));

  return {
    rows,
  };
}
