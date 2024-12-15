import {
  makeTranscript,
  makeMarkdownTranscriptFromStrings,
} from "./make-transcript";
import { create as createTime } from "@repo/time-tools/create";
import { Outline } from "@repo/outline-tools/types";
import { Transcript } from "@repo/transcript-tools/types";

const OUTLINE_STRING = `00:00:00 Introduction and Background
00:00:09 ARIA
00:01:05 Not DARPA
00:01:30 Tech Transfer
00:01:54 Funding
00:02:19 Programs`;

const OUTLINE: Outline = {
  rows: [
    { time: createTime(0, 0, 0), text: "Introduction and Background" },
    { time: createTime(0, 0, 9), text: "ARIA" },
    { time: createTime(0, 1, 5), text: "Not DARPA" },
    { time: createTime(0, 1, 30), text: "Tech Transfer" },
    { time: createTime(0, 1, 54), text: "Funding" },
    { time: createTime(0, 2, 19), text: "Programs" },
  ],
};

const TRANSCRIPT_STRING = `"Speaker Name","Start Time","End Time","Text"
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

const TRANSCRIPT: Transcript = {
  rows: [
    {
      speaker: "Audrow Nash",
      startTime: createTime(0, 0, 0),
      endTime: createTime(0, 0, 2),
      text: "Hi, Jenny. Would you introduce yourself?",
    },
    {
      speaker: "Jenny Read",
      startTime: createTime(0, 0, 2),
      endTime: createTime(0, 0, 9),
      text: "Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency.",
    },
    {
      speaker: "Audrow Nash",
      startTime: createTime(0, 0, 9),
      endTime: createTime(0, 0, 12),
      text: "And. Tell me about Aria.",
    },
    {
      speaker: "Jenny Read",
      startTime: createTime(0, 0, 12),
      endTime: createTime(0, 0, 50),
      text: "Yeah. Oh, yeah. Is quite a new funding organization in the UK. We were founded by that to Parliament in January 2023, and our mission is to produce transformative societal benefit to science and technology. So we're we're kind of new an experiment basically in a new way of funding for the UK. We're loosely modeled on the RPO and DAF, a model US that is widely perceived as having been very successful. And we haven't really had that kind of program driven, mission focused approach to funding in the UK before. And that's what Aria is trying to do. But to kick off.",
    },
    {
      speaker: "Audrow Nash",
      startTime: createTime(0, 0, 50),
      endTime: createTime(0, 0, 57),
      text: "Now you say loosely focused what what aspects are you taking and what aspects are you leaving from the RPA RPA program.",
    },
    {
      speaker: "Jenny Read",
      startTime: createTime(0, 0, 57),
      endTime: createTime(0, 1, 3),
      text: "Yeah. Well one important thing that we're leaving from DARPA is the defense aspect. So yeah, a different part.",
    },
    {
      speaker: "Audrow Nash",
      startTime: createTime(0, 1, 3),
      endTime: createTime(0, 1, 4),
      text: "No.",
    },
    {
      speaker: "Jenny Read",
      startTime: createTime(0, 1, 4),
      endTime: createTime(0, 1, 29),
      text: "Not exactly. Defense, the military is actually the one area that Aria won't fund. So that's an important change. And that has that is consequences as well. So, you know, Darfur has a sort of built in customer in the form of the Department of Defense or it doesn't. So we have to think hard about how are we going to take the science and tech that we deliver or develop and translate that into societal impact.",
    },
    {
      speaker: "Audrow Nash",
      startTime: createTime(0, 1, 30),
      endTime: createTime(0, 1, 40),
      text: "And so yeah it's about tech transfer basically. So you're funding research so that it can you can build companies out of it and it can improve the ciety in general.",
    },
    {
      speaker: "Jenny Read",
      startTime: createTime(0, 1, 40),
      endTime: createTime(0, 1, 54),
      text: "That's right. So it's an interesting mix because we are not translational in the sense of being super high TRL or close to commercialization. We can fund very low tier or sorry technology residence level meetings.",
    },
    {
      speaker: "Audrow Nash",
      startTime: createTime(0, 1, 54),
      endTime: createTime(0, 1, 57),
      text: "I would never know that acronym. Okay. Yeah.",
    },
    {
      speaker: "Jenny Read",
      startTime: createTime(0, 1, 57),
      endTime: createTime(0, 2, 34),
      text: "Yeah I think we we fund work. That's very basic and speculative. But importantly, we always have a sense of how we're hoping it's going to deliver benefit for society. So we wouldn't fund or we haven't typically funded work that sort of blue sky in the sense we have no idea how this might benefit. Well, we have a purpose in mind. And then we're trying to get the knowledge and the technology together that we need to solve the problem we're focusing on. And we have at that moment seven programs, and each program is focusing on a different problem area, will challenge that we're aiming to solve.",
    },
  ],
};

const EXPECTED_MARKDOWN_WITH_OUTLINE = `## [00:00:00] Introduction and Background

[00:00:00] **Audrow Nash:** Hi, Jenny. Would you introduce yourself?

[00:00:02] **Jenny Read:** Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency.

## [00:00:09] ARIA

[00:00:09] **Audrow Nash:** And. Tell me about Aria.

[00:00:12] **Jenny Read:** Yeah. Oh, yeah. Is quite a new funding organization in the UK. We were founded by that to Parliament in January 2023, and our mission is to produce transformative societal benefit to science and technology. So we're we're kind of new an experiment basically in a new way of funding for the UK. We're loosely modeled on the RPO and DAF, a model US that is widely perceived as having been very successful. And we haven't really had that kind of program driven, mission focused approach to funding in the UK before. And that's what Aria is trying to do. But to kick off.

[00:00:50] **Audrow Nash:** Now you say loosely focused what what aspects are you taking and what aspects are you leaving from the RPA RPA program.

[00:00:57] **Jenny Read:** Yeah. Well one important thing that we're leaving from DARPA is the defense aspect. So yeah, a different part.

[00:01:03] **Audrow Nash:** No.

## [00:01:04] Not DARPA

[00:01:04] **Jenny Read:** Not exactly. Defense, the military is actually the one area that Aria won't fund. So that's an important change. And that has that is consequences as well. So, you know, Darfur has a sort of built in customer in the form of the Department of Defense or it doesn't. So we have to think hard about how are we going to take the science and tech that we deliver or develop and translate that into societal impact.

## [00:01:30] Tech Transfer

[00:01:30] **Audrow Nash:** And so yeah it's about tech transfer basically. So you're funding research so that it can you can build companies out of it and it can improve the ciety in general.

[00:01:40] **Jenny Read:** That's right. So it's an interesting mix because we are not translational in the sense of being super high TRL or close to commercialization. We can fund very low tier or sorry technology residence level meetings.

## [00:01:54] Funding

[00:01:54] **Audrow Nash:** I would never know that acronym. Okay. Yeah.

## [00:01:57] Programs

[00:01:57] **Jenny Read:** Yeah I think we we fund work. That's very basic and speculative. But importantly, we always have a sense of how we're hoping it's going to deliver benefit for society. So we wouldn't fund or we haven't typically funded work that sort of blue sky in the sense we have no idea how this might benefit. Well, we have a purpose in mind. And then we're trying to get the knowledge and the technology together that we need to solve the problem we're focusing on. And we have at that moment seven programs, and each program is focusing on a different problem area, will challenge that we're aiming to solve.
`;

const EXPECTED_MARKDOWN_WITHOUT_OUTLINE = `[00:00:00] **Audrow Nash:** Hi, Jenny. Would you introduce yourself?

[00:00:02] **Jenny Read:** Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency.

[00:00:09] **Audrow Nash:** And. Tell me about Aria.

[00:00:12] **Jenny Read:** Yeah. Oh, yeah. Is quite a new funding organization in the UK. We were founded by that to Parliament in January 2023, and our mission is to produce transformative societal benefit to science and technology. So we're we're kind of new an experiment basically in a new way of funding for the UK. We're loosely modeled on the RPO and DAF, a model US that is widely perceived as having been very successful. And we haven't really had that kind of program driven, mission focused approach to funding in the UK before. And that's what Aria is trying to do. But to kick off.

[00:00:50] **Audrow Nash:** Now you say loosely focused what what aspects are you taking and what aspects are you leaving from the RPA RPA program.

[00:00:57] **Jenny Read:** Yeah. Well one important thing that we're leaving from DARPA is the defense aspect. So yeah, a different part.

[00:01:03] **Audrow Nash:** No.

[00:01:04] **Jenny Read:** Not exactly. Defense, the military is actually the one area that Aria won't fund. So that's an important change. And that has that is consequences as well. So, you know, Darfur has a sort of built in customer in the form of the Department of Defense or it doesn't. So we have to think hard about how are we going to take the science and tech that we deliver or develop and translate that into societal impact.

[00:01:30] **Audrow Nash:** And so yeah it's about tech transfer basically. So you're funding research so that it can you can build companies out of it and it can improve the ciety in general.

[00:01:40] **Jenny Read:** That's right. So it's an interesting mix because we are not translational in the sense of being super high TRL or close to commercialization. We can fund very low tier or sorry technology residence level meetings.

[00:01:54] **Audrow Nash:** I would never know that acronym. Okay. Yeah.

[00:01:57] **Jenny Read:** Yeah I think we we fund work. That's very basic and speculative. But importantly, we always have a sense of how we're hoping it's going to deliver benefit for society. So we wouldn't fund or we haven't typically funded work that sort of blue sky in the sense we have no idea how this might benefit. Well, we have a purpose in mind. And then we're trying to get the knowledge and the technology together that we need to solve the problem we're focusing on. And we have at that moment seven programs, and each program is focusing on a different problem area, will challenge that we're aiming to solve.
`;

describe("makeMarkdownTranscriptFromStrings", () => {
  it("should make a markdown transcript from a transcript and outline", () => {
    expect(
      makeMarkdownTranscriptFromStrings(TRANSCRIPT_STRING, OUTLINE_STRING)
    ).toEqual(EXPECTED_MARKDOWN_WITH_OUTLINE);
  });

  it("should make a markdown transcript from a transcript", () => {
    expect(makeMarkdownTranscriptFromStrings(TRANSCRIPT_STRING)).toEqual(
      EXPECTED_MARKDOWN_WITHOUT_OUTLINE
    );
  });
});
