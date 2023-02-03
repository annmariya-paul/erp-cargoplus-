import "./quotation.scss";
// import React, { useState } from "react";
// import { Form, Select } from "antd";
// import { useNavigate } from "react-router-dom";
// import InputType from "../../../../components/Input Type textbox/InputType";
// import SelectBox from "../../../../components/Select Box/SelectBox";
// import Button from "../../../../components/button/button";

import FileUpload from "../../../../components/fileupload/fileUploader";
import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import TableData from "../../../../components/table/table_data";
import { Link } from "react-router-dom";
// import { Form } from "react-bootstrap";
import { MdDragHandle } from "react-icons/md";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { AiOutlineDelete } from "react-icons/ai";

import { Collapse, Form, Input, Popconfirm } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";
import { CRM_BASE_URL_FMS, CRM_BASE_URL_SELLING, GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";
import {Select} from "antd";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import {  useParams } from "react-router-dom";
import { DatePicker } from "antd";
import "./quotation.scss";
import { DragOutlined, RightOutlined } from "@ant-design/icons";
import Input_Number from "../../../../components/InputNumber/InputNumber";
import { FaTrash } from "react-icons/fa";
import { cargo_typeoptions } from "../../../../utils/SelectOptions";
export default function EditQuotation(
  custom_table_css,
  expandable,
  expandIconColumnIndex

) {
  const [editForm] = Form.useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState();
  console.log(date);

  const [addForm] = Form.useForm();
  const navigate = useNavigate();
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
  const [amount, setAmount] = useState(0);

  const handleChange = (value) => {
    setAmount(value);
  };

  const [searchType, setSearchType] = useState("");
  const [rows, setRows] = useState([
    {
      id: 1,
      tasks: [],
      cost: "",
      taxtype: "",
      taxamount: "",
      totalamount: "",
    },
  ]);
  console.log("rows are :", rows);

  const [taskList, setTasks] = useState(rows);
  const handleKeyDown = useCallback(
    (e, id) => {
      if (e.keyCode === 13 || e.keyCode === 9) {
        const newId = rows.length + 1;
        setRows([
          ...rows,
          {
            id: newId,
            tasks: [],
            cost: "",
            taxtype: "",
            taxamount: "",
            totalamount: "",
          },
        ]);
      }
    },
    [rows]
  );
  function handleDragEnd(e) {
    console.log("event",e);
    if (!e.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows([...tempData]);
    var updatedArr = tempData.map(function (item, index) {
      return { id: item.key, orderNumber: index + 1 };
    });
  }

  function handleDelete(id) {
    const newRows = rows.filter((li) => li.id !== id);
    setRows(newRows);
  }
  const { id } = useParams();
  const [noofItems, setNoofItems] = useState("25");
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalcount] = useState();
  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const pagesizecount = Math.ceil(totalCount / noofItems);
  const [carrierdata, setCarrierdata] = useState();

  const [quatationno,setquatationno]= useState("")
  const [quotconsignee,setQuotconsignee] = useState()
  const[quotshipper,setquotshipper] = useState()
  const[quotfreighttype,setquotfreighttype] = useState()
  const[quotcargotype,setquotcargotype] = useState()
  const[quotmode,setquotmode] = useState()
  
  const [allPaymentTerms, setAllPaymentTerms] = useState();
  const [currencydata, setCurrencydata] = useState();

  const [cargooptions, setCargooptions] = useState(cargo_typeoptions);
  console.log("cargo options : ", cargooptions);

  const [frighttype, setFrighttype] = useState();
  const [services, setServices] = useState([]);
  console.log("Servicesss are :::", services);
  const [allservices, setAllservices] = useState();
  const [unitdata,setUnitdata]= useState()

  const [tableData, setTableData] = useState();
 
  const getAllservices = () => {
    PublicFetch.get(
      `${CRM_BASE_URL_SELLING}/service?startIndex=${pageofIndex}&noOfItems=${numOfItems}`
    )
      .then((res) => {
        console.log("all services is ", res.data.data);
        if (res?.data?.success) {
          console.log("All services dataawww", res?.data?.data?.services);
          let tempArr = [];
          res?.data?.data?.services.forEach((item, index) => {
            tempArr.push({
              service_id: item?.service_id,
              service_name: item?.service_name,
              service_category_id: item?.crm_v1_categories?.category_id,
              service_category_name: item?.crm_v1_categories?.category_name,
              service_code: item?.service_code,
              service_pic: item?.service_pic,
              service_hsn: item?.service_hsn,
              service_taxrate: item?.service_taxrate,
              service_description: item?.service_description,
              service_category_name: item?.crm_v1_categories?.category_name,
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
  }, [numOfItems, pageofIndex]);


  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "drag-visible",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="actionEdit m-0 p-0">
              <DragOutlined className="draggable" type="swap" />
            </div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        tableData.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
          </Popconfirm>
        ) : null,
    },
    {
      title: "TASKS",
      dataIndex: "tasks",
      key: "tasks",
      width: "40%",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <SelectBox
              allowClear
              showSearch
              optionFilterProp="children"
              className="selectwidth mb-2"
              value={index.tasks}
              // onChange={(e) => handleInputChange(e, index.key, "tasks")}
            >
              {services &&
                services.length > 0 &&
                services.map((item, index) => {
                  return (
                    <Select.Option
                      key={item.service_id}
                      value={item.service_id}
                    >
                      {item.service_name}
                    </Select.Option>
                  )
                })}
            </SelectBox>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "COST",
      dataIndex: "cost",
      key: "cost",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Input_Number
              className="text_right"
              value={index.cost}
              // onChange={(value) => {
              //   handleInputChange(value, index.key, "cost");
              //   console.log(" input numberevent ", value, index.key);
              // }}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
            />
          </div>
        );
      },

      align: "right",
    },
    {
      title: "TAX TYPE",
      dataIndex: "taxtype",
      key: "taxtype",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder">
            <Input_Number
              className="text_right"
              value={index.taxtype}
              // onChange={(e) => handleInputChange(e, index.key, "taxtype")}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
            />
          </div>
        );
      },
      align: "right",
    },
    {
      title: "TAX AMOUNT",
      dataIndex: "taxamount",
      key: "taxamount",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Input_Number
              className="text_right"
              value={index.taxamount}
              // onChange={(e) => handleInputChange(e, index.key, "taxamount")}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
            />
          </div>
        );
      },

      align: "right",
    },
    {
      title: "TOTAL AMOUNT",
      dataIndex: "totalamount",
      key: "totalamount",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Input_Number
              className="text_right"
              // value={    index.totalamount=(index.cost + index.taxamount)
              // }
              value={index.cost + index.taxamount}
              // onChange={(e) => handleInputChange2(e, index, "totalamount")}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
              // onKeyDown={(e) => handleEnter(e, index.key)}
            />
          </div>
        );
      },

      align: "right",
    },
  ];

  



// api integration

  const getallfrighttype = async () => {
    try {
      const allfrighttype = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/freightTypes/`
      );
      console.log("all freighttypes are ::", allfrighttype?.data?.data);
      setFrighttype(allfrighttype?.data?.data);
    } catch (err) {
      console.log("error to getting all freighttype", err);
    }
  };

  const getallcarrier = async () => {
    try {
      const allcarrier = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/carrier`
      );
      console.log("all carrier are ::", allcarrier?.data?.data);
      setCarrierdata(allcarrier?.data?.data)
    } catch (err) {
      console.log("error to getting all freighttype", err);
    }
  };

  const getonequatation = async () => {
    try {
      const onequatation = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/quotation/${id}`
      );
      console.log("one quatation iss ::", onequatation?.data?.data);
      console.log(" quatation no is:", onequatation?.data?.data.quotation_no);
      setquatationno(onequatation?.data?.data?.quotation_no)
      setquotshipper(onequatation?.data?.data?.quotation_shipper)
      editForm.setFieldsValue({
        quotation_no:onequatation?.data?.data?.quotation_no,
        shipper:onequatation?.data?.data?.quotation_shipper,
      })

    } catch (err) {
      console.log("error to getting all freighttype", err);
    }
  };

  const getallunits = async () => {
    try {
      const allunits = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/unit`);
      console.log("all units are ::", allunits?.data?.data);

      setUnitdata(allunits?.data?.data);
      // setunitTable(allunits?.data?.data);
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  const getallPaymentTerms = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/paymentTerms`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("successs", res.data.data);
          setAllPaymentTerms(res.data.data)
          // setAllPaymentTerms(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getallcurrency = async () => {
    try {
      const allcurrency = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/currency`
      );
      console.log("Getting all currency : ", allcurrency.data.data);
      setCurrencydata(allcurrency.data.data);
    } catch (err) {
      console.log("Error in getting currency : ", err);
    }
  };


  useEffect(() => {
    getallfrighttype();
    getallPaymentTerms();
    getallunits();
    getallcarrier();
    getallcurrency();
    getonequatation();
  }, []);



  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Edit Quotation</h5>
            </div>
          </div>

          <div className="content-tabs" style={{ maxHeight: "2000px" }}>
            <Form
              form={editForm}
              onFinish={(values) => {
                console.log("values iss", values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="container mb-4">
                {/* <div className="containerdesig "> */}
                <div className="row">
                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Quotation No</label>
                      <Form.Item
                        name="quotation_no"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid number",
                          },
                        ]}
                      >
                        <InputType 
                        value={quatationno}
                      
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Quotation date</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ borderWidth: 0, marginTop: 10 }}
                          // defaultValue={today}
                          defaultValue={dayjs()}
                          format={dateFormatList}
                          disabledDate={(d) => !d || d.isBefore(today)}
                          onChange={(e) => {
                            console.log("date mmm", e);
                            setDate(e);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Validity date</label>
                      <Form.Item
                        name="vdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ borderWidth: 0, marginTop: 10 }}
                          // defaultValue={today}
                          // defaultValue={dayjs()}
                          disabledDate={(d) => !d || d.isBefore(today)}
                          onChange={(e) => {
                            console.log("date mmm", e);
                            setDate(e);
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Consignee</label>
                      <Form.Item
                        name="consignee"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Shipper</label>
                      <Form.Item
                        name="shipper"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <InputType 
                        // value={}
                        />
                      </Form.Item>
                    </div>
{/* 
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label> Origin Agent</label>
                      <Form.Item
                        name="OrginAgent"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div> */}

                    {/* <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Destination Agent</label>
                      <Form.Item
                        name="corgin"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div> */}

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Freight Type</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                         <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {frighttype &&
                            frighttype.length > 0 &&
                            frighttype.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.freight_type_id}
                                  value={item.freight_type_id}
                                >
                                  {item.freight_type_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Cargo Type</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        {/* <SelectBox>
                          <Select.Option value="S">Test</Select.Option>
                          <Select.Option value="A">Data</Select.Option>
                        </SelectBox> */}
                          <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {cargooptions &&
                            cargooptions.length > 0 &&
                            cargooptions.map((item, index) => {
                              return (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Mode</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a mode",
                          },
                        ]}
                      >
                           <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Air</Select.Option>
                          <Select.Option value="S">Sea</Select.Option>
                          <Select.Option value="R">Road</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label> Origin</label>
                      <Form.Item
                        name="corgin"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label> Destination</label>
                      <Form.Item
                        name="cdest"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox>
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                          <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {carrierdata &&
                            carrierdata.length > 0 &&
                            carrierdata.map((item, index) => {
                              return (
                                <Select.Option
                                  value={item.carrier_id}
                                  key={item.carrier_id}
                                >
                                  {item.carrier_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Terms</label>
                      <Form.Item
                        name=""
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                         <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {allPaymentTerms &&
                            allPaymentTerms.length > 0 &&
                            allPaymentTerms.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.payment_term_id}
                                  value={item.payment_term_id}
                                >
                                  {item.payment_term_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6  mt-2">
                      <label>Number of pieces</label>
                      <Form.Item
                        name="npieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>UOM</label>
                      <Form.Item
                        name="npieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                          <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {unitdata &&
                            unitdata.length > 0 &&
                            unitdata.map((item, index) => {
                              return (
                                <Select.Option
                                  value={item.unit_id}
                                  key={item.unit_id}
                                >
                                  {item.unit_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Gross Weight</label>
                      <Form.Item
                        name="gweight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
                          // value={amount}
                          onChange={handleChange}
                          align="right"
                          step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Chargeable Weight</label>
                      <Form.Item
                        name="weight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
                          // value={amount}
                          onChange={handleChange}
                          align="right"
                          step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Currency</label>
                      <Form.Item
                        name="npieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                         <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {currencydata &&
                            currencydata.length > 0 &&
                            currencydata.map((item, index) => {
                              return (
                                <Select.Option
                                  value={item.currency_id}
                                  key={item.currency_id}
                                >
                                  {item.currency_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Exchange Rate</label>
                      <Form.Item
                        name="exchnagerate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
                          // value={amount}
                          onChange={handleChange}
                          align="right"
                          step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
              <div className="col-6 ">
                  <label>Add Attachments</label>
                  <Form.Item className="mt-2" name="new">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpeg,.jpg"
                      // onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 2000 && file.file.size < 500000) {
                          // setImg(file.file.originFileObj);
                          console.log("selet imggg", file.file.originFileObj);
                          // setImageSize(false);
                        } else {
                          // setImageSize(true);
                          console.log(
                            "Error in upload, upload image size between 1 kb and  500 kb"
                          );
                        }
                      }}
                    />
                   
                  </Form.Item>
                </div>
                </div>
  
                <div className="row">
                <div className="datatable">
                  <TableData
                    data={tableData}
                    columns={columns}
                    custom_table_css="table_qtn"
                  />
                </div>
              </div>

              {/* <div className="row">
                <div className="datatable">
                  <div
                    className={`row mt-2 mx-3 qtable_data ${custom_table_css}`}
                  >
                    <div className="tablecontainer">
                    <DragDropContext onDragEnd={handleDragEnd}>

                      <table className="table tborder">
                        <thead className="tborder">
                          <tr>
                            <th className="tborder" width="6%">Action</th>
                            
                            <th className="hiddenid">ID</th>
                            <th className="tborder">TASKS</th>
                            <th className="tborder text-right">COST</th>
                            <th className="tborder text-right">TAX TYPE</th>
                            <th className="tborder text-right">TAX AMOUNT</th>
                            <th className="tborder text-right">TOTAL AMOUNT</th>
                          </tr>
                        </thead>
                          <Droppable droppableId="table-rows">
                            {(provided) => (
                              <tbody
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="tborder"
                              >
                                {rows && rows.length > 0 && rows?.map((row, index) => {
                                  console.log("rowwwwws",row);
                                  return(
                                    <Draggable
                                    draggableId={row.id}
                                    key={row.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <tr 
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                      >
                                        <td width="6%"
                                        {...provided.dragHandleProps}
                                        style={{ width: 59,paddingLeft:"4px" }}>
                                        <div className="d-flex">
                                          <div
                                          
                                          >
                                            <MdDragHandle size={16} />
                                          </div>
                                          <div 
                                           onClick={() => handleDelete(row.id)}
                                          >
                                            <AiOutlineDelete size={15}  />
                                          </div>
                                          </div>
                                        </td>

                                     
                                        <td className="hiddenid">{row.id}</td>
                                        <td className="tborder" width="20%">
                                          <Select
                                           allowClear
                                           showSearch
                                          optionFilterProp="children"
                                         
                onChange={(event) => {
                  setSearchType(event ? [event] : []);
                }}
                                          className=" select_search selectwidth mb-2">
                                            <Select.Option value="Airline">
                                              FREIGHT CHARGES WITH EX WORK
                                            </Select.Option>
                                            <Select.Option value="Shipper">
                                              Shipper
                                            </Select.Option>
                                            <Select.Option value="Road">
                                              Road
                                            </Select.Option>
                                          </Select>
                                        </td>
                                        <td className="tborder my-1 ">
                                    
                                          <Input_Number
                                            className="text_right"
                                            value={amount}
                                            onChange={handleChange}
                                            align="right"
                                            step={0.01}
                                            min={0}
                                            precision={2}
                                            controlls={false}
                                          />
                                        </td>
                                        <td className="tborder">
                                          <Input_Number
                                            className="text_right"
                                            value={amount}
                                            onChange={handleChange}
                                            align="right"
                                            step={0.01}
                                            min={0}
                                            precision={2}
                                            controlls={false}
                                          />
                                        </td>
                                        <td className="tborder">
                                          
                                          <Input_Number
                                            className="text_right"
                                            value={amount}
                                            onChange={handleChange}
                                            align="right"
                                            step={0.01}
                                            min={0}
                                            precision={2}
                                            controlls={false}
                                          />
                                        </td>
                                        <td className="tborder" width="16%">
                                       <Input_Number
                                            className="text_right"
                                            value={amount}
                                            onChange={handleChange}
                                            align="right"
                                            step={0.01}
                                            min={0}
                                            precision={2}
                                            controlls={false}
                                            onKeyDown={(e) =>
                                              handleKeyDown(e, row.id)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    )}
                                  </Draggable>
                                  )
                                }
                                  
                                )}
                             
                              </tbody>
                            )}
                          </Droppable>
                      </table>
                      </DragDropContext>

                    </div>
                  </div>
                </div>
              </div> */}
              <div className="d-flex justify-content-end mt-4 mx-3 ">
                <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-2">
                  <p style={{ fontWeight: 500 }}>Grand Total</p>
                </div>

                <div className="col-lg-2 col-sm-2 col-xs-2">
                  <Form.Item
                    name="gtotal"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid value",
                      },
                    ]}
                  >
                    {/* <InputType className="text-right" /> */}
                    <Input_Number
                      className="text_right"
                      value={amount}
                      onChange={handleChange}
                      align="right"
                      step={0.01}
                      min={0}
                      precision={2}
                      controlls={false}
                    />
                  </Form.Item>
                </div>


              </div>
              <div className="d-flex justify-content-center my-4">
                <div className="col-lg-1 ">
                  <Button className="qtn_save" btnType="save">
                    Save
                  </Button>
                </div>
                <div className="col-lg-1 ">
                  <Button className="qtn_save" btnType="save">
                    Cancel
                  </Button>
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
      </div>
    
    </>
  );
}
