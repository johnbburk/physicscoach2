//TODO: create LOGINPATH and put it in a constants.js file

import React from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button"

const buttonStyle = {
    color: "white",
    textDecoration: "none",
    alignSelf: "center"
}

export const LoginMenu = () => (
    // eslint-disable-next-line no-unused-expressions
    <div>
    <Button
    style = {buttonStyle}
    component = {Link}
    to={"/Login"}
    data-test = {"sign-in"}>
    Sign In
    </Button>
</div>
)

export default LoginMenu