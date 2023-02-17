import React, { useState, useEffect } from "react";

import { Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { InputNumber } from "antd";
import moment from "moment";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import {
  BorderBottomOutlined,
  DragOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import dragula from "dragula";

import "dragula/dist/dragula.css";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import TableData from "../../../../components/table/table_data";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";
import { Popconfirm } from "antd";
import Custom_model from "../../../../components/custom_modal/custom_model";

import "../job.scss";

export default function Taskexpenses() {

  const { id } = useParams();
  console.log("id :::::", id);
  const [successPopup, setSuccessPopup] = useState(false);
  const [alljobs, setAllJobs] = useState();
  const [addForm] = Form.useForm();
  const [services, setServices] = useState([]);
  console.log("Servicesss are :::", services);

  const dataSource = [
    {
      key: uuidv4(),
      quotation_details_service_id: "",
      quotation_details_cost: "",
      quotation_details_tax_type: "",
      quotation_details_tax_amount: "",
      quotation_details_total: "",
    },
  ];

  const [tableData, setTableData] = useState(dataSource);
  const [newGrandTotal, setNewGrandTotal] = useState();
  const getIndexInParent = (el) =>
    Array.from(el.parentNode.children).indexOf(el);

  const handleEnter = (e) => {
    console.log("Hello");
    console.log("Key ::::::: ", e.key);
    if (e.key === "Enter" || e.key === "Tab") {
      setTableData([
        ...tableData,
        {
          // key: `${tableData.length + 1}`,
          key: uuidv4(),
          quotation_details_service_id: "",
          quotation_details_cost: "",
          quotation_details_tax_type: "",
          quotation_details_tax_amount: "",
          quotation_details_total: "",
        },
      ]);
    }
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

  const [currentcount, setCurrentcount] = useState();
  const [taxratee, setTaxRatee] = useState();
  console.log("tax rate ", taxratee);
  const [taxTypes, setTaxTypes] = useState();
  const [allLeadList, setAllLeadList] = useState([]);
  console.log("Lead names :", allLeadList);
  const [numOfItems, setNumOfItems] = useState("25");
  const handleDelete = (key) => {
    const newData = tableData?.filter((item) => item?.key !== key);
    setTableData(newData);
    let grandTotal = 0;
    for (let item of newData) {
      grandTotal += item["quotation_details_total"];
    }
    setNewGrandTotal(grandTotal);
    addForm.setFieldsValue({ grandtotal: grandTotal });
  };
  const [taxType, setTaxtype] = useState();
  const handleInputChange = (e, key, col, tx) => {
    console.log("gai guys", e, col, tx);
    // setSampleid(e)
    taxTypes.map((item, index) => {
      if (tx && e === item.tax_type_id) {
        if (col && key && tx && e === item.tax_type_id) {
          setTaxRatee(item.tax_type_percentage);
          // let hai = item.tax_type_percentage;

          let existingValues = addForm.getFieldsValue();
          console.log("existing form", existingValues);
          let { quotation_details } = existingValues;
          let assignValues = quotation_details[key];

          let taxamount =
            (assignValues["quotation_details_cost"] *
              item.tax_type_percentage) /
            100;
          console.log("sum of tax", taxamount);
          assignValues["quotation_details_tax_amount"] = taxamount;

          let totalAmount =
            assignValues["quotation_details_cost"] +
            assignValues["quotation_details_tax_amount"];
          console.log("total aount", totalAmount);
          assignValues["quotation_details_total"] = totalAmount;
          console.log("quation deatils", quotation_details);
          addForm.setFieldsValue({ quotation_details });
          // setTotal(sum);
          // addForm.setFieldsValue({
          //   grandtotal: sum,
          // });
          // let grandTotal = 0;
          // for (let key in quotation_details) {
          //   let item = quotation_details[key];
          //   grandTotal += item["quotation_details_total"];
          //   setNewGrandTotal(grandTotal);
          //   addForm.setFieldsValue({ grandtotal: grandTotal });
          // }

          // console.log("Grand Total:", grandTotal);

          setTableData(
            tableData.map((item) => {
              if (item.key === key) {
                return {
                  ...item,
                  quotation_details_tax_amount: taxamount,
                  quotation_details_tax_type: e,
                  quotation_details_total: totalAmount,
                };
              }
              return item;
            })
          );
          console.log("tabledata", tableData);
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

  const handleInputchange1 = (e, key, col, tr) => {
    setTableData(
      tableData.map((item) => {
        if (item.key === key) {
          return { ...item, [col]: e };
        }
        return item;
      })
    );
    if (e && col === "quotation_details_service_id") {
      allservices.map((item, index) => {
        if (e === item.service_id) {
          setTaxtype(item.service_taxtype);
          let existingValues = addForm.getFieldsValue();
          let { quotation_details } = existingValues;
          let assignValues = quotation_details[key];
          assignValues["quotation_details_tax_type"] = item.service_taxtype;
          addForm.setFieldsValue({ quotation_details });
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
    // addForm.setFieldValue("quotation_details_tax_type", taxratee);
  };
  console.log("tax type ::123", taxType);
  const getSingleJob = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job/${id}`)
      .then((res) => {
        console.log("response of job", res);
        if (res.data.success) {
          console.log("Success of job", res.data.data);

          let temp = "";
        
         
          let date = moment(res.data.data.job_date).format("DD-MM-YYYY");
          temp = {
            job_id: res.data.data.job_id,
            job_no: res.data.data.job_number,
            job_cargo_type: res.data.data.job_cargo_type,
            job_mode: res.data.data.job_mode,
            job_no_of_pieces: res.data.data.job_no_of_pieces,
            job_shipper: res.data.data.job_shipper,
            // job_validity: res.data.data.job_validity,
            // job_validity1: validity,
            job_date: res.data.data.job_date,
            job_date1: date,
            job_exchange_rate: res.data.data.job_exchange_rate,
            job_grand_total: res.data.data.job_grand_total,
            job_gross_wt: res.data.data.job_gross_wt,
            job_chargeable_wt: res.data.data.job_chargeable_wt,
            job_carrier: res.data.data.job_carrier,
            job_carrier1: res.data.data.fms_v1_carrier.carrier_name,
            job_consignee: res.data.data.job_consignee,
            job_consignee1: res.data.data.crm_v1_leads.lead_customer_name,
            // job_currency: res.data.data.job_currency,
            // job_currency1:
            //   res.data.data.generalsettings_v1_currency.currency_name,
            job_destination_id: res.data.data.job_destination_id,
            job_destination_id1:
              res.data.data
                .fms_v1_locations_fms_v1_jobs_job_destination_idTofms_v1_locations
                .location_name,
            // job_destination_id1:
            //   res.data.data
            //     .fms_v1_locations_fms_v1_job_job_destination_idTofms_v1_locations
            //     .location_name,
            job_awb_bl_no: res.data.data.job_awb_bl_no,

            job_freight_type: res.data.data.job_freight_type,
            job_freight_type1:
              res.data.data.fms_v1_freight_types.freight_type_name,
            job_origin_id: res.data.data.job_origin_id,
            job_origin_id1:res.data.data
                .fms_v1_locations_fms_v1_jobs_job_origin_idTofms_v1_locations
                  .location_name,
            job_payment_terms: res.data.data.job_payment_terms,
            job_payment_terms1:
              res.data.data.fms_v1_payment_terms.payment_term_name,
            job_uom: res.data.data.job_uom,
            job_uom1: res.data.data.crm_v1_units.unit_name,
            fms_v1_job_details: res.data.data.fms_v1_job_details,
            fms_v1_enquiry_jobs: res.data.data.fms_v1_enquiry_jobs,
            job_docs: res.data.data.job_docs,
          };
          console.log("datas", temp);
          setAllJobs(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (id) {
      getSingleJob();
    }
  }, [id]);
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
      title: "Actions",
      dataIndex: "",
      key: "",
      width: 30,
      className: "firstrow",

      render: (data, record, index) => {
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="actionEdit m-0 p-0">
              <DragOutlined className="draggable" type="swap" />
            </div>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
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
      title: "Tasks",
      dataIndex: "quotation_details_service_id",
      key: "quotation_details_service_id",
      // width: "40%",
      align: "center",
      className: "firstrow req_font",
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
              rules={[{ required: true, message: "Please select" }]}
            >
              <Select style={{ minWidth: '200px' }}
                bordered={false}
                showArrow={false}
                allowClear
                showSearch
                optionFilterProp="children"
                width={30}
                className="selectwidthexp mb-2"
                value={index.quotation_details_service_id}
                onChange={(e) => {
                  console.log("servicess11123", e);
                  handleInputchange1(
                    e,
                    index.key,
                    "quotation_details_service_id"
                  )}}
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
              </Select>
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Tax Type",
      dataIndex: "quotation_details_tax_type",
      key: "quotation_details_tax_type",
      // width: "100",
      align: "center",
      className: "firstrow",
      
      render: (data, index) => {
        console.log("index is :", index);
        
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_tax_type",
              ]}
              // rules={[{ required: true, message: "Required" }]}
            >
              {/* <InputType
                style={{ border: "none" }}
                className="input_type_style_new"
                value={index.quotation_details_tax_type}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    index.key,
                    "quotation_details_tax_type",
                    "tx"
                  )
                }
              /> */}
              <Select style={{ minWidth: '60px' }}
                bordered={false}
                showArrow={false}
                allowClear
                showSearch
                optionFilterProp="children"
              
                className="selectwidthexp mb-2"
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
                disabled={true}
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
              </Select>
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Tax %",
      dataIndex: "taxp",
      key: "taxp",
      // width: "38%",
      align: "center",
      className: "firstrow",
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
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber style={{ minWidth: '10px' }}
                bordered={false}
                className="text_right"
                value={index.quotation_details_cost}
                onChange={(value) => {
                  console.log(" input numberevent ", value, index.key);
                }}
                align="right"
                min={0}
                precision={2}
                controlls={false}
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
      // width: 150,
      align: "center",
      className: "firstrow",
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
              rules={[{ required: true, message: "Required" }]}
            >
              <Select style={{ minWidth: '80px' }}
                bordered={false}
                showArrow={false}
                
                width={"1000px"}
                allowClear
                showSearch
                optionFilterProp="children"
               
 
                value={index.quotation_details_service_id}
                onChange={(e) => {
                  console.log("servicess11123", e);
                }}
              >
                {agentdata &&
                  agentdata.length > 0 &&
                  agentdata.map((item, index) => {
                    return (
                      <Select.Option
                        key={item.agent_id}
                        value={item.agent_id}
                      >
                        {item.agent_emp_name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
        );
      },
    },

    {
      title: "Cost",
      width: 100,
      align: "center",
      className: "secondrow",
      children: [
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
          width: 60,
          align: "center",
          className: "secondrow",
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
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
        {
          title: "Tax",
          dataIndex: "tax",
          key: "tax",
          width: 60,
          align: "center",
          className: "secondrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
        {
          title: "Total",
          dataIndex: "total",
          key: "total",
          width: 60,
          //   width: 80,
          //   fixed: 'right',
          align: "center",
          className: "secondrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Expense",
      width: 200,
      align: "center",
      className: "thirdrow",
      children: [
        {
          title: "Currency",
          dataIndex: "currency",
          key: "currency",
          width: 60,
          align: "center",
          className: "thirdrow",
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
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Select style={{ minWidth: '50px' }}
                    bordered={false}
                    showArrow={false}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    className="selectwidthexp mb-2"
                    value={index.quotation_details_service_id}
                    onChange={(e) => {
                      console.log("servicess11123", e);
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
                  </Select>
                </Form.Item>
              </div>
            );
          },
        },

        {
          title: "Exchange",
          dataIndex: "exchange",
          key: "exchange",
          width: 20,
          align: "center",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
        {
          title: "Amount Fx",
          dataIndex: "amountfx",
          key: "amountfx",
          width: 40,
          align: "center",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
        },
        {
          title: "Amount Lx",
          dataIndex: "amountlx",
          key: "amountlx",
          width: 40,
          align: "center",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "quotation_details",
                    index.key,
                    "quotation_details_cost",
                  ]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="text_right"
                    value={index.quotation_details_cost}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
                    onKeyDown={(e) => handleEnter(e, index.key)}
                    align="right"
                    // step={0.01}
                    min={0}
                    precision={2}
                    controlls={false}
                  />
                </Form.Item>
              </div>
            );
          },
          //   fixed: 'right',
        },
      ],
    },
  ];

  const [total, setTotal] = useState(0);
  const [leadId, setLeadId] = useState("");

  console.log("Selected lead id is ", leadId);
  const handleLeadId = (leadId) => {
    setLeadId(leadId);
  };

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
            array.push({
              lead_id: item?.lead_id,
              lead_customer_name: item?.lead_customer_name,
            });
            setAllLeadList(array);
            handleLeadId(item.lead_id);
          });
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const [agentdata, setAgentdata] = useState("");
  const getagents = async () => {
    try {
      const allagent = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/agents`
      );
      console.log("all agentss are ::", allagent?.data?.data);
      let array = [];
      allagent?.data?.data?.forEach((item, index) => {
        array.push({
          agent_id: item.agent_id,
          agent_country: item.agent_country,
          agent_emp_id: item.hrms_v1_employee.employee_code,
          agent_emp_name:item.hrms_v1_employee.employee_name
        });
      });
      setAgentdata(array);
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  useEffect(() => {
    getagents();
  }, []);
  const [oppnew, setOppnew] = useState([]);
  console.log("Opportunities are :::", oppnew);

  const [leadIdEnq, setLeadIdEnq] = useState("");

  console.log("Selected  enquiry lead id is ", leadIdEnq);
  const handleLeadIdEnq = (leadIdenq) => {
    addForm.setFieldValue("consignee", leadIdenq);
    setLeadIdEnq(leadIdenq);
  };

  const [oppleadid, setOppleadid] = useState();
  console.log("Opportunities lead id :::", oppleadid);


  
  const [allservices, setAllservices] = useState();
  const [allLocations, setAllLocations] = useState();
  console.log("locations ", allLocations);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Task & Expenses</h5>
            </div>
          </div>

          <div className="content-tabs">
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values iss", value);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="d-flex justify-content mt-2 mx-1 me-5 mb-5">
                <div className=" d-flex justify-content mt-3 me-5 ">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ width: "90px", fontWeight: "bold" }}>
                          {" "}
                          Job No
                        </td>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "190px" }}>{alljobs?.job_no}</td>

                        <td style={{ width: "90px", fontWeight: "bold" }}>
                          Job Date
                        </td>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "90px" }}>{alljobs?.job_date1}</td>

                        <td style={{ width: "190px", fontWeight: "bold" }}>
                          Quotation No
                        </td>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "70px" }}></td>
                      </tr>
                      <tr>
                        <td style={{ width: "120px", fontWeight: "bold" }}>
                          Consignee
                        </td>
                        <td
                          style={{
                            width: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "70px" }}>{alljobs?.job_consignee1}</td>

                        <td style={{ width: "120px", fontWeight: "bold" }}>
                          {" "}
                          Shipper
                        </td>
                        <td
                          style={{
                            width: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "160px" }}>{alljobs?.job_shipper}</td>

                        <td style={{ width: "120px", fontWeight: "bold" }}>
                          AWB/BL No
                        </td>
                        <td
                          style={{
                            width: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ width: "190px" }}>{alljobs?.job_awb_bl_no}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="datatable">
                  <TableData
                    data={tableData}
                    columns={columns}
                    rowKey={(record) => record.key}
                    bordered
                    custom_table_css="table_qtn task_expense_table"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end mt-2 mx-1 me-5">
                <div className=" d-flex justify-content mt-3 me-5 ">
                  <table>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                        >
                          Total Cost
                        </td>
                        <td
                          style={{
                            width: "90px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>
                          120000
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            width: "120px",
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                        >
                          Total Expenses
                        </td>
                        <td
                          style={{
                            width: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          :
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>
                          10000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="d-flex justify-content-center my-4">
                <div className="col-lg-1 ">
                  <Button type="submit" className="qtn_save" btnType="save">
                    Save
                  </Button>
                </div>
              </div>
            </Form>

            <Custom_model
              size={"sm"}
              show={successPopup}
              onHide={() => setSuccessPopup(false)}
              success
            />
          </div>
        </div>
      </div>
    </>
  );
}
