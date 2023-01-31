import React, { useEffect, useState } from "react";
import "./branches.scss";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";
import CustomModel from "../../../components/custom_modal/custom_model";
import { Form, Input, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import TableData from "../../../components/table/table_data";
import { CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../check Unique/CheckUnique";
import MyPagination from "../../../components/Pagination/MyPagination";

// { Add and list Branches - Ann - 16/11/22 }
export default function Branches(props) {
  const [branch_id, setBranch_id] = useState();
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
 const [searchedText, setSearchedText] = useState("");
const [modalAddBranch, setModalAddBranch] = useState(false);

const [pageSize, setPageSize] = useState("25");
const [current, setCurrent] = useState(1);

  const [branches, setBranches] = useState();
  const [Errormsg, setErrormsg] = useState();
  const [NameInput, setNameInput] = useState();
  const [CodeInput, setCodeInput] = useState();
  const [BranchEditPopup, setBranchEditPopup] = useState(false);
  const [uniqueCode, setUniqueCode] = useState(false);
  const [uniqueName, setUniqueName] = useState(false);
  const [uniqueEditName, setUniqueEditName] = useState(false);
  const [uniqueEditCode, setUniqueEditCode] = useState(false);
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [editUniqueName, setEditUniqueName] = useState();
  const [editUniqueCode, setEditUniqueCode] = useState();
const [editForm] = Form.useForm();
const [BranchError, setBranchError] = useState();
const [branchcode, setBranchcode] = useState();
const [branchname, setBranchname] = useState();



//close modal for  success pop up 
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return branches?.slice((current - 1) * pageSize, current * pageSize);
  };

  //API for branches -- shahida 12.12.22
  const getallbranches = async () => {
    try {
      const allbranches = await PublicFetch.get(`${CRM_BASE_URL_HRMS}/branch`);
      console.log("all branches are", allbranches.data.data);
      setBranches(allbranches.data.data);
      setBranch_id(allbranches.data.branch_id);
      console.log("branch id", branch_id);
    } catch (err) {
      console.log("error while getting the brands: ", err);
    }
  };

  useEffect(() => {
    getallbranches();
  }, []);


 

//For Edit Branch
  const BranchEdit = (e) => {
    console.log("Branch edit", e);
    setNameInput(e.branch_name);
    setCodeInput(e.branch_code);
 setBranch_id(e.branch_id);
    setEditUniqueName(e?.branch_name);
    setEditUniqueCode(e?.branch_code);
    editForm.setFieldsValue({
      branch_id: e.branch_id,
      NameInput: e.branch_name,
      CodeInput: e.branch_code,
   });
    setBranchEditPopup(true);
  };

  //API for Edit Branch Data
  const handleUpdate = (e) => {
    console.log("edit data", e);
    const formData = new FormData();
  let data = {
      branch_name: NameInput,
      branch_code: CodeInput,
    };
   PublicFetch.patch(`${CRM_BASE_URL_HRMS}/branch/${branch_id}`, data)
      .then((res) => {
        console.log("success branch edit", res);
        if (res.data.success) {
          console.log("success Data of branch", res.data.data);
          getallbranches();
          setSuccessPopup(true);
          close_modal(successPopup, 1000);
          setBranchEditPopup(false);
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
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "30%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div
                className="editIcon m-0"
                onClick={() => {
                  BranchEdit(index);
                  setUniqueEditName(false);
                  setUniqueEditCode(false);
                }}
              >
                <FaEdit />
              </div>
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "BRANCH NAME",
      dataIndex: "branch_name",
      key: "branch_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.branch_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "BRANCH CODE",
      dataIndex: "branch_code",
      key: "branch_code",
      align: "center",
    },
  ];

 
//API for create Branches
  const createBranches = async () => {
    try {
      const addbranches = await PublicFetch.post(
        `${CRM_BASE_URL_HRMS}/branch`,
        {
          branch_name: branchname,
          branch_code: branchcode,
        }
      );
      console.log("branch added successfully", addbranches);
      if (addbranches.data.success) {
        setSuccessPopup(true);
        getallbranches();
        addForm.resetFields();
        setModalAddBranch(false);
        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("err to add the branches", err);
    }
  };


  // const checkEditBranchNameis = (data) => {
  //   if (editUniqueName !== NameInput) {
  //     PublicFetch.get(
  //       `${process.env.REACT_APP_BASE_URL}/misc?type=branchname&value=${NameInput}`
  //     )
  //       .then((res) => {
  //         console.log("Response", res);
  //         if (res.data.success) {
  //           console.log("Success", res.data.data);
  //           if (res.data.data.exist) {
  //             setUniqueEditName(true);
  //           } else {
  //             setUniqueEditName(false);
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error", err);
  //       });
  //   }
  // };

  // const checkEditBranchCodeis = (data) => {
  //   if (editUniqueCode !== CodeInput) {
  //     PublicFetch.get(
  //       `${process.env.REACT_APP_BASE_URL}/misc?type=branchcode&value=${CodeInput}`
  //     )
  //       .then((res) => {
  //         console.log("Response", res);
  //         if (res.data.success) {
  //           console.log("Success", res.data.data);
  //           if (res.data.data.exist) {
  //             setUniqueEditCode(true);
  //           } else {
  //             setUniqueEditCode(false);
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error", err);
  //       });
  //   }
  // };

  console.log("data", branchname, branchcode);
  return (
    <>
      <div className="container-fluid container_hrms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Branches</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Branch Name"
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
        </div>
        <div className="row my-3">
          <div className="col-4 px-3">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => {
                setCurrent(1);
                setPageSize(e)}}
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
          <div className="col-4 d-flex align-items-center justify-content-center">
              <MyPagination
                total={branches?.length}
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
          <div className="col-4 d-flex justify-content-end">
            <Button btnType="add" onClick={() =>
              {
                setModalAddBranch(true);
              setUniqueCode(false);
              setUniqueName(false);
              addForm.resetFields();
              }
              }
             >
              Add Branch
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
                total={branches?.length}
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
        show={modalAddBranch}
        onHide={() => setModalAddBranch(false)}
        header="Add Branch"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Branch</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                createBranches();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Branch Name</label>
                  <div>
                    <Form.Item
                      name="branchname"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Branch Name",
                        },

                        {
                          min: 3,
                          message: "Branch Name must be at least 3 characters",
                        },
                        {
                          max: 100,
                          message:
                            "Branch Name cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        value={branchname}
                        onChange={(e) => {
                          setBranchname(e.target.value);
                          setBranchError("");
                          setUniqueName(false);
                        }}
                        onBlur={async () => {
                          let n = await CheckUnique({
                            type: "branchname",
                            value: branchname,
                          });
                          setUniqueName(n);
                        }}
                      />
                    </Form.Item>
                    {uniqueName ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Branch Name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="col-12 pt-1">
                  <label>Branch Code</label>
                  <Form.Item
                    name="branchcode"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9]+$"),
                        message: "Please enter a Valid Branch Code",
                      },
                      {
                        min: 3,
                        message: "Branch Code must be atleast 3 characters",
                      },
                      {
                        max: 15,
                        message:
                          "Branch code cannot be longer than 15 characters",
                      },
                    ]}
                  >
                    <InputType
                      value={branchcode}
                      onChange={(e) => {
                        setBranchcode(e.target.value);
                        setUniqueCode(false);
                      }}
                      onBlur={async () => {
                        let a = await CheckUnique({
                          type: "branchcode",
                          value: branchcode,
                        });
                        setUniqueCode(a);
                      }}
                    />
                  </Form.Item>
                  {uniqueCode ? (
                    <p style={{ color: "red", marginTop: "-24px" }}>
                      Branch code {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
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
        show={BranchEditPopup}
        onHide={() => setBranchEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Branch</h5>
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
                  <div className="col-12">
                    <label>Name</label>
                    <Form.Item
                      name="NameInput"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Branch Name",
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
                        onChange={(e) => {
                          setNameInput(e.target.value);
                          setErrormsg("");
                          setUniqueEditName(false);
                          
                        }}
                       
                        onBlur={ async () => {
                         
                          if (editUniqueName !== NameInput) {
                            let a = await CheckUnique({type:"branchname",value:NameInput})
                         
                            setUniqueEditName(a);
                          }
                       
                        }}
                      />
                    </Form.Item>{" "}
                    {uniqueEditName ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Branch Name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                   
                  </div>
                  <div className="col-12">
                    <label>Code</label>
                    <Form.Item
                      name="CodeInput"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Branch Name",
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
                        value={CodeInput}
                        onChange={(e) => {
                          setCodeInput(e.target.value);
                          setErrormsg("");
                          setUniqueEditCode(false);
                        }}
                       
                        onBlur={ async () => {
                         
                           if(editUniqueCode !== CodeInput){
                            let a = await CheckUnique({type:"branchcode",value:CodeInput})
                            setUniqueEditCode(a);
                           
                          }
                       
                        }}
                      />
                    </Form.Item>
                    {uniqueEditCode ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Branch code {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                   
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
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {/* {error ? <ErrorMsg code={"500"} /> : " "} */}
    </>
  );
}
