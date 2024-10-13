import { timeToMinutes } from "./utils";

/* eslint-disable @typescript-eslint/no-unused-vars */
type EventSlot = {
  id: number;
  start: string;
  duration: number;
};
export type EventsSlot = EventSlot[];
type EventOverlapsRecord = Map<number, number[]>;
export type ScreenDimension = {
  height: number;
  width: number;
};
type PixelPerMinute = number;
type CalendarStarTime = string;
export type EventsSlotToDisplay = {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
}[];

type EventSlotWithPosition = {
  id: number;
  eventStartingVerticalPosition: number;
  eventEndingVerticalPosition: number;
  eventHeight: number;
};

export const convertEventsTimeToMinute = (
  event: EventSlot,
  calendarStartTime: CalendarStarTime,
  pixelsForEachMinute: PixelPerMinute
): EventSlotWithPosition => {
  const eventStartTimeInMinutes = timeToMinutes(event.start);

  const calendarStartTimeInMinutes = timeToMinutes(calendarStartTime);

  const eventHeight = event.duration * pixelsForEachMinute;

  //eventStartingVerticalPosition and eventEndingVerticalPosition as the distance from event to the top which is the beginning of a day. e:g 9:00 is the beginning
  const eventStartingVerticalPosition =
    (eventStartTimeInMinutes - calendarStartTimeInMinutes) *
    pixelsForEachMinute;

  const eventEndingVerticalPosition =
    eventStartingVerticalPosition + eventHeight;

  return {
    id: event.id,
    eventStartingVerticalPosition,
    eventEndingVerticalPosition,
    eventHeight,
  };
};
const findOverlappingEvents = (
  sortedEvents: EventSlotWithPosition[]
): EventOverlapsRecord => {
  const eventOverlapsRecord: EventOverlapsRecord = new Map();

  for (let i = 0; i < sortedEvents.length; i++) {
    const event = sortedEvents[i];

    for (let j = i + 1; j < sortedEvents.length; j++) {
      const otherEvent = sortedEvents[j];

      if (
        otherEvent.eventStartingVerticalPosition <
        event.eventEndingVerticalPosition
      ) {
        if (!eventOverlapsRecord.has(i)) {
          eventOverlapsRecord.set(i, []);
        }
        if (!eventOverlapsRecord.has(j)) {
          eventOverlapsRecord.set(j, []);
        }
        eventOverlapsRecord.get(i)!.push(j);
        eventOverlapsRecord.get(j)!.push(i);
      }
    }
  }
  return eventOverlapsRecord;
};

export const buildEventsSlotWithPosition = (
  events: EventsSlot,
  screenDimension: ScreenDimension,
  pixelsForEachMinute: PixelPerMinute,
  calendarStartTime: string
): EventsSlotToDisplay => {
  const { width: screenWidth } = screenDimension;
  const eventsWithTimeToMinute = events.map((event) =>
    convertEventsTimeToMinute(event, calendarStartTime, pixelsForEachMinute)
  );

  // Sort events by start time : earlier starting time will have lower distance to the top
  const sortedEvents = [...eventsWithTimeToMinute].sort(
    (a, b) => a.eventStartingVerticalPosition - b.eventStartingVerticalPosition
  );

  const eventSlots: EventsSlotToDisplay = [];
  const eventOverlapsRecord = findOverlappingEvents(sortedEvents);

  for (let i = 0; i < sortedEvents.length; i++) {
    const event = sortedEvents[i];

    const overlappingEvents = eventOverlapsRecord.get(i) || [];
    const groupOverlapEvents = [i, ...overlappingEvents].sort();
    const totalOverlaps =
      groupOverlapEvents.length > 1 ? groupOverlapEvents.length : 1;
    const eventWidth = screenWidth / totalOverlaps;

    const eventPositionInGroup = groupOverlapEvents.indexOf(i);
    const eventLeft = eventPositionInGroup * eventWidth;

    eventSlots.push({
      id: event.id,
      top: event.eventStartingVerticalPosition,
      left: eventLeft,
      width: eventWidth,
      height: event.eventHeight,
    });
  }

  return eventSlots;
};
