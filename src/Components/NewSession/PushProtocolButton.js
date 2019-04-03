import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const PUSH_ACTIVE_TIME = 1;

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${color} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  lightTooltip: {
    backgroundColor: theme.palette.grey[200],
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  },
  arrowPopper: arrowGenerator(theme.palette.grey[700]),
  arrow: {
    position: "absolute",
    fontSize: 6,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  }
});

class PushProtocolButton extends Component {
  state = {
    arrowRef: null
  };
  activatePush = () => {
    this.props.toggleTimer();
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  render() {
    const { classes } = this.props;
    console.log("elapsed time: ", this.props.elapsedTime);
    return (
      <Tooltip
        placement="right"
        title={
          <React.Fragment>
            <Typography color="inherit" variant="h5">
              If you're stuck...
            </Typography>
            <Typography variant="body1">
              If you've worked for {PUSH_ACTIVE_TIME} minutes, and you haven't
              made any written progress at all, it's time to activate the push
              protocol by pressing this button.
            </Typography>

            <span className={classes.arrow} ref={this.handleArrowRef} />
          </React.Fragment>
        }
        classes={{
          tooltip: classes.lightTooltip,
          popper: classes.arrowPopper
        }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef
              }
            }
          }
        }}
      ><div>
        <Button
          style={{ display: "block", margin: "0 auto 20px" }}
          variant="contained"
          color="secondary"
          size="large"
          disabled={!(this.props.elapsedTime / 60 > PUSH_ACTIVE_TIME)}
          onClick={this.activatePush}
        >
          I'm stuck
        </Button>
        </div>
      </Tooltip>
    );
  }
}

export default withStyles(styles)(PushProtocolButton);
