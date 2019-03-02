import React, { Component, Fragment } from "react";
import { Dialog, Button, GridList, GridListTile } from '@material-ui/core/';
import WebcamDialog from './WebcamCapture';
import TextField from '@material-ui/core/TextField';
import PracticeImage from './PracticeImage';

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

  deleteImage = (index) =>{
    console.log("delete called on index", index)
    this.setState(prevState=>{
      return{
        imageList: prevState.imageList.filter((im, j) => j != index)
      }
    })
  }

  submitURL = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.addImage(event.target.value);
      event.target.value = "";
    }
  }

  handleSubmit = ()=>{
    this.props.handleImageList(this.state.imageList);
    this.props.closeImageDialog();
  }

  render() {
    const { open } = this.props;

    return (
      <Dialog open={open} maxWidth="sm" fullWidth>
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

          <WebcamDialog addImage={this.addImage} />

          <GridList cols={3} style={{marginTop: 20}}>
            {this.state.imageList.map((image, index) => {
              return (
                <GridListTile key={index} >
                  <PracticeImage image={image} index={index} alt={"student work"} deleteImage={this.deleteImage} />
                </GridListTile>
              );
            })}
          </GridList>
        </div>
        <Button 
          variant = "contained" color = "primary" onClick = {this.handleSubmit}
        >Done adding photos</Button>
      </Dialog>
    )
  }
}

export default ImageDialog