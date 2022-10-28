import { Select } from "antd";
import React, { useState } from "react";
import TextArea from "../../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../../components/button/button";
import CustomModel from "../../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../../components/error/ErrorMessage";
import FileUpload from "../../../../../components/fileupload/fileUploader";
import InputType from "../../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../../components/Select Box/SelectBox";

function Varients() {
  const [toggleState, setToggleState] = useState(1);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div>
      <div className="container-fluid">
        {" "}
        <div className="">
          <div className="row mt-3">
            <div className="col-sm-5 ">
              <div className="bloc-tabs tabs-responsive">
                <button
                  id="button-tabs"
                  className={
                    toggleState === 1
                      ? "report-tabs active-report-tabs"
                      : "report-tabs"
                  }
                  onClick={() => toggleTab(1)}
                >
                  Add Variants Details
                </button>

                <button
                  id="button-tabs"
                  className={
                    toggleState === 2
                      ? "report-tabs active-report-tabs"
                      : "report-tabs"
                  }
                  onClick={() => toggleTab(2)}
                >
                  Add Variants Attributes
                </button>
              </div>
            </div>
            <div className="container shadow-sm ps-4 mx-2  py-3">
              <div className="report-content-tabs ">
                {/* { add varient detailes tab content starts} */}
                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content"
                  }
                >
                  <div className="container">
                    <div>
                      <h5 className="lead_text">Add Variant Details</h5>
                    </div>
                    <div className="row">
                      <div className="col-4 mt-3">
                        <label>Name</label>
                        <div>
                          <InputType />
                        </div>
                      </div>
                      <div className="col-4 mt-3">
                        <label>Variant Code</label>
                        <div>
                          <InputType />
                        </div>
                      </div>
                      <div className="col-4 mt-3">
                        <label>Variant Code</label>
                        <div>
                          <SelectBox>
                            <Select.Option></Select.Option>
                          </SelectBox>
                        </div>
                      </div>
                      <div className="col-4 mt-3">
                        <label>Quantity</label>
                        <div>
                          <InputType />
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-center my-4">
                        {/* <label>Variant Code</label> */}
                        <div>
                          <FileUpload />
                        </div>
                      </div>
                      <div className="col-4 mt-3">
                        <label>Tax Rate</label>
                        <div>
                          <InputType />
                        </div>
                      </div>
                      <div className="col-8 mt-3">
                        <label>Description</label>
                        <div>
                          <TextArea />
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-center mt-4">
                        {/* <label>Tax Rate</label> */}
                        <div>
                          <Button
                            onClick={() => {
                              setSuccessPopup(true);
                              setError(true);
                            }}
                            btnType="save"
                          >
                            save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {add varient details ends} */}
                {/* { Add Varient Attributes tab content starts} */}
                <div
                  className={
                    toggleState === 2 ? "content  active-content" : "content"
                  }
                >
                  <div className="container">
                    <div className="row mt-5">
                      <div className="col-6">
                        <label>Attributes</label>
                        <div>
                          <SelectBox>
                            <Select.Option>color</Select.Option>
                            <Select.Option>Weight</Select.Option>
                          </SelectBox>
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Attributes value</label>
                        <div>
                          <InputType />
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-center mt-5">
                        {/* <label>Tax Rate</label> */}
                        <div>
                          <Button
                            onClick={() => {
                              setSuccessPopup(true);
                              setError(true);
                            }}
                            btnType="save"
                          >
                            save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {addd varients attributes ends} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModel
        size={"sm"}
        success
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
      />
      {error ? <ErrorMsg code="500" /> : ""}
    </div>
  );
}

export default Varients;
