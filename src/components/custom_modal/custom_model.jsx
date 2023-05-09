import "./custom_model.scss";
import React from "react";
import { HiBadgeCheck } from "react-icons/hi";
// import { Modal } from "react-bootstrap";
import { Modal } from "antd";

function Custom_model({
  onClick,
  bodyStyle,
  header,
  Adding_contents,
  children,
  footer,
  success,
  warning,
  show,
  onHide,
  size,
  closable,
  width,
  centered,
  cancel,
  dialogClassName,
  View_list,
  list_content,
  cancelName,
  ...rest
}) {
  return (
    <div>
      <Modal
        {...rest}
        bodyStyle={bodyStyle}
        size={size}
        onClick={onClick}
        // destroyOnClose={true}
        // onHide={onHide}
        onCancel={onHide}
        closable={closable}
        open={show}
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
              <HiBadgeCheck
                className="success_msg"
                style={{ fontSize: "100px" }}
              />
              <h4 className="success_msg">Save Success !</h4>
              <p style={{ textAlign: "center" }}>Your Data was Saved</p>
            </div>
          </div>
        )}
         {warning && (
          <div>
            <div className="row">
              {/* <HiBadgeCheck
                className="warning_msg"
                style={{ fontSize: "100px" }}
              /> */}
              {/* <h5 className="warning_msg">Error !<br/></h5> */}
              <h5 style={{color:"orange", textAlign: "center" }}>{cancelName}</h5>
              <p style={{ textAlign: "center" }}> Deletion is not allowed.</p>
            </div>
          </div>
        )}
        {cancel && (
          <div>
            <div className="row">
              <HiBadgeCheck
                className=" cancel_msg"
                style={{ fontSize: "100px" }}
              />
              <h4 className="cancel_msg">{cancelName} Cancelled !</h4>
              {/* <p style={{ textAlign: "center" }}>Your Data was Saved</p> */}
            </div>
          </div>
        )}
        {View_list && <div>{list_content}</div>}
      </Modal>
    </div>
  );
}

export default Custom_model;
