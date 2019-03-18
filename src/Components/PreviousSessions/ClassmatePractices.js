import React, { Component, Fragment } from "react";
import firebase from "../../config/constants";

import PracticeCard from './PracticeCard';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import StudentPicker from './StudentPicker';
import LoadingComponent from '../Layouts/LoadingComponent'

import { connect } from "react-redux";

const db = firebase.firestore();
const sessionsRef = db.collection("sessions");

class ClassmatePractices extends Component {
  state = {
    pastPracticeDocs: [],
    loading: false,
  };

  componentDidMount() {
    this.getSessionsAfterDate(new Date(2019, 2, 14)); // march 14th
  }

  getSessionsAfterDate = async (date) => {
    console.log('hola')
    this.setState({
      loading: true
    })

    const sessionsSnapshot = await sessionsRef
      .orderBy("submit_time", "desc")
      .endAt(firebase.firestore.Timestamp.fromDate(date))
      .get();

    this.setState({
      pastPracticeDocs: sessionsSnapshot.docs,
    });

    setTimeout(() => this.setState({ loading: false }), 750)
    // make sure loading icon doesn't disappear too quickly
  };

  renderPastPractices = () => {
    if (this.state.loading) {
      return LoadingComponent;
    }

    return (
      <Fragment><h1>{this.state.pastPracticeDocs.length} Practices</h1>
        <GridList cols={3} spacing={20}>
          {this.state.pastPracticeDocs.map((doc, index) =>
            <GridListTile key={index}> <PracticeCard practiceDoc={doc} /> </GridListTile>
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