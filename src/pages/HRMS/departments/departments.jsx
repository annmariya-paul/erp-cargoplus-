import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";
import { Link } from "react-router-dom";
import { Form, Input, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import MyPagination from "../../../components/Pagination/MyPagination";
import TableData from "../../../components/table/table_data";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../check Unique/CheckUnique";
// import "../../../components/button/button.scss";

// { Add and list Departments - Ann mariya - 16/11/22 }
export default function Departments(props) {
  const [editForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [addForm, setAddForm] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [modalAddDept, setModalAddDept] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [deptName, setDeptName] = useState();
  const [deptCode, setDeptCode] = useState();
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [alldepartmentdata, setAllDepartmentData] = useState();
  const [showEditModal, setShowEditModal] = useState();
  const [department_id, setDepartment_id] = useState();
  const[loading,setLoading]=useState(false);
  const [uniqueName, setUniqueName] = useState(false);
  const [uniqueEditName, setUniqueEditName] = useState(false);
  const [uniqueCode, setUniqueCode] = useState(false);
  const [uniqueEditCode, setUniqueEditCode] = useState(false);
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [editUniqueName, setEditUniqueName] = useState();
  const [editUniqueCode, setEditUniqueCode] = useState();
  const [searchedcodeText, setSearchedcodeText] = useState("");
  const [serialNo, setserialNo] = useState(1);
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessModal(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return alldepartmentdata?.slice(
      (current - 1) * pageSize,
      current * pageSize
    );
  };

  useEffect(() => {
    Submit();
  }, []);

  const validateNumberAndText = (_, value) => {
    const regex = /^[0-9a-zA-Z]*$/; // Regular expression to allow numbers and text only
    if (!regex.test(value)) {
      return Promise.reject('Please enter numbers and text only');
    }
    return Promise.resolve();
  };




  const Submit = (data) => {
    console.log(data);
    if (data) {
      localStorage.setItem("Form", JSON.stringify(data));
      setSuccessModal(true);
      close_modal(successModal, 1000);
    } else {
      setError(true);
    }
  };

  const createDepartment = (data) => {
    setLoading(true);
    PublicFetch.post(`${CRM_BASE_URL_HRMS}/departments`, data)
      .then((res) => {
        setLoading(false);
        console.log("response", res);
        if (res.data.success) {
          console.log("success ", res.data.success);
          setSuccessModal(true);
          getAllDepartments();
          close_modal(successModal, 1000);
          setModalAddDept(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error", err);
        setError(true);
      });
  };

  const getAllDepartments = () => {
   
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/departments`)
      .then((res) => {
      
        console.log("all dept response", res.data.data);
        if (res.data.success) {
         
          setAllDepartmentData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  const handleEditClick = (data) => {
    console.log("hsfdhs", data);
    if (data) {
      setEditUniqueName(data?.department_name);
      setEditUniqueCode(data?.department_code);
      setShowEditModal(true);
      setDepartment_id(data.department_id);
      editForm.setFieldsValue({
        dept_code: data.department_code,
        dept_name: data.department_name,
      });
    }
  };

  const UpdateDepartment = (data) => {
    setLoading(true);
    console.log("updating data", data);
    PublicFetch.patch(`${CRM_BASE_URL_HRMS}/departments/${department_id}`, {
      department_name: data?.dept_name,
      department_code: data?.dept_code,
    })
      .then((res) => {
        setLoading(false);
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setSuccessModal(true);
          close_modal(successModal, 1000);
          setShowEditModal(false);
          getAllDepartments();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error", err);
      });
  };

  // const checkEditDeptNameis = (data) => {
  //   if (editUniqueName !== deptName) {
  //     PublicFetch.get(
  //       `${process.env.REACT_APP_BASE_URL}/misc?type=departmentname&value=${deptName}`
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

  // const checkEditDeptCodeis = (data) => {
  //   if (editUniqueCode !== deptCode) {
  //     PublicFetch.get(
  //       `${process.env.REACT_APP_BASE_URL}/misc?type=departmentcode&value=${deptCode}`
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

  const columns = [
    {
      title: "SI.NO",
      key: "index",
      width: "20%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },

    {
      title: "DEPARTMENT NAME",
      dataIndex: "department_name",
      key: "department_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.department_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.department_code)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      align: "left",
    },
    {
      title: "DEPARTMENT CODE",
      dataIndex: "department_code",
      key: "department_code",
      filteredValue: [searchedcodeText],
      onFilter: (value, record) => {
        return String(record.department_code)
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
                  handleEditClick(index);
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
  ];

  const data = [
    {
      dept_name: "Dept test",
      dept_code: "DEPTAA",
      key: "1",
    },
    {
      dept_name: "Dept sample",
      dept_code: "DEPTBB",
      key: "2",
    },
    {
      dept_name: "Technical",
      dept_code: "DEPTCC",
      key: "3",
    },
  ];

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
      "DEPARTMENT NAME",
      "DEPARTMENT CODE",
      // "CUSTOMER",
      // "COST",
      // "EXPENSE",
      // "PROFIT/LOSS",
    ],
  ];
  //for pdf download
  const data12 = alldepartmentdata?.map((item, index) => [
    index + serialNo,
    item.department_name,
    item.department_code,
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
            <h5 className="lead_text">Departments</h5>
          </div>
          <div className="col-4">
            <Input.Search
              className="inputSearch"
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
        {/* <div className="col-4">
            <Input.Search
              placeholder="Search by Department Code"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedcodeText}
              onChange={(e) => {
                setSearchedcodeText(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedcodeText(value);
              }}
            />
          </div> */}
        {/* </div> */}
        <div className="row my-3">
          <div className="col-4 px-3">
            {/* <Select
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
            </Select> */}
          </div>
          <div className=" col-4 d-flex justify-content-center">
            {/* <MyPagination
              total={alldepartmentdata?.length}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                console.log("ggdhffs", current, pageSize);
                setCurrent(current);
                setPageSize(pageSize);
              }}
            /> */}
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Button btnType="add" onClick={() =>
            {
              setModalAddDept(true);
              setUniqueName(false);
              setUniqueCode(false);
              addForm.resetFields();
            }
            
               
               }>
              New Department
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={alldepartmentdata}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          {/* <MyPagination
            total={alldepartmentdata?.length}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              console.log("ggdhffs", current, pageSize);
              setCurrent(current);
              setPageSize(pageSize);
            }}
          /> */}
        </div>
      </div>

      <Custom_model
        show={modalAddDept}
        onHide={() => setModalAddDept(false)}
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">New Department</h5>
            </div>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("valuezzzzzzz", value);
                Submit();
                createDepartment(value);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label htmlfor="dept_name">Department Name<span className="required">*</span></label>
                  <Form.Item
                    name="department_name"
                    rules={[
                      {
                        required: true,
                       
                        message: "Please enter a valid department name",
                      },
                      {
                        whitespace: true,
                      },
                     
                    ]}
                  >
                    <InputType
                      value={deptName}
                      onChange={(e) => {
                        setDeptName(e.target.value);
                        setUniqueName(false);
                      }}
                      onBlur={async () => {
                        let n = await CheckUnique({
                          type: "departmentname",
                          value: deptName,
                        });
                        setUniqueName(n);
                      }}
                    />
                  </Form.Item>
                  {uniqueName ? (
                    <p style={{ color: "red" }}>
                      Department Name {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
                </div>

                <div className="col-12 pt-3">
                  <label htmlfor="dept_code">Department Code<span className="required">*</span></label>
                  <Form.Item
                    name="department_code"
                    rules={[
                      {
                        required: true,
                      
                        message: "Please enter a valid department code",
                      },
                     
                      // {
                      //   validator: validateNumberAndText,
                      // },
                    ]}
                  >
                    <InputType
                      onChange={(e) => {
                        setDeptCode(e.target.value);
                        setUniqueCode(false);
                      }}
                      onBlur={async () => {
                        let c = await CheckUnique({
                          type: "departmentcode",
                          value: deptCode,
                        });
                        setUniqueCode(c);
                      }}
                    />
                  </Form.Item>
                  {uniqueCode ? (
                    <p style={{ color: "red" }}>
                      Department code {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button 
                   className={loading ? "btn_loadingColor" : ""}
                  // className='btn_loadingColor'
                  // className='uu' 
                  disabled={loading}
                  // style={loading ? { backgroundColor: "gray" } : {}}
                   btnType="save"
                   >Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      ></Custom_model>
      <Custom_model
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Edit Department</h5>
            </div>
            <Form
              name="editForm"
              form={editForm}
              onFinish={(value) => {
                console.log("valuezzzzzzz", value);
                Submit();
                UpdateDepartment(value);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label htmlfor="dept_name">Department Name<span className="required">*</span></label>
                  <Form.Item
                    name="dept_name"
                    rules={[
                      {
                        required: true,
                        // pattern: new RegExp("^[A-Za-z ]+$"),
                        message: "Please enter a valid department name",
                      },
                      {
                        whitespace: true,
                      },
                     
                    ]}
                  >
                    <InputType
                      onChange={(e) => {
                        setDeptName(e.target.value);
                        setUniqueEditName(false);
                      }}
                      onBlur={async () => {
                        if (editUniqueName !== deptName) {
                          let n = await CheckUnique({
                            type: "departmentname",
                            value: deptName,
                          });
                          setUniqueEditName(n);
                        }
                      }}
                    />
                  </Form.Item>
                  {uniqueEditName ? (
                    <p style={{ color: "red" }}>
                      Department Name {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
                </div>

                <div className="col-12 pt-3">
                  <label htmlfor="dept_code">Department Code<span className="required">*</span></label>
                  <Form.Item
                    name="dept_code"
                    rules={[
                      {
                        required: true,
                        // pattern: new RegExp("^[A-Za-z]+$"),
                        message: "Please enter a valid department code",
                      },
                      
                      // {
                      //   validator: validateNumberAndText,
                      // },
                    ]}
                  >
                    <InputType
                      onChange={(e) => {
                        setDeptCode(e.target.value);
                        setUniqueEditCode(false);
                      }}
                      onBlur={async () => {
                        if (editUniqueCode !== deptCode) {
                          let c = await CheckUnique({
                            type: "departmentcode",
                            value: deptCode,
                          });
                          setUniqueEditCode(c);
                        }
                      }}
                    />
                  </Form.Item>
                  {uniqueEditCode ? (
                    <p style={{ color: "red" }}>
                      Department code {uniqueErrMsg.UniqueErrName}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button 
                   className={loading ? "btn_loadingColor" : ""}
                 disabled={loading}
                   btnType="save"
                   >
                    Save
                    </Button>
                </div>
              </div>
            </Form>
          </>
        }
      ></Custom_model>
      <Custom_model show={successModal} success />
    </>
  );
}
