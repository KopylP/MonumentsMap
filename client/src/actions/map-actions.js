import { CHANGE_CENTER } from "../constants";

export const changeCenter = (center) => ({
    type: CHANGE_CENTER,
    payload: center,
  });