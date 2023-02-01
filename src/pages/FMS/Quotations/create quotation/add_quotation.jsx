import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { cargo_typeoptions } from "../../../../utils/SelectOptions";
import { DragOutlined, FontColorsOutlined } from "@ant-design/icons";
import dragula from "dragula";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import "dragula/dist/dragula.css";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import TableData from "../../../../components/table/table_data";
import { FaTrash } from "react-icons/fa";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import { GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";
import FileUpload from "../../../../components/fileupload/fileUploader";
import { Form } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";
import { Select, Popconfirm } from "antd";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { DatePicker } from "antd";
import "./quotation.scss";
import Input_Number from "../../../../components/InputNumber/InputNumber";

export default function Add_Quotation(custom_table_css) {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [cargooptions, setCargooptions] = useState(cargo_typeoptions);
  console.log("cargo options : ", cargooptions);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState();
  const [addForm] = Form.useForm();
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
  const dataSource = [
    {
      key: "1",
      tasks: "",
      cost: "",
      taxtype: "",
      taxamount: "",
      totalamount: "",
    },
  ];
  const [tableData, setTableData] = useState(dataSource);
  const getIndexInParent = (el) =>
    Array.from(el.parentNode.children).indexOf(el);
  const handleInputChange = (e, key, col) => {
    setTableData(
      tableData.map((item) => {
        if (item.key === key) {
          return { ...item, [col]: e };
        }
        return item;
      })
    );
  };
  const handleInputChange2 = (e, index, col) => {
    setTableData(
      tableData.map((item) => {
        if (item.key === index.key) {
          return { ...item, [col]: e };
        }
        return item;
      })
    );
  };

  const handleEnter = (e) => {
    console.log("Hello");
    console.log("Key ::::::: ", e.key);
    if (e.key === "Enter" || e.key === "Tab") {
      setTableData([
        ...tableData,
        {
          key: `${tableData.length + 1}`,
          tasks: "",
          cost: "",
          taxtype: "",
          taxamount: "",
          totalamount: "",
        },
      ]);
    }
    console.log("tabledata", tableData);
    let sum = 0;
    tableData.forEach((item) => {
      sum += item.cost + item.taxamount;
    });
    console.log("sum", sum);
    setTotal(sum);
  };

  const handleReorder = (dragIndex, draggedIndex) => {
    setTableData((oldState) => {
      const newState = [...oldState];
      const item = newState.splice(dragIndex, 1)[0];
      newState.splice(draggedIndex, 0, item);
      return newState;
    });
  };
  React.useEffect(() => {
    let start;
    let end;
    const container = document.querySelector(".ant-table-tbody");
    const drake = dragula([container], {
      moves: (el) => {
        start = getIndexInParent(el);
        return true;
      },
    });

    drake.on("drop", (el) => {
      end = getIndexInParent(el);
      handleReorder(start, end);
    });
  }, []);
  const [noofItems, setNoofItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalcount] = useState();
  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const pagesizecount = Math.ceil(totalCount / noofItems);
  console.log("page number isss", pagesizecount);
  useEffect(() => {
    GetAllLeadData();
  }, [noofItems, pageofIndex, pagesizecount]);

  const numofItemsTo = noofItems * current;

  const [frighttype, setFrighttype] = useState();
  const [currencydata, setCurrencydata] = useState();
  const [carrierdata, setCarrierdata] = useState();
  const [OpportunityList, setOpportunityList] = useState([]);
  const [currentcount, setCurrentcount] = useState();

  const [allLeadList, setAllLeadList] = useState([]);
  console.log("Lead names :", allLeadList);
  const getallcarrier = async () => {
    try {
      const getcarrier = await PublicFetch.get(`${CRM_BASE_URL_FMS}/carrier`);
      console.log("Getting all carrier : ", getcarrier.data.data);
      setCarrierdata(getcarrier.data.data);
    } catch (err) {
      console.log("Error in getting carrier : ", err);
    }
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

  const getallfrighttype = async () => {
    try {
      const allfrighttypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/freightTypes`
      );
      console.log("Getting all frieght types : ", allfrighttypes.data.data);
      setFrighttype(allfrighttypes.data.data);
    } catch (err) {
      console.log("Error in fetching fright types : ", err);
    }
  };
  useEffect(() => {
    getallfrighttype();
    getallcurrency();
    getallcarrier();
    getallPaymentTerms();
  }, []);

  const handleDelete = (key) => {
    const newData = tableData?.filter((item) => item?.key !== key);
    setTableData(newData);
  };
  const handleadd = (index) => {
    console.log("hello", index);
  };

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
              onChange={(e) => handleInputChange(e, index.key, "tasks")}
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
                  );
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
              onChange={(value) => {
                handleInputChange(value, index.key, "cost");
                console.log(" input numberevent ", value, index.key);
              }}
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
              onChange={(e) => handleInputChange(e, index.key, "taxtype")}
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
              onChange={(e) => handleInputChange(e, index.key, "taxamount")}
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
              onChange={(e) => handleInputChange2(e, index, "totalamount")}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
              onKeyDown={(e) => handleEnter(e, index.key)}
            />
          </div>
        );
      },

      align: "right",
    },
  ];

  const [total, setTotal] = useState(0);
  console.log("total ", total);
  const GetAllLeadData = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/lead?startIndex=${pageofIndex}&noOfItems=${noofItems}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          // setAllLeadList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          setCurrentcount(res?.data?.data?.currentCount);
          let array = [];
          res?.data?.data?.leads?.forEach((item, index) => {
            {
              {
                array.push({
                  lead_id: item?.lead_id,

                  lead_customer_name: item?.lead_customer_name,
                });
                setAllLeadList(array);
              }
            }
          });
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };
  const [allPaymentTerms, setAllPaymentTerms] = useState();
  console.log("payment terms : ", allPaymentTerms);
  const getallPaymentTerms = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/paymentTerms`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("successs", res.data.data);
          setAllPaymentTerms(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const [allunit, setAllunit] = useState([]);

  console.log("all units are : ", allunit);
  const [unitTable, setunitTable] = useState("");
  const getallunits = async () => {
    try {
      const allunits = await PublicFetch.get(`${CRM_BASE_URL_SELLING}/unit`);
      console.log("all units are ::", allunits?.data?.data);

      // if(allunits?.data.success){}
      setAllunit(allunits?.data?.data);
      setunitTable(allunits?.data?.data);
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  useEffect(() => {
    getallunits();
  }, []);
  const [oppnew, setOppnew] = useState([]);
  console.log("Opportunities are :::", oppnew);
  const [oppleadid, setOppleadid] = useState();
  console.log("Opportunities lead id :::", oppleadid);
  const [numOfItems, setNumOfItems] = useState("25");
  const GetOpportunityData = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/opportunity?startIndex=${pageofIndex}&noOfItems=${numOfItems}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All opportunity dataqqq", res?.data?.data.leads);

          let tempArr = [];
          res?.data?.data?.leads.forEach((item, index) => {
            tempArr.push({
              opportunity_id: item?.opportunity_id,
              opportunity_number: item?.opportunity_number,
              opportunity_type: item?.opportunity_type,
              opportunity_party: item?.crm_v1_contacts?.contact_person_name,
              opportunity_from: item?.opportunity_from,
              lead_customer_name: item?.crm_v1_leads?.lead_customer_name,
              opportunity_created_at: item?.opportunity_created_at,
              opportunity_created_by: item?.opportunity_created_by,
              opportunity_source: item?.opportunity_source,
              opportunity_probability: item?.opportunity_probability,
              opportunity_description: item?.opportunity_description,
              opportunity_amount: item?.opportunity_amount,
              opportunity_status: item?.opportunity_status,
              lead_id: item?.crm_v1_leads?.lead_id,
              assigned_employee: item?.assigned_employee,
            });
          });
          console.log("hellooooqqqqq", tempArr);
          setOppnew(tempArr);
          setOppleadid(res?.data?.data?.leads?.opportunity_lead_id);
          console.log("newwww", res?.data?.data?.leads?.opportunity_lead_id);
          setOpportunityList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          console.log("totalcount iss", res?.data?.data?.totalCount);
          // let samplearry = [];
          // res?.data?.data?.leads.forEach((item, index) => {
          //   samplearry.push(item.opportunity_id);
          // });
          // console.log("pushedd ", samplearry);

          // setOppurtunityid(samplearry);
        } else {
          console.log("Failed to load data !");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetOpportunityData();
  }, [pageofIndex, numOfItems]);
  const [services, setServices] = useState([]);
  console.log("Servicesss are :::", services);
  const [allservices, setAllservices] = useState();

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

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Quotation</h5>
            </div>
          </div>

          <div className="content-tabs">
            <Form
              form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="container mb-4">
                <div className="row">
                  <div className="row ">
                    {/* <div className="col-xl-3 col-sm-6 mt-2">
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
                        <InputType />
                      </Form.Item>
                    </div> */}
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
                        // rules={[
                        //   {
                        //     required: true,
                        //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        //     message: "Please enter a Valid value",
                        //   },
                        // ]}
                      >
                        <DatePicker
                          style={{ borderWidth: 0, marginTop: 10 }}
                          disabledDate={(d) => !d || d.isBefore(today)}
                          format={dateFormatList}
                          onChange={(e) => {
                            console.log("date mmm", e);
                            setDate(e);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Enquiry No</label>
                      <Form.Item
                        name="eno"
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
                          {oppnew &&
                            oppnew.length > 0 &&
                            oppnew.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.opportunity_id}
                                  value={item.opportunity_id}
                                >
                                  {item.opportunity_number}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
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
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {allLeadList &&
                            allLeadList.length > 0 &&
                            allLeadList.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.lead_id}
                                  value={item.lead_id}
                                >
                                  {item.lead_customer_name}
                                </Select.Option>
                              );
                            })}
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
                        <InputType />
                      </Form.Item>
                    </div>

                    {/* <div className="col-xl-3 col-sm-6 mt-2">
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
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
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
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div> */}

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Freight Type</label>
                      <Form.Item
                        name="freighttype"
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
                        name="cargotype"
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
                        name="mode"
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
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
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
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Test</Select.Option>
                          <Select.Option value="B">Demo</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
                      <Form.Item
                        name="carrier"
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
                        name="terms"
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
                        name="uom"
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
                          {allunit &&
                            allunit.length > 0 &&
                            allunit.map((item, index) => {
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
                      <label>Currency</label>
                      <Form.Item
                        name="currency"
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
                          // onChange={handleChange}
                          align="right"
                          step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
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
                          // onChange={handleChange}
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
                          // onChange={handleChange}
                          align="right"
                          step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
                      </Form.Item>
                    </div>

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
                            console.log(
                              "Before upload file size",
                              file.file.size
                            );

                            if (
                              file.file.size > 2000 &&
                              file.file.size < 500000
                            ) {
                              // setImg(file.file.originFileObj);
                              console.log(
                                "selet imggg",
                                file.file.originFileObj
                              );
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
                </div>
              </div>
              {/* <div className="row justify-content-center">
             
              </div> */}

              <div className="row">
                <div className="datatable">
                  <TableData
                    data={tableData}
                    columns={columns}
                    custom_table_css="table_qtn"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4 mx-5">
                <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-2">
                  <p style={{ fontWeight: 500 }}>Grand Total</p>
                </div>

                <div className="col-lg-2 col-sm-2 col-xs-2">
                  <Form.Item>
                    <Input_Number
                      className="text_right"
                      value={total}
                      fontWeight={1000}
                      // onChange={handleChange}
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
