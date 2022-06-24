import { useState, TouchEvent } from "react";

const thresholdTime = 500;
const thresholdDistance = 100;

type SwipeType = "prev" | "next";

interface EventInfo {
  x: number;
  y: number;
}

interface StartInfo extends EventInfo {
  t: number;
}

function useSwipe(onSwipe: (_: SwipeType) => void) {
  const [tracking, setTracking] = useState(false);
  const [start, setStart] = useState<StartInfo>();
  const [end, setEnd] = useState<EventInfo>();

  function gestureStart(e: TouchEvent) {
    if (e.touches.length > 1) {
      setTracking(false);
      return;
    } else {
      setTracking(true);
      setStart({
        t: new Date().getTime(),
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
      setEnd(undefined);
    }
  }

  function gestureMove(e: TouchEvent) {
    if (tracking) {
      setEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    }
  }

  function gestureEnd(_: TouchEvent) {
    if (!tracking || !start || !end) return;
    setTracking(false);
    const now = new Date().getTime();
    const deltaT = now - start.t;
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;

    if (deltaT > thresholdTime) return;
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;

    if (-deltaX > thresholdDistance) {
      onSwipe("next");
    } else if (deltaX > thresholdDistance) {
      onSwipe("prev");
    }
  }

  function gestureCancel(_: TouchEvent) {
    setTracking(false);
  }

  return {
    onTouchStart: gestureStart,
    onTouchEnd: gestureEnd,
    onTouchMove: gestureMove,
    onTouchCancel: gestureCancel,
  };
}

export default useSwipe;
