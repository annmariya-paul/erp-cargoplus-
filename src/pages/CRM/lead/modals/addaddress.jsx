import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import Custom_model from "../../../../components/custom_modal/custom_model";

export default function AddAddress(props) {
  const [modalShow, setModalShow] = React.useState(false);

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
      <Custom_model
        Adding_contents
        show={modalShow}
        onHide={() => setModalShow(false)}
        header="Add Address"
        footer={[
          <Button onClick={submit} btnType="save">
            Save
          </Button>,
        ]}
        {...props}
      >
        <Form onSubmit={handleSubmit(submit)}>
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
            <Form.Group className="mb-1" controlId="pincode">
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
                <small className="text-danger">{errors.pincode.message}</small>
              )}
            </Form.Group>
          </div>
        </Form>
      </Custom_model>
      <Custom_model
        centered
        size={`sm`}
        success
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

