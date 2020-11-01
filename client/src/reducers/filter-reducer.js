import { yearsRange } from "../config";
import {
  CHANGE_CITIES,
  CHANGE_CONDITIONS,
  CHANGE_STATUSES,
  CHANGE_YEARS_RANGE,
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from "../constants";

const initialState = {
  drawerOpen: false,
  conditions: [],
  statuses: [],
  cities: [],
  yearsRange: yearsRange,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        drawerOpen: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false,
      };
    case CHANGE_CONDITIONS:
      return {
        ...state,
        conditions: action.payload,
      };
    case CHANGE_STATUSES:
      return {
        ...state,
        statuses: action.payload,
      };
    case CHANGE_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case CHANGE_YEARS_RANGE:
      return {
        ...state,
        yearsRange: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
