import React, { useState, useEffect } from "react";
// import "../../../CRM/lead/lead_list/leadlist.scss";
import { Modal, Form } from "antd";
import {
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaBookOpen,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { TreeSelect } from "antd";
import FileUpload from "../../../../components/fileupload/fileUploader";
// import { FormGroup } from "react-bootstrap";
// import { Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { useForm } from "react-hook-form";
import { AiFillPrinter } from "react-icons/ai";
import { MdFileCopy, MdPageview } from "react-icons/md";
import { Input, Select } from "antd";
import TableData from "../../../../components/table/table_data";
import MyPagination from "../../../../components/Pagination/MyPagination";
import CustomModel from "../../../../components/custom_modal/custom_model";
import Button from "../../../../components/button/button";
import "./viewCategory.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { date } from "yup/lib/locale";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { Table } from "antd";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { EnvironmentFilled } from "@ant-design/icons";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";

function Categorylist(props) {
  const [editForm] = Form.useForm();

  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [dataCategory, setDataCategory] = useState();
  const [DisplayDataa, setDisplayDataa] = useState();
  const [displayChild, setDisplayChild] = useState();
  const [displayName, setDisplayname] = useState({
    name: "",
  });
  const [nameSearch, setNamesearch] = useState();
  const [ViewingData, setViewingDAta] = useState();
  const [categoryId, setCategory] = useState();
  const [OldData, setOldData] = useState();
  const [c_code, setCcode] = useState();
  const [cName, setCname] = useState();
  const [cPic, setCpic] = useState();
  const [cDescription, setCdescription] = useState();
  const [cParent, setCparent] = useState();
  const [imageSize, setImageSize] = useState(false);
  const [uniqueCode, setuniqueCode] = useState(false);
  const [categoryCode, setCategoryCode] = useState();

  // console.log("dataCategory", dataCategory);
  // console.log("dataa of name", displayName);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [State, setState] = useState("null");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = (current, pageSize) => {
    return CategoryList?.slice((current - 1) * pageSize, current * pageSize);
  };

  const structureTreeData = (categories) => {
    let treeStructure = [];

    if (categories && Array.isArray(categories) && categories.length > 0) {
      categories.forEach((category, categoryIndex) => {
        // if (category?.other_crm_v1_categories?.length > 0) {
        let ch = structureTreeData(category?.other_crm_v1_categories);
        treeStructure.push({
          key: category?.category_id,
          category_name: category?.category_name,
          category_parent_id: category?.category_parent_id,
          category_code: category?.category_code,
          category_description: category?.category_description,
          category_pic: category?.category_pic,
          children: ch,
        });

        // }
      });
    }
    return treeStructure;
    // console.log("Tree structure : ", treeStructure);
  };

  const structureTreeData2 = (categories) => {
    let TreeStructure2 = [];
    if (categories && Array.isArray(categories) && categories.length > 0) {
      categories.forEach((category, catgeoryIndex) => {
        let ch = structureTreeData2(category?.other_crm_v1_categories);
        TreeStructure2.push({
          value: category?.category_id,
          title: category?.category_name,
          children: ch,
        });
      });
    }
    return TreeStructure2;
  };

  const [CategoryList, setCategoryList] = useState();
  const [CategoryTree, setCatgeoryTree] = useState();
  const getAllCategory = async () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/category`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("All category data", res?.data);
          // // let temp = [];
          // if (
          //   res?.data?.data.other_crm_v1_categories &&
          //   res?.data?.data.other_crm_v1_categories.length > 0
          // ) {
          //   res?.data?.data.other_crm_v1_categories.forEach((item, index) => {

          //   }
          //   );
          // }
          setDisplayDataa(res.data.data);
          DisplayCategories(res.data.data);
          let d = structureTreeData(res.data.data);
          console.log("structre tree", d);
          setCategoryList(d);
          let v = structureTreeData2(res.data.data);
          setCatgeoryTree(v);
          // console.log("happy", v);
          const traverseTree = (treeData) => {
            // console.log("shfsa", treeData);
            let categories = [];
            if (!treeData || treeData.length <= 0) {
              return;
            }
            //   creating queue
            let queue = [...treeData];
            //   queue.push(treeData);
            //   console.log(queue);
            //   return;
            while (queue.length !== 0) {
              let length = queue.length;
              while (length > 0) {
                let firstItem = queue.shift();

                categories.push({
                  category_name: firstItem.category_name,
                  category_id: firstItem.category_id,
                  category_code: firstItem.category_code,
                  category_description: firstItem.category_description,

                  // category_parent_id: firstItem.category_parent_id,
                  category_parent_id: firstItem.category_parent_id,
                });
                // if (firstItem?.other_crm_v1_categories?.length > 0) {
                for (
                  let i = 0;
                  i < firstItem.other_crm_v1_categories.length;
                  i++
                ) {
                  queue.push(firstItem.other_crm_v1_categories[i]);
                }
                // }
                length--;
              }
            }

            setDisplayname(categories);

            // setCategoryList(categories);
            setDataCategory(categories);
            return categories;
          };
          // console.log("daaa", traverseTree(res.data.data));
          let temp = [];
          res?.data?.data.forEach((item, index) => {
            // let tempArr = [];
            // item.other_crm_v1_categories.forEach((i, idx) => {
            //   tempArr.push(i.category_name);
            // });
            let tmpArr_id = [];
            item.other_crm_v1_categories.forEach((itm, indx) => {
              tmpArr_id.push(itm.category_code);
            });
            let tmpArry = [];
            item.other_crm_v1_categories.forEach((itm, indx) => {
              tmpArry.push(itm.category_description);
            });
            let Categoryname = [];
            // for (let i = 0; i < traverseTree(res.data.data).length; ++i) {
            //   Categoryname = traverseTree(res.data.data)[i];
            // }

            // dataCategory.forEach((item, index) => {

            //   Categoryname.push();
            // });

            temp.push({
              category_code: item?.category_code,
              category_name: Categoryname,
              category_description: item?.category_description,
            });
          });
        } else {
          console.log("Failed to load data!");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // const treeData = [
  //   {
  //     title: "Parent Node-1",
  //     value: "Parent-1",

  //     children: [
  //       {
  //         title: "01 Node1",
  //         value: "0-0-1",

  //         children: [
  //           {
  //             title: "Child Node1.1",
  //             value: "0-0-1-1",
  //           },
  //         ],
  //       },
  //       {
  //         title: "Child Node2",
  //         value: "0-0-2",
  //         key: "0-0-2",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Parent Node2",
  //     value: "0-1",
  //     key: "0-1",
  //   },
  // ];

  const onChange = (value) => {
    console.log("Change", value);
    setCparent(value);
    setOldData({ ...OldData, cparent: value });
  };

  const onSelect = (value) => {
    console.log("Select:", value);
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const getDescendantValues = (record) => {
    const values = [];
    (function recurse(record) {
      values.push(record.category_name.toString().toLowerCase());
      record.children.forEach(recurse);
    })(record);
    return values;
  };

  const columns = [
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      width: "14%",
      render: (data, index) => {
        return (
          <div className=" d-flex justify-content-center align-items-center gap-3">
            <div
              className="actionEdit"
              onClick={() => handleEditCategoryPhase1(index)}
            >
              <FaEdit />
            </div>
            <div
              className="actionEdit"
              onClick={() => handleViewCategory(index)}
            >
              <MdPageview />
            </div>
            <div className="actionDel">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "CATEGORY NAME",
      dataIndex: "category_name",
      key: "category_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        // console.log("hai how are", record.children);

        return String(record.category_name || nameSearch)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    // Table.EXPAND_COLUMN,
    {
      title: "CODE",
      dataIndex: "category_code",
      key: "category_code",
      filteredValue: [searchType],
      onFilter: (value, record) => {
        console.log("dfhasasswww12", record);
        return String(record.category_code)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "PARENT CATEGORY",
      dataIndex: "category_parent_id",
      key: "category_parent_id",
      width: "23%",
      filteredValue: [searchStatus],
      onFilter: (value, record) => {
        return String(record.category_parent_id)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "category_description",
      key: "category_description",
      width: "23%",
      align: "center",
    },
  ];

  // console.log("namesss2123", nameSearch);
  // console.log("going well", DisplayDataa);
  const DisplayCategories = (data) => {
    // console.log("dispalying data type", data);
    data?.map((item, index) => {
      // console.log("data type", item);
      if (item?.other_crm_v1_categories) {
        // setDisplayDataa(item);
        return (
          <li key={item.category_id} title={item.category_name}>
            {DisplayCategories(item?.other_crm_v1_categories)}
          </li>
        );
      }
      return <li key={item.category_id} title={item.category_name}></li>;
    });
  };
  // console.log("bdfrwe1121212121cfbsdhvbg", DisplayDataa);

  //  function to view category Data     :::by Noufal  -30/11/2022
  const handleViewCategory = (e) => {
    console.log("data by click", e);
    if (e) {
      setCcode(e.category_code);
      setCname(e.category_name);
      setCdescription(e.category_description);
      setViewingDAta({
        key: e.key,
        category_name: e.category_name,
        category_code: e.category_code,
        category_parent_id: e.category_parent_id,
        category_description: e.category_description,
        category_pic: e.category_pic,
      });
      setCategory(e.key);
      setShowViewModal(true);
      setCategoryCode(e.category_code);
    }
  };

  console.log("old data", OldData);
  // function to get single catgeory data   // by noufal
  const handleEditCategoryPhase1 = (e) => {
    console.log("Edit data", e);

    if (e) {
      setIsModalOpen(true);
      setShowViewModal(false);
      setCcode(e.category_code);
      setCdescription(e.category_description);
      setCname(e.category_name);
      setOldData({
        key: e.key,
        cname: e.category_name,
        ccode: e.category_code,
        cdescription: e.category_description,
        cpic: e.category_pic,
        cparent: e.category_parent_id,
      });
      setCategoryCode(e.category_code);
    }
    editForm.setFieldsValue({
      key: e.key,
      category_name: e.category_name,
      category_code: e.category_code,
      category_parent_id: e.category_parent_id,
      category_description: e.category_description,
      category_pic: e.category_pic,
    });
  };

  const handleEditUpdation = (e) => {
    console.log("Event", e);

    const formData = new FormData();
    formData.append("category_code", c_code);
    formData.append("category_name", cName);
    if (cPic) {
      formData.append("category_pic", cPic);
    }

    formData.append("category_description", cDescription);
    if (cParent) {
      formData.append("category_parent_id", cParent);
    }

    PublicFetch.patch(`${CRM_BASE_URL_SELLING}/category/${e}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          getAllCategory();
          setIsModalOpen(false);
          setShowViewModal(false);
          setSuccessPopup(true);
          close_modal(SuccessPopup, 1200);
          editForm.resetFields();
        } else if (res.data.success === false) {
          alert(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const checkCategoryCodeis = (data) => {
    
      if (categoryCode !== c_code) {
        PublicFetch.get(
          `${process.env.REACT_APP_BASE_URL}/misc?type=categorycode&value=${c_code}`
        )
          .then((res) => {
            console.log("Response 1123", res);
            if (res.data.success) {
              console.log("Success", res.data.data);
              if (res.data.data.exist) {
                console.log("hai guys");
                setuniqueCode(true);
              } else {
                setuniqueCode(false);
              }
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
   
    
  };

  // console.log("jdfjdfdj", ViewingData);
  // console.log("hai !!!", categoryId);
  // console.log("ghsdfhashsdf", editForm);

  return (
    <div>
      <div className="container-fluid lead_list  my-3 py-3">
        <div>
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Category</h5>
            </div>
            <div className="col-auto" style={{}}>
              {/* <Leadlist_Icons /> */}
            </div>
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
            <div className="col-4">
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by Type"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchType(event ? [event] : []);
                }}
              >
                <Select.Option value="Electronics">Electronics</Select.Option>
                <Select.Option value="Laptop">Laptop</Select.Option>
                <Select.Option value="Mobile">Mobile</Select.Option>
              </Select>
            </div>
            <div className="col-4">
              <Select
                allowClear
                showSearch
                style={{ width: "100%", marginTop: "8px", borderRadius: "5px" }}
                placeholder="Search by From"
                className="select_search"
                optionFilterProp="children"
                onChange={(event) => {
                  setSearchStatus(event ? [event] : []);
                }}
              >
                <Select.Option value="L">Lead</Select.Option>
                <Select.Option value="C">Customer</Select.Option>
              </Select>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-4  ">
              <Select
                bordered={false}
                className="page_size_style"
                value={pageSize}
                onChange={(e) => {
                  setCurrent(1);
                  setPageSize(e);
                }}
              >
                <Select.Option value="25">
                  Show
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-1">
                    25
                  </span>
                </Select.Option>
                <Select.Option value="50">
                  Show
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-1">
                    50
                  </span>
                </Select.Option>
                <Select.Option value="100">
                  Show
                  <span style={{ color: "lightgray" }} className="ms-1">
                    |
                  </span>
                  <span style={{ color: "#2f6b8f" }} className="ms-1">
                    100
                  </span>
                </Select.Option>
              </Select>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center">
            <MyPagination
              total={CategoryList?.length}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          </div>
            <div className="col-4 d-flex justify-content-end" style={{}}>
              <Link to={ROUTES.CATEGORY}>
                <Button btnType="add">Add Category</Button>
              </Link>
            </div>
          </div>
          <div className="datatable">
            <TableData
              data={getData(current, pageSize)}
              columns={columns}
              custom_table_css="table_lead_list"
              expandable
              expandIconColumnIndex={1}
            />
          </div>
          <div className="d-flex py-2 justify-content-center">
            <MyPagination
              total={CategoryList?.length}
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
      <CustomModel
        show={showViewModal}
        size="xl"
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="d-flex justify-content-between my-1">
              <div className="mt-3">
                <h5 className="opportunity_heading">Category</h5>
              </div>
              <div className="">
                <Button
                  onClick={() => {
                    handleEditCategoryPhase1(ViewingData);
                  }}
                  btnType="add_borderless"
                >
                  <span
                    className="d-flex align-items-center justify-content-between gap-1  p-1 button_span"
                    style={{ fontSize: "14px" }}
                  >
                    Edit <FiEdit />
                  </span>
                </Button>
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Category Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">{ViewingData?.category_name}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Code</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">{ViewingData?.category_code}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Parent Category</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">
                  {ViewingData?.category_parent_id}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="modal_view_p_style">Description</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal_view_p_sub">
                  {ViewingData?.category_description}
                </p>
              </div>
            </div>
          </div>
        }
      />
      <CustomModel
        bodyStyle={{ height: 620, overflowY: "auto" }}
        width={700}
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        View_list
        list_content={
          <>
            <div className="px-2">
              <h5 className="lead_text">Edit Category</h5>
            </div>
            <div className="container-fluid px-2 my-3">
              <Form
                form={editForm}
                onFinish={(values) => {
                  console.log("halo", values);
                  handleEditUpdation(OldData?.key);
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row">
                  <div className="col-6">
                    <label>Category Name</label>
                    <Form.Item
                      name="category_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Category Name",
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
                      <InputType onChange={(e) => setCname(e.target.value)} />
                    </Form.Item>
                  </div>

                  <div className="col-6">
                    <label>Category Code</label>
                    <Form.Item
                      name="category_code"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9]+$"),
                          message: "Please enter a Valid Category code",
                        },
                        {
                          min: 2,
                          message: "Code must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message: "Code cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        onChange={(e) => {
                          setCcode(e.target.value);
                          setuniqueCode(false);
                        }}
                        onBlur={() => {
                          checkCategoryCodeis();
                        }}
                      />
                    </Form.Item>
                    {uniqueCode ? (
                      <label style={{ color: "red" }} className="mb-2">
                        Employee Code {UniqueErrorMsg.UniqueErrName}
                      </label>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <label>Parent Category</label>
                    <div className="trdata">
                      <Form.Item>
                        <TreeSelect
                          className="tree"
                          name="tree"
                          style={{ width: "100%" }}
                          value={OldData?.cparent}
                          dropdownStyle={{
                            maxHeight: 400,
                            overflow: "auto",
                          }}
                          treeData={CategoryTree}
                          placeholder="Please select"
                          treeDefaultExpandAll
                          onChange={(e) => onChange(e)}
                          onSelect={onSelect}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-6">
                    <label>Description</label>
                    <Form.Item
                      name="category_description"
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
                        onChange={(e) => setCdescription(e.target.value)}
                      />
                    </Form.Item>
                  </div>

                  <div className="col">
                    <label>category Image</label>
                    <Form.Item>
                      <FileUpload
                        beforeUpload={false}
                        accept=".jpg,.png,.jpeg"
                        onChange={(file) => {
                          if (
                            file.file.size > 1000 &&
                            file.file.size < 500000
                          ) {
                            setCpic(file?.file?.originFileObj);
                            setImageSize(false);
                          } else {
                            setImageSize(true);
                            console.log(
                              "upload image size between 1 kb and  500 kb"
                            );
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
                    <div className="pb-3">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${OldData?.cpic}`}
                        alt=""
                        height="40px"
                        width={"40px"}
                      />
                    </div>

                    <div className="row mt-3">
                      <div className="col-12 d-flex justify-content-center gap-2">
                        <Button
                          style={{ backgroundColor: "white" }}
                          className="p-1 shadow-sm"
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#0092ce",
                            color: "white",
                            borderRadius: "5px",
                          }}
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </>
        }
      />
      <CustomModel
        centered
        size={`sm`}
        success
        show={SuccessPopup}
        onHide={() => setSuccessPopup(false)}
      />
    </div>
  );
}

export default Categorylist;
