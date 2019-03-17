import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom"


// higher order component that wraps pages which require authentication

export default function(authorizedRoles,ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    render() {
      if (this.props.user && authorizedRoles.includes(this.props.role) ) {
      return <ComposedComponent {...this.props} />;
      }
      else if(this.props.user)
      {
        return <h1>Access Forbidden</h1>
      }
      else 
      return <Redirect to="/"/>;
    }
  }

  function mapStateToProps(state) {
    return { user: state.user,
            role: state.role };
  }

  return connect(mapStateToProps)(Authentication);
}
