export type EventSlot = {
  id: number;
  start: string;
  duration: number;
};
export type EventsSlot = EventSlot[];

export type EventOverlapsRecord = Map<number, number[]>;

export type ScreenDimension = {
  height: number;
  width: number;
};

export type PixelPerMinute = number;
export type CalendarStarTime = string;

export type EventsSlotToDisplay = {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
}[];

export type EventSlotWithPosition = {
  id: number;
  eventStartingVerticalPosition: number;
  eventEndingVerticalPosition: number;
  eventHeight: number;
};