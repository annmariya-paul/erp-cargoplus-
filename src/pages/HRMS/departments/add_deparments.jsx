import React, {useState,useEffect} from "react";
import {Form} from "antd";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";
export default function Add_Department() {
  const [error, setError] = useState(false);
  const [addForm, setAddForm] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [deptName, setDeptName] = useState();
  const [deptCode, setDeptCode] = useState();

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
        <h5 className="lead_text">Departments</h5>
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
                <label htmlfor="dept_name">Department Name</label>
                <Form.Item
                  name="dept_name"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("^[A-Za-z ]+$"),
                      message: "Please enter a Valid Department Name",
                    },
                    {
                      whitespace: true,
                    },
                    {
                      min: 3,
                      message: "Department Name must be atleast 3 characters",
                    },
                    {
                      max: 100,
                       message:
                        "Department Name cannot be longer than 100 characters",
                    },
                  ]}
                  onChange={(e) => setDeptName(e.target.value)}
                >
                  <InputType />
                </Form.Item>
              </div>

              <div className="col-sm-6 pt-3">
                <label htmlfor="dept_code">Department Code</label>
                <Form.Item
                  name="dept_code"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("^[A-Za-z]+$"),
                      message: "Please enter a Valid Department code",
                    },
                    {
                      min: 3,
                      message: "Department code must be atleast 3 characters",
                    },
                    {
                      max: 15,
                       message:
                        "Department code cannot be longer than 15 characters",
                    },
                  ]}
                  onChange={(e) => setDeptCode(e.target.value)}
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
      </div>
    </>
  );
}
