import { Input, Select } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import Button from "../../../components/button/button";
import TableData from "../../../components/table/table_data";

const JobPayments = () => {
  const colums = [
    {
      title: "PAYMENT MODE",
      dataIndex: "payment_mode",
      key: "freight_type_name",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.freight_type_name  || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
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
            // data={data}
            // columns={columns}
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
};

export default JobPayments;
