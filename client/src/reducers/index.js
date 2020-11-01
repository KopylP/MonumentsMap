import { combineReducers } from "redux";
import filterReducer from "./filter-reducer";
import monumentReducer from "./monument-reducer";
import mapReducer from "./map-reducer";
import detailMonumentReducer from "./detail-monument-reducer";


const reducer = combineReducers({
    monument: monumentReducer,
    filter: filterReducer,
    map: mapReducer,
    detailMonument: detailMonumentReducer
});

export default reducer;