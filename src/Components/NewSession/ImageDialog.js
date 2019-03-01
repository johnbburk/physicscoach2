import React, { Component, Fragment } from "react";
import { Dialog, Button, GridList, GridListTile } from '@material-ui/core/';
import WebcamDialog from './WebcamCapture';
import TextField from '@material-ui/core/TextField';

class ImageDialog extends Component {

  state = {
    imageList: [],
  };

  addImage = (imgSrc) => {
    this.setState(prevState => {
      return {
        imageList: prevState.imageList.concat(imgSrc)
      };
    });
  };

  submitURL = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.addImage(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    const { open } = this.props;
    console.log(open)

    return (
      <Dialog fullScreen open={open}>
        <div style={{ padding: 20, width: 750, textAlign: "center", margin: "0 auto" }}>
          <TextField
            // id="standard-name"
            label="Add Image with URL"
            // value={this.state.currentURL}
            onKeyPress={this.submitURL}
            margin="normal"
            style={{ width: 400 }}
          />

          <h1>or</h1>

          <WebcamDialog addImage={this.addImage} />

          <GridList cols={3} style={{marginTop: 20}}>
            {this.state.imageList.map((image, index) => {
              return (
                <GridListTile key={index} >
                  <img src={image} alt="student work" />
                </GridListTile>
              );
            })}
          </GridList>
        </div>
      </Dialog>
    )
  }
}

export default ImageDialog