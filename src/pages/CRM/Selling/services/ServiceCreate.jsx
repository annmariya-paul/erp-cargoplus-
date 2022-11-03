import { Checkbox, Select } from "antd";
import React, { useState } from "react";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import FileUpload from "../../../../components/fileupload/fileUploader";

function ServiceCreate() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
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
                <p>Name</p>
                <div>
                  <input type="text" className="input_type_style w-100" />
                </div>
              </div>
              <div className="col-4">
                <p>Code</p>
                <div>
                  <input type={"text"} className="input_type_style w-100" />
                </div>
              </div>
              <div className="col-4 ">
                <p>Category</p>
                <div>
                  <Select
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "5px",
                    }}
                    bordered={false}
                    className="w-100 "
                  >
                    <Select.Option>Watch</Select.Option>
                  </Select>
                </div>
              </div>
              <div className="col-6 mt-2">
                <p>HSN</p>
                <div>
                  <Select
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "5px",
                    }}
                    bordered={false}
                    className="w-100 "
                  >
                    <Select.Option>Watch</Select.Option>
                  </Select>
                </div>
              </div>
              <div className="col-6 mt-2">
                <p>Tax Rate</p>
                <div>
                  {/* <Select
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "5px",
                    }}
                    bordered={false}
                    className="w-100 "
                  >
                    <Select.Option>Watch</Select.Option>
                  </Select> */}
                   <div>
                  <input type="number" className="input_type_style w-100" />
                </div>
                </div>
              </div>
              {/* <div className="col-6 mt-2">
                <p>Attributes</p>
                <div
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "5px",
                      height: "160px",
                      overflow: "scroll",
                    }}
                    className="card border-0 px-4 py-2"
                  >
                    <label style={{ color: "gray" }} className="my-2 ">
                      <Checkbox className="me-2" />
                      color
                    </label>
                    <label style={{ color: "gray" }} className="my-2">
                      <Checkbox className="me-2" />
                      warrenty
                    </label>
                    <label style={{ color: "gray" }} className="my-2">
                      <Checkbox className="me-2" />
                      Size
                    </label>
                    <label style={{ color: "gray" }} className="my-2">
                      <Checkbox className="me-2" />
                      weight
                    </label>
                    <label style={{ color: "gray" }} className="my-2">
                      <Checkbox className="me-2" />
                      weight
                    </label>
                    <label style={{ color: "gray" }} className="my-2">
                      <Checkbox className="me-2" />
                      weight
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="col-12 mt-2">
                <p>Display Picture</p>
                <FileUpload />
              </div>
              <div className="col-6 mt-2">
                <p>Description</p>
                <div>
                  <textarea
                    style={{ height: "100px" }}
                    className="input_type_style w-100"
                  />
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center pt-5">
                <Button
                  onClick={() => {
                    setSuccessPopup(true);
                    setError(true);
                  }}
                  className="save_button"
                >
                  Save
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
