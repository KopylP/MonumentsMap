import { arraysEqual } from "./array-helpers";

export function doIfNotTheSame(state, prevState, selector = (p) => p) {
  return (action) => {
    if (prevState == null || selector(state) !== selector(prevState)) {
      action();
    }
  };
}

export function doIfNotZero(value) {
  return (action) => {
    if (value !== 0) action();
  };
}

export function doIfArraysNotEqual(firstArray, secondArray, selector = (p) => p) {
  return (action) => {
    if (
      typeof firstArray !== "undefined" &&
      !arraysEqual(firstArray, secondArray, selector)
    )
      action();
  };
}
