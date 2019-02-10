import firebase from 'firebase';
const keys = require("./keys");

export const config = {
    apiKey: keys.firebaseClientID,
    authDomain: 'physics-coach.firebaseapp.com',
  databaseURL: "https://physics-coach.firebaseio.com",
  projectId: "physics-coach",
  storageBucket: "physics-coach.appspot.com",
  messagingSenderId: "464855377347"
}


firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export default firebase;