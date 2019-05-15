//should change color depending on status of question
//should also have tooltip to show question
//TODO: have parent control visibility of QuestionIcon

import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Help, Autorenew } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

const styles = {
  openQuestionIcon: {
    padding: 4,
    marginTop: -5,
    color: "red"
  },
  closedQuestionIcon: {
    padding: 4,
    marginTop: -5,
    color: "green"
  }
};

class QuestionIcon extends Component {
  render() {
    const { isQuestionOpen, question, classes } = this.props;

    if (question) {
      return (
        <IconButton
          className={
            isQuestionOpen
              ? classes.openQuestionIcon
              : classes.closedQuestionIcon
          }
        >
          <Help fontSize="large" />
        </IconButton>
      );
    } else return null;
  }
}

export default withStyles(styles)(QuestionIcon);
