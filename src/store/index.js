import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const initialState = { 
    user: null,
    currentSession: null,
    sessionDone: false,
};

export function initializeSessionInfo(timeInMinutes, goalForSession) {
    console.log("Initialized session with", timeInMinutes, goalForSession);
    return { type: "START_SESSION", timeInMinutes, goalForSession }
}

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
        case "START_SESSION":
            return {
                ...state,
                currentSession: {
                    timeInMinutes: action.timeInMinutes,
                    goal: action.goalForSession,
                }
            };
        default:
            return state;
    }
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(logger))
);
