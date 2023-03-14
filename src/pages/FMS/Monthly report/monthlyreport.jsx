import React, { useState } from "react";
import "../Monthly report/monthlyreport.scss";
// import { Input } from "antd";
import TableData from "../../../components/table/table_data";
import { DatePicker, Select} from "antd";
import Button from "../../../components/button/button";
export default function Monthly_report() {
  const [pageSize, setPageSize] = useState("march");

  const [serialNo, setserialNo] = useState(1);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const columns = [
    {
      title: "SI.NO",
      key: "sl_no",
      // width: "13%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "JOB NO",
      dataIndex: "job_no",
      key: "job_no",
      //    filteredValue: [searchedText],
      //    onFilter: (value, record) => {
      //      return String(record.carrier_name)
      //        .toLowerCase()
      //        .includes(value.toLowerCase()) ||
      //        String(record.carrier_code )
      //        .toLowerCase()
      //        .includes(value.toLowerCase())
      //    },
      align: "left",
    },
    {
      title: "JOB DATE",
      dataIndex: "job_date",
      key: "job_date",
      align: "center",
    },
    {
      title: "LEAD",
      dataIndex: "lead",
      key: "lead",
      width: "20%",
      align: "left",
    },

    {
      title: "COST",
      dataIndex: "cost",
      key: "cost",
      align: "right",
    },

    {
      title: "EXPENSE",
      dataIndex: "expense",
      key: "expense",
      align: "right",
    },

    {
      title: "PROFIT/LOSS",
      dataIndex: "profit",
      key: "profit",
      align: "right",
    },
  ];

  const data = [
    {
      sl_no: "1",
      job_no: "3",
      job_date: "13-4-2023",
      lead: "ji",
      cost: "700",
      expense: "9000",
      profit: "89",
      total: "90",
    },
  ];
  return (
    <>
      <div className="container-fluid container_monthly_report py-3">
        <div className="col">
          <h5 className="lead_text">Monthly Reports</h5>
        </div>
        <div className="row">
          <div className="col-3">
          <Select
          bordered={false}
          className="page_size_style"
          value={pageSize}
          onChange={(e) => setPageSize(e)}
      >
        <Select.Option value="25">
        January
        </Select.Option>
        <Select.Option value="50">
        February
        </Select.Option>
        <Select.Option value="100">
        March
        </Select.Option>

        <Select.Option value="100">
        April
        </Select.Option>
        <Select.Option value="100">
        May
        </Select.Option>
        <Select.Option value="100">
        June
        </Select.Option>
        <Select.Option value="100">
        July
        </Select.Option>
        <Select.Option value="100">
        August
        </Select.Option>
        <Select.Option value="100">
        September
        </Select.Option>
        <Select.Option value="100">
        October
        </Select.Option>
        <Select.Option value="100">
        November
        </Select.Option>
        <Select.Option value="100">
        December
        </Select.Option>

      </Select>

          </div>
          <div className="col-3">
            <label>Year</label>
            <DatePicker
              onChange={onChange}
              picker="year"
              style={{ backgroundColor: "FFFFFF" }}
            />
          </div>
          <div className="col-sm-2 d-flex mt-2 pt-3 justify-content-center">
            <Button btnType="save">Search</Button>
          </div>
        </div>
      </div>
      <div className="container-fluid container_monthly_report py-2">
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={data}
            columns={columns}
            custom_table_css="table_monthly_list"
          />
        </div>
        <div className="row d-flex justify-content-end mt-2 mx-1 me-5">
          <div className="col-5 d-flex justify-content mt-3 me-5 ">Total</div>
        </div>
      </div>
    </>
  );
}
