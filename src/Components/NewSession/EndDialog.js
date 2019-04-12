import React, { Component, Fragment } from "react";
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
    practiceNote: "",
    questionComment: "",
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
    if (!this.state.practiceNote || !this.state.rating) {
      // don't let user submit if required question isn't filled out
      return;
    }

    const db = firebase.firestore();
    const user = this.props.user;
    const courseURL = this.props.courseURL;
    const { rating, practiceNote, questionComment, imageList } = this.state;

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
        practiceNote,
        questionComment,
        imageList
      })
      .then(ref => {
        console.log("Write successful with ID: ", ref.id);
        history.push(courseURL + "/previous");
      });
  };

  render() {
    const { isPushProtocol } = this.props.sessionInfo;

    return (
      <div style={{ maxWidth: 1000, margin: "auto" }}>
        {/* ma}rgin auto centers the div */}

        <div>
          <DialogContent>
            <FormControl fullWidth>
              <p>
                Your goal for this session was:{" "}
                <strong>{this.props.sessionInfo.goal}</strong>
              </p>

              {isPushProtocol ? (
                <h4>
                  Don’t worry—being stuck is a common experience when working on
                  challenging things. One of the best ways to get unstuck, and
                  overcome frustration is to take a break and come back to the
                  problem.
                  <br />
                </h4>
              ) : (
                <Fragment>
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
                </Fragment>
              )}
              <br />
              <TextField
                id="comment"
                name="practiceNote"
                required={true}
                label="Practice notes"
                placeholder={
                  isPushProtocol
                    ? "How did this practice go? What has you stuck?"
                    : "How did the practice go? Did you meet your goal? What did you learn?"
                }
                multiline
                margin="normal"
                variant="outlined"
                onChange={this.onChange}
              />
              <br />

              {isPushProtocol && (
                <h4>
                  Take a few minutes to write down everything you’ve tried thus
                  far to solve the problem on your paper. This will be super
                  helpful to you when you come back to the problem later.{" "}
                </h4>
              )}

              <br />
              <TextField
                id="question"
                name="questionComment"
                label="Question"
                placeholder={
                  isPushProtocol
                    ? "Here is a question I need to be able to answer to make more progress on this problem..."
                    : "One question I still have is..."
                }
                required={false}
                multiline
                margin="normal"
                variant="outlined"
                onChange={this.onChange}
              />
            </FormControl>

{isPushProtocol && (
  <h4>
    Please be sure to include a clear image of your problem and the description of all you've tried so far, so that you can get
    useful help and feedback from your teacher. 
  </h4>
)}

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
              <Button
                variant="outlined"
                onClick={() => this.setState({ showImageDialog: true })}
              >
                Add Image
              </Button>
              <Button variant="outlined" onClick={this.submit} color="primary">
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
