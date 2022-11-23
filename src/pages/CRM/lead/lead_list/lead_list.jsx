import React, { useEffect, useState } from "react";
import "./leadlist.scss";
import { Link, useParams } from "react-router-dom";
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
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import { LeadStatus } from "../../../../utils/leadStatus";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../../routes";
import MyPagination from "../../../../components/Pagination/MyPagination";

export default function LeadList() {
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [noofItems, setNoofItems] = useState("25");
  const [totalCount, setTotalcount] = useState();
  const [pageIndex, setPageIndex] = useState(0);
  const [current, setCurrent] = useState(1);

  const [allLeadList, setAllLeadList] = useState();
  
  const [currentcount,setCurrentcount]= useState()
  // pageindex =0 ->  25 * (1-1)- 1+1 
  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const numofItemsTo = noofItems * current ;




  const pagesizecount = Math.ceil(totalCount/noofItems)
  console.log("page number isss", pagesizecount)



  // console.log("saag eywrbzxcjhasdbf yryeraeuif:::::", allLeadList);
  // console.log("page size", pageIndex);
  // console.log(totalCount / noofItems);

  const GetAllLeadData = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/lead?startIndex=${pageofIndex}&noOfItems=${noofItems}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          setAllLeadList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          setCurrentcount(res?.data?.data?.currentCount)
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  // console.log("total count data", totalCount);
  // console.log("page&&&& index", pageIndex);

  useEffect(() => {
    GetAllLeadData();
  }, [noofItems, pageofIndex, pagesizecount]);

  const getData = (numofItemsTo, pageofIndex) => {
    return allLeadList?.slice(
      noofItems * (current - 1) - 1 + 1,
      noofItems * current
    );
  };


  // const pageofSize = Math.ceil(totalCount / numofItemsTo);
  // console.log("ffgsdgsd,", pageofSize);
  // console.log("ffgsdgsd%$%^$%^,", pageofIndex);
  // console.log("%$%^$%^,", numofItemsTo);

  // const MyPagination = ({
  //   total,
  //   onChange,
  //   current,
  //   pageSizeOptions,
  //   defaultPageSize,
  // }) => {
  //   return (
  //     <Pagination
  //       size="small"
  //       onChange={onChange}
  //       total={total}
  //       current={current}
  //       pageSize={pageofSize}
  //       defaultPageSize={false}
  //       pageSizeOptions={false}
  //       // showSizeChanger={showSizeChanger}
  //     />
  //   );
  // };

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

  // <Link to={ROUTES.OPPORTUNITY} className="nav-link">
  //                     <Button onClick={Submit} btnType="add_borderless">
  //                       <BsPlusCircleFill style={{ fontSize: "16px" }} /> View
  //                       Opportunity
  //                     </Button>
  //                   </Link>

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "14%",

      render: (data, index) => {
        // console.log("id is : ",index.lead_id);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <Link
                to={`${ROUTES.LEAD_EDIT}/${index.lead_id}`}
                className="nav-link"
              >
                {/* <a href="/edit_lead_list" className="actionEdit"> */}

                <FaEdit />
              </Link>{" "}
            </div>

            <div className="actionView m-0">
              <Link>
                <MdPageview />
              </Link>
            </div>
          </div>
        );
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



  return (
    <>
      <div className="container-fluid lead_list pt-3">
        <div className=" ">
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Lead</h5>
            </div>
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
            <div className="col-3 px-3">
              <Select
                // defaultValue={"25"}
                bordered={false}
                className="page_size_style"
                value={noofItems}
                onChange={(e) => {
                  console.log("On page size selected : ", e);
                  setNoofItems(e);
                }}
              >
                {/* <Select.Option value="5">5 | pages</Select.Option> */}
                {/* <Select.Option value="10">
                  Show
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-1">
                    10
                  </span>
                </Select.Option> */}
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
                  </span>{" "}
                </Select.Option>
              </Select>
            </div>
            <div className="col-9 d-flex justify-content-end">
              <Link to={ROUTES.LEAD}>
                <Button
                  btnType="add"
                  // className="add_opportunity"
                >
                  Add Lead
                </Button>
              </Link>
            </div>
          </div>
          <div className="datatable">
            <TableData
              // data={getData(numofItemsTo, pageofIndex)}
              data={allLeadList}
              columns={columns}
              custom_table_css="table_lead_list"
            />
          </div>
          <div className="d-flex py-2 justify-content-center">

            <MyPagination
              total={parseInt(totalCount) }
              current={current}
              pageSize={noofItems}
              // defaultPageSize={noofItems}
              showSizeChanger={false}
              onChange={(current,pageSize) => {
                console.log("page index", pageSize);
                setCurrent(current  );
                // setPageSize(pageSize);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
