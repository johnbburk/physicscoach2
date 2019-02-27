import React, { Component, } from "react";
import "../styles/App.css";
import { Header, Footer } from "./Layouts";
import { Router, Route } from "react-router-dom";
import Content from "./Content";
import requireAuth from "./auth/requireAuth";
import { store } from "../store";
import history from "../history";
import { Provider } from "react-redux";
import { fetchUser } from "../helpers/auth";

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
            {/* <Route exact path="/" component={Footer} /> */}
            <Route path="/app" component={requireAuth(Content)} />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
