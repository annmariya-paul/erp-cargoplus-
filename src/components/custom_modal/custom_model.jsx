import "./custom_model.scss"
import React from "react";
import { Modal } from "react-bootstrap";

function Custom_model({
  onClick,
  header,
  Adding_contents,
  children,
  footer,
  success,
  show,
  onHide,
  size,
  centered,
}) {
  return (
    <div>
      <Modal size={size} onClick={onClick} onHide={onHide} show={show} centered>
        {Adding_contents && (
          <>
           
            <Modal.Header closeButton>
              <h4 className="modal-title text-center w-100">{header}</h4>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>{footer}</Modal.Footer>
          </>
        )}
        {success && (
          <Modal.Body size="sm">
            <div className="row">
              <i
                className="success_msg bi bi-patch-check-fill"
                style={{ fontSize: "100px" }}
              />
              <h4 className="success_msg">Save Success !</h4>
              <p style={{ textAlign: "center" }}>Your Data was Saved</p>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </div>
  );
}

export default Custom_model;
