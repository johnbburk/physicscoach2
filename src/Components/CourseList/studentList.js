import React, { Component } from "react";
import firebase from "../../config/constants";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from '@material-ui/core/Icon';

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
    <ul style={{ listStyleType: "none" }}>
      {this.state.allStudents.map(data => (
        <li key={data.uid}>
          <Checkbox onChange={this.studentSelected(data)} value={"selected"} />
          <span>{data.displayName}</span>
        </li>
      ))}
    </ul>
  );

  render() {
    return (
      <div className="Main-content">
        <h1>Student List</h1>
        {this.renderAllStudents()}
        <h2>Your class</h2>
        {this.state.selectedStudents.map(data => (
          <li key={data.uid}>
            <span>{data.displayName}</span> <Icon onClick={this.studentSelected(data)}>remove_circle</Icon>
          </li>
        ))}
      </div>
    );
  }
}

export default StudentList;
