import React, { Component, Fragment } from "react";
import firebase from "../../config/constants";

import PracticeCard from "./PracticeCard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import StudentPicker from "./StudentPicker";
import LoadingComponent from "../Layouts/LoadingComponent";

import { connect } from "react-redux";

const db = firebase.firestore();
const sessionsRef = db.collection("sessions");

class PracticeList extends Component {
  // preventing update on unmounted component, solution from here:
  // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
  // actually, I don't think this is necessary

  state = {
    selectedUID: "",
    pastPracticeDocs: [],
    loading: false,
    isStudentSelected: false
  };

  componentDidMount() {
    if (this.props.role === "student") {
      this.getPastSessionsOfStudent(this.props.user.uid);
    }
  }

  getPastSessionsOfStudent = async uid => {
    console.log("getting sessions for", uid);

    if (uid === "") {
      // teacher selected the default option in picker
      this.setState({ isStudentSelected: false });
      return;
    }

    this.setState({
      isStudentSelected: true,
      loading: true,
    });
    
    const sessionsSnapshot = await sessionsRef
      .where("uid", "==", uid)
      .where("course", "==", this.props.course)
      .orderBy("submitTime", "desc")
      .get();

    this.setState({
      pastPracticeDocs: sessionsSnapshot.docs,
      selectedUID: uid
    });

    setTimeout(() => this.setState({ loading: false }), 750);
    // make sure loading icon doesn't disappear too quickly
  };

  renderPastPractices = () => {
    if (!this.state.isStudentSelected) {
      return null;
    }

    if (this.state.loading) {
      return LoadingComponent;
    }

    return (
      <Fragment>
        <h1>{this.state.pastPracticeDocs.length} Previous Practices</h1>
        <GridList cols={3} spacing={20}>
          {this.state.pastPracticeDocs.map((doc, index) => (
            <GridListTile key={index}>
              {" "}
              <PracticeCard
                practiceDoc={doc}
                reLoad={() => {
                  this.getPastSessionsOfStudent(this.state.selectedUID);
                }}
              />{" "}
            </GridListTile>
          ))}
        </GridList>
      </Fragment>
    );
  };

  render() {
    return (
      <div style={{ margin: 20 }}>
        {this.props.role === "teacher" && (
          <StudentPicker onSelectStudent={this.getPastSessionsOfStudent} />
        )}

        {this.renderPastPractices()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, role: state.role, course: state.course };
}

export default connect(mapStateToProps)(PracticeList);
