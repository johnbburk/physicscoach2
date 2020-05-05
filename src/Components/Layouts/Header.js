import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from '@material-ui/core';
import { connect } from 'react-redux';

import LoginMenu from "./LoginMenu";
import AccountMenu from "./SignOutButton";
import SideMenu from "./SideMenu";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

function ButtonAppBar(props) {
  const { classes, user } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <SideMenu />
        <Link variant="h5" color="inherit" href="/" underline='none'>
          Physics Coach
          </Link>

        <div className={classes.grow}></div>
        {/* makes the login button right-aligned. */}

        {user === null ? <LoginMenu /> : <AccountMenu />}

      </Toolbar>
    </AppBar>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { user: state.user };
}

export const Header = connect(mapStateToProps)(withStyles(styles)(ButtonAppBar));