import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import LoginMenu from "./LoginMenu";
import AccountMenu from "./AccountMenu";
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
                    
          {user != null && <SideMenu></SideMenu>}
          <Typography variant="h5" color="inherit">
            Physics Coach
          </Typography>

          <div className={classes.grow}></div>
          {/* makes the login button right-aligned. */}

          {user != null ? <AccountMenu /> : <LoginMenu />}

        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const Header = withStyles(styles)(ButtonAppBar);