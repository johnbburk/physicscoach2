import { ref, firebaseAuth } from "../config/constants";
import { store } from "../store";
import history from "../history";
import { authAction } from "../actions";

export function fetchUser() {
  firebaseAuth.onAuthStateChanged(userResult => {
    console.log("fetched user: ", userResult);
    if (userResult === null) {
      history.push("/");
    }
    store.dispatch(authAction(userResult));
  });
}

export function logout() {
  firebaseAuth.signOut();
}

