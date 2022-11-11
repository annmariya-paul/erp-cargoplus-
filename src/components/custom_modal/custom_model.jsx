import "./custom_model.scss";
import React from "react";
// import { Modal } from "react-bootstrap";
import {Modal} from "antd"

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
  dialogClassName,
  View_list,
  list_content,
  ...rest
}) {
  return (
    <div>
      <Modal
      {...rest}
        size={size}
        onClick={onClick}
        // onHide={onHide}
        onCancel={onHide}
        // show={show}
        visible={show}
        dialogClassName={dialogClassName}
        centered
        className={"modal_window_style" }
        footer={footer}
      >
        {Adding_contents && (
          <>
            <div closeButton>
              <h4 className="modal-title text-center w-100">{header}</h4>
            </div>
            <div>{children}</div>
            <div>{footer}</div>
          </>
        )}
        {success && (
          < div>
            <div className="row">
              <i
                className="success_msg bi bi-patch-check-fill"
                style={{ fontSize: "100px" }}
              />
              <h4 className="success_msg">Save Success !</h4>
              <p style={{ textAlign: "center" }}>Your Data was Saved</p>
            </div>
          </div>
        )}
        {View_list && <div>{list_content}</div>}
      </Modal>
    </div>
  );
}

export default Custom_model;
