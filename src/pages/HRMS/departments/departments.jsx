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

// { Add and list Departments - Ann mariya - 16/11/22 }
export default function Departments(props) {
  const [error, setError] = useState(false);
  const [addForm, setAddForm] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [modalAddDept, setModalAddDept] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [deptName, setDeptName] = useState();
  const [deptCode, setDeptCode] = useState();
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState("");

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

  const getData = (current, pageSize) => {
    return data?.slice((current - 1) * pageSize, current * pageSize);
  };
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
                onClick={() => setModalAddDept(true)}
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
      dataIndex: "dept_name",
      key: "dept_name",
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
      dataIndex: "dept_code",
      key: "dept_code",
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
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Departments</h5>
          </div>
          <Leadlist_Icons />
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
            <Button btnType="add" onClick={() => setModalAddDept(true)}>
              Add Department
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={data.length}
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

      <Custom_model
        show={modalAddDept}
        onHide={() => setModalAddDept(false)}
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">
                Add Department
              </h5>
            </div>
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
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      ></Custom_model>
    </>
  );
}
