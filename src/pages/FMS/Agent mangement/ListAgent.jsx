import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { message, Checkbox } from "antd";
import { Input, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import TableData from "../../../components/table/table_data";
import MyPagination from "../../../components/Pagination/MyPagination";
import Custom_model from "../../../components/custom_modal/custom_model";
import Button from "../../../components/button/button";
// import { useEffect, useState } from "react";
import { ROUTES } from "../../../routes";
import { Form } from "antd";
import InputType from "../../../components/Input Type textbox/InputType";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../components/Select Box/SelectBox";
import CheckUnique from "../../../check Unique/CheckUnique";
import { FaTrash } from "react-icons/fa";
import {
  CRM_BASE_URL_HRMS,
  CRM_BASE_URL_PURCHASING,
  GENERAL_SETTING_BASE_URL,
} from "../../../api/bootapi";
import { useNavigate } from "react-router-dom";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import { RiFileSearchFill } from "react-icons/ri";
import PublicFetch from "../../../utils/PublicFetch";
import { getData, getNameList } from "country-list";
import CustomModel from "../../../components/custom_modal/custom_model";
import PageSizer from "../../../components/PageSizer/PageSizer";

function ListAgent() {
  const [countryis, setCountryis] = useState();
  // const options = useMemo(() => getData(), []);
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState(localStorage.getItem("noofitem"));
  const [current, setCurrent] = useState(1);

  const [allagents, setallagents] = useState();

  const [agentdata, setAgentdata] = useState();
  console.log("agent data", agentdata);
  const [inpiutId, setinpiutId] = useState();
  console.log("input name :", inpiutId);
  const [inputCountry, setinputCountry] = useState();
  const [inputcommision, setinputcommision] = useState();
  const [searchedCode, setSearchedCode] = useState("");
  const [modalAddBranch, setModalAddBranch] = useState(false);
  const [uniqueCode, setUniqueCode] = useState(false);
  // const [uniqueName, setUniqueName] = useState(false);
  const [uniqueEditName, setUniqueEditName] = useState(false);
  const [uniqueEditCode, setUniqueEditCode] = useState(false);
  // const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [addForm] = Form.useForm();
  const [successPopup, setSuccessPopup] = useState(false);
  const [FrightEditPopup, setFrightEditPopup] = useState(false);
  const [allempname, setAllempname] = useState();
  const [uniqueName, setUniqueName] = useState();
  const [uniqueErrMsg, setUniqueErrMsg] = useState({});
  console.log("all employee", allempname);
  const [empname, setEmpname] = useState();
  const [empcommision, setempcommision] = useState("");
  const [countryname, setcountryname] = useState();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [allCountries, setAllCountries] = useState();
  const [employeeagentid, setemployeeagentid] = useState();
  console.log("employee agent id : ", employeeagentid);
  const [editempname, setEditempname] = useState("");
  const [editempid, seteditempid] = useState();
  const [editcountrynme, seteditcountrynme] = useState("");
  const [editcommision, seteditcommision] = useState("");
  const [fright_id, setFright_id] = useState();
  const [employee_idd, setEmployee_Idd] = useState();
  const [agentId, setAgentId] = useState();
  const [totalData, setTotalData] = useState();
  const [StartIndex, setStartIndex] = useState();

  console.log("fright id in state", fright_id);
  const [editForm] = Form.useForm();

  const handleEmpnameChange = async (value, option) => {
    console.log("Selected Employee ID:", value);
    setEmpname(value);

    let isUnique = await CheckUnique({
      type: "employeeid",
      value: value,
    });
    console.log("isUnique:", isUnique);
    if (!isUnique) {
      setUniqueName(false);
      setUniqueErrMsg({ UniqueErrName: "Employee ID is not unique" });
    } else {
      setUniqueName(true);
      setUniqueErrMsg({});
    }
  };

  const handleCheckUniueEdit = async (value, options) => {
    console.log("value to the check", value);
    if (value !== employee_idd) {
      let isunique = await CheckUnique({
        type: "employeeid",
        value: value,
      });

      console.log("edit unique check", isunique);
      setUniqueName(isunique);
    }
  };

  const navigate = useNavigate();
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        // navigate(ROUTES.LISTAGENT);
      }, time);
    }
  };

  // const getoneagent = async () => {
  //   try {
  //     const oneagent = await PublicFetch.get(
  //       `${process.env.REACT_APP_BASE_URL}/agents/${employeeagentid}`
  //     );
  //     console.log("one agentss are ::", oneagent?.data?.data);
  //     console.log("one employee agent id ::", oneagent?.data?.data.agent_emp_id);
  //     setemployeeagentid(oneagent?.data?.data?.agent_emp_id)

  //     console.log(
  //       "emp agent is ::",
  //       oneagent?.data?.data.hrms_v1_employee.employee_name
  //     );

  //     seteditempid(oneagent?.data?.data.agent_id);
  //     setEditempname(oneagent?.data?.data?.hrms_v1_employee.employee_name);
  //     seteditcountrynme(oneagent?.data?.data.agent_country);
  //     seteditcommision(oneagent?.data?.data.agent_commission_details);
  //     // setAgentdata(allagent?.data?.data)
  //   } catch (err) {
  //     console.log("error to getting all units", err);
  //   }
  // };
  // console.log("emp id ", editempid);

  const getAllEmployee = () => {
    PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/agents`)
      .then((res) => {
        console.log("all venders", res);
        console.log("all venders types aree", res.data.data);

        let arry = [];
        // res.data.data.map((item, indx) => {
        //   console.log("all jifvn", item);
        //   console.log(
        //     "all emp agentmap",
        //     item.hrms_v1_employment_types.employment_type_name
        //   );
        //   arry.push({
        //     emptype_name: item.hrms_v1_employment_types.employment_type_name,
        //     emp_agent_name: item.employee_name,
        //     emp_agent_id: item.employee_id,
        //   });
        // });
        setAllempname(res?.data?.data);
        // setAllempname(res.data.data)

        // if (res.data.success) {
        //   console.log("Success of employee", res.data.data);
        //   let array = [];
        //   res.data.data.forEach((item, index) => {
        //     array.push({
        //       employee_id: item.employee_id,
        //       employee_name: item.employee_name,
        //       employee_code: item.employee_code,
        //       employee_department: item.hrms_v1_departments.department_name,
        //       employee_branch:item.hrms_v1_branches.branch_name,
        //       employee_grade: item.hrms_v1_employee_grades.employee_grade_name,
        //       employee_type: item.hrms_v1_employment_types.employment_type_name,
        //       employee_designation: item.hrms_v1_designations.designation_name,
        //     });
        //   });
        //   setAllEmployees(array);
        //   console.log("array data ::", array);

        // }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllEmployee();
    // getCountry();
  }, []);

  const handleChange = (e) => {
    // setCountryis(e);
    setAgentCountry(e);
  };
  const handleChangetwo = (e) => {
    // setinputCountry(e);
    setAgentCountry(e);
    // setCountryis(e);
  };
  const [agentcountry, setAgentCountry] = useState();
  console.log("hhhhhh", agentcountry);
  const getAllCountries = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/country/minimal`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAllCountries(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getAllEmployee();
    // getoneagent();
    getAllCountries();
  }, []);

  console.log("inpur employee name", inpiutId);

  const frightEdit = (e) => {
    console.log("Fright edit", e);
    setAgentId(e?.agent_id);
    setinputCountry(e.agent_country);
    setAgentCountry(e.agent_countryid);
    setinputcommision(e.agent_commission_details);
    setinpiutId(e.agent_vendor_id);
    setEmployee_Idd(e.agent_vendor_id);

    editForm.setFieldsValue({
      inpiutId: e.agent_name,
      // inputName:e.agent_emp_name,
      agentcountry: e.agent_country,
      inputcommision: e.agent_commission_details,
    });
    setFrightEditPopup(true);
  };

  const handleUpdate = (e) => {
    console.log("edit data", e);
    const formData = new FormData();

    let data = {
      agent_vendor_id: parseInt(inpiutId),
      agent_country: parseInt(e.agentcountry),
      agent_commission_details: inputcommision,
    };
    let idss = parseInt(agentId);

    PublicFetch.patch(
      `${process.env.REACT_APP_BASE_URL}/agents/${agentId}`,
      data
    )
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          console.log("successDataa", res.data.data);
          getagents(searchedText);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          setFrightEditPopup(false);
        } else {
          // setErrormsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        // setError(true);
      });
  };

  const updateClick = async () => {
    try {
      const updating = await PublicFetch.patch(
        `${process.env.REACT_APP_BASE_URL}/agents/${fright_id}`,
        {
          agent_vendor_id: employeeagentid,
          agent_country: editcountrynme,
          agent_commission_details: editcommision,
        }
      );
      console.log("editedd data is", updating);
      if (updating.data.success) {
        console.log("successfully updating ");
        //  getallunits()
        //  setEditShow(false);
        setSaveSuccess(true);
        close_modal(saveSuccess, 1200);
      }
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };
  const getData = (current, pageSize) => {
    return agentdata?.slice((current - 1) * pageSize, current * pageSize);
  };
  const pageofIndex = pageSize * (current - 1) - 1 + 1;

  const getagents = async (name) => {
    try {
      const allagent = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/agents?noOfItems=${pageSize}&startIndex=${pageofIndex}&search=${name}`
      );

      console.log("agent list iss", allagent.data);
      console.log("startindexx iss", allagent?.data?.data[0]);
      setallagents(allagent.data.data);
      if (allagent?.data.success) {
        let temp = [];
        allagent?.data.data.agents.forEach((item, index) => {
          console.log("agntt", item);
          temp.push({
            agent_id: item.agent_id,
            agent_country: item?.countries?.country_name,
            agent_countryid: item?.agent_country,
            agent_commission_details: item.agent_commission_details,
            agent_vendor_id: item.agent_vendor_id,
            agent_name: item.crm_v1_vendors.vendor_name,
            serialNo: index + 1,
          });
        });
        setAgentdata(temp);
        setTotalData(allagent?.data?.data?.totalCount);
        setStartIndex(allagent?.data?.data?.startIndex);
        console.log("teperaefr", allagent?.data?.data);
      }
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  useEffect(() => {
    if (pageSize) {
      const AgentData = setTimeout(() => {
        getagents(searchedText);
      }, 1000);
      return () => clearTimeout(AgentData);
    }
  }, [pageSize, pageofIndex, searchedText]);

  const data = [
    {
      key: "1",
      attribute_name: "color",
      attribute_description: "this is a test",
    },
    {
      key: "2",
      attribute_name: "size",
      attribute_description: "this is a test description",
    },
  ];

  const [serialNo, setserialNo] = useState(1);
  const columns = [
    {
      title: "SI.NO",
      key: "index",
      width: "13%",
      render: (value, item, index) => item?.serialNo,
      align: "center",
    },
    {
      title: "NAME",
      dataIndex: "agent_name",
      width: "30%",
      // filteredValue: [searchedText],
      // onFilter: (value, record) => {
      //   console.log("valuesss in", record);
      //   return (

      //     String(record.agent_emp_name)
      //       .toLowerCase()
      //       .includes(value.toLowerCase())
      //   );
      // },
      key: "agent_name",

      align: "left",
    },

    // {
    //   title: "Oppurtunity Name",
    //   dataIndex: "attribute_name",
    //   key: "NAME",
    //   width: "25%",
    //   filteredValue: [searchedText],
    //   onFilter: (value, record) => {
    //     console.log("valuesss in", record )
    //     return String(record.attribute_name)
    //       .toLowerCase()
    //       .includes(value.toLowerCase()) || String(record.attribute_description)
    //       .toLowerCase()
    //       .includes(value.toLowerCase())
    //   },
    //   align: "left",
    // },
    {
      title: "COUNTRY",
      dataIndex: "agent_country",
      key: "agent_country",
      width: "25%",

      align: "left",
    },
    {
      title: "Commission",
      dataIndex: "agent_commission_details",
      width: "30%",

      key: "agent_commission_details",

      align: "left",
    },

    {
      title: "ACTION",
      dataIndex: "action",
      align: "center",
      key: "ACTION",
      width: "20%",
      render: (data, index) => {
        console.log("index is of edirt", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="editIcon m-0"
              onClick={
                () => frightEdit(index)
                // setuniqueeditCode(false);
              }
            >
              <FaEdit style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
            <div className="deleteIcon m-0 ">
              <FaTrash style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
          </div>
        );
      },
    },
  ];
  const submitaddagent = async () => {
    try {
      const addagent = await PublicFetch.post(
        `${process.env.REACT_APP_BASE_URL}/agents`,
        {
          agent_vendor_id: parseInt(empname),
          agent_country: countryis,
          agent_commission_details: empcommision,
        }
      );
      console.log(" agent data is added ", addagent);
      if (addagent.data.success) {
        setSuccessPopup(true);
        getagents(searchedText);
        addForm.resetFields();
        setModalAddBranch(false);
        close_modal(successPopup, 1000);
      }
      //  else{
      //    <ErrorMsg code={"500"} />
      //  }
    } catch (err) {
      console.log("err to add the unit", err);
    }
  };

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [["Slno", "NAME", "COUNTRY", "COMMISSIONS"]];
  //for pdf download
  const data12 = agentdata?.map((item, index) => [
    index + serialNo,
    item.agent_name,
    item.agent_country,
    item.agent_commission_details,
  ]);
  console.log("country", agentdata);

  const getFinalCount = (total) => {
    const cutoff = Math.ceil(totalData / pageSize);
    console.log("FinalTest", cutoff, current);
    if (current === cutoff) return totalData;
    return total;
  };
  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap align-items-center">
          <div className="col-4">
            <h5 className="lead_text">List Agent</h5>
          </div>
          <div className="col-4">
            <Input.Search
              className="inputSearch"
              placeholder="Search  "
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
        {/* <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}> */}

        {/* <div className="col-4">
            <Input.Search
              placeholder="Search by Employee Code"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedCode}
              onChange={(e) => {
                setSearchedCode(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedCode(value);
              }}
            />
          </div> */}
        {/* </div> */}
        <div className="row my-3">
          <div className="col-4 px-3 ">
            {agentdata ? (
              <>
                <div className="d-flex justify-content-start align-items-center gap-3">
                  <PageSizer
                    pageValue={(e) => {
                      setPageSize(e);
                    }}
                  />

                  {/* <Select
                bordered={false}
                className="page_size_style"
                value={pageSize}
                onChange={(e) => setPageSize(e)}
              >
                <Select.Option value="25">
                  Show
                  <span className="vertical ms-1">|</span>
                  <span className="sizes ms-2"> 25</span>
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

                  <div className=" d-flex  align-items-center mt-2 ">
                    <label className="font_size">
                      {/* Results 1-70 */}
                      Results: {StartIndex + 1} -
                      {getFinalCount(1 * pageSize * current)}{" "}
                      <span>of {totalData} </span>{" "}
                    </label>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col-4 d-flex  align-items-center justify-content-center">
            {totalData > 0 ? (
              <>
                <MyPagination
                  total={totalData}
                  current={current}
                  showSizeChanger={true}
                  pageSize={pageSize}
                  onChange={(current, pageSize) => {
                    setCurrent(current);
                    setPageSize(pageSize);
                  }}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col-4 d-flex justify-content-end">
            {/* <Link to={ROUTES.CREATEAGENT} style={{ color: "white" }}> */}
            {/* <Button
              btnType="add"
              onClick={() => {
                setModalAddBranch(true);
                setUniqueCode(false);
                setUniqueName(false);
                addForm.resetFields();
              }}
            >
              New Agent
            </Button> */}
            {/* </Link> */}
          </div>
        </div>

        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={agentdata}
            columns={columns}
            // columns={filteredColumns}
            custom_table_css="attribute_table"
          />
        </div>
        <div className="d-flex py-2 justify-content-center">
          {totalData > 0 ? (
            <>
              <MyPagination
                total={totalData}
                current={current}
                showSizeChanger={true}
                pageSize={pageSize}
                onChange={(current, pageSize) => {
                  setCurrent(current);
                  setPageSize(pageSize);
                }}
              />
            </>
          ) : (
            ""
          )}
        </div>

        {/* Modal for add Agent */}
        <CustomModel
          show={modalAddBranch}
          onHide={() => setModalAddBranch(false)}
          header="Add Agent"
          footer={false}
          // {...props}
          View_list
          list_content={
            <>
              <div>
                <h5 className="lead_text">New Agent</h5>
              </div>
              <div className="container-fluid  my-3">
                <div className="row my-3 ">
                  <Form
                    form={addForm}
                    onFinish={(value) => {
                      console.log("the formvaluess iss", value);
                      submitaddagent();
                      // submitaddunit();
                    }}
                    onFinishFailed={(error) => {
                      console.log(error);
                    }}
                  >
                    <div className="row">
                      <div className="col-12 pb-2">
                        <div className="">
                          <label>Vendor</label>
                          <label
                            style={{
                              color: "red",
                              fontWeight: "500",
                              marginLeft: "2px",
                            }}
                          >
                            *
                          </label>
                          {/* <Form.Item
                                name="employee_branch"
                                rules={[
                                  {
                                    required: true,
                                    message: "Employee agent is Required",
                                  },
                                ]}
                              >
                                <SelectBox
                                  value={allempname}
                                  onChange={(e) => {
                                    console.log("selected unit iss", e);
                                    setEmpname(e);
                                    setUniqueName(false);
                                  }}
                                  onBlur={ async () => {
                      
                                    let a = await CheckUnique({type:"employeeid",value:allempname})
                                    console.log("hai how are u", a)
                                    setUniqueName(a);
                                    
                                  }}
                                >
                                  {allempname &&
                                    allempname.length > 0 &&
                                    allempname.map((item, index) => {
                                      console.log("all emptypenamess", item);
                                    
                                        return (
                                          <Select.Option
                                            key={item.emp_agent_id}
                                            value={item.emp_agent_id}
                                          >
                                            {item.emp_agent_name}
                                          </Select.Option>
                                        );
                                    })}
                                </SelectBox>
                              </Form.Item>
                              {uniqueName ? (
                            <p style={{ color: "red"  }}>
                            Freight Type Name {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null} */}
                          <Form.Item
                            name="employee_branch"
                            rules={[
                              {
                                required: true,
                                message: "Please select vendor",
                              },
                            ]}
                            // validateStatus={uniqueName ? "success" : "error"}
                            // help={uniqueErrMsg.UniqueErrName}
                          >
                            <SelectBox
                              value={allempname}
                              onChange={handleEmpnameChange}
                              // onBlur={handleEmpnameChange}
                            >
                              {allempname &&
                                allempname.length > 0 &&
                                allempname.map((item, index) => {
                                  console.log("all emptypenamess", item);
                                  return (
                                    <Select.Option
                                      key={item.vendor_id}
                                      value={item.vendor_id}
                                    >
                                      {item.vendor_name}
                                    </Select.Option>
                                  );
                                })}
                            </SelectBox>
                          </Form.Item>
                          {uniqueName ? (
                            <p style={{ color: "red" }}>
                              Agent already exist {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null}

                          {/* <SelectBox>
                                <Select.Option>Manger</Select.Option>
                              </SelectBox> */}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="py-2">
                          <label>Country</label>
                          <Form.Item>
                            <SelectBox
                              showSearch={true}
                              allowClear
                              value={agentcountry}
                              optionFilterProp="children"
                              // onChange={handleChange}
                            >
                              {allCountries &&
                                allCountries.length > 0 &&
                                allCountries.map((item, index) => {
                                  return (
                                    <Select.Option
                                      key={item.country_id}
                                      id={item.country_id}
                                      value={item.country_name}
                                    >
                                      {item.country_name}
                                    </Select.Option>
                                  );
                                })}
                            </SelectBox>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-12 pb-4">
                        <div className="py-2">
                          <label>Commission</label>
                          <Form.Item>
                            <TextArea
                              value={empcommision}
                              onChange={(e) => setempcommision(e.target.value)}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-center">
                          <Button
                            type="submit"
                            className="p-2 save_button_style"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                    <label
                      style={{
                        color: "red",
                        fontWeight: "100",
                        marginRight: "2px",
                      }}
                    >
                      *
                    </label>
                    <label style={{ marginRight: "2px", fontSize: "10px" }}>
                      Indicates required field
                    </label>
                  </Form>
                </div>
              </div>
            </>
          }
        ></CustomModel>

        <Custom_model
          size={"sm"}
          success
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
        />

        {/* Modal for edit Agent */}
        <Custom_model
          show={FrightEditPopup}
          onHide={() => {
            setFrightEditPopup(false);
            setUniqueName(false);
          }}
          View_list
          list_content={
            <div>
              <div>
                <h5 className="lead_text">Edit Agent</h5>
              </div>
              <div className="container-fluid  my-3">
                <div className="row my-3 ">
                  <Form
                    form={editForm}
                    onFinish={(value) => {
                      console.log("the formvaluess iss", value);
                      handleUpdate(value);
                    }}
                    onFinishFailed={(error) => {
                      console.log(error);
                    }}
                  >
                    <div className="row">
                      <div className="col-12 pb-3">
                        <div className="">
                          <label>Agent Name</label>
                          <Form.Item
                            name="inpiutId"
                            rules={[
                              {
                                required: true,
                                message: "empname is Required",
                              },
                            ]}
                          >
                            <SelectBox
                              value={inpiutId}
                              onChange={(e) => {
                                console.log("sdf", e);
                                setinpiutId(parseInt(e));
                                handleCheckUniueEdit(e);
                              }}
                              // onBlur={() => {

                              // }}
                              disabled={true}
                            >
                              {allempname &&
                                allempname.length > 0 &&
                                allempname.map((item, index) => {
                                  // if (item.emptype_name == "Agent") {
                                  return (
                                    <Select.Option
                                      id={item.vendor_id}
                                      key={item.vendor_id}
                                      value={item.vendor_id}
                                    >
                                      {item.vendor_name}
                                    </Select.Option>
                                  );
                                  // }
                                })}
                            </SelectBox>
                          </Form.Item>
                          {uniqueName ? (
                            <p style={{ color: "red" }}>
                              Agent already exist {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="py-2">
                          <label>Country</label>
                          <Form.Item name="agentcountry">
                            <SelectBox
                              value={agentcountry}
                              showSearch
                              allowClear={true}
                              optionFilterProp="children"
                              onChange={handleChangetwo}
                            >
                              {allCountries &&
                                allCountries.length > 0 &&
                                allCountries.map((item, index) => {
                                  return (
                                    <Select.Option
                                      key={item.country_id}
                                      id={item.country_id}
                                      value={item.country_id}
                                    >
                                      {item.country_name}
                                    </Select.Option>
                                  );
                                })}
                            </SelectBox>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="py-2">
                          <label>Commission</label>
                          <Form.Item name="inputcommision">
                            <TextArea
                              value={inputcommision}
                              onChange={(e) => {
                                setinputcommision(e.target.value);
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="col-12 d-flex justify-content-center mt-5">
                          <Button className="save_button">Save</Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
                {/* {error ? (
                <div className="">
                  <ErrorMsg code={"400"} />
                </div>
              ) : (
                ""
              )} */}
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
export default ListAgent;
