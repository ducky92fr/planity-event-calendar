import { Calendar } from "components/Calendar/Calendar";
import "./App.css";
import { useEffect, useState } from "react";
import { ScreenDimension } from "utils/event-slot-builder/types";
import { WorkingHours } from "types";
import inputData from "./input.json";

import { buildEventsSlotWithPosition } from "utils/event-slot-builder/buildEventsSlot";
import { EventSlot } from "components/EventSlot/EventSlot";
import { calculatePixelHeightPerMinute } from "utils/utils";

const minimumHeight = 600;
const workingHours: WorkingHours = {
  openingTime: {
    hour: 9,
    minute: 0,
  },
  closingTime: {
    hour: 21,
    minute: 0,
  },
};
const calendarStartTime = "9:00";

function App() {
  const initialScreenDimension = {
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth,
  };
  const [screenDimension, setScreenDimension] = useState<ScreenDimension>(
    initialScreenDimension
  );

  useEffect(() => {
    const handleResize = (): void => {
      const newScreenDimension = {
        screenHeight:
          window.innerHeight < minimumHeight
            ? minimumHeight
            : window.innerHeight,
        screenWidth: window.innerWidth,
      };
      setScreenDimension(newScreenDimension);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pixelsForEachMinute = calculatePixelHeightPerMinute(
    workingHours,
    screenDimension
  );
  const events = buildEventsSlotWithPosition({
    events: inputData,
    screenDimension,
    pixelsForEachMinute,
    calendarStartTime,
  });

  return (
    <Calendar workingHours={workingHours} screenDimension={screenDimension}>
      {events.map(({ id, top, left, height, width }) => {
        const position = { top, left, height, width };

        return <EventSlot key={id} position={position} id={id} />;
      })}
    </Calendar>
  );
}

export default App;
