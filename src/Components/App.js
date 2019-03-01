import React, { Component, } from "react";
import "../styles/App.css";
import { Header } from "./Layouts/Header";
import { Router, Route, Switch } from "react-router-dom";
import Content from "./NewSession/Content";
import requireAuth from "./auth/requireAuth";
import { store } from "../store";
import history from "../history";
import { Provider } from "react-redux";
import { fetchUser } from "../helpers/auth";
import PracticeList from "./PreviousSessions/PracticeList"

class App extends Component {
  componentDidMount() {
    fetchUser();
  }

  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <div className="container">
            <Header user={store.getState().user} />
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/new" component={requireAuth(Content)} />
              <Route path="/previous" component={requireAuth(PracticeList)} />
              <Route component={NoMatchingPath} />
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
