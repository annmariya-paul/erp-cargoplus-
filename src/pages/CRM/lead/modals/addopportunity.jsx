import React, { useState, useEffect } from "react";
// import { CRM_BASE_URL } from "../../../../api/bootapi";

import moment from 'moment';
import { Form } from "react-bootstrap";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
import { FormGroup } from "react-bootstrap";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
// import "react-phone-number-input/style.css";
import Custom_model from "../../../../components/custom_modal/custom_model";
// import PublicFetch from "../../../../utils/PublicFetch";
// import { isPossiblePhoneNumber } from "react-phone-number-input";
// import PhoneInput, {
//   formatPhoneNumber,
//   formatPhoneNumberIntl,
//   isValidPhoneNumber,
// } from "react-phone-number-input";
// import PhoneNumber from "../../../../components/phone_number/phonenumber";
import { message } from "antd";

export default function AddOpportunity(props) {


  
//   const [modalShow, setModalShow] = React.useState(false);
const today = new Date().toISOString().split("T")[0];
  const [modalOpportunity, setModalOpportunity] = useState();
  const [modalShow, setModalShow] = useState();
  // const [selectedDate, setSelectedDate]= useState(null);
  const [date, setDate] = useState();
  // const [title, setTitle] = useState();
  // const [leadType, setLeadType] = useState();
  // const [leadName, setLeadName] = useState();
  // const [leadUsertype, setLeadUsertype] = useState();
  // const [leadOrganization, setLeadOrganization] = useState();
  // const [leadSource, setLeadSource] = useState();
  // const [leadDescription, setLeadDescription] = useState();
  // const [leadAttachment, setLeadAttachment] = useState();
  // const [leadStatus, setLeadStatus] = useState();

  //   const getAllAddress = async () => {
  //     try {
  //       const allAddress = await PublicFetch.get(
  //         `${CRM_BASE_URL}/lead/1/address`
  //       );
  //       console.log("All leads res : ", allAddress);
  //     } catch (err) {
  //       console.log("error while getting all leads: ", err);
  //     }
  // //   };

  //   useEffect(() => {
  //     getAllAddress();
  //   }, []);

  //   const submit = (data) => {
  //     PublicFetch.post(`${CRM_BASE_URL}/lead/1/address`, {
  //       address_title: title,
  //       address_content: address_data,
  //       address_pin: pincode,
  //       address_contact: value,
  //     })
  //       .then(function (response) {
  //         console.log("hello", response);
  //         if (response.data.success) {
  //           getAllAddress();
  //           setAddress_data();
  //           setValue();
  //           setPincode();
  //           setTitle();
  //           setModalShow(true);
  //         } else {
  //           message.error("fetch data error");
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };
  //   useEffect(() => {
  //     submit();
  //   }, []);

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
        // close_modal(modalShow, 1200);
        // props.onHide();
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
        show={modalOpportunity}
        onHide={() => setModalOpportunity(false)}
        header="Add Opportunity"
        size={`xl`}
        // dialogClassName='model-90w'

        footer={[
          <Button onClick={submit} btnType="save">
            Save
          </Button>,
        ]}
        {...props}
      >
        <Form onSubmit={handleSubmit(submit)}>
          <div className="px-5">
           <div className="row px-1">
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="lead_type">
                        <Form.Label>Type</Form.Label>
                        <Form.Select
                          aria-label="lead_type"
                          name="lead_type"
                          className={`${errors.lead_type && "invalid"}`}
                          {...register("lead_type", {
                            required: "Type is required",
                          })}
                          onKeyUp={() => {
                            trigger("lead_type");
                          }}
                        >
                          <option value="Sales" selected>
                         Sales
                          </option>
                          <option value="Support">Support</option>
                          <option value="maintenance">Maintenance</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    
                    <div className="col-sm-4 pt-2">
                      <Form.Group
                        className="mb-2"
                        controlId="lead_customer_from"
                      >
                        <Form.Label>From</Form.Label>
                        <Form.Select
                          aria-label="lead_customer_from"
                          name="lead_customer_from"
                          className={`${errors.lead_customer_from && "invalid"}`}
                          {...register("lead_customer_from", {
                            required: "Type is required",
                          })}
                          onKeyUp={() => {
                            trigger("lead_customer_from");
                          }}
                        >
                           {errors.lead_customer_from && (
                  <small className="text-danger">
                    {errors.lead_customer_from.message}
                  </small>
                )}
                          {/* <option value="Sales" selected>
                         Sales
                          </option> */}
                          <option value="Customer" selected>Customer</option>
                          <option value="Lead">Lead</option>
                        </Form.Select>
                       
                        {errors.lead_customer_from && (
                          <small className="text-danger">
                            {errors.lead_customer_from.message}
                          </small>
                        )}
                      </Form.Group>
                    </div>



                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="lead_customer_generated">
                        <Form.Label>Generated/Converted by</Form.Label>
                        <Form.Control
                          type="text"
                          name="lead_customer_generated"
                          placeholder="User ID"
                          className={`${
                            errors.lead_customer_generated && "invalid"
                          }`}
                          {...register("lead_customer_generated", {
                            required: "Please enter a valid User ID",
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
                            trigger("lead_customer_generated");
                          }}

                        />
                           {errors.lead_customer_generated && (
                  <small className="text-danger">
                    {errors.lead_customer_generated.message}
                  </small>
                )}
                      </Form.Group>
                    </div>

                 
          
             
              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_source">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    aria-label="lead_source"
                    name="lead_source"
                    className={`${errors.lead_source && "invalid"}`}
                    {...register("lead_source", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_source");
                    }}
                  >
                    <option value="Reference" selected>
                      Reference
                    </option>
                    <option value="Direct Visit">Direct Visit</option>
                    <option value="Online Registraion">
                      Online Registration
                    </option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_party">
                  <Form.Label>Party</Form.Label>
                  <Form.Select
                    aria-label="lead_party"
                    name="lead_party"
                    className={`${errors.lead_party && "invalid"}`}
                    {...register("lead_party", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_party");
                    }}
                  >
                    <option value="Database" selected>
                      data
                    </option>
                    <option value="Direct Visit"></option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_valid_up_to">
                  <Form.Label>Valid Up to</Form.Label>
                  <div className="form-control">
                    <input
                      type="date"
                      style={{ borderWidth: 0 }}
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                </Form.Group>
              </div>

              <div className="col-sm-8 pt-3">
                <Form.Group className="mb-2" controlId="lead_details">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className={`${errors.lead_details && "invalid"}`}
                    {...register("lead_details", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_details");
                    }}
                  />
                  {errors.lead_details && (
                    <small className="text-danger">
                      {errors.lead_details.message}
                    </small>
                  )}
                </Form.Group>
              </div>


              <div className="col-sm-4 pt-3">
                <Form.Group className="mb-2" controlId="lead_expecting_amt">
                  <Form.Label>Expecting Amount</Form.Label>
                  <Form.Control
                    type="text"
                    className={`${errors.lead_expecting_amt && "invalid"}`}
                    {...register("lead_expecting_amt", {
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
                      trigger("lead_expecting_amt");
                    }}
                  />{" "}
                  {errors.lead_expecting_amt && (
                    <small className="text-danger">
                      {errors.lead_expecting_amt.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_probability">
                  <Form.Label>Probability of conversion</Form.Label>
                  <Form.Select
                    aria-label="lead_probability"
                    name="lead_probability"
                    className={`${errors.lead_probability && "invalid"}`}
                    {...register("lead_probability", {
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 5",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("lead_probability");
                    }}
                  >
                    <option value="low" selected>
                      low
                    </option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </Form.Select>
                </Form.Group>
              </div>

                  
                   
                 
                 


                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="lead_status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          aria-label="lead_status"
                          name="lead_status"
                          className={`${errors.lead_status && "invalid"}`}
                          {...register("lead_status", {
                            minLength: {
                              value: 5,
                              message: "Minimum Required length is 5",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("lead_status");
                          }}
                        >
                          <option value="quotation" selected>quotation</option>
                          <option value="interested">interested</option>
                          <option value="converted" >
                          converted
                          </option>
                          <option value="lost" >
                          lost
                          </option>
                          <option value="DND" >
                          DND
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </div>


                   

                     
                      
                       
        
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
