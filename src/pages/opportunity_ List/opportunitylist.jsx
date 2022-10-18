import React, { useState } from "react";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { Input, Select, Pagination } from "antd";

import "../CRM/lead/lead_list/leadlist.scss";
import TableData from "../../components/table/table_data";
import MyPagination from "../../components/Pagination/MyPagination";
import CustomModel from "../../components/custom_modal/custom_model";
import Button from "../../components/button/button";
import "./opportunitylist.scss";

function Opportunitylist() {
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);

  const getData = (current, pageSize) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };

  const data = [
    {
      lead_type: "Sales",
      lead_customer_name: "Customer",
      lead_organization: "HJKGF23456",
      action: "Refefence",
      lead_status: "Database",
      key: "1",
    },
    {
      lead_type: "Maintenance",
      lead_customer_name: "Lead",
      lead_organization: "HJGHRF34356",
      action: "Direct Visit",
      lead_status: "Database",
      key: "2",
    },
    {
      lead_type: "Support",
      lead_customer_name: "Customer",
      lead_organization: "GHFVY56447",
      action: "Online Registration",
      lead_status: "Database",
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
            <div onClick={() => setShowViewModal(true)} className="actionView">
              <MdPageview />
            </div>
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
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.lead_status)
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
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.lead_customer_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "PARTY",
      dataIndex: "lead_status",
      key: "key",

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
                <Select.Option value="sales">sales</Select.Option>
                <Select.Option value="maintenance">Maintenance</Select.Option>
                <Select.Option value="support">support</Select.Option>
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
                <Select.Option value="L">Lead</Select.Option>
                <Select.Option value="C">Customer</Select.Option>
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
      <CustomModel
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="d-flex justify-content-between my-1">
              <div className="mt-3">
                <h5 className="opportunity_heading">Opportunity</h5>
              </div>
              <div className="">
                <Button btnType="add_borderless">
                  <span
                    className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                    style={{ fontSize: "14px" }}
                  >
                    Edit <FiEdit />
                  </span>
                </Button>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-5">
                <p style={{ color: "#000" }} className="modal_view_p_style">
                  Type
                </p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">Sales</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">From </p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">Customer</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Converted By</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">HGJK4536FC</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Source</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">Reference</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Party</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">Database</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Valid up to</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">17-10-2022</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Details</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Expecting Amount</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">6000</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Probability of conversion</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">Low</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">status</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">Interested</p>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default Opportunitylist;
