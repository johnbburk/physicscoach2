//TODO: Style component

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import firebase from "../../config/constants";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import { connect } from "react-redux";

const db = firebase.firestore();
class CreateCourse extends Component {
  courseDocRef = db.collection("courses");
  state = {
    show: false,
    courseName: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  writeNewCourse = async () => {
    if (!this.state.courseName) {
      return;
    }

    // const querySnapshot = await this.courseDocRef
    //   .where("name", "==", this.state.courseName)
    //   .where("teacher", "==", this.state.teacher)
    //   .get();

    // if (!querySnapshot.empty) {
    //   return;
    // }

    const courseRef = await db.collection("courses").add({
      name: this.state.courseName,
      teacher: this.props.user.displayName,
      students: [this.props.user.uid],
      requests: []
    });

    console.log("Write successful with ID: ", courseRef.id);

    window.location.reload();
  };

  renameCourse = async () => {
    if (!this.state.courseName) {
      return;
    }

    await this.props.courseRef.update({
      name: this.state.courseName
    });

    window.location.reload();
  };

  render() {
    console.log("from create course", this.props.courseRef);
    return (
      <div className="Main-content">
        <Dialog
          open={this.state.show}
          onClose={() => this.setState({ show: false })}
        >
          <DialogTitle align="center">
            {this.props.rename ? "Rename Course" : "Create a New Course"}
          </DialogTitle>

          <DialogContent>
            <FormControl>
              <TextField
                id="courseName"
                name="courseName"
                label="Course Name"
                required={true}
                margin="normal"
                variant="outlined"
                onChange={event =>
                  this.setState({ courseName: event.target.value })
                }
              />
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.props.rename ? this.renameCourse : this.writeNewCourse}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          color="primary"
          onClick={() => {
            this.setState({ show: true });
          }}
        >
          {this.props.rename ? "Rename Course" : "Create a New Course"}
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(CreateCourse);
