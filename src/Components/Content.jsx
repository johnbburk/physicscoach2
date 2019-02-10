import React, { Component, Fragment } from "react";
import "../styles/App.css";
import { Footer, Header } from "./Layouts";
import { Grid, Paper, Button } from "@material-ui/core";
import { WebcamCapture } from "./WebcamCapture";
import Countdown from "./Countdown";

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Grid container direction="row">
          <Grid item sm>
            <Paper className="Paper-container">
              Left Pane
              <br />
              <br />
              <Countdown />
              /*{" "}
              {this.props.imageList.map((image, index) => {
                return (
                  <img
                    src={image}
                    alt="Text to display if image fails to load"
                    key={index}
                  />
                );
              })}{" "}
              */
            </Paper>
          </Grid>

          <Grid item sm>
            <Paper className="Paper-container">
              Right Pane
              <WebcamCapture addImage={this.props.addImage} />
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </Fragment>
    );
  }
}

export default Content;
