import { Input, Select } from "antd";
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
import ErrorMsg from "../../../../components/error/ErrorMessage";
import FileUpload from "../../../../components/fileupload/fileUploader";
import logo from "../../../../components/img/logo192.png";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { ROUTES } from "../../../../routes";
import SelectBox from "../../../../components/Select Box/SelectBox";

//page created -- shahida
function ProductDetails() {
  const { id } = useParams();
  const [toggleState, setToggleState] = useState(1);
  const [modalOpportunity, setModalOpportunity] = useState(false);
  const [pageSize, setPageSize] = useState("25"); // page size
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //search by type select box
  const [searchStatus, setSearchStatus] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [prname, setPrName] = useState();
  const [varname, setvarname] = useState();
  const [varcode, setvarcode] = useState();
  const [ImageUpload, setImageUpload] = useState();
  const [varquantity, setvarquantity] = useState();
  const [varminprice, setvarminprice] = useState();
  const [varmaxprice, setvarmaxprice] = useState();
  const [vartaxrate, setvartaxrate] = useState();
  const [vardescription, setvardescription] = useState();
  const [varients, setVarients] = useState([]);
  const [unit, setUnit] = useState("");
  const [attributes, setAttributes] = useState();
  const [allunit, setAllunit] = useState();
  const [brands, setBrands] = useState();
  const [addForm] = Form.useForm();
  const [prcode, setPrcode] = useState();
  const [prcategory, setPrCategory] = useState();
  const [prbrand, setPrBrand] = useState();
  const [prunit, setPrUnit] = useState();
  const [prattributes, setPrAttributes] = useState();
  const [setProductDescription, setPrDescription] = useState();
  const [primage, setPrImage] = useState();
  const [BrandViewpopup, setBrandViewPopup] = useState(false);
  const [varientImg, setvarientInput] = useState();
  const [BrandEditPopup, setBrandEditPopup] = useState(false);
  const [singleVariant, setSingleVariant] = useState();
  const [allprList, setAllPrList] = useState(); //state for all products
  const [attributes11, setAttributes11] = useState();
  const [varID, setvarID] = useState();
  const [brands11, setBands11] = useState();
  const [category11, setCategory11] = useState();
  const [unit11, setUnit11] = useState();
  const [editForm] = Form.useForm();
  const [varproid, setvarProid] = useState();
  const [varientArray, setVarientsArray] = useState();
  const [imageSize, setImageSize] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const data = [];
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };
  //update product variants--shahida 1.12.22
  const handleUpdate = (e) => {
    console.log("edit data", e);
    const formData = new FormData();
    formData.append("variant_name", varname);
    formData.append("variant_product_id", varproid);
    if (ImageUpload) {
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
          close_modal(successPopup, 1200);
          setBrandEditPopup(false);
          setvarname("");
          setvarProid("");
          setImageUpload("");
          setvarcode("");
          setUnit11("");
          setvarquantity("");
          setvarminprice("");
          setvarmaxprice("");
          setvartaxrate("");
          setvardescription("");
          setSuccessPopup(true);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setError(true);
      });
  };
  // API call for get one product
  const GetAllProductData = () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/product/${id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("test message", res?.data?.data);
          setAllPrList(res.data.data);
          setPrName(res?.data?.data?.product_name);
          setPrcode(res?.data?.data?.product_code);
          setPrCategory(res?.data?.data?.product_category_id);
          setPrBrand(res?.data?.data?.product_brand_id);
          setPrUnit(res?.data?.data?.product_unit_id);
          setPrAttributes(res?.data?.data?.product_attributes);
          setPrDescription(res?.data?.data?.product_description);
          setPrImage(res?.data?.data?.product_pic);
          setAttributes11(res.data.data.crm_v1_attributes);
          setBands11(res.data.data.crm_v1_brands);
          setCategory11(res.data.data.crm_v1_categories);
          setUnit11(res.data.data.crm_v1_units);
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
    getallbrand();
    getallvarients();
    getallunits();
    getallattributes();
  }, []);
  // API call for get all brands
  const getallbrand = async () => {
    try {
      const allbrands = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/brand`);
      console.log("all brands are", allbrands.data.data);
      setBrands(allbrands.data.data);
    } catch (err) {
      console.log("error while getting the brands: ", err);
    }
  };
  // API call for get all varients
  const getallvarients = async () => {
    try {
      const allvarients = await PublicFetch.get(
        `${CRM_BASE_URL_SELLING}/variant?startIndex=0&noOfItems=40`
      );
      setVarients(allvarients?.data?.data?.variants);
      console.log("All varient dataa, ", allvarients.data.data);
      let array = [];
      allvarients?.data?.data?.variants.forEach((item, index) => {
        let tempArr = [];
        if (item.variant_pic !== null) {
          tempArr.push(item.variant_pic);
        } else {
          tempArr.push("");
        }
        array.push({
          variant_id: item?.variant_id,
          variant_product_id: item?.variant_product_id,
          variant_name: item?.variant_name,
          variant_code: item?.variant_code,
          variant_unit: item?.crm_v1_units.unit_name,
          variant_quantity: item?.variant_quantity,
          variant_price_min: item?.variant_price_min,
          variant_price_max: item?.variant_price_max,
          variant_taxrate: item?.variant_taxrate,
          variant_description: item?.variant_description,
          variant_pic: tempArr,
        });
      });
      setVarientsArray(array);
    } catch (err) {
      console.log("error while getting the brands: ", err);
    }
  };

  // API call for get all units

  const getallunits = async () => {
    try {
      const allunits = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/unit`);
      setAllunit(allunits?.data?.data);
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };
  // API call for get all attributes
  const getallattributes = async () => {
    try {
      const allattributes = await PublicFetch.get(
        `${CRM_BASE_URL_SELLING}/attribute`
      );
      setAttributes(allattributes.data.data);
    } catch (err) {
      console.log("error to fetching  attributes", err);
    }
  };
  //view single product variant
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

  //edit product variant from view modal
  const handleEditPhase1 = (e) => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/variant/${e}`)
      .then((res) => {
        if (res.data.success) {
          setSingleVariant(res.data.data);
          setvarProid(res.data.data.variant_product_id);
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
          handleEditPhase2(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error formed", err);
      });
  };
  const [ImageInput, setImageInput] = useState();

  //Edit product varient from table
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
    editForm.setFieldsValue({
      varID: e.variant_id,
      varproid: e.variant_product_id,
      varname: e.variant_name,
      varcode: e.variant_code,
      ImageInput: e.variant_pic,
      unit: e.variant_unit,
      varquantity: e.variant_quantity,
      varminprice: e.variant_price_min,
      varmaxprice: e.variant_price_max,
      vartaxrate: e.variant_taxrate,
      vardescription: e.variant_description,
    });
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
        console.log("indexxx", index);
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
      dataIndex: "variant_pic",
      key: "IMAGE",
      width: "15%",

      align: "center",
      render: (theImageURL, records) => (
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${theImageURL}`}
          height="20px"
          width={"20px"}
        />
      ),
    },
    {
      title: "NAME",
      dataIndex: "variant_name",
      key: "NAME",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.variant_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_unit)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_quantity)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_taxrate)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
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
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.variant_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_unit)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_quantity)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_taxrate)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "UNIT",
      dataIndex: "variant_unit",
      key: "UNIT",
      width: "14%",
      align: "center",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.variant_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_unit)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_quantity)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_taxrate)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "QUANTITY",
      dataIndex: "variant_quantity",
      key: "QUANTITY",
      align: "center",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.variant_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_unit)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_quantity)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_taxrate)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "TAX RATE",
      dataIndex: "variant_taxrate",
      key: "TAX RATE",
      align: "center",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.variant_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_unit)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_quantity)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.variant_taxrate)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
  ];

  return (
    <div>
      <div className="container-fluid">
        <div className="row bloc-tabs tabs-responsive">
          <div className="col-xl-2 col-sm-2 me-0  pe-1">
            <div className="">
              <button
                id="button-tabs"
                className={toggleState === 1 ? "tabs active-tabs " : "tabs "}
                onClick={() => toggleTab(1)}
              >
                Product Details
              </button>
            </div>
          </div>{" "}
          <div className="col-xl-2 col-sm-2 ms-0 ps-0 pe-1">
            <div className="">
              <button
                id="button-tabs"
                className={toggleState === 2 ? "tabs active-tabs " : "tabs "}
                onClick={() => toggleTab(2)}
              >
                Product Variants
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="container-fluid ps-4  py-3 shadow-sm">
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
                      btnType="add_borderless"
                      className="edit_button"
                      onClick={() => setModalOpportunity(true)}
                    >
                      Edit <FiEdit fontSize={"12px"} />
                    </Button>
                    <ProductEditModal
                      bodyStyle={{ height: 620, overflowY: "auto" }}
                      show={modalOpportunity}
                      onHide={() => setModalOpportunity(false)}
                      style="width:1250px"
                      prid={id}
                    />
                  </div>
                  <div className="row my-3">
                    <div className="col-12 d-flex justify-content-center ">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${primage}`}
                        // alt={logo}
                        style={{
                          height: "100px",
                          width: "100px",
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
                            {category11?.category_name}
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
                            {brands11?.brand_name}
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
                            {unit11?.unit_name}
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
                          {attributes11 &&
                            attributes11?.map((item, index) => {
                              return (
                                <p
                                  className="modal_view_p_sub"
                                  key={item.attribute_id}
                                >
                                  {item?.attribute_name}
                                </p>
                              );
                            })}
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
                      {/* <Leadlist_Icons /> */}
                    </div>
                    <div
                      className="row py-1"
                      style={
                        {
                          // backgroundColor: "#f4f4f7",
                        }
                      }
                    >
                      <div className="col-4">
                        <h5 className="lead_text">Product Variants</h5>
                      </div>
                      <div className="col-4">
                        <Input.Search
                          className="inputSearch"
                          placeholder="Search by Name"
                          style={{
                            // margin: "5px",
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
                      <div className="col-4"></div>
                      {/* <div className="col-4 ">
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
                      </div> */}
                      {/* <div className="col-4 ">
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
                      </div> */}
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
                        data={varientArray}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Custom_model
        destroyOnClose={true}
        bodyStyle={{ height: 610, overflowY: "auto" }}
        width={700}
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
                    btnType="add_borderless"
                    className="edit_button"
                    onClick={() => {
                      handleEditPhase1(varID);
                    }}
                  >
                    Edit
                    <FiEdit
                      style={{ marginBottom: "4px", marginInline: "3px" }}
                    />
                  </Button>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-12 d-flex justify-content-center ">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${varientImg}`}
                    style={{ height: "90px", width: "90px" }}
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
                      <p className="modal_view_p_sub">{varcode}</p>
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
                      <p className="modal_view_p_sub">{unit}</p>
                    </div>
                  </div>
                  <div className="row mt-2">
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
                  <div className="row mt-2">
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
                  <div className="row mt-2">
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
                  <div className="row mt-2">
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
                      <p className="modal_view_p_sub">{vardescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />

      {/* # validation - Ann mariya (13/12/22) */}
      <Custom_model
        bodyStyle={{ height: 550, overflowY: "auto" }}
        width={800}
        show={BrandEditPopup}
        onHide={() => setBrandEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4">
              <div>
                <h5 className="lead_text">Edit Product Variants</h5>
              </div>
              <Form
                name="editForm"
                form={editForm}
                onFinish={(value) => {
                  console.log("valuess in edit varients", value);
                  handleUpdate();
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row my-4 ">
                  <div className="col-4">
                    <label>Name</label>
                    <Form.Item
                      name="varname"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Varient Name",
                        },
                        {
                          min: 2,
                          message: "Varient Name must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message:
                            "Varient Name cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        type="text"
                        value={varname}
                        onChange={(e) => {
                          setvarname(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-4">
                    <label>Variant Code</label>
                    <Form.Item
                      name="varcode"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Varient code",
                        },
                      ]}
                    >
                      <InputType
                        type="text"
                        className="input_type_style w-100"
                        value={varcode}
                        onChange={(e) => {
                          setvarcode(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-4">
                    <label>Unit</label>
                    <Form.Item
                      name="unit"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a Unit",
                        },
                      ]}
                    >
                      <SelectBox
                        placeholder={"--Please Select--"}
                        value={unit}
                        onChange={(e) => {
                          setUnit(parseInt(e));
                        }}
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
                    </Form.Item>
                  </div>

                  <div className="col-4">
                    <label>Quantity</label>
                    <Form.Item
                      name="varquantity"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(
                            "^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                          ),
                          message: "Please enter a valid Quantity",
                        },
                      ]}
                    >
                      <InputType
                        type="text"
                        className="input_type_style w-100"
                        value={varquantity}
                        onChange={(e) => {
                          setvarquantity(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-4">
                    <label>Tax Rate</label>
                    <Form.Item
                      name="vartaxrate"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^([1-9]+0|[1-9])[0-9]*$"),
                          message: "Please enter a valid Tax Rate",
                        },
                      ]}
                    >
                      <InputType
                        type="text"
                        className="input_type_style w-100"
                        value={vartaxrate}
                        onChange={(e) => {
                          setvartaxrate(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-4">
                    <label>Price Minimum</label>
                    <Form.Item
                      name="varminprice"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^([1-9]+0|[1-9])[0-9]*$"),
                          message: "Please enter Minimum Price",
                        },
                      ]}
                    >
                      <InputType
                        type="text"
                        className="input_type_style w-100"
                        value={varminprice}
                        onChange={(e) => {
                          setvarminprice(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-4">
                    <label>Price Maximum</label>
                    <Form.Item
                      name="varmaxprice"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^([1-9]+0|[1-9])[0-9]*$"),
                          message: "Please enter Maximum Price",
                        },
                      ]}
                    >
                      <InputType
                        type="text"
                        className="input_type_style w-100"
                        value={varmaxprice}
                        onChange={(e) => {
                          setvarmaxprice(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-8">
                    <label>Description</label>
                    <Form.Item
                      className="mt-2"
                      name="description"
                      rules={[
                        {
                          min: 2,
                          message: "Description must be at least 2 characters",
                        },
                        {
                          max: 500,
                          message:
                            "Description cannot be longer than 500 characters",
                        },
                      ]}
                    >
                      <TextArea
                        value={vardescription}
                        className="input_type_style w-100"
                        onChange={(e) => {
                          setvardescription(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-12">
                    <label>Display Picture</label>
                    <Form.Item name="ImageUpload">
                      <FileUpload
                        multiple
                        height={150}
                        listType="picture"
                        accept=".png,.jpg,.jpeg"
                        beforeUpload={false}
                        onChange={(file) => {
                          console.log("Before upload", file.file);
                          console.log(
                            "Before upload file size",
                            file.file.size
                          );

                          if (
                            file.file.size > 2000 &&
                            file.file.size < 500000
                          ) {
                            setImageUpload(file.file.originFileObj);
                            setImageSize(false);
                          } else {
                            setImageSize(true);
                            console.log(
                              "Error in image upload, upload image size between 2 kb and  500 kb"
                            );
                          }
                        }}
                      />
                      {imageSize ? (
                        <p style={{ color: "red" }}>
                          Upload Image size between 2 kb and 500 kb
                        </p>
                      ) : (
                        ""
                      )}
                    </Form.Item>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${ImageInput}`}
                      height="40px"
                      width={"40px"}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-center mt-5">
                    <Button
                      onClick={() => {
                        handleUpdate();
                      }}
                      className="save_button"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
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

      <Custom_model
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </div>
  );
}

export default ProductDetails;
