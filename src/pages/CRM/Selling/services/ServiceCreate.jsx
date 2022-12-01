import { Checkbox, Select } from "antd";
import "../../../../components/Input Type textbox/InputType.scss";
import React, { useState } from "react";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import FileUpload from "../../../../components/fileupload/fileUploader";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { Form, message,InputNumber } from "antd";

function ServiceCreate() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState();
  const [HSN, setHSN] = useState();
  const [taxRate, setTaxRate] = useState();
  const [displayPicture, setDisplayPicture] = useState();
  const [description, setDescription] = useState();
  const [addform] = Form.useForm();
  return (
    <div>
      <div className="container-fluid mt-3">
        <div>
          <h4 className="lead_text">Services</h4>
        </div>
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs  my-3 px-4"
        >
          <div className="container my-3">
            <div className="my-3">
              <h5 className="lead_text">Basic Info</h5>
            </div>
            <div className="row my-5">
              <div className="col-4">
                <label>Name</label>
                <Form.Item
                  name="serviceName"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("[^0-9a-z]"),
                      message: "Please enter a Valid Name",
                    },
                    {
                      whitespace: true,
                    },
                    {
                      min: 2,
                      message: "Designation must be atleast 2 characters",
                    },
                    {
                      max: 100,
                    },
                  ]}
                >
                  <InputType
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="col-4">
                <label>Code</label>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("[^0-9a-z]"),
                      message: "Please enter a Valid Code",
                    },
                    {
                      min: 2,
                      message: "Code must be atleast 2 characters",
                    },
                    {
                      max: 20,
                    },
                  ]}
                >
                  <InputType
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="col-4 ">
                <label>Category</label>
                <Form.Item
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please select a category",
                    },
                  ]}
                >
                  <SelectBox value={category} onChange={(e) => setCategory(e)}>
                    <Select.Option>Watch</Select.Option>
                  </SelectBox>
                </Form.Item>
              </div>
              <div className="col-6 mt-2">
                <label className="mb-2">HSN</label>
                <Form.Item
                  name="HSN"
                  rules={[
                    {
                      required: true,
                      message: "Please select a category",
                    },
                  ]}
                >
                  <SelectBox value={HSN} onChange={(e) => setHSN(e)}>
                    <Select.Option>Watch</Select.Option>
                  </SelectBox>
                </Form.Item>
              </div>
              <div className="col-6 mt-2">
                <label className="mb-3">Tax Rate</label>
                <Form.Item
                  name="taxRate"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a Valid Tax Rate",
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      border: "0",
                      backgroundColor: "whitesmoke",
                      width: "100%",
                      paddingBlock: "2px",
                      boxShadow: "none",
                    }}
                    value={taxRate}
                    // formatter={(value) =>
                    //   ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    // }
                    // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={(e) => setTaxRate(e)}
                  />
                </Form.Item>
              </div>

              <div className="col-12 mt-2 d-flex  justify-content-center ">
                <div className="text-center">
                  <Form.Item name="displayPicture">
                    <label>Display Picture</label>
                    <FileUpload
                      value={displayPicture}
                      onChange={(e) => setDisplayPicture(e)}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="col-6 mt-2">
                <label>Address</label>
                <Form.Item
                  name="description"
                  rules={[
                    {
                      whitespace: true,
                    },
                    {
                      min: 2,
                      message: "Description must be atleast 2 characters",
                    },
                    {
                      max: 500,
                    },
                  ]}
                >
                  <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Item>
                {/* <p>Description</p>
                <div>
                  <textarea
                    style={{ height: "100px" }}
                    className="input_type_style w-100"
                  />
                </div> */}
              </div>
              <div className="col-12 d-flex justify-content-center pt-5 gap-3 ">
                <Button
                  onClick={() => {
                    setSuccessPopup(true);
                    setError(true);
                  }}
                  className="save_button"
                >
                  Save
                </Button>{" "}
                {/* <Button
                  onClick={() => {
                    setSuccessPopup(true);
                    setError(true);
                  }}
                  className="clear_button"
                >
                 Clear
                </Button> */}
                <Button as="input" type="reset" value="Reset">
                  {" "}
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error ? <ErrorMsg code={"500"} /> : ""}

      <CustomModel
        size={"sm"}
        success
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
      />
    </div>
  );
}

export default ServiceCreate;
