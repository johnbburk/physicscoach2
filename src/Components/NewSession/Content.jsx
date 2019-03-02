import React, { Component, Fragment } from "react";
import { Grid, Paper } from "@material-ui/core";
import WebcamDialog from "./WebcamCapture";
import Countdown from "./Countdown";
import { connect } from "react-redux";
import StartDialog from "./StartDialog";
import EndForm from "./EndDialog";

class Content extends Component {
  state = {
    timeUp: false,
  }

  render() {
    if (this.props.sessionUninitalized) {
      return <StartDialog/>
    }

    if (this.state.timeUp) {
      return <EndForm/>
    }

    return (
      <Grid container alignContent='center' direction='column'>
            <Paper style={{margin: 15, padding: 20, width: 300}}>
              <Countdown timeUp={() => this.setState({timeUp: true})}/>
            </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const sessionUninitalized = (state.currentSession === null);
  return {
    sessionUninitalized
  }
}

export default connect(mapStateToProps)(Content);
