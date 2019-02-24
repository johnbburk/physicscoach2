import React  from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";

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
        aria-labelledby="timer-start-dialog"
      >
        <DialogTitle align="center" id="timer-start-dialog">Start New Practice</DialogTitle>
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
        required = {true}
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
