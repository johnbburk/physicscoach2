import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const START_SESSION = "START_SESSION";
const SELECT_COURSE = "SELECT_COURSE";

const initialState = {
  user: null,
  role: null,
  course: null,
  isWaitingForFirebase: true,

  currentSession: null,
};

export const initializeSessionInfo = (timeInMinutes, goalForSession) => {
  console.log("Initialized session with", timeInMinutes, goalForSession);
  return { type: START_SESSION, timeInMinutes, goalForSession };
}

export const getReduxAuthAction = (user, userDocSnapShot) => {
  if (user) {
    console.log("user snapshot", userDocSnapShot.data())
    return {
      type: SIGN_IN,
      user,
      role: userDocSnapShot.get("role")
    };

  } else {
    return {
      type: SIGN_OUT,
    };
  }
};

export const selectCourse = (courseID) => {
  return { type: SELECT_COURSE, courseID };
}

const reducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.user,
        role: action.role,
        isWaitingForFirebase: false
      };
    case SIGN_OUT:
      return {
        ...initialState,
        isWaitingForFirebase: false
      };

    case SELECT_COURSE:
      return {
        ...state,
        course: action.courseID,
      }
    case START_SESSION:
      return {
        ...state,
        currentSession: {
          timeInMinutes: action.timeInMinutes,
          goal: action.goalForSession
        }
      };
    default:
      console.log("non-existent action called", action.type)
      return state;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(logger))
);
