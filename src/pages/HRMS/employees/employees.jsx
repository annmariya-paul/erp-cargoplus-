import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../../components/button/button";
import MyPagination from "../../../components/Pagination/MyPagination";
import TableData from "../../../components/table/table_data";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import CustomModel from "../../../components/custom_modal/custom_model";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import CheckUnique from "../../../check Unique/CheckUnique";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";

function Employees() {
  const [editForm] = Form.useForm();
  const [uniqueeditCode, setuniqueeditCode] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [modalEditEmployee, setModalEditEmployee] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [employeeBranch, setEmployeeBranch] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeDept, setEmployeeDept] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeeGrade, setEmployeeGrade] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [empEmail, setEmpEmail] = useState();
  const [empPassword, setEmpPassword] = useState();
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [allEmployees, setAllEmployees] = useState([]);
  const [allbranches, setAllBranches] = useState();
  const [alldesgination, setAllDesignation] = useState();
  const [alldespartment, setAllDepartment] = useState();
  const [allemptype, setAllEmpType] = useState();
  const [allempgrade, setAllEmpGrade] = useState();
  const [emp_id, setEmp_Id] = useState();
  const [employeeName, setEmployeeName] = useState("");
  const [newName, setNewName] = useState();
  const [allRoles, setAllRoles] = useState();

  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);

  const getData = (current, pageSize) => {
    return allEmployees?.slice((current - 1) * pageSize, current * pageSize);
  };

  //Columns
  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "10%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div
                className="editIcon m-0"
                onClick={() => {
                  handleEditClick(index);
                  setuniqueeditCode(false);
                }}
              >
                <FaEdit />
              </div>
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "EMPLOYEE NAME",
      dataIndex: "employee_name",
      key: "employee_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.employee_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "EMPLOYEE CODE",
      dataIndex: "employee_code",
      key: "employee_code",
      align: "center",
    },
    {
      title: "EMPLOYEE BRANCH",
      dataIndex: "employee_branch",
      key: "employee_branch",
      align: "center",
    },
    {
      title: "EMPLOYEE DEPARTMENT",
      dataIndex: "employee_department",
      key: "employee_department",
      align: "center",
    },
    {
      title: "EMPLOYEE DESIGNATION",
      dataIndex: "employee_designation",
      key: "employee_designation",
      align: "center",
    },
    {
      title: "EMPLOYEE TYPE",
      dataIndex: "employee_type",
      key: "employee_type",
      align: "center",
    },
    {
      title: "EMPLOYEE GRADE",
      dataIndex: "employee_grade",
      key: "employee_grade",
      align: "center",
    },
  ];

  //API for get all employee grade
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

  //API call for Get all Department
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

  //API call for all Branches
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

  //API for get all Designation
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

  //API for get all EmployeeType
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
  useEffect(() => {
    getbranches();
    getDesignation();
    getDepartment();
    getemployeetype();
    getemployeegrade();
  }, []);

  //API call to get all employee
  const getAllEmployee = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of employee", res.data.data);
          let array = [];
          res.data.data.forEach((item, index) => {
            array.push({
              employee_id: item.employee_id,
              employee_email: item.employee_email,
              employee_password: item.employee_password,
              employee_name: item.employee_name,
              employee_code: item.employee_code,
              employee_department_id: item.hrms_v1_departments.department_id,
              employee_department: item.hrms_v1_departments.department_name,
              employee_branch_id: item.hrms_v1_branches.branch_id,
              employee_branch: item.hrms_v1_branches.branch_name,
              employee_grade_id: item.hrms_v1_employee_grades.employee_grade_id,
              employee_grade: item.hrms_v1_employee_grades.employee_grade_name,
              employee_type: item.hrms_v1_employment_types.employment_type_name,
              employee_type_id:
                item.hrms_v1_employment_types.employment_type_id,
              employee_designation: item.hrms_v1_designations.designation_name,
              employee_designation_id: item.hrms_v1_designations.designation_id,
              employee_role_id: item.employee_role_id,
            });
          });
          setAllEmployees(array);
          console.log(" newww array data ::", array);
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
    getAllEmployee();
    AllRoleData();
  }, []);

  const handleEditClick = (data) => {
    console.log("Edit data", data);
    setEmp_Id(data.employee_id);
    setEmployeeName(data.employee_name);
    setEmployeeBranch(data.employee_branch_id);
    setEmployeeCode(data.employee_code);
    setNewName(data.employee_code);
    setEmployeeDept(data.employee_department_id);
    setEmployeeDesignation(data.employee_designation_id);
    setEmployeeGrade(data.employee_grade_id);
    setEmployeeType(data.employee_type_id);
    setEmpEmail(data.employee_email);
    setEmpPassword(data.employee_password);

    if (data) {
      editForm.setFieldsValue({
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        employee_branch: data.employee_branch_id,
        employee_code: data.employee_code,
        employee_department: data.employee_department_id,
        employee_designation: data.employee_designation_id,
        employee_grade: data.employee_grade_id,
        employee_type: data.employee_type_id,
        employee_role_id: data.employee_role_id,
        employee_email: data.employee_email,
        employee_password: data.employee_password,
      });
      setModalEditEmployee(true);
    }
  };
  const updateEmployee = async (id) => {
    try {
      const updating = await PublicFetch.patch(
        `${CRM_BASE_URL_HRMS}/employees/${emp_id}`,
        {
          employee_name: employeeName.trim(""),
          employee_code: employeeCode,
          employee_branch: employeeBranch,
          employee_department: employeeDept,
          employee_designation: employeeDesignation,
          employee_grade: employeeGrade,
          employee_type: employeeType,
          employee_email: empEmail,
          employee_password: empPassword,
        }
      );
      console.log("editedd data is", updating);
      if (updating.data.success) {
        console.log("Success for updating employee", updating.data.data);
        setSuccessModal(true);
        getAllEmployee();
        close_modal(successModal, 1200);
        setModalEditEmployee(false);
      }
    } catch (err) {
      console.log("error to getting all employees", err);
    }
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessModal(false);
        //  navigate(ROUTES.EMPLOYEES);
      }, time);
    }
  };

  return (
    <div>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Employees</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Employee Name"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-4 px-3">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => {
                setCurrent(1);
                setPageSize(e);
              }}
            >
              <Select.Option value="25">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">25</span>
              </Select.Option>
              <Select.Option value="50">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1"> 50</span>
              </Select.Option>
              <Select.Option value="100">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">100</span>
              </Select.Option>
            </Select>
          </div>
          <div className=" col-4 d-flex align-items-center justify-content-center">
            <MyPagination
              total={allEmployees?.length}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          </div>

          <div className="col-4 d-flex justify-content-end">
            <Link to="/createemployee">
              <Button btnType="add">Add Employee</Button>
            </Link>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={allEmployees}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={allEmployees?.length}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
        </div>
      </div>
      <CustomModel
        width={650}
        show={modalEditEmployee}
        bodyStyle={{ height: "640px", overflowY: "scroll" }}
        onHide={() => setModalEditEmployee(false)}
        View_list
        list_content={
          <div>
            <h5 className="lead_text">Edit Employee</h5>
            <div className="row">
              <div className="col-12 my-3">
                <div className="px-2">
                  <Form
                    form={editForm}
                    onFinish={(value) => {
                      console.log("success of create", value);
                      updateEmployee();
                    }}
                  >
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
                                message: "Required Maximum 100 characters",
                              },
                            ]}
                          >
                            <InputType
                              value={employeeName}
                              onChange={(e) => setEmployeeName(e.target.value)}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-6">
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
                            value={employeeCode}
                            onChange={(e) => {
                              setEmployeeCode(e.target.value);
                              setuniqueeditCode(false);
                            }}
                            onBlur={async () => {
                              if (newName !== employeeCode) {
                                let a = await CheckUnique({
                                  type: "employeecode",
                                  value: employeeCode,
                                });
                                console.log("hai how are u", a);
                                setuniqueeditCode(a);
                              }
                            }}
                          />
                        </Form.Item>
                        {uniqueeditCode ? (
                          <p style={{ color: "red", marginTop: "-24px" }}>
                            Employee Code {uniqueErrMsg.UniqueErrName}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-6">
                        <label>Employee Branch</label>
                        <Form.Item
                          name="employee_branch"
                          rules={[
                            {
                              required: true,
                              message: "Employee Branch is Required",
                            },
                          ]}
                        >
                          <SelectBox
                            value={employeeBranch}
                            onChange={(e) => {
                              setEmployeeBranch(e);
                            }}
                          >
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
                      <div className="col-6">
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
                          <SelectBox
                            value={employeeDept}
                            onChange={(e) => {
                              setEmployeeDept(e);
                            }}
                          >
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
                      <div className="col-6">
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
                          <SelectBox
                            value={employeeDesignation}
                            onChange={(e) => {
                              setEmployeeDesignation(e);
                            }}
                          >
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
                      <div className="col-6">
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
                          <SelectBox
                            value={employeeType}
                            onChange={(e) => {
                              setEmployeeType(e);
                            }}
                          >
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
                      <div className="col-6">
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
                          <SelectBox
                            value={employeeGrade}
                            onChange={(e) => {
                              setEmployeeGrade(e);
                            }}
                          >
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
                      <div className="col-sm-6">
                        <label>Employee Role</label>
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
                          <div className="col-sm-6">
                            <label>Email</label>
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
                          <div className="col-sm-6">
                            <label>Password</label>
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
                              <InputType />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-2">
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
                  </Form>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <CustomModel show={successModal} success />
    </div>
  );
}

export default Employees;
