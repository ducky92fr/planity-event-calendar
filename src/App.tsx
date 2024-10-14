import { Calendar } from "components/Calendar/Calendar";

import { WorkingHours } from "types";
import inputData from "./input.json";

import { buildEventsSlotWithPosition } from "utils/event-slot-builder/buildEventsSlot";
import { EventSlot } from "components/EventSlot/EventSlot";
import { calculatePixelHeightPerMinute } from "utils/utils";
import { useResize } from "hooks/useResize";

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
  const screenDimension = useResize();

  const pixelsForEachMinute = calculatePixelHeightPerMinute(
    workingHours,
    screenDimension
  );

  const events = buildEventsSlotWithPosition({
    events: inputData,
    screenDimension: {
      screenHeight: screenDimension.screenHeight,
      screenWidth: screenDimension.screenWidth - 100,
    },
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
