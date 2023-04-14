import React, { useState, useEffect } from "react";
import { Select, DatePicker, message } from "antd";
import PublicFetch from "../../../utils/PublicFetch";
import Button from "../../../components/button/button";
import SelectBox from "../../../components/Select Box/SelectBox";
import TableData from "../../../components/table/table_data";
import styles from "./cstexp.module.scss";
import moment from "moment";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx/xlsx.js"; //for xl download
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";

const CostAndExpenseReport = () => {
  const { Option } = Select;
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment());
  const [serialNo, setserialNo] = useState(1);
  const [customerList, setCustomerList] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [jobList, setJobList] = useState();
  const [selectedJob, setSelectedJob] = useState();
  const [reportData, setReportData] = useState();
  // console.log(moment(new Date()).format("YYYY-MM-DD"))
  console.log(moment(new Date()).format("YYYY-MM-DD"), "New Date Details");
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
      align: "left",
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
      align: "left",
    },
    {
      title: "Total Cost",
      dataIndex: "cost",
      key: "cost",
      //   width: "29%",
      align: "right",
    },
    {
      title: "Total Expense",
      dataIndex: "expense",
      key: "expense",
      //   width: "20%",
      //   filteredValue: [searchStatus],
      //   onFilter: (value, record) => {
      //     return String(record.lead_status)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "right",
    },
    {
      title: "Total Profit/Loss",
      dataIndex: "profit_loss",
      key: "profit_loss",
      //   width: "29%",
      align: "right",
    },
  ];

  const handleExport = () => {
    var wb = XLSX.utils.book_new();

    var ws = XLSX.utils.json_to_sheet(datas);
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.utils.sheet_add_aoa(
      ws,
      xlheading,

      { origin: "A1" }
    );
    // ws["!cols"] = [{ wch: 15 }];
    let row = [
      { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
      {
        v: "bold & color",
        t: "s",
        s: { font: { bold: true, color: { rgb: "FF0000" } } },
      },
      {
        v: "fill: color",
        t: "s",
        s: { fill: { fgColor: { rgb: "E9E9E9" } } },
      },
      { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
    ];
    var wscols = [
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 17 },
      { wch: 15 },
    ];
    ws["!cols"] = wscols;

    XLSX.writeFile(wb, "Student Report.xlsx");
    console.log("xlsx data", ws);
    return addStyle();
  };
  const addStyle = () => {
    console.log("xlsx downloaded");
  };

  const datas = reportData;

  const xlheading = [["job_no", "customer", "cost", "expense", "profit_loss"]];

  const getCustomerList = async () => {
    try {
      const customerList = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/freightManagement/v1/reports/cost-expense-report/customers`
      );
      if (customerList?.status === 200) {
        setCustomerList(customerList?.data.data);
      }
    } catch (err) {
      console.log("Error While fetching customer list");
    }
  };

  const getJobList = async (e) => {
    if (e === "null") e = null;
    try {
      const jobList = await PublicFetch.post(
        `${process.env.REACT_APP_BASE_URL}/freightManagement/v1/reports/cost-expense-report/jobs`,
        {
          customerId: e,
        }
      );
      if (jobList?.status === 200) {
        //console.log("Job List are:", jobList?.data.data);
        setJobList(jobList?.data.data);
      }
    } catch (err) {
      console.log("Error in fetching job list");
    }
  };

  const Searchbydate = async () => {
    if (!startDate || !endDate) {
      message.error("All input feilds are required");
      return;
    }
    try {
      const searchData = await PublicFetch.post(
        `${process.env.REACT_APP_BASE_URL}/freightManagement/v1/reports/cost-expense-report/report`,
        {
          customerId: selectedCustomer ? Number(selectedCustomer) : null,
          jobId: selectedJob ? Number(selectedJob) : null,
          dateFrom: moment(startDate).format("YYYY-MM-DD"),
          dateTo: moment(endDate).format("YYYY-MM-DD"),
        }
      );
      if (searchData?.status === 200) {
        let temp = [];
        searchData?.data.data.map((item) => {
          temp.push({
            job_no: item.job_number,
            customer: item.customer.customer_name,
            cost: item.cost != null ? item.cost.toFixed(2) : "",
            expense: item.expense != null ? item.expense.toFixed(2) : "",
            profit_loss:
              item.profitLoss != null ? item.profitLoss.toFixed(2) : "",
          });
        });
        setReportData(temp);
      }
    } catch (err) {
      console.log("Error while searching data");
    }
  };

  useEffect(() => {
    getCustomerList();
    getJobList(null);
  }, []);

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [
    [
      "Slno",
      "JOB NO",
      "CUSTOMER",
      "TOTAL COST	",
      "TOTAL EXPENSE",
      "TOTAL PROFIT/LOSS",
    ],
  ];
  //for pdf download
  const data12 = reportData?.map((item, index) => [
    index + serialNo,
    item.job_no,
    item.customer,
    item.cost,
    item.expense,
    item.profit_loss,
  ]);

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col">
          <div className={`${styles.card} card p-3`}>
            <div className="row align-items-center">
              <div className="col-4">
                <h5 className={styles.heading}>
                  Customerwise Cost And Expense Report
                </h5>
              </div>
              <div className="col-4"></div>
              <div className={` col-4 d-flex justify-content-end `}>
                {data12 && (
                  <Leadlist_Icons
                    datas={data12}
                    columns={filteredColumns}
                    items={data12}
                    xlheading={UnitHeads}
                    filename="data.csv"
                  />
                )}
              </div>
              {/* <li className="icon-border">
                <a className={`${styles.icon_color} icon  `} href="#">
                  <FaFileExcel onClick={handleExport} />
                </a>
              </li> */}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="d-flex justify-content-around align-items-baseline mt-4">
                  <p>Customer</p>
                  <div className={styles.selectboxWrap}>
                    <SelectBox
                      name="customer"
                      defaultValue="null"
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                      className="w-100 select_box"
                      value={selectedCustomer}
                      onChange={(e) => {
                        setSelectedJob("null");
                        setSelectedCustomer(e);
                        getJobList(e);
                      }}
                    >
                      <Option value="null">All</Option>
                      {customerList?.map((item) => {
                        // console.log(item, "Items inside map");
                        return (
                          <Option value={item.lead_id}>
                            {item.lead_customer_name}
                          </Option>
                        );
                      })}
                    </SelectBox>
                  </div>
                  <p className={`${styles.jobSelectbox}ms-2`}>Job</p>
                  <div className={styles.selectboxWrap}>
                    <SelectBox
                      name="Job"
                      defaultValue="null"
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                      className="w-100 select_box"
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e)}
                    >
                      <Option value="null">All</Option>
                      {jobList?.map((item) => {
                        return (
                          <Option value={item.job_id}>{item.job_number}</Option>
                        );
                      })}
                    </SelectBox>
                  </div>
                </div>
                {/* <div className="d-flex align-items-baseline ms-3 mt-3"></div> */}
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-baseline mt-2">
                  <p className="mt-4">Date From</p>
                  <div className={styles.datepicker_wrapper}>
                    <DatePicker
                      // defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                      format={"DD-MM-YYYY"}
                      placeholder="From"
                      value={startDate}
                      onChange={(e) => setStartDate(e)}
                    />
                  </div>
                  <p className={`${styles.dateTop} mt-4`}>To</p>
                  <div className={styles.datepicker_wrapper}>
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      placeholder="To"
                      value={endDate}
                      onChange={(e) => setEndDate(e)}
                    />
                  </div>
                </div>
                {/* <div className="d-flex align-items-baseline"></div> */}
              </div>
              <div className={`${styles.saveBtn} mt-4 mb-3 gap-3 `}>
                <div className="p-0 m-0">
                  <Button btnType="save" onClick={Searchbydate}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.card} card mt-4`}>
            <div className="datatable mt-3">
              <TableData
                data={reportData}
                columns={columns}
                custom_table_css={styles.table_report_list}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAndExpenseReport;
