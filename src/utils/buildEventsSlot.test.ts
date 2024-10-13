import {
  EventsSlot,
  EventsSlotToDisplay,
  buildEventsSlotWithPosition,
  ScreenDimension,
} from "./buildEventsSlot";

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
        "Should generate n events no overlap take full width of available zone. e.g :3 events ",
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
      pixelsForEachMinute: 1.25,
      calendarStartTime: "9:00",
      screenDimension: { height: 900, width: 1400 },
      expectedResult: [
        { id: 1, top: 0, left: 0, width: 1400, height: 75 },
        { id: 2, top: 75, left: 0, width: 1400, height: 75 },
        { id: 3, top: 168.75, left: 0, width: 1400, height: 62.5 },
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
        const result = buildEventsSlotWithPosition(
          events,
          screenDimension,
          pixelsForEachMinute,
          calendarStartTime
        );
        expect(result).toEqual(expectedResult);
      });
    }
  );
});
