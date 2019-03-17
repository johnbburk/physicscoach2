import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import StarRatings from "react-star-ratings";
import { DialogActions } from "@material-ui/core";
import firebase from "../../config/constants";
import { GridList, GridListTile } from "@material-ui/core/";
import PracticeImage from "./PracticeImage";

import ImageDialog from "./ImageDialog";
import { connect } from "react-redux";
import history from "../../history";

class PushProtocolDialog extends Component {
  state = {
    rating: 0,
    goal_comment: "",
    question_comment: "",
    learn_comment: "",
    showImageDialog: false,
    imageList: []
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeRating = newRating => {
    this.setState({ rating: newRating });
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
      !this.state.goal_comment ||
      !this.state.learn_comment ||
      !this.state.rating
    ) {
      // don't let user submit if required question isn't filled out
      return;
    }

    const db = firebase.firestore();
    // const settings = {};
    // db.settings(settings); these two lines don't seems to be necessary
    const user = firebase.auth().currentUser;

    const {
      rating,
      goal_comment,
      learn_comment,
      question_comment,
      imageList
    } = this.state;

    db.collection("sessions")
      .add({
        submit_time: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.uid,
        userName: user.displayName,
        email: user.email,

        practice_length: this.props.sessionInfo.timeInMinutes,
        goal: this.props.sessionInfo.goal,

        rating,
        goal_comment,
        learn_comment,
        question_comment,
        imageList,
      })
      .then(ref => {
        console.log("Write successful with ID: ", ref.id);
        history.push("/previous");
      });
  };

  render() {
    return ( null)
  }
}

const mapStateToProps = state => {
  return {
    sessionInfo: state.currentSession
  };
};

export default connect(mapStateToProps)(PushProtocolDialog);
