import React, { useState } from "react";
import "./modal.scss";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SuccessMesssage from "../../../components/modal_success/success_modal";

export default function AddAddress(props) {
  const [modalShow, setModalShow] = React.useState(false);

  const initialValues = {
    title: "",
    addAddress: "",
    pincode: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

   const close_modal = (mShow, time) => {
     if (!mShow) {
       setTimeout(() => {
         setModalShow(false);
       }, time);
     }
   };

  const submit = (data) => {
    console.log(data);
    localStorage.setItem("Form", JSON.stringify(data));
    setModalShow(true);
    close_modal(modalShow, 1200);
    props.onHide();
    reset();
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit(submit)}>
          <Modal.Header closeButton>
            <h4 className="modal-title text-center w-100">Add Address</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="px-5">
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className={`${errors.title && "invalid"}`}
                  {...register("title", {
                    required: "Please enter a valid Title",
                    minLength: {
                      value: 3,
                      message: "Minimum Required length is 3",
                    },
                    maxLength: {
                      value: 100,
                    },
                  })}
                  onKeyUp={() => {
                    trigger("title");
                  }}
                />
                {errors.title && (
                  <small className="text-danger">{errors.title.message}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="addAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className={`${errors.addAddress && "invalid"}`}
                  {...register("addAddress", {
                    required: "Please enter a valid Address",
                    minLength: {
                      value: 6,
                      message: "Minimum Required length is 6",
                    },
                    maxLength: {
                      value: 500,
                    },
                  })}
                  onKeyUp={() => {
                    trigger("addAddress");
                  }}
                />
                {errors.addAddress && (
                  <small className="text-danger">
                    {errors.addAddress.message}
                  </small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="pincode">
                <Form.Label>PIN</Form.Label>
                <Form.Control
                  type="text"
                  className={`form-control ${errors.pincode && "invalid"}`}
                  {...register("pincode", {
                    required: "Please enter valid PIN eg:345 678",
                    pattern: {
                      value: /^[A-Z0-9- ]{2,10}$/i,
                      message: "Please enter valid PIN eg:345 678",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("pincode");
                  }}
                />
                {errors.pincode && (
                  <small className="text-danger">
                    {errors.pincode.message}
                  </small>
                )}
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              className="btn_save"
              // onClick={() => setModalShow(true)}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>{" "}
      <SuccessMesssage show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
// onClick={props.onHide}
