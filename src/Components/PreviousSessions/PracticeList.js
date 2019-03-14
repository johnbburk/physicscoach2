import React, { Component } from "react";
import firebase from "../../config/constants";

import PracticeCard from './PracticeCard'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';

const db = firebase.firestore();
const sessionsRef = db.collection("sessions");

export default class PracticeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practice: [],
      loading: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    let practice = []
    const user = firebase.auth().currentUser;
    console.log("sessionsRef is ", sessionsRef);
    console.log("user.id is ", user.uid);
    const snapshot = await sessionsRef
      .where("user", "==", user.uid)
      .get()

    snapshot.forEach((doc) => {
        practice = practice.concat(doc.data())
      }
    );

    practice.sort((a, b) => (a.submit_time.seconds - b.submit_time.seconds));
    practice.reverse();
    this.setState({ practice, loading: false });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <div style={{ margin: 20 }}>
        <h1>{this.state.practice.length} Previous Practices</h1>
        <GridList cols={4}>
          {this.state.practice.map((data,index) => <GridListTile key = {index}> <PracticeCard data={data} /> </GridListTile>)}
        </GridList>
      </div>
    );
  }
}
