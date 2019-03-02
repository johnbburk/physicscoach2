import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import StarRatings from "react-star-ratings";
import { DialogActions } from "@material-ui/core";

import ImageDialog from './ImageDialog';

export default class EndDialog extends Component {

  state = {
    rating: 0,
    goal_comment: "",
    question_comment: "",
    learn_comment: "",
    showImageDialog: false,
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeRating = (newRating) => {
    this.setState({ rating: newRating });
  };

  submit = () => {

  }

  render() {
    return (

      <div style={{ maxWidth: 1000, margin: 'auto' }}>
        {/* margin auto centers the div */}

        <div>
          <DialogContent>
            <FormControl fullWidth>
              This practice was:

              <br /><br />
              <div style={{ textAlign: "center" }}>
                Unfocused
                <span style={{ margin: 20 }}>
                  <StarRatings
                    rating={this.state.rating}
                    starRatedColor="red"
                    numberOfStars={5}
                    starDimension={'25px'}
                    name="rating"
                    changeRating={this.changeRating}
                  />
                </span>
                Focused
              </div>
              <br />

              <b>Your goal for this session:</b> {"display goal from redux"}
              <TextField
                id="comment"
                name="goal_comment"
                required={true}
                label="How did this practice go?"
                multiline
                margin="normal"
                variant="outlined"
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
              />
            </FormControl>

            <DialogActions>
              <Button onClick={() => this.setState({showImageDialog: true})}>Add Images</Button>
              <Button onClick={this.submit} color="primary">
                Save Practice
              </Button>
            </DialogActions>
          </DialogContent>
        </div>
        <ImageDialog open={(this.state.showImageDialog)} />
      </div>
    );
  }
};
