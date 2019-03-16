import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseAuth } from "../../config/constants";


const styles = {
  buttonRoot: {
    color: "white"
  },
  buttonStyle: {
    color: "white",
    backgroundColor: "#0073e6"
    // textDecoration: "none",
    // alignSelf: "center",
    // marginLeft: 20
    // float: "right", (unnecessary because wrapping div takes care of it)
  }
};

class AccountMenu extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <Button
        className="Login-button"
        style={styles.buttonStyle}
        component={Link}
        data-test={"sign-out"}
        to="/"
        onClick={() => {
          firebaseAuth.signOut();
        }}
      >
        Sign Out
      </Button>
    );
  }
}

export default AccountMenu;
