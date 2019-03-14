import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import history from "../../history";

// higher order component that wraps pages which require authentication

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    render() {
      if (this.props.user && this.props.role === "teacher" ) {
      return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  function mapStateToProps(state) {
    return { user: state.user,
            role: state.role };
  }

  return connect(mapStateToProps)(Authentication);
}
