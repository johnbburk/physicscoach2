// code modified from: https://material-ui.com/demos/drawers/

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    leftMenuOpen: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      leftMenuOpen: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button component='a' href='/new'>
            <ListItemText primary='New Session' />
          </ListItem>
          <ListItem button component='a' href='/previous'>
            <ListItemText primary='My Previous Work' />
          </ListItem>

          {['Classmates\' Work', 'Ask a Question'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} onClick={() => console.log('no link yet')} />
            </ListItem>
          ))}
          {/* TODO: Make menu items route to new pages. */}
        </List>



      </div>
    );

    return (
      <div>
        <IconButton
          className={classes.menuButton} color="inherit" aria-label="Menu"
          onClick={this.toggleDrawer('left', true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer open={this.state.leftMenuOpen} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);