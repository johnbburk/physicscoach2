import React, { Component } from "react";
import firebase from "../../config/constants";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const db = firebase.firestore();
const users = db.collection("users");

class StudentList extends Component {
  state = {
    selectedStudents: [],
    allStudents: []
  };

  async componentDidMount() {
    let students = [];
    const snapshot = await users.where("role", "==", "student").get();

    snapshot.forEach(doc => {
      const student = {
        uid: doc.id,
        ...doc.data()
      };
      students.push(student);
    });
    this.setState({ allStudents: students });
  }

  studentSelected = student => (event, checked) => {
    let currentList = this.state.selectedStudents;
    if (checked) {
      // add student into state.selectedStudents
      currentList.push(student);
    } else {
      // remove student from state.selectedStudents
      currentList = currentList.filter(stu => stu.uid !== student.uid);
    }
    this.setState({ selectedStudents: currentList });
  };

  renderAllStudents = () => (
    <ul>
      {this.state.allStudents.map(data => (
        <li key={data.uid}>
          <span>{data.displayName}</span>
          <Checkbox onChange={this.studentSelected(data)} value={"selected"} />
        </li>
      ))}
    </ul>
  );

  render() {
    return (
      <div>
        <h1>Student List</h1>
        {this.renderAllStudents()}
      </div>
    );
  }
}

export default StudentList;
