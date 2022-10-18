import React, { useEffect, useState } from "react";
import "./leadlist.scss";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";
import { Input, Select, Pagination } from "antd";
import "antd/dist/antd.css";
// import { Table } from "antd";
import TableData from "../../../../components/table/table_data";
import { LeadStatus } from "../../../../utils/leadStatus";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";

export default function LeadList() {
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);

  const [allLeadList, setAllLeadList] = useState();

  const GetAllLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/lead?startIndex=0&noOfItems=${pageSize}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          setAllLeadList(res?.data?.data?.leads);
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetAllLeadData();
  }, []);

  const getData = (current, pageSize) => {
    return allLeadList?.slice((current - 1) * pageSize, current * pageSize);
  };

  const MyPagination = ({ total, onChange, current, showSizeChanger }) => {
    return (
      <Pagination
        size="small"
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}
        // showSizeChanger={showSizeChanger}
      />
    );
  };

  const action = () => {
    return (
      <div>
        <a href="" className="actionEdit">
          <FaEdit />
        </a>
        <a href="" className="actionView">
          <MdPageview />
        </a>
      </div>
    );
  };

  const data = [
    {
      type: "Lead",
      name: "Reon",
      organization: "Reon",
      action: action(),
      status: "Lead",
      key: "1",
    },
    {
      type: "Customer",
      name: "test",
      organization: "Reon",
      action: action(),
      status: "Opportunity",
      key: "2",
    },
    {
      type: "Lead",
      name: "Reontech",
      organization: "Testname",
      action: action(),
      status: "Converted",
      key: "3",
    },
    {
      type: "Customer",
      name: "Techpark",
      organization: "Tech",
      action: action(),
      status: "Quotation",
      key: "4",
    },
    {
      type: "Lead",
      name: "Reon",
      organization: "Reon",
      action: action(),
      status: "Interested",
      key: "5",
    },
    {
      type: "Customer",
      name: "test",
      organization: "Test1",
      action: action(),
      status: "Opportunity",
      key: "6",
    },
    {
      type: "Lead",
      name: "Infotech",
      organization: "Reon",
      action: action(),
      status: "Lead",
      key: "7",
    },
    {
      type: "Customer",
      name: "Techpark",
      organization: "Tech",
      action: action(),
      status: "DND",
      key: "8",
    },
    {
      type: "Lead",
      name: "Reon",
      organization: "Reon",
      action: action(),
      status: "Lead",
      key: "9",
    },
    {
      type: "Customer",
      name: "test",
      organization: "Reon",
      action: action(),
      status: "Opportunity",
      key: "10",
    },
    {
      type: "Lead",
      name: "Infotech",
      organization: "Reon",
      action: action(),
      status: "Converted",
      key: "11",
    },
    {
      type: "Customer",
      name: "Techpark",
      organization: "Tech",
      action: action(),
      status: "Quotation",
      key: "12",
    },
    {
      type: "Lead",
      name: "Reon",
      organization: "Reon",
      action: action(),
      status: "Lost",
      key: "13",
    },
    {
      type: "Customer",
      name: "test",
      organization: "Reon",
      action: action(),
      status: "Opportunity",
      key: "14",
    },
    {
      type: "Lead",
      name: "Infotech",
      organization: "Reon",
      action: action(),
      status: "Lead",
      key: "14",
    },
    {
      type: "Lead",
      name: "Infotech",
      organization: "Tech",
      action: action(),
      status: "Interested",
      key: "16",
    },
    {
      type: "Lead",
      name: "Reon",
      organization: "Reon",
      action: action(),
      status: "Lead",
      key: "17",
    },
    {
      type: "Customer",
      name: "test",
      organization: "Reon",
      action: action(),
      status: "Opportunity",
      key: "18",
    },
    {
      type: "Lead",
      name: "Infotech",
      organization: "Testname",
      action: action(),
      status: "Converted",
      key: "19",
    },
    {
      type: "Customer",
      name: "Techpark",
      organization: "Tech",
      action: action(),
      status: "Quotation",
      key: "20",
    },
    {
      type: "Lead",
      name: "Reon",
      organization: "Reon",
      action: action(),
      status: "Interested",
      key: "21",
    },
    {
      type: "Customer",
      name: "test",
      organization: "Test1",
      action: action(),
      status: "Opportunity",
      key: "22",
    },
    {
      type: "Lead",
      name: "Infotech",
      organization: "Reon",
      action: action(),
      status: "Lead",
      key: "23",
    },
    {
      type: "Customer",
      name: "Techpark",
      organization: "Tech",
      action: action(),
      status: "Quotation",
      key: "24",
    },
    {
      type: "Lead",
      name: "Reon",
      organization: "Reon",
      action: action(),
      status: "Lead",
      key: "25",
    },
    {
      type: "Customer",
      name: "test",
      organization: "Reon",
      action: action(),
      status: "Opportunity",
      key: "26",
    },
    {
      type: "Lead",
      name: "Infotech",
      organization: "Reon",
      action: action(),
      status: "Converted",
      key: "27",
    },
    {
      type: "Customer",
      name: "Techpark",
      organization: "Tech",
      action: action(),
      status: "Quotation",
      key: "28",
    },
    {
      type: "Lead",
      name: "Reon",
      organization: "Reon",
      action: action(),
      status: "Lead",
      key: "29",
    },
    {
      type: "Customer",
      name: "test",
      organization: "Reon",
      action: action(),
      status: "Opportunity",
      key: "30",
    },
    {
      type: "Lead",
      name: "Infotech",
      organization: "Reon",
      action: action(),
      status: "Lead",
      key: "31",
    },
    {
      type: "Lead",
      name: "Infotech",
      organization: "Tech",
      action: action(),
      status: "Interested",
      key: "32",
    },
  ];

  const columns = [
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
      title: "NAME",
      dataIndex: "lead_customer_name",
      key: "lead_customer_name",
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
      title: "ORGANIZATION",
      dataIndex: "lead_organization",
      key: "lead_organization",
      width: "23%",
      align: "center",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "14%",
      render: (data, index) => {
        return (
          <div>
            <a href="" className="actionEdit">
              <FaEdit />
            </a>
            <a href="" className="actionView">
              <MdPageview />
            </a>
          </div>
        );
      },
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

  console.log("saag eywrbzxcjhasdbf yryeraeuif:::::", allLeadList);
  console.log("page size", pageSize);

  return (
    <>
      <div className="container-fluid lead_list pt-3">
        <div className=" ">
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Lead</h5>
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
              data={getData(current, pageSize)}
              // data={allLeadList}
              columns={columns}
              custom_table_css="table_lead_list"
            />
          </div>
          <div className="d-flex py-2 justify-content-center">
            <MyPagination
              total={allLeadList?.length}
              current={current}
              showSizeChanger={true}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
