import React, { useEffect, useState } from "react";
import "../designation/designation.scss";
import { Form, Input, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import TableData from "../../../components/table/table_data";
import Custom_model from "../../../components/custom_modal/custom_model";
import { CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../check Unique/CheckUnique";
import MyPagination from "../../../components/Pagination/MyPagination";

// { Add and list Employment Type - Ann mariya - 16/11/22 }
export default function EmploymentType() {
  const [error, setError] = useState(false);
 const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [editShow, setEditShow] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [addemploytypename, setaddemploytypename] = useState("");
  const [emptypedata, setemptypedata] = useState("");
  const [editemptypename, seteditemptypename] = useState("");
  const [current, setCurrent] = useState(1);
  const [emptypeid, setemptypeid] = useState();
  const [newName,setNewName]=useState();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [employeeTName, setEmployeeTName] = useState();
const [uniqueCode, setuniqueCode] = useState(false);
const [uniqueeditCode, setuniqueeditCode] = useState(false);
  const [employeeType, setEmployeeType] = useState();
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);

  const[addshowmodal,setaddshowmodal]= useState(false)
  

  const getData = (current, pageSize) => {
    return emptypedata?.slice((current - 1) * pageSize, current * pageSize);
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSaveSuccess(false);
      }, time);
    }
  };

  const handleEditclick = (item) => {
    console.log("editt valuesss", item);
    seteditemptypename(item?.employment_type_name);
    setNewName(item?.employment_type_name);
    setemptypeid(item?.employment_type_id);
    editForm.setFieldsValue({
      emptype_name: item?.employment_type_name,
    });
    setEditShow(true);
  };

  const getallemptype = async () => {
    try {
      const allemptype = await PublicFetch.get(
        `${CRM_BASE_URL_HRMS}/employment-types`
      );
      console.log("all emptypess are ::", allemptype?.data?.data);
      setemptypedata(allemptype?.data?.data);
    
    } catch (err) {
      console.log("error to getting all Employee Type", err);
    }
  };

  const submitemptype = async () => {
    try {
      const addemptype = await PublicFetch.post(
        `${CRM_BASE_URL_HRMS}/employment-types`,
        {
          employment_type_name: addemploytypename.trim(" ")
        }
      );
      console.log(" data is added  successfully", addemptype);
      if (addemptype.data.success) {
        getallemptype();
        setaddshowmodal(false)
        setSaveSuccess(true);
        getallemptype();
        addForm.resetFields();
        close_modal(saveSuccess, 1000);
      }
     
    } catch (err) {
      console.log("err to add the emp  Type", err);
    }
  };

  const updateClick = async (id) => {
    try {
      const updating = await PublicFetch.patch(
        `${CRM_BASE_URL_HRMS}/employment-types/${emptypeid}`,
        {
          employment_type_name: employeeTName.trim(""),
        }
      );
      console.log("editedd data is", updating);
      if(updating.data.success){
       console.log("successfully updating ")
     
    getallemptype();
       setEditShow(false);
       setSaveSuccess(true)
       close_modal(saveSuccess, 1200);
      }
    } catch (err) {
      console.log("error to getting all emp type", err);
    }
  };

  useEffect(() => {
    getallemptype();

   
  }, []);
 

  const [serialNo, setserialNo] = useState(1);
  const columns = [
    {
      title: "SI.NO",
      key: "index",
      width: "20%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
  
    {
      title: "EMPLOYEE TYPE NAME",
      dataIndex: "employment_type_name",
      key: "employment_type_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.employment_type_name)
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
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div
                className="editIcon m-0"
                onClick={() => {
                  handleEditclick(index);
                   setuniqueeditCode(false);
                   addForm.resetFields();
                   setuniqueCode(false);
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
  ];
 




  return (
    <>
      {/* <div className="container mb-4 d-flex justify-content-center">
        <div className="containerdesig ">
          <div className="row mx-2">
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values", value);
                submitemptype();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row flex-wrap pt-1">
                <div className="row ms-0 py-1">
                  <div className="col-12 pt-3">
                    <label htmlfor="emp_type_name">Employment Type Name</label>
                    <Form.Item
                      name="Employment Type Name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a valid Employment Type Name",
                        },
                        {
                          min: 2,
                          message: "Branch Name must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message:
                            "Branch Name cannot be longer than 100 characters",
                        },
                      ]}
                      onChange={(e) => setaddemploytypename(e.target.value)}
                    >
                      <InputType
                        onChange={(e) => {
                          setEmployeeType(e.target.value);
                          setuniqueCode(false);
                        }}
                     
                        onBlur={ async () => {
                        
                          let a = await CheckUnique({type:"employmenttypename",value:employeeType})
                          
                          setuniqueCode(a)
                        }}
                      />
                    </Form.Item>
                    {uniqueCode ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Employment Type {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>

            <Custom_model
              size={"sm"}
              show={saveSuccess}
              onHide={() => setSaveSuccess(false)}
              success
            />
          </div>
        </div>
      </div> */}

      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Employee Types</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search"
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
                setCurrent(1)
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
          <div className="col-4  d-flex align-items-center justify-content-center">
              <MyPagination
                total={emptypedata?.length}
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
            <div className="col-4">
            <Button btnType="add" onClick={() => setaddshowmodal(true)}>
              Add Employee Type
            </Button>
            </div>
        </div>
        <div className="datatable">
          <TableData
           
            data={getData(current, pageSize)}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        
        <div className="d-flex py-2 justify-content-center">
              <MyPagination
                total={emptypedata?.length}
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

            <Custom_model
          size={"sm"}
          show={addshowmodal}
          onHide={() => {
            setaddshowmodal(false);
          }}
          View_list
          list_content={
            <>
              <h6 className="lead_text mb-2">Add Employee Type</h6>
              <div className="container-fluid px-4 my-4 ">
              <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values", value);
                submitemptype();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row flex-wrap pt-1">
                <div className="row ms-0 py-1">
                  <div className="col-12 pt-3">
                    <label htmlfor="emp_type_name">Employee Type Name</label>
                    <Form.Item
                      name="Employment Type Name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a valid Employee Type Name",
                        },
                        {
                          min: 2,
                          message: "Branch Name must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message:
                            "Branch Name cannot be longer than 100 characters",
                        },
                      ]}
                      onChange={(e) => setaddemploytypename(e.target.value)}
                    >
                      <InputType
                        onChange={(e) => {
                          setEmployeeType(e.target.value);
                          setuniqueCode(false);
                        }}
                     
                        onBlur={ async () => {
                        
                          let a = await CheckUnique({type:"employmenttypename",value:employeeType})
                          
                          setuniqueCode(a)
                        }}
                      />
                    </Form.Item>
                    {uniqueCode ? (
                      <p style={{ color: "red" }}>
                        Employee Type {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
              </div>
            </>
          }
        />
 <Custom_model
          size={"sm"}
          show={saveSuccess}
          onHide={() => setSaveSuccess(false)}
          success
        />

        <Custom_model
          size={"sm"}
          show={editShow}
          onHide={() => {
            setEditShow(false);
          }}
          View_list
          list_content={
            <>
              <h6 className="lead_text mb-2">Edit Employee Type</h6>
              <div className="container-fluid px-4 my-4 ">
                <Form
                  form={editForm}
                  onFinish={(value) => {
                    console.log("the formvaluess iss", value);
                    updateClick();
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row">
                    <div className="col-12">
                      <label>Name</label>
                      <Form.Item
                        name="emptype_name"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                            message: "Please enter a Employee type Name",
                          },
                          {
                            whitespace: true,
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
                      >
                        <InputType
                          
                          value={employeeTName}
                          onChange={(e) => {
                            setEmployeeTName(e.target.value);
                            setuniqueeditCode(false);
                          }}
                         
                          onBlur={ async () => {
                           
                            if (newName !== employeeTName){
                              let a = await CheckUnique({type:"employmenttypename",value:employeeTName})
                             setuniqueeditCode(a)
                            }
                         
                          }}

                        />
                      </Form.Item>
                      {uniqueeditCode ? (
                        <p style={{ color: "red" }}>
                          Employee Type Name {uniqueErrMsg.UniqueErrName}
                        </p>
                      ) : null}
                    </div>

                    <div className="row d-flex justify-content-center">
                      <div className="col-xl-2 col-lg-2 col-12 justify-content-center">
                        <Button btnType="save">Save</Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </>
          }
        />
      </div>
    </>
  );
}
