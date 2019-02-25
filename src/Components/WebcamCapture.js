import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}  style = {{display: "block", margin: "0 auto"}} >
          Screenshot Work
        </Button>
        <Dialog 
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Take Screenshot of Work</DialogTitle>
          <DialogContent>
            <WebcamCapture addImage={this.props.addImage}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Take Photo
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

class WebcamCapture extends React.Component {
    setRef = webcam => {
      this.webcam = webcam;
    };
   
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      this.props.addImage(imageSrc);
    };
   
    render() {
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
   
      return (
        <div >
          <Webcam
            audio={false}
            height={200}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
            style = {{display: "block", margin: "0 auto"}}

          />
          <Button onClick={this.capture}  style={{display: "block" ,margin:"0 auto"}}>Capture photo</Button>
        </div>
      );
    }
  }