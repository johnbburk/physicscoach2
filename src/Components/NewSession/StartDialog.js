import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";

import { initializeSessionInfo } from '../../store';
import { connect } from 'react-redux';

class StartDialog extends Component {

  state = {
    goal: '',
    sessionTimeEntry: 1,
  }

  changeTime = (amount) => {
    this.setState((prevState) => {
      if (prevState.sessionTimeEntry + amount < 1) return;
      return {
        sessionTimeEntry: prevState.sessionTimeEntry + amount
      }
    })
  }

  submit = () => {

    if (!this.state.goal) {
      return;
    }
    this.props.initializeSessionInfo(this.state.sessionTimeEntry, this.state.goal);
    // this.props.startSession();

  }

  render() {
    console.log('show start', this.props.show)
    return (
      <Dialog
        open={this.props.show}
        aria-labelledby="timer-start-dialog"
      >
        <DialogTitle align="center" id="timer-start-dialog">
          Start New Practice
          </DialogTitle>

        <DialogContent>
          <DialogContentText variant="h3" align="center">
            {this.state.sessionTimeEntry}:00
            </DialogContentText>

          <FormControl>

            <div align="center">
              <Button variant="outlined"
                onClick={() => this.changeTime(-1)}
                id="session-decrement"
                className="timerContainerButtons"
              >
                -
                </Button>
              <Button variant="outlined"
                onClick={() => this.changeTime(+1)}
                id="session-increment"
                className="timerContainerButtons"
              >
                +
              </Button>
            </div>

            <TextField
              id="goal"
              name="goal"
              label="Goal for this session"
              placeholder="My goal is..."
              required={true}
              multiline
              margin="normal"
              variant="outlined"
              onChange={(event) => this.setState({goal: event.target.value})}
            />

          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.submit} color="primary">
            Start Practice
          </Button>
        </DialogActions>

      </Dialog>
    );
  };
}

const mapStateToProps = (state) => {
  // only show the dialog if the session has not been initialized yet
  const sessionUninitalized = (state.currentSession === null);
  return {
    show: sessionUninitalized
  }
}

const mapDispatchToProps = {
  initializeSessionInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(StartDialog);
