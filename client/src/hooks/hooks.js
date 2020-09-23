import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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

export function usePromise(promiseOrFunction, defaultValue, params = []) {
  const [state, setState] = useState({ value: defaultValue, error: null, isPending: true })

  useEffect(() => {
    const promise = (typeof promiseOrFunction === 'function')
      ? promiseOrFunction(...params)
      : promiseOrFunction

    let isSubscribed = true
    promise
      .then(value => isSubscribed ? setState({ value, error: null, isPending: false }) : null)
      .catch(error => isSubscribed ? setState({ value: defaultValue, error: error, isPending: false }) : null)

    return () => (isSubscribed = false)
  }, [promiseOrFunction, defaultValue])

  const { value, error, isPending } = state
  return [value, error, isPending]
}

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}