import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { WorkingHours } from "types";
import { ScreenDimension } from "utils/buildEventsSlot";
import {
  calculateTimeSlotsWithHeight,
  generateTimeSlots,
} from "utils/buildTimeSlot";

type Styling = {
  top: number;
  left: number;
  height: number;
  width: number;
};

const EventContainer = styled.div<Styling>`
  position: absolute;
  top: ${({ top }) => `${top}px`};
  height: ${({ height }) => `${height}px`};
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  background-color: lightblue;
  border: 1px solid blue;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface EventProps {
  id: number;
  styling: Styling;
}
export const EventSlot = ({ id, styling }: EventProps) => {
  const { top, left, height, width } = styling;
  return (
    <EventContainer top={top} left={left} height={height} width={width}>
      {id}
    </EventContainer>
  );
};

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

      <EventColumn>
        {/* <EventSlot
          id={1}
          styling={{ top: 0, left: 0, width: 1400, height: 75 }}
        />
        <EventSlot
          id={2}
          styling={{ top: 93.75, left: 0, width: 1400 / 3, height: 250 }}
        />
        <EventSlot
          id={3}
          styling={{ top: 93.75, left: 1400 / 3, width: 1400 / 3, height: 125 }}
        />

        <EventSlot
          id={4}
          styling={{
            top: 93.75,
            left: (1400 / 3) * 2,
            width: 1400 / 3,
            height: 137.5,
          }}
        /> */}
      </EventColumn>
    </CalendarContainer>
  );
};
