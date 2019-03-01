import React, { Component, Fragment } from "react";
import "../styles/App.css";
import { Footer } from "./Layouts";
import { Grid, Paper } from "@material-ui/core";
import WebcamDialog from "./WebcamCapture";
import Countdown from "./Countdown";

class Content extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    imageList: []
  };



  render() {
    return (
      <Fragment>
        <Grid container spacing = {0} alignItems = "center" justify="space-evenly"  direction="column" >
          <Grid item sm>
            <Paper className="Paper-container">
              <Countdown />
              
              
             
            </Paper>
          </Grid>
        </Grid>
   
      </Fragment>
    );
  }
}

export default Content;
