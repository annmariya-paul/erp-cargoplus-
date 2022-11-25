import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";
import { Link } from "react-router-dom";
import { Form, Input, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import TableData from "../../../components/table/table_data";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../routes";

// { Add and list Branches - Ann mariya - 16/11/22 }
export default function Branches(props) {
  const [error, setError] = useState(false);
  const [addForm, setAddForm] = useState();
  const [searchedText, setSearchedText] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [modalAddBranch, setModalAddBranch] = useState(false);
  const [branchName, setBranchName] = useState();
  const [branchCode, setBranchCode] = useState();
  const [pageSize, setPageSize] = useState("25");

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessModal(false);
      }, time);
    }
  };
 
  const Submit = (data) => {
    console.log(data);
    if (data) {
      localStorage.setItem("addForm", JSON.stringify(data));
      setSuccessModal(true);
      close_modal(successModal, 1000);
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    Submit();
  }, []);

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
                onClick={() => setModalAddBranch(true)}
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
      title: "BRANCH NAME",
      dataIndex: "branch_name",
      key: "branch_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.branch_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "BRANCH CODE",
      dataIndex: "branch_code",
      key: "branch_code",
      align: "center",
    },
  ];

  const data = [
    {
      branch_name: "Branch X",
      branch_code: "ABC",
      key: "1",
    },
    {
      branch_name: "Branch Y",
      branch_code: "XYZ",
      key: "2",
    },
    {
      branch_name: "Branch C",
      branch_code: "PQR",
      key: "3",
    },
  ];
  return (
    <>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Branches</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Branch Name"
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
            <Button btnType="add" onClick={() => setModalAddBranch(true)}>
              Add Branch
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(numofItemsTo, pageofIndex)}
            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>

      <Custom_model
        show={modalAddBranch}
        onHide={() => setModalAddBranch(false)}
        header="Add Branch"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Branch</h5>
            </div>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                Submit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
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

                <div className="col-12 pt-1">
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
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      >
        <Custom_model
          size={"sm"}
          show={successModal}
          onHide={() => setSuccessModal(false)}
          success
        />
      </Custom_model>
      {/* {error? <ErrorMsg code={"500"} /> : " "} */}
    </>
  );
}
