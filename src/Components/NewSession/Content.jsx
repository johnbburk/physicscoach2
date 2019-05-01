import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import Countdown from "./Countdown";
import { connect } from "react-redux";
import StartDialog from "./StartDialog";
import EndForm from "./EndDialog";

class Content extends Component {
  state = {
    finished: false
  };

  render() {
    if (this.props.sessionUninitalized) {
      return <StartDialog />;
    }

    if (this.state.finished) {
      return <EndForm />;
    }

    return (
      <Grid container alignContent="center" direction="column">
        <Paper style={{ margin: 15, padding: 20, width: 300 }}>
          <Countdown finishPractice={() => this.setState({ finished: true })} />
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const sessionUninitalized = state.currentSession === null;
  return {
    sessionUninitalized
  };
};

export default connect(mapStateToProps)(Content);
