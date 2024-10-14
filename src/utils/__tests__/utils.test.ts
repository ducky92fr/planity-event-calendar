import { WorkingHours } from "types";
import { ScreenDimension } from "utils/event-slot-builder/types";
import { calculatePixelHeightPerMinute, timeToMinutes } from "../utils";

describe("utils", () => {
  describe("Utility builder: timeToMinutes", () => {
    const useCases: Array<{
      description: string;
      time: string;
      expectedResult: number;
    }> = [
      {
        description: "Should correctly convert '09:30' to minutes",
        time: "09:30",
        expectedResult: 570,
      },

      {
        description: "Should correctly convert '12:45' to minutes",
        time: "12:45",
        expectedResult: 765,
      },
    ];

    useCases.forEach(({ description, time, expectedResult }) => {
      test(description, () => {
        const result = timeToMinutes(time);
        expect(result).toEqual(expectedResult);
      });
    });
  });
  describe("Utility builder: calculatePixelHeightPerMinute", () => {
    const useCases: Array<{
      description: string;
      workingHours: WorkingHours;
      screenDimension: ScreenDimension;
      expectedResult: number;
    }> = [
      {
        description:
          "Should calculate pixels per minute for 9:00 to 17:00 with 800px height",
        workingHours: {
          openingTime: { hour: 9, minute: 0 },
          closingTime: { hour: 17, minute: 0 },
        },
        screenDimension: { screenHeight: 800, screenWidth: 900 },
        expectedResult: 1.6667,
      },
      {
        description:
          "Should calculate pixels per minute for 7:30 to 19:45 with 1000px height",
        workingHours: {
          openingTime: { hour: 7, minute: 30 },
          closingTime: { hour: 19, minute: 45 },
        },
        screenDimension: { screenHeight: 1000, screenWidth: 1000 },
        expectedResult: 1.2345,
      },
    ];

    useCases.forEach(
      ({ description, workingHours, screenDimension, expectedResult }) => {
        test(description, () => {
          const result = calculatePixelHeightPerMinute(
            workingHours as WorkingHours,
            screenDimension
          );
          expect(result).toBeCloseTo(expectedResult);
        });
      }
    );
  });
});
