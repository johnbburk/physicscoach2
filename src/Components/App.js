import React, { Component, Fragment } from "react";
import "../styles/App.css";
import { Footer, Header } from "./Layouts";
import { Grid, Paper, Button } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { WebcamCapture } from "./WebcamCapture";

const style = {
  Paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10
  }
};

class App extends Component {
  state = {
    imageList: []
  };
  changeImage = this.changeImage.bind(this);

  changeImage(base64Str) {
    this.setState((prevState) => {
      console.log(prevState.imageList)
      return {
        imageList: prevState.imageList.concat(base64Str)
      }
    });
  }

  render() {
    console.log(this.state.imageList);
    return (
      <BrowserRouter>
        <Fragment>
          <Header isAuth={true} />
          <Grid container>
            <Grid item sm>
              <Paper style={style.Paper}>Left Pane

              {
                this.state.imageList.map((image, index) => {
                  return <img src={image}/>
                })
              }

              </Paper>

            </Grid>
            <Grid item sm>
              <Paper style={style.Paper}>
                Right Pane
                <WebcamCapture changeImage={this.changeImage} />
              </Paper>
            </Grid>
          </Grid>
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
