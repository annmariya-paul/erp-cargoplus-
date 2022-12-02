// import { Button } from "antd";
import {  Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { Checkbox, Col, Row } from "antd";
import InputType from "../../../../components/Input Type textbox/InputType";
import { FaEdit } from "react-icons/fa";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { FiEdit } from "react-icons/fi";

import { MdDelete, MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { Form } from "antd";
import ProductEditModal from "../../Selling/Product/ProductEditModal";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";
// import Custom_model from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import FileUpload from "../../../../components/fileupload/fileUploader";
import logo from "../../../../components/img/logo192.png";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { ROUTES } from "../../../../routes";
import Item from "antd/lib/list/Item";
import SelectBox from "../../../../components/Select Box/SelectBox";
function ProductDetails() {
  const { id } = useParams();
  console.log("iddddd",id);
  const [toggleState, setToggleState] = useState(1);
  const [modalOpportunity, setModalOpportunity] = useState(false);
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
  const [brand, setBrand] = useState();
  const [varname, setvarname] = useState();
  console.log("varname",varname);

  const [varcode, setvarcode] = useState();
  console.log("varcode",varcode);
  const [varpic, setvarpic] = useState();
  const [ImageUpload, setImageUpload] = useState();

  // const [unit, setUnit] = useState("");
  const [varquantity, setvarquantity] = useState();
  const [varminprice, setvarminprice] = useState();
  const [varmaxprice, setvarmaxprice] = useState();
  const [vartaxrate, setvartaxrate] = useState();
  const [vardescription, setvardescription] = useState();

  const [varients, setVarients] = useState([]);
  console.log("Varrrrrrrients",varients);
 
  const [unit, setUnit] = useState("");
  const [attributes, setAttributes] = useState();
  const [allunit, setAllunit] = useState();
  const [brands, setBrands] = useState();
  const [addForm] = Form.useForm();
  // console.log("attributes in state:", prattributes);

  const [prcode, setPrcode] = useState();
  const [prcategory, setPrCategory] = useState();
  const [prbrand, setPrBrand] = useState();
  const [prunit, setPrUnit] = useState();
  const [prattributes, setPrAttributes] = useState();

  const [setProductDescription, setPrDescription] = useState();
  const [primage, setPrImage] = useState();
 const [img, setImg] = useState([]);
  console.log("set image", img);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [BrandViewpopup, setBrandViewPopup] = useState(false);
  console.log("set image", img);
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
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
  const [varientImg,setvarientInput]=useState();
  const [BrandEditPopup, setBrandEditPopup] = useState(false);
  const [singleVariant, setSingleVariant] = useState();
  const [allprList, setAllPrList] = useState();//state for all products
 const [varID,setvarID]=useState();
 console.log("varID ",varID);

  const handleUpdate = (e) => {
    console.log("edit data", e);
    const formData = new FormData();
    formData.append("variant_name", varname);
    // formData.append("variant_id", varID);
    formData.append("variant_product_id", varproid);
    // formData.append("variant_name", varname);
   
    if (ImageUpload && ImageUpload !== 0) 
      // if(ImageUpload)
      {
        formData.append("variant_pic", ImageUpload);
      }
     
    
    
    formData.append("variant_code", varcode);
    formData.append("variant_unit", unit);
    formData.append("variant_quantity", varquantity);
    formData.append("variant_price_min", varminprice);
    formData.append("variant_price_max", varmaxprice);
    formData.append("variant_taxrate", vartaxrate);
    formData.append("variant_description", vardescription);
   

    

    PublicFetch.patch(`${CRM_BASE_URL_SELLING}/variant/${varID}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          console.log("successDataa", res.data.data);
          getallvarients();
          setSuccessPopup(true);
          close_modal(successPopup, 1000);
          setBrandEditPopup(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setError(true);
      });
  };



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


  const getallbrand = async () => {
    try {
      const allbrands = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/brand`);
      console.log("all brands are", allbrands.data.data);
      setBrands(allbrands.data.data);
      // setbrandName()
    } catch (err) {
      console.log("error while getting the brands: ", err);
    }
  };

  useEffect(() => {
    getallbrand();
  }, []);

  const getallvarients = async () => {
    try {
      const allvarients= await PublicFetch.get(`${CRM_BASE_URL_SELLING}/variant?startIndex=0&noOfItems=40`);
      console.log("vvvvvvvvvvvvvv", allvarients?.data?.data?.variants);
      setVarients(allvarients?.data?.data?.variants);
      // setbrandName()
    } catch (err) {
      console.log("error while getting the brands: ", err);
    }
  };

  useEffect(() => {
    getallvarients();
  }, []);

  const getallunits = async () => {
    try {
      const allunits = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/unit`);
      console.log("all units are ::", allunits?.data?.data);

      // if(allunits?.data.success){}
      setAllunit(allunits?.data?.data);
      // setunitTable(allunits?.data?.data)
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  useEffect(() => {
    getallunits();
  }, []);


  const getallattributes = async () => {
    try {
      const allattributes = await PublicFetch.get(
        `${CRM_BASE_URL_SELLING}/attribute`
      );
      console.log("getting all attributes", allattributes.data.data);
      setAttributes(allattributes.data.data);
    } catch (err) {
      console.log("error to fetching  attributes", err);
    }
  };

  useEffect(() => {
    getallattributes();
  }, []);


  const handleViewData = (e) => {
    console.log("view data", e);
    setvarID(e.variant_id);
    setvarProid(e.variant_product_id);
    setvarname(e.variant_name);
    setvarcode(e.variant_code);
    setvarientInput(e.variant_pic);
    setUnit(e.variant_unit);
    setvarquantity(e.variant_quantity); 
    setvarminprice(e.variant_price_min);
    setvarmaxprice(e.variant_price_max);
    setvartaxrate(e.variant_taxrate);
    setvardescription(e.variant_description);
   
    setBrandViewPopup(true);
  };
  // const getallvarients = () => {
  //   console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDd");
  //   PublicFetch.get(`${CRM_BASE_URL_SELLING}/variant?startIndex=0&noOfItems=40`)
  //     .then((res) => {
  //       if (res?.data?.success) {
  //         console.log("All product varients success::: ", res?.data?.data);
  //         setVarients(res?.data?.data.varients);
  //         // let samplearry = [];
  //         // res?.data?.data?.leads.forEach((item, index) => {
  //         //   samplearry.push(item.opportunity_id);
  //         // });
  //         // console.log("pushedd ", samplearry);

  //         // setOppurtunityid(samplearry);
  //       } else {
  //         console.log("Failed to load data !");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Errror while getting data", err);
  //     });
  // };
  // useEffect(() => {
  //   getallvarients();
  // }, []);

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

  const newValues = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };
  const [editForm] = Form.useForm();
  const [varproid,setvarProid]=useState();

  const handleEditPhase1 = (e) => {
    console.log("editPhase1", e);

    PublicFetch.get(`${CRM_BASE_URL_SELLING}/variant/${e}`)
      .then((res) => {
        console.log("single variant value", res);
        if (res.data.success) {
          setSingleVariant(res.data.data);
          setvarProid(res.data.data.variant_product_id)
          setvarname(res.data.data.variant_name);
          setvarcode(res.data.data.variant_code);
          setImageInput(res.data.data.variant_pic);
          setUnit(res.data.data.variant_unit);
          setvarquantity(res.data.data.variant_quantity); 
          setvarminprice(res.data.data.variant_price_min);
          setvarmaxprice(res.data.data.variant_price_max);
          setvartaxrate(res.data.data.variant_taxrate);
          setvardescription(res.data.data.variant_description);
          setBrandEditPopup(true);
          setBrandViewPopup(false);
        }
      })
      .catch((err) => {
        console.log("error formed", err);
      });
  };
  const [ImageInput, setImageInput] = useState();

  const handleEditPhase2 = (e) => {
    console.log("editPhase2", e);
    // setvarID(e.variant_id)
    setvarID(e.variant_id);
    setvarProid(e.variant_product_id);
    setvarname(e.variant_name);
    setvarcode(e.variant_code);
    setImageInput(e.variant_pic);
    setUnit(e.variant_unit);
    setvarquantity(e.variant_quantity); 
    setvarminprice(e.variant_price_min);
    setvarmaxprice(e.variant_price_max);
    setvartaxrate(e.variant_taxrate);
    setvardescription(e.variant_description);
    // editForm.setFieldsValue({
    //   varID:e.variant_id,
    //   varproid:e.variant_product_id,
    //   varname:e.variant_name,
    //   varcode:e.variant_code,
    //   ImageInput:e.variant_pic,
    //   unit:e.variant_unit,
    //   varquantity:e.variant_quantity, 
    //   varminprice:e.variant_price_min,
    //   varmaxprice:e.variant_price_max,
    //   vartaxrate:e.variant_taxrate,
    //   vardescription:e.variant_description,
   
    // });

    setBrandEditPopup(true);
  };

  // {columns is product listing table componenet }

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "14%",
      render: (data, index) => {
        console.log("indexxx",index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <div
          onClick={() => handleEditPhase2(index)}
              className="actionEdit m-0 p-0"
            >
              <FaEdit />
            </div>
            <div
               onClick={() => handleViewData(index)}
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
      key: "IMAGE",
      width: "15%",

      align: "center",
      render: (theImageURL, records) => (
        <img alt={logo} src={logo} height="20px" width={"20px"} />
      ),
    },
    {
      title: "NAME",
      dataIndex: "variant_name",
      key: "NAME",
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
      dataIndex: "variant_code",
      key: "CODE",
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
      dataIndex: "variant_unit",
      key: "UNIT",
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
      dataIndex: "variant_quantity",
      key: "QUANTITY",

      align: "center",
    },
    {
      title: "TAX RATE",
      dataIndex: "variant_taxrate",
      key: "TAX RATE",
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
                       onClick={() => setModalOpportunity(true)}
                    >
                      
                        
                        Edit <FiEdit fontSize={"12px"} />
                     
                    </Button>
                    <ProductEditModal
                      show={modalOpportunity}
                      onHide={() => setModalOpportunity(false)}
                      style="width:1250px"
                      
                    />
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
                      {/* <Leadlist_Icons /> */}
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
                          <Link to={`${ROUTES.PRODUCTVARIENTS}/${id}`}>
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
                        // data={getData(current, pageSize)}
                        data={varients}
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
      <Custom_model
        destroyOnClose={true}
        bodyStyle={{ height: 550, overflowY: "auto" }}
        width={800}
            show={BrandViewpopup}
            onHide={() => setBrandViewPopup(false)}
            View_list
            list_content={
              <>
                <div className="container-fluid px-4 my-4">
                  <div className="d-flex justify-content-between">
                    <h5 className="lead_text">Product Variants</h5>
                    <div className="">
                      <Button
                        style={{ backgroundColor: "white", color: "#0092ce" }}
                      >
                        <span
                          className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                          style={{ fontSize: "13px" }}
                          onClick={() => {
                            handleEditPhase1(varID);
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
                        src={`${process.env.REACT_APP_BASE_URL}/${varientImg}`}
                        // alt={logo}
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
                          <p className="modal_view_p_sub">{varname}</p>
                        </div>
                      </div>
                      <div className="row mt-4">
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
                          <p className="modal_view_p_sub">{varcode}</p>
                        </div>
                      </div>
                      <div className="row mt-4">
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
                          <p className="modal_view_p_sub">{unit}</p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-5">
                          <p
                            style={{ color: "#000" }}
                            className="modal_view_p_style"
                          >
                            Quantity
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">{varquantity}</p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-5">
                          <p
                            style={{ color: "#000" }}
                            className="modal_view_p_style"
                          >
                            MinPrice
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">{varminprice}</p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-5">
                          <p
                            style={{ color: "#000" }}
                            className="modal_view_p_style"
                          >
                            Max Price
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">{varmaxprice}</p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-5">
                          <p
                            style={{ color: "#000" }}
                            className="modal_view_p_style"
                          >
                            Tax Rate
                          </p>
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-6 justify-content-start">
                          <p className="modal_view_p_sub">{vartaxrate}</p>
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
                          <p className="modal_view_p_sub">{vardescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          />
      <Custom_model
      bodyStyle={{ height: 550, overflowY: "auto" }}
        width={800}
        show={BrandEditPopup}
        onHide={() => setBrandEditPopup(false)}
        View_list
        list_content={
          <div> 
            {/* <Form
          form={editForm}
          onFinish={(values) => {
            console.log("values iss", values);
          
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        > */}
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Product Variants</h5>
              </div>
              <div className="row my-3 ">
                {/* <Form onFinish={handleUpdate}> */}
                <div className="col-4">
                  <p>Name</p>

                 
                    {/* <Form.Item
                      name="varname"
                      type="text"
                     
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                          message: "Please enter a Valid Varient Name",
                        },

                        {
                          whitespace: true,
                        },
                        {
                          min: 2,
                        },
                        {
                          max:100,
                        },
                      ]}
                     > */}
                     <InputType
                     type="text"
                  
                      value={varname} 
                      onChange={(e) => {
                        console.log("eeeeeeee",e.target.value);
                        setvarname(e.target.value);
                      }}/>
                      {/* </Form.Item> */}
                
                      
                </div>
                
                <div className="col-4">
                  <p>Variant Code</p>
                  {/* <Form.Item
      set                name="BrandName"
                      rules={{ required: true, message: "Please enter name" }}
                    > */}
                  <InputType
                    type="text"
                    // rules={{ required: true, message: "Please enter name" }}
                    className="input_type_style w-100"
                    value={varcode}
                    onChange={(e) => {
                      setvarcode(e.target.value);
                    }}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-4">
                  <p>Quantity</p>
                  {/* <Form.Item
      set                name="BrandName"
                      rules={{ required: true, message: "Please enter name" }}
                    > */}
                  <InputType
                    type="text"
                    // rules={{ required: true, message: "Please enter name" }}
                    className="input_type_style w-100"
                    value={varquantity}
                    onChange={(e) => {
                      setvarquantity(e.target.value);
                    }}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-4">
                  <p>Minimum Price</p>
                  {/* <Form.Item
      set                name="BrandName"
                      rules={{ required: true, message: "Please enter name" }}
                    > */}
                  <InputType
                    type="text"
                    // rules={{ required: true, message: "Please enter name" }}
                    className="input_type_style w-100"
                    value={varminprice}
                    onChange={(e) => {
                      setvarminprice(e.target.value);
                    }}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-4">
                  <p>Maximum Price</p>
                  {/* <Form.Item
      set                name="BrandName"
                      rules={{ required: true, message: "Please enter name" }}
                    > */}
                  <InputType
                    type="text"
                    // rules={{ required: true, message: "Please enter name" }}
                    className="input_type_style w-100"
                    value={varmaxprice}
                    onChange={(e) => {
                      setvarmaxprice(e.target.value);
                    }}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-4">
                  <p>Unit</p>
                  {/* <Form.Item name="description"> */}
                                            
                  <SelectBox
                        placeholder={"--Please Select--"}
                        value={unit}
                        onChange={(e) => {
                        
                        setUnit(parseInt(e))}}
                      >
                        {allunit &&
                          allunit.length > 0 &&
                          allunit.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.unit_id}
                                value={item.unit_id}
                              >
                                {item.unit_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>

                 
                  {/* </Form.Item> */}
                </div>
                <div className="col-4">
                       
                  <p>Tax Rate</p>
                  {/* <Form.Item
      set                name="BrandName"
                      rules={{ required: true, message: "Please enter name" }}
                    > */}
                  <InputType
                    type="text"
                    // rules={{ required: true, message: "Please enter name" }}
                    className="input_type_style w-100"
                    value={vartaxrate}
                    onChange={(e) => {
                      setvartaxrate(e.target.value);
                    }}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-8">
                  <p>Description</p>
                  {/* <Form.Item name="description"> */}
                  <TextArea
                    value={vardescription}
                    className="input_type_style w-100"
                    onChange={(e) => {
                      setvardescription(e.target.value);
                    }}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-12">
                <p>Display Picture</p>

                  {/* <Form.Item name="image"> */}
                  <FileUpload
                    multiple
                    height={150}
                    listType="picture"
                    accept=".png,.jpg,.jpeg"
                    beforeUpload={false}
                    onChange={(file) => {
                      console.log("Before upload", file.file);
                      console.log("Before upload file size", file.file.size);

                      if (file.file.size > 1000 && file.file.size < 50000) {
                        setImageUpload(file.file.originFileObj);
                        console.log(
                          "image grater than 1 kb and less than 50 kb"
                        );
                      } else {
                        console.log("hgrtryyryr");
                      }
                    }}
                  />
                  {/* </Form.Item> */}
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${ImageInput}`}
                    height="40px"
                    width={"40px"}
                  />
                </div>
              
                <div className="col-12 d-flex justify-content-center mt-5">
                  <Button
                    onClick={() => {
                      // setSuccessPopup(true);
                      // setBrandEditPopup(false);

                      handleUpdate();
                    }}
                    className="save_button"
                  >
                    Save
                  </Button>
                </div>
                {/* </Form> */}
              </div>
              {error ? (
                <div className="">
                  <ErrorMsg code={"400"} />
                </div>
              ) : (
                ""
              )}
            </div>
            {/* </Form> */}
          </div>
        }
      />
    
      <Custom_model
      
        size={"sm"}
        // show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </div>
  );
}

export default ProductDetails;
