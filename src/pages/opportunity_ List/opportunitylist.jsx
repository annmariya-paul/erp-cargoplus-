import React, { useState } from "react";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { Input, Select, Pagination } from "antd";

import "../CRM/lead/lead_list/leadlist.scss";
import TableData from "../../components/table/table_data";
import MyPagination from "../../components/Pagination/MyPagination";

function Opportunitylist() {
  const [pageSize, setPageSize] = useState("10");
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const getData = (current, pageSize) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };

  const data = [
    {
      lead_type: "Lead",
      lead_customer_name: "Infotech",
      lead_organization: "Tech",
      //   action: action(),
      lead_status: "Interested",
      key: "1",
    },
    {
      lead_type: "Lead",
      lead_customer_name: "Infotech",
      lead_organization: "Tech",
      //   action: action(),
      lead_status: "Interested",
      key: "2",
    },
    {
      lead_type: "Lead",
      lead_customer_name: "Infotech",
      lead_organization: "Tech",
      //   action: action(),
      lead_status: "Interested",
      key: "3",
    },
    // {
    //   type: "Customer",
    //   name: "Techpark",
    //   organization: "Tech",
    //   //   action: action(),
    //   status: "Quotation",
    //   key: "4",
    // },
    // {
    //   type: "Lead",
    //   name: "Reon",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Interested",
    //   key: "5",
    // },
    // {
    //   type: "Customer",
    //   name: "test",
    //   organization: "Test1",
    //   //   action: action(),
    //   status: "Opportunity",
    //   key: "6",
    // },
    // {
    //   type: "Lead",
    //   name: "Infotech",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Lead",
    //   key: "7",
    // },
    // {
    //   type: "Customer",
    //   name: "Techpark",
    //   organization: "Tech",
    //   //   action: action(),
    //   status: "DND",
    //   key: "8",
    // },
    // {
    //   type: "Lead",
    //   name: "Reon",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Lead",
    //   key: "9",
    // },
    // {
    //   type: "Customer",
    //   name: "test",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Opportunity",
    //   key: "10",
    // },
    // {
    //   type: "Lead",
    //   name: "Infotech",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Converted",
    //   key: "11",
    // },
    // {
    //   type: "Customer",
    //   name: "Techpark",
    //   organization: "Tech",
    //   //   action: action(),
    //   status: "Quotation",
    //   key: "12",
    // },
    // {
    //   type: "Lead",
    //   name: "Reon",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Lost",
    //   key: "13",
    // },
    // {
    //   type: "Customer",
    //   name: "test",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Opportunity",
    //   key: "14",
    // },
    // {
    //   type: "Lead",
    //   name: "Infotech",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Lead",
    //   key: "14",
    // },
    // {
    //   type: "Lead",
    //   name: "Infotech",
    //   organization: "Tech",
    //   //   action: action(),
    //   status: "Interested",
    //   key: "16",
    // },
    // {
    //   type: "Lead",
    //   name: "Reon",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Lead",
    //   key: "17",
    // },
    // {
    //   type: "Customer",
    //   name: "test",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Opportunity",
    //   key: "18",
    // },
    // {
    //   type: "Lead",
    //   name: "Infotech",
    //   organization: "Testname",
    //   //   action: action(),
    //   status: "Converted",
    //   key: "19",
    // },
    // {
    //   type: "Customer",
    //   name: "Techpark",
    //   organization: "Tech",
    //   //   action: action(),
    //   status: "Quotation",
    //   key: "20",
    // },
    // {
    //   type: "Lead",
    //   name: "Reon",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Interested",
    //   key: "21",
    // },
    // {
    //   type: "Customer",
    //   name: "test",
    //   organization: "Test1",
    //   //   action: action(),
    //   status: "Opportunity",
    //   key: "22",
    // },
    // {
    //   type: "Lead",
    //   name: "Infotech",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Lead",
    //   key: "23",
    // },
    // {
    //   type: "Customer",
    //   name: "Techpark",
    //   organization: "Tech",
    //   //   action: action(),
    //   status: "Quotation",
    //   key: "24",
    // },
    // {
    //   type: "Lead",
    //   name: "Reon",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Lead",
    //   key: "25",
    // },
    // {
    //   type: "Customer",
    //   name: "test",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Opportunity",
    //   key: "26",
    // },
    // {
    //   type: "Lead",
    //   name: "Infotech",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Converted",
    //   key: "27",
    // },
    // {
    //   type: "Customer",
    //   name: "Techpark",
    //   organization: "Tech",
    //   //   action: action(),
    //   status: "Quotation",
    //   key: "28",
    // },
    // {
    //   type: "Lead",
    //   name: "Reon",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Lead",
    //   key: "29",
    // },
    // {
    //   type: "Customer",
    //   name: "test",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Opportunity",
    //   key: "30",
    // },
    // {
    //   type: "Lead",
    //   name: "Infotech",
    //   organization: "Reon",
    //   //   action: action(),
    //   status: "Lead",
    //   key: "31",
    // },
    // {
    //   lead_type: "Lead",
    //   lead_customer_name: "Infotech",
    //   lead_organization: "Tech",
    //   //   action: action(),
    //   lead_status: "Interested",
    //   key: "32",
    // },
  ];

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "14%",
      render: (data, index) => {
        return (
          <div>
            {/* <a href="" className="actionEdit">
              <FaEdit />
            </a> */}
            <a href="" className="actionView">
              <MdPageview />
            </a>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "TYPE",
      dataIndex: "lead_type",
      key: "key",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.lead_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "FROM",
      dataIndex: "lead_customer_name",
      key: "key",
      width: "23%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.lead_customer_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "CONVERTED BY",
      dataIndex: "lead_organization",
      key: "key",
      width: "23%",
      align: "center",
    },
    {
      title: "SOURCE",
      dataIndex: "action",
      key: "key",
      width: "14%",
      align: "center",
    },
    {
      title: "PARTY",
      dataIndex: "lead_status",
      key: "key",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.lead_status)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
  ];

  return (
    <div>
      <div className="container-fluid lead_list  my-3 py-3">
        <div>
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Opportunity</h5>
            </div>
            <div className="col-auto">
              <div className="row flex-wrap">
                <ul className="leadlist_icons_panel">
                  <li className="icon-border">
                    <a className="icon" href="#">
                      <MdFileCopy />
                    </a>
                  </li>
                  <li className="icon-border">
                    <a className="icon" href="#">
                      <FaFileExcel />
                    </a>
                  </li>
                  <li className="icon-border">
                    <a className="icon" href="#">
                      <FaFileCsv />
                    </a>
                  </li>
                  <li className="icon-border">
                    <a className="icon" href="#">
                      <FaFilePdf />
                    </a>
                  </li>
                  <li className="icon-border">
                    <a className="icon" href="#">
                      <AiFillPrinter />
                    </a>
                  </li>
                  <li className="icon-border">
                    <a className="icon" href="#">
                      <FaBookOpen />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
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
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by From"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchStatus(event ? [event] : []);
                }}
              >
                {/* {LeadStatus &&
                  LeadStatus.map((item, index) => {
                    return (
                      <Select.Option key={item.id} value={item.value}>
                        {item.name}
                      </Select.Option>
                    );
                  })} */}
                <Select.Option value="sales">sales</Select.Option>
                <Select.Option value="maintenance">Maintenance</Select.Option>
                <Select.Option value="support">support</Select.Option>
              </Select>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-3 px-3 ">
              <Select
                // defaultValue={"25"}
                bordered={false}
                className="w-50 page_size_style"
                value={pageSize}
                onChange={(e) => setPageSize(e)}
              >
                {/* <Select.Option value="5">5 | pages</Select.Option> */}
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
                  <span style={{ color: "#2f6b8f" }} className="ms-2">
                    50
                  </span>{" "}
                </Select.Option>
                <Select.Option value="100">
                  {" "}
                  Show{" "}
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-2">
                    100
                  </span>{" "}
                </Select.Option>
              </Select>
            </div>
          </div>
          <div className="datatable">
            <TableData
              data={getData(current, pageSize)}
              // data={allLeadList}
              //   data={data}
              columns={columns}
              custom_table_css="table_lead_list"
            />
          </div>
          <div className="d-flex py-2 justify-content-center">
            <MyPagination
              total={data.length}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          </div>
          {/* {"mcncncncncncncnc"} */}
        </div>
      </div>
    </div>
  );
}

export default Opportunitylist;
