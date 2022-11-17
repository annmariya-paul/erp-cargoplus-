import React, { useEffect, useState } from "react";
import "./designation.scss";
import { Link } from "react-router-dom";
import { Form,Input,Select } from "antd";
import { FaEdit } from "react-icons/fa";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import TableData from "../../../components/table/table_data";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../routes";

// { Add and list Designation - Ann mariya - 15/11/22 }
export default function Designation(){
    const [error, setError] = useState(false);
    const [addForm, setAddForm] = useState();
    const [successModal, setSuccessModal] = useState(false);
    const [designation,setDesignation] = useState();
    const [designationList,setDesignationList] = useState();
    const [searchedText,setSearchedText] = useState("");
    const [pageSize,setPageSize] = useState("25");

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
                    //   onClick={() => handleEditclick(index)}
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
          title: "DESIGNATION NAME",
          dataIndex: "designation_name",
          key: "designation_name",
          width: "70%",
          filteredValue: [searchedText],
          onFilter: (value, record) => {
            return String(record.designation_name)
              .toLowerCase()
              .includes(value.toLowerCase());
          },
          align: "center",
        },
      ];

      const data = [
        {
          designation_name: "Manager",
          key: "1",
        },
        {
          designation_name: "Developer",
          key: "2",
        },
        {
          designation_name: "HR",
          key: "3",
        },
      ];
return (
  <>
    <div className="container mb-4 d-flex justify-content-center">
      <div className="container1 ">
        <div className="row mx-2">
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
            <div className="row flex-wrap pt-1">
             
              <div className="row ms-0 py-1">
                <div className="col-12 pt-3">
                  <label htmlfor="designation">Designation Name</label>
                  <Form.Item
                    name="Designation name"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z]+$"),
                        message: "Please enter a valid Designation Name",
                      },
                    ]}
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                    <InputType />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <Button btnType="save">Save</Button>
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
      </div>
    </div>

    <div className="container-fluid container2 pt-3">
      <div className="row flex-wrap">
        <div className="col">
          <h5 className="lead_text">Designation</h5>
        </div>
        <Leadlist_Icons />
      </div>
      <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
        <div className="col-4">
          <Input.Search
            placeholder="Search by Designation"
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
  </>
);
}
