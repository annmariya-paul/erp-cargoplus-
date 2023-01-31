import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";
import { Link } from "react-router-dom";
import { Form, Input, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import MyPagination from "../../../components/Pagination/MyPagination";
import TableData from "../../../components/table/table_data";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../check Unique/CheckUnique";

// { Add and list Departments - Ann mariya - 16/11/22 }
export default function Departments(props) {
  const [editForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [addForm, setAddForm] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [modalAddDept, setModalAddDept] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [deptName, setDeptName] = useState();
  const [deptCode, setDeptCode] = useState();
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [alldepartmentdata, setAllDepartmentData] = useState();
  const [showEditModal, setShowEditModal] = useState();
  const [department_id, setDepartment_id] = useState();
  const [uniqueName, setUniqueName] = useState(false);
  const [uniqueEditName, setUniqueEditName] = useState(false);
  const [uniqueCode, setUniqueCode] = useState(false);
  const [uniqueEditCode, setUniqueEditCode] = useState(false);
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [editUniqueName, setEditUniqueName] = useState();
  const [editUniqueCode, setEditUniqueCode] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessModal(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return alldepartmentdata?.slice((current - 1) * pageSize, current * pageSize);
  };

  useEffect(() => {
    Submit();
  }, []);
  const Submit = (data) => {
    console.log(data);
    if (data) {
      localStorage.setItem("Form", JSON.stringify(data));
      setSuccessModal(true);
      close_modal(successModal, 1000);
    } else {
      setError(true);
    }
  };

  const createDepartment = (data) => {
    PublicFetch.post(`${CRM_BASE_URL_HRMS}/departments`, data)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success ", res.data.success);
          setSuccessModal(true);
          getAllDepartments();
          close_modal(successModal, 1000);
          setModalAddDept(false);
          
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setError(true);
      });
  };

  const getAllDepartments = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/departments`)
      .then((res) => {
        console.log("all dept response", res.data.data);
        if (res.data.success) {
          setAllDepartmentData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  const handleEditClick = (data) => {
    console.log("hsfdhs", data);
    if (data) {
      setEditUniqueName(data?.department_name);
      setEditUniqueCode(data?.department_code);
      setShowEditModal(true);
      setDepartment_id(data.department_id);
       editForm.setFieldsValue({
         dept_code: data.department_code,
         dept_name: data.department_name,
       });
    }
  };

  const UpdateDepartment = (data) => {
    console.log("updating data", data);
    PublicFetch.patch(`${CRM_BASE_URL_HRMS}/departments/${department_id}`, {
      department_name: data?.dept_name,
      department_code: data?.dept_code,
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setSuccessModal(true);
          close_modal(successModal, 1000);
          setShowEditModal(false);
          getAllDepartments();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // const checkEditDeptNameis = (data) => {
  //   if (editUniqueName !== deptName) {
  //     PublicFetch.get(
  //       `${process.env.REACT_APP_BASE_URL}/misc?type=departmentname&value=${deptName}`
  //     )
  //       .then((res) => {
  //         console.log("Response", res);
  //         if (res.data.success) {
  //           console.log("Success", res.data.data);
  //           if (res.data.data.exist) {
  //             setUniqueEditName(true);
  //           } else {
  //             setUniqueEditName(false);
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error", err);
  //       });
  //   }
  // };

  // const checkEditDeptCodeis = (data) => {
  //   if (editUniqueCode !== deptCode) {
  //     PublicFetch.get(
  //       `${process.env.REACT_APP_BASE_URL}/misc?type=departmentcode&value=${deptCode}`
  //     )
  //       .then((res) => {
  //         console.log("Response", res);
  //         if (res.data.success) {
  //           console.log("Success", res.data.data);
  //           if (res.data.data.exist) {
  //             setUniqueEditCode(true);
  //           } else {
  //             setUniqueEditCode(false);
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error", err);
  //       });
  //   }
  // };


  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "30%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div
                className="editIcon m-0"
                onClick={() => {
                  handleEditClick(index);
                  setUniqueEditName(false);
                  setUniqueEditCode(false);
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
      title: "DEPARTMENT NAME",
      dataIndex: "department_name",
      key: "department_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.dept_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "DEPARTMENT CODE",
      dataIndex: "department_code",
      key: "department_code",
      align: "center",
    },
  ];

  const data = [
    {
      dept_name: "Dept test",
      dept_code: "DEPTAA",
      key: "1",
    },
    {
      dept_name: "Dept sample",
      dept_code: "DEPTBB",
      key: "2",
    },
    {
      dept_name: "Technical",
      dept_code: "DEPTCC",
      key: "3",
    },
  ];

  return (
    <>
      <div className="container-fluid container_hrms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Departments</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Department Name"
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
              onChange={(e) => {
                setCurrent(1);
                setPageSize(e)}}
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
            <Button btnType="add" onClick={() => setModalAddDept(true)}>
              Add Department
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={alldepartmentdata}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
           total={alldepartmentdata?.length}
           current={current}
           showSizeChanger={true}
           pageSize={pageSize}
           onChange={(current, pageSize) => {
             console.log("ggdhffs", current, pageSize);
             setCurrent(current);
             setPageSize(pageSize);
           }}
          />
        </div>
      </div>

      <Custom_model
        show={modalAddDept}
        onHide={() => setModalAddDept(false)}
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Department</h5>
            </div>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("valuezzzzzzz", value);
                Submit();
                createDepartment(value);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label htmlfor="dept_name">Department Name</label>
                  <Form.Item
                    name="department_name"
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
                        message:
                          "Department Name must be at least 3 characters",
                      },
                      {
                        max: 100,
                        message:
                          "Department Name cannot be longer than 100 characters",
                      },
                    ]}
                  >
                    <InputType
                      value={deptName}
                      onChange={(e) => {
                        setDeptName(e.target.value);
                        setUniqueName(false);
                      }}
                      onBlur={async () => {
                        let n = await CheckUnique({
                          type: "departmentname",
                          value: deptName,
                        });
                        setUniqueName(n);
                      }}
                    />
                  </Form.Item>
                  {uniqueName ? (
                    <p style={{ color: "red", marginTop: "-24px" }}>
                      Department Name {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
                </div>

                <div className="col-12 pt-3">
                  <label htmlfor="dept_code">Department Code</label>
                  <Form.Item
                    name="department_code"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z]+$"),
                        message: "Please enter a Valid Department code",
                      },
                      {
                        min: 3,
                        message:
                          "Department code must be at least 3 characters",
                      },
                      {
                        max: 15,
                        message:
                          "Department code cannot be longer than 15 characters",
                      },
                    ]}
                  >
                    <InputType
                      onChange={(e) => {
                        setDeptCode(e.target.value);
                        setUniqueCode(false);
                      }}
                      onBlur={async () => {
                        let c = await CheckUnique({
                          type: "departmentcode",
                          value: deptCode,
                        });
                        setUniqueCode(c);
                      }}
                    />
                  </Form.Item>
                  {uniqueCode ? (
                    <p style={{ color: "red", marginTop: "-24px" }}>
                      Department code {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      ></Custom_model>
      <Custom_model
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Edit Department</h5>
            </div>
            <Form
              name="editForm"
              form={editForm}
              onFinish={(value) => {
                console.log("valuezzzzzzz", value);
                Submit();
                UpdateDepartment(value);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
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
                        message:
                          "Department Name must be at least 3 characters",
                      },
                      {
                        max: 100,
                        message:
                          "Department Name cannot be longer than 100 characters",
                      },
                    ]}
                  >
                    <InputType
                      onChange={(e) => {
                        setDeptName(e.target.value);
                        setUniqueEditName(false);
                      }}
                      onBlur={async () => {
                        if (editUniqueName !== deptName) {
                          let n = await CheckUnique({
                            type: "departmentname",
                            value: deptName,
                          });
                          setUniqueEditName(n);
                        }
                      }}
                    />
                  </Form.Item>
                  {uniqueEditName ? (
                    <p style={{ color: "red", marginTop: "-24px" }}>
                      Department Name {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
                </div>

                <div className="col-12 pt-3">
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
                        message:
                          "Department code must be at least 3 characters",
                      },
                      {
                        max: 15,
                        message:
                          "Department code cannot be longer than 15 characters",
                      },
                    ]}
                  >
                    <InputType
                      onChange={(e) => {
                        setDeptCode(e.target.value);
                        setUniqueEditCode(false);
                      }}
                      onBlur={async () => {
                        if (editUniqueCode !== deptCode) {
                        let c = await CheckUnique({
                          type: "departmentcode",
                          value: deptCode,
                        });
                        setUniqueEditCode(c);
                      }
                      }}
                    />
                  </Form.Item>
                  {uniqueEditCode ? (
                    <p style={{ color: "red", marginTop: "-24px" }}>
                      Department code {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      ></Custom_model>
      <Custom_model show={successModal} success />
    </>
  );
}
