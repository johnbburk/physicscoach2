//TODO: add loading state
//TODO: add safeguard so you can't submit when no one is selected
//TODO: deactviate button when there are no requests

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

    const listOfIDs = this.props.join
      ? courseDocSnapshot.get("requests")
      : courseDocSnapshot.get("students");

    let studentRequests = listOfIDs.map(async requestID => {
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
        <li key={index}>
          <Checkbox onChange={this.toggleStudent(index)} />
          <span>{data.displayName + " (" + data.email + ")"}</span>
        </li>
      ))}
    </ul>
  );

  removeStudents = async () => {
      const selectedIDs = this.state.studentRequests
        .filter(student => student.selected)
        .map(student => student.id);

    if (selectedIDs > 0) {
      await this.courseDocRef.update({
        students: firebase.firestore.FieldValue.arrayRemove(...selectedIDs)
      });

      window.location.reload();
    }
  };

  addStudents = async () => {
    
    const selectedIDs = this.state.studentRequests
      .filter(student => student.selected)
      .map(student => student.id);
    
      if(selectedIDs.length > 0){
    await this.courseDocRef.update({
      requests: firebase.firestore.FieldValue.arrayRemove(...selectedIDs),
      students: firebase.firestore.FieldValue.arrayUnion(...selectedIDs)
    });
    window.location.reload();
  }
  };

  checkboxes=()=>{
    const inputElems = document.getElementsByTagName("input")
    let count = 0;

    for (var i=0; i<inputElems.length; i++) {       
    if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
        count++;
      }
    }
    return count;
  };

  render() {
    return (
      <div className="Main-content">
        <h1>{this.props.join ? "Requests" : "Student List"}</h1>
        {this.renderAllStudents()}
        <Button
          variant="outlined"
          color="primary"
          onClick={this.props.join ? this.addStudents : this.removeStudents}
          disabled = {this.checkboxes()==0}
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
