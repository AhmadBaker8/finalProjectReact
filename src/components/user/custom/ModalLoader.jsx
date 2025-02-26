import React from "react";
import { Modal } from "react-bootstrap";

const ModalLoader = ({ show }) => {
  return (
    <Modal className="modal-transparent" show={show} fullscreen centered backdrop="static">
      <div className="myLoader-container">
        <div className="myLoader"></div>
      </div>
    </Modal>
  );
};

export default ModalLoader;
