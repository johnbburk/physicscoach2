import React, { Component } from "react";
import { Dialog } from "@material-ui/core/";
import WebcamDialog from "./WebcamCapture";
import TextField from "@material-ui/core/TextField";
import ImageUploader from 'react-images-upload';

class ImageDialog extends Component {
  submitURL = event => {
    if (event.key === "Enter") {
      console.log("image added with URL:", event.target.value);
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
            label="Add Image with URL"
            // value={this.state.currentURL}
            onKeyPress={this.submitURL}
            margin="normal"
            style={{ width: 400 }}
          />

          <h1>or</h1>
          
          <ImageUploader
                withIcon={true}
                buttonText='Upload local images'
                onChange={this.props.addImage}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
          />

          <h1>or</h1>

          <WebcamDialog addImage={this.submitWebcamPhoto} />
        </div>
      </Dialog>
    );
  }
}

export default ImageDialog;
