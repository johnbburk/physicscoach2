import React, { Component, } from "react";
import "../styles/App.css";
import { Header } from "./Layouts/Header";
import { Router, Route, Switch } from "react-router-dom";
import Content from "./NewSession/Content";
import requireAuth from "./auth/requireAuth";
import { store } from "../store";
import history from "../history";
import { Provider } from "react-redux";
import { updateStateBasedOnUser } from "../helpers/auth";
import PracticeList from "./PreviousSessions/PracticeList"
import { firebaseAuth } from "../config/constants";
import StudentList from "./CourseList/studentList";

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
              <Route path="/new" component={requireAuth(['student','teacher'], Content)} />
              <Route path="/previous" component={requireAuth(['student','teacher'], PracticeList)} />
              <Route path="/teacher" component={requireAuth(['teacher'] , StudentList)} />>
              <Route component={requireAuth(["teacher","student"],NoMatchingPath)} />
            </Switch>
          </div>
        </Provider>
      </Router>
    );
  }
}

const NoMatchingPath = () => (
  <div>
    <h1>404 Not Found</h1>
  </div>
)

const Welcome = () => (
  <div>
    <h1>Welcome to Physics Coach</h1>
  </div>
)

export default App;
