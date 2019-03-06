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

const DetailsDialog = ({ open, onClose, data }) => {
  // console.log(data)
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
