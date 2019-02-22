import React, { Component } from 'react'
import firebase from "../../config/constants";


const db = firebase.firestore();
const user = firebase.auth().currentUser;
console.log(user);
const sessionsRef = db.collection("sessions");


export default class PracticeList extends Component {
 render() {
    const user = firebase.auth().currentUser

    return (

      sessionsRef.where("user","==",user.uid)
      .get()
      .then(function(querySnapshot){
         querySnapshot.forEach(function(doc){
             console.log(doc.id,"=>",doc.data());
         });
      })
      .catch(function(error)
      {console.log("Error getting documents", error);
    })
    )
  }
}

