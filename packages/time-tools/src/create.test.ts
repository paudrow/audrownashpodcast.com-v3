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
    {
      input: "00:00:00",
      expected: { hours: 0, minutes: 0, seconds: 0 },
      description: "zero time",
    },
    {
      input: "00:00:01",
      expected: { hours: 0, minutes: 0, seconds: 1 },
      description: "single digit seconds",
    },
    {
      input: "00:01:00",
      expected: { hours: 0, minutes: 1, seconds: 0 },
      description: "single digit minutes",
    },
    {
      input: "01:00:00",
      expected: { hours: 1, minutes: 0, seconds: 0 },
      description: "single digit hours",
    },
    {
      input: "00:00:10",
      expected: { hours: 0, minutes: 0, seconds: 10 },
      description: "double digit seconds",
    },
    {
      input: "00:10:00",
      expected: { hours: 0, minutes: 10, seconds: 0 },
      description: "double digit minutes",
    },
    {
      input: "10:00:00",
      expected: { hours: 10, minutes: 0, seconds: 0 },
      description: "double digit hours",
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
  ];

  testCases.forEach((testCase) => {
    it(testCase.description, () => {
      expect(fromString(testCase.input)).toEqual(testCase.expected);
    });
  });

  it("should parse time with custom delimiter", () => {
    const expectedTime = { hours: 1, minutes: 23, seconds: 45 };
    expect(fromString("01;23;45", ";")).toEqual(expectedTime);
    expect(fromString("01-23-45", "-")).toEqual(expectedTime);
    expect(fromString("01.@.23.@.45", ".@.")).toEqual(expectedTime);
  });

  const invalidTestCases = [
    {
      input: "00:00:60",
      description: "seconds exceed 59",
    },
    {
      input: "00:00:160",
      description: "three digit seconds",
    },
    {
      input: "00:60:00",
      description: "minutes exceed 59",
    },
    {
      input: "00:160:00",
      description: "three digit minutes",
    },
    {
      input: "00:60:60",
      description: "minutes and seconds exceed 59",
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
      input: "00:00",
      description: "two time components",
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
