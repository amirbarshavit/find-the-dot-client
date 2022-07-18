import { useEffect, useRef } from "react";

export const useKeyboardEventListener = (handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener("keypress", eventListener);
    return () => {
      element.removeEventListener("keypress", eventListener);
    };
  }, [element]);
};
