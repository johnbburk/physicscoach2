import React, { Component, Fragment } from "react";
import "../styles/App.css";
import { Footer, Header } from "./Layouts";
import { Grid, Paper, Button } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { WebcamCapture } from "./WebcamCapture";
import Countdown from "./Countdown";
import SignInScreen from "./SignInScreen";
import Content from "./Content";
import requireAuth from "./auth/requireAuth";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import SignIn from "./SignIn";
import createHistory from "history/createBrowserHistory";

// const style = {
//   Paper: {
//     padding: 20,
//     marginTop: 10,
//     marginBottom: 10
//   }
// };
// paper style moved to App.css

class App extends Component {
  componentWillMount() {
    console.log(this.props.fetchUser());
  }
  // changeImage = this.changeImage.bind(this);
  // binding is unnecessary if we define the function with arrow notation

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header context={this.context} user = {this.props.fetchUser()}/>
          <Route exact path="/" component={Footer} />
          <Route path="/login" component={SignInScreen} />
          <Route path="/app" component={requireAuth(Content)} />

          {/* {this.state.isAuth ? 

          <Content imageList = {this.state.imageList} addImage = {this.addImage}/> : <SignInScreen/>} */}
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
