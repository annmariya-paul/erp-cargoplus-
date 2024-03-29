import { Form, Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import PublicFetch from "../../../utils/PublicFetch";
import "./employee.scss";
import { CRM_BASE_URL_HRMS } from "./../../../api/bootapi";
import Custom_model from "../../../components/custom_modal/custom_model";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../routes";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../check Unique/CheckUnique";
function CreateEmployee() {
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState();
  const [allbranches, setAllBranches] = useState();
  const [alldesgination, setAllDesignation] = useState();
  const [alldespartment, setAllDepartment] = useState();
  const [allemptype, setAllEmpType] = useState();
  const [allempgrade, setAllEmpGrade] = useState();
  const [uniqueCode, setuniqueCode] = useState(false);
  const [employeeCode, setEmployeeCode] = useState();
  const [empEmail, setEmpEmail] = useState();
  const [empPassword, setEmpPassword] = useState();
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [allRoles, setAllRoles] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessModal(false);
        navigate(ROUTES.EMPLOYEES);
      }, time);
    }
  };

  const getbranches = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/branch`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of branches", res.data.data);
          setAllBranches(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getDesignation = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/designation`)
      .then((res) => {
        console.log("Response");
        if (res.data.success) {
          console.log("success of desgination", res.data.data);
          setAllDesignation(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getDepartment = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/departments`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of deapartment ", res.data.data);
          setAllDepartment(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getemployeetype = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employment-types`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success of employee type", res.data.data);
          setAllEmpType(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getemployeegrade = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employee-grades`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of grade", res.data.data);
          setAllEmpGrade(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const AllRoleData = () => {
    PublicFetch.get(`${process.env.REACT_APP_BASE_URL}/permissions/roles`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("suceess of role", res.data.data);
          setAllRoles(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getbranches();
    getDesignation();
    getDepartment();
    getemployeetype();
    getemployeegrade();
    AllRoleData();
  }, []);

  const CreateEmployee = (data) => {
    PublicFetch.post(`${CRM_BASE_URL_HRMS}/employees`, data)
      .then((res) => {
        console.log("Respose", res);
        if (res.data.success) {
          setSuccessModal(true);
          close_modal(successModal, 1200);
          console.log("Success", res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // const checkemployeeCodeis = (data) => {
  //   PublicFetch.get(
  //     `${process.env.REACT_APP_BASE_URL}/misc?type=employeecode&value=${employeeCode}`
  //   )
  //     .then((res) => {
  //       console.log("Response", res);
  //       if (res.data.success) {
  //         console.log("Success", res.data.data);
  //         if (res.data.data.exist) {
  //           console.log("hai guys");
  //           setuniqueCode(true);
  //         } else {
  //           setuniqueCode(false);
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // };

  return (
    <div>
      <div className="container p-2">
        <div className="row ps-3">
          <h5 className="lead_text">New Employee</h5>
        </div>
        <div className="row">
          <div className="col-12 ">
            <div className="card p-4 border-0 shadow-sm">
              <Form
                onFinish={(value) => {
                  console.log("success of create", value);
                  CreateEmployee(value);
                }}
              >
                <div className="row">
                  <div className="col-sm-6 mb-2">
                    <label>Employee Name<span className="required">*</span></label>
                    <Form.Item
                      name="employee_name"
                      rules={[
                        {
                          required: true,
                          message: "Employee Name is Required",
                        },
                        {
                          min: 2,
                          message: "Required Minimum 2 characters",
                        },
                        {
                          max: 100,
                          message: "Required Maximum 100 chraraters ",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  {/* <div className="col-sm-6">
                    <label>Employee Code</label>
                    <Form.Item
                      name="employee_code"
                      rules={[
                        {
                          required: true,
                          message: "Employee Code is Required",
                        },
                      ]}
                    >
                      <InputType
                        onChange={(e) => {
                          setEmployeeCode(e.target.value);
                          setuniqueCode(false);
                        }}
                        // onBlur={(e) => {
                        //   // checkemployeeCodeis();
                        // }}
                        // type=employeecode&value=${employeeCode}`
                        onBlur={async () => {
                          // checkAttributeNameis();
                          let a = await CheckUnique({
                            type: "employeecode",
                            value: employeeCode,
                          });
                          console.log("hai how are u", a);
                          setuniqueCode(a);
                        }}
                      />
                    </Form.Item>
                    {uniqueCode ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Employee code {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div> */}
                  <div className="col-sm-6 mb-2">
                    <label>Employee Branch<span className="required">*</span></label>
                    <Form.Item
                      name="employee_branch"
                      rules={[
                        {
                          required: true,
                          message: "Employee branch is Required",
                        },
                      ]}
                    >
                      <SelectBox>
                        {allbranches &&
                          allbranches.length > 0 &&
                          allbranches.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.branch_id}
                                value={item.branch_id}
                              >
                                {item.branch_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <label>Employee Department<span className="required">*</span></label>
                    <Form.Item
                      name="employee_department"
                      rules={[
                        {
                          required: true,
                          message: "Employee Department is Required",
                        },
                      ]}
                    >
                      <SelectBox>
                        {alldespartment &&
                          alldespartment.length > 0 &&
                          alldespartment.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.department_id}
                                value={item.department_id}
                              >
                                {item.department_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <label>Employee Designation<span className="required">*</span></label>
                    <Form.Item
                      name="employee_designation"
                      rules={[
                        {
                          required: true,
                          message: "Employee Designation is Required",
                        },
                      ]}
                    >
                      <SelectBox>
                        {alldesgination &&
                          alldesgination.length > 0 &&
                          alldesgination.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.designation_id}
                                value={item.designation_id}
                              >
                                {item.designation_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <label>Employee Type<span className="required">*</span></label>
                    <Form.Item
                      name="employee_type"
                      rules={[
                        {
                          required: true,
                          message: "Employee Type is Required",
                        },
                      ]}
                    >
                      <SelectBox>
                        {allemptype &&
                          allemptype.length > 0 &&
                          allemptype.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.employment_type_id}
                                value={item.employment_type_id}
                              >
                                {item.employment_type_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-sm-6 mb-2">
                    <label>Employee Grade<span className="required">*</span></label>
                    <Form.Item
                      name="employee_grade"
                      rules={[
                        {
                          required: true,
                          message: "Employee Grade is Required",
                        },
                      ]}
                    >
                      <SelectBox>
                        {allempgrade &&
                          allempgrade.length > 0 &&
                          allempgrade.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.employee_grade_id}
                                value={item.employee_grade_id}
                              >
                                {item.employee_grade_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <label>Employee Role<span className="required">*</span></label>
                    <Form.Item
                      name="employee_role_id"
                      rules={[
                        {
                          required: true,
                          message: "Employee Type is Required",
                        },
                      ]}
                    >
                      <SelectBox>
                        {allRoles &&
                          allRoles.length > 0 &&
                          allRoles.map((item, index) => {
                            return (
                              <Select.Option key={item.id} value={item.id}>
                                {item.name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <div className="row login_border">
                      {/* <div className="col-12 lead_text mb-2"> */}
                      <h6 className="lead_text my-3">Login Info</h6>
                      {/* </div> */}
                      <div className="col-sm-6 mb-2">
                        <label>Email<span className="required">*</span></label>
                        <Form.Item
                          name="employee_email"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp(
                                "^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
                              ),
                              message: "Email is Required",
                            },
                          ]}
                        >
                          <InputType />
                        </Form.Item>
                      </div>
                      <div className="col-sm-6 mt-1 mb-3 ">
                        <label >Password<span className="required">*</span></label>
                        <Form.Item
                          name="employee_password"
                          rules={[
                            {
                              required: true,
                              message: "Password is Required",
                            },
                            // {
                            //   min: 3,
                            //   message: "Required Minimum 3 characters",
                            // },
                            // {
                            //   max: 100,
                            //   message: "Required Maximum 100 chraraters ",
                            // },
                          ]}
                        >
                          <Input.Password
                            className="newpass"
                            style={{ backgroundColor: "whitesmoke" }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="d-flex justify-content-center">
                      <Button type="submit" className="p-2 save_button_style">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Custom_model show={successModal} success />
    </div>
  );
}

export default CreateEmployee;
