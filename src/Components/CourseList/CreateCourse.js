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
        teacher: firebase.auth().currentUser.displayName,
        courseID: "",
        courseURL: ""
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    writeNewCourse = async () => {
        var self = this;
        if (!this.state.courseName) {
            return;
        }
        console.log("checking name and teacher", this.state.courseName, this.state.teacher)
        this.courseDocRef
            .where("name", "==", this.state.courseName)
            .where("teacher", "==", this.state.teacher)
            .get()
            .then(function(doc) {
                if (doc.empty) {
                    db.collection("courses")
                        .add({
                            name: self.state.courseName,
                            teacher: self.state.teacher,
                            students: [],
                            requests: []
                        })
                        .then(ref => {
                            console.log("Write successful with ID: ", ref.id);
                            if (typeof window !== "undefined") {
                                const courseURL =
                                    window.location.protocol +
                                    "//" +
                                    window.location.host +
                                    "/course/" +
                                    ref.id;
                                self.setState({
                                    courseID: ref.id,
                                    courseURL: courseURL
                                });
                            }
                        });
                } //course is a duplicate
                else {
                    console.log("duplicate course");
                    return;
                }
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
                </FormControl>
                <Button color="primary" onClick={this.writeNewCourse}>
                    Create Class
                </Button>
                <div>
                    {this.state.courseURL
                        ? "Please share this url with your students and ask them to register. \n Your new course url is: "
                        : ""}
                    {this.state.courseURL}
                </div>
            </div>
        );
    }
}

export default CreateCourse;
