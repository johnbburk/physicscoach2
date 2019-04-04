import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "@material-ui/core";
import firebase from "../config/constants";
import CreateCourse from "./CourseList/CreateCourse";

const db = firebase.firestore();

class Welcome extends Component {
  render() {
    if (this.props.user === null) {
      return (
        <div className="Main-content">
          <h1>Welcome to Physics Coach! Please sign in.</h1>
          <img src="/PhysicsCoach.png" alt="Aim, Practice, Reflect...Improve" width="800px"/>
        </div>
      )
    }

    return <CourseList user={this.props.user} role={this.props.role}></CourseList>
  }
}

class CourseList extends Component {
  state = {
    courseList: [],
    loading: true,
  }

  async componentDidMount() {
    const coursesSnapshot = await db.collection("courses")
      .where("students", "array-contains", this.props.user.uid)
      .orderBy("name")
      .get();

    this.setState({
      courseList: coursesSnapshot.docs,
      loading: false
    });
  }

  render() {
    console.log("role", this.props.role)
    if (this.state.loading) {
      return null;
    }

    return (
      <div className="Main-content">
        {this.state.courseList.length === 0 ? <h1>You aren't enrolled in any courses yet.</h1> :
          <Fragment>
            <h1>Your courses:</h1>
            <ul>
              {this.state.courseList.map((course) => {
                return (<li key={course.id}>
                  <Link href={"/course/" + course.id}>{course.get("name")}</Link>
                </li>)
              })}
            </ul>
          </Fragment>
        }
        
        {this.props.role === "teacher" && <CreateCourse/>}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { user: state.user, role: state.role };
}
export default connect(mapStateToProps)(Welcome);