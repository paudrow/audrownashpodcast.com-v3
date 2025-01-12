"use client";

import { makeMarkdownTranscriptFromStrings } from "@repo/markdown-tools/make-transcript";
import { parse as parseOutline } from "@repo/outline-tools/parse";
import { fromCsv } from "@repo/transcript-tools/from-csv";
import { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import { EXAMPLE_TRANSCRIPT, EXAMPLE_OUTLINE } from "./constants";

export default function Home() {
  const [transcriptText, setTranscriptText] = useState("");
  const [outlineText, setOutlineText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [transcriptError, setTranscriptError] = useState<string>("");
  const [outlineError, setOutlineError] = useState<string>("");

  const handleTranscriptFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setTranscriptText(text);
      // Validate the uploaded CSV
      fromCsv(text);
      setTranscriptError("");
      // Reset the file input value
      event.target.value = "";
    } catch (error) {
      setTranscriptError(
        error instanceof Error ? error.message : "Invalid file format"
      );
      // Also reset the file input on error
      event.target.value = "";
    }
  };

  const handleOutlineFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setOutlineText(text);
      // Validate the uploaded outline
      parseOutline(text);
      setOutlineError("");
      // Reset the file input value
      event.target.value = "";
    } catch (error) {
      setOutlineError(
        error instanceof Error ? error.message : "Invalid file format"
      );
      // Also reset the file input on error
      event.target.value = "";
    }
  };

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

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transcript.md";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  const clearAll = () => {
    setTranscriptText("");
    setOutlineText("");
    setOutputText("");
    setTranscriptError("");
    setOutlineError("");
  };

  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            CSV Transcript to Markdown Converter
          </h1>
          <ThemeToggle />
        </div>
        <p className="text-foreground/70 text-sm">
          Made by Audrow for the{" "}
          <a
            href="https://audrownashpodcast.com/"
            className="hover:text-foreground underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Audrow Nash Podcast
          </a>
          . Feel free to use it if it&apos;s helpful to you!
        </p>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="transcript" className="block font-medium">
                Transcript CSV
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleTranscriptFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="text-foreground/70 hover:text-foreground cursor-pointer text-sm"
                >
                  Upload CSV
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
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleOutlineFileUpload}
                  className="hidden"
                  id="outline-file-upload"
                />
                <label
                  htmlFor="outline-file-upload"
                  className="text-foreground/70 hover:text-foreground cursor-pointer text-sm"
                >
                  Upload TXT
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

          <div className="flex justify-end gap-4">
            <button
              onClick={clearAll}
              className="border-foreground/20 hover:border-foreground/40 rounded-lg border px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!transcriptText && !outlineText && !outputText}
            >
              Clear All
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleConvert}
                disabled={
                  !!transcriptError || !!outlineError || !transcriptText
                }
                className="bg-foreground text-background rounded-lg px-4 py-2 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Convert to Markdown
              </button>
              <button
                onClick={handleDownload}
                disabled={!outputText}
                className="bg-foreground text-background rounded-lg px-4 py-2 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download Markdown
              </button>
            </div>
          </div>

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
