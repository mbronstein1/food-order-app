import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classes.backdrop}></div>
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = ({ children, hideCartHandler }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={hideCartHandler} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
