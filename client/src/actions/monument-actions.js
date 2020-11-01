import Axios from "axios";
import {
  FETCH_MONUMENTS_FAILURE,
  FETCH_MONUMENTS_LOADING_END,
  FETCH_MONUMENTS_REQUEST,
  FETCH_MONUMENTS_SUCCESS,
} from "../constants";

const monumentsRequest = () => {
  return {
    type: FETCH_MONUMENTS_REQUEST,
  };
};

const monumentsLoaded = (monuments) => {
  return {
    type: FETCH_MONUMENTS_SUCCESS,
    payload: monuments,
  };
};

const monumentsFailure = (error) => {
  return {
    type: FETCH_MONUMENTS_FAILURE,
    payload: error,
  };
};

const monumentsLoadingEnd = () => {
  return {
    type: FETCH_MONUMENTS_LOADING_END,
  };
};

let cancelRequest = null;

function executor(e) {
  cancelRequest = e;
}

export const fetchMonuments = (monumentService) => (
  selectedCities,
  selectedStatuses,
  selectedConditions,
  selectedYearRange
) => (dispatch) => {
  if (cancelRequest) {
    cancelRequest();
  }
  dispatch(monumentsRequest());

  monumentService
    .getMonumentsByFilter(
      selectedCities.map((c) => c.id),
      selectedStatuses,
      selectedConditions,
      selectedYearRange,
      executor
    )
    .then((monuments) => {
      dispatch(monumentsLoaded(monuments));
      setTimeout(() => {
        dispatch(monumentsLoadingEnd());
      }, 300);
    })
    .catch((e) => {
      if (!Axios.isCancel(e)) {
        dispatch(monumentsFailure(e));
        setTimeout(() => {
          dispatch(monumentsLoadingEnd());
        }, 300);
      }
    });
};
