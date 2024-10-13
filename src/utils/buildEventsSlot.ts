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

export const generateEventsSlot = (
  events: EventsSlot,
  screenDimension: ScreenDimension,
  pixelPerMinute: number,
  openingTime: string
): EventsSlotToDisplay => {
  //fakeData
  const eventSlots = [{ id: 1, top: 1, left: 1, width: 1, height: 1 }];
  return eventSlots;
};
