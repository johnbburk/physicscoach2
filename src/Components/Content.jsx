import React, { Component, Fragment } from "react";
import "../styles/App.css";
import { Footer, Header } from "./Layouts";
import { Grid, Paper, Button } from "@material-ui/core";
import WebcamDialog from "./WebcamCapture";
import Countdown from "./Countdown";

class Content extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    imageList: []
  };

  addImage = base64Str => {
    this.setState(prevState => {
      return {
        imageList: prevState.imageList.concat(base64Str)
      };
    });
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing = {"0"} alignItems = "center" justify="space-evenly"  direction="column" >
          <Grid item sm>
            <Paper className="Paper-container">
              <Countdown />
              
              {this.state.imageList.map((image, index) => {
                return (
                  <img
                    src={image}
                    alt="Text to display if image fails to load"
                    key={index}
                  />
                );
              })}
              
              <WebcamDialog addImage={this.addImage} />
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </Fragment>
    );
  }
}

export default Content;
