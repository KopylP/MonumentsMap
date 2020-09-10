import { useState, useEffect, useRef, useContext, useCallback } from "react";
import AppContext from "../context/app-context";
import { useSnackbar } from "notistack";
import errorNetworkSnackbar from "../components/helpers/error-network-snackbar";

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
