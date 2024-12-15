import { toYouTubeTimeString, toString } from "./to-string";

describe("toYouTubeTimeString", () => {
  const testCases = [
    {
      input: { hours: 0, minutes: 0, seconds: 0 },
      expected: "0:00",
      description: "zero time",
    },
    {
      input: { hours: 0, minutes: 0, seconds: 1 },
      expected: "0:01",
      description: "single digit seconds",
    },
    {
      input: { hours: 0, minutes: 1, seconds: 0 },
      expected: "1:00",
      description: "single digit minutes",
    },
    {
      input: { hours: 1, minutes: 0, seconds: 0 },
      expected: "1:00:00",
      description: "single digit hours",
    },
    {
      input: { hours: 0, minutes: 0, seconds: 59 },
      expected: "0:59",
      description: "double digit seconds",
    },
    {
      input: { hours: 0, minutes: 59, seconds: 0 },
      expected: "59:00",
      description: "double digit minutes",
    },
    {
      input: { hours: 79, minutes: 0, seconds: 0 },
      expected: "79:00:00",
      description: "double digit hours",
    },
    {
      input: { hours: 379, minutes: 0, seconds: 0 },
      expected: "379:00:00",
      description: "triple digit hours",
    },
    {
      input: { hours: 79, minutes: 30, seconds: 11 },
      expected: "79:30:11",
      description: "double digit hours, minutes, and seconds",
    },
  ];

  test.each(testCases)("formats $description", ({ input, expected }) => {
    expect(toYouTubeTimeString(input)).toBe(expected);
  });
});

describe("toString", () => {
  const testCases = [
    {
      input: { hours: 0, minutes: 0, seconds: 0 },
      expected: "00:00:00",
      description: "zero time",
    },
    {
      input: { hours: 1, minutes: 2, seconds: 3 },
      expected: "01:02:03",
      description: "single digit hours, minutes, and seconds",
    },
    {
      input: { hours: 10, minutes: 20, seconds: 30 },
      expected: "10:20:30",
      description: "double digit hours, minutes, and seconds",
    },
    {
      input: { hours: 100, minutes: 20, seconds: 30 },
      expected: "100:20:30",
      description: "triple digit hours, minutes, and seconds",
    },
  ];

  test.each(testCases)("formats $description", ({ input, expected }) => {
    expect(toString(input)).toBe(expected);
  });
});
