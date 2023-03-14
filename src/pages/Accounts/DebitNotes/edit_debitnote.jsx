import { Select } from "antd";
import { Checkbox, Col, Row } from "antd";
import React, { useState, useEffect } from "react";

import Button from "../../../components/button/button";
import { DatePicker } from "antd";
import CustomModel from "../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../components/error/ErrorMessage";

import FileUpload from "../../../components/fileupload/fileUploader";

import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { TreeSelect } from "antd";
import TextArea from "../../../components/ InputType TextArea/TextArea";

import InputType from "../../../components/Input Type textbox/InputType";

import SelectBox from "../../../components/Select Box/SelectBox";

import { ROUTES } from "../../../routes";

function Editdebit_notes() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [addForm] = Form.useForm();
  const navigate = useNavigate();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.PRODUCT);
      }, time);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div>
      <div className="container-fluid lead_list my-1 px-4">
        <div>
          <div className="row">
            <div className="col mt-4">
              <h5 className="lead_text">Edit Debit Notes</h5>
            </div>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values111333", value);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-2">
                <div className="col-xl-3 col-sm-12">
                  <label>Voucher No</label>
                  <Form.Item>
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-xl-3 col-sm-12">
                  <label>Date</label>
                  <Form.Item>
                    <DatePicker

                    // style={{ borderWidth: 0, marginTop: 10 }}
                    // defaultValue={moment(date)}
                    // format={dateFormatList}
                    />
                  </Form.Item>
                </div>
             
                <div className="col-xl-3 col-sm-12">
                  <label>Purchase No</label>
                  <Form.Item name="purchaseno">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-xl-3 col-sm-12 mt-2">
                  <label>Purchase Amount</label>
                  <Form.Item>
                    <InputType />
                  </Form.Item>
                </div>
                </div>
                <div className="row">
                    <div className="col-4">
                    <div className="col-xl-12 col-sm-12 ">
                  <label>Amount</label>
                  <Form.Item
                  // name="unit"
                  >
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-xl-12 col-sm-12 ">
                  <label>Type</label>
                  <Form.Item className="mt-2" name="new">
                    <SelectBox />
                  </Form.Item>

                 
                </div>

                    </div>
                    <div className="col-8">
                    <div className="col-xl-12 col-sm-12 mt-2">
                  <label>Particulars</label>
                  <Form.Item
                    className="mt-2"
                    name="description"
                    rules={[
                      {
                        min: 2,
                        message: "Description must be at least 2 characters",
                      },
                      {
                        max: 500,
                        message:
                          "Description cannot be longer than 500 characters",
                      },
                    ]}
                  >
                    <TextArea />
                  </Form.Item>
                </div>
                    </div>
                </div>
               
           
           

              <div className="col-12 d-flex justify-content-center pt-2 mt-2">
                <Button className="save_button">Save</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {error ? <ErrorMsg code={"500"} /> : ""}
    </div>
  );
}

export default Editdebit_notes;
