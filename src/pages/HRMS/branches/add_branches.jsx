import React, { useEffect, useState } from "react";
import { Form } from "antd";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";

export default function Add_Branch() {
  const [error, setError] = useState(false);
  const [addForm, setAddForm] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [branchName, setBranchName] = useState();
  const [branchCode, setBranchCode] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessModal(false);
      }, time);
    }
  };

  useEffect(() => {
    Submit();
  }, []);
  const Submit = (value) => {
    console.log(value);
    if (value) {
      localStorage.setItem("Form", JSON.stringify(value));
      setSuccessModal(true);
      close_modal(successModal, 1000);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div className="row my-3">
        <h5 className="lead_text">Branches</h5>
      </div>
      <div className="container-fluid add_attributes p-4 ">
        <Form
          name="addForm"
          form={addForm}
          onFinish={(value) => {
            console.log("valuezzzzzzz", value);
            Submit();
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row flex-wrap pt-2">
            <div className="col">
              <h6 className="lead_text">Basic Info</h6>
            </div>

            <div className="row ms-0 py-1">
              <div className="col-sm-6 pt-3">
                <label htmlfor="branchname">Branch Name</label>
                <Form.Item
                  name="branchname"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("^[A-Za-z ]+$"),
                      message: "Please enter a Valid Branch Name",
                    },

                    {
                      whitespace: true,
                    },
                    {
                      min: 3,
                      message: "Branch Name must be atleast 3 characters",
                    },
                    {
                      max: 100,
                      message:
                        "Branch Name cannot be longer than 100 characters",
                    },
                  ]}
                  onChange={(e) => setBranchName(e.target.value)}
                >
                  <InputType />
                </Form.Item>
              </div>

              <div className="col-sm-6 pt-3">
                <label htmlfor="branchcode">Branch Code</label>
                <Form.Item
                  name="branchcode"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("^[A-Za-z]+$"),
                      message: "Please enter a Valid Branch Code",
                    },
                    {
                      min: 3,
                      message: "Branch Code must be atleast 3 characters",
                    },
                    {
                      max: 15,
                      message:
                        "Branch code cannot be longer than 15 characters",
                    },
                  ]}
                  onChange={(e) => setBranchCode(e.target.value)}
                >
                  <InputType />
                </Form.Item>
              </div>
            </div>
            <div className="row justify-content-center mt-5">
              <div className="col-auto">
                <Button btnType="save">Save</Button>
              </div>
            </div>
          </div>
        </Form>
        <Custom_model
          size={"sm"}
          show={successModal}
          onHide={() => setSuccessModal(false)}
          success
        />
      </div>
      {/* {error? <ErrorMsg code={"500"} /> : " "} */}
    </>
  );
}
