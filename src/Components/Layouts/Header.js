import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import LoginMenu from "./LoginMenu";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";

export const Header = ({ user }) => (
  <AppBar position="static">
    <Toolbar>
      <Link className="App-logo" to="/">
        Physics Coach
      </Link>

      <div className="Account-container">
        {user != null ? <AccountMenu /> : <LoginMenu />}
      </div>
    </Toolbar>
  </AppBar>
);
