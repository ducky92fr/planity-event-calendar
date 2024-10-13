import { Time24h } from "types";
import {
  calculateTimeSlotsWithHeight,
  generateTimeSlots,
  TimeSlots,
  TimeSlotsWithHeight,
} from "./buildTimeSlot";

describe("utils", () => {
  describe("generateTimeSlots", () => {
    const useCases: Array<{
      description: string;
      openingTime: Time24h;
      closingTime: Time24h;
      expectedSlots: TimeSlots;
    }> = [
      {
        description:
          "should generate time slots when starting with exact hour (e.g: 9:00)",
        openingTime: { hour: 9, minute: 0 },
        closingTime: { hour: 11, minute: 0 },
        expectedSlots: ["09:00", "09:30", "10:00", "10:30", "11:00"],
      },
      {
        description:
          "should generate time slots when starting with non-rounded minutes (e.g: 9:10)",
        openingTime: { hour: 9, minute: 10 },
        closingTime: { hour: 11, minute: 0 },
        expectedSlots: ["09:10", "09:30", "10:00", "10:30", "11:00"],
      },
      {
        description:
          "should generate time slots when starting at a half-hour mark (e.g: 9:30)",
        openingTime: { hour: 9, minute: 30 },
        closingTime: { hour: 11, minute: 0 },
        expectedSlots: ["09:30", "10:00", "10:30", "11:00"],
      },
      {
        description:
          "should generate time slots correctly when starting close to the next hour (e.g: 9:45)",
        openingTime: { hour: 9, minute: 45 },
        closingTime: { hour: 12, minute: 0 },
        expectedSlots: ["09:45", "10:00", "10:30", "11:00", "11:30", "12:00"],
      },
      {
        description:
          "should handle when closing time is before the next interval (e.g., 9:00 to 9:15)",
        openingTime: { hour: 9, minute: 0 },
        closingTime: { hour: 9, minute: 15 },
        expectedSlots: ["09:00", "09:15"],
      },
      {
        description: "should avoid duplicate values when times match intervals",
        openingTime: { hour: 9, minute: 30 },
        closingTime: { hour: 10, minute: 0 },
        expectedSlots: ["09:30", "10:00"],
      },
    ];

    useCases.forEach(
      ({ description, openingTime, closingTime, expectedSlots }) => {
        test(description, () => {
          const result = generateTimeSlots(openingTime, closingTime);
          expect(result).toEqual(expectedSlots);
        });
      }
    );
  });
  describe("calculateTimeSlotsWithHeight", () => {
    const useCases: Array<{
      description: string;
      timeSlots: TimeSlots;
      screenHeight: number;
      expectedResult: TimeSlotsWithHeight;
    }> = [
      {
        description:
          "should calculate correct height when screenHeight is evenly divisible by number of time slots",
        timeSlots: ["09:00", "09:30", "10:00"],
        screenHeight: 600,
        expectedResult: [
          { time: "09:00", height: 200 },
          { time: "09:30", height: 200 },
          { time: "10:00", height: 200 },
        ],
      },
      {
        description:
          "should use minimum height for each time slot when calculated height is less than minimum",
        timeSlots: ["09:00", "09:30", "10:00", "10:30"],
        screenHeight: 80,
        expectedResult: [
          { time: "09:00", height: 24 },
          { time: "09:30", height: 24 },
          { time: "10:00", height: 24 },
          { time: "10:30", height: 24 },
        ],
      },
      {
        description:
          "should calculate correct height when screenHeight is not evenly divisible by the number of time slots",
        timeSlots: ["09:00", "09:30"],
        screenHeight: 250,
        expectedResult: [
          { time: "09:00", height: 125 },
          { time: "09:30", height: 125 },
        ],
      },
    ];

    useCases.forEach(
      ({ description, timeSlots, screenHeight, expectedResult }) => {
        test(description, () => {
          const result = calculateTimeSlotsWithHeight(timeSlots, screenHeight);
          expect(result).toEqual(expectedResult);
        });
      }
    );
  });
});
