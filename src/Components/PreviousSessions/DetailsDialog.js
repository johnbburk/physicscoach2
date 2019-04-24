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
import Lightbox from "react-images-zoom";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  multilineColor: {
    color: "black"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
};

class DetailsDialog extends Component {
  state = {
    lightBoxOpen: false,
    currentImage: 0
  };

  openLightBox = currentImage => {
    this.setState({ lightBoxOpen: true, currentImage: currentImage });
  };

  onClickPrev = () => {
    let index = this.state.currentImage;
    if (this.state.currentImage !== 0) {
      this.setState({ currentImage: index - 1 });
    }
  };

  onClickNext = () => {
    let index = this.state.currentImage;
    if (this.state.currentImage !== this.props.practiceDoc.get("imageList").length - 1) {
      this.setState({ currentImage: index + 1 });
    }
  };

  onToggleQuestionOpen = async () => {
    await this.props.practiceDoc.ref.update({
      isQuestionOpen: !this.props.practiceDoc.get("isQuestionOpen")
    });
    
    window.location.reload();
  }

  render() {
    const { open, onClose, practiceDoc, classes } = this.props;
    const data = practiceDoc.data();
    const images = data.imageList.map(function(image) {
      return { src: image };
    });

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

        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
          <DialogTitle align="center" id="timer-start-dialog">
            {data.goal}
          </DialogTitle>

          <DialogContent>
            <TextField
              id="Practice-Note-TextField"
              label="Practice Note"
              value={data.practiceNote}
              fullWidth={true}
              readOnly={true}
              margin="normal"
              variant="outlined"
              multiline={true}
              disabled={true}
              InputProps={{
                classes: {
                  input: classes.multilineColor,
                  notchedOutline: classes.notchedOutline
                },
                color: "black"
              }}
            />
            <TextField
              id="Question-Comment-TextField"
              label="Question Comment"
              value={data.questionComment}
              fullWidth={true}
              readOnly={true}
              margin="normal"
              variant="outlined"
              multiline={true}
              disabled={true}
              InputProps={{
                classes: {
                  input: classes.multilineColor,
                  notchedOutline: classes.notchedOutline
                },
                color: "black"
              }}
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
                      onClick={() => this.openLightBox(index)}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              onClick={this.onToggleQuestionOpen}
              color={data.isQuestionOpen ? "primary" : "secondary"}
            >
              Mark Question as{" "}
              {data.isQuestionOpen ? "Answered" : "Unanswered"}
            </Button>
            <Button variant="outlined" onClick={onClose} color="default">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(DetailsDialog);
