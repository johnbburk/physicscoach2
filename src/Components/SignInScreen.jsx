import React from "react";
import ReactDOM from "react-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { logout } from "../helpers/auth";
import { connect } from "react-redux";
import { signIn } from "../actions";

class SignInScreen extends React.Component {
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.props.history.push("/app");
    }
  }
  render() {
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { signIn }
)(SignInScreen);
