import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";

const initialState = { user: null };
export const store = createStore(reducer, initialState, applyMiddleware(thunk));
