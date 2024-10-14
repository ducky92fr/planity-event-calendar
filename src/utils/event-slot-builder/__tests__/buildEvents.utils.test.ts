import {
  findOverlappingEvents,
  generateEventsVerticalPosition,
  separateOverlapsGroups,
} from "../buildEventSlot.utils";
import {
  EventOverlapsRecordGrouped,
  EventSlot,
  EventSlotWithPosition,
} from "../types";

describe("buildEvents.utils", () => {
  describe("Utility builder: generateEventsVerticalPosition", () => {
    const useCases: Array<{
      description: string;
      event: EventSlot;
      calendarStartTime: string;
      pixelsForEachMinute: number;
      expectedResult: EventSlotWithPosition;
    }> = [
      {
        description:
          "Should calculate the correct vertical positions and height for an event starting at 10:00",
        event: {
          id: 1,
          start: "10:00",
          duration: 60,
        },
        calendarStartTime: "9:00",
        pixelsForEachMinute: 1.25,
        expectedResult: {
          id: 1,
          eventStartingVerticalPosition: 75,
          eventEndingVerticalPosition: 150,
          eventHeight: 75,
        },
      },
    ];

    useCases.forEach(
      ({
        description,
        event,
        calendarStartTime,
        pixelsForEachMinute,
        expectedResult,
      }) => {
        test(description, () => {
          const result = generateEventsVerticalPosition(
            event,
            calendarStartTime,
            pixelsForEachMinute
          );
          expect(result).toEqual(expectedResult);
        });
      }
    );
  });

  describe("separateOverlapsGroups", () => {
    const useCases: Array<{
      description: string;
      eventOverlaps: Map<number, number[]>;
      expectedResult: Map<number, EventOverlapsRecordGrouped>;
    }> = [
      {
        description: "Should group mutually overlapping events",
        eventOverlaps: new Map([
          [0, [1, 2]],
          [1, [0]],
          [2, [0]],
        ]),
        expectedResult: new Map([
          [0, [[1, 2]]],
          [1, [0]],
          [2, [0]],
        ]),
      },
      {
        description: "Should handle non-overlapping events",
        eventOverlaps: new Map([
          [0, [1]],
          [1, [0]],
          [2, [3]],
          [3, [2]],
        ]),
        expectedResult: new Map([
          [0, [1]],
          [1, [0]],
          [2, [3]],
          [3, [2]],
        ]),
      },
    ];

    useCases.forEach(({ description, eventOverlaps, expectedResult }) => {
      test(description, () => {
        const result = separateOverlapsGroups(eventOverlaps);
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe("Utility builder: findOverlappingEvents", () => {
    const useCases: Array<{
      description: string;
      sortedEvents: EventSlotWithPosition[];
      expectedResult: Map<number, number[]>;
    }> = [
      {
        description:
          "Should generate n events no overlap take full width of available zone. e.g : 3 events",
        sortedEvents: [
          {
            id: 1,
            eventStartingVerticalPosition: 0,
            eventEndingVerticalPosition: 75,
            eventHeight: 75,
          },
          {
            id: 2,
            eventStartingVerticalPosition: 18.75,
            eventEndingVerticalPosition: 93.75,
            eventHeight: 75,
          },
          {
            id: 3,
            eventStartingVerticalPosition: 31.25,
            eventEndingVerticalPosition: 93.75,
            eventHeight: 62.5,
          },
          {
            id: 4,
            eventStartingVerticalPosition: 37.5,
            eventEndingVerticalPosition: 100,
            eventHeight: 62.5,
          },
        ],
        expectedResult: new Map([
          [0, [1, 2, 3]],
          [1, [0, 2, 3]],
          [2, [0, 1, 3]],
          [3, [0, 1, 2]],
        ]),
      },
      {
        description:
          "Should return an empty overlap record for non-overlapping events",
        sortedEvents: [
          {
            id: 1,
            eventStartingVerticalPosition: 0,
            eventEndingVerticalPosition: 50,
            eventHeight: 50,
          },
          {
            id: 2,
            eventStartingVerticalPosition: 60,
            eventEndingVerticalPosition: 100,
            eventHeight: 40,
          },
          {
            id: 3,
            eventStartingVerticalPosition: 110,
            eventEndingVerticalPosition: 150,
            eventHeight: 40,
          },
        ],
        expectedResult: new Map(), // No overlaps
      },
      {
        description:
          "Should handle edge cases where events start and end at the same time",
        sortedEvents: [
          {
            id: 1,
            eventStartingVerticalPosition: 0,
            eventEndingVerticalPosition: 50,
            eventHeight: 50,
          },
          {
            id: 2,
            eventStartingVerticalPosition: 50,
            eventEndingVerticalPosition: 100,
            eventHeight: 50,
          },
          {
            id: 3,
            eventStartingVerticalPosition: 100,
            eventEndingVerticalPosition: 150,
            eventHeight: 50,
          },
        ],
        expectedResult: new Map(), // No overlaps since they start where the others end
      },
    ];

    useCases.forEach(({ description, sortedEvents, expectedResult }) => {
      test(description, () => {
        const result = findOverlappingEvents(sortedEvents);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
