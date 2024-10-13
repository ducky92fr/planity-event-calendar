import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { WorkingHours } from "types";
import { ScreenDimension } from "utils/buildEventsSlot";
import {
  calculateTimeSlotsWithHeight,
  generateTimeSlots,
} from "utils/buildTimeSlot";

const CalendarContainer = styled.div<ScreenDimension>`
  display: flex;
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  border: 1px solid #ccc;
  overflow-y: auto;
`;

const TimeColumn = styled.div`
  width: 100px;
  height: 100%;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
`;

const EventColumn = styled.div`
  position: relative;
  flex-grow: 1;
  background-color: #fff;
`;

const TimeSlot = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;
  background-color: #f0f0f0;
`;
interface CalendarProps {
  workingHours: WorkingHours;
}

const minimumHeight = 600;

export const Calendar = ({ workingHours }: CalendarProps) => {
  const { openingTime, closingTime } = workingHours;

  const timeSlots = generateTimeSlots(openingTime, closingTime);

  const [windowHeight, setWindowHeight] = useState<number>(900);

  const timeSlotsWithHeight = calculateTimeSlotsWithHeight(
    timeSlots,
    windowHeight
  );

  useEffect(() => {
    const handleResize = (): void => {
      setWindowHeight(
        window.innerHeight < minimumHeight ? minimumHeight : window.innerHeight
      );
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CalendarContainer height={windowHeight} width={1500}>
      <TimeColumn>
        {timeSlotsWithHeight.map((timeSlot, index) => (
          <TimeSlot height={timeSlot.height} key={index}>
            {timeSlot.time}
          </TimeSlot>
        ))}
      </TimeColumn>

      <EventColumn>here Event</EventColumn>
    </CalendarContainer>
  );
};
