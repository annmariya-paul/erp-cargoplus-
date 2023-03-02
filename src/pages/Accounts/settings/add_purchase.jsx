import { Form, Checkbox, DatePicker } from "antd";
import React, { useState } from "react";
import { TreeSelect } from "antd";
import moment from "moment";

import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";

export default function Add_purchase() {
  const [addform] = Form.useForm();
  const [po_no, setPo_no] = useState("");
  const [purchasedate, setPurchasedate] = useState("");
  const [due_date, setDue_date] = useState("");
  const [img, setImg] = useState([]);
  const [imgSizeError, setImgSizeError] = useState(false);
  const [remarks, setremarks] = useState("");
  const newDate = new Date();
  const [selectedDate, setSelectedDate] = useState();

  return (
    <div>
      <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <div>
              <h5 className="lead_text my-2">Add Purchases</h5>
            </div>

            <Form
              name="addForm"
              form={addform}
              // onFinish={(value) => {
              //   console.log("values111333", value);
              //   OnSubmit();
              // }}
              // onFinishFailed={(error) => {
              //   console.log(error);
              // }}
            >
              <div className="row my-4">
                <div className="col-4">
                  <label>PO No</label>
                  <Form.Item name="PO No">
                    <InputType
                      value={po_no}
                      // onChange={(e) => {
                      //   setServiceName(e.target.value);
                      //   setuniqueCode(false);
                      // }}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Purchase Date</label>
                  <Form.Item name="purchase date" className="mt-2">
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      defaultValue={moment(newDate)}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Due Date</label>
                  <Form.Item name="purchase date" className="mt-2">
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      defaultValue={moment(newDate)}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e);
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="col-4">
                  <label>Vendor</label>
                  <Form.Item className="mt-2" name="vendor">
                    <TreeSelect
                      className="tree"
                      name="tree"
                      style={{ width: "100%" }}
                      // value={category}
                      // value={ setState.value}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      //   treeData={categoryTree}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      //   onChange={onChangetree}
                      //   onSelect={onSelect}
                    />
                  </Form.Item>
                </div>

                <div className="col-4">
                  <label>Payment Mode</label>
                  <Form.Item className="mt-2" name="vendor">
                    <TreeSelect
                      className="tree"
                      name="tree"
                      style={{ width: "100%" }}
                      // value={category}
                      // value={ setState.value}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      //   treeData={categoryTree}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      //   onChange={onChangetree}
                      //   onSelect={onSelect}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Credit Days</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>

                <div
                  className="col-sm-4 pt-3 "
                  //  key={index.id}
                >
                  <label>Taxable</label>
                  <div className="">
                    {/* <Form.Item name="category_parent_id"  className="mt-2"> */}

                    <Checkbox
                    // name={index.name}
                    // value={index.id}
                    // onChange={(e) =>
                    //   handleSubModuleChange(e.target.checked, index.id)
                    // }
                    // checked={checkSubmodule(index.id)}
                    >
                      {/* {index.name} */}
                    </Checkbox>
                    {/* </Form.Item> */}
                  </div>
                </div>

                <div className="col-4">
                  <label>Tax No</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Bill No</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Amount</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Tax Amount</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Total Amount</label>
                  <Form.Item className="mt-2" name="category">
                    <InputType value={due_date} />
                  </Form.Item>
                </div>

                {/* <div className="row"> */}
                <div className="col-8 ">
                  <label> Remarks</label>
                  <div>
                    <Form.Item
                      className="mt-2"
                      name="remarks"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Name",
                        },

                        {
                          min: 3,
                          message: "Name must be atleast 3 characters",
                        },
                        {
                          max: 100,
                          message: " Name cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <TextArea
                        value={remarks}
                        //   onChange={(e) => {
                        //     setvendordescription(e.target.value);
                        //   }}
                      />
                    </Form.Item>
                  </div>
                </div>
                {/* </div> */}

                <div className="col-4">
                  <label>Attachments</label>
                  <Form.Item name="new" className="mt-2">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpg,.jpeg"
                      height={100}
                      // onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 1000 && file.file.size < 500000) {
                          setImg(file.file.originFileObj);
                          setImgSizeError(false);
                          console.log(
                            "Image must be greater than 1 kb and less than 500 kb"
                          );
                        } else {
                          console.log("failed beacuse of large size");
                          setImgSizeError(true);
                        }
                      }}
                    />
                  </Form.Item>
                  {imgSizeError ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Please Select Image Size under 500kb
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="row justify-content-center ">
                  <div className="col-auto">
                    <Button btnType="save">Save</Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
