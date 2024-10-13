import { findOverlappingEvents } from "../buildEventSlot.utils";
import { EventSlotWithPosition } from "../types";

// describe("Utility builder: generateEventsWithTimeInMinutes", () => {});

describe("Utility builder: findOverlappingEvents", () => {
  const useCases: Array<{
    description: string;
    sortedEvents: EventSlotWithPosition[];
    expectedResult: Map<number, number[]>;
  }> = [
    {
      description:
        "Should generate n events no overlap take full width of available zone. e.g :3 events ",
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
          id: 4,
          eventStartingVerticalPosition: 31.25,
          eventEndingVerticalPosition: 93.75,
          eventHeight: 62.5,
        },
        {
          id: 3,
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
  ];

  useCases.forEach(({ description, sortedEvents, expectedResult }) => {
    test(description, () => {
      const result = findOverlappingEvents(sortedEvents);

      expect(result).toEqual(expectedResult);
    });
  });
});
