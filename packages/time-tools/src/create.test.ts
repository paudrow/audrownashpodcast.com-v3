import { create, fromString } from "./create";

describe("create", () => {
  const testCases = [
    {
      input: { hours: 0, minutes: 0, seconds: 0 },
      expected: { hours: 0, minutes: 0, seconds: 0 },
      description: "zero time",
    },
    {
      input: { hours: 1, minutes: 2, seconds: 3 },
      expected: { hours: 1, minutes: 2, seconds: 3 },
      description: "positive time",
    },
  ];

  testCases.forEach((testCase) => {
    it(testCase.description, () => {
      expect(
        create(
          testCase.input.hours,
          testCase.input.minutes,
          testCase.input.seconds
        )
      ).toEqual(testCase.expected);
    });
  });

  const invalidTestCases = [
    {
      input: { hours: -1, minutes: 2, seconds: 3 },
      description: "negative hours",
    },
    {
      input: { hours: 1, minutes: -2, seconds: 3 },
      description: "negative minutes",
    },
    {
      input: { hours: 1, minutes: 2, seconds: -3 },
      description: "negative seconds",
    },
    {
      input: { hours: 1, minutes: 60, seconds: 3 },
      description: "minutes exceed 59",
    },
    {
      input: { hours: 1, minutes: 60, seconds: 60 },
      description: "minutes and seconds exceed 59",
    },
  ];

  invalidTestCases.forEach((testCase) => {
    it(testCase.description, () => {
      expect(() =>
        create(
          testCase.input.hours,
          testCase.input.minutes,
          testCase.input.seconds
        )
      ).toThrow();
    });
  });
});

describe("fromString", () => {
  const testCases = [
    // HH:MM:SS format cases
    {
      input: "00:00:00",
      expected: { hours: 0, minutes: 0, seconds: 0 },
      description: "zero time (HH:MM:SS)",
    },
    {
      input: "00:00:01",
      expected: { hours: 0, minutes: 0, seconds: 1 },
      description: "single digit seconds (HH:MM:SS)",
    },
    {
      input: "00:01:00",
      expected: { hours: 0, minutes: 1, seconds: 0 },
      description: "single digit minutes (HH:MM:SS)",
    },
    {
      input: "01:00:00",
      expected: { hours: 1, minutes: 0, seconds: 0 },
      description: "single digit hours",
    },
    {
      input: "134:00:00",
      expected: { hours: 134, minutes: 0, seconds: 0 },
      description: "triple digit hours",
    },
    {
      input: "34:30:11",
      expected: { hours: 34, minutes: 30, seconds: 11 },
      description: "double digit hours, minutes, and seconds",
    },
    // MM:SS format cases
    {
      input: "00:00",
      expected: { hours: 0, minutes: 0, seconds: 0 },
      description: "zero time (MM:SS)",
    },
    {
      input: "00:01",
      expected: { hours: 0, minutes: 0, seconds: 1 },
      description: "single digit seconds (MM:SS)",
    },
    {
      input: "01:00",
      expected: { hours: 0, minutes: 1, seconds: 0 },
      description: "single digit minutes (MM:SS)",
    },
    {
      input: "59:59",
      expected: { hours: 0, minutes: 59, seconds: 59 },
      description: "maximum valid MM:SS",
    },
  ];

  testCases.forEach((testCase) => {
    it(testCase.description, () => {
      expect(fromString(testCase.input)).toEqual(testCase.expected);
    });
  });

  it("should parse time with custom delimiter", () => {
    const expectedTimeHMS = { hours: 1, minutes: 23, seconds: 45 };
    const expectedTimeMS = { hours: 0, minutes: 23, seconds: 45 };
    expect(fromString("01;23;45", ";")).toEqual(expectedTimeHMS);
    expect(fromString("23;45", ";")).toEqual(expectedTimeMS);
    expect(fromString("01-23-45", "-")).toEqual(expectedTimeHMS);
    expect(fromString("23-45", "-")).toEqual(expectedTimeMS);
    expect(fromString("01.@.23.@.45", ".@.")).toEqual(expectedTimeHMS);
    expect(fromString("23.@.45", ".@.")).toEqual(expectedTimeMS);
  });

  const invalidTestCases = [
    {
      input: "00:00:60",
      description: "seconds exceed 59 (HH:MM:SS)",
    },
    {
      input: "00:60:00",
      description: "minutes exceed 59 (HH:MM:SS)",
    },
    {
      input: "00:60:60",
      description: "minutes and seconds exceed 59 (HH:MM:SS)",
    },
    {
      input: "60:00",
      description: "minutes exceed 59 (MM:SS)",
    },
    {
      input: "00:60",
      description: "seconds exceed 59 (MM:SS)",
    },
    {
      input: "ahtoneusna",
      description: "random string",
    },
    {
      input: "ah:on:ua",
      description: "random string broken by colons",
    },
    {
      input: "00",
      description: "only one time component",
    },
    {
      input: "00:00:00:00",
      description: "too many time components",
    },
  ];

  invalidTestCases.forEach((testCase) => {
    it(testCase.description, () => {
      expect(() => fromString(testCase.input)).toThrow();
    });
  });
});
