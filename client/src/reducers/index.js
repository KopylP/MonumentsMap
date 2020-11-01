import { combineReducers } from "redux";
import filterReducer from "./filter-reducer";
import monumentReducer from "./monument-reducer";

const reducer = combineReducers({
    monument: monumentReducer,
    filter: filterReducer
});

export default reducer;