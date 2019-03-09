//Todo: use this to implement lightbox https://stackoverflow.com/questions/42350836/cant-get-component-to-show-up-with-react-images

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  GridList,
  GridListTile,
} from "@material-ui/core";
import PracticeImage from "../NewSession/PracticeImage";
import Lightbox from 'react-images';


const DetailsDialog = ({ open, onClose, data, onClick }) => {
  // console.log(data)
  const images = data.imageList.map( function (image){ return {src: image}});

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center" id="timer-start-dialog">
        Start New Practice
      </DialogTitle>
      <GridList cols={4} style={{ marginTop: 20 }}>
        {data.imageList.map((image, index) => {
          return (
            <GridListTile key={index}>
              <PracticeImage
                image={image}
                index={index}
                alt={"student work"}
                deleteEnabled={false}
                onClick = {onClick}
              />
            </GridListTile>
          );
        })}
      </GridList> 
      <DialogContent>
        <DialogContentText variant="h3" align="center">
          text
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => console.log("user wants to close dialog")}
          color="primary"
        >
          Start Practice
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
