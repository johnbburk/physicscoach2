import React, { Component } from 'react'
import firebase from "../../config/constants";
import moment from "moment";



const db = firebase.firestore();
const user = firebase.auth().currentUser;
console.log(user);
const sessionsRef = db.collection("sessions");


export default class PracticeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            practice: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);

    }


    componentDidMount(){
        const user = firebase.auth().currentUser;
        console.log("sessionsRef is ", sessionsRef)
        console.log("user.id is ", user.uid)
        sessionsRef.where("user","==",user.uid)
        .get().then((snapshot)=>(
            snapshot.forEach((doc)=>(
                console.log("doc: ",doc),
                console.log("doc.id", doc.id),
                this.setState((prevState)=>({
                    practice: [...prevState.practice,doc.data() ]
                }))
            ))
        ))
    }



    render() {

    return (
        <div>
      <h1>data</h1>
        
            {this.state.practice.length}
            <ul>
            {this.state.practice.map((data)=>(
            <li key={data.id}>{data.goal}   {moment.parseZone(data.start_time.toDate()).format('dddd')}</li>
            ))}
            </ul>
        </div>

    )
  }
}