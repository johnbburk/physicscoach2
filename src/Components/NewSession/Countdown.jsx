// Comment from Jason: This file is way too long

//TODO: wrap the goal field when it is displayed
//need to update the style
//need to refactor so that state is in the app.
//idea: create state for local start, and measure splits off of that, then record them in array on FS

import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import { connect } from 'react-redux';

class Countdown extends Component {

  state = {
    secondsRemaining: this.props.initialTimeInMinutes * 60,
    running: false,
    showEnd: false,
    showImageDialog: false,
    sessionRef: null,

  };

  toggleTimerRunning = () => {
    switch (this.state.running) {
      case false:
        console.log("Begin Timer");
        this.setState({ running: true });

        this.timer = setInterval(() => {
          if (this.state.secondsRemaining === 0) {
            // chime1.play(); // changed to use <audio> to pass FCC tests
            clearInterval(this.timer);
            document.getElementById("notification").play();

            // wait for notification to play before dismounting component
            setTimeout(this.props.timeUp, 2000)

          } else {
            this.setState((prevState) => {
              return {
                secondsRemaining: prevState.secondsRemaining - 1,
              }
            });
          }
        }, 100); //TODO: Set this back to 1000 when done
        break;

      case true:
        console.log("Pause Timer");
        this.setState({ running: false });
        clearInterval(this.timer);
        break;
    }
  }

  resetTimer = () => {
    if (this.state.running) {
      this.toggleTimerRunning();
    }
    this.setState({
      secondsRemaining: this.props.initialTimeInMinutes * 60,
    });
  }

  formatMinutes = (time) => {
    let seconds = time;
    const minutes =
      seconds % 60 === 0
        ? seconds / 60 < 10
          ? "0" + seconds / 60
          : seconds / 60
        : Math.floor(seconds / 60) < 10
          ? "0" + Math.floor(seconds / 60)
          : Math.floor(seconds / 60);
    seconds =
      seconds % 60 === 0
        ? "00"
        : seconds % 60 < 10
          ? "0" + (seconds % 60)
          : seconds % 60;
    return minutes + ":" + seconds;
  }

  render() {
    return (
      <Fragment>
        <Grid container direction="column" >
          <Grid item xs={12} style={{ textAlign: "center" }} >
            <Typography align="center" variant="h4">
              {" "}
              Session Timer
            </Typography>
            <h2>{this.state.goal}</h2>

            <div id="mainTimer">
              <Typography align="center" variant="h1">
                {this.formatMinutes(this.state.secondsRemaining)}
              </Typography>
              <Typography align="center" variant="h6">
                {this.state.running ? "Working" : "Paused"}
              </Typography>

              <div id="timerControls" style={{ display: "inline-block", marginBottom: 20 }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.state.secondsRemaining === 0}
                  onClick={this.toggleTimerRunning}
                  id="start-stop"
                  style={{ marginRight: 10 }}
                >
                  {this.state.running ? "Pause" : "Start"}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.resetTimer}
                  id="reset"
                >
                  Reset
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>

        <audio
          id="notification"
          src="Call-bell-ding.ogg"
          preload="auto"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialTimeInMinutes: state.currentSession.timeInMinutes,
  }
}

export default connect(mapStateToProps)(Countdown);