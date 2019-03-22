//TODO: add check for duplicate course
//TODO: Style component
//TODO: Add feature that reports back course url to share with students

import React, { Component } from "react";
import { createClassDeclaration } from "typescript";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import firebase from "../../config/constants";

const db = firebase.firestore();

class CreateCourse extends Component {
  courseDocRef = db.collection("courses");
  state = {
    courseName: "",
    teacher: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  writeNewCourse = () => {
    if (!this.state.courseName || !this.state.teacher) {
      return;
    }

    this.courseDocRef
      .add({
        name: this.state.courseName,
        teacher: this.state.teacher,
        students: [],
        requests: []
      })
      .then(ref => {
        console.log("Write successful with ID: ", ref.id);
      });
  };

  render() {
    return (
      <div className="Main-content">
        <FormControl>
          <TextField
            id="courseName"
            name="courseName"
            label="What is the name of your new course?"
            variant="outlined"
            onChange={this.onChange}
          />

          <TextField
            id="teacher"
            name="teacher"
            label="teacher"
            variant="outlined"
            onChange={this.onChange}
          />
        </FormControl>
        <Button color="primary" onClick={this.writeNewCourse}>
          Create Class
        </Button>
      </div>
    );
  }
}

export default CreateCourse;
