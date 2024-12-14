import { parse } from "./parse";

describe("parse", () => {
  it("should parse time", () => {
    expect(parse("2024-01-01")).toEqual(new Date("2024-01-01"));
  });
});
