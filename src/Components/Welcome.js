import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "@material-ui/core";
import firebase from "../config/constants";

const db = firebase.firestore();

class Welcome extends Component {
  render() {
    if (this.props.user === null) {
      return (
        <div className="Main-content">
          <h1>Welcome to Physics Coach! Please sign in.</h1>
        </div>
      )
    }

    return <CourseList user={this.props.user}></CourseList>
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
      .get();

    this.setState({
      courseList: coursesSnapshot.docs,
      loading: false
    });
  }

  render() {
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
                return (<li key={course}>
                  <Link href={"/course/" + course.id}>{course.get("name")}</Link>
                </li>)
              })}
            </ul>
          </Fragment>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user, role: state.role };
}

export default connect(mapStateToProps)(Welcome);