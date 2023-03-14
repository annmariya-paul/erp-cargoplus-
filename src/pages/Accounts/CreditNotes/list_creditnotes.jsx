import React, { useState, useEffect } from "react";
import { Input, Select, Pagination, Checkbox } from "antd";
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
import { CRM_BASE_URL } from "../../../api/bootapi";
import { Link } from "react-router-dom";
import Button from "../../../components/button/button";
import {ROUTES} from "../../../routes";
import TableData from "../../../components/table/table_data";
import logo from "../../../components/img/logo192.png";
import MyPagination from "../../../components/Pagination/MyPagination";

import ErrorMsg from "../../../components/error/ErrorMessage";
import PublicFetch from "../../../utils/PublicFetch";
import FileUpload from "../../../components/fileupload/fileUploader";
import CustomModel from "../../../components/custom_modal/custom_model";


function Credit_notes() {
  const [numOfItems, setNumOfItems] = useState("25");
  const [pageSize, setPageSize] = useState("25"); // page size
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //search by type select box
  const [searchCategory, setSearchCategory] = useState("");
  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [productView, setProductView] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
 
  const [modalOpportunity, setModalOpportunity] = useState(false);
  const [productid, setProductID] = useState();
  console.log("pr id from state", productid);
  const [serialNo, setserialNo] = useState(1);
 


        

 
  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "VOUCHER NO",
      dataIndex: "voucher_no",
      key: "voucher_no",
      width: "13%",
      // filteredValue: [searchStatus],
      // onFilter: (value, record) => {
      //   return String(record.lead_status)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },

      align: "left",
     
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.date)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
      width: "10%",
    },

    {
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "customer",
        width: "15%",
      align: "left",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.customer)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "INVOICE NO",
      dataIndex: "invoice_no",
      key: "invoice_no",
      width: "12%",
      align: "left",
      filteredValue: [searchCategory],
      onFilter: (value, record) => {
        console.log("prrrr",record)
        return String(record.invoice_no)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      width: "10%",
      align: "left",
      filteredValue: [searchCategory],
      onFilter: (value, record) => {
        console.log("prrrr",record)
        return String(record.amount)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      width: "10%",
      align: "left",
      filteredValue: [searchCategory],
      onFilter: (value, record) => {
        console.log("prrrr",record)
        return String(record.type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "14%",
      render: (data, index) => {
        console.log("data", data);
        console.log("index", index);

        return (
          <div className="d-flex justify-content-center align-items-center gap-4">
            <div
              // onClick={() => setModalOpportunity(true)}
              // onClick={() => {
              //   handleEdit(index);
              // }}
              className="actionEdit m-0 p-0"
            >
              <FiEdit fontSize={"12px"} />
            </div>

            <Link to={`${ROUTES.PRODUCTDETAIL}/${index.product_id}`}>
              <div className="actionView m-0 p-0">
                <MdPageview />
              </div>
            </Link>
          </div>
        );
      },
      align: "center",
    },
    // {
    //   title: "PARTY",
    //   dataIndex: "lead_status",
    //   key: "key",

    //   align: "center",
    // },
  ];
const data=[{  voucher_no:"0001",date:"12-2-2023",customer:"Arun",invoice_no:"0033",amount:"1000",type:"data"}

]

  return (
    <div>
      <div className="container-fluid lead_list  py-3">
        <div>
         
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Credit Notes</h5>
            </div>
         
          </div>
          <div className="row " style={{ backgroundColor: "#f4f4f7" }}>
            <div className="col-4">
              <Input.Search
                placeholder="Search "
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
            {/* <div className="col-4 ">
              <Input.Search
                placeholder="Search by Code"
                style={{ margin: "5px", borderRadius: "5px" }}
                value={searchType}
                onChange={(e) => {
                  setSearchType(e.target.value ? [e.target.value] : []);
                }}
                onSearch={(value) => {
                  setSearchType(value);
                }}
              />
            </div>
            <div className="col-4 ">
              <Select
                allowClear
                showSearch
                style={{
                  width: "100%",
                  marginTop: "8px",
                  borderRadius: "5px",
                }}
                placeholder="Search by Category"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchCategory(event ? [event] : []);
                }}
              >
              
              </Select>
            </div> */}
          </div>
          <div className="row my-3">
            <div className="col-4  px-3">
              <Select
                // defaultValue={"25"}
                bordered={false}
                className=" page_size_style"
                // value={pageSize}
                // onChange={(e) => setPageSize(e)}
                value={numOfItems}
                onChange={(e, current) => {
                  console.log("On page size selected : ", e);
                  console.log("nfjnjfv", current);
                  setNumOfItems(e);
                  setCurrent(1);
                }}
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
            <div className=" col-4 d-flex align-items-center justify-content-center">
              {/* {totalCount>0 &&(
            <MyPagination
              total={parseInt(totalCount)}
              current={current}
              pageSize={numOfItems}
              onChange={(current, pageSize) => {
                setCurrent(current);
              }}
            />
            )} */}
          </div>
            <div className="col-4 d-flex justify-content-end">
              <Button
                //   onClick={() => setShowAddOpportunity(true)}
                className="add_opportunity"
              >
                <Link to={ROUTES.ADD_CREDIT_NOTES}>
                  <span
                    style={{
                      color: "white",
                    }}
                  >
                    Add Credit Note
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="datatable">
            <TableData
              // data={getData(current,numOfItems, pageSize)}
              // data={data}
                data={data}
              columns={columns}
              custom_table_css="table_lead_list"
            />
          </div>
          <div className="d-flex py-2 justify-content-center">
            {/* {totalCount>0 &&(
            <MyPagination
           
              total={parseInt(totalCount)}
              current={current}
              pageSize={numOfItems}
              onChange={(current, pageSize) => {
                setCurrent(current);
              }}
            />
            )} */}
          </div>
          {/* {"mcncncncncncncnc"}  {product listing ends } */}
        </div>
        {/* {section Two Product Edit modal starts} */}


        {/* <CustomModel
          Adding_contents
          show={showProductEditModal}
          onHide={() => setShowProductEditModal(false)}
          header="Edit Product"
          size={`xl`}
          footer={[
            <Button
              onClick={() => {
                setSuccessPopup(true);
                setError(true);
              }}
              btnType="save"
            >
              Save
            </Button>,
            <Button
              onClick={() => {
                setShowProductEditModal(false);
              }}
              className="cancel_button p-2"
            >
              cancel
            </Button>,
            ,
          ]}
          // {...props}
        >
          <div className="container">
            <div style={{ borderRadius: "8px" }} className="card border-0  ">
              <div className="container ">
                <div className="my-3 d-none">
                  <h5 className="lead_text">Basic Info</h5>
                </div>
                <div className="row ">
                  <div className="col-4">
                    <p>Name</p>
                    <div>
                      <input type="text" className="input_type_style w-100" />
                    </div>
                  </div>
                  <div className="col-4">
                    <p>Code</p>
                    <div>
                      <input type={"text"} className="input_type_style w-100" />
                    </div>
                  </div>
                  <div className="col-4 ">
                    <p>Category</p>
                    <div>
                      <Select
                        style={{
                          backgroundColor: "whitesmoke",
                          borderRadius: "5px",
                        }}
                        value={numOfItems}
                        onChange={(e) => setNumOfItems(e)}
                        bordered={false}
                        className="w-100 "
                      >
                        <Select.Option>Watch</Select.Option>
                      </Select>
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <p>Brand</p>
                    <div>
                      <Select
                        style={{
                          backgroundColor: "whitesmoke",
                          borderRadius: "5px",
                        }}
                        bordered={false}
                        className="w-100 "
                      >
                        <Select.Option>Watch</Select.Option>
                      </Select>
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <p>Unit</p>
                    <div>
                      <Select
                        style={{
                          backgroundColor: "whitesmoke",
                          borderRadius: "5px",
                        }}
                        bordered={false}
                        className="w-100 "
                      >
                        <Select.Option>Watch</Select.Option>
                      </Select>
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <p>Attributes</p>
                    <div
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "whitesmoke",
                          borderRadius: "5px",
                          height: "160px",
                          overflow: "scroll",
                        }}
                        className="card border-0 px-4 py-2"
                      >
                        <label style={{ color: "gray" }} className="my-2 ">
                          <Checkbox className="me-2" />
                          color
                        </label>
                        <label style={{ color: "gray" }} className="my-2">
                          <Checkbox className="me-2" />
                          warrenty
                        </label>
                        <label style={{ color: "gray" }} className="my-2">
                          <Checkbox className="me-2" />
                          Size
                        </label>
                        <label style={{ color: "gray" }} className="my-2">
                          <Checkbox className="me-2" />
                          weight
                        </label>
                        <label style={{ color: "gray" }} className="my-2">
                          <Checkbox className="me-2" />
                          Ratio
                        </label>
                        <label style={{ color: "gray" }} className="my-2">
                          <Checkbox className="me-2" />
                          Test
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <p>Display Picture</p>
                    <FileUpload />
                  </div>
                  <div className="col-6 mt-2">
                    <p>Description</p>
                    <div>
                      <textarea
                        style={{ height: "100px" }}
                        className="input_type_style w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {error ? <ErrorMsg code="500" /> : ""}
          </div>
        </CustomModel> */}

        {/* {Modal for viewing product details} */}

        <CustomModel
          show={productView}
          onHide={() => setProductView(false)}
          View_list
          list_content={
            <div>
              <div className="container ps-4 my-4">
                <div className=" d-flex justify-content-between">
                  <h5 className="lead_text">Products</h5>
                  <div className="">
                    <Button
                      style={{
                        backgroundColor: "white",
                        color: "#0092ce",
                      }}
                      className="d-flex justify-content-end"
                    >
                      <span
                        className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                        style={{ fontSize: "13px" }}
                        onClick={() => {
                          setShowProductEditModal(true);
                          setProductView(false);
                        }}
                      >
                        Edit <FiEdit fontSize={"12px"} />
                      </span>
                    </Button>
                  </div>
                </div>
                {/* <div className="row my-3">
                  <div className="col-12 d-flex justify-content-center ">
                    <img
                      src={logo}
                      alt={logo}
                      style={{
                        height: "70px",
                        width: "70px",
                      }}
                    />
                  </div>
                  <div className="">
                    <div className="row mt-4">
                      <div className="col-5">
                        <p
                          style={{ color: "#000" }}
                          className="modal_view_p_style"
                        >
                          Namedddddddddd
                        </p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal_view_p_sub">{viewproduct.product_name}</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <p
                          style={{ color: "#000" }}
                          className="modal_view_p_style"
                        >
                          Code
                        </p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal_view_p_sub">HJKGF23456</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <p
                          style={{ color: "#000" }}
                          className="modal_view_p_style"
                        >
                          Category
                        </p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal_view_p_sub">Watch</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <p
                          style={{ color: "#000" }}
                          className="modal_view_p_style"
                        >
                          Brand
                        </p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal_view_p_sub">Rolex</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <p
                          style={{ color: "#000" }}
                          className="modal_view_p_style"
                        >
                          Unit
                        </p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal_view_p_sub">HJKGF23456</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <p
                          style={{ color: "#000" }}
                          className="modal_view_p_style"
                        >
                          Attributes
                        </p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal_view_p_sub">color</p>
                      </div>
                    </div>
                    <div className="row mt-2">
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
                    <div className="row mt-2">
                      <div className="col-5">
                        <p
                          style={{ color: "#000" }}
                          className="modal_view_p_style"
                        >
                          Status
                        </p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal_view_p_sub_active">Active</p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          }
        />
      </div>
      {/* <ProductEditModal
        show={modalOpportunity}
        onHide={() => setModalOpportunity(false)}
        style="width:1250px"
        prid={productid}
        fun_call={() => getallproduct()}
      /> */}

      {/* {modal for success popups} */}
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </div>
  );
}

export default Credit_notes;
