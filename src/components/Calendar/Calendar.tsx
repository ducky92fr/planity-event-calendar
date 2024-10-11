import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { generateTimeSlots, calculateTimeSlotsWithHeight } from "utils/utils";
import { WorkingHours } from "types";

const CalendarContainer = styled.div<{ height: number }>`
  display: flex;
  height: ${({ height }) => `${height}px`};
  border: 1px solid #ccc;
  overflow-y: auto;
`;

const TimeColumn = styled.div`
  width: 100px; /* Fixed width for the time labels */
  height: 100%;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
`;

const EventColumn = styled.div`
  flex-grow: 1; /* Take up remaining space */
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

  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

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
    <CalendarContainer height={windowHeight}>
      <TimeColumn>
        {timeSlotsWithHeight.map((timeSlot, index) => (
          <TimeSlot height={timeSlot.height} key={index}>
            {timeSlot.time}
          </TimeSlot>
        ))}
      </TimeColumn>

      <EventColumn>{/* Events */}</EventColumn>
    </CalendarContainer>
  );
};
