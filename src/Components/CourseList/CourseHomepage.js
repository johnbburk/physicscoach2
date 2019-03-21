import React, { Component } from 'react';
import Content from "../NewSession/Content";
import PracticeList from "../PreviousSessions/PracticeList";
import StudentList from "../CourseList/StudentList";
import ClassmatePractices from "../PreviousSessions/ClassmatePractices";
import { Route, Switch, Redirect } from "react-router-dom";
import TeacherRoute from "../ProtectedRoutes/TeacherRoute";

import { connect } from 'react-redux';
import { selectCourse } from '../../store';

import firebase from "../../config/constants";
import { Button } from '@material-ui/core';
const db = firebase.firestore();

class CourseHomepage extends Component {
  courseID = this.props.match.params.courseID;

  state = {
    courseDoc: null,
  }

  async componentDidMount() {
    this.props.selectCourse(this.courseID, this.props.match.url)
    const courseDoc = await db.collection("courses").doc(this.courseID).get();
    this.setState({ courseDoc });
  }

  requestJoin = async () => {
    await db.collection("courses").doc(this.courseID).update({
      requests: firebase.firestore.FieldValue.arrayUnion(this.props.user.uid)
    });
    window.location.reload();
  }

  render() {
    if (this.props.user === null) {
      return <Redirect to="/" />
    }

    if (this.state.courseDoc === null) { // still loading
      return null;
    }

    if (!this.state.courseDoc.exists) {
      return (
        <div className="Main-content">
          <h1>This course does not exist.</h1>
        </div>
      );
    }

    if (!this.state.courseDoc.get("students").includes(this.props.user.uid)) {
      return (
        <div className="Main-content">
          <h1>You are not enrolled in this course.</h1>
          {
            this.state.courseDoc.get("requests").includes(this.props.user.uid) ?
              <h3>You have already requested to join this course.</h3>
              :
              <Button onClick={this.requestJoin} color="primary" variant="outlined">
                Request to join
              </Button>
          }
        </div>
      );
    }

    const courseURL = this.props.match.url

    const Welcome = () => (
      <div className="Main-content">
        <h2>Welcome to {this.state.courseDoc.get("name")}
          , taught by {this.state.courseDoc.get("teacher")}.</h2>
      </div>
    )

    return (
      <Switch>
        <Route path={courseURL + "/new"} component={Content} />
        <Route path={courseURL + "/previous"} component={PracticeList} />
        <Route path={courseURL + "/classmates"} component={ClassmatePractices} />

        <TeacherRoute path={courseURL + "/roster"}
          render={(props) => <StudentList {...props} join={false} />} />
        <TeacherRoute path={courseURL + "/requests"}
          render={(props) => <StudentList {...props} join={true} />} />

        <Route exact path={courseURL} component={Welcome} />
        <Route component={() => <Redirect to={courseURL} />} />
      </Switch>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = {
  selectCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseHomepage);