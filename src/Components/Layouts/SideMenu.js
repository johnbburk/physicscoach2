// code modified from: https://material-ui.com/demos/drawers/

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { connect } from 'react-redux';

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
    if (this.props.course === null) {
      return null;
    }

    const { classes } = this.props;

    const courseURL = "/course/" + this.props.course;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button component='a' href={courseURL + '/new'}>
            <ListItemText primary='New Session' />
          </ListItem>

          <ListItem button component='a' href={courseURL + '/previous'}>
            <ListItemText primary='My Previous Work' />
          </ListItem>

          <ListItem button component='a' href={courseURL + '/classmates'}>
            <ListItemText primary="Classmates' Work" />
          </ListItem>

          <ListItem button component='a' href={courseURL + '/question'}>
            <ListItemText primary="Ask a Question" />
          </ListItem>

          {this.props.role === "teacher" &&
            <Fragment>
              <Divider />
              <ListItem button component='a' href={courseURL + '/roster'}>
                <ListItemText primary="Assignments" />
              </ListItem>

              <ListItem button component='a' href={courseURL + '/roster'}>
                <ListItemText primary="Roster" />
              </ListItem>

              <ListItem button component='a' href={courseURL + '/roster'}>
                <ListItemText primary="Join Requests" />
              </ListItem>
            </Fragment>
          }
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

function mapStateToProps(state) {
  return { course: state.course, role: state.role };
}

export default connect(mapStateToProps)(withStyles(styles)(TemporaryDrawer));