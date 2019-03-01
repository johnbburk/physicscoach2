import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const reducer = (state, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state,
                user: action.user
            };
        case "SIGN_OUT":
            return {
                ...state,
                user: false
            };
        default:
            return state;
    }
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = { user: null };
export const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(logger))
);
