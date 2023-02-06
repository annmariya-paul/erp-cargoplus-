import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import TableData from "../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import Button from "../../../components/button/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";

function Listjob(){
    const [searchedText, setSearchedText] = useState("");
    const [pageSize, setPageSize] = useState("25");

    const columns = [
        {
          title: "ACTION",
          dataIndex: "action",
          key: "key",
          width: "10%",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center gap-2 me-2">
                <div
                  className="editIcon m-0 "
                //   onClick={() => {
                //     navigate(`/edit_quotation`);
                //   }}
                >
                  <Link  to={ROUTES.UPDATEJOB} >
                  <FaEdit style={{ marginLeft: 15 }} />
                  </Link>
                </div>
                <div
                  className="viewIcon m-0"
                //   onClick={() => {
                //     navigate(`/view_quotation`);
                //   }}
                  // onClick={()=>{
                  //   setShowViewModal(true);
                  // }}
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
          title: "JOB NO",
          dataIndex: "qno",
          key: "qno",
          filteredValue: [searchedText],
          onFilter: (value, record) => {
            return String(record.qno).toLowerCase().includes(value.toLowerCase());
          },
          align: "center",
        },
        {
          title: "DATE",
          dataIndex: "date",
          key: "date",
          align: "center",
        },
        {
          title: "AWB/BL",
          dataIndex: "validity",
          key: "validity",
          align: "center",
        },
        {
          title: "CONSIGNEE",
          dataIndex: "consignee",
          key: "consignee",
          align: "center",
        },
        {
          title: "SHIPPER",
          dataIndex: "shipper",
          key: "shipper",
          align: "center",
        },
        {
          title: "STATUS",
          dataIndex: "status",
          key: "status",
          align: "center",
        },
        {
          title: "",
          dataIndex: "assign",
          key: "assign",
          align: "center",
          render: (data, index) => {
            return (
              <>
                {index.assigned_employee && index.assigned_employee.length > 0 ? (
                  <div className="">
                    <Button btnType="add" className="me-1 view_btn">
                      view
                    </Button>
                  </div>
                ) : (
                  <div className="">
                    <Button
                      btnType="add"
                      className="me-1 view_btn"
                    //   onClick={() => {
                    //     navigate(`${ROUTES.ASSIGN_QUOTATION}/${index.id}`);
                    //   }}
                    >
                      Assign
                    </Button>
                  </div>
                )}
              </>
            );
          },
        },
      ];
    
      const data = [
        {
          id: "1",
          date: "4-01-2023",
          validity: "test",
          consignee: "xyz",
          shipper: "new",
          status: "data",
    
          key: "1",
        },
        {
          id: "2",
          date: "22-01-2023",
          validity: "test",
          consignee: "xyz",
          shipper: "new",
          status: "data",
    
          key: "2",
        },
      ];

    return(
        <>
        
        <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Job</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Quotation Number"
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
          <div className="col-xl-3 col-lg-3 col-sm-12 px-3">
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
          <div className="col-xl-1 col-lg-1 col-sm-12 p-1"></div>
          <div className="col-xl-8 col-lg-8 col-sm-12 d-flex justify-content-end">
            <div className="col mb-2 px-4">
            
              <Link to={ROUTES.CREATEJOB } style={{ color: "white" }}>
                <Button btnType="add">Add Job</Button>
              
              </Link>
            </div>
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
    )
}
export default Listjob;