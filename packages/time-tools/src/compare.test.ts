import { create as createTime } from "./create";
import { compare } from "./compare";
import { Time } from "./types";

describe("compare", () => {
  const timesToCheckAreEqual = [
    createTime(0, 0, 0),
    createTime(0, 0, 1),
    createTime(0, 1, 0),
    createTime(1, 0, 0),
    createTime(0, 1, 1),
    createTime(1, 0, 1),
    createTime(1, 1, 0),
    createTime(1, 1, 1),
    createTime(0, 0, 3),
    createTime(0, 2, 0),
    createTime(1, 0, 0),
    createTime(0, 2, 3),
    createTime(1, 0, 3),
    createTime(1, 2, 0),
    createTime(1, 2, 3),
  ];

  timesToCheckAreEqual.forEach((time) => {
    it(`should return 0 if the times are equal: ${time}`, () => {
      expect(compare(time, time)).toBe(0);
    });
  });

  const greaterThanTimes: [Time, Time][] = [
    [createTime(0, 0, 1), createTime(0, 0, 0)],
    [createTime(0, 1, 0), createTime(0, 0, 0)],
    [createTime(1, 0, 0), createTime(0, 0, 0)],
    [createTime(2, 2, 2), createTime(2, 2, 1)],
    [createTime(2, 2, 2), createTime(2, 1, 2)],
    [createTime(2, 2, 2), createTime(1, 2, 2)],
  ];

  greaterThanTimes.forEach(([greaterThan, lessThan]) => {
    it(`should return 1 if the first time is greater than the second: ${greaterThan} > ${lessThan}`, () => {
      expect(compare(greaterThan, lessThan)).toBe(1);
    });

    it(`should return -1 if the first time is less than the second: ${lessThan} < ${greaterThan}`, () => {
      expect(compare(lessThan, greaterThan)).toBe(-1);
    });
  });

});
