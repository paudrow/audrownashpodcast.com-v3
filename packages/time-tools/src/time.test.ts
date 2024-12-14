import { parseTime } from "./time";

describe("time", () => {
  it("should parse time", () => {
    expect(parseTime("2024-01-01")).toEqual(new Date("2024-01-01"));
  });
});
