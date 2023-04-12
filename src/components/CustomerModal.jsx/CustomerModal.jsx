import { Form } from "antd";
import React , { useState, useEffect } from "react";
import Button from "../button/button";
import CustomModel from "../custom_modal/custom_model";
import InputType from "../Input Type textbox/InputType";
import Phone_Input from "../PhoneInput/phoneInput";
import PublicFetch from "../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../api/bootapi";

function CustomerModal({ onHide, show }) {
  const [addForm] = Form.useForm();
  const [successPopup, setSuccessPopup] = useState(false);
  const [custype, setCustype] = useState("individual");

  // const close_modal = (mShow, time) => {
  //   if (!mShow) {
  //     setTimeout(() => {
  //       setModalShow(false);
  //     }, time);
  //   }
  // };
  const cusdata = (data) => {

 
    const formData = new FormData();
   
    formData.append("customer_name", data.customer);
    formData.append("customer_phone", data.phone);
    formData.append("customer_email", data.email);
    formData.append("customer_type",custype);
    formData.append("crm_v1_contacts[0]", data.contactperson);
    // selectedValues.forEach((value) => {
    //   formData.append("opportunity_enquiries", value);
    // });

  
    PublicFetch.post(`${CRM_BASE_URL}/customer`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          console.log("hello", res.data.data);
          setSuccessPopup(true);
          addForm.resetFields();
          // close_modal(successPopup, 1000);
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
                      <Form.Item name="customer">
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-2">
                      <lable>
                        Contact Person<span className="required">*</span>
                      </lable>
                      <Form.Item name="contactperson">
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-2">
                      <lable>
                        Email<span className="required">*</span>
                      </lable>
                      <Form.Item name="email">
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12 mt-2">
                      <lable>
                        Phone<span className="required">*</span>
                      </lable>
                      <Form.Item name="phone">
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
