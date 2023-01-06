import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
// import { Form } from "react-bootstrap";
import { Form, Input } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import Select from "rc-select";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import {ROUTES} from "../../../../routes";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";


export default function Add_Quotation() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [saveSuccess, setSaveSuccess] =useState(false)
 
  
  
  const [addForm]=Form.useForm()
  const navigate = useNavigate();


 

 


  return (
    <>
      <div className="row my-3">
        <h5 className="lead_text">Quotation</h5>
      </div>
      <div className="container-fluid add_attributes p-4 ">
        <div className="row flex-wrap pt-2">
          <div className="col">
            <h6 className="lead_text">Basic Info</h6>
          </div>
        </div>

        <Form
          form={addForm}
          onFinish={(values) => {
            console.log("values iss", values);
         
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row py-1">
            <div className="col-sm-3 pt-3">
              <label>Fright Type</label>
              <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                       
                        >
                          <Select.Option value="S">Ship</Select.Option>
                          <Select.Option value="A">Air</Select.Option>
                        </SelectBox>
                      </Form.Item>
            </div>
            <div className="col-sm-3 pt-3">
              <label>Chargable Weight</label>
              <Form.Item
                        name="weight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                         
                          
                        ]}
                      >
                        <InputType
                        
                        />
                      </Form.Item>
            </div>

            <div className="col-sm-3 pt-3">
              <label>Carrier</label>
              <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                       
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
            </div>

            <div className="col-sm-3 pt-3">
              <label>Mode</label>
              <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a mode",
                          },
                        ]}
                      >
                        <SelectBox
                       
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
            </div>
            <div className="col-sm-3 pt-3">
              <label>Project Name</label>
              <Form.Item
                        name="Pname"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                         
                          
                        ]}
                      >
                        <InputType
                        
                        />
                      </Form.Item>
            </div>
            <div className="col-sm-3 pt-3">
              <label>Country Origin</label>
              <Form.Item
                        name="corgin"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                       
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
            </div>
            <div className="col-sm-3 pt-3">
              <label>Country Destination</label>
              <Form.Item
                        name="cdest"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                       
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
            </div>

            <div className="col-sm-3 pt-3">
              <label>Shipper</label>
              <Form.Item
                        name="shipper"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                         
                          
                        ]}
                      >
                        <InputType
                        
                        />
                      </Form.Item>
            </div>

            <div className="col-sm-3 pt-3">
              <label>Consignee</label>
              <Form.Item
                        name="consignee"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                       
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
            </div>
            <div className="col-sm-3 pt-3">
              <label>Number of pieces</label>
              <Form.Item
                        name="npieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                         
                          
                        ]}
                      >
                        <InputType
                        
                        />
                      </Form.Item>
            </div>

            <div className="col-sm-3 pt-3">
              <label>Gross Weight</label>
              <Form.Item
                        name="gweight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                         
                          
                        ]}
                      >
                        <InputType
                        
                        />
                      </Form.Item>
            </div>
       
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-1">
              <Button btnType="save">Save</Button>
            </div>
            <div className="col-1">
              {/* <Button btnType="cancel" onClick={() => handleCancel()}>
                Cancel
              </Button> */}
            </div>
          </div>
        </Form>

        <Custom_model
          size={"sm"}
          show={saveSuccess}
          onHide={() => setSaveSuccess(false)}
          success
        />
      </div>
    </>
  );
}
