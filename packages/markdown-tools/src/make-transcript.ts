import { Outline } from "@repo/outline-tools/types";
import { parse as parseOutline } from "@repo/outline-tools/parse";
import { fromCsv } from "@repo/transcript-tools/from-csv";
import { Transcript } from "@repo/transcript-tools/types";
import { compare } from "@repo/time-tools/compare";
import { toString } from "@repo/time-tools/to-string";

export function makeMarkdownTranscriptFromStrings(
  transcriptString: string,
  outlineString?: string,
  reduceRows?: boolean
) {
  const transcript = fromCsv(transcriptString, reduceRows);
  const outline = outlineString ? parseOutline(outlineString) : undefined;
  return makeTranscript(transcript, outline);
}

export function makeTranscript(transcript: Transcript, outline?: Outline) {
  let result = "";
  let currentOutlineIndex = 0;
  for (const row of transcript.rows) {
    const nextRow = transcript.rows[transcript.rows.indexOf(row) + 1];
    if (outline) {
      while (currentOutlineIndex < outline.rows.length) {
        const outlineRow = outline.rows[currentOutlineIndex];
        if (
          !outlineRow ||
          (nextRow && compare(outlineRow.time, nextRow.startTime) >= 0)
        ) {
          break;
        }
        result += `## [${toString(row.startTime)}] ${outlineRow.text}\n\n`;
        currentOutlineIndex++;
      }
    }
    result += `[${toString(row.startTime)}] **${row.speaker}:** ${row.text}\n\n`;
  }

  return result.trim() + "\n";
}
