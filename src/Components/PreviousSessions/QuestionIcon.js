//should change color depending on status of question
//should also have tooltip to show question

import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Help, Autorenew } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

const styles = {
  questionIcon: {
    padding: 4,
    marginTop: -5
  }
};

class QuestionIcon extends Component {
  render() {
    const { isQuestionOpen, question, classes } = this.props;
    if (question) {
      return (
        <IconButton
          color={isQuestionOpen ? "primary" : "secondary"}
          className={classes.questionIcon}
        >
          <Help fontSize="large" />
        </IconButton>
      );
    } else return null;
  }
}

export default withStyles(styles)(QuestionIcon);
