import Axios from "axios";
import {
  CHANGE_CENCEL_REQUEST,
  FETCH_MONUMENTS_FAILURE,
  FETCH_MONUMENTS_LOADING_END,
  FETCH_MONUMENTS_REQUEST,
  FETCH_MONUMENTS_SUCCESS,
} from "../constants";

const changeCancelRequest = (e) => {
  return {
    type: CHANGE_CENCEL_REQUEST,
    payload: e
  }
}

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

export const fetchMonuments = (monumentService) => (
  selectedCities,
  selectedStatuses,
  selectedConditions,
  selectedYearRange
) => (dispatch, getState) => {

  function executor(e) {
    dispatch(changeCancelRequest(e));
  }

  if (getState().monument.cancelRequest) {
    getState().monument.cancelRequest();
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
