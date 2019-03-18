import React, { Component } from "react";
import "../styles/App.css";
import { Header } from "./Layouts/Header";
import { Router, Route, Switch } from "react-router-dom";

import { store } from "../store";
import history from "../history";
import { Provider } from "react-redux";
import { updateStateBasedOnUser } from "../helpers/auth";
import { firebaseAuth } from "../config/constants";
import CourseHomepage from "./CourseList/CourseHomepage";
import Welcome from "./Welcome";

class App extends Component {
  componentDidMount() {
    firebaseAuth.onAuthStateChanged(updateStateBasedOnUser); // adds an event listener
  }

  render() {
    if (store.getState().isWaitingForFirebase) {
      return null;
    }

    return (
      <Router history={history}>
        <Provider store={store}>
          <div className="container">
            <Header />

            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/course/:courseID" component={CourseHomepage}/>
              <Route component={NoMatchingPath} />
            </Switch>
            
          </div>
        </Provider>
      </Router>
    );
  }
}

const NoMatchingPath = () => (
  <div className="Main-content">
    <h1>404 Not Found</h1>
  </div>
)

export default App;
