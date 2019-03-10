import React from "react";
import ReactDOM from "react-dom";
import { install } from '@material-ui/styles';
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";


const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
store.subscribe(render);
serviceWorker.register();
