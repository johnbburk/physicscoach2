import React, { Component } from "react";
import { Dialog } from "@material-ui/core";
import firebase from "../../config/constants";
import Button from "@material-ui/core/Button";

const deleteFirebaseDoc = docRef => {
  console.log("deleting docRef", docRef.ref);
  docRef.ref
    .delete()
    .then(() => {
      console.log("Document deleted successfully");
    })
    .catch(error => {
      console.error("Error removing document", error);
    });
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
        reLoad();
        closeDeleteDialog();
      }}
    >
      Delete
    </Button>
  </Dialog>
);

export default DeletePractice;
