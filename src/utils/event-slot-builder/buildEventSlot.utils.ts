import { timeToMinutes } from "../utils";
import {
  CalendarStarTime,
  EventOverlapsRecord,
  EventSlot,
  EventSlotWithPosition,
  PixelPerMinute,
} from "./types";

export const findOverlappingEvents = (
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

export const convertEventsTimeToMinute = (
  event: EventSlot,
  calendarStartTime: CalendarStarTime,
  pixelsForEachMinute: PixelPerMinute
): EventSlotWithPosition => {
  const eventStartTimeInMinutes = timeToMinutes(event.start);

  const calendarStartTimeInMinutes = timeToMinutes(calendarStartTime);

  const eventHeight = event.duration * pixelsForEachMinute;

  //eventStartingVerticalPosition and eventEndingVerticalPosition
  //as the distance from event to the top which is the beginning of a day.
  //e:g 9:00 is the beginning

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

export const filterMutualOverlaps = (
  eventOverlaps: Map<number, number[]>
): Map<number, (number | number[] | [number, number[]])[]> => {
  const groupedOverlaps = new Map<
    number,
    (number | number[] | [number, number[]])[]
  >();

  for (const [event, overlaps] of eventOverlaps.entries()) {
    const nonOverlappingGroup: number[] = [];
    const overlapGroup: number[] = [];

    // Process overlaps: avoid grouping events that overlap with each other
    overlaps.forEach((overlapEvent) => {
      const overlapEventsForCurrent = eventOverlaps.get(overlapEvent) || [];

      // Check if this overlap event overlaps with others in the overlaps list
      const mutualOverlapExists = overlaps.some(
        (otherEvent) =>
          otherEvent !== overlapEvent &&
          overlapEventsForCurrent.includes(otherEvent)
      );

      // If mutual overlaps exist, keep them separate
      if (mutualOverlapExists) {
        overlapGroup.push(overlapEvent);
      } else {
        // Otherwise, group them together in non-overlapping group
        nonOverlappingGroup.push(overlapEvent);
      }
    });

    // If there are non-overlapping events, group them in a nested array
    if (nonOverlappingGroup.length > 1) {
      groupedOverlaps.set(event, [nonOverlappingGroup]);
    } else {
      groupedOverlaps.set(
        event,
        overlapGroup.length > 0 ? overlapGroup : overlaps
      );
    }
  }
  return groupedOverlaps;
};
