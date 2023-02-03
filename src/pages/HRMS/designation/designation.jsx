import React, { useEffect, useState } from "react";
import "./designation.scss";
import { Link } from "react-router-dom";
import { Form, Input, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import TableData from "../../../components/table/table_data";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../routes";
import { CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import PublicFetch from "../../../utils/PublicFetch";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../check Unique/CheckUnique";
import MyPagination from "../../../components/Pagination/MyPagination";

// { Add and list Designation - Ann - 15/11/22 }
export default function Designation() {
  const [error, setError] = useState(false);

  const [addForm] = Form.useForm();
  const [successModal, setSuccessModal] = useState(false);
  const [designation, setDesignation] = useState();
  const [designationList, setDesignationList] = useState();
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [desigtiondata, setdesigtiondata] = useState("");
  const [current, setCurrent] = useState(1);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [designationname, setDesignationname] = useState("");
  const [designationcode, setDesignationcode] = useState("");
  const [editShow, setEditShow] = useState(false);
  const [editdesignationname, seteditdesignationname] = useState("");
  const [editdesignationcode, seteditdesignationcode] = useState("");
  const [desigid, setdesigid] = useState();
  const [uniqueName, setUniqueName] = useState(false);
  const [uniqueCode, setUniqueCode] = useState(false);
  const [uniqueEditName, setUniqueEditName] = useState(false);
  const [uniqueEditCode, setUniqueEditCode] = useState(false);
  const [editUniqueName, setEditUniqueName] = useState();
  const [editUniqueCode, setEditUniqueCode] = useState();
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);

  const [editForm] = Form.useForm();

  const getData = (current, pageSize) => {
    return desigtiondata?.slice((current - 1) * pageSize, current * pageSize);
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSaveSuccess(false);
        getalldesignation();
        // navigate(ROUTES.UNIT_LIST)
      }, time);
    }
  };

  const handleEditclick = (item) => {
    console.log("editt valuesss", item);
    seteditdesignationname(item?.designation_name);
    seteditdesignationcode(item?.designation_code);
    setdesigid(item?.designation_id);
    setEditUniqueName(item?.designation_name);
    setEditUniqueCode(item?.designation_code);
    editForm.setFieldsValue({
      //  unitid: item.unit_id,
      desig_name: item.designation_name,
      desig_code: item.designation_code,
    });
    setEditShow(true);
  };

  useEffect(() => {
    getalldesignation();
    //  Submit();
  }, []);

  const getalldesignation = async () => {
    try {
      const alldesigntion = await PublicFetch.get(
        `${CRM_BASE_URL_HRMS}/designation`
      );
      console.log("all designation are ::", alldesigntion?.data?.data);
      setdesigtiondata(alldesigntion?.data?.data);

      // setAllunit(allunits?.data?.data)
      // setunitTable(allunits?.data?.data)
    } catch (err) {
      console.log("error to getting all designation", err);
    }
  };

  const updateClick = async (id) => {
    try {
      const updating = await PublicFetch.patch(
        `${CRM_BASE_URL_HRMS}/designation/${desigid}`,
        {
          designation_name: editdesignationname.trim(" "),
          designation_code: editdesignationcode,
        }
      );
      console.log("editedd data is", updating);
      if (updating.data.success) {
        console.log("successfully updating ");
        //  setViewUnitModal(false)
        getalldesignation();
        setEditShow(false);
        setSaveSuccess(true);
        close_modal(saveSuccess, 1200);
      } else if (updating.data.success === false) {
        alert(updating.data.data);
      }
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  const submitaddunit = async () => {
    try {
      const adddesigntion = await PublicFetch.post(
        `${CRM_BASE_URL_HRMS}/designation`,
        {
          designation_name: designationname,
          designation_code: designationcode,
        }
      );
      console.log("unit data is added ", adddesigntion);
      if (adddesigntion.data.success) {
        setSaveSuccess(true);
        addForm.resetFields();
        close_modal(saveSuccess, 1000);
      }
      //  else if(adddesigntion.data.success===false){
      //   alert(adddesigntion.data.data);
      //   //  <ErrorMsg code={"500"} />
      //  }
    } catch (err) {
      console.log("err to add the unit", err);
    }
  };

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "40%",

      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="m-0">
              <div
                className="editIcon m-0"
                onClick={() => {
                  handleEditclick(index);
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
      title: "DESIGNATION NAME",
      dataIndex: "designation_name",
      key: "designation_name",
      width: "25%",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.designation_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      // align: "center",
    },
    {
      title: "DESIGNATION CODE",
      dataIndex: "designation_code",
      key: "designation_code",
      align: "center",
    },
  ];

  const data = [
    {
      designation_name: "Manager",
      key: "1",
    },
    {
      designation_name: "Developer",
      key: "2",
    },
    {
      designation_name: "HR",
      key: "3",
    },
  ];
  return (
    <>
      <div className="container mb-4 d-flex justify-content-center">
        <div className="containerdesig ">
          <div className="row mx-2">
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("valuezzzzzzz", value);
                // Submit()
                submitaddunit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row flex-wrap pt-1">
                <div className="row ms-0 py-1">
                  <div className="col-12 pt-3">
                    <label htmlfor="designation">Designation Name</label>
                    <Form.Item
                      name="Designation name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a valid Designation Name",
                        },
                      ]}
                      // onChange={(e) => setDesignationname(e.target.value)}
                    >
                      <InputType
                        value={designationname}
                        onChange={(e) => {
                          setDesignationname(e.target.value);
                          setUniqueName(false);
                        }}
                        onBlur={async () => {
                          let n = await CheckUnique({
                            type: "designationname",
                            value: designationname,
                          });
                          setUniqueName(n);
                        }}
                      />
                    </Form.Item>
                    {uniqueName ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Designation Name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="row ms-0 py-1">
                  <div className="col-12 ">
                    <label htmlfor="designation">Designation Code</label>
                    <Form.Item
                      name="Designation code"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z]+$"),
                          message: "Please enter a valid Designation Name",
                        },
                      ]}
                    >
                      <InputType
                        onChange={(e) => {
                          setDesignationcode(e.target.value);
                          setUniqueCode(false);
                        }}
                        onBlur={async () => {
                          let c = await CheckUnique({
                            type: "designationcode",
                            value: designationcode,
                          });
                          setUniqueCode(c);
                        }}
                      />
                    </Form.Item>
                    {uniqueCode ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Designation Name {uniqueErrMsg.UniqueErrName}
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
              show={successModal}
              onHide={() => setSuccessModal(false)}
              success
            />
          </div>
        </div>
      </div>

      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Designation</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Designation"
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
          <div className="col-4 d-flex  justify-content-center">
              <MyPagination
                total={desigtiondata?.length}
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
            <div className="col-4"></div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(numofItemsTo, pageofIndex)}
            data={getData(current, pageSize)}
            // data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
              <MyPagination
                total={desigtiondata?.length}
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
          show={editShow}
          onHide={() => {
            setEditShow(false);
          }}
          View_list
          list_content={
            <div className="container-fluid px-4 my-4 ">
              <h6 className="lead_text">Edit Designation</h6>
              <Form
                form={editForm}
                onFinish={(value) => {
                  console.log("the formvaluess iss", value);
                  updateClick();
                  // updateClick();
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <label>Name</label>
                    <Form.Item
                      name="desig_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Designation Name",
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
                        value={editdesignationname}
                        onChange={(e) => {
                          seteditdesignationname(e.target.value);
                          setUniqueEditName(false);
                        }}
                        onBlur={async () => {
                          if (editUniqueName !== editdesignationname) {
                            let a = await CheckUnique({
                              type: "designationname",
                              value: editdesignationname,
                            });

                            setUniqueEditName(a);
                          }
                        }}
                      />
                    </Form.Item>
                    {uniqueEditName ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Designation Name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-12 py-2">
                    <label>Code</label>
                    <Form.Item
                      name="desig_code"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9]+$"),
                          message: "Please enter a Valid Unit code",
                        },
                        {
                          min: 2,
                          message: "code must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message:
                            "Unit code cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        value={editdesignationcode}
                        onChange={(e) => {
                          seteditdesignationcode(e.target.value);
                          setUniqueEditCode(false);
                        }}
                        onBlur={async () => {
                          if (editUniqueCode !== editdesignationcode) {
                            let a = await CheckUnique({
                              type: "designationcode",
                              value: editdesignationcode,
                            });
                            setUniqueEditCode(a);
                          }
                        }}
                      />
                    </Form.Item>
                    {uniqueEditCode ? (
                      <p style={{ color: "red", marginTop: "-24px" }}>
                        Designation code {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-xl-2 col-lg-2 col-12 justify-content-center">
                      <Button
                        btnType="save"
                        // onClick={(id) => {
                        //   updateClick();
                        //   setEditShow(false);
                        // }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          }
        />

        <Custom_model
          size={"sm"}
          show={saveSuccess}
          onHide={() => setSaveSuccess(false)}
          success
        />
      </div>
    </>
  );
}
