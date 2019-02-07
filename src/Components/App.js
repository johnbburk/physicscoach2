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

  // changeImage = this.changeImage.bind(this);
  // binding is unnecessary if we define the function with arrow notation

  addImage = (base64Str) => {
    this.setState((prevState) => {
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

          <Header isAuth={false} />
          
          <Grid container direction="row">

            <Grid item sm>
              <Paper style={style.Paper}>
              
                Left Pane
                <br/><br/>

                {
                  this.state.imageList.map((image, index) => {
                    return <img src={image} alt="Text to display if image fails to load" key={index}/>
                  })
                }

              </Paper>
            </Grid>

            <Grid item sm>
              <Paper style={style.Paper}>
                Right Pane
                <WebcamCapture addImage={this.addImage} />
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
