import React, { useEffect, useState } from "react";
import "./leadReport.styles.scss";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { Input, Select, DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import MyPagination from "../../../../components/Pagination/MyPagination";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";

export default function LeadReport() {
  const { Option } = Select;

  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [pageSize, setPageSize] = useState(0);
  const [numOfItems, setNumOfItems] = useState("25");
  const [noOfDays, setNoOfDays] = useState(1);
  const [current, setCurrent] = useState(1);
  const [allLeadList, setAllLeadList] = useState();
  const [generateTable, setGenerateTable] = useState();
  const [convertedTable, setConvertedTable] = useState();
  const [dateCriteria, setDateCriteria] = useState("daily");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [backend, setBackEnd] = useState();
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // { function GetAllLeadData to get lead data separately as generated lead and converted lead list- Ann mariya (20/10/22)}
  const GetAllLeadData = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/lead?startIndex=${pageSize}&noOfItems=${numOfItems}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          //   { dividing as lead generated and lead converted table - Annmariya (20/10/22) }
          let arr1 = [];
          let arr2 = [];
          res?.data?.data?.leads.forEach((item, index) => {
            setAllLeadList(item.lead_status);
            if (item.lead_status == 5) {
              arr1.push({
                lead_customer_name: item?.lead_customer_name,
                lead_id: item?.lead_id,
                lead_organization: item?.lead_organization,
                lead_source: item?.lead_source,
                lead_status: item?.lead_status,
                lead_type: item?.lead_type,
                lead_user_type: item?.lead_user_type,
              });
              setConvertedTable(arr1);
            }
            if (item.lead_status == 1) {
              arr2.push({
                lead_customer_name: item?.lead_customer_name,
                lead_id: item?.lead_id,
                lead_organization: item?.lead_organization,
                lead_source: item?.lead_source,
                lead_status: item?.lead_status,
                lead_type: item?.lead_type,
                lead_user_type: item?.lead_user_type,
              });
              setGenerateTable(arr2);
            }
          });
        } else {
          console.log("FAILED TO LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetAllLeadData();
    Searchbydate();
  }, [numOfItems, pageSize]);

  // console.log("hdfsgfsdhjs", selectedDate, endDate);
  const Searchbydate = () => {
    let selecteddate = moment(selectedDate).format("MM-DD-YYYY");
    let startdate = moment(startDate).format("MM-DD-YYYY");
    let enddate = moment(endDate).format("MM-DD-YYYY");
    let selectedmonth = moment(selectedMonth).format("MM-01-YYYY");
    PublicFetch.post(
      `${CRM_BASE_URL}/lead/report`,
      dateCriteria == "daily"
        ? {
            startIndex: parseInt(pageSize),
            noOfItems: parseInt(numOfItems),
            mode: "default",
            noOfDays: 1,
            startDate: selecteddate,
            endDate: selecteddate,
          }
        : dateCriteria === "BtwnTwoDates"
        ? {
            startIndex: parseInt(pageSize),
            noOfItems: parseInt(numOfItems),
            mode: "custom",
            noOfDays: 1,
            startDate: startdate,
            endDate: enddate,
          }
        : {
            startIndex: parseInt(pageSize),
            noOfItems: parseInt(numOfItems),
            mode: "default",
            noOfDays: 31,
            startDate: selectedmonth,
            endDate: selectedmonth,
          }
    )
      .then(function (response) {
        console.log("testhelllooo.....", response);
        if (response.data.success) {
          console.log("hello", response.data.data);
          setConvertedTable(response?.data?.data?.converted?.data);
          setGenerateTable(response?.data?.data?.generated?.data);
        } else {
          console.log("Failed while adding data");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getGenerateData = (current, pageSize) => {
    return generateTable?.slice((current - 1) * pageSize, current * pageSize);
  };
  const getConvertData = (current, pageSize) => {
    return convertedTable?.slice((current - 1) * pageSize, current * pageSize);
  };
  const columns = [
    {
      title: "NAME",
      dataIndex: "lead_customer_name",
      key: "lead_customer_name",
      width: "24%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.lead_customer_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "TYPE",
      dataIndex: "lead_type",
      key: "lead_type",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.lead_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "ORGANIZATION",
      dataIndex: "lead_organization",
      key: "lead_organization",
      width: "29%",
      align: "center",
    },
    {
      title: "STATUS",
      dataIndex: "lead_status",
      key: "lead_status",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.lead_status)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
  ];
  console.log("bxhgddtd::::", backend);
  return (
    <>
      {/* {toggleState === 1 && ( */}
      <div className="container mb-2 d-flex justify-content-center">
        <div className="lead_report_container1">
          <div className="row">
            <h5 className="report_heading mb-2">Lead</h5>
          </div>
          <div className="row my-4 mx-2">
            <div className="col-md-6 col-sm-12">
              <label htmlFor="criteria">Select Date Criteria</label>
              <Select
                name="criteria"
                defaultValue="daily"
                style={{ width: " 100% " }}
                onChange={(e) => setDateCriteria(e)}
              >
                <Option value="daily">Daily</Option>
                <Option value="BtwnTwoDates">Between Two Dates</Option>
                <Option value="monthly">Monthly</Option>
              </Select>
            </div>
            {dateCriteria === "daily" && (
              <div className="col-md-6 col-sm-12">
                <label htmlFor="date">Date</label>
                <DatePicker
                  format={"MM/DD/YYYY"}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e);
                  }}
                />
              </div>
            )}
            {dateCriteria === "monthly" && (
              <div className="col-md-6 col-sm-12">
                <label htmlFor="month">Month</label>
                <DatePicker
                  format={"MM/01/YYYY"}
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e);
                  }}
                  picker="month"
                />
              </div>
            )}
            {dateCriteria === "BtwnTwoDates" && (
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="startDate">Start Date</label>
                    <DatePicker
                      format={"MM/DD/YYYY"}
                      value={startDate}
                      onChange={(e) => setStartDate(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="endDate">End Date</label>
                    <DatePicker
                      format={"MM/DD/YYYY"}
                      value={endDate}
                      onChange={(e) => setEndDate(e)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="row justify-content-center my-2">
            <div className="col-xl-3 col-lg-3 col-12 d-flex justify-content-center">
              <Button btnType="save" onClick={Searchbydate}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
      {/* {toggleState === 2 && (
        <div className="container mb-2 d-flex justify-content-center">
          <div className="lead_report_container1">
            <div className="row">
              <h5 className="report_heading mb-2">Lead</h5>
            </div>
            <div className="row my-4 mx-2">
              <div className="col-md-6 col-sm-12">
                <label htmlFor="criteria">Select Date Criteria</label>
                <Select
                  name="criteria"
                  defaultValue="daily"
                  style={{ width: " 100% " }}
                  onChange={(e) => setDateCriteria(e)}
                >
                  <Option value="daily">Daily</Option>
                  <Option value="BtwnTwoDates">Between Two Dates</Option>
                  <Option value="monthly">Monthly</Option>
                </Select>
              </div>
              {dateCriteria === "daily" && (
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="date">Date</label>
                  <DatePicker
                    format={"MM/DD/YYYY"}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e);
                    }}
                    allowClear={false}
                  />
                </div>
              )}
              {dateCriteria === "monthly" && (
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="month">Month</label>
                  <DatePicker onChange={onChange} picker="month" />
                </div>
              )}
              {dateCriteria === "BtwnTwoDates" && (
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="startDate">Start Date</label>
                      <DatePicker
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="endDate">End Date</label>
                      <DatePicker
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="row justify-content-center my-2">
              <div className="col-xl-3 col-lg-3 col-12 d-flex justify-content-center">
                <Button btnType="save" onClick={Searchbydate}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <br />
      <div className="container lead_report">
        <div className="row">
          <div className="col-sm-4">
            <div className="report_bloc-tabs tabs-responsive">
              <button
                id="button-tabs"
                className={
                  toggleState === 1
                    ? "report-tabs active-report-tabs"
                    : "report-tabs"
                }
                onClick={() => toggleTab(1)}
              >
                Generated
              </button>
              <button
                id="button-tabs"
                className={
                  toggleState === 2
                    ? "report-tabs active-report-tabs"
                    : "report-tabs"
                }
                onClick={() => toggleTab(2)}
              >
                Converted
              </button>
            </div>
          </div>
        </div>
        <div className="report-content-tabs">
          <div
            className={
              toggleState === 1
                ? "report-content  active-report-content"
                : "report-content"
            }
          >
            <div className="row  justify-content-md-end">
              <Leadlist_Icons />
            </div>
            <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
              <div className="col-sm-4 col-xs-12">
                <Input.Search
                  placeholder="Search by Name"
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
              <div className="col-sm-4 col-xs-12">
                <Select
                  allowClear
                  showSearch
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    borderRadius: "5px",
                  }}
                  placeholder="Search by Type"
                  className="select_search"
                  optionFilterProp="children"
                  onChange={(event) => {
                    setSearchType(event ? [event] : []);
                  }}
                >
                  <Select.Option value="L">Lead</Select.Option>
                  <Select.Option value="C">Customer</Select.Option>
                </Select>
              </div>
            </div>

            <div className="row my-3">
              <div className="col-3 px-3 ">
                <Select
                  bordered={false}
                  className="page_size_style"
                  value={numOfItems}
                  onChange={(e) => setNumOfItems(e)}
                >
                  <Select.Option value="25">
                    Show
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      25
                    </span>{" "}
                  </Select.Option>
                  <Select.Option value="50">
                    Show
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      50
                    </span>{" "}
                  </Select.Option>
                  <Select.Option value="100">
                    Show{" "}
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      100
                    </span>{" "}
                  </Select.Option>
                </Select>
              </div>
            </div>
            <div className="datatable">
              <TableData
                data={getGenerateData(current, numOfItems, pageSize)}
                columns={columns}
                custom_table_css="table_lead_list"
              />
            </div>
            <div className="d-flex py-2 justify-content-center">
              <MyPagination
                total={getGenerateData.length}
                current={current}
                showSizeChanger={true}
                pageSize={pageSize}
                onChange={(current, pageSize) => {
                  setCurrent(current);
                  setPageSize(pageSize);
                }}
              />
            </div>
          </div>

          {/* { -------- Converted table Lead list ----------} */}

          <div
            className={
              toggleState === 2
                ? "report-content  active-report-content"
                : "report-content"
            }
          >
            <div className="row  justify-content-md-end">
              <Leadlist_Icons />
            </div>
            <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
              <div className="col-sm-4 col-xs-12">
                <Input.Search
                  placeholder="Search by Name"
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
              <div className="col-sm-4 col-xs-12">
                <Select
                  allowClear
                  showSearch
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    borderRadius: "5px",
                  }}
                  placeholder="Search by Type"
                  className="select_search"
                  optionFilterProp="children"
                  onChange={(event) => {
                    setSearchType(event ? [event] : []);
                  }}
                >
                  <Select.Option value="L">Lead</Select.Option>
                  <Select.Option value="C">Customer</Select.Option>
                </Select>
              </div>
            </div>

            <div className="row my-3">
              <div className="col-3 px-3 ">
                <Select
                  bordered={false}
                  className="page_size_style"
                  value={numOfItems}
                  onChange={(e) => setNumOfItems(e)}
                >
                  <Select.Option value="25">
                    Show
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      25
                    </span>
                  </Select.Option>
                  <Select.Option value="50">
                    Show
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      50
                    </span>
                  </Select.Option>
                  <Select.Option value="100">
                    Show
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      100
                    </span>
                  </Select.Option>
                </Select>
              </div>
            </div>
            <div className="datatable">
              <TableData
                data={getConvertData(current, numOfItems, pageSize)}
                columns={columns}
                custom_table_css="table_lead_list"
              />
            </div>
            <div className="d-flex py-2 justify-content-center">
              <MyPagination
                total={getConvertData.length}
                current={current}
                showSizeChanger={true}
                pageSize={pageSize}
                onChange={(current, pageSize) => {
                  setCurrent(current);
                  setPageSize(pageSize);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// {
//  dateCriteria == "daily"
//    ? {
//        startIndex: parseInt(pageSize),
//        noOfItems: parseInt(numOfItems),
//        mode: "default",
//        noOfDays: 1,
//        startDate: selectedDate,
//        endDate: selectedDate,
//      }
//    : dateCriteria == "BtwnTwoDates"
//    ? {
//        startIndex: parseInt(pageSize),
//        noOfItems: parseInt(numOfItems),
//        mode: "custom",
//        noOfDays: 2,
//        startDate: startDate,
//        endDate: endDate,
//      }
//    : {
//        startIndex: parseInt(pageSize),
//        noOfItems: parseInt(numOfItems),
//        mode: "default",
//        noOfDays: 31,
//        startDate: selectedMonth,
//        endDate: selectedMonth,
//      };
// }
