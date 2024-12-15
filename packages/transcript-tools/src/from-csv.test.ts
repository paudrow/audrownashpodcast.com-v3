import { fromCsv } from "./from-csv";
import { create as createTime } from "@repo/time-tools/create";

const CSV_DATA = `"Speaker Name","Start Time","End Time","Text"
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

const EXPECTED_ROWS_WITHOUT_REDUCTION = [
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
    endTime: createTime(0, 0, 38),
    text: "Yeah. Oh, yeah. Is quite a new funding organization in the UK. We were founded by that to Parliament in January 2023, and our mission is to produce transformative societal benefit to science and technology. So we're we're kind of new an experiment basically in a new way of funding for the UK. We're loosely modeled on the RPO and DAF, a model US that is widely perceived as having been very successful.",
  },
  {
    speaker: "Jenny Read",
    startTime: createTime(0, 0, 38),
    endTime: createTime(0, 0, 50),
    text: "And we haven't really had that kind of program driven, mission focused approach to funding in the UK before. And that's what Aria is trying to do. But to kick off.",
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
    endTime: createTime(0, 2, 19),
    text: "Yeah I think we we fund work. That's very basic and speculative. But importantly, we always have a sense of how we're hoping it's going to deliver benefit for society. So we wouldn't fund or we haven't typically funded work that sort of blue sky in the sense we have no idea how this might benefit. Well, we have a purpose in mind.",
  },
  {
    speaker: "Jenny Read",
    startTime: createTime(0, 2, 19),
    endTime: createTime(0, 2, 34),
    text: "And then we're trying to get the knowledge and the technology together that we need to solve the problem we're focusing on. And we have at that moment seven programs, and each program is focusing on a different problem area, will challenge that we're aiming to solve.",
  },
];

const EXPECTED_ROWS_WITH_REDUCTION = [
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
];

describe("fromCsv", () => {
  it("should parse the transcript without reducing rows", () => {
    const input = CSV_DATA;
    expect(fromCsv(input, false)).toEqual({
      rows: EXPECTED_ROWS_WITHOUT_REDUCTION,
    });
  });

  it("should parse the transcript with reducing rows", () => {
    const input = CSV_DATA;
    expect(fromCsv(input, true)).toEqual({
      rows: EXPECTED_ROWS_WITH_REDUCTION,
    });
  });

  it("should parse the transcript with leading and trailing whitespace", () => {
    const input = `  \n\n${CSV_DATA}\n \n\n  `;
    expect(fromCsv(input, true)).toEqual({
      rows: EXPECTED_ROWS_WITH_REDUCTION,
    });
  });

  it("should skip a line if it has no text", () => {
    const input = `"Speaker Name","Start Time","End Time","Text"
"Audrow Nash","00;00;00;03","00;00;02;06",""
"Jenny Read","00;00;02;09","00;00;09;17","Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency."`;
    expect(fromCsv(input, true)).toEqual({
      rows: [
        {
          speaker: "Jenny Read",
          startTime: createTime(0, 0, 2),
          endTime: createTime(0, 0, 9),
          text: "Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency.",
        },
      ],
    });
  });

  it("should handle a colon separated time", () => {
    const input = CSV_DATA.replace(/;/g, ":");
    expect(fromCsv(input, true)).toEqual({
      rows: EXPECTED_ROWS_WITH_REDUCTION,
    });
  });

  it("should handle empty string", () => {
    expect(() => fromCsv("")).toThrow();
  });

  it("should throw an error if the CSV is invalid", () => {
    expect(() => fromCsv("invalid")).toThrow();
  });

  it("should throw an error if the CSV is missing a column", () => {
    const noEndTime = `"Speaker Name","Start Time","Text"
"Audrow Nash","00;00;00;03","Hi, Jenny. Would you introduce yourself?"
"Jenny Read","00;00;02;09","Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency."
"Audrow Nash","00;00;09;19","And. Tell me about Aria."
"Jenny Read","00;00;12;11","Yeah. Oh, yeah. Is quite a new funding organization in the UK. We were founded by that to Parliament in January 2023, and our mission is to produce transformative societal benefit to science and technology. So we're we're kind of new an experiment basically in a new way of funding for the UK. We're loosely modeled on the RPO and DAF, a model US that is widely perceived as having been very successful."
"Jenny Read","00;00;38;28","And we haven't really had that kind of program driven, mission focused approach to funding in the UK before. And that's what Aria is trying to do. But to kick off."`;
    expect(() => fromCsv(noEndTime)).toThrow();
  });

  it("should throw if the header is invalid", () => {
    const invalidHeader = `"Speaker Name","End Time","Start Time","Text"
"Audrow Nash","00;00;00;03","00;00;02;06","Hi, Jenny. Would you introduce yourself?"
"Jenny Read","00;00;02;09","00;00;09;17","Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency."`;
    expect(() => fromCsv(invalidHeader)).toThrow();
  });

  it("should throw with the wrong number of columns", () => {
    const invalidColumns = `"Speaker Name","Start Time","End Time","Text"
"Audrow Nash","00;00;00;03","00;00;02;06"
"Jenny Read","00;00;02;09","00;00;09;17","Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency."
"Audrow Nash","00;00;09;19","00;00;12;08","And. Tell me about Aria."
"Jenny Read","00;00;12;11","00;00;38;26","Yeah. Oh, yeah. Is quite a new funding organization in the UK. We were founded by that to Parliament in January 2023, and our mission is to produce transformative societal benefit to science and technology. So we're we're kind of new an experiment basically in a new way of funding for the UK. We're loosely modeled on the RPO and DAF, a model US that is widely perceived as having been very successful."
"Jenny Read","00;00;38;28","00;00;50;13","And we haven't really had that kind of program driven, mission focused approach to funding in the UK before. And that's what Aria is trying to do. But to kick off."`;
    expect(() => fromCsv(invalidColumns)).toThrow();
  });

  it("should throw if a start time is empty", () => {
    const emptyStartTime = `"Speaker Name","Start Time","End Time","Text"
"Audrow Nash","","00;00;02;06","Hi, Jenny. Would you introduce yourself?"
"Jenny Read","00;00;02;09","00;00;09;17","Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency."`;
    expect(() => fromCsv(emptyStartTime)).toThrow();
  });

  it("should throw if an end time is empty", () => {
    const emptyEndTime = `"Speaker Name","Start Time","End Time","Text"
"Audrow Nash","00;00;00;03","","Hi, Jenny. Would you introduce yourself?"
"Jenny Read","00;00;02;09","00;00;09;17","Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency."`;
    expect(() => fromCsv(emptyEndTime)).toThrow();
  });

  it("should throw if a start time is an invalid format", () => {
    // invalid start time is 00:00:00 on the first line
    const invalidStartTime = `"Speaker Name","Start Time","End Time","Text"
"Audrow Nash","00:00:00","00;00;02;06","Hi, Jenny. Would you introduce yourself?"
"Jenny Read","00;00;02;09","00;00;09;17","Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency."
"Audrow Nash","00;00;09;19","00;00;12;08","And. Tell me about Aria."
"Jenny Read","00;00;12;11","00;00;38;26","Yeah. Oh, yeah. Is quite a new funding organization in the UK. We were founded by that to Parliament in January 2023, and our mission is to produce transformative societal benefit to science and technology. So we're we're kind of new an experiment basically in a new way of funding for the UK. We're loosely modeled on the RPO and DAF, a model US that is widely perceived as having been very successful."
"Jenny Read","00;00;38;28","00;00;50;13","And we haven't really had that kind of program driven, mission focused approach to funding in the UK before. And that's what Aria is trying to do. But to kick off."`;
    expect(() => fromCsv(invalidStartTime)).toThrow();
  });

  it("should throw if an end time is an invalid format", () => {
    // invalid end time is 00:00:02 on the first line
    const invalidEndTime = `"Speaker Name","Start Time","End Time","Text"
"Audrow Nash","00;00;00;03","00:00:02","Hi, Jenny. Would you introduce yourself?"
"Jenny Read","00;00;02;09","00;00;09;17","Absolutely. I'm Jenny Read. I'm a program director at Aria, the UK's advanced research and invention agency."
"Audrow Nash","00;00;09;19","00;00;12;08","And. Tell me about Aria."
"Jenny Read","00;00;12;11","00;00;38;26","Yeah. Oh, yeah. Is quite a new funding organization in the UK. We were founded by that to Parliament in January 2023, and our mission is to produce transformative societal benefit to science and technology. So we're we're kind of new an experiment basically in a new way of funding for the UK. We're loosely modeled on the RPO and DAF, a model US that is widely perceived as having been very successful."
"Jenny Read","00;00;38;28","00;00;50;13","And we haven't really had that kind of program driven, mission focused approach to funding in the UK before. And that's what Aria is trying to do. But to kick off."`;
    expect(() => fromCsv(invalidEndTime)).toThrow();
  });
});
