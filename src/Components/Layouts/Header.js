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

const renderLoginButton = (user) => {
  if (user) return <AccountMenu />;
  else return <LoginMenu />;
}

const renderSideMenu = (user) =>{
  if (user) return <SideMenu />;
  else return null;
}

function ButtonAppBar(props) {
  const { classes, user, loading } = props;
  if(loading){
    return null;

  }
  else return (
   
    <AppBar position="static">
      <Toolbar>
        {renderSideMenu(user)}
        <Link variant="h5" color="inherit" href="/" underline='none'>
          Physics Coach
          </Link>

        <div className={classes.grow}></div>
        {/* makes the login button right-aligned. */}

        {renderLoginButton(user)}

      </Toolbar>
    </AppBar>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { user: state.user,
          loading: state.isWaitingForFirebase };
}

export const Header = connect(mapStateToProps)(withStyles(styles)(ButtonAppBar));