import React from 'react';
import { Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';

/**
 * Redirects to course homepage if user is not teacher; props are the same as Route
 */
const TeacherRoute = ({ role, courseURL, ...rest }) => {
  if (role === "teacher") {
    return (
      <Route {...rest} />
    );

  } else {
    return <Redirect to={courseURL}/>;
  }
};

function mapStateToProps(state) {
  return { role: state.role, courseURL: state.courseURL };
}

export default connect(mapStateToProps)(TeacherRoute)