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

import "../../../../pages/CRM/lead/opportunity_ List/opportunitylist.scss";
// import { BsPlusCircleFill } from "react-icons/bs";

// import { Route } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Form } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

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
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../../check Unique/CheckUnique";
import { type } from "@testing-library/user-event/dist/type";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function BrandsList() {
  const [addForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState("25"); // page size
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [modalAddBrand, setModalAddBrand] = useState(false);
  const [BrandEditPopup, setBrandEditPopup] = useState(false);
  const [BrandViewpopup, setBrandViewPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [img, setImg] = useState([]);
  const [imgSizeError, setImgSizeError] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [brand, setBrand] = useState();
  const [brands, setBrands] = useState([]);
  console.log("ddddddddd", brands);
  const [brandName, setBrandName] = useState();
  const [BrandImg, setBrandImg] = useState();
  const [brand_id, setBrand_id] = useState();
  const [description, setDescription] = useState("");
  const [singleBrand, setSingleBrand] = useState();
  const [NameInput, setNameInput] = useState();
  const [DescriptionInput, setDescriptionInput] = useState();
  const [ImageInput, setImageInput] = useState();
  const [ImageUpload, setImageUpload] = useState();
  const [editForm] = Form.useForm();
  const [Errormsg, setErrormsg] = useState();
  const [BrandError, setBrandError] = useState();
  const [uniqueCode, setuniqueCode] = useState(false);
  const [uniqueAddCode, setuniqueAddCode] = useState(false);
  const [brand_name, setBrand_name] = useState();

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

  const OnSubmit = () => {
    const formData = new FormData();

    formData.append("brand_pic", img);
    formData.append("brand_description", description);
    formData.append("brand_name", brand);

    PublicFetch.post(`${CRM_BASE_URL_SELLING}/brand`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000);
          setModalAddBrand(false);
          getallbrand();
        } else {
          console.log("", res.data.data);
          setBrandError(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setError(true);
      });
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
          setuniqueCode(false);
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
    setBrand_name(e.brand_name);
    editForm.setFieldsValue({
      brand_id: e.brand_id,
      NameInput: e.brand_name,
      DescriptionInput: e.brand_description,
      ImageInput: e.brand_pic,
    });
    setBrandEditPopup(true);
    setuniqueCode(false);
  };

  const handleUpdate = (e) => {
    console.log("edit data", e);
    const formData = new FormData();

    formData.append("brand_name", NameInput);

    if (ImageUpload) {
      formData.append("brand_pic", ImageUpload);
    }
    if (DescriptionInput) {
      formData.append("brand_description", DescriptionInput);
    }

    PublicFetch.patch(`${CRM_BASE_URL_SELLING}/brand/${brand_id}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          console.log("successDataa", res.data.data);
          getallbrand();
          setSuccessPopup(true);
          setImageUpload(null);
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
      title: "Sl. No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "IMAGE",
      dataIndex: "brand_pic",
      key: "IMAGE",
      width: "23%",
      align: "center",
      render: (theImageURL, records) =>
        // console.log("image url", theImageURL);
        {
          return theImageURL ? (
            <img
              src={`${process.env.REACT_APP_BASE_URL}/${theImageURL}`}
              height="20px"
              width={"20px"}
            />
          ) : (
            ""
          );
        },
    },
    {
      title: "NAME",
      dataIndex: "brand_name",
      key: "NAME",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.brand_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.brand_description)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
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
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "12%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center">
            <div onClick={() => handleEditPhase2(index)} className="actionEdit">
              <FaEdit />
            </div>
            <div onClick={() => handleViewData(index)} className="actionView">
              <MdPageview />
            </div>
          </div>
        );
      },
      align: "center",
    },
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

  const beforeUpload = (file, fileList) => {};

  return (
    <div>
      <div>
        <div className="container-fluid lead_list  my-3 py-3">
          {/* brand listing section One */}

          <div>
            <div className="row flex-wrap">
              <div className="col-4 pt-2">
                <h5 className="lead_text">Brands</h5>
              </div>
              <div className="col-4">
                <Input.Search
                  className="inputSearch"
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
              <div className="col-4 d-flex justify-content-end">
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
            </div>
            {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
              
            </div> */}
            <div className="row my-3">
              <div className="col-4  px-3">
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
              <div className="col-4 d-flex align-items-center justify-content-center">
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
              <div className="col-4  d-flex justify-content-end">
                <Button
                  onClick={() => setModalAddBrand(true)}
                  className="add_opportunity"
                >
                  {/* <Link to={ROUTES.BRANDCREATE}>
                    <span
                      style={{
                        color: "white",
                      }}
                    > */}
                  Add Brand
                  {/* </span> */}
                  {/* </Link> */}
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

          <Custom_model
            show={modalAddBrand}
            onHide={() => setModalAddBrand(false)}
            footer={false}
            View_list
            list_content={
              <>
                <div className="row">
                  <h5 className="lead_text">Add Brand</h5>
                </div>
                <Form
                  name="addForm"
                  form={addForm}
                  onFinish={(value) => {
                    console.log("values111333", value);
                    OnSubmit();
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row py-4">
                    <div className="col-12 pt-1">
                      <label>Name</label>
                      <div>
                        <Form.Item
                          name="brandName"
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
                              message:
                                "Name cannot be longer than 100 characters",
                            },
                          ]}
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          <InputType
                            value={brand}
                            onChange={(e) => {
                              setBrand(e.target.value);
                              setBrandError("");
                              setuniqueAddCode(false);
                            }}
                            onBlur={async () => {
                              let a = await CheckUnique({
                                type: "brandname",
                                value: brand,
                              });
                              setuniqueAddCode(a);
                            }}
                          />
                        </Form.Item>
                        {uniqueAddCode ? (
                          <div>
                            <label style={{ color: "red" }}>
                              Brand Name {UniqueErrorMsg.UniqueErrName}
                            </label>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <label>Description</label>
                      <div>
                        <Form.Item
                          name="description"
                          rules={[
                            {
                              min: 2,
                              message:
                                "Description must be at least 2 characters",
                            },
                            {
                              max: 500,
                              message:
                                "Description cannot be longer than 500 characters",
                            },
                          ]}
                        >
                          <TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-12">
                      <label>Display Picture</label>
                      <Form.Item name="new">
                        <FileUpload
                          multiple={false}
                          listType="picture"
                          accept=".png,.jpg,.jpeg"
                          height={100}
                          // onPreview={handlePreview}
                          beforeUpload={beforeUpload}
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
                              setImg(file.file.originFileObj);
                              setImgSizeError(false);
                              console.log(
                                "Image must be greater than 1 kb and less than 500 kb"
                              );
                            } else {
                              console.log("failed beacuse of large size");
                              setImgSizeError(true);
                            }
                          }}
                        />
                      </Form.Item>
                      {imgSizeError ? (
                        <div>
                          <label style={{ color: "red" }}>
                            Please Select Image Size under 500kb
                          </label>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12 d-flex justify-content-center gap-2 mt-5 pt-4">
                      <Button className="save_button">Save</Button>
                      <Button
                        btnType="cancel"
                        onClick={() => {
                          setModalAddBrand(false);
                        }}
                      >
                        cancel
                      </Button>
                    </div>
                  </div>
                </Form>
              </>
            }
          />
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
        bodyStyle={{ height: 580, overflowY: "auto" }}
        size={"xl"}
        show={BrandEditPopup}
        onHide={() => {
          setBrandEditPopup(false);
        }}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Edit Brand</h5>
            </div>

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
              <div className="row py-4">
                <div className="col-12">
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
                        setuniqueCode(false);
                      }}
                      onBlur={async () => {
                        if (NameInput !== brand_name) {
                          let a = await CheckUnique({
                            type: "brandname",
                            value: NameInput,
                          });
                          setuniqueCode(a);
                        }
                      }}
                    />
                  </Form.Item>
                  {uniqueCode ? (
                    <label style={{ color: "red" }}>
                      Brand Name {UniqueErrorMsg.UniqueErrName}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-12 my-2">
                  <label>Description</label>
                  <Form.Item
                    className="mt-2"
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
                      multiple={false}
                      listType="picture"
                      accept=".png,.jpg,.jpeg"
                      height={100}
                      beforeUpload={beforeUpload}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 1000 && file.file.size < 500000) {
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
                <div className="col-12 d-flex justify-content-center mt-5 gap-2">
                  <Button className="save_button">Save</Button>
                  <Button
                    btnType="cancel"
                    onClick={() => {
                      setBrandEditPopup(false);
                    }}
                  >
                    cancel
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
          </>
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
