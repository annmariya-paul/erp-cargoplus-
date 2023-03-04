import { Input, Select } from "antd";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import Button from "../../../components/button/button";
import TableData from "../../../components/table/table_data";

export default function JobPayments() {
  const [serialNo, setserialNo] = useState(1);

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "VOUCHER NO",
      dataIndex: "voucher_no",
      key: "voucher_no",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.freight_type_name  || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
    },
    {
      title: "VOUCHER DATE",
      dataIndex: "voucher_date",
      key: "voucher_date",
      align: "center",
    },
    {
      title: "JOB NO",
      dataIndex: "job_no",
      key: "job_no",
      align: "center",
    },
    {
      title: "LEAD",
      dataIndex: "lead",
      key: "lead",
    },
    {
      title: "ADVANCE AMOUNT",
      dataIndex: "advance_amount",
      key: "advance_amount",
      align: "center",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      width: "12%",
      render: (data, index) => {
        return (
          <div className=" d-flex justify-content-center align-items-center gap-3">
            <Link to={ROUTES.EDIT_JOBPAYMENT}>
              <div
                className="actionEdit"
                // onClick={() => handleEditCategoryPhase1(index)}
              >
                <FaEdit />
              </div>
            </Link>
            <div
              className="actionEdit"
              // onClick={() => handleViewCategory(index)}
            >
              <MdPageview />
            </div>
            <div className="actionDel">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  const data = [
    {
      voucher_no: "001",
      voucher_date: "01-01-2023",
      job_no: "job001",
      lead: "Test name",
      advance_amount:"1000",
    },
  ];
  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Job Payments</h5>
          </div>
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search"
              style={{ margin: "5px", borderRadius: "5px" }}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-4 ">
            <Select
              bordered={false}
              className="page_size_style"
              //   value={pageSize}
              //   onChange={(e) => setPageSize(e)}
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

          <div className="col-4 d-flex  align-items-center justify-content-center">
            {/* <MyPagination
              total={parseInt(paymentmode?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
            /> */}
          </div>

          <div className="col-4 ">
            <Link to={ROUTES.ADD_JOBPAYMENT}>
              <Button btnType="add">Add Job Payment</Button>
            </Link>
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
          {/* <MyPagination
            total={parseInt(paymentmode?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
          /> */}
        </div>
      </div>
    </>
  );
}
