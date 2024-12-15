import { Time } from "@repo/time-tools/types";

export interface Outline {
  rows: OutlineRow[];
}

export interface OutlineRow {
  time: Time;
  text: string;
}
