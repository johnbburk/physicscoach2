import React from "react";
import ReactDOM from "react-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { logout } from "../helpers/auth";

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    // The component's Local state.
    this.state = {
      isSignedIn: false, // Local signed-in state.
      loading: false, //TODO: change this later
      authUser: null
    };
  }
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

  render() {
    if (this.state.loading) {
      return (
        <React.Fragment>
          <h1>Loading</h1>
        </React.Fragment>
      );
    }
    if (!this.state.isSignedIn) {
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
}
export default SignInScreen;
