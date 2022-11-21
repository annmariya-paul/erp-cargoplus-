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
  width,
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
        bodyStyle={{ height:620, overflowY:"auto" }}
        size={size}
        onClick={onClick}
        // onHide={onHide}
        onCancel={onHide}
        // show={show}
        visible={show}
        width={width}
        dialogClassName={dialogClassName}
        centered={centered}
        className={"modal_window_style"}
        footer={false}
        destroyOnClose={true}
      >
        {Adding_contents && (
          <>
            <div closeButton>
              <h5 className="modal-title text-center w-100">{header}</h5>
            </div>
            <div className="modal_body">{children}</div>
            <div>{footer}</div>
          </>
        )}
        {success && (
          <div>
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
