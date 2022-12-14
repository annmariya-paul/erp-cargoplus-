import React, { useEffect, useState } from "react";
import { Input, Select, Pagination, Checkbox } from "antd";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import Button from "../../../../components/button/button";
import { Link, useNavigate } from "react-router-dom";
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
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import InputType from "../../../../components/Input Type textbox/InputType";
import { TreeSelect, Form, InputNumber } from "antd";
import TextArea from "../../../../components/ InputType TextArea/TextArea";

function Services() {
  const [editForm] = Form.useForm();
  const [pageSize, setPageSize] = useState("25"); // page size
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState(""); // search by text input
  const [searchType, setSearchType] = useState(""); //search by type select box
  const [searchStatus, setSearchStatus] = useState("");
  const [showServiceEditModal, setShowServiceEditModal] = useState(false);
  const [serviceView, setServiceView] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [noofitems, setNoofItems] = useState("25");
  const [allservices, setAllservices] = useState();
  const [totalCount, setTotalcount] = useState();
  const [serviceName, setserviceName] = useState();
  const [serviceCode, setServiceCode] = useState();
  const [serviceHsn, setServiceHsn] = useState();
  const [servicetaxrate, setServicetaxrate] = useState();
  const [servicedescription, setServicedescription] = useState();
  const [serviceCategory, setServicecategory] = useState();
  const [serviceImg, setServiceImg] = useState([]);
  const [imageSize, setImageSize] = useState(false);

  const [serviceid, setserviceid] = useState();
  const [ImageUpload, setImageUpload] = useState();
  const [toggleState, setToggleState] = useState(1);
  const [State, setState] = useState("null");
  const [treeLine, setTreeLine] = useState(true);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [TreeData, setTreeData] = useState();
  const [categoryTree, setCategoryTree] = useState([]);
  const [img, setImg] = useState([]);
  console.log("set image", img);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  console.log("set image", img);
  const [services, setServices] = useState([]);
  console.log("Servicesss are :::", services);

  const navigate = useNavigate();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [viewservices, setViewservices] = useState({
    id: "",
    servicename: "",
    servicecode: "",
    servicecategory: "",
    servicehsn: "",
    servicetaxrate: "",
    servicedescription: "",
    serviceimage: "",
  });

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

  const getData = (current, pageSize) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };

  const pageofIndex = noofitems * (current - 1) - 1 + 1;

  // const pagesizecount = Math.ceil(totalCount / noofitems);
  // console.log("page number isss", pagesizecount);

  const getAllservices = () => {
    PublicFetch.get(
      `${CRM_BASE_URL_SELLING}/service?startIndex=${pageofIndex}&noOfItems=${noofitems}`
    )
      .then((res) => {
        console.log("all services is ", res.data.data);
        if (res?.data?.success) {
          console.log("All services dataawww", res?.data?.data?.services);
          let tempArr = [];
          res?.data?.data?.services.forEach((item, index) => {
          tempArr.push({
            service_id:item?.service_id,
            service_name: item?.service_name,
            service_category_id: item?.crm_v1_categories?.category_code,
            service_code: item?.service_code,
            service_pic: item?.service_pic,
            service_taxrate:item?.service_taxrate,
          });
        });
          console.log("hellooooqqqqq", tempArr);
          setServices(tempArr);

          setAllservices(res?.data?.data.services);
          setTotalcount(res?.data?.data?.totalCount);
          // setCurrentcount(res?.data?.data?.currentCount);
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    getAllservices();
  }, [noofitems, pageofIndex]);

  const handleViewClick = (item) => {
    console.log("view the services", item);
    setViewservices({
      ...viewservices,
      id: item.service_id,
      servicename: item.service_name,
      servicecode: item.service_code,
      servicecategory: item.service_category_id,
      servicehsn: item.service_hsn,
      servicedescription: item.service_description,
      servicetaxrate: item.service_taxrate,
      serviceimage: item.service_pic,
    });
    setServiceView(true);
  };
  // editing from table

  const handleEditclick = (i) => {
    console.log("edited list iss", i);
    setserviceid(i.service_id);
    setserviceName(i.service_name);
    setServiceCode(i.service_code);
    setServiceHsn(i.service_hsn);
    setServicetaxrate(i.service_taxrate);
    setServicedescription(i.service_description);
    setServicecategory(i.service_category_id);
    setServiceImg(i.service_pic);
    editForm.setFieldsValue({
      // serviceid: i.service_id,
      service_name: i.service_name,
      serviceCode: i.service_code,
      serviceHsn: i.service_hsn,
      taxRate: i.service_taxrate,
      servicedescription: i.service_description,
      serviceCategory: i.service_category_id,
    });
    setShowServiceEditModal(true);
  };

  const handleEditfromview = (item) => {
    console.log("edit iss", item);
    setserviceid(item.id);
    setserviceName(item.servicename);
    setServiceCode(item.servicecode);
    setServiceHsn(item.servicehsn);
    setServicetaxrate(item.servicetaxrate);
    setServicedescription(item.servicedescription);
    setServicecategory(item.servicecategory);
    setServiceImg(item.serviceimage);
    editForm.setFieldsValue({
      // serviceid: item.service_id,
      service_name: item.servicename,
      serviceCode: item.servicecode,
      serviceHsn: item.servicehsn,
      taxRate: item.servicetaxrate,
      servicedescription: item.servicedescription,
      serviceCategory: item.servicecategory,
    });
    setShowServiceEditModal(true);
    setServiceView(false);
  };

  const onChangetree = (value) => {
    console.log("Change", value);
    // setState(parseInt(value));
    setServicecategory(parseInt(value));
  };

  const onSelect = (value) => {
    console.log("Select the category :", value);
  };

  const structureTreeData = (categories) => {
    let treeStructure = [];
    if (categories && Array.isArray(categories) && categories.length > 0) {
      categories.forEach((category, categoryIndex) => {
        // if (category?.other_crm_v1_categories?.length > 0) {
        let ch = structureTreeData(category?.other_crm_v1_categories);
        treeStructure.push({
          value: category?.category_id,
          title: category?.category_name,
          children: ch,
        });
        // }
      });
    }
    return treeStructure;
    // console.log("Tree structure : ", treeStructure);
  };

  const getCategorydata = () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/category`)
      .then((res) => {
        console.log("response Data", res);
        if (res.data.success) {
          setTreeData(res.data.data);
          // getTreeData(res.data.data);
          let d = structureTreeData(res.data.data);
          console.log("Structured Tree : ", d);
          setCategoryTree(d);
          console.log("all data", res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getCategorydata();
  }, []);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const handleUpdate = () => {
    // console.log("edit data", e);
    const formData = new FormData();

    formData.append("service_name", serviceName.trim(" "));
    formData.append("service_code", serviceCode);
    formData.append("service_category_id", serviceCategory);
    formData.append("service_hsn", serviceHsn);
    // if (serviceImg && serviceImg !== 0) {
    //   formData.append("service_pic", serviceImg);
    // }
    formData.append("service_pic", img);
    formData.append("service_taxrate", servicetaxrate);
    formData.append("service_description", servicedescription);

    PublicFetch.patch(
      `${CRM_BASE_URL_SELLING}/service/${serviceid}`,
      formData,
      {
        "Content-Type": "Multipart/form-Data",
      }
    )
      .then((res) => {
        console.log("data edited successfully", res);
        if (res.data.success) {
          console.log("successDataa", res.data.data);
          setShowServiceEditModal(false);
          setSuccessPopup(true);
          getAllservices();
          close_modal(successPopup, 1000);
          // setBrandEditPopup(false);
          editForm.resetFields();
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setError(true);
      });
  };

  const data = [
    {
      name: "Polishing",
      category: "Tyre Polish",
      code: "HJKGF23453",
      tax_rate: "5%",

      key: "1",
    },
    {
      name: "Cleaning",
      category: "Vaccum Cleaning",
      code: "HJGHRF34353",
      tax_rate: "10%",
      key: "2",
    },
    {
      name: "Painting",
      category: "Full Body",
      code: "GHFVY56447",
      tax_rate: "15%",
      key: "3",
    },
  ];
  // {columns is service listing table componenet }

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
              onClick={() => handleEditclick(index)}
              className="actionEdit m-0 p-0"
            >
              <FaEdit />
            </div>
            <Link to={ROUTES.SERVICEDETAILS}>
              <div
                onClick={() => handleViewClick(index)}
                className="actionView m-0 p-0"
              >
                <MdPageview />
              </div>
            </Link>
            <div className="deleteIcon m-0">
              {/* <Link> */}
              <FaTrash />
              {/* </Link> */}
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "IMAGE",
      dataIndex: "service_pic",
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
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${theImageURL}`}
          height="20px"
          width={"20px"}
        />
      ),
    },
    {
      title: "NAME",
      dataIndex: "service_name",
      key: "key",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.service_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
      width: "23%",
    },

    {
      title: "CODE",
      dataIndex: "service_code",
      key: "key",
      //   width: "23%",
      align: "center",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        return String(record.code).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "CATEGORY",
      dataIndex: "service_category_id",
      key: "key",
      width: "14%",
      align: "center",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.category)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "TAX RATE",
      dataIndex: "service_taxrate",
      key: "key",

      align: "center",

      onFilter: (value, record) => {
        return String(record.code).toLowerCase().includes(value.toLowerCase());
      },
    },
  ];
  return (
    <div>
      <div className="container-fluid lead_list my-3 py-3">
        <div>
          {/* {service listing starts section one} */}
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Services</h5>
            </div>
            {/* <Leadlist_Icons 
              datas={attributes}
              columns={filteredColumns}
              items={data12}
              xlheading={AttributeHeads}
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
              } /> */}
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
                value={noofitems}
                // onChange={(e) => setNoofItems(e)}
                onChange={(e, current) => {
                  console.log("On page size selected : ", e);
                  console.log("nfjnjfv", current);
                  setNoofItems(e);
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
                <Link to={ROUTES.SERVICECREATE}>
                  <span
                    style={{
                      color: "white",
                    }}
                  >
                    Add
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="datatable">
            <TableData
              // data={getData(current, pageSize)}
              data={services}
              //   data={data}
              columns={columns}
              custom_table_css="table_lead_list"
            />
          </div>
          <div className="d-flex py-2 justify-content-center">
            <MyPagination
              total={parseInt(totalCount)}
              // current={current}
              // showSizeChanger={true}
              // pageSize={pageSize}
              // onChange={(current, pageSize) => {
              //   setCurrent(current);
              //   setPageSize(pageSize);
              // }}
              current={current}
              pageSize={noofitems}
              // defaultPageSize={noofItems}
              showSizeChanger={false}
              onChange={(current, pageSize) => {
                console.log("page index isss", pageSize);
                setCurrent(current);
              }}
            />
          </div>
        </div>
        {/* {section Two service Edit modal starts} */}
        <CustomModel
          Adding_contents
          show={showServiceEditModal}
          onHide={() => setShowServiceEditModal(false)}
          header="Edit Service"
          // size={`xl`}
          width={800}
          footer={[
            <Button
              onClick={() => {
                handleUpdate();
                // setSuccessPopup(true);
                // setError(true);
              }}
              btnType="save"
            >
              Save
            </Button>,
            <Button
              onClick={() => {
                setShowServiceEditModal(false);
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
                <div className="my-1 d-none">
                  <h5 className="lead_text">Basic Info</h5>
                </div>
                <Form
                  name="editForm"
                  form={editForm}
                  onFinish={(value) => {
                    console.log("values111333", value);
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row ">
                    <div className="col-4">
                      <label>Name</label>
                      <Form.Item
                        name="service_name"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Name",
                          },
                          {whitespace:true},
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
                      >
                        <InputType
                          value={serviceName}
                          onChange={(e) => setserviceName(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-4">
                      <label>Code</label>
                      <Form.Item
                        name="serviceCode"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Code",
                          },
                          {
                            min: 2,
                            message: "Code must be atleast 2 characters",
                          },
                          {
                            max: 20,
                            message: "Code cannot be longer than 20 characters",
                          },
                        ]}
                      >
                        <InputType
                          value={serviceCode}
                          onChange={(e) => setServiceCode(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-4">
                      <label className="py-1">Category</label>
                      <Form.Item
                        name="serviceCategory"
                        rules={[
                          {
                            required: true,
                            message: "Please select a category",
                          },
                        ]}
                      >
                        <TreeSelect
                          className="tree"
                          name="tree"
                          style={{ width: "100%" }}
                          value={serviceCategory}
                          dropdownStyle={{
                            maxHeight: 400,
                            overflow: "auto",
                          }}
                          treeData={categoryTree}
                          treeDefaultExpandAll
                          onChange={onChangetree}
                          onSelect={onSelect}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6 ">
                      <label>HSN</label>
                      <Form.Item
                        name="serviceHsn"
                        rules={[
                          {
                            pattern: new RegExp("^[0-9]+$"),
                            message: "Please enter a Valid Code",
                          },
                        ]}
                      >
                        <InputType
                          value={serviceHsn}
                          onChange={(e) => {
                            setServiceHsn(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6 ">
                      <label>Tax Rate</label>
                      <Form.Item
                        className="mt-2"
                        name="taxRate"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Valid Tax Rate",
                          },
                          {
                            pattern: new RegExp("^[0-9]+$"),
                            message: "Please enter zero or Postive integers",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{
                            border: "0",
                            backgroundColor: "whitesmoke",
                            width: "100%",
                            paddingBlock: "2px",
                            boxShadow: "none",
                          }}
                          value={servicetaxrate}
                          onChange={(e) => setServicetaxrate(e)}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-6 mt-2">
                      <label>Display Picture</label>
                      <Form.Item name="new">
                        <FileUpload
                          multiple
                          listType="picture"
                          accept=".png,.jpeg"
                          onPreview={handlePreview}
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
                              setImg(file.file.originFileObj);
                              setImageSize(false);
                              console.log(
                                "select image",
                                file.file.originFileObj
                              );
                            } else {
                              setImageSize(true);
                              console.log("Error in image upload");
                            }
                          }}
                        />
                        {imageSize ? (
                          <p style={{ color: "red" }}>
                            Upload Image size between 1 kb and 500 kb
                          </p>
                        ) : (
                          ""
                        )}
                      </Form.Item>
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${serviceImg}`}
                        height="40px"
                        width={"40px"}
                      />
                    </div>
                    <div className="col-6 mt-2">
                      <label>Description</label>
                      <Form.Item
                        // name="description"
                        rules={[
                          {
                            whitespace: true,
                          },
                          {
                            min: 2,
                            message: "Description must be atleast 2 characters",
                          },
                          {
                            max: 500,
                          },
                        ]}
                      >
                        <TextArea
                          value={servicedescription}
                          onChange={(e) => {
                            setServicedescription(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          {/* {error ? <ErrorMsg code="500" /> : ""} */}
        </CustomModel>
        {/* {Modal for viewing service details} */}

        <CustomModel
          size="xl"
          show={serviceView}
          onHide={() => setServiceView(false)}
          View_list
          list_content={
            <div>
              <div className="container ps-4 my-4">
                <div className=" d-flex justify-content-between">
                  <h5 className="lead_text">Services</h5>
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
                          handleEditfromview(viewservices);
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
                      src={`${process.env.REACT_APP_BASE_URL}/${viewservices.serviceimage}`}
                      height={"120px"}
                      width={"120px"}
                    />
                    {/* <img
                      src={logo}
                      alt={logo}
                      style={{
                        height: "70px",
                        width: "70px",
                      }}
                    /> */}
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
                        <p className="modal_view_p_sub">
                          {viewservices.servicename}{" "}
                        </p>
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
                        <p className="modal_view_p_sub">
                          {viewservices.servicecode}
                        </p>
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
                        <p className="modal_view_p_sub">
                          {viewservices.servicecategory}{" "}
                        </p>
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-5">
                        <p
                          style={{ color: "#000" }}
                          className="modal_view_p_style"
                        >
                          HSN
                        </p>
                      </div>
                      <div className="col-1">:</div>
                      <div className="col-6 justify-content-start">
                        <p className="modal_view_p_sub">
                          {viewservices.servicehsn}
                        </p>
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
                        <p className="modal_view_p_sub">
                          {viewservices.servicetaxrate} %
                        </p>
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
                          {viewservices.servicedescription}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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

export default Services;
