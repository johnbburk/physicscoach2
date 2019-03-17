
import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  GridList,
  GridListTile,
  TextField
} from "@material-ui/core";
import PracticeImage from "../NewSession/PracticeImage";
import Lightbox from 'react-images-zoom';


class DetailsDialog extends Component {

  state = {
    lightBoxOpen: false,
    currentImage: 0
  }

  openLightBox = (currentImage) => {
    this.setState({ lightBoxOpen: true, currentImage: currentImage });

  }

  onClickPrev = () => {
    let index = this.state.currentImage
    if (this.state.currentImage !== 0) {
      this.setState({ currentImage: index - 1 })
    }
  }

  onClickNext = () => {
    let index = this.state.currentImage
    if (this.state.currentImage !== this.props.data.imageList.length - 1) {
      this.setState({ currentImage: index + 1 })
    }
  }

  render() {
    const { open, onClose, data } = this.props
    const images = data.imageList.map(function (image) { return { src: image } });

    return (
      <div>
        <Lightbox
          images={images}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightBoxOpen}
          onClickPrev={this.onClickPrev}
          onClickNext={this.onClickNext}
          onClose={() => this.setState({ lightBoxOpen: false })}
          rotatable={true}
          zoomable={true}
        />

        <Dialog open={open} onClose={onClose}>
          <DialogTitle align="center" id="timer-start-dialog">
            {data.goal}
          </DialogTitle>

          <DialogContent>

          <TextField
          id="Goal-Comment-TextField"
          label="Goal Comment"
          value={data.goal_comment}
          fullWidth = {true}
          readOnly = {true}
          margin="normal"
          variant="outlined"
          multiline = {true}
        />
         <TextField
          id="Learn-Comment-TextField"
          label="Learn Comment"
          value={data.learn_comment}
          fullWidth = {true}
          readOnly = {true}
          margin="normal"
          variant="outlined"
          multiline = {true}
        />
        <TextField
          id="Question-Comment-TextField"
          label="Question Comment"
          value={data.question_comment}
          fullWidth = {true}
          readOnly = {true}
          margin="normal"
          variant="outlined"
          multiline = {true}
        />
            <GridList cols={4} style={{ marginTop: 20 }}>
              {data.imageList.map((image, index) => {
                return (
                  <GridListTile key={index}>
                    <PracticeImage
                      image={image}
                      index={index}
                      alt={"student work"}
                      deleteEnabled={false}
                      onClick={this.openLightBox}
                    />
                  </GridListTile>
                );
              })}
            </GridList>

          </DialogContent>

          <DialogActions>
            <Button
              onClick={onClose}
              color="primary"
            >
              Close
        </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
}

export default DetailsDialog;
