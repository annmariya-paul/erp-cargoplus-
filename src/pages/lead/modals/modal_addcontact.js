import React, { useState,useEffect } from "react";
import "./modal.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SuccessMesssage from "../../../components/modal_success/success_modal";
// import ErrorMsg from "../../components/errormessage";

export default function AddContact(props) {
  const [phone, setPhone] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [mobile, setMobile] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  // const initialValues = {
  //   addName: "",
  //   email: "",
  //   phone: "",
  //   mobile: "",
  //   designation: "",
  // };
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

useEffect(()=> {
setIsSubmit(false)
},[phone])

  const submit = (data) => {
    !phone && setIsSubmit(true);
    console.log(isSubmit)
    console.log(phone);
    console.log(data);
    if (phone){
       data.phone = phone;
    if (data) {
      localStorage.setItem("Form", JSON.stringify(data));
      setModalShow(true);
      close_modal(modalShow, 1000);
      props.onHide();
      reset();
    } else {
      {
        // <ErrorMsg />;
      }
    }
    }
   
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
            <h4 className="modal-title text-center w-100">Add Contacts</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="px-5">
              <Form.Group className="mb-3" controlId="addName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className={`${errors.addName && "invalid"}`}
                  {...register("addName", {
                    required: "Please enter a valid Name",
                    minLength: {
                      value: 3,
                      message: "Minimum Required length is 3",
                    },
                    maxLength: {
                      value: 100,
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9 ]*$/,
                      message: "Only letters and numbers are allowed!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("addName");
                  }}
                />
                {errors.addName && (
                  <small className="text-danger">
                    {errors.addName.message}
                  </small>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className={`form-control ${errors.email && "invalid"}`}
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </Form.Group>

              <div className="row mb-3">
                <label for="phone" className="form-label">
                  Phone
                </label>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  // required={true}
                  onChange={setPhone}
                  className={`${isSubmit ? "invalid" :""}`}
                  onKeyUp={(e) => {
                    console.log(e);
                  }}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )}
              </div>
              <div className="row mb-3">
                <label for="phone" className="form-label">
                  Mobile
                </label>

                <PhoneInput
                  country={"in"}
                  value={mobile}
                  onChange={setMobile}
                />
              </div>
              <Form.Group className="mb-2" controlId="designation">
                <Form.Label>Designation/Department</Form.Label>
                <Form.Control
                  type="text"
                  className={`${errors.designation && "invalid"}`}
                  {...register("designation", {
                    required: "Please enter a Designation eg:Manager",
                    minLength: {
                      value: 3,
                      message: "Minimum Required length is 3",
                    },
                    maxLength: {
                      value: 100,
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9 ]*$/,
                      message: "Only letters and numbers are allowed!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("designation");
                  }}
                />
                {errors.designation && (
                  <small className="text-danger">
                    {errors.designation.message}
                  </small>
                )}
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              className="btn_save"
              data-bs-target="#modal2"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              // onClick={props.onHide}
              // onClick={() => setModalShow(true)}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <SuccessMesssage
        aria-labelledby="modal2"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
