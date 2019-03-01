// Comment from Jason: This file is way too long

//TODO: wrap the goal field when it is displayed
//need to update the style
//need to refactor so that state is in the app.
//idea: create state for local start, and measure splits off of that, then record them in array on FS

import React, {Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import firebase from "../../config/constants";
import { StartDialog } from "./StartDialog";
import { Typography } from "@material-ui/core";
import { EndDialog } from "./EndDialog";
import ImageDialog from './ImageDialog'


const db = firebase.firestore();
const settings = {};
db.settings(settings);
const sessionsRef = db.collection("sessions");
const user = firebase.auth().currentUser;
const initialState = {
  sessionTimeEntry: 1, //in min
  sessionRemainingSeconds: 60, //in seconds
  running: false,
  timerLabel: "Paused",
  goal: "",
  showStart: true, 
  showEnd: false,
  showImageDialog: false,
  sessionRef: null,
  rating: 0,
  goal_comment: "",
  question_cmmment: "",
  learn_comment: "",
  disabled: false,
};

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.addSession = this.addSession.bind(this);
    this.subSession = this.subSession.bind(this);
    this.startStop = this.startStop.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.formatMinutes = this.formatMinutes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleStartClose = this.handleStartClose.bind(this);
    this.handleEndClose = this.handleEndClose.bind(this);
  }

  addSession() {
    //adding and subtracting methods need to also chage the session remaining in seconds to mirrow the entry time if ever changed
    if (this.state.sessionTimeEntry < 60 && this.state.running === false) {
      this.setState({
        sessionTimeEntry: this.state.sessionTimeEntry + 1,
        sessionRemainingSeconds: (this.state.sessionTimeEntry + 1) * 60
      });
    }
  }

  subSession() {
    if (this.state.sessionTimeEntry > 1 && this.state.running === false) {
      this.setState({
        sessionTimeEntry: this.state.sessionTimeEntry - 1,
        sessionRemainingSeconds: (this.state.sessionTimeEntry - 1) * 60
      });
    }
  }

  startStop() {
    const status = this.state.running;

    if (!this.state.sessionRef || this.state.session===null) {
      //first time starting timer, record new database entry
      console.log("writing session to cloudstore");
      const user = firebase.auth().currentUser;

      const sessionRef = sessionsRef
        .add({
          start_time: firebase.firestore.FieldValue.serverTimestamp(),
          practice_length: this.state.sessionTimeEntry, 
          user: user.uid,
          userName: user.displayName,
          email: user.email,
          goal: this.state.goal || "",
          splits: []
        })
        .then(ref => {
          console.log("Write successful with ID: ", ref.id);
          this.setState({ sessionRef: ref.id });
          return ref.id;
        });
    }
          
    switch (status) {
      case false:
        console.log("Begin Timer");
        this.setState({ running: true });

        this.timer = setInterval(() => {
          if (this.state.running) {
            if (this.state.sessionRemainingSeconds === 0) {
              // chime1.play(); // changed to use <audio> to pass FCC tests
              document.getElementById("notification").play();

              const sessionRef = this.state.sessionRef;
              this.setState({disabled: true});
              console.log("session ref at timer end", sessionRef);
              sessionsRef.doc(sessionRef).update({
                stop_time: firebase.firestore.FieldValue.serverTimestamp()
              });
              this.setState({ running: false, showEnd: true });
            }

            if (this.state.sessionRemainingSeconds > 0) {
              this.setState({
                sessionRemainingSeconds: this.state.sessionRemainingSeconds - 1,
                timerLabel: "Working"
              });
            } else {
              this.setState({
                timerLabel: "Paused"
              });
            }
          }
        }, 100); //TODO: Set this back to 1000 when done
        break;
      case true:
        console.log("Stop Timer");
        this.setState({ running: false, timerLabel: "Paused"});
        clearInterval(this.timer);
        break;
      default:
        break;
    }
  }
  resetTimer() {
    this.setState(initialState);
  }

  formatMinutes(time) {
    let seconds = time;
    const minutes =
      seconds % 60 === 0
        ? seconds / 60 < 10
          ? "0" + seconds / 60
          : seconds / 60
        : Math.floor(seconds / 60) < 10
        ? "0" + Math.floor(seconds / 60)
        : Math.floor(seconds / 60);
    seconds =
      seconds % 60 === 0
        ? "00"
        : seconds % 60 < 10
        ? "0" + (seconds % 60)
        : seconds % 60;
    console.log(minutes + ":" + seconds);
    return minutes + ":" + seconds;
  }

  handleChange(event) {
    this.setState({ goal: event.target.goal });
  }

  goSession = () => {
    this.setState({ showStart: false });
    //start timer
    this.startStop();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeRating(newRating, name){
    this.setState({ rating: newRating });
  };

  handleStartClose = event => {
    this.setState({ showStart: false });
  };
  handleEndClose = event => {
    
    console.log("handleEndClose")
    if (!this.state.goal_comment || !this.state.learn_comment) {
      return;
    }
    // don't let user submit if required question isn't filled out

    const sessionRef = this.state.sessionRef;

    sessionsRef.doc(sessionRef).update({
      rating: this.state.rating,
      goal_comment: this.state.goal_comment || "",
      learn_comment: this.state.learn_comment || "" ,
      question_comment: this.state.question_comment || ""
    });
    this.setState({ showEnd: false });
  };

  // addImage = base64Str => {
  //   console.log("addImage called")
  //   const sessionRef = this.state.sessionRef;
  // sessionsRef.doc(sessionRef).update({
  //     imageList: firebase.FieldValue.arrayUnion(base64Str)
  //   });

  // };

  handleOpenImageDialog = () => {
      this.setState({showImageDialog: true})
  }


  render() {
    return (
      <Fragment>
        <Grid container direction="column" >
          <Grid item xs={12} style={{textAlign:"center"}} >
            <Typography align="center" variant="h4">
              {" "}
              Session Timer
            </Typography>
            <h2>{this.state.goal}</h2>

            <StartDialog
              onChange={this.onChange}
              startSession={this.goSession}
              handleClose={this.handleStartClose}
              addSession={this.addSession}
              subSession={this.subSession}
              sessionTimeEntry={this.state.sessionTimeEntry}
              show={this.state.showStart}
              goal={this.state.goal}
            />

            <div id="mainTimer">
              <Typography align="center" variant="h1">
                {this.formatMinutes(this.state.sessionRemainingSeconds)}
              </Typography>
              <Typography align="center" variant="h6">
                {this.state.timerLabel}
              </Typography>

              <div id="timerControls" style={{display: "inline-block", marginBottom: 20}}>
              <Button
                  variant="contained"
                  color="primary"
                  disabled ={this.state.disabled}
                  onClick={this.startStop}
                  id="start-stop"
                  style={{ marginRight: 10 }}
                >
                  {this.state.running ? "Pause" : "Start"}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.resetTimer}
                  id="reset"
                >
                  Reset
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>

        <EndDialog 
        show={this.state.showEnd}
        handleClose = {this.handleEndClose}
        goal={this.state.goal}
        onChange = {this.onChange}
        rating = {this.state.rating}
        changeRating ={this.changeRating}
        comment = {this.state.goal_comment}
        learned = {this.state.learn_comment}
        question = {this.state.question_cmmment}
        handleOpenImageDialog = {this.handleOpenImageDialog}
        />

        <ImageDialog open={this.state.showImageDialog}/>
        
        <audio
          id="notification"
          src="Call-bell-ding.ogg"
          preload="auto"
        />
      </Fragment>
    );
  }
}

export default Countdown;
