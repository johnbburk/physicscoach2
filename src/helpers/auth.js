import { store } from "../store";
import { getReduxAuthAction } from "../store";
import firebase from "../config/constants";

const db = firebase.firestore();

export const updateStateBasedOnUser = async user => {
  let userDocSnapshot = null;
  if (user === null) {
    // history.push("/");
    // don't need to do this, components will handle redirecting
  } else {
    userDocSnapshot = await db.collection('users') // CollectionReference
      .doc(user.uid) // DocumentReference
      .get(); // DocumentSnapshot

    console.log("user role: ", userDocSnapshot.get("role"))
    console.log("snapshot exists?", userDocSnapshot.exists)
    if (!userDocSnapshot.exists) { // add new users to database
      db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        sortedName: user.displayName.split(" ").reverse().join(), 
        role: "student",
        email: user.email
      })

      userDocSnapshot = await db.collection('users') // CollectionReference
        .doc(user.uid) // DocumentReference
        .get(); // DocumentSnapshot
    }
  }

  store.dispatch(getReduxAuthAction(user, userDocSnapshot));
}


