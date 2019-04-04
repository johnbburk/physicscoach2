import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import { DialogActions } from "@material-ui/core";
import firebase from "../../config/constants";
import { GridList, GridListTile } from "@material-ui/core/";
import PracticeImage from "./PracticeImage";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Radio, RadioGroup } from "@material-ui/core";

import ImageDialog from "./ImageDialog";
import { connect } from "react-redux";
import history from "../../history";

class EndDialog extends Component {
  state = {
    rating: 0,
    goalComment: "",
    questionComment: "",
    learnComment: "",
    showImageDialog: false,
    imageList: []
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeRating = event => {
    this.setState({ rating: event.target.value });
  };

  closeImageDialog = () => {
    this.setState({ showImageDialog: false });
  };

  addImage = imgSrc => {
    this.setState(prevState => {
      return {
        imageList: prevState.imageList.concat(imgSrc)
      };
    });
  };

  deleteImage = index => {
    console.log("delete called on index", index);
    this.setState(prevState => {
      return {
        imageList: prevState.imageList.filter((im, j) => j !== index)
      };
    });
  };

  submit = () => {
    if (
      !this.state.goalComment ||
      !this.state.learnComment ||
      !this.state.rating
    ) {
      // don't let user submit if required question isn't filled out
      return;
    }

    const db = firebase.firestore();
    const user = this.props.user;
    const courseURL = this.props.courseURL;
    const {
      rating,
      goalComment,
      learnComment,
      questionComment,
      imageList,
    } = this.state;

    db.collection("sessions")
      .add({
        submit_time: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.uid,
        userName: user.displayName,
        email: user.email,
        course: this.props.course,

        practiceLength: this.props.sessionInfo.timeInMinutes,
        goal: this.props.sessionInfo.goal,

        rating,
        goalComment,
        learnComment,
        questionComment,
        imageList
      })
      .then(ref => {
        console.log("Write successful with ID: ", ref.id);
        history.push(courseURL + "/previous");
      });
  };

  render() {
    return (
      <div style={{ maxWidth: 1000, margin: "auto" }}>
        {/* margin auto centers the div */}

        <div>
          <DialogContent>
            <FormControl fullWidth>
              <p>
                Your goal for this session was:{" "}
                <strong>{this.props.sessionInfo.goal}</strong>
              </p>
              How much of your goal did you accomplish? I accomplished...
              <RadioGroup
                style={{ float: "left", margin: "0 auto" }}
                onChange={this.changeRating}
                value={this.state.rating}
                aria-label="position"
                name="position"
                row
              >
                <FormControlLabel
                  value="-2"
                  control={<Radio color="primary" />}
                  label="Much Less"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="-1"
                  control={<Radio color="primary" />}
                  label="Less"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio color="primary" />}
                  label="Accomplished Goal"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label="More"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label="Much More"
                  labelPlacement="bottom"
                />
              </RadioGroup>
              <br />
              <TextField
                id="comment"
                name="goalComment"
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
                name="learnComment"
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
                name="questionComment"
                label="One question I still have"
                required={false}
                multiline
                margin="normal"
                variant="outlined"
                onChange={this.onChange}
              />
            </FormControl>

            <ImageDialog
              open={this.state.showImageDialog}
              addImage={this.addImage}
              closeImageDialog={this.closeImageDialog}
            />

            <GridList cols={4} style={{ marginTop: 20 }}>
              {this.state.imageList.map((image, index) => {
                return (
                  <GridListTile key={index}>
                    <PracticeImage
                      image={image}
                      alt={"student work"}
                      onDelete={() => this.deleteImage(index)}
                      deleteEnabled={true}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
            <DialogActions>
              <Button variant = "outlined" onClick={() => this.setState({ showImageDialog: true })}>
                Add Image
              </Button>
              <Button  variant = "outlined" onClick={this.submit} color="primary">
                Save Practice
              </Button>
            </DialogActions>
          </DialogContent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sessionInfo: state.currentSession,
    user: state.user,
    course: state.course,
    courseURL: state.courseURL
  };
};

export default connect(mapStateToProps)(EndDialog);
