import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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
  else if (user == false) return <LoginMenu />;
  else return <div>Loading...</div>;
}

const renderSideMenu = (user) =>{
  if (user) return <SideMenu />;
  else if (user == false) return <div></div>;
  else return <div></div>;
}

function ButtonAppBar(props) {
  const { classes, user } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
           {renderSideMenu(user)}         
          <Typography variant="h5" color="inherit">
            Physics Coach
          </Typography>

          <div className={classes.grow}></div>
          {/* makes the login button right-aligned. */}

          {renderLoginButton(user)}

        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const Header = withStyles(styles)(ButtonAppBar);