import React, { Component } from "react";
import firebase from "../../config/constants";
import MultiselectTwoSides from "react-multiselect-two-sides";

const db = firebase.firestore();
const users = db.collection("users");

require("../../styles/StudentList.css");

class StudentList2 extends Component {
  state = {
    options: [],
    value: []
  };

  async componentDidMount() {
    let students = [];
    const snapshot = await users.where("role", "==", "student").get();
    snapshot.docs.forEach((doc, i) => {
      const student = {
        uid: doc.id,
        value: i,
        LastName: doc
          .data()
          .displayName.split(" ")
          .pop(),
        FirstName: doc.data().displayName.split(" ")[0],
        ...doc.data()
      };
      students.push(student);
    });
    students.sort((a, b) => {
      if (a.displayName.split(" ")[1] > b.displayName.split(" ")[1]) return 1;
      if (a.displayName.split(" ")[1] < b.displayName.split(" ")[1]) return -1;
      return 0;
    });
    this.setState({ options: students });
  }
  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { options, value } = this.state;
    const selectedCount = value.length;
    const availableCount = options.length - selectedCount;

    return (
      <MultiselectTwoSides
        {...this.state}
        className="msts_theme_example"
        onChange={this.handleChange}
        availableHeader="Available"
        availableFooter={`Available: ${availableCount}`}
        selectedHeader="Selected"
        selectedFooter={`Selected: ${selectedCount}`}
        labelKey="displayName"
        showControls
        searchable
      />
    );
  }
}

export default StudentList2;
