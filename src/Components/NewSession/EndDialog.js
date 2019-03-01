import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import WebcamDialog from "./WebcamCapture";
import StarRatings from "react-star-ratings";
import { DialogActions } from "@material-ui/core";

export const EndDialog = ({
  show,
  handleClose,
  goal,
  onChange,
  rating,
  changeRating,
  handleOpenImageDialog,
  comment,
  learned,
  question,
  addImage
}) => {
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="timer-end-dialog"
        fullWidth
      >
        <DialogTitle align="center" id="timer-end-dialog">
          Finish Practice{" "}
        </DialogTitle>

        <DialogContent>
            <FormControl fullWidth>
              This practice was:

              <br /><br />
              <div style={{ textAlign: "center" }}>
                Unfocused
                <span style={{ margin: 20 }}>
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
              <br />

              Your Goal for this session:
              <br /> {goal}
              <TextField
                id="comment"
                name="goal_comment"
                required={true}
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
                required={true}
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
                required={false}
                multiline
                margin="normal"
                variant="outlined"
                onChange={onChange}
              />


            </FormControl>

            <DialogActions>
              <Button onClick={handleOpenImageDialog}>Add Images</Button>
              {/* <div style={{width: 30}}/> */}
              <Button onClick={handleClose} color="primary">
                Save Practice
              </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
