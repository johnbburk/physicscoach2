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
import StarRatings from "react-star-ratings";

export const EndDialog =({
show,
handleClose,
goal,
onChange,
rating,
changeRating,
comment,
learned,
question

})=>{
  return(
    <div>
      <Dialog 
      open = {show}
      onClose = {handleClose}
      aria-labelledby="timer-end-dialog"
      >
      <DialogTitle align = "center" id="timer-end-dialog" >Finish Practice </DialogTitle>
    
      <DialogContent>
        <form>
          <FormControl>
          Your Goal: {goal}
          <TextField
            id="comment"
            name = "comment"
            label="How did this practice go?"
            multiline
            margin="normal"
            variant="outlined"
            onChange ={onChange}
          />
          <br/>
      <StarRatings
        rating={rating}
        starRatedColor="red"
        numberOfStars={5}
        name="rating"
        changeRating={changeRating}
      />
      <br/>
    
      <TextField
            id="learned"
            name = "learned"
            label="What did you learn?"
            multiline
            margin="normal"
            variant="outlined"
            onChange ={onChange}
          />
    
        <br/>
      <TextField
            id="question"
            name = "question"
            label="One question I still have"
            multiline
            margin="normal"
            variant="outlined"
            onChange ={onChange}
          />
      
      <Button onClick={handleClose} color="primary">
            Save Practice
          </Button>
      
          </FormControl>
        </form>
    
    
      </DialogContent>
     
      </Dialog>
    </div>
  );
}
