import React, { Component, Fragment } from "react";
import { Grid, Paper } from "@material-ui/core";
import WebcamDialog from "./WebcamCapture";
import Countdown from "./Countdown";

class Content extends Component {
  render() {
    return (
      <Grid container alignContent='center' direction='column'>
            <Paper style={{margin: 15, padding: 20, width: 300}}>
              <Countdown />
            </Paper>
      </Grid>
    );
  }
}

export default Content;
