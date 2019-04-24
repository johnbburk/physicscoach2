import React, { Component } from "react";
import firebase from "../../config/constants";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { getStudentList, getRequestsList } from "../../helpers/courseUtils";

const db = firebase.firestore();

class StudentList extends Component {
  courseDocRef = db.collection("courses").doc(this.props.course);

  state = {
    rosterOrRequestsList: [],
    loading: true
  };

  async componentDidMount() {
    let rosterOrRequestsList = this.props.join
      ? await getRequestsList(this.props.course)
      : await getStudentList(this.props.course);

    // now this is a list of DocumentSnapshots

    rosterOrRequestsList = rosterOrRequestsList.map(request => {
      return {
        ...request.data(),
        id: request.id,
        selected: false
      };
    });

    // now it's a list of objects

    this.setState({ rosterOrRequestsList, loading: false });
  }

  toggleStudent = index => (event, checked) => {
    this.setState(({ rosterOrRequestsList }) => {
      rosterOrRequestsList[index].selected = checked;
      return { rosterOrRequestsList };
    });
  };

  renderAllStudents = () => {
    return (
      <ul style={{ listStyleType: "none" }}>
        {this.state.rosterOrRequestsList.map((data, index) => (
          <li key={index}>
            <Checkbox onChange={this.toggleStudent(index)} />
            <span>{data.displayName + " (" + data.email + ")"}</span>
          </li>
        ))}
      </ul>)
  };

  removeStudents = async () => {
    const selectedIDs = this.state.rosterOrRequestsList
      .filter(student => student.selected)
      .map(student => student.id);

    if (selectedIDs.length > 0) {
      await this.courseDocRef.update({
        students: firebase.firestore.FieldValue.arrayRemove(...selectedIDs)
      });

      window.location.reload();
    }
  };

  addStudents = async () => {

    const selectedIDs = this.state.rosterOrRequestsList
      .filter(student => student.selected)
      .map(student => student.id);

    if (selectedIDs.length > 0) {
      await this.courseDocRef.update({
        requests: firebase.firestore.FieldValue.arrayRemove(...selectedIDs),
        students: firebase.firestore.FieldValue.arrayUnion(...selectedIDs)
      });
      window.location.reload();
    }
  };

  render() {
    if (this.state.loading) {
      return null
    }
    return (
      <div className="Main-content">
        <h1>{this.props.join ? "Requests" : "Student List"}</h1>
        {this.renderAllStudents()}
        <Button
          variant="outlined"
          color="primary"
          onClick={this.props.join ? this.addStudents : this.removeStudents}
          disabled={this.state.rosterOrRequestsList.filter(student => student.selected).length === 0}
        >
          {this.props.join ? "Add Selected Students" : "Remove Students"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    course: state.course
  };
};

export default connect(mapStateToProps)(StudentList);
