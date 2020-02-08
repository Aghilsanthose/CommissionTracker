import React from "react";

import Spinner from "../../../UI/Spinner/Spinner";
import Modal from "../../../UI/Modal/Modal";
import BackDrop from "../../../UI/BackDrop/Backdrop";

import classes from "./IndividualYarnDeleteModal.module.css";

const individualYarnDeleteModal = props => {
  let modalData = (
    <div className={classes.deletemodal}>
      <p className={classes.title}>Please Confirm!</p>
      <p>
        Do you want to delete Order Id : <span>{props.deleteKey}</span>
      </p>
      <div className={classes.buttoncontainer}>
        <button onClick={props.continue} className={classes.green}>
          Yes
        </button>
        <button onClick={props.cancel} className={classes.red}>
          No
        </button>
      </div>
    </div>
  );

  if (props.loading) {
    modalData = <Spinner />;
  }

  if (props.error) {
    modalData = props.error;
  }

  return (
    <React.Fragment>
      <Modal open>{modalData}</Modal>
      <BackDrop clicked={props.cancel} />
    </React.Fragment>
  );
};

export default individualYarnDeleteModal;
