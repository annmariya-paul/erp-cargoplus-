import React, { useState } from "react";
import "../Monthly report/monthlyreport.scss";
import TableData from "../../../components/table/table_data";
import PublicFetch from "../../../utils/PublicFetch";
import { DatePicker, Select, message } from "antd";
import moment from "moment";
import Button from "../../../components/button/button";

export default function Monthly_report() {
  const [pageSize, setPageSize] = useState("");
  const [serialNo, setserialNo] = useState(1);
  const [year, setYear] = useState();
  const [monthlyReportData, setMonthlyReportData] = useState();
  const [totalSummary, setTotalSummary] = useState();

  const onChange = (date, dateString) => {
    setYear(dateString);
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

  const handleMonthlySearch = async () => {
    if (!pageSize || !year) {
      message.error("All feilds are required");
      return;
    }
    try {
      const MonthlySearchData = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/freightManagement/v1/reports/job-report/monthly/${pageSize}/${year}`
      );
      if (MonthlySearchData.status === 200) {
        let temp = [];
        MonthlySearchData.data.data.responseData.map((item) => {
          temp.push({
            job_no: item.jobNo ? item.jobNo : "_",
            job_date: item.jobDate
              ? moment(item.jobDate).format("DD-MM-YYYY")
              : "_",
            lead: item.lead.lead_customer_name
              ? item.lead.lead_customer_name
              : "_",
            cost: item.cost ? Number(item.cost).toFixed(2) : 0.0,
            expense: item.expense ? Number(item.expense).toFixed(2) : 0.0,
            profit: item.profitLoss ? Number(item.profitLoss).toFixed(2) : 0.0,
          });
        });
        let temp2 = [];
        temp2.push({
          costTotal:
            MonthlySearchData.data.data.costTotal != null
              ? MonthlySearchData.data.data.costTotal
              : "_",
          expenseTotal:
            MonthlySearchData.data.data.expenseTotal != null
              ? MonthlySearchData.data.data.expenseTotal
              : "_",
          profitLossTotal:
            MonthlySearchData.data.data.profitLossTotal != null
              ? MonthlySearchData.data.data.profitLossTotal
              : "_",
        });
        if (MonthlySearchData.data.data.responseData.length != 0) {
          setTotalSummary(temp2);
        }
        else {
          setTotalSummary("null")
        }
        setMonthlyReportData(temp);
      }
    } catch (err) {
      console.log("Error while fecthing monthly report data");
    }
  };

  return (
    <>
      <div className="container-fluid container_monthly_report py-3">
        <div className="col">
          <h5 className="lead_text">Monthly Reports</h5>
        </div>
        <div className="row">
          <div className="col-3">
            <Select
              placeholder="Month"
              bordered={false}
              className="page_size_style mt-3"
              style={{ minWidth: "120px" }}
              // value={pageSize}
              onChange={(e) => setPageSize(e)}
            >
              <Select.Option value="1">January</Select.Option>
              <Select.Option value="2">February</Select.Option>
              <Select.Option value="3">March</Select.Option>
              <Select.Option value="4">April</Select.Option>
              <Select.Option value="5">May</Select.Option>
              <Select.Option value="6">June</Select.Option>
              <Select.Option value="7">July</Select.Option>
              <Select.Option value="8">August</Select.Option>
              <Select.Option value="9">September</Select.Option>
              <Select.Option value="10">October</Select.Option>
              <Select.Option value="11">November</Select.Option>
              <Select.Option value="12">December</Select.Option>
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
            <Button btnType="save" onClick={handleMonthlySearch}>
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="container-fluid container_monthly_report py-2">
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={monthlyReportData}
            columns={columns}
            custom_table_css="table_monthly_list"
            totalSummary={totalSummary}
          />
        </div>
      </div>
    </>
  );
}
