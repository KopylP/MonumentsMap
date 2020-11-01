import { CHANGE_SELECTED_MONUMENT, CLOSE_DETAIL_DRAWER, OPEN_DETAIL_DRAWER } from "../constants";

const initialState = {
  selectedMonument: null,
  detailDrawerOpen: false,
};

const detailMonumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_DETAIL_DRAWER:
      return {
        ...state,
        detailDrawerOpen: false
      }
    case CHANGE_SELECTED_MONUMENT:
      return {
        ...state,
        detailDrawerOpen: true,
        selectedMonument: action.payload
      }
    default:
      return state;
  }
};

export default detailMonumentReducer;
