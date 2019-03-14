import { firebaseAuth } from "../config/constants";
import { store } from "../store";
import history from "../history";
import { authAction, getUser } from "../store/actions";
import firebase from "../config/constants";

const db = firebase.firestore();

export const updateStateBasedOnUser = async user => {
  store.dispatch(getUser(user));
  store.dispatch(authAction(user));

  console.log("fetched user: ", user);
  if (user === null) {
    history.push("/");

  } else {
    const userDocSnapshot = await db.collection('users') // CollectionReference
      .doc(user.uid) // DocumentReference
      .get(); // DocumentSnapshot

    console.log("user role: ", userDocSnapshot.get("role"))
    console.log("snapshot exists?", userDocSnapshot.exists)
    if (!userDocSnapshot.exists) { // add new users to database
      db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        role: "student",
        email: user.email
      })
    }
  }
}

export function logout() {
  firebaseAuth.signOut();
  store.dispatch("SIGN_OUT");
}

