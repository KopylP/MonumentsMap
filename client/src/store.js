import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";
import thunkMiddleware from "redux-thunk";

const logMiddleware = (store) => (dispatch) => (action) => {
    // console.log(action.type, action.payload);
    return dispatch(action);
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logMiddleware));

export default store;