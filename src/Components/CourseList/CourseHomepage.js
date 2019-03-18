import React, { Component, Fragment } from 'react';
import Content from "../NewSession/Content";
import requireAuth from "../auth/requireAuth";
import PracticeList from "../PreviousSessions/PracticeList"
import StudentList from "../CourseList/studentList";
import { Router, Route, Switch } from "react-router-dom";


class CourseHomepage extends Component {
  render() {
    const courseURL = this.props.match.url
    
    const Welcome = () => (
      <h1>Welcome to this course! The ID is : {this.props.match.params.courseID}</h1>
    )

    return (
      <Switch>
        <Route path={courseURL + "/new"} component={Content} />
        <Route path={courseURL + "/previous"} component={PracticeList} />
        <Route path={courseURL + "/teacher"} component={requireAuth(['teacher'], StudentList)} />
        <Route exact path={courseURL} component={Welcome} />
        <Route component={() => "put 404 error stuff here"}/>
      </Switch>
    )
  }
}

export default CourseHomepage;