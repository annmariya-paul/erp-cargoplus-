import { Checkbox, DatePicker, Form, Select } from "antd";
import React from "react";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import Input_Number from "../../../components/InputNumber/InputNumber";
import SelectBox from "../../../components/Select Box/SelectBox";

function CreateExpence() {
  return (
    <div>
      <div className="container-fluid">
        <div className=" mb-3">
          <h2 style={{ color: "#0891d1" }}>Create Daily Expense</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              style={{
                borderRadius: "8px",
              }}
              className="card border-0 p-3 shadow-sm"
            >
              <div className="container-fluid p-3">
                <Form>
                  <div className="row ">
                    <div className="col-4 my-2">
                      <label>Voucher No</label>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2">
                      <label className="mb-2">Date</label>
                      <Form.Item>
                        <DatePicker />
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2">
                      <label>Category</label>
                      <Form.Item>
                        <SelectBox>
                          <Select.Option>test Category</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2">
                      <label>Name</label>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2">
                      <label>Party</label>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2">
                      <label>Bill No</label>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12 my-2">
                      <label>Party Address</label>
                      <Form.Item>
                        <TextArea />
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2">
                      <label>Employee</label>
                      <Form.Item>
                        <SelectBox>
                          <Select.Option>test Employee</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2 d-flex justify-content-center">
                      <div className="">
                        <label>Taxable</label>
                        <Form.Item>
                          <Checkbox />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-4 my-2">
                      <label>Tax No</label>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2">
                      <label>Amount</label>
                      <Form.Item>
                        <Input_Number />
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2">
                      <label>Tax Amount</label>
                      <Form.Item>
                        <Input_Number />
                      </Form.Item>
                    </div>
                    <div className="col-4 my-2">
                      <label>Total Amount</label>
                      <Form.Item>
                        <Input_Number />
                      </Form.Item>
                    </div>
                    <div className="col-12 my-2">
                      <label>Remarks</label>
                      <Form.Item>
                        <TextArea />
                      </Form.Item>
                    </div>
                    <div className="col-4"></div>
                    <div className="col-4 my-2">
                      <div className="">
                        <label>Attachments</label>

                        <Form.Item>
                          <FileUpload />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-4"></div>
                    <div className="col-12 d-flex justify-content-center my-4 pt-2">
                      <Button btnType="save" type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateExpence;
