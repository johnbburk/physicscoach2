import React, { Component, Fragment } from 'react';
import '../styles/App.css';
import {Footer, Header} from "./Layouts";
import {Grid, Paper} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";

const style = {
  Paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10
  }
}


class App extends Component {
  render() {
    return (
      <BrowserRouter>
     <Fragment>
       <Header isAuth = {true}/>
      <Grid container>
      <Grid item sm>
      <Paper style = {style.Paper}>
      Left Pane
      </Paper>
     
      </Grid>
      <Grid item sm>
      <Paper style = {style.Paper}>
      Right Pane
      </Paper>
      </Grid>  
      </Grid>
       <Footer/>
     </Fragment>
     </BrowserRouter>
    );
  }
}

export default App;
