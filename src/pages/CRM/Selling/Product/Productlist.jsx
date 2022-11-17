import React, { useState,useEffect } from "react";
import { Input, Select, Pagination, Checkbox } from "antd";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";

import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING} from "../../../../api/bootapi";
import { FiEdit } from "react-icons/fi";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import Button from "../../../../components/button/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import logo from "../../../../components/img/logo192.png";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
// import "../lead.styles.scss";
// import "../../.././opportunity_ List/opportunitylist.scss";
import CustomModel from "../../../../components/custom_modal/custom_model";
import FileUpload from "../../../../components/fileupload/fileUploader";
import ErrorMsg from "../../../../components/error/ErrorMessage";

function Productlist() {
  const [numOfItems, setNumOfItems] = useState("25");
  const [pageSize, setPageSize] = useState("25"); // page size
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //search by type select box
  const [searchStatus, setSearchStatus] = useState("");
  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [productView, setProductView] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const  [products, setProducts] = useState();
  console.log("products are :::",products);
  // const  [productname, setProductName] = useState();
  // const  [productcode, setProductCode] = useState();
  // const  [productcatid, setProductcatid] = useState();
  // const  [brandid, setBrandId] = useState();
  // const  [productunitid, setProductUnitid] = useState();
  // const  [productimg, setProductImg] = useState();
  // const  [productattributes, setProductAttributes] = useState([]);
  // const  [productdes, setProductDescription] = useState();


  // const getData = (current, pageSize) => {
  //   return products?.slice((current - 1) * pageSize, current * pageSize);
  // };
  const [viewproduct, setViewproduct] = useState({
    product_id: "",
    product_name: "",
    product_code: "",
    product_category_id: "",
    product_brand_id: "",
    product_unit_id: "",
    product_pic: "",
    product_attributes: "",
    product_description: "",
   
  });
  const Viewproducts = (item) => {
    console.log("view oppurtunity issss:", item);
    setViewproduct({
      ...viewproduct,
      product_id:item.product_id,
    product_name:item.product_name,
    product_code: item.product_code,
    product_category_id: item.product_category_id,
    product_brand_id: item.product_brand_id,
    product_unit_id: item.product_unit_id,
    product_pic: item.product_pic,
    product_attributes: item.product_attributes,
    product_description: item.product_description,
      
    });
    // getOppurtunityProgress(item)
    
    // setShowViewModal(true);
  };
 



  // {columns is product listing table componenet }
  // const getallproduct = async () => {
  //   try {
  //     const allproduct = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/product`);
  //     console.log("all products are", allproduct.data.data);
  //     setProducts(allproduct.data.data);
  //   } catch (err) {
  //     console.log("error while getting the products: ", err);
  //   }
  // };

  const getallproduct = () => {
    PublicFetch.get(
      `${CRM_BASE_URL_SELLING}/product?startIndex=0&noOfItems=10`
    )
    .then((res) => {
        if (res?.data?.success) {
          console.log("All products success::: ", res?.data?.data.products)
          setProducts(res?.data?.data.products);
          // let samplearry = [];
          // res?.data?.data?.leads.forEach((item, index) => {
          //   samplearry.push(item.opportunity_id);
          // });
          // console.log("pushedd ", samplearry);

          // setOppurtunityid(samplearry);
        } else {
          console.log("Failed to load data !");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };
useEffect(() => {
    getallproduct();
  }, []);

  // const getData = (current, pageSize) => {
  //   return products?.slice((current - 1) * pageSize, current * pageSize);
  // };

  // const getallproduct = async () => {
  //   try {
  //     const allproducts = await PublicFetch.get(
  //       `${CRM_BASE_URL_SELLING}/product?startIndex=0&noOfItems=40`)
  //     console.log("all  are", allproducts.data?.data?.products[0]);
  //     setProducts(allproducts.data?.data);
  //   } catch (err) {
  //     console.log("error while getting the products: ", err);
  //   }
  // };

  // useEffect(() => {
  //   getallproduct();
  // }, []);
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
              onClick={() => setShowProductEditModal(true)}
              className="actionEdit m-0 p-0"
            >
              <FaEdit />
            </div>
            
            <Link to={`${ROUTES.PRODUCTDETAIL}/${index.product_id}`}>
              <div
                // onClick={() => setProductView(true)}
                className="actionView m-0 p-0"
              >
                <MdPageview  />
              </div>
            </Link>
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
      dataIndex: "product_name",
      key: "product_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.product_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
      width: "23%",
    },

    {
      title: "CODE",
      dataIndex: "product_code",
      key: "product_code",
      //   width: "23%",
      align: "center",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.product_code).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "CATEGORY",
      dataIndex: "product_category_id",
      key: "product_category_id",
      width: "14%",
      align: "center",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.product_category_id)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    // {
    //   title: "PARTY",
    //   dataIndex: "lead_status",
    //   key: "key",

    //   align: "center",
    // },
  ];
  return (
    <div>
      <div className="container-fluid lead_list my-3 py-3">
        <div>
          {/* {product listing starts section one} */}
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Products</h5>
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
            <div className="col-4 ">
              <Select
                allowClear
                showSearch
                style={{
                  width: "100%",
                  marginTop: "8px",
                  borderRadius: "5px",
                }}
                placeholder="Search by Code"
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
                <Select.Option value="Watch">watch</Select.Option>
                <Select.Option value="cookware">cookware</Select.Option>
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
                <Link to={ROUTES.PRODUCTCREATE}>
                  <span
                    style={{
                      color: "white",
                    }}
                  >
                    Add Product
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="datatable">
            <TableData
              // data={getData(current,numOfItems, pageSize)}
              data={products}
              //   data={data}
              columns={columns}
              custom_table_css="table_lead_list"
            />
            
          </div>
          <div className="d-flex py-2 justify-content-center">
            {/* <MyPagination
              total={data.length}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            /> */}
          </div>
          {/* {"mcncncncncncncnc"}  {product listing ends } */}
        </div>
        {/* {section Two Product Edit modal starts} */}
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
                        value={numOfItems}
                          onChange={(e)=>
                            setNumOfItems(e)
                          }
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
        </CustomModel>
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

export default Productlist;
