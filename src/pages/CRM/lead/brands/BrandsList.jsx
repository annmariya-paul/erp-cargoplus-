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

import "../lead_list/leadlist.scss";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
// import CustomModel from "../../components/custom_modal/custom_model";
import Button from "../../../../components/button/button";

import "../../../opportunity_ List/opportunitylist.scss";
// import { BsPlusCircleFill } from "react-icons/bs";

// import { Route } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Form } from "react-bootstrap";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import CustomModel from "../../../../components/custom_modal/custom_model";
import FileUpload from "../../../../components/fileupload/fileUploader";
import logo from "../../../../components/img/logo192.png";
import ErrorMsg from "../../../../components/error/ErrorMessage";

function BrandsList() {
  const [pageSize, setPageSize] = useState("25"); // page size
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //search by type select box
  const [searchStatus, setSearchStatus] = useState("");
  const [BrandEditPopup, setBrandEditPopup] = useState(false);
  const [BrandViewpopup, setBrandViewPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
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
  ];
  // {columns is brand listing table componenet }

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "14%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-4">
            <div
              onClick={() => setBrandEditPopup(true)}
              className="actionEdit m-0 p-0"
            >
              <FaEdit />
            </div>
            <div
              onClick={() => setBrandViewPopup(true)}
              className="actionView m-0 p-0"
            >
              <MdPageview />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "IMAGE",
      dataIndex: { logo },
      key: "key",
      width: "23%",
      // filteredValue: [searchStatus],
      // onFilter: (value, record) => {
      //   return String(record.lead_status)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },

      align: "center",
      render: (theImageURL, records) => (
        <img alt={logo} src={logo} height="20px" width={"20px"} />
      ),
    },
    {
      title: "NAME",
      dataIndex: "lead_type",
      key: "key",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.lead_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
      width: "23%",
    },

    {
      title: "DESCRIPTION",
      dataIndex: "lead_organization",
      key: "key",
      //   width: "23%",
      align: "center",
    },
    // {
    //   title: "SOURCE",
    //   dataIndex: "action",
    //   key: "key",
    //   width: "14%",
    //   align: "center",
    //   filteredValue: [searchedText],
    //   onFilter: (value, record) => {
    //     return String(record.lead_customer_name)
    //       .toLowerCase()
    //       .includes(value.toLowerCase());
    //   },
    // },
    // {
    //   title: "PARTY",
    //   dataIndex: "lead_status",
    //   key: "key",

    //   align: "center",
    // },
  ];
  return (
    <div>
      <div>
        <div className="container-fluid lead_list  my-3 py-3">
          {/* brand listing section One */}

          <div>
            <div className="row flex-wrap">
              <div className="col">
                <h5 className="lead_text">Brands</h5>
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
              <div className="col-4 d-none">
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
                  <Select.Option value="sales">sales</Select.Option>
                  <Select.Option value="maintenance">Maintenance</Select.Option>
                  <Select.Option value="support">support</Select.Option>
                </Select>
              </div>
              <div className="col-4 d-none">
                <Select
                  allowClear
                  showSearch
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    borderRadius: "5px",
                  }}
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
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12  px-3">
                <Select
                  // defaultValue={"25"}
                  bordered={false}
                  className=" page_size_style"
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
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div>
              <div className="col-lg-3 col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-end">
                <Button
                  //   onClick={() => setShowAddOpportunity(true)}
                  className="add_opportunity"
                >
                  <Link to={ROUTES.BRANDCREATE}>
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      Add Brand
                    </span>
                  </Link>
                </Button>
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

          {/*  {/* {View model of Brands  section Two    }  */}

          <CustomModel
            show={BrandViewpopup}
            onHide={() => setBrandViewPopup(false)}
            View_list
            list_content={
              <>
                <div className="container-fluid px-4 my-4">
                  <div className="d-flex justify-content-between">
                    <h5 className="lead_text">Brands</h5>
                    <div className="">
                      <Button
                        style={{ backgroundColor: "white", color: "#0092ce" }}
                      >
                        <span
                          className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                          style={{ fontSize: "13px" }}
                          onClick={() => {
                            setBrandEditPopup(true);
                            setBrandViewPopup(false);
                          }}
                        >
                          Edit <FiEdit fontSize={"12px"} />
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-12 d-flex justify-content-center ">
                      <img
                        src={logo}
                        alt={logo}
                        style={{ height: "70px", width: "70px" }}
                      />
                    </div>
                    <div className="">
                      <div className="row mt-4">
                        <div className="col-5">
                          <p
                            style={{ color: "#000" }}
                            className="modal_view_p_style"
                          >
                            Name
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">Sales</p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-5">
                          <p
                            style={{ color: "#000" }}
                            className="modal_view_p_style"
                          >
                            Description
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </div>
      {/* { edit brand modal } */}
      <CustomModel
        size={"sm"}
        show={BrandEditPopup}
        onHide={() => setBrandEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Brand</h5>
              </div>
              <div className="row my-3 ">
                <div className="col-12">
                  <p>Name</p>
                  <input
                    type="text"
                    rules={{ required: true, message: "Please enter name" }}
                    className="input_type_style w-100"
                  />
                </div>
                <div className="col-12 my-2">
                  <p>Description</p>
                  <textarea className="input_type_style w-100" />
                </div>
                <div className="col-12 my-3">
                  <FileUpload />
                </div>
                <div className="col-12 d-flex justify-content-center mt-3">
                  <Button
                    onClick={() => {
                      setSuccessPopup(true);
                      setBrandEditPopup(false);
                      setError(true);
                    }}
                    className="save_button"
                  >
                    Save
                  </Button>
                </div>
              </div>
              {error ? (
                <div className="">
                  <ErrorMsg code={"400"} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        }
      />
      {/* {success popups} */}
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </div>
  );
}

export default BrandsList;
