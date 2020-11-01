import { CHANGE_SELECTED_MONUMENT, CLOSE_DETAIL_DRAWER } from "../constants";
import { changeCenter } from "./map-actions";

export const closeDetailDrawer = () => {
  return {
    type: CLOSE_DETAIL_DRAWER,
  };
};

const changeSelectedMonument = (monument) => ({
  type: CHANGE_SELECTED_MONUMENT,
  payload: monument,
});


export const changeMonument = () => (monument, centerize = true) => (
  dispatch
) => {
  if (centerize) {
    dispatch(
      changeCenter({
        lat: monument.latitude,
        lng: monument.longitude,
      })
    );
    setTimeout(() => {
        dispatch(changeSelectedMonument(monument));
    }, 300);
  } else {
    dispatch(changeSelectedMonument(monument));
  }
};
