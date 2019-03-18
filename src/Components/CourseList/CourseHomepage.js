import React, { Component, Fragment } from 'react';
import Content from "../NewSession/Content";
import PracticeList from "../PreviousSessions/PracticeList"
import StudentList from "../CourseList/studentList";
import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { selectCourse } from '../../store';

class CourseHomepage extends Component {
  componentDidMount = () => {
    this.props.selectCourse(this.props.match.params.courseID)
  }

  render() {
    if (this.props.user === null) {
      return <Redirect to="/" />
    }

    const courseURL = this.props.match.url

    const Welcome = () => (
      <div className="Main-content">
        <h1>Welcome to this course! The ID is: {this.props.match.params.courseID}</h1>
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