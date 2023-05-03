import "./quotation.scss";
// import React, { useState } from "react";
// import { Form, Select } from "antd";
// import { useNavigate } from "react-router-dom";
// import InputType from "../../../../components/Input Type textbox/InputType";
// import SelectBox from "../../../../components/Select Box/SelectBox";
// import Button from "../../../../components/button/button";
import dragula from "dragula";
import "dragula/dist/dragula.css";
import { v4 as uuidv4 } from "uuid";
import FileUpload from "../../../../components/fileupload/fileUploader";
import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import TableData from "../../../../components/table/table_data";
import { Link } from "react-router-dom";
// import { Form } from "react-bootstrap";
import { MdDragHandle } from "react-icons/md";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
import { Collapse, Form, Input, Popconfirm } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
  CRM_BASE_URL_HRMS,
  CRM_BASE_URL_SELLING,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import { Select } from "antd";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { useParams } from "react-router-dom";
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

  const { id } = useParams();
  const [noofItems, setNoofItems] = useState("25");
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalcount] = useState();
  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const pagesizecount = Math.ceil(totalCount / noofItems);
  const [carrierdata, setCarrierdata] = useState();
  const [allLocations, setAllLocations] = useState();
  const [oppnew, setOppnew] = useState([]);

  const [quatationno, setquatationno] = useState("");
  const [quotconsignee, setQuotconsignee] = useState();
  const [quotshipper, setquotshipper] = useState();
  const [quotfreighttype, setquotfreighttype] = useState();
  const [quotcargotype, setquotcargotype] = useState();
  const [quotmode, setquotmode] = useState();
  const [quotcarrier, setquotcarrier] = useState();
  const [quotterms, setquotterms] = useState();
  const [quotgrosswt, setquotgrosswt] = useState();
  const [quotchargeablewt, setquotchargeablewt] = useState();
  const [noofpieces, setnoofpieces] = useState();
  const [quotcurrency, setquotcurrency] = useState();
  const [quotexchngerate, setquotexchngerate] = useState();
  const [quotunits, setquotunits] = useState();
  const [qDetails, setQDetails] = useState();

  const [allPaymentTerms, setAllPaymentTerms] = useState();
  const [currencydata, setCurrencydata] = useState();

  const [cargooptions, setCargooptions] = useState(cargo_typeoptions);
  console.log("cargo options : ", cargooptions);

  const [frighttype, setFrighttype] = useState();
  const [services, setServices] = useState([]);
  console.log("Servicesss are :::", services);
  const [allservices, setAllservices] = useState();
  const [unitdata, setUnitdata] = useState();
  const [isService, setIsService] = useState();
  const [allCustomerList, setAllCustomerList] = useState([]);
  // const [tableData, setTableData] = useState();
  const [allincoterms, setallincoterms] = useState("");
  const [AllSalesPersons, setAllSalesPersons] = useState();
  const [allcontainertype, setallcontainertype] = useState("");
  const [Qtn_length, setQtn_Length] = useState();
  const [Qtn_breadth, setQtn_Breadth] = useState();
  const [Qtn_height, setQtn_Height] = useState();
  const [isTableEmpty, setIsTableEmpty] = useState(false);

  const dataSource = [
    {
      key: 1,
      quotation_details_service_id: "",
      quotation_details_cost: "",
      quotation_details_tax_group: "",
      quotation_details_tax_amount: "",
      quotation_details_total: "",
      quotation_details_id: "",
      quotation_details_status: "",
    },
  ];
  const [taxratee, setTaxRatee] = useState();
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState(dataSource);
  const [sampletable, setSampletable] = useState(dataSource);
  console.log("sample table", sampletable);
  const [date, setDate] = useState();
  console.log(date);
  const [taxType, setTaxtype] = useState();
  const [opportunityNo, setOpportunityNo] = useState();
  const navigate = useNavigate();
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
  const [amount, setAmount] = useState(0);
  const [serviceId, setServiceId] = useState();
  const [CostValue, setCostValue] = useState();

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
    console.log("event", e);
    if (!e.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows([...tempData]);
    var updatedArr = tempData.map(function (item, index) {
      return { id: item.key, orderNumber: index + 1 };
    });
  }

  const handleDelete = (key) => {
    console.log("key of delete", key, sampletable.length);
    const newData = tableData?.map((item) => {
      if (item?.key == key.key) {
        return { ...item, quotation_details_status: 0 };
      } else {
        return { ...item };
      }
    });
    // const dtanew = tableData?.filter((item) => {
    //   if (item.key !== key.key) {
    //     let quotation_details = [];
    //     tableData &&
    //       tableData?.map((item, index) => {
    //         // let assignValues = quotation_details[index];
    //         if (item.quotation_details_status === 0) {
    //           quotation_details.push({
    //             key: index,
    //             quotation_details_service_id: item.quotation_details_service_id,
    //             quotation_details_cost: item.quotation_details_cost,
    //             quotation_details_tax_type: item.quotation_details_tax_type,
    //             quotation_details_tax_amount: item.quotation_details_tax_amount,
    //             quotation_details_total: item.quotation_details_total,
    //             quotation_details_id: item.quotation_details_id,
    //             quotation_details_status: item.quotation_details_status,
    //           });
    //           setTableData([...quotation_details]);
    //           editForm.setFieldsValue({ quotation_details });
    //         }
    //       });
    //   }
    // });
    // setTableData(dtanew);
    const dtanew = tableData?.filter((item) => item.key !== key.key);
    const dtanew1 = sampletable?.filter((item) => item.key !== key.key);

    console.log("new delete", dtanew1);
    if (dtanew1.length > 0) {
      setSampletable(dtanew1);
    }
    setTableData(newData);
    let grandTotal = 0;
    for (let item of newData) {
      grandTotal += item["quotation_details_total"];
    }
    // setNewGrandTotal(grandTotal);
    // if (dtanew.length > 0) {
    //   setTableData(dtanew);
    // }
    // editForm.setFieldsValue({ quotation_details: dtanew });
    if (dtanew1 <= 0) {
      editForm.setFieldsValue({ quotation_details: [] });
    }
    editForm.setFieldsValue({ gtotal: grandTotal });
  };

  const getIndexInParent = (el) =>
    Array.from(el.parentNode.children).indexOf(el);

  const handleInputChange = (e, key, col, tx) => {
    console.log("gai guys", e, col, tx);
    // setSampleid(e)
    taxGroups.map((item, index) => {
      let tax_percnt = 0;
      let totalTax_percent = 0;
      if (tx && e === item?.tax_group_id) {
        if (col && tx && e === item?.tax_group_id) {
          item?.fms_v1_tax_types?.forEach((taxType, taxIndex) => {
            console.log("tax types", taxType);
            tax_percnt = taxType?.tax_type_percentage;
            setTaxRatee(taxType?.tax_type_percentage);
          });
          totalTax_percent += tax_percnt;
          // let hai = item.tax_type_percentage;

          let existingValues = editForm.getFieldsValue();
          console.log("existing form", existingValues);
          let { quotation_details } = existingValues;
          let assignValues = quotation_details[key];

          let taxamount =
            (assignValues["quotation_details_cost"] * totalTax_percent) / 100;
          console.log("sum of tax", taxamount);
          assignValues["quotation_details_tax_amount"] = taxamount;

          let totalAmount =
            assignValues["quotation_details_cost"] +
            assignValues["quotation_details_tax_amount"];
          console.log("total aount", totalAmount);
          assignValues["quotation_details_total"] = totalAmount;
          console.log("quation deatils", quotation_details);
          editForm.setFieldsValue({ quotation_details });
          // setTotal(sum);
          // addForm.setFieldsValue({
          //   grandtotal: sum,
          // });
          let grandTotal = 0;
          // for (let key in quotation_details) {
          //   let item = quotation_details[key];
          //   grandTotal += item["quotation_details_total"];
          //   // setNewGrandTotal(grandTotal);
          // quotation_details.map((item, index) => {
          //   console.log("deatils totals", item);
          //   grandTotal += item.quotation_details_total;
          // });
          // // }
          // editForm.setFieldsValue({ gtotal: grandTotal });
          console.log("Grand Total::::::", grandTotal, serviceId, CostValue);

          // setTableData(
          //   tableData.map((item) => {
          //     console.log("mmaaiinn", item);
          //     if (item.key == key) {
          //       delete item.quotation_details_id;
          //       return {
          //         ...item,
          //         quotation_details_service_id: serviceId,
          //         quotation_details_cost: CostValue,
          //         quotation_details_tax_amount: taxamount,
          //         quotation_details_tax_group: e,
          //         quotation_details_total: totalAmount,
          //       };
          //     }
          //     return item;
          //   })
          // );
          setTableData((prev) => {
            console.log("pprreevv", prev);
            if (serviceId && CostValue) {
              return [
                ...prev,
                {
                  key: tableData.length,
                  quotation_details_service_id: serviceId,
                  quotation_details_cost: CostValue,
                  quotation_details_tax_amount: taxamount,
                  quotation_details_tax_group: e,
                  quotation_details_total: totalAmount,
                  quotation_details_status: 1,
                },
              ];
            } else {
              return prev;
            }
          });
          setSampletable(
            sampletable.map((item) => {
              console.log("mmaaiinn", item);
              if (item.key == key) {
                delete item.quotation_details_id;
                return {
                  ...item,
                  quotation_details_service_id: serviceId,
                  quotation_details_cost: CostValue,
                  quotation_details_tax_amount: taxamount,
                  quotation_details_tax_group: e,
                  quotation_details_total: totalAmount,
                };
              }
              return item;
            })
          );
          console.log("tabledata", tableData);
          // console.log("sampletable of of", sampletable);

          // let sum = 0;
          // tableData.forEach((item) => {
          //   sum +=
          //     item.quotation_details_cost + item.quotation_details_tax_amount;
          // });
          // console.log("sum", sum);
          // setTotal(sum);
          // addForm.setFieldsValue({
          //   grandtotal: sum,
          // });
        }
      }
    });
  };
  useEffect(() => {
    let grandTotal = 0;
    // if(tableData)
    // tableData?.map((item, index) => {
    //   console.log("deatils totals", item);
    //   grandTotal += item.quotation_details_total;
    // });
    sampletable?.map((item, index) => {
      console.log("deatils totals", item);
      grandTotal += item.quotation_details_total;
    });
    // }
    editForm.setFieldsValue({ gtotal: grandTotal });
  }, [tableData, sampletable]);

  const handleInputchange1 = (e, key, col) => {
    setSampletable(
      sampletable.map((item) => {
        if (item.key === key) {
          return { ...item, [col]: e };
        }
        return item;
      })
    );
    // setTableData(
    //   tableData.map((item) => {
    //     if (item.key === key) {
    //       return { ...item, [col]: e };
    //     }
    //     return item;
    //   })
    // );

    if (e && col === "quotation_details_service_id") {
      allservices.map((item, index) => {
        if (e === item?.service_id) {
          setTaxtype(item.service_taxgroup);
          let existingValues = editForm.getFieldsValue();
          let { quotation_details } = existingValues;
          let assignValues = quotation_details[key];
          assignValues["quotation_details_tax_group"] = item.service_taxgroup;
          editForm.setFieldsValue({ quotation_details });
          // if (tr) {
          //   handleInputChange(
          //     item.service_taxtype,
          //     index.key,
          //     "quotation_details_tax_type",
          //     "tx"
          //   );
          // }
        }
      });
    }
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
      // setTableData([
      //   ...tableData,
      //   {
      //     key: tableData.length + 1,
      //     quotation_details_service_id: "",
      //     quotation_details_cost: "",
      //     quotation_details_tax_group: "",
      //     quotation_details_tax_amount: "",
      //     quotation_details_total: "",
      //   },
      // ]);
      setSampletable([
        ...sampletable,
        {
          key: sampletable.length + 1,
          quotation_details_service_id: "",
          quotation_details_cost: "",
          quotation_details_tax_group: "",
          quotation_details_tax_amount: "",
          quotation_details_total: "",
        },
      ]);
      // setServiceId();
      // setCostValue();
      setIsTableEmpty(false);
    }
    // console.log("tabledata", tableData);
    // let sum = 0;
    // tableData.forEach((item) => {
    //   sum += item.quotation_details_cost + item.quotation_details_tax_amount;
    // });
    // console.log("sum", sum);
    // setTotal(sum);
  };

  const handleReorder = (dragIndex, draggedIndex) => {
    setTableData((oldState) => {
      const newState = [...oldState];
      const item = newState.splice(dragIndex, 1)[0];
      newState.splice(draggedIndex, 0, item);
      return newState;
    });
    setSampletable((oldState) => {
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

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSaveSuccess(false);
        navigate(ROUTES.QUATATIONS);
      }, time);
    }
  };

  const getAllservices = () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/service/Minimal`)
      .then((res) => {
        console.log("all services is ", res.data.data);
        if (res?.data?.success) {
          console.log("All services dataawww", res?.data?.data?.services);
          setServices(res?.data?.data);
          setAllservices(res?.data?.data);

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
    GetAllLeadData();
  }, [numOfItems, pageofIndex]);

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "drag-visible",
      render: (data, record, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="actionEdit m-0 p-0">
              <DragOutlined className="draggable" type="swap" />
            </div>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <div className="deleteIcon m-0">
                <FaTrash />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
    {
      title: "TASKS",
      dataIndex: "quotation_details_service_id",
      key: "quotation_details_service_id",
      width: "40%",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_service_id",
              ]}
              // rules={[{ required: true, message: "Please input the name" }]}
            >
              <SelectBox
                allowClear
                showSearch
                optionFilterProp="children"
                className="selectwidth mb-2 input_bg"
                value={index.quotation_details_service_id}
                onChange={(e) => {
                  console.log("servicess11123", e);
                  handleInputchange1(
                    e,
                    index.key,
                    "quotation_details_service_id"
                  );
                  setIsService(e);
                  setServiceId(e);
                  handleInputChange();
                  // handleInputChange(e, index.key, "quotation_details_service_id", "tx")
                }}
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
            </Form.Item>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "COST",
      dataIndex: "quotation_details_cost",
      key: "quotation_details_cost",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={["quotation_details", index.key, "quotation_details_cost"]}
              // rules={[{ required: true, message: "Please input the name" }]}
            >
              <Input_Number
                className="text_right input_bg"
                value={index.quotation_details_cost}
                onChange={(value) => {
                  handleInputchange1(
                    value,
                    index.key,
                    "quotation_details_cost"
                  );
                  setCostValue(value);
                  handleInputChange();

                  console.log(" input numberevent ", value, index.key);
                }}
                align="right"
                step={0.01}
                min={0}
                precision={2}
                controlls={false}
                onBlur={() => {
                  if (isService) {
                    handleInputChange(
                      taxType,
                      index.key,
                      "quotation_details_tax_group",
                      "tx"
                    );
                  }
                }}
                onKeyDown={(e) => handleEnter(e, index.key)}
              />
            </Form.Item>
          </div>
        );
      },

      align: "right",
    },
    {
      title: "TAX GROUP",
      dataIndex: "quotation_details_tax_group",
      key: "quotation_details_tax_group",

      render: (data, index) => {
        console.log("index is 112:", index.key);
        return (
          <div className="d-flex justify-content-center align-items-center tborder">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_tax_group",
              ]}
              // rules={[{ required: true, message: "Please input the name" }]}
            >
              <SelectBox
                allowClear
                showSearch
                optionFilterProp="children"
                className="selectwidthnew mb-2 input_bg"
                value={index.quotation_details_tax_group}
                onChange={(e) => {
                  console.log("servicess11123", e);
                  // handleInputchange1(e, index.key, "quotation_details_tax_type")
                  handleInputChange(
                    e,
                    index.key,
                    "quotation_details_tax_group",
                    "tx"
                  );
                }}
                disabled={true}
              >
                {taxGroups &&
                  taxGroups.length > 0 &&
                  taxGroups.map((item, index) => {
                    return (
                      <Select.Option
                        key={item.tax_group_id}
                        value={item.tax_group_id}
                      >
                        {item.tax_group_name}
                      </Select.Option>
                    );
                  })}
              </SelectBox>
            </Form.Item>
          </div>
        );
      },
      align: "right",
    },
    {
      title: "TAX AMOUNT",
      dataIndex: "quotation_details_tax_amount",
      key: "quotation_details_tax_amount",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_tax_amount",
              ]}
              // rules={[{ required: true, message: "Please input the name" }]}
            >
              <Input_Number
                className="text_right input_bg"
                // value={index.taxamount}
                // onChange={(e) =>
                //   handleInputchange1(
                //     e,
                //     index.key,
                //     "quotation_details_tax_amount"
                //   )
                // }
                align="right"
                step={0.01}
                min={0}
                precision={2}
                controlls={false}
                disabled={true}
              />
            </Form.Item>
          </div>
        );
      },

      align: "right",
    },
    {
      title: "TOTAL AMOUNT",
      dataIndex: "quotation_details_total",
      key: "quotation_details_total",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={["quotation_details", index.key, "quotation_details_total"]}
              // rules={[{ required: true, message: "Please input the name" }]}
            >
              <Input_Number
                className="text_right input_bg"
                // value={    index.totalamount=(index.cost + index.taxamount)
                // }
                value={
                  index.quotation_details_cost +
                  index.quotation_details_tax_amount
                }
                // onChange={(e) =>
                //   handleInputChange2(e, index, "quotation_details_total")
                // }
                align="right"
                step={0.01}
                min={0}
                precision={2}
                controlls={false}
                disabled={true}
                // onKeyDown={(e) => handleEnter(e, index.key)}
              />
            </Form.Item>
          </div>
        );
      },

      align: "right",
    },
  ];

  // api integration

  const getAllLocations = async () => {
    try {
      const locations = await PublicFetch.get(`${CRM_BASE_URL_FMS}/locations`);
      console.log("all locations are", locations.data.data);
      // setAllLocations(locations.data.data);
      let temp = [];
      locations.data.data.forEach((item, index) => {
        temp.push({
          location_id: item.location_id,
          location_code: item.location_code,
          location_name: item.location_name,
          location_type: item.location_type,
          location_country: item.countries.country_name,
        });
        // setAllLocations(temp);
      });
    } catch (err) {
      console.log("error while getting the locations: ", err);
    }
  };

  const GetAllLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/minimal`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          // setAllLeadList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          // setCurrentcount(res?.data?.data?.currentCount);
          setAllCustomerList(res?.data?.data);
          let array = [];
          res?.data?.data?.leads?.forEach((item, index) => {
            array.push({
              lead_id: item?.lead_id,
              lead_customer_name: item?.lead_customer_name,
            });
          });
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

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
  const getallcontainertype = async () => {
    try {
      const allcontainertype = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/container_type`
      );
      console.log("getting all containertype", allcontainertype);
      setallcontainertype(allcontainertype.data.data);
    } catch (err) {
      console.log("error to fetching  containertypes", err);
    }
  };

  const getallcarrier = async () => {
    try {
      const allcarrier = await PublicFetch.get(`${CRM_BASE_URL_FMS}/carrier`);
      console.log("all carrier are ::", allcarrier?.data?.data);
      setCarrierdata(allcarrier?.data?.data);
    } catch (err) {
      console.log("error to getting all freighttype", err);
    }
  };

  const getonequatation = async () => {
    try {
      const onequatation = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/quotation/${id}`
      );
      let data11 = onequatation?.data?.data?.quotation;
      let qdate = moment(onequatation?.data?.data?.quotation?.quotation_date);
      let vdate = moment(
        onequatation?.data?.data?.quotation?.quotation_validity
      );
      let quotation_enquiry_no = "";
      onequatation?.data?.data?.quotation.fms_v1_enquiry_quotations.forEach(
        (item, index) => {
          quotation_enquiry_no = item.enquiry_quotation_opportunity_id;
          setOpportunityNo(item.enquiry_quotation_opportunity_id);
        }
      );

      editForm.setFieldsValue({
        quotation_no: data11.quotation_no,
        quotationdate: qdate,
        validity_date: vdate,
        shipper: data11.quotation_shipper,
        quotation_enquiry_no: quotation_enquiry_no,
        quotation_consignee: data11.crm_v1_customer.customer_id,
        customer: data11.crm_v1_customer.customer_id,
        freight_type: data11.quotation_freight_type,
        quotation_cargotype: data11.quotation_cargo_type,
        quotation_mode: data11.quotation_mode,
        quotation_carrier: data11.quotation_carrier,
        quotation_terms: data11.fms_v1_payment_terms.payment_term_id,
        gross_wt: data11.quotation_gross_wt,
        chargeable_wt: data11.quotation_chargeable_wt,
        quot_npieces: data11.quotation_no_of_pieces,
        currency: data11.quotation_currency,
        exchnagerate: data11.quotation_exchange_rate,
        quotation_units: data11.quotation_uom,
        quotation_destination: data11.quotation_destination_id,
        quotation_origin: data11.quotation_origin_id,
        incoterm: data11.quotation_incoterm_id,
        consignee: data11.quotation_consignee,
        container_type: data11.quotation_container_type,
        salesperson: data11.quotation_salesperson,
        length: data11.quotation_length,
        breadth: data11.quotation_breadth,
        height: data11.quotation_height,
        volume: data11.quotation_volume,
      });
      locationBytype(onequatation?.data?.data?.quotation?.quotation_mode);

      setQDetails(onequatation?.data?.data?.quotation.fms_v1_quotation_details);
      console.log("one quatation iss ::", onequatation?.data?.data.quotation);
      console.log(
        " quatation no is:",
        onequatation?.data?.data.quotation.quotation_no
      );
      setquatationno(onequatation?.data?.data?.quotation_no);
      setquotshipper(onequatation?.data?.data?.quotation_shipper);
      setquotfreighttype(
        onequatation?.data?.data?.fms_v1_freight_types.freight_type_name
      );
      setquotcargotype(onequatation?.data?.data?.quotation_cargo_type);
      setquotmode(onequatation?.data?.data?.quotation_mode);
      setquotcarrier(onequatation?.data?.data?.fms_v1_carrier.carrier_name);
      setquotterms(
        onequatation?.data?.data?.fms_v1_payment_terms.payment_term_name
      );
      setquotchargeablewt(onequatation?.data?.data?.quotation_chargeable_wt);
      setquotgrosswt(onequatation?.data?.data?.quotation_gross_wt);

      setnoofpieces(onequatation?.data?.data?.quotation_no_of_pieces);
      setquotcurrency(
        onequatation?.data?.data?.generalsettings_v1_currency.currency_name
      );
      setquotexchngerate(
        onequatation?.data?.data?.quotation?.quotation_exchange_rate
      );
      setquotunits(onequatation?.data?.data?.quotation?.crm_v1_units.unit_name);

      console.log("quotation_enquiry_no", quotation_enquiry_no);

      console.log(
        "qdetail",
        onequatation?.data?.data?.quotation?.fms_v1_quotation_details
      );

      // onequatation?.data?.data.fms_v1_quotation_details.map((item, index) => {
      //   let existingValues = editForm.getFieldsValue();
      //   // let { quotation_details } = existingValues;
      //   // console.log("existing values", quotation_details);
      //   // quotation_details.forEach((quotation_details, index) => {
      //   let quotation_details = [undefined];
      //   let sum = 0;
      //   // let assignValues = quotation_details[index];
      //   quotation_details.push({
      //     key: index,
      //     quotation_details_service_id: item.quotation_details_service_id,
      //     quotation_details_cost: item.quotation_details_cost,
      //     quotation_details_tax_type: item.quotation_details_tax_type,
      //     quotation_details_tax_amount: item.quotation_details_tax_amount,
      //     quotation_details_total: item.quotation_details_total,
      //     quotation_details_id: item.quotation_details_id,
      //   });
      //   // quotation_details[index + 1]["quotation_details_service_id"] =
      //   //   item.quotation_details_service_id;
      //   // quotation_details[index + 1]["quotation_details_cost"] =
      //   //   item.quotation_details_cost;
      //   // quotation_details[index + 1]["quotation_details_tax_type"] =
      //   //   item.quotation_details_tax_type;
      //   // quotation_details[index + 1]["quotation_details_tax_amount"] =
      //   //   item.quotation_details_tax_amount;
      //   // quotation_details[index + 1]["quotation_details_total"] =
      //   //   item.quotation_details_total;
      //   // quotation_details[index + 1]["quotation_details_id"] =
      //   //   item.quotation_details_id;
      //   // console.log("existing values", quotation_details);
      //   console.log("existing a", quotation_details);
      //   editForm.setFieldsValue({ quotation_details });
      //   // });

      //   // setTableData([
      //   //   ...tableData,
      //   //   {
      //   //     key: index,
      //   //     quotation_details_service_id: item.quotation_details_service_id,
      //   //     quotation_details_cost: item.quotation_details_cost,
      //   //     quotation_details_tax_type: item.quotation_details_tax_type,
      //   //     quotation_details_tax_amount: item.quotation_details_tax_amount,
      //   //     quotation_details_total: item.quotation_details_total,
      //   //   },
      //   // ]);
      // });
    } catch (err) {
      console.log("error to getting all freighttype", err);
    }
  };
  useEffect(() => {
    let quotation_details = [];
    qDetails &&
      qDetails?.map((item, index) => {
        // let assignValues = quotation_details[index];
        quotation_details.push({
          key: index,
          quotation_details_service_id: item.quotation_details_service_id,
          quotation_details_cost: item.quotation_details_cost,
          quotation_details_tax_group: item.quotation_details_tax_group,
          quotation_details_tax_amount: item.quotation_details_tax_amount,
          quotation_details_total: item.quotation_details_total,
          quotation_details_id: item.quotation_details_id,
          quotation_details_status: item.quotation_details_status,
        });
      });
    // console.log("mainItem", tableData);

    setTableData([...quotation_details]);
    editForm.setFieldsValue({ quotation_details });
    setSampletable([...quotation_details]);
    if (tableData?.length <= 0) {
      setSampletable([...dataSource]);
    }
  }, [qDetails]);

  // console.log("table inside data", tableData);

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

  const oneOpportunity = () => {
    PublicFetch.get(`${CRM_BASE_URL}/opportunity/${opportunityNo}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          let temp = [];
          temp.push({
            opportunity_id: res.data.data.opportunity_id,
            opportunity_number: res.data.data.opportunity_number,
          });

          setOppnew(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getallPaymentTerms = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/paymentTerms`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("successs", res.data.data);
          setAllPaymentTerms(res.data.data);
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

  const [taxGroups, setTaxGroups] = useState();

  const getAllTaxGroups = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/tax_group`)
      .then((res) => {
        console.log("Response");
        if (res.data.success) {
          console.log("Success");
          setTaxGroups(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getAllTaxTypes = async () => {
    try {
      const allTxTypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/tax-types/Minimal`
      );
      console.log("all taxtype are", allTxTypes.data.data);
      // setTaxTypes(allTxTypes.data.data);
    } catch (err) {
      console.log("error while getting the tax types: ", err);
    }
  };
  const locationBytype = (data) => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/locations/type-location/${data}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of location type", res.data, data);
          // setLocationType(res.data.data.location_type);
          let temp = [];
          res.data.data.forEach((item, index) => {
            temp.push({
              location_id: item.location_id,
              location_code: item.location_code,
              location_name: item.location_name,
              location_type: item.location_type,
              location_country: item.location_country,
            });
            setAllLocations(temp);
          });
        }
      })
      .catch((err) => {
        console.log("Error of location type", err);
      });
  };

  console.log("table data9229", tableData);

  const OnSubmitedit1 = (data) => {
    console.log("Quotation details", data);
    const formData = new FormData();
    formData.append("quotation_no", data.quotation_no.trim(" "));
    formData.append("quotation_date", new Date(data.quotationdate));
    formData.append("qoutation_customer", data.customer);
    formData.append("quotation_validity", new Date(data.validity_date));
    formData.append("quotation_customer", data.customer);
    if(data.shipper){
      formData.append("quotation_shipper", data.shipper);
    }

    formData.append("quotation_freight_type", data.freight_type);
    formData.append("quotation_cargo_type", data.quotation_cargotype);
    formData.append("quotation_carrier", data.quotation_carrier);
    formData.append("quotation_mode", data.quotation_mode);
    formData.append("quotation_origin_id", data.quotation_origin);
    formData.append("quotation_origin", data.quotation_origin);
    formData.append("quotation_destination_id", data.quotation_destination);
    formData.append("quotation_destination", data.quotation_destination);
    formData.append("quotation_no_of_pieces", data.quot_npieces);
    formData.append("quotation_uom", data.quotation_units);
    formData.append("quotation_gross_wt", data.gross_wt);
    formData.append("quotation_grand_total", data.gtotal);
    formData.append("quotation_chargeable_wt", data.chargeable_wt);
    formData.append("quotation_payment_terms", data.quotation_terms);
    formData.append("quotation_currency", data.currency);
    formData.append("quotation_exchange_rate", data.exchnagerate);
    formData.append("quotation_container_type", data.container_type);
    formData.append("quotation_salesperson", data.salesperson);
    formData.append("quotation_incoterm_id", data.incoterm);
   if(data.consignee){
    formData.append("quotation_consignee", data.consignee);
   }
   if(data.length){
    formData.append("quotation_length", data.length);
   }
    if(data.breadth){
      formData.append("quotation_breadth", data.breadth);
    }
    if(data.height){
      formData.append("quotation_height", data.height);
    }
    // formData.append("quotation_height", data.height);
    if(data.volume){
      formData.append("quotation_volume", data.volume);
    }
    
    // formData.append(
    //   "quotation_details",
    //   JSON.stringify(data.quotation_details)
    // );
    let tmp = false;
    let temp = false;
    tableData.map((item, index) => {
      if (item.quotation_details_status === 1) {
        tmp = true;
      }

      console.log("userdata task", item);
      if (item.quotation_details_service_id) {
        formData.append(
          `quotation_details[${index}][quotation_details_service_id]`,
          item.quotation_details_service_id
        );
        formData.append(
          `quotation_details[${index}][quotation_details_cost]`,
          item.quotation_details_cost
        );
        formData.append(
          `quotation_details[${index}][quotation_details_tax_group]`,
          item.quotation_details_tax_group
        );
        formData.append(
          `quotation_details[${index}][quotation_details_tax_amount]`,
          item.quotation_details_tax_amount
        );
        formData.append(
          `quotation_details[${index}][quotation_details_total]`,
          item.quotation_details_total
        );
        if (item.quotation_details_id) {
          formData.append(
            `quotation_details[${index}][quotation_details_id]`,
            item.quotation_details_id
          );
        }
        if (item.quotation_details_status === 0) {
          formData.append(
            `quotation_details[${index}][quotation_details_status]`,
            item.quotation_details_status
          );
        }
      }
    });

    if (data.new) {
      formData.append("attachments", data.new);
    }
    // formData.append("quotation_payment_terms", prDescription);
    if (tmp === true) {
      PublicFetch.patch(`${CRM_BASE_URL_FMS}/quotation/${id}`, formData, {
        "Content-Type": "Multipart/form-Data",
      })
        .then((res) => {
          console.log("data is successfully saved", res.data.success);
          if (res.data.success) {
            setSaveSuccess(true);
            close_modal(saveSuccess, 1200);
            getonequatation();
          }
        })
        .catch((err) => {
          console.log("error", err);
          setError(true);
        });
    } else {
      console.log("Error of Error tyfyfyyfyfyfy", tableData.length);
      setIsTableEmpty(true);
    }
  };

  const getAllincoterm = async () => {
    try {
      const allCountries = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/incoterms/minimal`
      );
      console.log("all incotermss", allCountries.data.data);
      setallincoterms(allCountries.data.data);
      // setGetCountries(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  const GetAllSalesPersons = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees/salesexecutive`)
      .then((res) => {
        console.log("Response");
        if (res.data.success) {
          setAllSalesPersons(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // const mode = (e) => {
  //   if (e) {
  //     frighttype &&
  //       frighttype.length > 0 &&
  //       frighttype.map((item, index) => {
  //         if (item.freight_type_id === e) {
  //           console.log("reached", item.freight_type_mode);
  //           //  setFrighttypemode(item.freight_type_mode);
  //           locationBytype(item.freight_type_mode);
  //         }
  //       });
  //   }
  // };

  useEffect(() => {
    let a = 0;
    if (Qtn_length && Qtn_breadth && Qtn_height) {
      a = Qtn_breadth * Qtn_height * Qtn_length;
      editForm.setFieldsValue({
        volume: a,
      });
    }
  }, [Qtn_breadth, Qtn_height, Qtn_length]);

  useEffect(() => {
    GetAllSalesPersons();
    getAllTaxGroups();
    getallfrighttype();
    getallPaymentTerms();
    getallunits();
    getallcarrier();
    getallcurrency();
    getAllincoterm();
    getallcontainertype();
    if (id) {
      getonequatation();
    }
    getAllLocations();
    getAllTaxTypes();
    if (opportunityNo) {
      oneOpportunity();
    }
  }, [opportunityNo, id]);

  const beforeUpload = (file, fileList) => {};

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <Form
            form={editForm}
            onFinish={(values) => {
              console.log("values iss", values);
              OnSubmitedit1(values);
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
          >
            <div className="container-fluid ms-0 me-2">
              <div className="row mt-3">
                <h5 className="lead_text">Edit Quotation</h5>
              </div>
              {/* <div className="containerdesig "> */}

              <div className="row  mt-1">
                <div className="content-tabs-new row justify-content mx-1 mb-3">
                  <div className="row mt-3 ">
                    <h6 className="lead_text">Basic Info</h6>
                  </div>
                  {/* <div className="row mb-2  "> */}

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Customer<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="customer"
                      rules={[
                        {
                          required: true,
                          message: "Please select Customer",
                        },
                      ]}
                    >
                      <SelectBox>
                        {allCustomerList &&
                          allCustomerList.length > 0 &&
                          allCustomerList.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.customer_id}
                                value={item.customer_id}
                              >
                                {item.customer_name}{" "}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Freight Type<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="freight_type"
                      rules={[
                        {
                          required: true,
                          message: "Please select a Type",
                        },
                      ]}
                    >
                      <SelectBox
                        allowClear
                        disabled={true}
                        showSearch
                        optionFilterProp="children"
                        // onChange={(e) => {
                        //   mode(e);
                        // }}
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

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Quotation No<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="quotation_no"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid number",
                      //   },
                      // ]}
                    >
                      <InputType value={quatationno} disabled={true} />
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Quotation date<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="quotationdate"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid date",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ borderWidth: 0, marginTop: 10 }}
                        initialValues={dayjs()}
                        format={dateFormatList}
                        disabledDate={(d) => !d || d.isBefore(today)}
                        onChange={(e) => {
                          console.log("date mmm", e);
                          setDate(e);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Validity<span className="required">*</span>{" "}
                    </label>
                    <Form.Item
                      name="validity_date"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid date",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ borderWidth: 0, marginTop: 10 }}
                        initialValues={dayjs()}
                        format={dateFormatList}
                        disabledDate={(d) => !d || d.isBefore(today)}
                        onChange={(e) => {
                          console.log("date mmm", e);
                          setDate(e);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Sales Person<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="salesperson"
                      rules={[
                        {
                          required: true,

                          message: "Please select sales person",
                        },
                      ]}
                    >
                      <SelectBox>
                        {AllSalesPersons &&
                          AllSalesPersons.length > 0 &&
                          AllSalesPersons.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.employee_id}
                                value={item.employee_id}
                              >
                                {item.employee_name}{" "}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Enquiry No</label>
                    <Form.Item
                      name="quotation_enquiry_no"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please select a Type",
                      //   },
                      // ]}
                    >
                      <SelectBox
                        // onChange={(e) =>
                        //   // handleFirstDropdownChange()
                        //   // handleLeadIdEnq(e)
                        // }
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={true}
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

                  {/* </div> */}
                </div>
              </div>
              <div className="row  mt-1 ">
                {/* <div className="col-md-6 col-12"> */}
                <div className="content-tabs-new row justify-content mx-1 mb-3">
                  <div className="row mt-3">
                    <h6 className="lead_text">Transportation</h6>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Consignee</label>
                    <Form.Item
                      name="consignee"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please select a Type",
                      //   },
                      // ]}
                    >
                      <InputType />
                      {/* <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={true}
                      >
                        {allCustomerList &&
                          allCustomerList.length > 0 &&
                          allCustomerList.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.lead_id}
                                value={item.lead_id}
                              >
                                {item.lead_customer_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox> */}
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Shipper</label>
                    <Form.Item
                      name="shipper"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid value",
                      //   },
                      // ]}
                    >
                      <InputType value={quotshipper} />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Carrier<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="quotation_carrier"
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

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Origin<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="quotation_origin"
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
                        {allLocations &&
                          allLocations.length > 0 &&
                          allLocations.map((item, index) => {
                            return (
                              <Select.Option
                                value={item.location_id}
                                key={item.location_id}
                              >
                                {item.location_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3" hidden>
                    <label>Mode</label>
                    <Form.Item
                      name="quotation_mode"
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
                        onChange={(e) => {
                          locationBytype(e);
                        }}
                      >
                        <Select.Option value="Air">Air</Select.Option>
                        <Select.Option value="Sea">Sea</Select.Option>
                        <Select.Option value="Road">Road</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Destination<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="quotation_destination"
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
                        {allLocations &&
                          allLocations.length > 0 &&
                          allLocations.map((item, index) => {
                            return (
                              <Select.Option
                                value={item.location_id}
                                key={item.location_id}
                              >
                                {item.location_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Container Type<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="container_type"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please select Container Type",
                      //   },
                      // ]}
                    >
                      <SelectBox>
                        {allcontainertype &&
                          allcontainertype.length > 0 &&
                          allcontainertype.map((item, index) => {
                            return (
                              <Select.Option
                                value={item.container_type_id}
                                key={item.container_type_id}
                              >
                                {item.container_type_shortname}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>
                {/* </div> */}
                {/* <div className="col-md-6 col-12"> */}
                <div className="content-tabs-new row justify-content mx-1 mb-3 ">
                  <div className="row mt-3">
                    <h6 className="lead_text">Shipment Details</h6>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Cargo Type<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="quotation_cargotype"
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

                  <div className="col-xl-4 col-sm-12  mt-2 px-3">
                    <label>
                      Number of pieces<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="quot_npieces"
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      UOM<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="quotation_units"
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

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Length</label>
                    <Form.Item
                      name="length"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter length",
                      //   },
                      // ]}
                    >
                      <Input_Number
                        onChange={(e) => {
                          setQtn_Length(e);
                        }}
                        min={0}
                        precision={2}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Breadth</label>
                    <Form.Item
                      name="breadth"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter breadth",
                      //   },
                      // ]}
                    >
                      <Input_Number
                        onChange={(e) => {
                          setQtn_Breadth(e);
                        }}
                        min={0}
                        precision={2}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Height</label>
                    <Form.Item
                      name="height"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter height",
                      //   },
                      // ]}
                    >
                      <Input_Number
                        onChange={(e) => {
                          setQtn_Height(e);
                        }}
                        min={0}
                        precision={2}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Volume</label>
                    <Form.Item
                      name="volume"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter volume",
                      //   },
                      // ]}
                    >
                      <Input_Number />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Gross Weight<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="gross_wt"
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

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Chargeable Weight<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="chargeable_wt"
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Incoterm<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="incoterm"
                      rules={[
                        {
                          required: true,

                          message: "Please select validity date",
                        },
                      ]}
                    >
                      <SelectBox>
                        {allincoterms &&
                          allincoterms.length > 0 &&
                          allincoterms.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.incoterm_id}
                                value={item.incoterm_id}
                              >
                                {item.incoterm_short_name}{" "}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div className="row mt-1 justify-content-between ">
                <div className="col-md-6 col-12 ">
                  <div className="row content-tabs-new  justify-content  mb-3">
                    <div className="row mt-2">
                      <h6 className="lead_text">Payment Info</h6>
                    </div>

                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>
                        Terms<span className="required">*</span>
                      </label>
                      <Form.Item
                        name="quotation_terms"
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

                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>
                        Currency<span className="required">*</span>
                      </label>
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

                    <div className="col-xl-6 col-sm-12 mt-2 mb-4">
                      <label>
                        Exchange Rate<span className="required">*</span>
                      </label>
                      <Form.Item
                        name="exchnagerate"
                        rules={[
                          {
                            required: true,
                            // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Rate",
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
                          precision={4}
                          controlls={false}
                          // disabled={true}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="content-tabs-new row justify-content ms-1 mb-3">
                    <div className="row mt-2">
                      <h6 className="lead_text">Attachments</h6>
                    </div>
                    <div className="col-xl-12 col-sm-12 mt-2">
                      <Form.Item className="mt-2" name="new">
                        <FileUpload
                          multiple
                          style={{ height: "60px" }}
                          listType="picture"
                          filetype={"Accept only pdf and docs"}
                          accept=".pdf,.docs,"
                          // onPreview={handlePreview}
                          beforeUpload={beforeUpload}
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

              <div className="row mt-1 ">
                <div className="content-tabs-tablenew row justify-content mx-1 mb-3">
                  <div className="row mt-2">
                    <h6 className="lead_text">Task & Description</h6>
                  </div>
                  <div className="datatable">
                    <TableData
                      data={sampletable}
                      columns={columns}
                      custom_table_css="table_qtn qtn_table_brdr"
                    />
                    {isTableEmpty ? (
                      <small style={{ color: "red" }} className="mt-3">
                        Please Enter Atleast One Row
                      </small>
                    ) : null}
                  </div>

                  <div className="d-flex justify-content-end mt-4 ms-5">
                    <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-3">
                      <p style={{ fontWeight: 600 }}>Grand Total :</p>
                    </div>

                    <div className="col-lg-2 col-sm-6 col-xs-2 me-5">
                      <Form.Item
                        name="gtotal"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right grandtotal"
                          value={amount}
                          onChange={handleChange}
                          align="right"
                          step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                          disabled={true}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center my-4 gap-3">
              {/* <div className="col-lg-1 "> */}
              <Button className="save_button" btnType="save">
                Save
              </Button>
              {/* </div> */}
              {/* <div className="col-lg-1 "> */}
              <Button
                as="input"
                type="reset"
                value="Reset"
                onClick={() => {
                  navigate(`${ROUTES.QUATATIONS}`);
                }}
                // className="qtn_save"
                // btnType="save"
              >
                Cancel
              </Button>
              {/* </div> */}
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
    </>
  );
}
