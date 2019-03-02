import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import StarRatings from "react-star-ratings";
import { DialogActions } from "@material-ui/core";
import firebase from "../../config/constants";

import ImageDialog from './ImageDialog';
import { connect } from 'react-redux';
import history from "../../history";

class EndDialog extends Component {

  state = {
    rating: 0,
    goal_comment: "",
    question_comment: "",
    learn_comment: "",
    showImageDialog: false,
    imageList: []
    
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeRating = (newRating) => {
    this.setState({ rating: newRating });
  };

  closeImageDialog = () =>{
    this.setState({showImageDialog: false})
  };

  handleImageList = (images)=>{
    this.setState({iamgeList: images})
  };

  submit = () => {
    if (!this.state.goal_comment || !this.state.learn_comment || !this.state.rating) {
      // don't let user submit if required question isn't filled out
      return;
    };

    const db = firebase.firestore();
    // const settings = {};
    // db.settings(settings); these two lines don't seems to be necessary
    const user = firebase.auth().currentUser;

    const { rating, goal_comment, learn_comment, question_comment} = this.state;
    
    db.collection("sessions").add({
      start_time: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.uid,
      userName: user.displayName,
      email: user.email,

      practice_length: this.props.sessionInfo.timeInMinutes,
      goal: this.props.sessionInfo.goal,

      rating,
      goal_comment,
      learn_comment,
      question_comment,

      splits: [], // what is this for? - Jason
                  //I was originally going to save splits—so that if you paused your work, it would record the pauses. 
                  //I never quite figured this out, and decided it was a low prioirty.
    })
      .then(ref => {
        console.log("Write successful with ID: ", ref.id);
        history.push("/previous")
      });
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

              <p>Your goal for this session: <strong>{this.props.sessionInfo.goal}</strong></p>
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
              <Button onClick={() => this.setState({ showImageDialog: true })}>Add Images</Button>
              <Button onClick={this.submit} color="primary">
                Save Practice
              </Button>
            </DialogActions>
          </DialogContent>
        </div>
        <ImageDialog open={(this.state.showImageDialog)} handleImageList ={this.handleImageList} closeImageDialog={this.closeImageDialog}/>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    sessionInfo: state.currentSession
  }
}

export default connect(mapStateToProps)(EndDialog);