import { Form } from "antd";
import React , { useState, useEffect } from "react";
import Button from "../button/button";
import CustomModel from "../custom_modal/custom_model";
import InputType from "../Input Type textbox/InputType";
import Phone_Input from "../PhoneInput/phoneInput";
import PublicFetch from "../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../api/bootapi";
import CheckUnique from "../../check Unique/CheckUnique";
import { UniqueErrorMsg } from "../../ErrorMessages/UniqueErrorMessage";

function CustomerModal({ onHide, show, setCustomerName ,setCustomernew,onCustomerAdded}) {
  const [addForm] = Form.useForm();
  const [successPopup, setSuccessPopup] = useState(false);
  const [custype, setCustype] = useState("individual");
  const [contactpname,setContactpname]=useState();
  console.log("contact",contactpname);
  const [uniqueName, setUniqueName] = useState(false);
  // setCustomerName("new Name")
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };
  const validatePhoneNumber = (_, value) => {
    // Use a regular expression to validate that the input only contains numeric digits
    const numericRegex = /^[0-9]+$/;
    if (!value || numericRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Please enter only numeric digits for the phone number.');
  };
  const validateEmail = (_, value) => {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Please enter a valid email address.');
  };
  const cusdata = (data) => {

 
    const formData = new FormData();
   
    formData.append("customer_name", data.customer);
    formData.append("customer_phone", data.phone);
    formData.append("customer_email", data.email);
    formData.append("customer_type",custype);
    formData.append("contact_person_name", data.contactperson);
    // selectedValues.forEach((value) => {
    //   formData.append("opportunity_enquiries", value);
    // });

  
    PublicFetch.post(`${CRM_BASE_URL}/customer`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          PublicFetch.post(`${CRM_BASE_URL}/contact`,{
            contact_customer_id:res.data.data.customer_id,
            contact_person_name : data.contactperson,
            contact_email:data.email,
            contact_phone_1:data.phone,
            contact_designation:"test",
            contact_phone_2:"",
          })

          console.log("hello", res.data.data);
          setSuccessPopup(true);
          setCustomerName(res.data.data.customer_id);
          setCustomernew(res.data.data.customer_name);
          
          addForm.resetFields();
         onHide();
         
        } else {
          console.log("helo", res.data.data);
          // setBrandError(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
        // setError(true);
      });
  };


  useEffect(() => {
    if(contactpname){
      addForm.setFieldsValue({contactperson : contactpname })
    }
  },[contactpname]);
  return (
    <div className="container">
      <div className="row">
        <CustomModel
          show={show}
          onHide={onHide}
          View_list
          list_content={
            <>
              <div className="container ">
                <Form
                name="addForm"
                form={addForm}
                onFinish={(values) => {
                  console.log("add customer", values);
                  cusdata(values);
                
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
                
                >
                  <div className="row ">
                    <div className="col-12">
                      <h4 className="lead_text">New Customer</h4>
                    </div>
                    <div className="col-12 mt-2">
                      <lable>
                        Customer Name<span className="required">*</span>
                      </lable>
                      <Form.Item name="customer"
                        rules={[
                          {
                            required: true,
                            message: "Customer name is required",
                          },
                          {
                            min: 2, // Minimum length of 3 characters
                            max: 100, // Maximum length of 10 characters
                            message: 'Name must be between 2 to 100 characters.',
                          },
                        ]}
                      
                      >
                        <InputType 
                        onChange={(e)=>{
                          setContactpname(e.target.value);
                          console.log("contact details ",contactpname);
                          setUniqueName(false);
                        }}
                        onBlur={async () => {
                          let n = await CheckUnique({
                            type: "customername",
                            value: contactpname,
                          });
                          setUniqueName(n);
                        }}
                        />
                      </Form.Item>
                      {uniqueName ? (
                        <p style={{ color: "red" }}>
                          Customer name {uniqueErrMsg.UniqueErrName}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-12 mt-2">
                      <lable>
                        Contact Person<span className="required">*</span>
                      </lable>
                      <Form.Item name="contactperson"
                      rules={[
                        {
                          required: true,
                          message: "Contact person name is required",
                        },
                        
                          {
                            min: 2, // Minimum length of 3 characters
                            max: 100, // Maximum length of 10 characters
                            message: 'Contact person name must be between 2 to 100 characters.',
                          },
                      
                      ]}
                      >
                        <InputType 
                        value={contactpname}
                        onChange={(e)=>{
                          setContactpname(e.target.value);
                          console.log("contact person details ",contactpname);
                        }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-2">
                      <lable>
                        Email<span className="required">*</span>
                      </lable>
                      <Form.Item name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your email address.',
                        },
                        {
                          validator: validateEmail,
                        },
                      ]}
                      
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-2">
                      <lable>
                        Phone<span className="required">*</span>
                      </lable>
                      <Form.Item name="phone"
                       rules={[
                        {
                          required: true,
                          message: 'Please enter your phone number.',
                        },
                        {
                          validator: validatePhoneNumber,
                        },
                      ]}
                      
                      
                      >
                        <Phone_Input />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-3 d-flex justify-content-center">
                      <Button btnType="save">Save</Button>
                    </div>
                  </div>
                </Form>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
}

export default CustomerModal;
