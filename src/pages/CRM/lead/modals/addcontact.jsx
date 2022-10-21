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
import PhoneNumber from "../../../../components/phone_number/phonenumber";
// import ErrorMsg from "../../components/errormessage";

export default function AddContact(props) {
  const [phone, setPhone] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [mobile, setMobile] = useState();
  const [modalShow, setModalShow] = useState(true);
  const [showSuccessMOdal, setShowSuccessModal] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [ContactName, setContactName] = useState();
  const [email, setEmail] = useState();
  // const [phoneno, setPhoneno] = useState();
  const [AllContact, setAllcontact] = useState();
  const [designation, setDesignation] = useState();

  const getAllContact = () => {
    PublicFetch.post(`${CRM_BASE_URL}/lead/1/contact`)
      .then((res) => {
        if (res.data.success) {
          setAllcontact(res.data.data);
        } else {
          console.log("Failed to fetch data:");
        }
      })
      .catch((err) => {
        console.log("error while getting data", err);
      });
  };

  const AddContact = () => {
    PublicFetch.post(`${CRM_BASE_URL}/lead/${props.lead}/contact`, {
      contact_person_name: ContactName,
      contact_email: email,
      contact_phone_1: phone,
      contact_phone_2: mobile,
      contact_designation: designation,
    })
      .then((res) => {
        console.log("contactdata,", res);
        if (res.data.success) {
          getAllContact();
          setContactName();
          setEmail();
          setPhone();
          setMobile();
          setDesignation();
          setShowSuccessModal(true);
          props.onHide();
          setModalShow(false);
          reset();
          close_modal(showSuccessMOdal, 1000);
        } else {
          console.log("Cannot Get Data while fetching data");
        }
      })
      .catch((err) => {
        console.log("error while adding data", err);
      });
  };

  useEffect(() => {
    getAllContact();
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
        setShowSuccessModal(false);
      }, time);
    }
  };

  // useEffect(() => {
  //   setIsSubmit(false);
  // }, [phone]);

  // const submit = (data) => {
  //   !phone && setIsSubmit(true);
  //   console.log(isSubmit);
  //   console.log(data);
  //   if (phone) {
  //     data.phone = phone;
  //     if (data) {
  //       localStorage.setItem("Form", JSON.stringify(data));

  //
  //       reset();
  //     } else {
  //       {
  //         // <ErrorMsg />;
  //       }
  //     }
  //   }
  // };

  return (
    <>
      <Custom_model
        Adding_contents
        show={modalShow}
        onHide={() => setModalShow(false)}
        header="Add Contacts"
        footer={false}
        {...props}
      >
        <Form onSubmit={handleSubmit(AddContact)}>
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
                  value={ContactName}
                  onChange={(e) => setContactName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </Form.Group>

              <div className="row mb-3">
                <label for="phone" className="form-label">
                  Phone
                </label>
                {/* <PhoneInput
                  country={"in"}
                  value={phone}
                  // required={true}
                  onChange={setPhone}
                  className={`${isSubmit ? "invalid" : ""}`}
                  onKeyUp={(e) => {
                    console.log(e);
                  }}
                /> */}
                <PhoneNumber
                  defaultCountry={"IN"}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )}
              </div>
              <div className="row mb-3">
                <label for="phone" className="form-label">
                  Mobile
                </label>
                {/* <PhoneInput
                  country={"in"}
                  value={mobile}
                  onChange={setMobile}
                  className={`${isSubmit ? "invalid" : ""}`}
                  onKeyUp={(e) => {
                    console.log(e);
                  }}
                /> */}
                <PhoneNumber
                  defaultCountry={"IN"}
                  value={mobile}
                  onChange={(value) => setMobile(value)}
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
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
                {errors.designation && (
                  <small className="text-danger">
                    {errors.designation.message}
                  </small>
                )}
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button btnType="save">Save</Button>
            </div>
          </div>
        </Form>
      </Custom_model>
      <Custom_model
        centered
        size={`sm`}
        success
        show={showSuccessMOdal}
        onHide={() => setShowSuccessModal(false)}
      />
    </>
  );
}
