import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import FileUpload from "../../../components/fileupload/fileUploader";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputNumber from "../../../components/InputNumber/InputNumber";
import Button from "../../../components/button/button";
import Custom_model from "../../../components/custom_modal/custom_model";
import PublicFetch from "../../../utils/PublicFetch";
import Input_Number from "../../../components/InputNumber/InputNumber";

export default function EditJobPayment() {
  const [addForm] = Form.useForm();
  const [successPopup, setSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(ROUTES.JOB_PAYMENTS);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="content-tabs" style={{ maxHeight: "1000px" }}>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values111333", value);
                // OnSubmit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row px-3 pt-4">
                <div>
                  <h5 className="lead_text">Edit Job Payment</h5>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>Voucher No.</label>
                  <Form.Item name="voucher_no">
                    <InputType disabled />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>Voucher Date</label>
                  <Form.Item
                    className="mt-2"
                    name="voucher_date"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      // value={selectedDate}
                      // onChange={(e) => {
                      //   setSelectedDate(e);
                      // }}
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>Job No.</label>
                  <Form.Item
                    name="job_no"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <SelectBox>
                      <Select.Option>test 1</Select.Option>
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>Lead</label>
                  <Form.Item
                    name="lead"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <InputType disabled />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>Currency</label>
                  <Form.Item
                    name="job_currency"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <InputType disabled />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>Exchange Rate</label>
                  <Form.Item
                    name="exchange_rate"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <Input_Number />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>Job Amount</label>
                  <Form.Item
                    name="job_amount"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <InputNumber />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>Advance Amount</label>
                  <Form.Item
                    name="advance_amount"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <Input_Number />
                  </Form.Item>
                </div>
                <div className="col-sm-4 pt-3">
                  <label>
                    Advance in <span>(KWD)</span>
                  </label>
                  <Form.Item
                    name="advance_amount"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <Input_Number />
                  </Form.Item>
                </div>
                <div className="col-sm-6 pt-3">
                  <label>Remarks</label>
                  <Form.Item
                    name="advance_amount"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <TextArea />
                  </Form.Item>
                </div>
                <div className="col-6 mt-2">
                  <label>Display Picture</label>
                  <Form.Item name="new" className="mt-2">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpeg"
                      height={100}
                      // beforeUpload={beforeUpload}
                      onChange={(file) => {
                        console.log("Before upload file size", file.file.size);
                        if (file.file.size > 2000 && file.file.size < 500000) {
                          // setImg(file.file.originFileObj);
                          // setImageSize(false);
                          console.log("select imaggg", file.file.originFileObj);
                          console.log(
                            "image is greater than 2 kb and less than 500 kb"
                          );
                        } else {
                          // setImageSize(true);
                          console.log("Error in image upload");
                        }
                      }}
                    />
                    {/* {imageSize ? (
                      <p style={{ color: "red" }}>
                        Upload Image size between 1 kb and 500 kb
                      </p>
                    ) : (
                      ""
                    )} */}
                  </Form.Item>
                </div>
                <div className="col-12 d-flex justify-content-center mt-5 pt-4 gap-3 ">
                  <Button className="save_button">Save</Button>{" "}
                  <Button
                    as="input"
                    type="reset"
                    value="Reset"
                    onClick={() => {
                      handleCancel();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
