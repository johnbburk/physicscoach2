import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/styles';
import { FormGroup } from "@material-ui/core";
import {ButtonGroup} from "@material-ui/core";

/*
show={this.state.showStart}
handleClose={this.goSession}
buttonText="Go!"
*/
  
export const StartDialog = ({
  show,
  handleClose,
  startSession,
  onChange,
  sessionTimeEntry,
  addSession,
  subSession,
  goal
}) => {
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle align="center" id="form-dialog-title">Start New Practice</DialogTitle>
        <DialogContent>
          <DialogContentText variant = "h3" align="center">{sessionTimeEntry}:00</DialogContentText>
          <form>
              <FormControl>  
                  <div align = "center"> 
          <Button variant="outlined"
            onClick={subSession}
            id="session-decrement"
            className="timerContainerButtons"
          >
            -
          </Button>
          <Button variant = "outlined"
            onClick={addSession}
            id="session-increment"
            className="timerContainerButtons"
          >
            +
          </Button>
          </div> 
          
            <TextField
        id="goal"
        name = "goal"
        label="Goal for this session"
        placeholder="My goal is..."
        multiline
        margin="normal"
        variant="outlined"
        onChange ={onChange}
      />
      </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={startSession} color="primary">
            Start Practice
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

/*
<form>
  What is your goal for this session?{" "}
  <input type="text" name="goal" onChange={this.onChange} />
</form>
<div className="flexContainer">
  <div id="timerContainer" className="flexContainer">
    <h3
      id="session-
label"
      className="timerContainerLabels"
    >
      Session Time
    </h3>
    <h3 id="session-length" className="timerContainerLabels">
      {this.state.sessionTimeEntry}
    </h3>
    <button
      onClick={this.props.subSession}
      id="session-decrement"
      className="timerContainerButtons"
    >
      -
    </button>
    <button
      onClick={this.addSession}
      id="session-increment"
      className="timerContainerButtons"
    >
      +
    </button>
  </div>
</div>
</Modal>
*/
