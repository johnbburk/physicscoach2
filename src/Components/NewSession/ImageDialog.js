import React, { Component, Fragment } from "react";
import { Dialog, Button, GridList, GridListTile } from "@material-ui/core/";
import WebcamDialog from "./WebcamCapture";
import TextField from "@material-ui/core/TextField";
import PracticeImage from "./PracticeImage";

class ImageDialog extends Component {
  submitURL = event => {
    if (event.key === "Enter") {
      console.log(event.target.value);
      this.props.addImage(event.target.value);
      event.target.value = "";
    }
    this.props.closeImageDialog();
  };

  submitWebcamPhoto = base64str => {
    this.props.addImage(base64str);
    this.props.closeImageDialog();
  };

  render() {
    const { open } = this.props;

    return (
      <Dialog onClose={this.props.closeImageDialog} open={open} maxWidth="sm" fullWidth>
        <div style={{ padding: 20, textAlign: "center", margin: "0 auto" }}>
          <TextField
            // id="standard-name"
            label="Add Imanpmge with URL"
            // value={this.state.currentURL}
            onKeyPress={this.submitURL}
            margin="normal"
            style={{ width: 400 }}
          />

          <h1>or</h1>

          <WebcamDialog addImage={this.submitWebcamPhoto} />
        </div>
      </Dialog>
    );
  }
}

export default ImageDialog;
