import { Time24h } from "types";

export type TimeSlots = string[];

export const generateTimeSlots = (
  openingTime: Time24h,
  closingTime: Time24h
): TimeSlots => {
  const timeSlots: TimeSlots = [];

  let currentHour = openingTime.hour;
  let currentMinute = openingTime.minute;

  //First we push the opening time
  timeSlots.push(
    `${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(
      2,
      "0"
    )}`
  );

  // Round the minutes to the next nearest 30-minute mark AFTER the first time slot
  // Example: Starting time : 9:10 . This will round it to 9:30
  if (currentMinute > 0 && currentMinute < 30) {
    currentMinute = 30;
  }

  //Continue generating the next 30 minutes intervals
  while (
    currentHour < closingTime.hour ||
    (currentHour === closingTime.hour && currentMinute <= closingTime.minute)
  ) {
    const timeLabel = `${String(currentHour).padStart(2, "0")}:${String(
      currentMinute
    ).padStart(2, "0")}`;

    // Avoid pushing duplicate time (skip if it's already in timeSlots)
    if (timeSlots[timeSlots.length - 1] !== timeLabel) {
      timeSlots.push(timeLabel);
    }

    // Increment by n minutes, default 30 minutes
    currentMinute += 30;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour += 1;
    }
  }
  const closingTimeLabel = `${String(closingTime.hour).padStart(
    2,
    "0"
  )}:${String(closingTime.minute).padStart(2, "0")}`;

  if (timeSlots[timeSlots.length - 1] !== closingTimeLabel) {
    timeSlots.push(closingTimeLabel);
  }
  return timeSlots;
};

type TimeSlotWithHeight = {
  time: string;
  height: number;
};

export type TimeSlotsWithHeight = TimeSlotWithHeight[];

export const calculateTimeSlotsWithHeight = (
  timeSlots: TimeSlots,
  screenHeight: number
): TimeSlotsWithHeight => {
  const pixelsPerMinute = screenHeight / ((timeSlots.length - 1) * 30);
  const minHeight = 24;
  const height = Math.floor(pixelsPerMinute * 30);
  const result = timeSlots.map((time) => ({
    time,
    height: height < minHeight ? minHeight : height,
  }));
  result.pop();
  return result;
};
