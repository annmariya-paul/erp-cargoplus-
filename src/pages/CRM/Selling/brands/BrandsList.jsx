import React, { useEffect, useState } from "react";
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
import { Input, Select, Pagination, Form } from "antd";

import "../../lead/lead_list/leadlist.scss";

// import CustomModel from "../../components/custom_modal/custom_model";

import "../../../opportunity_ List/opportunitylist.scss";
// import { BsPlusCircleFill } from "react-icons/bs";

// import { Route } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Form } from "react-bootstrap";

import { Link } from "react-router-dom";

import logo from "../../../../components/img/logo192.png";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import Button from "../../../../components/button/button";
import { ROUTES } from "../../../../routes";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import CustomModel from "../../../../components/custom_modal/custom_model";
import FileUpload from "../../../../components/fileupload/fileUploader";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";

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
  const [brands, setBrands] = useState();
  const [brandName, setBrandName] = useState();
  const [BrandImg, setBrandImg] = useState();
  const [brand_id, setBrand_id] = useState();
  const [description, setDescription] = useState();
  const [singleBrand, setSingleBrand] = useState();
  const [NameInput, setNameInput] = useState();
  const [DescriptionInput, setDescriptionInput] = useState();
  const [ImageInput, setImageInput] = useState();
  const [ImageUpload, setImageUpload] = useState();

  const getData = (current, pageSize) => {
    return brands?.slice((current - 1) * pageSize, current * pageSize);
  };

  const getallbrand = async () => {
    try {
      const allbrands = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/brand`);
      console.log("all brands are", allbrands.data.data);
      setBrands(allbrands.data.data);
    } catch (err) {
      console.log("error while getting the brands: ", err);
    }
  };

  useEffect(() => {
    getallbrand();
  }, []);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const handleViewData = (e) => {
    console.log("view data", e);

    setBrandName(e.brand_name);
    setBrandImg(e.brand_pic);
    setBrand_id(e.brand_id);
    setDescription(e.brand_description);
    setBrandViewPopup(true);
  };

  const handleEditPhase1 = (e) => {
    console.log("editPhase1", e);

    PublicFetch.get(`${CRM_BASE_URL_SELLING}/brand/${e}`)
      .then((res) => {
        console.log("single brand value", res);
        if (res.data.success) {
          setSingleBrand(res.data.data);
          setNameInput(res.data.data.brand_name);
          setDescriptionInput(res.data.data.brand_description);
          setBrand_id(res.data.data.brand_id);
          setImageInput(res.data.data.brand_pic);
          setBrandEditPopup(true);
          setBrandViewPopup(false);
        }
      })
      .catch((err) => {
        console.log("error formed", err);
      });
  };

  const handleEditPhase2 = (e) => {
    console.log("editPhase2", e);
    setNameInput(e.brand_name);
    setDescriptionInput(e.brand_description);
    setImageInput(e.brand_pic);
    setBrand_id(e.brand_id);
    setBrandEditPopup(true);
  };

  const handleUpdate = (e) => {
    console.log("edit data", e);
    const formData = new FormData();

    formData.append("brand_name", NameInput);
    if (ImageUpload && ImageUpload !== 0) {
      formData.append("brand_pic", ImageUpload);
    }
    formData.append("brand_description", DescriptionInput);

    PublicFetch.patch(`${CRM_BASE_URL_SELLING}/brand/${brand_id}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          console.log("successDataa", res.data.data);
          getallbrand();
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

  console.log("all view data", brandName, BrandImg, brand_id, description);
  console.log(
    "new view data",
    NameInput,
    ImageInput,
    brand_id,
    DescriptionInput
  );

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
          </div>
        );
      },
      align: "center",
    },
    {
      title: "IMAGE",
      dataIndex: "brand_pic",
      key: "brand_pic",
      width: "23%",
      // filteredValue: [searchStatus],
      // onFilter: (value, record) => {
      //   return String(record.lead_status)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },

      align: "center",
      render: (theImageURL, records) => (
        // console.log("image url", theImageURL);
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${theImageURL}`}
          height="20px"
          width={"20px"}
        />
      ),
    },
    {
      title: "NAME",
      dataIndex: "brand_name",
      key: "brand_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.brand_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
      width: "23%",
    },

    {
      title: "DESCRIPTION",
      dataIndex: "brand_description",
      key: "brand_description",
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
                total={brands?.length}
                current={current}
                showSizeChanger={true}
                pageSize={pageSize}
                onChange={(current, pageSize) => {
                  console.log("ggdhffs", current, pageSize);
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
                            handleEditPhase1(brand_id);
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
                        src={`${process.env.REACT_APP_BASE_URL}/${BrandImg}`}
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
                          <p className="modal_view_p_sub">{brandName}</p>
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
                          <p className="modal_view_p_sub">{description}</p>
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
        size={"xl"}
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
                {/* <Form onFinish={handleUpdate}> */}
                <div className="col-6">
                  <p>Name</p>
                  {/* <Form.Item
                      name="BrandName"
                      rules={{ required: true, message: "Please enter name" }}
                    > */}
                  <InputType
                    type="text"
                    // rules={{ required: true, message: "Please enter name" }}
                    className="input_type_style w-100"
                    value={NameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value);
                    }}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-6 my-2">
                  <p>Description</p>
                  {/* <Form.Item name="description"> */}
                  <TextArea
                    value={DescriptionInput}
                    className="input_type_style w-100"
                    onChange={(e) => {
                      setDescriptionInput(e.target.value);
                    }}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-12 my-3">
                  {/* <Form.Item name="image"> */}
                  <FileUpload
                    multiple
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
