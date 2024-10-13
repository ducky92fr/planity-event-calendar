import { timeToMinutes } from "./utils";

/* eslint-disable @typescript-eslint/no-unused-vars */
type EventSlot = {
  id: number;
  start: string;
  duration: number;
};
export type EventsSlot = EventSlot[];

export type ScreenDimension = {
  height: number;
  width: number;
};

export type EventsSlotToDisplay = {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
}[];

export const buildEventsSlotWithPosition = (
  events: EventsSlot,
  screenDimension: ScreenDimension,
  pixelsForEachMinute: number,
  calendarStartTime: string
): EventsSlotToDisplay => {
  const { width: screenWidth } = screenDimension;
  const eventWidth = screenWidth;
  const eventHorizontalPosition = 0;

  const calendarStartTimeInMinutes = timeToMinutes(calendarStartTime);

  const eventSlots = events.map((event) => {
    const eventStarTimeInMinutes = timeToMinutes(event.start);
    const eventVerticalPosition =
      (eventStarTimeInMinutes - calendarStartTimeInMinutes) *
      pixelsForEachMinute;
    const eventHeight = event.duration * pixelsForEachMinute;

    return {
      id: event.id,
      top: eventVerticalPosition,
      left: eventHorizontalPosition,
      width: eventWidth,
      height: eventHeight,
    };
  });
  return eventSlots;
};
