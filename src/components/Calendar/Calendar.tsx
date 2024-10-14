import styled from "@emotion/styled";

import { WorkingHours } from "types";

import { ScreenDimension } from "utils/event-slot-builder/types";
import {
  calculateTimeSlotsWithHeight,
  generateTimeSlots,
} from "utils/time-slot-builder/buildTimeSlot";

const CalendarContainer = styled.div<ScreenDimension>`
  display: flex;
  height: ${({ screenHeight }) => `${screenHeight}px`};
  width: ${({ screenWidth }) => `${screenWidth}px`};
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
  screenDimension: ScreenDimension;
  children: React.ReactNode;
}

export const Calendar = ({
  workingHours,
  screenDimension,
  children,
}: CalendarProps) => {
  const { openingTime, closingTime } = workingHours;
  const { screenWidth, screenHeight } = screenDimension;

  const timeSlots = generateTimeSlots(openingTime, closingTime);

  const timeSlotsWithHeight = calculateTimeSlotsWithHeight(
    timeSlots,
    screenHeight
  );

  return (
    <CalendarContainer screenHeight={screenHeight} screenWidth={screenWidth}>
      <TimeColumn>
        {timeSlotsWithHeight.map((timeSlot, index) => (
          <TimeSlot height={timeSlot.height} key={index}>
            {timeSlot.time}
          </TimeSlot>
        ))}
      </TimeColumn>

      <EventColumn>{children}</EventColumn>
    </CalendarContainer>
  );
};
