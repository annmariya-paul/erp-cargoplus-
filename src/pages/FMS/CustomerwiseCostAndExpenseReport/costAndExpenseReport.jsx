import React, { useState } from "react";
import { Select, DatePicker } from "antd";
import Button from "../../../components/button/button";
import SelectBox from "../../../components/Select Box/SelectBox";
import TableData from "../../../components/table/table_data";
import styles from "./cstexp.module.scss";

const CostAndExpenseReport = () => {
  const { Option } = Select;
  const [startDate, setStartDate] = useState();
  const [serialNo, setserialNo] = useState(1);
  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      //   width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "Job No",
      dataIndex: "job_no",
      key: "job_no",
      //   width: "24%",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.lead_customer_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      //   filteredValue: [searchType],
      //   onFilter: (value, record) => {
      //     return String(record.lead_type)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      //   width: "29%",
      align: "center",
    },
    {
      title: "Expense",
      dataIndex: "expense",
      key: "expense",
      //   width: "20%",
      //   filteredValue: [searchStatus],
      //   onFilter: (value, record) => {
      //     return String(record.lead_status)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
    },
    {
      title: "Profit/Loss",
      dataIndex: "profit_loss",
      key: "profit_loss",
      //   width: "29%",
      align: "center",
    },
  ];
  const data = [
    {
      job_no: "00111",
      customer: "Test",
      cost: "30.000",
      expense: "20.000",
      profit_loss: "+10.000",
    },
  ]

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className={`${styles.card} card`}>
            <h5 className={styles.heading}>
              Customerwise Cost And Expense Report
            </h5>
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-baseline ms-3 mt-4">
                  <p>Customer</p>
                  <div className={styles.selectboxWrap}>
                    <SelectBox
                      name="customer"
                      defaultValue="All"
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                      className="w-100 select_box"
                      // value={dateCriteria}
                      // onChange={(e) => setDateCriteria(e)}
                    >
                      <Option value="daily">All</Option>
                      <Option value="BtwnTwoDates">Customer 1</Option>
                      <Option value="monthly">Customer 2</Option>
                    </SelectBox>
                  </div>
                </div>
                <div className="d-flex align-items-baseline ms-3 mt-3">
                  <p className={styles.jobSelectbox}>Job</p>
                  <div className={styles.selectboxWrap}>
                    <SelectBox
                      name="customer"
                      defaultValue="All"
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                      className="w-100 select_box"
                      // value={dateCriteria}
                      // onChange={(e) => setDateCriteria(e)}
                    >
                      <Option value="daily">All</Option>
                      <Option value="BtwnTwoDates">Job 1</Option>
                      <Option value="monthly">Job 2</Option>
                    </SelectBox>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-baseline mt-2">
                  <p className="mt-4">Date From</p>
                  <div className={styles.datepicker_wrapper}>
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      placeholder="From"
                      value={startDate}
                      // onChange={(e) => setStartDate(e)}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-baseline">
                  <p className={`${styles.dateTop} mt-4`}>To</p>
                  <div className={styles.datepicker_wrapper}>
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      placeholder="To"
                      value={startDate}
                      // onChange={(e) => setStartDate(e)}
                    />
                  </div>
                </div>
              </div>
              <div className={`${styles.saveBtn} mt-4 mb-3`}>
                <Button
                  btnType="save"
                  // onClick={Searchbydate}
                >
                  Search
                </Button>
              </div>
              <div className="datatable">
                <TableData
                  data={data}
                  columns={columns}
                  custom_table_css={styles.table_report_list}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAndExpenseReport;
