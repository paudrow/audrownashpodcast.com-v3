"use client";

import { makeMarkdownTranscriptFromStrings } from "@repo/markdown-tools/make-transcript";
import { parse as parseOutline } from "@repo/outline-tools/parse";
import { fromCsv } from "@repo/transcript-tools/from-csv";
import { useState } from "react";

const EXAMPLE_TRANSCRIPT = `"Speaker Name","Start Time","End Time","Text"
"Audrow Nash","00;00;00;03","00;00;02;06","Hi, Jenny. Would you introduce yourself?"
"Jenny Read","00;00;02;09","00;00;09;17","Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency."
"Audrow Nash","00;00;09;19","00;00;12;08","And. Tell me about Aria."
"Jenny Read","00;00;12;11","00;00;38;26","Yeah. Oh, yeah. Is quite a new funding organization in the UK. We were founded by that to Parliament in January 2023, and our mission is to produce transformative societal benefit to science and technology. So we're we're kind of new an experiment basically in a new way of funding for the UK. We're loosely modeled on the RPO and DAF, a model US that is widely perceived as having been very successful."
"Jenny Read","00;00;38;28","00;00;50;13","And we haven't really had that kind of program driven, mission focused approach to funding in the UK before. And that's what Aria is trying to do. But to kick off."
"Audrow Nash","00;00;50;15","00;00;57;10","Now you say loosely focused what what aspects are you taking and what aspects are you leaving from the RPA RPA program."
"Jenny Read","00;00;57;16","00;01;03;24","Yeah. Well one important thing that we're leaving from DARPA is the defense aspect. So yeah, a different part."
"Audrow Nash","00;01;03;28","00;01;04;03","No."
"Jenny Read","00;01;04;03","00;01;29;29","Not exactly. Defense, the military is actually the one area that Aria won't fund. So that's an important change. And that has that is consequences as well. So, you know, Darfur has a sort of built in customer in the form of the Department of Defense or it doesn't. So we have to think hard about how are we going to take the science and tech that we deliver or develop and translate that into societal impact."
"Audrow Nash","00;01;30;02","00;01;40;17","And so yeah it's about tech transfer basically. So you're funding research so that it can you can build companies out of it and it can improve the ciety in general."
"Jenny Read","00;01;40;20","00;01;54;21","That's right. So it's an interesting mix because we are not translational in the sense of being super high TRL or close to commercialization. We can fund very low tier or sorry technology residence level meetings."
"Audrow Nash","00;01;54;24","00;01;57;20","I would never know that acronym. Okay. Yeah."
"Jenny Read","00;01;57;22","00;02;19;10","Yeah I think we we fund work. That's very basic and speculative. But importantly, we always have a sense of how we're hoping it's going to deliver benefit for society. So we wouldn't fund or we haven't typically funded work that sort of blue sky in the sense we have no idea how this might benefit. Well, we have a purpose in mind."
"Jenny Read","00;02;19;14","00;02;34;06","And then we're trying to get the knowledge and the technology together that we need to solve the problem we're focusing on. And we have at that moment seven programs, and each program is focusing on a different problem area, will challenge that we're aiming to solve."`;

const EXAMPLE_OUTLINE = `00:00:00 Introduction and Background
00:00:09 ARIA
00:01:05 Not DARPA
00:01:30 Tech Transfer
00:01:54 Funding
00:02:19 Programs`;

export default function Home() {
  const [transcriptText, setTranscriptText] = useState("");
  const [outlineText, setOutlineText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [transcriptError, setTranscriptError] = useState<string>("");
  const [outlineError, setOutlineError] = useState<string>("");

  const handleTranscriptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setTranscriptText(value);
    if (!value) {
      setTranscriptError("");
      return;
    }
    try {
      fromCsv(value);
      setTranscriptError("");
    } catch (error) {
      setTranscriptError(
        error instanceof Error ? error.message : "Invalid transcript format"
      );
    }
  };

  const handleOutlineChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setOutlineText(value);
    if (!value) {
      setOutlineError("");
      return;
    }
    try {
      parseOutline(value);
      setOutlineError("");
    } catch (error) {
      setOutlineError(
        error instanceof Error ? error.message : "Invalid outline format"
      );
    }
  };

  const handleConvert = () => {
    try {
      const result = makeMarkdownTranscriptFromStrings(
        transcriptText,
        outlineText
      );
      setOutputText(result);
    } catch (error) {
      setOutputText(
        `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`
      );
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold">
          CSV Transcript to Markdown Converter
        </h1>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="transcript" className="block font-medium">
                Transcript CSV
              </label>
              <button
                onClick={() => {
                  setTranscriptText(EXAMPLE_TRANSCRIPT);
                  setTranscriptError("");
                }}
                className="text-foreground/70 hover:text-foreground text-sm"
              >
                Load Example
              </button>
            </div>
            {transcriptError && (
              <div className="mb-2 text-sm text-red-500">{transcriptError}</div>
            )}
            <textarea
              id="transcript"
              className="bg-background border-foreground/20 h-64 w-full rounded-lg border p-3 font-mono text-sm"
              value={transcriptText}
              onChange={handleTranscriptChange}
              placeholder='Example: "Speaker Name","Start Time","End Time","Text"'
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="outline" className="block font-medium">
                Outline Text (Optional)
              </label>
              <button
                onClick={() => {
                  setOutlineText(EXAMPLE_OUTLINE);
                  setOutlineError("");
                }}
                className="text-foreground/70 hover:text-foreground text-sm"
              >
                Load Example
              </button>
            </div>
            {outlineError && (
              <div className="mb-2 text-sm text-red-500">{outlineError}</div>
            )}
            <textarea
              id="outline"
              className="bg-background border-foreground/20 h-64 w-full rounded-lg border p-3 font-mono text-sm"
              value={outlineText}
              onChange={handleOutlineChange}
              placeholder="Example: 00:00 Introduction"
            />
          </div>

          <button
            onClick={handleConvert}
            disabled={!!transcriptError || !!outlineError}
            className="bg-foreground text-background rounded-lg px-4 py-2 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Convert to Markdown
          </button>

          <div>
            <label htmlFor="output" className="mb-2 block font-medium">
              Markdown Output
            </label>
            <textarea
              id="output"
              className="bg-background border-foreground/20 h-64 w-full rounded-lg border p-3 font-mono text-sm"
              value={outputText}
              readOnly
              placeholder="Markdown output will appear here..."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
