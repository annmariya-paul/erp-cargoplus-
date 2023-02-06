import "./quotation.scss";
// import React, { useState } from "react";
// import { Form, Select } from "antd";
// import { useNavigate } from "react-router-dom";
// import InputType from "../../../../components/Input Type textbox/InputType";
// import SelectBox from "../../../../components/Select Box/SelectBox";
// import Button from "../../../../components/button/button";
import dragula from "dragula";
import "dragula/dist/dragula.css";
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
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
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

  const [date, setDate] = useState();
  console.log(date);

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
  const [allLocations, setAllLocations] = useState();

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

  const [allPaymentTerms, setAllPaymentTerms] = useState();
  const [currencydata, setCurrencydata] = useState();

  const [cargooptions, setCargooptions] = useState(cargo_typeoptions);
  console.log("cargo options : ", cargooptions);

  const [frighttype, setFrighttype] = useState();
  const [services, setServices] = useState([]);
  console.log("Servicesss are :::", services);
  const [allservices, setAllservices] = useState();
  const [unitdata, setUnitdata] = useState();

  const [allLeadList, setAllLeadList] = useState([]);
  // const [tableData, setTableData] = useState();

  const dataSource = [
    {
      key: "1",
      quotation_details_service_id: "",
      quotation_details_cost: "",
      quotation_details_tax_type: "",
      quotation_details_tax_amount: "",
      quotation_details_total: "",
    },
  ];
  const [taxratee, setTaxRatee] = useState();
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState(dataSource);
  const getIndexInParent = (el) =>
    Array.from(el.parentNode.children).indexOf(el);
  const handleInputChange = (e, key, col, tx) => {
    console.log("gai guys", e, col, tx);
    // setSampleid(e)
    allservices.map((item, index) => {
      if (tx && e === item.service_id) {
        if (col && key && tx && e === item.service_id) {
          setTaxRatee(item.service_taxrate);
          let hai = item.service_taxrate;

          setTableData(
            tableData.map((item) => {
              if (item.key === key) {
                return {
                  ...item,
                  quotation_details_tax_type: hai,
                  quotation_details_service_id: e,
                };
              }
              return item;
            })
          );
        }
      }
    });
  };
  const handleInputchange1 = (e, key, col) => {
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
          quotation_details_service_id: "",
          quotation_details_cost: "",
          quotation_details_tax_type: "",
          quotation_details_tax_amount: "",
          quotation_details_total: "",
        },
      ]);
    }
    console.log("tabledata", tableData);
    let sum = 0;
    tableData.forEach((item) => {
      sum += item.quotation_details_cost + item.quotation_details_tax_amount;
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
    GetAllLeadData();
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
              // rules={[{ required: true, message: 'Please input the name' }]}
            >
              <SelectBox
                allowClear
                showSearch
                optionFilterProp="children"
                className="selectwidth mb-2"
                value={index.quotation_details_service_id}
                onChange={(e) => {
                  console.log("servicess11123", e);
                  handleInputchange1(
                    e,
                    index.key,
                    "quotation_details_service_id"
                  );
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
              // rules={[{ required: true, message: 'Please input the name' }]}
            >
              <Input_Number
                className="text_right"
                value={index.quotation_details_cost}
                onChange={(value) => {
                  handleInputchange1(
                    value,
                    index.key,
                    "quotation_details_cost"
                  );
                  console.log(" input numberevent ", value, index.key);
                }}
                align="right"
                step={0.01}
                min={0}
                precision={2}
                controlls={false}
              />
            </Form.Item>
          </div>
        );
      },

      align: "right",
    },
    {
      title: "TAX TYPE",
      dataIndex: "quotation_details_tax_type",
      key: "quotation_details_tax_type",

      render: (data, index) => {
        console.log("index is 112:", index.quotation_details_tax_type);
        return (
          <div className="d-flex justify-content-center align-items-center tborder">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_tax_type",
              ]}
              // rules={[{ required: true, message: 'Please input the name' }]}
            >
              {/* <Input_Number
              className="text_right"
              value={taxratee}
              onChange={(e) => handleInputchange1(e, index.key, "quotation_details_tax_type")}
              align="right"
              step={0.01}
              min={0}
              precision={2}
              controlls={false}
            /> */}

              <SelectBox
                allowClear
                showSearch
                optionFilterProp="children"
                className="selectwidthnew mb-2"
                value={index.quotation_details_tax_type}
                onChange={(e) => {
                  console.log("servicess11123", e);
                  // handleInputchange1(e, index.key, "quotation_details_tax_type")
                  handleInputChange(
                    e,
                    index.key,
                    "quotation_details_tax_type",
                    "tx"
                  );
                }}
              >
                {taxTypes &&
                  taxTypes.length > 0 &&
                  taxTypes.map((item, index) => {
                    return (
                      <Select.Option
                        key={item.tax_type_id}
                        value={item.tax_type_id}
                      >
                        {item.tax_type_name}
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
              // rules={[{ required: true, message: 'Please input the name' }]}
            >
              <Input_Number
                className="text_right"
                // value={index.taxamount}
                onChange={(e) =>
                  handleInputchange1(
                    e,
                    index.key,
                    "quotation_details_tax_amount"
                  )
                }
                align="right"
                step={0.01}
                min={0}
                precision={2}
                controlls={false}
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
              // rules={[{ required: true, message: 'Please input the name' }]}
            >
              <Input_Number
                className="text_right"
                // value={    index.totalamount=(index.cost + index.taxamount)
                // }
                value={
                  index.quotation_details_cost +
                  index.quotation_details_tax_amount
                }
                onChange={(e) =>
                  handleInputChange2(e, index, "quotation_details_total")
                }
                align="right"
                step={0.01}
                min={0}
                precision={2}
                controlls={false}
                onKeyDown={(e) => handleEnter(e, index.key)}
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
        setAllLocations(temp);
      });
    } catch (err) {
      console.log("error while getting the locations: ", err);
    }
  };

  const GetAllLeadData = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/lead?startIndex=${pageofIndex}&noOfItems=${noofItems}`
    )
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          // setAllLeadList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          // setCurrentcount(res?.data?.data?.currentCount);
          let array = [];
          res?.data?.data?.leads?.forEach((item, index) => {
            array.push({
              lead_id: item?.lead_id,
              lead_customer_name: item?.lead_customer_name,
            });
            setAllLeadList(array);
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
      console.log("one quatation iss ::", onequatation?.data?.data);
      console.log(" quatation no is:", onequatation?.data?.data.quotation_no);
      setquatationno(onequatation?.data?.data?.quotation_no);
      setquotshipper(onequatation?.data?.data?.quotation_shipper);
      setQuotconsignee(
        onequatation?.data?.data?.crm_v1_leads.lead_customer_name
      );
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
      setquotexchngerate(onequatation?.data?.data?.quotation_exchange_rate);
      setquotunits(onequatation?.data?.data?.crm_v1_units.unit_name);

      editForm.setFieldsValue({
        quotation_no: onequatation?.data?.data?.quotation_no,
        // quotationdate:onequatation?.data?.data?.quotation_date,
        // validity_date:onequatation?.data?.data?.quotation_validity,
        shipper: onequatation?.data?.data?.quotation_shipper,
        quotation_consignee:
          onequatation?.data?.data?.crm_v1_leads.lead_customer_name,
        freight_type:
          onequatation?.data?.data?.fms_v1_freight_types.freight_type_name,
        quotation_cargotype: onequatation?.data?.data?.quotation_cargo_type,
        quotation_mode: onequatation?.data?.data?.quotation_mode,
        quotation_carrier:
          onequatation?.data?.data?.fms_v1_payment_terms.payment_term_name,
        quotation_terms:
          onequatation?.data?.data?.fms_v1_payment_terms.payment_term_name,
        gross_wt: onequatation?.data?.data?.quotation_gross_wt,
        chargeable_wt: onequatation?.data?.data?.quotation_chargeable_wt,
        quot_npieces: onequatation?.data?.data?.quotation_no_of_pieces,
        currency:
          onequatation?.data?.data?.generalsettings_v1_currency.currency_name,
        exchnagerate: onequatation?.data?.data?.quotation_exchange_rate,
        quotation_units: onequatation?.data?.data?.crm_v1_units.unit_name,
        quotation_destination:
          onequatation?.data?.data
            ?.fms_v1_locations_fms_v1_quotation_quotation_destination_idTofms_v1_locations
            .location_name,
        quotation_origin:
          onequatation?.data?.data
            ?.fms_v1_locations_fms_v1_quotation_quotation_origin_idTofms_v1_locations
            .location_name,
      });

      onequatation?.data?.data.fms_v1_quotation_details.forEach(
        (item, index) => {
          let existingValues = editForm.getFieldsValue();
          let { quotation_details } = existingValues;
          console.log("existing values", quotation_details);
          // quotation_details.forEach((quotation_details, index) => {
          let sum = 0;
          let assignValues = quotation_details[tableData.length];
          assignValues["quotation_details_service_id"] =
            item.quotation_details_service_id;
          assignValues["quotation_details_cost"] = item.quotation_details_cost;
          assignValues["quotation_details_tax_type"] =
            item.quotation_details_tax_type;
          assignValues["quotation_details_tax_amount"] =
            item.quotation_details_tax_amount;
          assignValues["quotation_details_total"] =
            item.quotation_details_total;
          editForm.setFieldsValue({ quotation_details });
          // });

          setTableData([
            ...tableData,
            {
              key: index,
              quotation_details_service_id: item.quotation_details_service_id,
              quotation_details_cost: item.quotation_details_cost,
              quotation_details_tax_type: item.quotation_details_tax_type,
              quotation_details_tax_amount: item.quotation_details_tax_amount,
              quotation_details_total: item.quotation_details_total,
            },
          ]);
        }
      );
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

  const [taxTypes, setTaxTypes] = useState();
  const getAllTaxTypes = async () => {
    try {
      const allTxTypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/tax-types?startIndex=${pageofIndex}&perPage=${numOfItems}`
      );
      console.log("all taxtype are", allTxTypes.data.data);
      setTaxTypes(allTxTypes.data.data);
    } catch (err) {
      console.log("error while getting the tax types: ", err);
    }
  };

  // const OnSubmitedit = () => {
  //   const formData = new FormData();
  //   formData.append("quotation_no", prname.trim(" "));
  //   formData.append("quotation_date", prcode);
  //   formData.append("product_code", prcode);
  //   formData.append("quotation_validity", prcategory);
  //   formData.append("quotation_consignee", prbrand);
  //   formData.append("quotation_shipper", prunit);
  //   formData.append("quotation_freight_type", prunit);
  //   formData.append("quotation_cargo_type", prunit);
  //   formData.append("quotation_carrier", prattribtearray);
  //   formData.append("quotation_mode", prDescription);
  //   formData.append("quotation_origin_id", prDescription);
  //   formData.append("quotation_origin", prDescription);
  //   formData.append("quotation_destination_id", prDescription);
  //   formData.append("quotation_destination", prDescription);
  //   formData.append("quotation_no_of_pieces", prDescription);
  //   formData.append("quotation_uom", prDescription);
  //   formData.append("quotation_gross_wt", prDescription);
  //   formData.append("quotation_chargeable_wt", prDescription);
  //   formData.append("quotation_payment_terms", prDescription);
  //   formData.append("quotation_currency", prDescription);
  //   formData.append("quotation_exchange_rate", prDescription);
  //   if (img) {
  //     formData.append("product_pic", img);
  //   }
  //   // formData.append("quotation_payment_terms", prDescription);

  //     PublicFetch.patch(
  //       `${CRM_BASE_URL_SELLING}/product/${parseInt(prid)}`,
  //       formData,
  //       {
  //         "Content-Type": "Multipart/form-Data",
  //       }
  //     )
  //       .then((res) => {
  //         console.log("data is successfully saved", res.data.success);

  //       })
  //       .catch((err) => {
  //         console.log("error", err);
  //         setError(true);
  //       });

  // };

  useEffect(() => {
    getallfrighttype();
    getallPaymentTerms();
    getallunits();
    getallcarrier();
    getallcurrency();
    getonequatation();
    getAllLocations();
    getAllTaxTypes();
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
                        <InputType value={quatationno} />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Quotation date</label>
                      <Form.Item
                        name="quotationdate"
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
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Validity date</label>
                      <Form.Item
                        name="validity_date"
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

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Consignee</label>
                      <Form.Item
                        name="quotation_consignee"
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
                        <InputType value={quotshipper} />
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
                        name="quotation_cargotype"
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
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label> Destination</label>
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

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
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

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Terms</label>
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

                    <div className="col-xl-3 col-sm-6  mt-2">
                      <label>Number of pieces</label>
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

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>UOM</label>
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

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Gross Weight</label>
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

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Chargeable Weight</label>
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
