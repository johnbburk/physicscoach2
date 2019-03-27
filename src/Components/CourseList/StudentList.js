import React, { Component } from "react";
import firebase from "../../config/constants";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { sortByLastName } from "../../helpers/courseUtils";

const db = firebase.firestore();

class StudentList extends Component {
  courseDocRef = db.collection("courses").doc(this.props.course);

  state = {
    studentRequests: [],
    loading: true
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

    studentRequests.sort((a,b)=>{sortByLastName(a.displayName, b.displayName)})
    this.setState({ studentRequests: studentRequests, loading: false });
  }

  toggleStudent = index => (event, checked) => {
    this.setState(({ studentRequests }) => {
      studentRequests[index].selected = checked;
      return { studentRequests };
    });
  };

  renderAllStudents = () => {
    //let students = this.state.studentRequests;

    return(
    <ul style={{ listStyleType: "none" }}>
      {this.state.studentRequests.map((data, index) => (
        <li key={index}>
          <Checkbox onChange={this.toggleStudent(index)} />
          <span>{data.displayName + " (" + data.email + ")"}</span>
        </li>
      ))}
    </ul>)
  };

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

  c

  render() {
    if (this.state.loading)
    {
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
          disabled = {this.state.studentRequests.filter(student => student.selected).length === 0}
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
