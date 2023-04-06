import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import CustomModel from "../../../../components/custom_modal/custom_model";
import { MdPageview } from "react-icons/md";
import { Form, Input, Select } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableData from "../../../../components/table/table_data";
import { CRM_BASE_URL_HRMS } from "../../../../api/bootapi";
import { FiEdit } from "react-icons/fi";
import { ACCOUNTS } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../../check Unique/CheckUnique";
import MyPagination from "../../../../components/Pagination/MyPagination";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import TextArea from "../../../../components/ InputType TextArea/TextArea";



export default function Gltypes(props) {
  const [branch_id, setBranch_id] = useState();
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [modalAddGltype, setModalAddGltype] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [pageSize, setPageSize] = useState("25");
  const [newname,setnewname]=useState();
  const [current, setCurrent] = useState(1);
  const [serialNo, setserialNo] = useState(1);
  const [GLEditPopup, setGLEditPopup] = useState(false);
  const [uniqueCode, setUniqueCode] = useState(false);
  const [uniqueName, setUniqueName] = useState(false);
  const [NameInput, setNameInput] = useState();
  const [CodeInput, setCodeInput] = useState();
  const [uniqueEditName, setUniqueEditName] = useState(false);
  const [uniqueEditCode, setUniqueEditCode] = useState(false);
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [editUniqueName, setEditUniqueName] = useState();
  const [editUniqueCode, setEditUniqueCode] = useState();
  const [editForm] = Form.useForm();
  const [BranchError, setBranchError] = useState();
  const [glname, setglname] = useState();
  const [gldescription,setGldescription]= useState();
  const [code, setCode] = useState();
  const [gltypes,setGltypes]=useState();
  const [gltype_id,setGltype_id]=useState();
  const [Errormsg, setErrormsg] = useState();
  const [descriptionInput,setDescriptionInput]= useState();
  const [payunique, setpaynameunique] = useState();
  const [searchcodeText, setSearchcodeText] = useState("");

  //close modal for  success pop up
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return gltypes?.slice((current - 1) * pageSize, current * pageSize);
  };

//API for get all Gltypes
  const getallgltypes = async () => {
    try {
      const allgltypes = await PublicFetch.get(`${ACCOUNTS}/accounts_gl_type`);
      console.log("all gl types are", allgltypes.data.data);
      setGltypes(allgltypes.data.data);
      setGltype_id(allgltypes.data.acc_gl_type_id);
    //   console.log("gl type id", acc_gl_type_id);
    } catch (err) {
      console.log("error while getting the gltypes: ", err);
    }
  };

  useEffect(() => {
    getallgltypes();
  }, []);

  //For Edit GL Types
  const GLEdit = (e) => {
    console.log("GL edit", e);
    setNameInput(e.acc_gl_type_name);
    setCodeInput(e.acc_gl_type_code);
    setGltype_id(e.acc_gl_type_id);
    setDescriptionInput(e.acc_gl_type_description);
    // setEditUniqueName(e?.branch_name);
    // setEditUniqueCode(e?.branch_code);
    editForm.setFieldsValue({
      gltype_id: e.acc_gl_type_id,
      NameInput: e.acc_gl_type_name,
      CodeInput: e.acc_gl_type_code,
      descriptionInput:e.acc_gl_type_description,
    });
    setGLEditPopup(true);
  };
  const [viewgltypes, setViewgltypes] = useState({
    acc_gl_type_id: "",
    acc_gl_type_code: "",
    acc_gl_type_name: "",
    acc_gl_type_description: "",
  });

  const handleViewClick = (item) => {
    console.log("view all gl types", item);
    setViewgltypes({
      ...viewgltypes,
      acc_gl_type_id: item.acc_gl_type_id,
      acc_gl_type_code: item.acc_gl_type_code,
      acc_gl_type_name: item.acc_gl_type_name,
      acc_gl_type_description: item.acc_gl_type_description,
    });

    setShowViewModal(true);
  };

  //API for Edit Branch Data
  const handleUpdate = (e) => {
    console.log("edit data", e);
    const formData = new FormData();
    let data = {
        acc_gl_type_code: CodeInput,
        acc_gl_type_name: NameInput,
        acc_gl_type_description:descriptionInput,

    };
    PublicFetch.patch(`${ACCOUNTS}/accounts_gl_type/${gltype_id}`, data)
      .then((res) => {
        console.log("success gl type edit", res);
        if (res.data.success) {
          console.log("success Data of gl type", res.data.data);
          getallgltypes();
          setSuccessPopup(true);
          close_modal(successPopup, 1000);
          setGLEditPopup(false);
        } else {
          setErrormsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setError(true);
      });
  };

  //columns
  const columns = [
    {
      title: "SI.NO",
      key: "index",
      width: "10%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },

  

    {
      title: "CODE",
      dataIndex: "acc_gl_type_code",
      key: "acc_gl_type_code",
      width: "20%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.acc_gl_type_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.acc_gl_type_description).toLowerCase().includes(value.toLowerCase())
          ||
          String(record.acc_gl_type_name).toLowerCase().includes(value.toLowerCase())
        );
      },
      align: "left",
    },
    {
        title: "NAME",
        dataIndex: "acc_gl_type_name",
        key: "acc_gl_type_name",
        align: "left",
        width: "20%",
        // filteredValue: [searchcodeText],
        // onFilter: (value, record) => {
        //   return String(record.acc_gl_type_name)
        //     .toLowerCase()
        //     .includes(value.toLowerCase());
        // },
        align: "left",
      },
  
    {
        title: "DESCRIPTION",
        dataIndex: "acc_gl_type_description",
        key: "acc_gl_type_description",
        align: "left",
        filteredValue: [searchcodeText],
        onFilter: (value, record) => {
          return String(record.acc_gl_type_description)
            .toLowerCase()
            .includes(value.toLowerCase());
        },
        align: "left",
      },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "30%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
           
              <div
                className="editIcon m-0"
                onClick={() => {
                  GLEdit(index);
                //   setUniqueEditName(false);
                //   setUniqueEditCode(false);
                }}
              >
                <FaEdit />
              </div>
              <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index)}
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
            
          </div>
        );
      },
      align: "center",
    },
  ];

  //API for create Branches
  const createGLTypes= async () => {
    try {
      const addgltypes = await PublicFetch.post(
        `${ACCOUNTS}/accounts_gl_type`,
        {
            acc_gl_type_code: code,
            acc_gl_type_name: glname,
            acc_gl_type_description:gldescription,
        }
      );
      console.log("Gl type added successfully", addgltypes);
      if (addgltypes.data.success) {
        setSuccessPopup(true);
        getallgltypes();
        addForm.resetFields();
        setModalAddGltype(false);
        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("err to add the branches", err);
    }
  };




  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange1 = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [
    [
      "Slno",
      "GL TYPE CODE",
      "GL TYPE NAME",
     
    ],
  ];
  //for pdf download
  const data12 = gltypes?.map((item, index) => [
    index + serialNo,
    item.acc_gl_type_code,
    item.acc_gl_type_name,
    item.acc_gl_type_description,
    // item.lead,
    // item.cost,
    // item.expense,
    // item.profit,
  ]);

 
  return (
    <>
      <div className="container-fluid container_hrms pt-3">
        <div className="row flex-wrap align-items-center">
          <div className="col-4">
            <h5 className="lead_text">GL Types</h5>
          </div>
          <div className="col-sm-4">
            <Input.Search
              className="inputSearch"
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
          <div className="col-4 d-flex justify-content-end">
            {data12 && (
              <Leadlist_Icons
                datas={data12}
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}> */}
        {/* <div className="col-sm-4">
            <Input.Search
              placeholder="Search by Branch Code"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchcodeText}
              onChange={(e) => {
                setSearchcodeText(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchcodeText(value);
              }}
            />
          </div> */}
        {/* </div> */}
        <div className="row my-3">
          <div className="col-sm-4 px-3">
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
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">25</span>
              </Select.Option>
              <Select.Option value="50">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1"> 50</span>
              </Select.Option>
              <Select.Option value="100">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">100</span>
              </Select.Option>
            </Select>
          </div>
          <div className="col-sm-4 d-flex align-items-center justify-content-center">
            <MyPagination
              total={gltypes?.length}
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
          <div className="col-sm-4 d-flex justify-content-end">
            <Button
              btnType="add"
              onClick={() => {
                setModalAddGltype(true);
                // setUniqueCode(false);
                // setUniqueName(false);
                addForm.resetFields();
              }}
            >
              New GL Type
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={branches}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>

        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={gltypes?.length}
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
      </div>

      {/* Modal for add Branch */}
      <CustomModel
        show={modalAddGltype}
        onHide={() => setModalAddGltype(false)}
        header="New GL Type"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">New GL Type</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                createGLTypes();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Code<span className="required">*</span></label>
                  <div>
                    <Form.Item
                      name="code"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid code",
                        },

                        {
                          min: 3,
                          message: "code must be at least 3 characters",
                        },
                        {
                          max: 100,
                          message:
                            "Code cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                        //   setpaynameunique(e.target.value);
                        //   setBranchError("");
                          setUniqueName(false);
                        }}
                        onBlur={async () => {
                          let n = await CheckUnique({
                            type:"gltypecode",
                            value: code,
                          });
                          console.log("hai how are u", n);
                          setUniqueName(n);
                        }}
                      />
                    </Form.Item>
                    {uniqueName ? (
                      <p style={{ color: "red" }}>
                        GL Type code {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="col-12 pt-1">
                  <label>Name<span className="required">*</span></label>
                  <Form.Item
                    name="glname"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid Name",
                      },
                      {
                        min: 3,
                        message: "Name must be atleast 3 characters",
                      },
                      {
                        max: 15,
                        message:
                          "Name cannot be longer than 15 characters",
                      },
                    ]}
                    // onChange={(e) => setnewname(e.target.value)}

                  >
                    <InputType
                      value={glname}
                      onChange={(e) => {
                        setglname(e.target.value);
                        setUniqueCode(false);
                      }}
                      onBlur={async () => {
                        let a = await CheckUnique({
                          type: "gltypename",
                          value: glname,
                        });
                        setUniqueCode(a);
                      }}
                    />
                  </Form.Item>
                  {uniqueCode ? (
                    <p style={{ color: "red" }}>
                    GL Type name {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
                </div>
                <div className="col-12 pt-1">
                  <label>Description</label>
                  <Form.Item
                    name="gldescription"
                    // rules={[
                    //   {
                    //     required: true,
                    //     pattern: new RegExp("^[A-Za-z0-9]+$"),
                    //     message: "Please enter description",
                    //   },
                      
                    // ]}
                  >
                  <TextArea 
                   value={gldescription}
                   onChange={(e) => setGldescription(e.target.value)}
                    />
                  </Form.Item>
                  {/* {uniqueCode ? (
                    <p style={{ color: "red" }}>
                      Branch code {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null} */}
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      >
        <Custom_model
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </CustomModel>
      <Custom_model
        show={GLEditPopup}
        onHide={() => setGLEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit GL Type</h5>
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
                  <div className="col-12 ">
                    <label>Code<span className="required">*</span></label>
                    <Form.Item
                      name="CodeInput"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Code",
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
                        value={CodeInput}
                        disabled={true}
                        onChange={(e) => {
                          setCodeInput(e.target.value);
                        //   setErrormsg("");
                        //   setUniqueEditName(false);
                        }}
                        // onBlur={async () => {
                        //   if (editUniqueName !== NameInput) {
                        //     let a = await CheckUnique({
                        //       type: "branchname",
                        //       value: NameInput,
                        //     });

                        //     setUniqueEditName(a);
                        //   }
                        // }}
                      />
                    </Form.Item>{" "}
                    {/* {uniqueEditName ? (
                      <p style={{ color: "red" }}>
                        Branch Name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null} */}
                  </div>
                  <div className="col-12 mt-2">
                    <label>Name<span className="required">*</span></label>
                    <Form.Item
                      name="NameInput"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Name",
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
                        value={NameInput}
                        disabled={true}
                        onChange={(e) => {
                          setNameInput(e.target.value);
                        //   setErrormsg("");
                        //   setUniqueEditCode(false);
                        }}
                        // onBlur={async () => {
                        //   if (editUniqueCode !== CodeInput) {
                        //     let a = await CheckUnique({
                        //       type: "branchcode",
                        //       value: CodeInput,
                        //     });
                        //     setUniqueEditCode(a);
                        //   }
                        // }}
                      />
                    </Form.Item>
                    {/* {uniqueEditCode ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Branch code {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null} */}
                  </div>

                  <div className="col-12 mt-2">
                    <label>Description</label>
                    <Form.Item
                      name="descriptionInput"
                    //   rules={[
                    //     {
                    //       required: true,
                    //       pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                    //       message: "Please enter a Valid Description",
                    //     },
                       
                    //   ]}
                    >
                     <TextArea 
                      value={descriptionInput}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                     />
                    </Form.Item>
                    {/* {uniqueEditCode ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Branch code {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null} */}
                  </div>

                  <div className="col-12 d-flex justify-content-center mt-5">
                    <Button className="save_button">Save</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        }
      />
       <CustomModel
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col-10">
                <h5 className="lead_text">GL Types</h5>
              </div>
              <div className="col-2">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    GLEdit(viewgltypes);
                    // setShowModalEdit(true);
                    setShowViewModal(false);
                  }}
                >
                  Edit
                  <FiEdit
                    style={{ marginBottom: "4px", marginInline: "3px" }}
                  />
                </Button>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Code</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {viewgltypes.acc_gl_type_code}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p>Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {" "}
                  {viewgltypes.acc_gl_type_name}{" "}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Description</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {" "}
                  {viewgltypes.acc_gl_type_description}{" "}
                </p>
              </div>
            </div>
          </div>
        }
      />
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {/* {error ? <ErrorMsg code={"500"} /> : " "} */}
    </>
  );
}
