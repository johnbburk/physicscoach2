import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = { user: null };
export const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(logger))
);
