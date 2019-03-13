import { ref, firebaseAuth } from "../config/constants";
import { store } from "../store";
import history from "../history";
import { authAction } from "../store/actions";
import firebase from "../config/constants";

const db = firebase.firestore();

export function fetchUser() {
  firebaseAuth.onAuthStateChanged(async userResult => {
    console.log("fetched user: ", userResult);
    if (userResult === null) {
      history.push("/");
    } else {

      const user = await db.collection('users').doc(userResult.uid).get();
      
      console.log("snapshot exists?", user.exists)
      if (!user.exists) { // add new users to database
        db.collection('users').doc(userResult.uid).set({
          displayName: userResult.displayName,
          role: "student",
          email: userResult.email
        })
      }
    
   
    }

    store.dispatch(authAction(userResult));
  });
}

export function logout() {
  firebaseAuth.signOut();
}

