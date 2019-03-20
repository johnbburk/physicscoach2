//TODO: add loading state

import React, { Component } from "react";
import firebase from "../../config/constants";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import { Button } from "@material-ui/core";

import { connect } from "react-redux";

const db = firebase.firestore();

class StudentList extends Component {
  courseDocRef = db.collection("courses").doc(this.props.course);

  state = {
    studentRequests: []
  };

  async componentDidMount() {
    const courseDocSnapshot = await this.courseDocRef.get();
    console.log("requests", courseDocSnapshot.get("requests"));

    let studentRequests = courseDocSnapshot
      .get("requests")
      .map(async requestID => {
        return db
          .collection("users")
          .doc(requestID)
          .get();
      });

    studentRequests = await Promise.all(studentRequests);
    studentRequests = studentRequests.map(request => {
      return {
        ...request.data(),
        id: request.id,
        selected: false
      };
    });

    console.log(studentRequests);

    this.setState({ studentRequests });
  }

  toggleStudent = index => (event, checked) => {
    this.setState(({ studentRequests }) => {
      studentRequests[index].selected = checked;
      return { studentRequests };
    });
  };

  renderAllStudents = () => (
    <ul style={{ listStyleType: "none" }}>
      {this.state.studentRequests.map((data, index) => (
        <li key={data.uid}>
          <Checkbox onChange={this.toggleStudent(index)} />
          <span>{data.displayName}</span>
        </li>
      ))}
    </ul>
  );

  addStudents = async () => {
    const selectedIDs = this.state.studentRequests
      .filter(student => student.selected)
      .map(student => student.id);

    await this.courseDocRef.update({
      requests: firebase.firestore.FieldValue.arrayRemove(...selectedIDs),
      students: firebase.firestore.FieldValue.arrayUnion(...selectedIDs),
    });

    window.location.reload();
  };

  render() {
    return (
      <div className="Main-content">
        <h1>Student List</h1>
        {this.renderAllStudents()}
        <Button variant="outlined" color="primary" onClick={this.addStudents}>
          Add Selected Students
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
