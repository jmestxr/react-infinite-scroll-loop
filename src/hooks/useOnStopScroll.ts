import React, { useEffect } from "react";

export const useOnStopScroll = (
  scrollRef: React.MutableRefObject<HTMLDivElement | null>,
  handler: () => void,
  time: number,
) => {
  useEffect(() => {
    const listener = (element: HTMLDivElement | null) => {
      const timeout = time;
      let removed = false;
      let handle: number | null = null;
      const onScroll = () => {
        if (handle) {
          clearTimeout(handle);
        }
        handle = window.setTimeout(handler, timeout);
      };
      element?.addEventListener("scroll", onScroll);
      return () => {
        if (removed) {
          return;
        }
        removed = true;
        if (handle) {
          clearTimeout(handle);
        }
        element?.removeEventListener("scroll", onScroll);
      };
    };

    listener(scrollRef.current);
  }, [scrollRef]);
};