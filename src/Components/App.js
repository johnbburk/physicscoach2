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
import {connect} from "react-redux";
import {fetchUser} from "../actions";
import SignIn from "./SignIn";


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

  componentWillMount(){
    this.props.fetchUser();
  }
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

          
      <div className="container">
      <Header isAuth={this.state.isAuth} />

          <Route exact path ="/" component = {SignInScreen}/>
          <Route path = "/app" component = {requireAuth(Content)} />

 {/* {this.state.isAuth ? 

           : <SignInScreen/>} */}
 
 </div>

      </BrowserRouter>
    );
  }
}

export default connect(null,{fetchUser}) (App) ;
