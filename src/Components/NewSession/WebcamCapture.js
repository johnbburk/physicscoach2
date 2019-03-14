//TODO: use getUserMedia to find max size and input that

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Webcam from "react-webcam";


export default class WebcamModal extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.props.addImage(imageSrc);
    this.handleClose();
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} >
          Take Picture with Webcam
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Take Picture with Webcam</DialogTitle>

          <DialogContent>
            <Webcam
              audio={false}
              height={200}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              minScreenshotWidth= {1280}
              minScreenshotHeight = {720}	
              width={350}
              videoConstraints={videoConstraints}
              style={{ display: "block", margin: "0 auto" }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="secondary" autoFocus>
              Cancel
            </Button>
            <Button onClick={this.capture} color="primary" autoFocus>
              Take Photo
            </Button>
          </DialogActions>

        </Dialog>
      </div>
    );
  }
}