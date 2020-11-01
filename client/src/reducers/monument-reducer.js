import {
  FETCH_MONUMENTS_FAILURE,
  FETCH_MONUMENTS_LOADING_END,
  FETCH_MONUMENTS_REQUEST,
  FETCH_MONUMENTS_SUCCESS,
} from "../constants";

const initialState = {
  monuments: [],
  loading: true,
  error: null,
};

const monumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MONUMENTS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_MONUMENTS_SUCCESS:
      return {
        ...state,
        error: null,
        monuments: action.payload,
      };
    case FETCH_MONUMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        monuments: [],
      };
    case FETCH_MONUMENTS_LOADING_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default monumentReducer;
