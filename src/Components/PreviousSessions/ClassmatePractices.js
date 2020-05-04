import React, { Component, Fragment } from "react";
import firebase from "../../config/constants";

import PracticeCard from './PracticeCard';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import StudentPicker from './StudentPicker';
import LoadingComponent from '../Layouts/LoadingComponent';

import { connect } from "react-redux";

const db = firebase.firestore();
const sessionsRef = db.collection("sessions");

class ClassmatePractices extends Component {
  state = {
    pastPracticeDocs: [],
    loading: false,
  };

  componentDidMount(load=true) {
    this.getSessionsAfterDate(new Date(2019, 2, 14),load); // march 14th
  }

  getSessionsAfterDate = async (date,load=true) => {
    console.log('hola')
    if (load) {
      this.setState({
        loading: true
      })
    }

    const sessionsSnapshot = await sessionsRef
      .orderBy("submitTime", "desc")
      .endAt(firebase.firestore.Timestamp.fromDate(date))
      .get();

    this.setState({
      pastPracticeDocs: sessionsSnapshot.docs,
    });

    if (load) setTimeout(() => this.setState({ loading: false }), 750);
    // make sure loading icon doesn't disappear too quickly
  };

  reLoad() {
    this.componentDidMount(false);
  }

  renderPastPractices = () => {
    if (this.state.loading) {
      return LoadingComponent;
    }

    return (
      <Fragment><h1>{this.state.pastPracticeDocs.length} Practices</h1>
        <GridList cols={3} spacing={20}>
          {this.state.pastPracticeDocs.map((doc, index) =>
            <GridListTile key={index}> <PracticeCard practiceDoc={doc} reLoad={this.reLoad.bind(this)} showName /> </GridListTile>
          )}
        </GridList>
      </Fragment>
    )
  }

  render() {
    // add date picker
    return (
      <div className="Main-content">
        {this.renderPastPractices()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, role: state.role };
}

export default connect(mapStateToProps)(ClassmatePractices);