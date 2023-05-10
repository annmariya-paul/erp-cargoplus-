import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import TableData from "../../../components/table/table_data";
import Custom_model from "../../../components/custom_modal/custom_model";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../check Unique/CheckUnique";
import MyPagination from "../../../components/Pagination/MyPagination";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";

function Employeegrade() {
  const [searchedText, setSearchedText] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);
  const [editShow, setEditShow] = useState(false);
  const [newName, setNewName] = useState();
  const [uniqueeditCode, setuniqueeditCode] = useState(false);
  const [employeegradedata, setemployeegradedata] = useState();
  const [editempgradename, seteditempgradename] = useState("");

  const [editempgradeid, seteditempgradeid] = useState();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [uniqueCode, setuniqueCode] = useState(false);
  const [employeeGrade, setEmployeeGrade] = useState();
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);

  const [addmodalshow, setAddmodalshow] = useState(false);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSaveSuccess(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return employeegradedata?.slice(
      (current - 1) * pageSize,
      current * pageSize
    );
  };

  const getallempgrade = async () => {
    try {
      const allemptype = await PublicFetch.get(
        `${CRM_BASE_URL_HRMS}/employee-grades`
      );
      console.log("all empolymntgrades are ::", allemptype?.data?.data);

      setemployeegradedata(allemptype?.data?.data);
    } catch (err) {
      console.log("error to getting all employmntgrade", err);
    }
  };

  useEffect(() => {
    getallempgrade();
  }, []);

  const submitaddemp = async () => {
    try {
      const addemployegrade = await PublicFetch.post(
        `${CRM_BASE_URL_HRMS}/employee-grades`,
        {
          employee_grade_name: employeeGrade,
        }
      );
      console.log("employegrade data is added ", addemployegrade);
      if (addemployegrade.data.success) {
        getallempgrade();
        setAddmodalshow(false);
        setSuccessModal(true);
        addForm.resetFields();
        setSaveSuccess(true);
        close_modal(saveSuccess, 1000);
      }
    } catch (err) {
      console.log("err to add the employee Grade", err);
    }
  };

  const updateClick = async (id) => {
    try {
      const updating = await PublicFetch.patch(
        `${CRM_BASE_URL_HRMS}/employee-grades/${editempgradeid}`,
        {
          employee_grade_name: employeeGrade,
        }
      );
      console.log("editedd data is", updating);
      if (updating.data.success) {
        console.log("successfully updating ");
        //  setViewUnitModal(false)
        getallempgrade();
        setEditShow(false);
        setSaveSuccess(true);
        close_modal(saveSuccess, 1200);
      }
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  const handleEditclick = (item) => {
    console.log("editt valuesss", item);
    seteditempgradename(item?.employee_grade_name);
    seteditempgradeid(item?.employee_grade_id);
    setNewName(item?.employee_grade_name);
    editForm.setFieldsValue({
      Employment_grade_name: item?.employee_grade_name,
    });
    setEditShow(true);
  };

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
      title: "EMPLOYEE GRADE NAME",
      dataIndex: "employee_grade_name",
      key: "employee_grade_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.employee_grade_name)
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
      "EMPLOYEE GRADE NAME",
      //  "DESIGNATION CODE",
      // "CUSTOMER",
      // "COST",
      // "EXPENSE",
      // "PROFIT/LOSS",
    ],
  ];
  //for pdf download
  const data12 = employeegradedata?.map((item, index) => [
    index + serialNo,
    item.employee_grade_name,
    //  item.designation_code,
    // item.lead,
    // item.cost,
    // item.expense,
    // item.profit,
  ]);

  return (
    <>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap align-items-center">
          <div className="col-4">
            <h5 className="lead_text">Employee Grade</h5>
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
        </div>
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}></div> */}
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
          <div className="col-4 d-flex py-2 justify-content-center">
            {/* <MyPagination
              total={employeegradedata?.length}
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
          <div className="col-4">
            <Button btnType="add" onClick={() => setAddmodalshow(true)}>
              New Employee Grade
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={employeegradedata}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>

        <div className="d-flex py-0 justify-content-center">
          {/* <MyPagination
            total={employeegradedata?.length}
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

        <Custom_model
          size={"sm"}
          show={addmodalshow}
          onHide={() => {
            setAddmodalshow(false);
          }}
          View_list
          list_content={
            <>
              <h6 className="lead_text">New Employee Grade</h6>
              <div className="container-fluid px-2 my-4 ">
                <Form
                  name="addForm"
                  form={addForm}
                  onFinish={(value) => {
                    console.log("valuezzzzzzz", value);
                    submitaddemp();
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row ">
                    {/* <div className="row ms-0 py-1"> */}
                      <div className="col-12  ">
                        <label htmlfor="emp_type_name">
                        Name<span className="required">*</span>
                        </label>
                        <Form.Item className="mt-2 "
                          name="Employment_grade_name"
                          rules={[
                            {
                              required: true,
                              // pattern: new RegExp("^[A-Za-z ]+$"),
                              message:
                                "Please enter a valid employee grade name",
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
                            onChange={(e) => {
                              setEmployeeGrade(e.target.value);
                              setuniqueCode(false);
                            }}
                            onBlur={async () => {
                              let a = await CheckUnique({
                                type: "employmentgradename",
                                value: employeeGrade,
                              });
                              console.log("hai how are u", a);
                              setuniqueCode(a);
                            }}
                          />
                        </Form.Item>
                        {uniqueCode ? (
                          <p style={{ color: "red" }}>
                            Employement Grade Name {uniqueErrMsg.UniqueErrName}
                          </p>
                        ) : null}
                      </div>
                    {/* </div> */}
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
              <h6 className="lead_text">Edit Employee Grade</h6>
              <div className="container-fluid px-2 my-4 ">
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
                      <label>Name<span className="required">*</span></label>
                      <Form.Item className="mt-2"
                        name="Employment_grade_name"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z ]+$"),
                            message: "Please enter a valid employee grade name",
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
                          value={employeeGrade}
                          onChange={(e) => {
                            setEmployeeGrade(e.target.value);
                            setuniqueeditCode(false);
                          }}
                          onBlur={async () => {
                            if (newName !== employeeGrade) {
                              let a = await CheckUnique({
                                type: "employmentgradename",
                                value: employeeGrade,
                              });
                              console.log("hai how are u", a);
                              setuniqueeditCode(a);
                            }
                          }}
                        />
                      </Form.Item>
                      {uniqueeditCode ? (
                        <p style={{ color: "red" }} className="mb-2">
                          Employee Grade Name {uniqueErrMsg.UniqueErrName}
                        </p>
                      ) : null}
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-auto mt-2">
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
export default Employeegrade;
