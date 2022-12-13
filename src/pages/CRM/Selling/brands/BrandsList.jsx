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
import { Input, Select, message, Checkbox, Form } from "antd";

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
import Custom_model from "../../../../components/custom_modal/custom_model";
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
  const [brands, setBrands] = useState([]);
  console.log("ddddddddd", brands);
  const [brandName, setBrandName] = useState();
  const [BrandImg, setBrandImg] = useState();
  const [brand_id, setBrand_id] = useState();
  const [description, setDescription] = useState();
  const [singleBrand, setSingleBrand] = useState();
  const [NameInput, setNameInput] = useState();
  const [DescriptionInput, setDescriptionInput] = useState();
  const [ImageInput, setImageInput] = useState();
  const [ImageUpload, setImageUpload] = useState();
  const [editForm] = Form.useForm();
  const [Errormsg, setErrormsg] = useState();

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

  const data12 = brands?.map((item) => [
    item.action,
    item.brand_pic,
    item.brand_name,
    item.brand_description,
  ]);
  // console.log("sssssssss",data12);

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
          setBrandViewPopup(false);
          handleEditPhase2(res.data.data);
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
    editForm.setFieldsValue({
      brand_id: e.brand_id,
      NameInput: e.brand_name,
      DescriptionInput: e.brand_description,
      ImageInput: e.brand_pic,
    });
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
        } else {
          setErrormsg(res.data.data);
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

  // {columns is brand listing table componenet }

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
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
      key: "IMAGE",
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
      key: "NAME",
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
      key: "DESCRIPTION",
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

  //for show or hide colums start--Shahida
  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  const BrandHeads = [
    ["brand_id", "brand_name", "brand_pic", "brand_description"],
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
              <Leadlist_Icons
                datas={brands}
                columns={filteredColumns}
                items={data12}
                xlheading={BrandHeads}
                filename="data.csv"
                chechboxes={
                  <Checkbox.Group onChange={onChange} value={selectedColumns}>
                    {columnsKeys.map((column) => (
                      <li>
                        <Checkbox value={column} key={column}>
                          {column}
                        </Checkbox>
                      </li>
                    ))}
                  </Checkbox.Group>
                }
              />
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
                  onChange={(e) => {
                    // console.log("hfcjd" , e, )
                    setPageSize(e);
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
                columns={filteredColumns}
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

          <Custom_model
            bodyStyle={{ height: 620, overflowY: "auto" }}
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
                        btnType="add_borderless"
                        className="edit_button"
                        onClick={() => {
                          handleEditPhase1(brand_id);
                        }}
                      >
                        Edit
                        <FiEdit
                          style={{ marginBottom: "4px", marginInline: "3px" }}
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col-12 d-flex justify-content-center ">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${BrandImg}`}
                        // alt={logo}
                        style={{ height: "100px", width: "100px" }}
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
      <Custom_model
        bodyStyle={{ height: 550, overflowY: "auto" }}
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
                <Form
                  form={editForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                    handleUpdate();
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="col-6">
                    <label>Name</label>
                    <Form.Item
                      name="NameInput"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Brand Name",
                        },
                        {
                          min: 2,
                          message: "Name must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message: "Name cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        className="input_type_style w-100"
                        value={NameInput}
                        onChange={(e) => {
                          setNameInput(e.target.value);
                          setErrormsg("");
                        }}
                      />
                    </Form.Item>
                    {Errormsg ? (
                      <label style={{ color: "red" }}>{Errormsg}</label>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-6 my-2">
                    <label>Description</label>
                    <Form.Item
                      name="DescriptionInput"
                      rules={[
                        {
                          min: 5,
                          message: "Description must be at least 5 characters",
                        },
                        {
                          max: 500,
                          message:
                            "Description cannot be longer than 500 characters",
                        },
                      ]}
                    >
                      <TextArea
                        value={DescriptionInput}
                        className="input_type_style w-100"
                        onChange={(e) => {
                          setDescriptionInput(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 my-3">
                    <Form.Item name="ImageUpload">
                      <FileUpload
                        multiple
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
                            file.file.size > 1000 &&
                            file.file.size < 500000
                          ) {
                            setImageUpload(file.file.originFileObj);
                            console.log(
                              "Image must be greater than 1 kb and less than 500 kb"
                            );
                          } else {
                            console.log("hgrtryyryr");
                          }
                        }}
                      />
                    </Form.Item>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${ImageInput}`}
                      height="40px"
                      width={"40px"}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-5">
                    <Button className="save_button">Save</Button>
                  </div>
                </Form>
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
      <Custom_model
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </div>
  );
}

export default BrandsList;
