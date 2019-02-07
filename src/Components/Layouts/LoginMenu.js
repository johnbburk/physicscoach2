//TODO: create LOGINPATH and put it in a constants.js file

import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button"

const buttonStyle = {
    color: "white",
    backgroundColor: "#0073e6",
    // textDecoration: "none",
    // alignSelf: "center",
    // marginLeft: 20
    // float: "right", (unnecessary because wrapping div takes care of it)
}

export const LoginMenu = () => (
    // eslint-disable-next-line no-unused-expressions

    // <div>

    <Button
        className="Login-button"
        style={buttonStyle}
        component={Link}
        to={"/login"}
        data-test={"sign-in"}
    >
        Sign In
    </Button>

    // </div>
)

export default LoginMenu