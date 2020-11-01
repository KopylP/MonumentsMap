import { defaultCity } from "../config";
import { CHANGE_CENTER } from "../constants";

const initialState = {
  center: defaultCity,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CENTER:
      return {
        center: action.payload,
      };
    default:
      return state;
  }
};

export default mapReducer;
