import { WorkingHours } from "types";
import { ScreenDimension } from "./event-slot-builder/types";

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map((el) => Number(el));
  return hours * 60 + minutes;
};

export const calculatePixelHeightPerMinute = (
  workingHours: WorkingHours,
  screenDimension: ScreenDimension
) => {
  const { openingTime, closingTime } = workingHours;
  const { screenHeight } = screenDimension;
  const totalOpeningInMinutes =
    closingTime.hour * 60 +
    closingTime.minute -
    openingTime.hour * 60 +
    closingTime.minute;

  return screenHeight / totalOpeningInMinutes;
};
