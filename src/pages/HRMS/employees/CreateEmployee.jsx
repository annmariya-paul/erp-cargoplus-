import { Form, Select } from "antd";
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

function CreateEmployee() {
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState();
  const [allbranches, setAllBranches] = useState();
  const [alldesgination, setAllDesignation] = useState();
  const [alldespartment, setAllDepartment] = useState();
  const [allemptype, setAllEmpType] = useState();
  const [allempgrade, setAllEmpGrade] = useState();
  const [uniqueCode, setuniqueCode] = useState(false);
  const [uniqueErrMsg,setUniqueErrMsg]=useState(UniqueErrorMsg);
  const [employeeCode, setEmployeeCode] = useState();

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

  useEffect(() => {
    getbranches();
    getDesignation();
    getDepartment();
    getemployeetype();
    getemployeegrade();
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

  const checkemployeeCodeis = (data) => {
    PublicFetch.get(
      `${process.env.REACT_APP_BASE_URL}/misc?type=employeecode&value=${employeeCode}`
    )
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success", res.data.data);
          if (res.data.data.exist) {
            console.log("hai guys");
            setuniqueCode(true);
          } else {
            setuniqueCode(false);
          }
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div>
      <div className="container p-3">
        <div className="">
          <h3 style={{ color: "#0891d1" }}>Add Employee</h3>
          <div className="row">
            <div className="col-12 my-3">
              <div className="card p-4 border-0 shadow-sm">
                <Form
                  onFinish={(value) => {
                    console.log("success of create", value);
                    CreateEmployee(value);
                  }}
                >
                  <div className="">
                    <div className="row">
                      <div className="col-6">
                        <div className="">
                          <label>Employee Name</label>
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
                      </div>
                      <div className="col-6">
                        <div className="">
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
                              onBlur={(e) => {
                                checkemployeeCodeis();
                              }}
                            />
                          </Form.Item>
                          {uniqueCode ? (
                            <label style={{ color: "red" }} className="my-2">
                              {uniqueErrMsg.UniqueErrName}
                            </label>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="">
                          <label>Employee Branch</label>
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
                      </div>
                      <div className="col-6">
                        <div className="">
                          <label>Employee Department</label>
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
                      </div>
                      <div className="col-6">
                        <div className="">
                          <label>Employee Designation</label>
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
                      </div>
                      <div className="col-6">
                        <div className="">
                          <label>Employee Type</label>
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
                      </div>
                      <div className="col-6">
                        <div className="">
                          <label>Employee Grade</label>
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
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-center">
                          <Button
                            type="submit"
                            className="p-2 save_button_style"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Custom_model show={successModal} success />
    </div>
  );
}

export default CreateEmployee;
