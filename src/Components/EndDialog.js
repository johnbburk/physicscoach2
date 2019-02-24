import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import StarRatings from "react-star-ratings";

export const EndDialog = ({
  show,
  handleClose,
  goal,
  onChange,
  rating,
  changeRating,
  comment,
  learned,
  question
}) => {
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="timer-end-dialog"
      >
        <DialogTitle align="center" id="timer-end-dialog">
          Finish Practice{" "}
        </DialogTitle>

        <DialogContent>
          <form>
          
            <FormControl>
           This practice was: 
           <br/>
           <div>
            Unfocused
            <span style={{margin: 20}}>
              <StarRatings
                rating={rating}
                starRatedColor="red"
                numberOfStars={5}
                starDimension={'25px'}
                name="rating"
                changeRating={changeRating}
              />
              </span>
              Focused
              </div>
            <br/>
              Your Goal for this session:
              <br/> {goal}
              <TextField
                id="comment"
                name="goal_comment"
                required = {true}
                label="How did this practice go?"
                multiline
                margin="normal"
                variant="outlined"
                onChange={onChange}
              />
              <br />
              <TextField
                id="learned"
                name="learn_comment"
                label="What did you learn?"
                required = {true}
                multiline
                margin="normal"
                variant="outlined"
                onChange={onChange}
              />
              <br />
              <TextField
                id="question"
                name="question_comment"
                label="One question I still have"
                required = {true}
                multiline
                margin="normal"
                variant="outlined"
                onChange={onChange}
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
};
