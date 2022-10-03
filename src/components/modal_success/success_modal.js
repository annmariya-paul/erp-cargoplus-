import React, { useState,useEffect } from "react";
import "../../pages/lead/modals/modal.scss";
import { Form, Button, Modal } from "react-bootstrap";

export default function SuccessMesssage(props) {

  return (
    <Modal {...props} size="sm" aria-labelledby="exampleModalLabel" centered>
      <Modal.Body>
        <div className="row">
          <i
            class="success_msg bi bi-patch-check-fill"
            style={{ fontSize: "100px" }}
          />
          <h4 className="success_msg">Save Success !</h4>
          <p style={{ textAlign: "center" }}>Your Data was Saved</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}
