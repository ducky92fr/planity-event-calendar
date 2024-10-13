import {
  EventsSlot,
  EventsSlotToDisplay,
  generateEventsSlot,
  ScreenDimension,
} from "./buildEventsSlot";

describe("generateEventsSlot", () => {
  const useCases: Array<{
    description: string;
    events: EventsSlot;
    screenDimension: ScreenDimension;
    expectedResult: EventsSlotToDisplay;
    pixelPerMinute: number;
    openingTime: string;
  }> = [
    {
      description:
        "Should generate 1 event no overlap take full width of available zone",
      events: [
        {
          id: 1,
          start: "9:00",
          duration: 60,
        },
      ],
      pixelPerMinute: 1.25,
      openingTime: "9:00",
      screenDimension: { height: 900, width: 1400 },
      expectedResult: [{ id: 1, top: 0, left: 0, width: 1400, height: 75 }],
    },
  ];

  useCases.forEach(
    ({
      description,
      events,
      screenDimension,
      pixelPerMinute,
      expectedResult,
      openingTime,
    }) => {
      test(description, () => {
        const result = generateEventsSlot(
          events,
          screenDimension,
          pixelPerMinute,
          openingTime
        );
        expect(result).toEqual(expectedResult);
      });
    }
  );
});
