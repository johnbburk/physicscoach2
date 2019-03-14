import firebase from "../config/constants";

export function getUser(user) {
  return async (dispatch, getState) => {
    dispatch({ type: "GET_USER_BEGIN" });
    if (user) {
      const db = firebase.firestore();
      const userDoc = await db
        .collection("users")
        .doc(user.uid)
        .get();
      const role = userDoc.data().role;
      const course = null;
      dispatch({
        type: "GET_USER_SUCCESS",
        role: role,
        course: course
      });
      
    }
    else
      {
        dispatch({
          type: "GET_USER_FAIL"
        })
      }
  };
}

export const authAction = user => {
  if (user !== null) {
    return {
      type: "SIGN_IN",
      user
    };
  } else {
    return {
      type: " SIGN_OUT",
      user: null,
      role: null,
      course: null

    };
  }
};
