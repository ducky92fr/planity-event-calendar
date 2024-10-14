import { useState, useEffect } from "react";
import { ScreenDimension } from "utils/event-slot-builder/types";

const minimumHeight = 600;

export const useResize = (debounceDelay = 200): ScreenDimension => {
  const [screenDimension, setScreenDimension] = useState<ScreenDimension>({
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      const newScreenDimension = {
        screenHeight:
          window.innerHeight < minimumHeight
            ? minimumHeight
            : window.innerHeight,
        screenWidth: window.innerWidth,
      };
      setScreenDimension(newScreenDimension);
    };

    // Debounce logic
    const debouncedResize = () => {
      let resizeTimeout: ReturnType<typeof setTimeout>;

      return () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          handleResize();
        }, debounceDelay);
      };
    };

    const resizeHandler = debouncedResize();

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [debounceDelay]);

  return screenDimension;
};
