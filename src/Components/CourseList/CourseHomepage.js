import React, { Component, Fragment } from 'react';
import Content from "../NewSession/Content";
import PracticeList from "../PreviousSessions/PracticeList"
import StudentList from "../CourseList/studentList";
import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { selectCourse } from '../../store';

import firebase from "../../config/constants";
import { Button } from '@material-ui/core';
const db = firebase.firestore();

class CourseHomepage extends Component {
  state = {
    courseDoc: null,
  }

  async componentDidMount() {
    this.props.selectCourse(this.props.match.params.courseID)
    const courseID = this.props.match.params.courseID;
    const courseDoc = await db.collection("courses").doc(courseID).get();
    this.setState({ courseDoc });
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
          <h1>You are not enrolled in this course</h1>
          <Button color="primary">Request to join</Button>
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
        {this.props.role === "teacher" &&
          <Route path={courseURL + "/roster"} component={StudentList} />}
        <Route exact path={courseURL} component={Welcome} />
        <Route component={() => <Redirect to={courseURL} />} />
      </Switch>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user, role: state.role };
}

const mapDispatchToProps = {
  selectCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseHomepage);