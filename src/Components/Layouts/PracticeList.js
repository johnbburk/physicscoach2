import React, { Component } from "react";
import firebase from "../../config/constants";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import PracticeCard from './PracticeCard'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';

const db = firebase.firestore();
const user = firebase.auth().currentUser;
console.log(user);
const sessionsRef = db.collection("sessions");

export default class PracticeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practice: [],
      loading: true
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    console.log("sessionsRef is ", sessionsRef);
    console.log("user.id is ", user.uid);
    sessionsRef
      .where("user", "==", user.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(
          doc => (
            console.log("doc: ", doc),
            console.log("doc.id", doc.id),
            this.setState(prevState => ({
              practice: [...prevState.practice, doc.data()]
            }))
          )
        );
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
        return null;
    }

    return (
      <div style={{margin: 20}}>
        <h1>{this.state.practice.length} Previous Practices</h1>
          <GridList cols={4}>
          { this.state.practice.map(data => <GridListTile> <PracticeCard data={data}/> </GridListTile>) }
          </GridList>

      </div>
    );
  }
}
