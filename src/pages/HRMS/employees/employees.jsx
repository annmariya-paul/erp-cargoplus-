import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../../components/button/button";
import MyPagination from "../../../components/Pagination/MyPagination";
import TableData from "../../../components/table/table_data";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import CustomModel from "../../../components/custom_modal/custom_model";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";

function Employees() {
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  // const [addForm, setAddForm] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [modalAddDept, setModalAddDept] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [deptName, setDeptName] = useState();
  const [deptCode, setDeptCode] = useState();
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);
  // const [successModal, setSuccessModal] = useState();
  const [allbranches, setAllBranches] = useState();
  const [alldesgination, setAllDesignation] = useState();
  console.log("dsgsssssss", alldesgination);
  const [alldespartment, setAllDepartment] = useState();
  const [allemptype, setAllEmpType] = useState();
  const [allempgrade, setAllEmpGrade] = useState();
  console.log("empgrdddd", allempgrade);
  const [emp_id, setEmp_Id] = useState();
  console.log("allEmp", allEmployees);
  // const getData = (current, pageSize) => {
  //   return data?.slice((current - 1) * pageSize, current * pageSize);
  // };

  
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
                onClick={() => handleEditClick(index)}
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
        return String(record.dept_name)
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
              employee_name: item.employee_name,
              employee_code: item.employee_code,
              employee_department: item.hrms_v1_departments.department_name,
              employee_branch:item.hrms_v1_branches.branch_name,
              employee_grade: item.hrms_v1_employee_grades.employee_grade_name,
              employee_type: item.hrms_v1_employment_types.employment_type_name,
              employee_designation: item.hrms_v1_designations.designation_name,
            });
          });
          setAllEmployees(array);
          console.log("array data ::", array);
          
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleEditClick = (data) => {
    console.log("Edit data", data);
    setEmp_Id(data.employee_id);

    if (data) {
      addForm.setFieldsValue({
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        employee_branch: data.employee_branch,
        employee_code: data.employee_code,
        employee_department: data.employee_department,
        employee_designation: data.employee_designation,
        employee_grade: data.employee_grade,
        employee_type: data.employee_type,
      });
      setModalAddDept(true);
    }
  };

  const updateEmployee = (data) => {
    PublicFetch.patch(`${CRM_BASE_URL_HRMS}/employees/${emp_id}`, data)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success for updating employee", res.data.data);
          setSuccessModal(true);
          getAllEmployee();
          close_modal(successModal, 1200);
          setModalAddDept(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
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
          <div className="col-3 px-3">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
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
          <div className="col-9 d-flex justify-content-end">
            <Link to="/createemployee">
              <Button btnType="add">Add Employee</Button>
            </Link>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={allEmployees}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            // total={data.length}
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
        show={modalAddDept}
        onHide={() => setModalAddDept(false)}
        View_list
        list_content={
          <div className="">
            <h5 style={{ color: "#0891d1" }}>Edit Employee</h5>
            <div className="row">
              <div className="col-12 my-3">
                <div className="px-2">
                  <Form
                    form={addForm}
                    onFinish={(value) => {
                      console.log("success of create", value);
                      updateEmployee(value);
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
                                  message: "Required Maximum 100 characters",
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
                              <InputType />
                            </Form.Item>
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
                                  message: "Employee Branch is Required",
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
        }
      />
      <CustomModel show={successModal} success />
    </div>
  );
}

export default Employees;
