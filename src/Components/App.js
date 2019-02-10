import React, { Component, Fragment } from "react";
import "../styles/App.css";
import { Footer, Header } from "./Layouts";
import { Grid, Paper, Button } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { WebcamCapture } from "./WebcamCapture";
import Countdown from "./Countdown";
import SignInScreen from "./SignInScreen";
import Content from "./Content";

// const style = {
//   Paper: {
//     padding: 20,
//     marginTop: 10,
//     marginBottom: 10
//   }
// };
// paper style moved to App.css

class App extends Component {
  state = {
    imageList: [],
    isAuth: true,
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

          <Header isAuth={this.state.isAuth} />
          
          {this.state.isAuth ? 

          <Content imageList = {this.state.imageList} addImage = {this.addImage}/> : <SignInScreen/>}

        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
