import { CsvTranscript } from "./types.js";
import { fromString as parseTime } from "@repo/time-tools/create";

export function parse(csv: string): CsvTranscript {
  if (!csv) {
    return { rows: [] };
  }

  // Split into lines and remove header
  const lines = csv.split("\n");
  if (lines.length <= 1) {
    return { rows: [] };
  }

  const dataLines = lines.slice(1);

  const rows = dataLines.map((line) => {
    // Match CSV fields, handling quoted strings properly
    const matches = line.match(/"([^"]*)"/g);
    if (!matches || matches.length !== 4) {
      return null;
    }

    // Remove quotes and get individual fields
    const [speaker, startTime, endTime, text] = matches.map(
      (m) => m.slice(1, -1) // Remove surrounding quotes
    );

    if (!speaker || !startTime || !endTime || !text) {
      return null;
    }

    try {
      return {
        speaker,
        startTime: parseTime(startTime, ";"),
        endTime: parseTime(endTime, ";"),
        text,
      };
    } catch (error) {
      return null;
    }
  });

  return {
    rows: rows.filter((row): row is NonNullable<typeof row> => row !== null),
  };
}
