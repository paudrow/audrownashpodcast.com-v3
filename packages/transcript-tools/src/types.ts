import { Time } from "@repo/time-tools/types";

export interface Transcript {
  rows: TranscriptRow[];
}

export interface TranscriptRow {
  speaker: string;
  startTime: Time;
  endTime: Time;
  text: string;
}
