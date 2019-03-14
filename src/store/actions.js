import firebase from "../config/constants";

// export function getUser(user) {
//   return async (dispatch, getState) => {
//     dispatch({ type: "GET_USER_BEGIN" });
//     if (user) {
//       const db = firebase.firestore();
//       const userDoc = await db
//         .collection("users")
//         .doc(user.uid)
//         .get();
//       const role = userDoc.data().role;
//       const course = null;
//       dispatch({
//         type: "GET_USER_SUCCESS",
//         role: role,
//         course: course
//       });
      
//     }
//     else
//       {
//         dispatch({
//           type: "GET_USER_FAIL"
//         })
//       }
//   };
// }
