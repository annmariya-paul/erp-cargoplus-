import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form } from "react-bootstrap";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { message } from "antd";
// import ErrorMsg from "../../components/errormessage";

export default function AddContact(props) {
  const [phone, setPhone] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [mobile, setMobile] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [ContactName, setContactName] = useState();
  const [email, setEmail] = useState();
  // const [phoneno, setPhoneno] = useState();
  // const [mobileno, setMobileno] = useState();
  const [designation, setDesignation] = useState();

  const AddContact = () => {
    PublicFetch.post(`${CRM_BASE_URL}/lead/1/contact`, {
      contact_person_name: ContactName,
      contact_email: email,
      contact_phone_1: phone,
      contact_phone_2: mobile,
      contact_designation: designation,
    })
      .then((res) => {
        if (res.data.success) {
          setContactName();
          setEmail();
          setPhone();
          setMobile();
          setDesignation();
        } else {
          console.log("Cannot Get Data while fetching data");
        }
      })
      .catch((err) => {
        message.error("error while adding data", err);
      });
  };

  useEffect(() => {
    AddContact();
  }, []);

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

  // useEffect(() => {
  //   setIsSubmit(false);
  // }, [phone]);

  const submit = (data) => {
    !phone && setIsSubmit(true);
    console.log(isSubmit);
    console.log(data);
    if (phone) {
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
      <Custom_model
        Adding_contents
        show={modalShow}
        onHide={() => setModalShow(false)}
        header="Add Contacts"
        footer={[
          <Button onClick={submit} btnType="save">
            Save
          </Button>,
        ]}
        {...props}
      >
        <Form onSubmit={handleSubmit(submit)}>
          <div className="row">
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
                  className={`${isSubmit ? "invalid" : ""}`}
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
                  className={`${isSubmit ? "invalid" : ""}`}
                  onKeyUp={(e) => {
                    console.log(e);
                  }}
                />
              </div>
              <Form.Group className="mb-1" controlId="designation">
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
