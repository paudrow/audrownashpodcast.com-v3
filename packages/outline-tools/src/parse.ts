import { Outline } from "./types.js";
import { fromString as parseTime } from "@repo/time-tools/create";

export function parse(text: string): Outline {
  // Split into lines
  const lines = text.split("\n");
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

  return {
    rows,
  };
}
