import { combineReducers } from "redux";
import monumentReducer from "./monument-reducer";
const initialState = {
    monuments: [],
    loading: true,
    error: null,
};

const reducer = combineReducers({
    monument: monumentReducer
});

export default reducer;