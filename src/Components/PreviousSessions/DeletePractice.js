import React from "react";
import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const deleteFirebaseDoc = async (docRef) => {
  await docRef.delete()
  window.location.reload()
};

const DeletePractice = ({ isOpen, closeDeleteDialog, docRef,reLoad }) => (
  <Dialog open={isOpen}>
    Are you sure you want to delete this pracitice?
    <Button size="small" color="primary" onClick={closeDeleteDialog}>
      Cancel
    </Button>
    <Button
      size="small"
      color="secondary"
      onClick={() => {
        deleteFirebaseDoc(docRef);
      }}
    >
      Delete
    </Button>
  </Dialog>
);

export default DeletePractice;
