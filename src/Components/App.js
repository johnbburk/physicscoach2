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
import requireTeacher from "./auth/requireTeacher";
import { firebaseAuth } from "../config/constants";

class App extends Component {
  componentDidMount() {
    firebaseAuth.onAuthStateChanged(updateStateBasedOnUser); // adds an event listener
  }

  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/new" component={requireAuth(Content)} />
              <Route path="/previous" component={requireAuth(PracticeList)} />
              <Route path="/teacher" component={requireTeacher(Welcome)} />>
              <Route component={requireAuth(NoMatchingPath)} />
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
