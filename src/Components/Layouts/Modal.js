
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../styles/Modal.css";
import Button from '@material-ui/core/Button';


const Modal = ({ handleClose, show, children, buttonText }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <Button variant ="contained" color = "primary" onClick={handleClose}>{buttonText}</Button>
        </section>
      </div>
    );
  };

  export default Modal;
