import React, { Component } from "react";
import firebase from "../../config/constants";

import PracticeCard from './PracticeCard'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';
import { connect } from "react-redux";

const db = firebase.firestore();
const sessionsRef = db.collection("sessions");

class PracticeList extends Component {

  // preventing update on unmounted component, solution from here:
  // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pastPracticeDocs: [],
      loading: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    const user = this.props.user;
    console.log("sessionsRef is ", sessionsRef);
    console.log("user.id is ", user.uid);
    const snapshot = await sessionsRef
      .where("user", "==", user.uid)
      .orderBy("submit_time", "desc")
      .get()

    if (this._isMounted) {
      this.setState({ pastPracticeDocs: snapshot.docs, loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <div style={{ margin: 20 }}>
        <h1>{this.state.pastPracticeDocs.length} Previous Practices</h1>
        <GridList cols={3} spacing={20}>
          {this.state.pastPracticeDocs.map((doc, index) =>
            <GridListTile key={index}> <PracticeCard practiceDoc={doc} /> </GridListTile>
          )}
        </GridList>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}


export default connect(mapStateToProps)(PracticeList);