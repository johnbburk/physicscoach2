//TODO: add check for duplicate course
//TODO: Style component

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
    teacher: "",
    courseID:"",
    courseURL:"",
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
        console.log("Write successful with ID: ", ref.id)
        if (typeof window !== 'undefined') {
            const courseURL = window.location.protocol + '//' + window.location.host + "/course/"+ref.id;
            this.setState({
                courseID: ref.id,
                courseURL: courseURL
            });
        }}
        )
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
        <div>
        {this.state.courseURL ? "Please share this url with your students and ask them to register. \n Your new course url is: ": ""}
        {this.state.courseURL}
        </div>
      

      </div>
    );
  
}
}

export default CreateCourse;
