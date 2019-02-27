import React, { Component, } from "react";
import "../styles/App.css";
import { Header, PracticeList } from "./Layouts";
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
            <Route path="/new" component={requireAuth(Content)} />
            <Route path="/previous" component={requireAuth(PracticeList)}/>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
