import React from "react";
import Webcam from "react-webcam";
import {Button} from "@material-ui/core";

export class WebcamCapture extends React.Component {
    setRef = webcam => {
      this.webcam = webcam;
    };
   
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      this.props.changeImage(imageSrc); 
    };
   
    render() {
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
   
      return (
        <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <Button onClick={this.capture}>Capture photo</Button>
        </div>
      );
    }
  }