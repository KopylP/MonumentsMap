import {
  CHANGE_CITIES,
  CHANGE_CONDITIONS,
  CHANGE_STATUSES,
  CHANGE_YEARS_RANGE,
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from "../constants";

export const closeDrawer = () => ({
  type: CLOSE_DRAWER,
});

export const openDrawer = () => ({
  type: OPEN_DRAWER,
});

export const changeConditions = (conditions) => {
  return {
    type: CHANGE_CONDITIONS,
    payload: conditions,
  };
};

export const changeStatuses = (statuses) => ({
  type: CHANGE_STATUSES,
  payload: statuses,
});

export const changeCities = (cities) => ({
  type: CHANGE_CITIES,
  payload: cities,
});

export const changeYearsRange = (range) => ({
  type: CHANGE_YEARS_RANGE,
  payload: range,
});
