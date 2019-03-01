import React, { Component, } from "react";
import "../styles/App.css";
import { Header } from "./Layouts/Header";
import { Router, Route } from "react-router-dom";
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
            <Route path="/new" component={requireAuth(Content)} />
            <Route path="/previous" component={requireAuth(PracticeList)}/>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
