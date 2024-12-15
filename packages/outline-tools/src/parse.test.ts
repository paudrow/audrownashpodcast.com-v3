import { parse } from "./parse";
import { create as createTime } from "@repo/time-tools/create";
import { Outline } from "./types";

const OUTLINE_DATA = `00:00 Start
01:04 Introduction to Dave Coleman
01:29 Overview of PickNik Robotics
03:16 Challenges in Robotic Manipulation
04:54 Unstructured Robotics and Applications
13:45 MoveIt Pro: The Commercial Grade Solution
44:11 Human-Robot Interaction and High-Level Commands
45:22 NASA Collaborations and Space Robotics
48:33 Space ROS and Open Source Initiatives
52:06 Challenges in Space Robotics
53:32 The Future of Robotics and Industry Applications
01:02:06 Hivebotics Case Study
01:10:57 Mobile Manipulation and Humanoids
01:19:20 Challenges and Opportunities in Mobile Manipulation
01:25:32 PickNik's Vision and MoveIt Pro
01:27:58 Conclusion and Future Prospects`;

const EXPECTED_OUTLINE: Outline = {
  rows: [
    { time: createTime(0, 0, 0), text: "Start" },
    { time: createTime(0, 1, 4), text: "Introduction to Dave Coleman" },
    { time: createTime(0, 1, 29), text: "Overview of PickNik Robotics" },
    { time: createTime(0, 3, 16), text: "Challenges in Robotic Manipulation" },
    {
      time: createTime(0, 4, 54),
      text: "Unstructured Robotics and Applications",
    },
    {
      time: createTime(0, 13, 45),
      text: "MoveIt Pro: The Commercial Grade Solution",
    },
    {
      time: createTime(0, 44, 11),
      text: "Human-Robot Interaction and High-Level Commands",
    },
    {
      time: createTime(0, 45, 22),
      text: "NASA Collaborations and Space Robotics",
    },
    {
      time: createTime(0, 48, 33),
      text: "Space ROS and Open Source Initiatives",
    },
    { time: createTime(0, 52, 6), text: "Challenges in Space Robotics" },
    {
      time: createTime(0, 53, 32),
      text: "The Future of Robotics and Industry Applications",
    },
    { time: createTime(1, 2, 6), text: "Hivebotics Case Study" },
    { time: createTime(1, 10, 57), text: "Mobile Manipulation and Humanoids" },
    {
      time: createTime(1, 19, 20),
      text: "Challenges and Opportunities in Mobile Manipulation",
    },
    { time: createTime(1, 25, 32), text: "PickNik's Vision and MoveIt Pro" },
    { time: createTime(1, 27, 58), text: "Conclusion and Future Prospects" },
  ],
};

describe("parseOutline", () => {
  it("should parse the outline", () => {
    const input = OUTLINE_DATA;
    expect(parse(input)).toEqual(EXPECTED_OUTLINE);
  });

  it("should throw an error if the outline is empty", () => {
    const input = "";
    expect(() => parse(input)).toThrow();
  });

  it("should throw an error if the outline is missing a time", () => {
    const input = "Start";
    expect(() => parse(input)).toThrow();
  });

  it("should throw an error if the outline is missing a text", () => {
    const input = "00:00";
    expect(() => parse(input)).toThrow();
  });

  it("should throw if the time is invalid", () => {
    const input = "00:99:00 Invalid time";
    expect(() => parse(input)).toThrow();
  });

  it("should add a start entry if it is missing", () => {
    const outlineWithoutStart = OUTLINE_DATA.split("\n").slice(1).join("\n");
    expect(parse(outlineWithoutStart)).toEqual(EXPECTED_OUTLINE);
  });
});
