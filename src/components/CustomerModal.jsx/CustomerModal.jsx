import { Form } from "antd";
import React from "react";
import Button from "../button/button";
import CustomModel from "../custom_modal/custom_model";
import InputType from "../Input Type textbox/InputType";
import Phone_Input from "../PhoneInput/phoneInput";

function CustomerModal({ onHide, show }) {
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
                <Form>
                  <div className="row ">
                    <div className="col-12">
                      <h4 className="lead_text">New Customer</h4>
                    </div>
                    <div className="col-6 mt-2">
                      <lable>
                        Customer Name<span className="required">*</span>
                      </lable>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-6 mt-2">
                      <lable>
                        Contact Person<span className="required">*</span>
                      </lable>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-6 mt-2">
                      <lable>
                        Email<span className="required">*</span>
                      </lable>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-6 mt-2">
                      <lable>
                        Phone<span className="required">*</span>
                      </lable>
                      <Form.Item>
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
