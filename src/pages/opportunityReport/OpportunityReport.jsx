import React, { useEffect, useState } from "react";
// import "./leadReport.styles.scss";
import Button from "../../components/button/button";
import TableData from "../../components/table/table_data";
import Leadlist_Icons from "../../components/lead_list_icon/lead_list_icon";
import { LeadStatus } from "../../utils/leadStatus";
import { Input, Select, Pagination, DatePicker } from "antd";
import "antd/dist/antd.css";
function OpportunityReport() {
  const { Option } = Select;
  const [toggleState, setToggleState] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [allLeadList, setAllLeadList] = useState();
  const [dateCriteria, setDateCriteria] = useState("daily");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // const getData = (current, pageSize) => {
  //   return allLeadList?.slice((current - 1) * pageSize, current * pageSize);
  // };

  const columns = [
    {
      title: "TYPE",
      dataIndex: "oportunity_type",
      key: "oportunity_type",
      width: "24%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.oportunity_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "FROM",
      dataIndex: "oportunity_from",
      key: "oportunity_from",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.oportunity_from)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "CONVERTED BY",
      dataIndex: "oportunity_convertedby",
      key: "lead_organization",
      width: "29%",
      align: "center",
    },
    {
      title: "SOURCE",
      dataIndex: "oportunity_source",
      key: "oportunity_source",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.oportunity_source)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "PARTY",
      dataIndex: "oportunity_party",
      key: "oportunity_party",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.oportunity_party)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
  ];

  const opdata = [
    {
      oportunity_type: "sales",
      oportunity_from: "customer",
      oportunity_convertedby: "hdndksjnsf",
      oportunity_source: "reference",
      oportunity_party: "database",
    },
    {
      oportunity_type: "support",
      oportunity_from: "Lead",
      oportunity_convertedby: "cedjmjnfk",
      oportunity_source: "direct visit",
      oportunity_party: "database",
    },
  ];

  return (
    <>
      {toggleState === 1 && (
        <div className="container mb-2 d-flex justify-content-center">
          <div className="lead_report_container1">
            <div className="row">
              <h5 className="report_heading my-2">Opportunity</h5>
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
                  <DatePicker onChange={onChange} />
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
            <div className="row  justify-content-center my-2">
              <div className="col-xl-3 col-lg-3 col-12 d-flex justify-content-center">
                <Button btnType="save">Search</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toggleState === 2 && (
        <div className="container mb-2 d-flex justify-content-center">
          <div className="lead_report_container1">
            <div className="row">
              <h5 className="report_heading my-2">Opportunity</h5>
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
                  <DatePicker onChange={onChange} />
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
            <div className="row justify-content-center  my-2">
              <div className="col-xl-3 col-lg-3 col-12 d-flex justify-content-center">
                <Button btnType="save" className="">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-3"></div>
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
          </div>{" "}
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
              <div className="col-4">
                <Input.Search
                  placeholder="Search by type"
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
              <div className="col-4">
                <Select
                  allowClear
                  showSearch
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    borderRadius: "5px",
                  }}
                  placeholder="Search by party"
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
              <div className="col-4">
                <Select
                  allowClear
                  showSearch
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    borderRadius: "5px",
                  }}
                  placeholder="Search by status"
                  className="select_search"
                  optionFilterProp="children"
                  onChange={(event) => {
                    setSearchStatus(event ? [event] : []);
                  }}
                >
                  {LeadStatus &&
                    LeadStatus.map((item, index) => {
                      return (
                        <Select.Option key={item.id} value={item.value}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </div>

            <div className="row my-3">
              <div className="col-3 px-3 ">
                <Select
                  bordered={false}
                  className="w-50 page_size_style"
                  value={pageSize}
                  onChange={(e) => setPageSize(e)}
                >
                  <Select.Option value="25">
                    Show{" "}
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-2">
                      25
                    </span>{" "}
                  </Select.Option>
                  <Select.Option value="50">
                    {" "}
                    Show{" "}
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      50
                    </span>{" "}
                  </Select.Option>
                  <Select.Option value="100">
                    {" "}
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
                // data={getData(current, pageSize)}
                data={opdata}
                columns={columns}
                custom_table_css="table_lead_list"
              />
            </div>
          </div>

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
              <div className="col-4">
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
              <div className="col-4">
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
              <div className="col-4">
                <Select
                  allowClear
                  showSearch
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    borderRadius: "5px",
                  }}
                  placeholder="Search by status"
                  className="select_search"
                  optionFilterProp="children"
                  onChange={(event) => {
                    setSearchStatus(event ? [event] : []);
                  }}
                >
                  {LeadStatus &&
                    LeadStatus.map((item, index) => {
                      return (
                        <Select.Option key={item.id} value={item.value}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </div>

            <div className="row my-3">
              <div className="col-3 px-3 ">
                <Select
                  bordered={false}
                  className="w-50 page_size_style"
                  value={pageSize}
                  onChange={(e) => setPageSize(e)}
                >
                  <Select.Option value="25">
                    Show{" "}
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-2">
                      25
                    </span>{" "}
                  </Select.Option>
                  <Select.Option value="50">
                    {" "}
                    Show{" "}
                    <span style={{ color: "lightgray" }} className="ms-1">
                      |
                    </span>
                    <span style={{ color: "#2f6b8f" }} className="ms-1">
                      50
                    </span>{" "}
                  </Select.Option>
                  <Select.Option value="100">
                    {" "}
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
                // data={getData(current, pageSize)}
                data={opdata}
                columns={columns}
                custom_table_css="table_lead_list"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OpportunityReport;
