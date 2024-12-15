import { Time } from "@repo/time-tools/types";

export interface CsvTranscript {
  rows: CsvRow[];
}

export interface CsvRow {
  speaker: string;
  startTime: Time;
  endTime: Time;
  text: string;
}
