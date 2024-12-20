import { Time } from "@repo/time-tools/types";
import { Transcript, TranscriptRow } from "./types.js";
import { create as createTime } from "@repo/time-tools/create";

export function fromCsv(csv: string, reduceRows: boolean = true): Transcript {
  // Split into lines and remove header
  const lines = csv.trim().split("\n");
  if (lines.length <= 1) {
    throw new Error("Invalid CSV: no data");
  }

  const header = lines[0]?.trim();
  const expectedHeader = '"Speaker Name","Start Time","End Time","Text"';
  if (header !== expectedHeader) {
    throw new Error(
      `Invalid CSV header: expected "${expectedHeader}" but got "${header}"`
    );
  }
  const dataLines = lines.slice(1);

  const rows: TranscriptRow[] = dataLines
    .map((line, index) => {
      // Match CSV fields, handling quoted strings properly
      const matches = line.match(/"([^"]*)"/g);
      if (!matches || matches.length !== 4) {
        if (line.trim() === "") {
          line = "<empty line>";
        }
        throw new Error(`Invalid CSV line ${index + 2}: ${line}`);
      }

      // Remove quotes and get individual fields
      const [speaker, startTime, endTime, text] = matches.map(
        (m) => m.slice(1, -1) // Remove surrounding quotes
      );

      if (!speaker || speaker === "") {
        throw new Error(`Missing speaker at line ${index + 2}: ${line}`);
      }
      if (!startTime || startTime === "") {
        throw new Error(`Missing start time at line ${index + 2}: ${line}`);
      }
      if (!endTime || endTime === "") {
        throw new Error(`Missing end time at line ${index + 2}: ${line}`);
      }

      try {
        return {
          speaker,
          startTime: smpteToTime(startTime),
          endTime: smpteToTime(endTime),
          text: text || "", // some lines are empty unfortunatly, so we don't want to throw an error
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Error on line ${index + 2}: ${error.message}`);
        }
        throw new Error(`Error on line ${index + 2}: Unknown error occurred`);
      }
    })
    .filter((row) => row.text.trim() !== "");

  return {
    rows: reduceRows ? reduceCsvRowsWithSameSpeaker(rows) : rows,
  };
}

function reduceCsvRowsWithSameSpeaker(rows: TranscriptRow[]): TranscriptRow[] {
  return rows.reduce((acc, row) => {
    const lastRow = acc[acc.length - 1];
    if (acc.length > 0 && lastRow?.speaker === row.speaker) {
      lastRow.text += ` ${row.text}`;
      lastRow.endTime = row.endTime;
    } else {
      acc.push(row);
    }
    return acc;
  }, [] as TranscriptRow[]);
}

function smpteToTime(smpte: string): Time {
  let parts = smpte.split(";").map(Number);

  // If splitting by ; didn't work, try :
  if (parts.some((part) => isNaN(part))) {
    parts = smpte.split(":").map(Number);
  }

  const [hours, minutes, seconds, frames] = parts;
  if (
    hours === undefined ||
    minutes === undefined ||
    seconds === undefined ||
    frames === undefined
  ) {
    throw new Error(`Invalid SMPTE time: ${smpte}`);
  }
  return createTime(hours, minutes, seconds);
}
