import { ref, firebaseAuth } from "../config/constants";
import { store } from "../store";
import history from "../history";
import { signIn, signOut } from "../actions";

export function fetchUser() {
  firebaseAuth.onAuthStateChanged(result => {
    console.log("fetched user: ", result);
    if (result != null) {
      store.dispatch(signIn(result));
      history.push("/app");
    } else {
      history.push("/");
    }
  });
}

export function auth(email, pw) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function logout() {
  firebaseAuth.signOut().then(
    function() {
      store.dispatch(signOut());
    },
    function(error) {
      console.error("Sign Out Error", error);
    }
  );
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function saveUser(user) {
  return ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user);
}
