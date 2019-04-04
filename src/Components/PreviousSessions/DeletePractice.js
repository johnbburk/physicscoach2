import React from "react";
import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const DeletePractice = async ({ isOpen, closeDeleteDialog, docRef,reLoad }) => (
  <Dialog open={isOpen}>
    Are you sure you want to delete this pracitice?
    <Button variant = "outlined" size="small" color="primary" onClick={closeDeleteDialog}>
      Cancel
    </Button>
    <Button
    variant = "outlined"
      size="small"
      color="secondary"
      onClick={async () => {
        await docRef.delete();
        this.props.reLoad()
      }}
    >
      Delete
    </Button>
  </Dialog>
);

export default DeletePractice;
