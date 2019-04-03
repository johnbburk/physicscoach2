import React, { Component, Fragment } from "react";
import Content from "../NewSession/Content";
import PracticeList from "../PreviousSessions/PracticeList";
import StudentList from "../CourseList/StudentList";
import ClassmatePractices from "../PreviousSessions/ClassmatePractices";
import { Route, Switch, Redirect } from "react-router-dom";
import TeacherRoute from "../ProtectedRoutes/TeacherRoute";

import { connect } from "react-redux";
import { selectCourse } from "../../store";
import CreateCourse from "./CreateCourse";

import firebase from "../../config/constants";
import { Button } from "@material-ui/core";
import { ApprovalAlert } from "./ApprovalAlert";
const db = firebase.firestore();

class CourseHomepage extends Component {
  courseID = this.props.match.params.courseID;

  state = {
    courseDoc: null,
    alreadyEnrolled: false,
    alreadyRequested: false,
  };

  async componentDidMount() {
    this.props.selectCourse(this.courseID, this.props.match.url);
    const courseDoc = await db
      .collection("courses")
      .doc(this.courseID)
      .get();

    const studentDoc = await db
      .collection("users")
      .doc(this.props.user.uid)
      .get();

    this.setState({
      courseDoc,
      alreadyEnrolled: studentDoc.get("courses").includes(this.courseID),
      alreadyRequested: studentDoc.get("requests").includes(this.courseID),
    });

    console.log(this.state)
  }

  requestJoin = async () => {
    await db
      .collection("users")
      .doc(this.props.user.uid)
      .update({
        requests: firebase.firestore.FieldValue.arrayUnion(this.courseID)
      });
    window.location.reload();
  };

  render() {
    if (this.props.user === null) {
      return <Redirect to="/" />;
    }

    if (this.state.courseDoc === null) {
      // still loading
      return null;
    }

    if (!this.state.courseDoc.exists) {
      return (
        <div className="Main-content">
          <h1>This course does not exist.</h1>
        </div>
      );
    }

    if (!this.state.alreadyEnrolled) {
      return (
        <div className="Main-content">
          <h1>You are not enrolled in this course.</h1>
          {this.state.alreadyRequested ? (
            <h3>You have already requested to join this course.</h3>
          ) : (
            <Button
              onClick={this.requestJoin}
              color="primary"
              variant="outlined"
            >
              Request to join
            </Button>
          )}
        </div>
      );
    }

    const courseURL = this.props.match.url;
    const requestCount = this.state.courseDoc.get("requests").length;
    console.log("rc: ", requestCount);
    const Welcome = () => (
      <div className="Main-content">
        <h2>
          Welcome to {this.state.courseDoc.get("name")}, taught by{" "}
          {this.state.courseDoc.get("teacher")}.
        </h2>
        {this.props.role === "teacher" && (
          <Fragment>
            Share the URL of this page with your students so they can request to
            join this course.
            <ApprovalAlert requestCount={requestCount} courseURL={courseURL} />
            <CreateCourse rename courseRef={this.state.courseDoc.ref} />
          </Fragment>
        )}
      </div>
    );

    return (
      <Switch>
        <Route path={courseURL + "/new"} component={Content} />
        <Route path={courseURL + "/previous"} component={PracticeList} />
        <Route
          path={courseURL + "/classmates"}
          component={ClassmatePractices}
        />

        <TeacherRoute
          path={courseURL + "/roster"}
          render={props => <StudentList {...props} join={false} />}
        />
        <TeacherRoute
          path={courseURL + "/requests"}
          render={props => <StudentList {...props} join={true} />}
        />

        <Route exact path={courseURL} component={Welcome} />
        <Route component={() => <Redirect to={courseURL} />} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, role: state.role };
}

const mapDispatchToProps = {
  selectCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseHomepage);
