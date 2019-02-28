//TODO: create LOGINPATH and put it in a constants.js file

import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseAuth, provider } from "../../config/constants";
import { store } from "../../store";
import history from "../../history";
import { authAction } from "../../actions";

const buttonStyle = {
  color: "white",
  backgroundColor: "#0073e6"
  // textDecoration: "none",
  // alignSelf: "center",
  // marginLeft: 20
  // float: "right", (unnecessary because wrapping div takes care of it)
};

export const LoginMenu = () => (
  <Button
    className="Login-button"
    style={buttonStyle}
    component={Link}
    to={"/new"}
    onClick={() => {
      firebaseAuth
        .signInWithPopup(provider)
        .then(() => {
          history.push("/new")
        }
        )
        .catch(error => {
          console.log(error);
        });
    }}
    data-test={"sign-in"}
  >
    Sign In
  </Button>
);

export default LoginMenu;
