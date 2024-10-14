import { buildEventsSlotWithPosition } from "../buildEventsSlot";
import { EventsSlot, EventsSlotToDisplay, ScreenDimension } from "../types";

const screenDimension = { screenHeight: 900, screenWidth: 1400 };
const calendarStartTime = "9:00";
const pixelsForEachMinute = 1.25;

describe("buildEventSlot", () => {
  describe("buildEventsSlotWithPosition", () => {
    const useCases: Array<{
      description: string;
      events: EventsSlot;
      screenDimension: ScreenDimension;
      expectedResult: EventsSlotToDisplay;
      pixelsForEachMinute: number;
      calendarStartTime: string;
    }> = [
      {
        description:
          "1. Should generate n events no overlap take full width of available zone. e.g :3 events ",
        events: [
          {
            id: 1,
            start: "9:00",
            duration: 60,
          },
          {
            id: 2,
            start: "10:00",
            duration: 60,
          },
          {
            id: 3,
            start: "11:15",
            duration: 50,
          },
        ],
        pixelsForEachMinute,
        calendarStartTime,
        screenDimension,
        expectedResult: [
          { id: 1, top: 0, left: 0, width: 1400, height: 75 },
          { id: 2, top: 75, left: 0, width: 1400, height: 75 },
          { id: 3, top: 168.75, left: 0, width: 1400, height: 62.5 },
        ],
      },
      {
        description:
          "2. Should generate n events overlap happens in the same time frames. e.g : 4 events overlaps ",
        events: [
          {
            id: 1,
            start: "9:00",
            duration: 60,
          },
          {
            id: 2,
            start: "9:15",
            duration: 60,
          },
          {
            id: 3,
            start: "9:30",
            duration: 50,
          },
          {
            id: 4,
            start: "9:25",
            duration: 50,
          },
        ],
        pixelsForEachMinute,
        calendarStartTime,
        screenDimension,
        expectedResult: [
          { id: 1, top: 0, left: 0, width: 1400 / 4, height: 75 },
          { id: 2, top: 18.75, left: 1400 / 4, width: 1400 / 4, height: 75 },
          {
            id: 4,
            top: 31.25,
            left: (1400 / 4) * 2,
            width: 1400 / 4,
            height: 62.5,
          },
          {
            id: 3,
            top: 37.5,
            left: (1400 / 4) * 3,
            width: 1400 / 4,
            height: 62.5,
          },
        ],
      },
      {
        description:
          "3. Should generate 4 events : One overlaps to groups of 3 events",
        events: [
          {
            id: 2,
            start: "10:15",
            duration: 200,
          },
          {
            id: 3,
            start: "10:15",
            duration: 100,
          },
          {
            id: 4,
            start: "12:0",
            duration: 80,
          },
          {
            id: 5,
            start: "13:25",
            duration: 30,
          },
        ],
        pixelsForEachMinute,
        calendarStartTime,
        screenDimension,
        expectedResult: [
          { id: 2, top: 93.75, left: 0, width: 700, height: 250 },
          { id: 3, top: 93.75, left: 700, width: 700, height: 125 },
          { id: 4, top: 225, left: 700, width: 700, height: 100 },
          { id: 5, top: 331.25, left: 700, width: 700, height: 37.5 },
        ],
      },
      {
        description:
          "4. Should generate 5 events : One overlaps to groups of 3 events, one doesn't overlap to any",
        events: [
          {
            id: 1,
            start: "9:00",
            duration: 60,
          },
          {
            id: 2,
            start: "10:15",
            duration: 200,
          },
          {
            id: 3,
            start: "10:15",
            duration: 100,
          },
          {
            id: 4,
            start: "12:0",
            duration: 80,
          },
          {
            id: 5,
            start: "13:25",
            duration: 30,
          },
        ],
        pixelsForEachMinute,
        calendarStartTime,
        screenDimension,
        expectedResult: [
          { id: 1, top: 0, left: 0, width: 1400, height: 75 },
          { id: 2, top: 93.75, left: 0, width: 700, height: 250 },
          { id: 3, top: 93.75, left: 700, width: 700, height: 125 },
          { id: 4, top: 225, left: 700, width: 700, height: 100 },
          { id: 5, top: 331.25, left: 700, width: 700, height: 37.5 },
        ],
      },
      {
        description:
          "5. Should generate 4 events : 3 events overlaps together, one overlaps with one of 3",
        events: [
          {
            id: 1,
            start: "9:00",
            duration: 20,
          },
          {
            id: 2,
            start: "9:15",
            duration: 20,
          },
          {
            id: 3,
            start: "9:15",
            duration: 120,
          },
          {
            id: 4,
            start: "9:45",
            duration: 60,
          },
        ],
        pixelsForEachMinute,
        calendarStartTime,
        screenDimension,
        expectedResult: [
          { id: 1, top: 0, left: 0, width: 1400 / 3, height: 25 },
          { id: 2, top: 18.75, left: 1400 / 3, width: 1400 / 3, height: 25 },
          {
            id: 3,
            top: 18.75,
            left: (1400 / 3) * 2,
            width: 1400 / 3,
            height: 150,
          },
          {
            id: 4,
            top: 56.25,
            left: 0,
            width: 1400 / 3,
            height: 75,
          },
        ],
      },
    ];
    useCases.forEach(
      ({
        description,
        events,
        screenDimension,
        pixelsForEachMinute,
        expectedResult,
        calendarStartTime,
      }) => {
        test(description, () => {
          const result = buildEventsSlotWithPosition({
            events,
            screenDimension,
            pixelsForEachMinute,
            calendarStartTime,
          });
          expect(result).toEqual(expectedResult);
        });
      }
    );
  });
});
