// import { Button } from "antd";
import { Checkbox, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete, MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";

import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import FileUpload from "../../../../components/fileupload/fileUploader";
import logo from "../../../../components/img/logo192.png";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { ROUTES } from "../../../../routes";
import Item from "antd/lib/list/Item";

function ProductDetails() {
  const { id } = useParams();
  const [toggleState, setToggleState] = useState(1);
  const [pageSize, setPageSize] = useState("25"); // page size
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //search by type select box
  const [searchStatus, setSearchStatus] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [prname, setPrName] = useState();
  const [newvalue, setNewvalue] = useState();
  // console.log("attributes in state:", prattributes);

  const [prcode, setPrcode] = useState();
  const [prcategory, setPrCategory] = useState();
  const [prbrand, setPrBrand] = useState();
  const [prunit, setPrUnit] = useState();
  const [prattributes, setPrAttributes] = useState();

  const [setProductDescription, setPrDescription] = useState();
  const [primage, setPrImage] = useState();
  const [attributes, setAttributes] = useState("");
  const toggleTab = (index) => {
    setToggleState(index);
  };

  // const getallattributes = async () => {
  //   try {
  //     const allattributes = await PublicFetch.get(
  //       `${CRM_BASE_URL_SELLING}/attribute`
  //     );
  //     console.log("getting all attributes name", allattributes.data.data);
  //     setAttributes(allattributes.data.data);
  //     allattributes.data.data.forEach((item, index) => {
  //       // console.log("Attribute value",item);
  //       // console.log("QQQQQQQQQQQQQQQ",allprList);
  //       // console.log("item.Attribute value",item.attribute_id);
  //       // console.log("product Attribute value", allprList?.product_attributes);
  //       if (item.attribute_id.includes(prattributes?.product_attributes)) {
  //         setNewvalue(item.attribute_name);
  //       }
  //     });
  //   } catch (err) {
  //     console.log("error to fetching  attributes", err);
  //   }
  // };
  // // console.log("All Attributes are >>>>", attributes);

  // useEffect(() => {
  //   getallattributes();
  // }, []);

  const [allprList, setAllPrList] = useState();//state for all products

// Start API call for get one product
  const GetAllProductData = () => {
    // console.log("Entered");
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/product/${id}`)
      .then((res) => {
        if (res?.data?.success) {
          setAllPrList(res.data.data);
          setPrName(res?.data?.data?.product_name);
          setPrcode(res?.data?.data?.product_code);
          setPrCategory(res?.data?.data?.product_category_id);
          setPrBrand(res?.data?.data?.product_brand_id);
          setPrUnit(res?.data?.data?.product_unit_id);
          setPrAttributes(res?.data?.data?.product_attributes);
          setPrDescription(res?.data?.data?.product_description);

          setPrImage(res?.data?.data?.product_pic);
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetAllProductData();
  }, []);

  //End
  const data = [
    {
      lead_type: "color",
      lead_customer_name: "Customer",
      lead_organization: "HJKGF23456",
      action: "one test",
      lead_status: "20",
      taxrate: "5%",
      key: "1",
    },
    {
      lead_type: "Warrenty",
      lead_customer_name: "Lead",
      lead_organization: "HJGHRF34356",
      action: "two test",
      lead_status: "30",
      taxrate: "6%",
      key: "2",
    },
    {
      lead_type: "size",
      lead_customer_name: "Customer",
      lead_organization: "GHFVY56447",
      action: "three test ",
      lead_status: "10",
      taxrate: "7%",
      key: "3",
    },
  ];

  const getData = (current, pageSize) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };

  // {columns is product listing table componenet }

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "14%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <div
              
              className="actionEdit m-0 p-0"
            >
              <FaEdit />
            </div>
            <div
              
              className="actionView m-0 p-0"
            >
              <MdPageview />
            </div>
            <div className="actionView m-0 p-0">
              <MdDelete />
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
      width: "15%",

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
      title: "CODE",
      dataIndex: "lead_organization",
      key: "key",
      //   width: "23%",
      align: "center",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.lead_organization)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "UNIT",
      dataIndex: "action",
      key: "key",
      width: "14%",
      align: "center",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.action)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "QUANTITY",
      dataIndex: "lead_status",
      key: "key",

      align: "center",
    },
    {
      title: "TAX RATE",
      dataIndex: "taxrate",
      key: "key",
      //   width: "23%",
      align: "center",
    },
  ];
  return (
    <div>
      <div className="container">
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
                Product Details
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
                Product Variants
              </button>
            </div>
          </div>{" "}
        </div>
        <div>
          <div className="container ps-4  py-3 shadow-sm">
            <div className="report-content-tabs">
              <div
                className={
                  toggleState === 1
                    ? "report-content  active-report-content"
                    : "report-content"
                }
              >
                <div className="container-fluid">
                  <div className=" d-flex justify-content-end">
                    <h5 className="lead_text d-none">Products</h5>
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
                          // setProductView(false);
                        }}
                      >
                        Edit <FiEdit fontSize={"12px"} />
                      </span>
                    </Button>
                  </div>
                  <div className="row my-3">
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
                            style={{
                              color: "#000",
                            }}
                            className="modal_view_p_style"
                          >
                            Name
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">
                            {allprList?.product_name}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-5">
                          <p
                            style={{
                              color: "#000",
                            }}
                            className="modal_view_p_style"
                          >
                            Code
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">
                            {allprList?.product_code}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-5">
                          <p
                            style={{
                              color: "#000",
                            }}
                            className="modal_view_p_style"
                          >
                            Category
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">
                            {allprList?.product_category_id}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-5">
                          <p
                            style={{
                              color: "#000",
                            }}
                            className="modal_view_p_style"
                          >
                            Brand
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">
                            {allprList?.product_brand_id}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-5">
                          <p
                            style={{
                              color: "#000",
                            }}
                            className="modal_view_p_style"
                          >
                            Unit
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">
                            {allprList?.product_unit_id}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-5">
                          <p
                            style={{
                              color: "#000",
                            }}
                            className="modal_view_p_style"
                          >
                            Attributes
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">
                            {allprList?.product_attributes}
                          </p>
                          {/* <p className="modal_view_p_sub">{newvalue}</p> */}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-5">
                          <p
                            style={{
                              color: "#000",
                            }}
                            className="modal_view_p_style"
                          >
                            Description
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">
                            {allprList?.product_description}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-5">
                          <p
                            style={{
                              color: "#000",
                            }}
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
                  </div>
                </div>
              </div>
              <div
                className={
                  toggleState === 2
                    ? "report-content  active-report-content"
                    : "report-content"
                }
              >
                <div>
                  <div>
                    <div className="row flex-wrap">
                      <div className="col">
                        <h5 className="lead_text"></h5>
                      </div>
                      <Leadlist_Icons />
                    </div>
                    <div
                      className="row py-1"
                      style={{
                        backgroundColor: "#f4f4f7",
                      }}
                    >
                      <div className="col-4">
                        <Input.Search
                          placeholder="Search by Name"
                          style={{
                            margin: "5px",
                            borderRadius: "5px",
                          }}
                          value={searchedText}
                          onChange={(e) => {
                            setSearchedText(
                              e.target.value ? [e.target.value] : []
                            );
                          }}
                          onSearch={(value) => {
                            setSearchedText(value);
                          }}
                        />
                      </div>
                      <div className="col-4 ">
                        <Input.Search
                          placeholder="Search by Code"
                          style={{
                            margin: "5px",
                            borderRadius: "5px",
                          }}
                          value={searchType}
                          onChange={(e) => {
                            setSearchType(
                              e.target.value ? [e.target.value] : []
                            );
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
                          placeholder="Search by Unit"
                          className="select_search"
                          optionFilterProp="children"
                          onChange={(event) => {
                            setSearchStatus(event ? [event] : []);
                          }}
                        >
                         
                          <Select.Option value="one">First Test</Select.Option>
                          <Select.Option value="two">Second Test</Select.Option>
                          <Select.Option value="three">
                            Third Test
                          </Select.Option>
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
                            <span
                              style={{
                                color: "lightgray",
                              }}
                              className="ms-1"
                            >
                              |
                            </span>
                            <span
                              style={{
                                color: "#2f6b8f",
                              }}
                              className="ms-2"
                            >
                              25
                            </span>{" "}
                          </Select.Option>
                          <Select.Option value="50">
                            {" "}
                            Show{" "}
                            <span
                              style={{
                                color: "lightgray",
                              }}
                              className="ms-1"
                            >
                              |
                            </span>
                            <span
                              style={{
                                color: "#2f6b8f",
                              }}
                              className="ms-2"
                            >
                              50
                            </span>{" "}
                          </Select.Option>
                          <Select.Option value="100">
                            {" "}
                            Show{" "}
                            <span
                              style={{
                                color: "lightgray",
                              }}
                              className="ms-1"
                            >
                              |
                            </span>
                            <span
                              style={{
                                color: "#2f6b8f",
                              }}
                              className="ms-2"
                            >
                              100
                            </span>{" "}
                          </Select.Option>
                        </Select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div>
                      <div className="col-lg-3 col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-end">
                        <Button
                          style={{
                            backgroundColor: "white",
                          }}
                          //   onClick={() => setShowAddOpportunity(true)}
                          className=""
                        >
                          <Link to={ROUTES.PRODUCTVARIENTS}>
                            <span
                              style={{
                                color: "#0891d1",
                              }}
                            >
                              <BsPlusCircleFill fontSize={18} /> Add
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModel
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
                        weight
                      </label>
                      <label style={{ color: "gray" }} className="my-2">
                        <Checkbox className="me-2" />
                        weight
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
      </CustomModel>
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </div>
  );
}

export default ProductDetails;
