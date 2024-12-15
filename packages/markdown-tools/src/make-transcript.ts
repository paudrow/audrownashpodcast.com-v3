import { Outline } from "@repo/outline-tools/types";
import { parse as parseOutline } from "@repo/outline-tools/parse";
import { fromCsv } from "@repo/transcript-tools/from-csv";
import { Transcript } from "@repo/transcript-tools/types";

export function makeMarkdownTranscriptFromStrings(
  transcriptString: string,
  outlineString: string
) {
  const transcript = fromCsv(transcriptString);
  const outline = parseOutline(outlineString);
  return makeTranscript(transcript, outline);
}

export function makeTranscript(transcript: Transcript, outline: Outline) {
  return "";
}
