import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { MdPageview } from "react-icons/md";
import { Form, Input, Select, DatePicker } from "antd";
import TableData from "../../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { FiEdit } from "react-icons/fi";
import CustomModel from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";

export default function JobTasks() {
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [modalAddJobTask, setModalAddJobTask] = useState(false);
  const [modalEditJobTask, setModalEditJobTask] = useState(false);
  const [ViewJobTaskModal, setViewJobTaskModal] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

   const columns = [
     {
       title: "ACTION",
       dataIndex: "action",
       key: "key",
       width: "30%",
       render: (data, index) => {
         console.log("index is :", index);
         return (
           <div className="d-flex justify-content-center align-items-center gap-2">
             <div
               className="editIcon m-0"
               onClick={() => setModalEditJobTask(index)}
             >
               <FaEdit />
             </div>
             <div
               className="viewIcon m-0"
               onClick={() => setViewJobTaskModal(index)}
             >
               <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
             </div>
             <div className="deleteIcon m-0">
               <FaTrash />
             </div>
           </div>
         );
       },
       align: "center",
     },
     {
       title: "JOB TASK NAME",
       dataIndex: "jobtask_name",
       key: "jobtask_name",
       filteredValue: [searchedText],
       onFilter: (value, record) => {
         return String(record.jobtask_name)
           .toLowerCase()
           .includes(value.toLowerCase());
       },
       align: "center",
     },
     {
       title: "TAX TYPE",
       dataIndex: "tax_type",
       key: "tax_type",
       filteredValue: [searchedText],
       onFilter: (value, record) => {
         return String(record.tax_type)
           .toLowerCase()
           .includes(value.toLowerCase());
       },
       align: "center",
     },
   ];

   const data = [
     {
       jobtask_name: "Payroll specialist",
       tax_type: "Payroll Tax",
       key: "1",
     },
     {
       jobtask_name: "Sales Tax Analyst",
       tax_type: "Sales Taxes",
       key: "2",
     },
     {
       jobtask_name: " Value-Added Tax Analyst",
       tax_type: "Value-Added Tax",
       key: "3",
     },
   ];
  return (
    <>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Job Tasks</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>

        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Job Task"
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
            <Button btnType="add" onClick={() => setModalAddJobTask(true)}>
              Add Tax Type
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
      {/* {add job tasks modal} */}

    </>
  );
}
