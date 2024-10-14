import {
  convertEventsTimeToMinute,
  filterMutualOverlaps,
  findOverlappingEvents,
} from "./buildEventSlot.utils";
import {
  EventsSlot,
  EventsSlotToDisplay,
  PixelPerMinute,
  ScreenDimension,
} from "./types";

type ParamsBuildEventsSlotWithPosition = {
  events: EventsSlot;
  screenDimension: ScreenDimension;
  pixelsForEachMinute: PixelPerMinute;
  calendarStartTime: string;
};
export const buildEventsSlotWithPosition = ({
  events,
  screenDimension,
  pixelsForEachMinute,
  calendarStartTime,
}: ParamsBuildEventsSlotWithPosition): EventsSlotToDisplay => {
  const { screenWidth } = screenDimension;
  const eventsWithTimeToMinute = events.map((event) =>
    convertEventsTimeToMinute(event, calendarStartTime, pixelsForEachMinute)
  );

  // Sort events by start time : earlier starting time will have lower distance to the top
  const sortedEvents = [...eventsWithTimeToMinute].sort(
    (a, b) => a.eventStartingVerticalPosition - b.eventStartingVerticalPosition
  );

  const eventSlots: EventsSlotToDisplay = [];

  const eventOverlapsRecord = filterMutualOverlaps(
    findOverlappingEvents(sortedEvents)
  );

  for (let i = 0; i < sortedEvents.length; i++) {
    const event = sortedEvents[i];
    let eventLeft: number;
    const overlappingEvents = eventOverlapsRecord.get(i) || [];

    const groupOverlapEvents = [i, ...overlappingEvents].sort();

    const totalOverlaps =
      groupOverlapEvents.length > 1 ? groupOverlapEvents.length : 1;
    let eventWidth = screenWidth / totalOverlaps;

    const eventPositionInGroup = groupOverlapEvents.indexOf(i);
    eventLeft = eventPositionInGroup * eventWidth;

    //Handle where there are only one event overlaps to one other
    //and the other one might has already position
    // e.g : Event 1 overlaps |event 2 (has already position)
    //       Event 3          |event 2
    if (
      overlappingEvents.length == 1 &&
      typeof overlappingEvents[0] == "number"
    ) {
      const eventOverlapingToCurrentEvent =
        sortedEvents[overlappingEvents[0] as number];

      const eventOverLappingToCurrentEventPosition = eventSlots.find(
        (event) => eventOverlapingToCurrentEvent.id === event.id
      );
      if (
        eventOverLappingToCurrentEventPosition &&
        eventOverLappingToCurrentEventPosition?.left != 0
      ) {
        eventLeft = 0;
        eventWidth = eventOverLappingToCurrentEventPosition?.width;
      }
    }

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
