//TODO: create LOGINPATH and put it in a constants.js file

import React from "react";
import Button from "@material-ui/core/Button";
import { firebaseAuth, provider } from "../../config/constants";
import history from "../../history";

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
    // component={Link}
    // to={"/new"}
    // Don't direct to "/new" until the user has succesfully signed in
    onClick={() => {
      firebaseAuth
        .signInWithPopup(provider)
        .catch(error => {
          console.log("error logging in", error);
        });
    }}
    data-test={"sign-in"}
  >
    Sign In
  </Button>
);

export default LoginMenu;
