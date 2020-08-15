import { useState, useEffect, useRef, useContext } from "react";
import AppContext from "../context/app-context";

// Hook
export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function useOrientation() {
  const [orientation, setOrientation] = useState(window.screen.orientation);

  useEffect(() => {
    function handlorientation() {
      setOrientation(window.screen.orientation);
    }

    window.addEventListener('orientation', handlorientation);
    return () => window.removeEventListener('resize', handlorientation);
  }, []);
  return orientation;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}