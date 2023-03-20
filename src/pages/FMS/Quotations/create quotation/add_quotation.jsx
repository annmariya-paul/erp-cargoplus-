import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { cargo_typeoptions } from "../../../../utils/SelectOptions";
import { DragOutlined, FontColorsOutlined } from "@ant-design/icons";
import dragula from "dragula";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import "dragula/dist/dragula.css";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import TableData from "../../../../components/table/table_data";
import { FaTrash } from "react-icons/fa";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import { useNavigate } from "react-router-dom";
import { GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";
import FileUpload from "../../../../components/fileupload/fileUploader";
import { Form, InputNumber } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import InputType from "../../../../components/Input Type textbox/InputType";
import { Select, Popconfirm } from "antd";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { DatePicker } from "antd";
import "./quotation.scss";
import { ROUTES } from "../../../../routes";
import Input_Number from "../../../../components/InputNumber/InputNumber";
import moment from "moment";
import axios from "axios";

export default function Add_Quotation() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [taxratee, setTaxRatee] = useState();
  console.log("tax rate ", taxratee);
  const [cargooptions, setCargooptions] = useState(cargo_typeoptions);
  console.log("cargo options : ", cargooptions);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState();
  const [taxType, setTaxtype] = useState();
  const [currencyDefault, setCurrencyDefault] = useState();
  console.log("curencydefault", currencyDefault);

  const [addForm] = Form.useForm();
  const navigate = useNavigate();
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
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
  const [Errormsg, setErrormsg] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.QUATATIONS);
      }, time);
    }
  };

  const [tableData, setTableData] = useState(dataSource);
  const [newGrandTotal, setNewGrandTotal] = useState();
  const getIndexInParent = (el) =>
    Array.from(el.parentNode.children).indexOf(el);
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
  useEffect(() => {
    let grandTotal = 0;
    tableData?.map((item, index) => {
      console.log("deatils totals", item);
      grandTotal += item.quotation_details_total;
    });
    // }
    addForm.setFieldsValue({ grandtotal: grandTotal });
  }, [tableData]);
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

  const [frighttype, setFrighttype] = useState();


  const [currencydata, setCurrencydata] = useState();
  const [carrierdata, setCarrierdata] = useState();
  const [OpportunityList, setOpportunityList] = useState([]);
  const [currentcount, setCurrentcount] = useState();
  const [locationType, setLocationType] = useState();

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
      let arr = [];
      allcurrency?.data?.data?.forEach((item, index) => {
        if (item.currency_is_default === 1) {
          arr = item?.currency_code;
          setCurrencyDefault(arr);
        }
      });
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
      // setFrighttypemode(allfrighttypes.data.data.freight_type_mode);
    } catch (err) {
      console.log("Error in fetching fright types : ", err);
    }
  };

  // const gatallTaxType= ()=> {
  //   PublicFetch.get(`${CRM_BASE_URL_FMS}/tax-types?startIndex=${pageofIndex}&noOfItems=${noofItems}`).then((res)=> {
  //     console.
  //   })
  // }
  const [taxTypes, setTaxTypes] = useState();
  const getAllTaxTypes = async () => {
    try {
      const allTxTypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/tax-types/Minimal`
      );
      console.log("all taxtype are", allTxTypes.data.data);
      setTaxTypes(allTxTypes.data.data);
    } catch (err) {
      console.log("error while getting the tax types: ", err);
    }
  };

  const [currencyRates, setCurrencyRates] = useState(0);
  console.log("ratesssss", currencyRates);
  let b;
  const getCurrencyRate = (data) => {
    const code = currencydata?.filter((item) => {
      if (item?.currency_id === data) {
        b = item?.currency_code;
      }
    });
    console.log("code", b);
    console.log(";;;;;;;;;", data);
    axios
      .get(`https://open.er-api.com/v6/latest/${currencyDefault}`)
      .then(function (response) {
        console.log("currency current rate:", response);
        let a = response.data.rates[b];
        console.log("currency match", a);
        let rate=1/a;
        setCurrencyRates(rate);
        addForm.setFieldValue("exchnagerate", rate);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTaxTypes();
  }, []);
  useEffect(() => {
    getallfrighttype();
    getallcurrency();
    getallcarrier();
    getallPaymentTerms();
  }, []);

  const handleDelete = (key) => {
    const newData = tableData?.filter((item) => item?.key !== key);
    console.log("new dtata", newData.length);
    if (newData.length > 0) {
      setTableData(newData);
    }

    let grandTotal = 0;
    for (let item of newData) {
      grandTotal += item["quotation_details_total"];
    }
    setNewGrandTotal(grandTotal);
    if (newData.length <= 0) {
      addForm.setFieldsValue({ quotation_details: newData });
    }

    addForm.setFieldsValue({ grandtotal: grandTotal });
  };

  // console.log("userdata task",index);
  //         formData.append(`quotation_details[${index}][quotation_details_service_id] `,item.tasks);
  //         formData.append(`quotation_details[${index}][quotation_details_cost] `, item.cost);
  //         formData.append(`quotation_details[${index}][quotation_details_tax_type] `, item.taxtype);
  //         formData.append(`quotation_details[${index}][quotation_details_tax_amount] `,item.taxamount);
  //         formData.append(`quotation_details[${index}][quotation_details_total] `, item.totalamount);
  //       })

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
    // {
    //   title: "",
    //   dataIndex: "operation",
    //   render: (_, record) =>
    //     tableData.length >= 1 ? (
    //       <Popconfirm
    //         title="Sure to delete?"
    //         onConfirm={() => handleDelete(record.key)}
    //       >
    //         <div className="deleteIcon m-0">
    //           <FaTrash />
    //         </div>
    //       </Popconfirm>
    //     ) : null,
    // },
    {
      title: "TASKS",
      dataIndex: "quotation_details_service_id",
      key: "quotation_details_service_id",
      width: "30%",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center">
            <Form.Item
              name={[
                "quotation_details",
                index.key,
                "quotation_details_service_id",
              ]}
              // rules={[{ required: true, message: "Please select a task" }]}
            >
              <SelectBox
                allowClear
                showArrow={false}
                showSearch
                optionFilterProp="children"
                className="selwidth input_bg"
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
      width: "10%",

      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div
            className="d-flex justify-content-center align-items-center tborder "
            key={index.index}
          >
            <Form.Item
              name={["quotation_details", index.key, "quotation_details_cost"]}
              // rules={[{ required: true, message: "Required" }]}
            >
              <Input_Number
                className="text_right input_bg selwidthcost"
                value={index.quotation_details_cost}
                onChange={(value) => {
                  handleInputchange1(
                    value,
                    index.key,
                    "quotation_details_cost",
                    "tr"
                  );
                  console.log(" input numberevent ", value, index.key);
                }}
                align="right"
                // step={0.01}
                min={0}
                precision={2}
                controlls={false}
                onBlur={() => {
                  handleInputChange(
                    taxType,
                    index.key,
                    "quotation_details_tax_type",
                    "tx"
                  );
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
              // rules={[{ required: true, message: "Required  " }]}
            >
              <SelectBox
                allowClear
                showSearch
                optionFilterProp="children"
                className="selectwidthtaxtype mb-2 input_bg"
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
                className="text_right input_bg selectwidthtaxamt"
                // value={index.taxamount}
                onChange={(e) =>
                  handleInputchange1(
                    e,
                    index.key,
                    "quotation_details_tax_amount"
                  )
                }
                align="right"
                // step={0.01}
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
              // rules={[{ required: true, message: 'Please input the name' }]}
            >
              <Input_Number
                className="text_right input_bg selectwidthtot"
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
                // step={0.01}
                min={0}
                precision={2}
                controlls={false}
                disabled={true}
                // onKeyDown={(e) => handleEnter(e, index.key)}
              />
            </Form.Item>
            {/* <div className="">
              {index.quotation_details_total &&
              index.quotation_details_total ? (
                <></>
              ) : (
                <>
                  <label>Total is required</label>
                </>
              )}
            </div> */}
          </div>
        );
      },

      align: "right",
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
    PublicFetch.get(`${CRM_BASE_URL}/lead/Minimal`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          // setAllLeadList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          setCurrentcount(res?.data?.data?.currentCount);
          setAllLeadList(res?.data?.data);

          let array = [];
          res?.data?.data?.leads?.forEach((item, index) => {
            array.push({
              lead_id: item?.lead_id,
              lead_customer_name: item?.lead_customer_name,
            });
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
      setAllunit(allunits?.data?.data);
      console.log("all units are : ", allunit);
    } catch (err) {
      console.log("error to getting all units", err);
    }
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
  const [selectedOption, setSelectedOption] = useState("");
  const [oppnew, setOppnew] = useState([]);
  console.log("Opportunities are :::", oppnew);
  const [frightmode,setFrightmode]= useState();
  console.log("change",frightmode);
  const [frighttypemode,setFrighttypemode]=useState();
  console.log("frighttype mode ",frighttypemode);
  const [leadIdEnq, setLeadIdEnq] = useState("");

  console.log("Selected  enquiry lead id is ", leadIdEnq);
  const handleLeadIdEnq = (leadIdenq) => {
    addForm.setFieldValue("consignee", leadIdenq);
    setLeadIdEnq(leadIdenq);
  };
  // const handleFirstDropdownChange = (event) => {
  //   setSelectedOption(event);
  // };
  const mode = (e) => {
   if(e)
   { 
    
    {frighttype &&
      frighttype.length > 0 &&
      frighttype.map((item, index) => {
   
         if(item.freight_type_id === e)

         {
          console.log("reached",item.freight_type_mode);
          setFrighttypemode(item.freight_type_mode);
          locationBytype(item.freight_type_mode);
         }else{
          locationBytype();
         }
           
        
      })} }
  }
  const [oppleadid, setOppleadid] = useState();
  



  console.log("Opportunities lead id :::", oppleadid);
  const [numOfItems, setNumOfItems] = useState("25");
  const GetOpportunityData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/opportunity/Minimal`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("All opportunity dataqqq", res?.data?.data);

          let tempArr = [];
          res?.data?.data?.forEach((item, index) => {
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
            handleLeadIdEnq();
          });
          console.log("hellooooqqqqq", tempArr);
          setOppnew(tempArr);
          setOppleadid(res?.data?.data?.opportunity_lead_id);
          console.log("newwww", res?.data?.data?.opportunity_lead_id);
          setOpportunityList(res?.data?.data);
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
  const [allLocations, setAllLocations] = useState();
  console.log("locations ", allLocations);
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

  const locationBytype = (data) => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/locations/type-location/${data}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of location type", res.data, data);
          setLocationType(res.data.data.location_type);
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

  useEffect(() => {
    getallunits();
    getAllLocations();
    quotationDate();
  }, []);

  const getAllservices = () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/service/Minimal`)
      .then((res) => {
        console.log("all services is ", res.data.data);
        if (res?.data?.success) {
          console.log("All services dataawww", res?.data?.data?.services);
          setServices(res.data.data);
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
              service_taxtype_percentage:
                item.fms_v1_tax_types.tax_type_percentage,
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
  }, [numOfItems, pageofIndex]);

  //   const [errornw, setErrornw] = useState(false);

  // const validateDate = (selectedDate) => {
  //   if (!selectedDate) {
  //     setErrornw(true);
  //     return;
  //   }
  //   setErrornw(false);
  // };
  // const [qno,setQno]=useState(Date.now());
  const [filenew, setFilenew] = useState();
  console.log("file", filenew);
  const OnSubmit = (data) => {
    console.log("submitting data", data);
    const data11 = "noufal12343221";

    const date1 = moment(data.qdate).format("YYYY-MM-DD");
    const date2 = moment(data.vdate).format("YYYY-MM-DD");
    const docfile = data?.new?.file?.originFileObj;
    const formData = new FormData();
    // formData.append("quotation_no", qno);
    formData.append("quotation_enquiry", data.eno);
    formData.append("quotation_date", date1);
    formData.append("quotation_validity", date2);
    formData.append("quotation_consignee", data.consignee);
    formData.append("quotation_shipper", data.shipper);
    formData.append("quotation_freight_type", data.freighttype);
    formData.append("quotation_cargo_type", data.cargotype);
    formData.append("quotation_carrier", data.carrier);
    formData.append("quotation_mode",frighttypemode );
    formData.append("quotation_origin_id", data.corgin);
    // formData.append("quotation_origin", parseInt(data.corgin));
    formData.append("quotation_destination_id", data.cdest);
    // formData.append("quotation_destination",  data.cdest);
    formData.append("quotation_no_of_pieces", data.npieces);
    formData.append("quotation_uom", data.uom);
    formData.append("quotation_gross_wt", data.gweight);
    formData.append("quotation_chargeable_wt", data.weight);
    formData.append("quotation_payment_terms", data.terms);
    formData.append("quotation_currency", data.currency);
    formData.append("quotation_exchange_rate", data.exchnagerate);
    formData.append("quotation_grand_total", data.grandtotal);
    if (filenew) {
      formData.append("attachments", filenew);
    }

    // console.log("file we get :", data.new.file.originFileObj);
    console.log("abc", data.quotation_details);

    const userData = Object.values(data.quotation_details);
    console.log("qtn details", data.quotation_details);
    console.log("usserData", userData);
    // const [quotation_details_service_id, quotation_details_cost,quotation_details_tax_type,quotation_details_tax_amount,quotation_details_total] = userData;
    // formData.append('userData', JSON.stringify(userData));
    // formData.append('quotation_details', JSON.stringify(userData));

    userData.map((item, index) => {
      console.log("userdata task", index);
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
          `quotation_details[${index}][quotation_details_tax_type]`,
          item.quotation_details_tax_type
        );
        formData.append(
          `quotation_details[${index}][quotation_details_tax_amount]`,
          item.quotation_details_tax_amount
        );
        formData.append(
          `quotation_details[${index}][quotation_details_total]`,
          item.quotation_details_total
        );
      }
    });

    console.log("before sending data");
    PublicFetch.post(`${CRM_BASE_URL_FMS}/quotation`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("data is successfully saved", res.data.success);
        if (res.data.success) {
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000);
        } else {
          setErrormsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setError(true);
      });
  };

  const quotationDate = () => {
    let date = new Date();
    let date1 = moment(date);
    addForm.setFieldsValue({ qdate: date1 });
  };

  const beforeUpload = (file, fileList) => {};

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <Form
            name="addForm"
            form={addForm}
            onFinish={(value) => {
              console.log("values iss", value);
              OnSubmit(value);
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
          >
            <div className="container-fluid ms-0 me-2 ">
              <div className="row  mt-3">
                <h5 className="lead_text">Add New Quotation</h5>
              </div>
              <div className="row me-3">
                <div className="content-tabs-new row justify-content m-3">
                  <div className="row mt-3 ">
                    <h6 className="lead_text">Basic Info</h6>
                  </div>
                  <div className="row mb-2  ">
                    {/* <div className="col-md-6 col-12"> */}
                    {/* <div className="row"> */}
                    <div className="col-xl-4 col-sm-12 mt-2 px-3 ">
                      <label>Quotation date</label>

                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            message: "Please select quotation date",
                          },
                        ]}
                      >
                        <DatePicker
                        
                          style={{ borderWidth: 0, marginTop: 10 }}
                          defaultValue={moment(date)}
                          format={dateFormatList}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label>Validity date</label>
                      <Form.Item
                        name="vdate"
                        rules={[
                          {
                            required: true,

                            message: "Please select validity date",
                          },
                        ]}
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
                    <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label>Freight Type</label>
                      <Form.Item
                        name="freighttype"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Freight Type",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          onChange={(e) => {
                            console.log("date mmm", e);
                            setFrightmode(e);
                            mode(e);
                          }}
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
                      <label>Enquiry No</label>
                      <Form.Item name="eno">
                        <SelectBox
                          onChange={(e) => handleLeadIdEnq(e)}
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

                    <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label>Consignee</label>
                      <Form.Item
                        name="consignee"
                        rules={[
                          {
                            required: true,
                            message: "Please select Consignee",
                          },
                        ]}
                      >
                        <SelectBox
                          onChange={(e) => handleLeadId(e)}
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {allLeadList &&
                            allLeadList.length > 0 &&
                            allLeadList.map((item, index) => {
                              // console.log("lead id ddd:",item.lead_id)

                              //  if( leadIdEnq && leadIdEnq === leadId){

                              //   return (
                              //     <Select.Option
                              //       key={item.lead_id}
                              //       value={item.lead_id}
                              //     >
                              //       {item.lead_customer_name}
                              //     </Select.Option>
                              //   );

                              //  }else{
                              //   return (
                              //     <Select.Option
                              //       key={item.lead_id}
                              //       value={item.lead_id}
                              //     >
                              //       {item.lead_customer_name}
                              //     </Select.Option>
                              //   );
                              //  }
                              if (leadIdEnq && leadIdEnq === item.lead_id) {
                                return (
                                  <Select.Option
                                    key={item.lead_id}
                                    value={item.lead_id}
                                  >
                                    {item.lead_customer_name}
                                  </Select.Option>
                                );
                              } else if (leadIdEnq === undefined) {
                                return (
                                  <Select.Option
                                    key={item.lead_id}
                                    value={item.lead_id}
                                  >
                                    {item.lead_customer_name}
                                  </Select.Option>
                                );
                              }
                              // return null;
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label>Shipper</label>
                      <Form.Item
                        name="shipper"
                        rules={[
                          {
                            required: true,

                            message: "Please enter shipper name",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>

                    {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div className="row  mt-1 ">
                <div className="col-md-6 col-12">
                  <div className="content-tabs-new row justify-content mx-1 mb-3">
                    <div className="row mt-3">
                      <h6 className="lead_text">Transportation</h6>
                    </div>

                    {/* <div className="col-xl-6 col-sm-12 mt-2" hidden>
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
                          onChange={(e) => {
                            locationBytype(e);
                          }}
                        >
                          <Select.Option value="Air">Air</Select.Option>
                          <Select.Option value="Sea">Sea</Select.Option>
                          <Select.Option value="Road">Road</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div> */}
                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label> Origin</label>
                      <Form.Item
                        name="corgin"
                        rules={[
                          {
                            required: true,
                            message: "Please select origin",
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
                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label> Destination</label>
                      <Form.Item
                        name="cdest"
                        rules={[
                          {
                            required: true,
                            message: "Please select destination",
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

                    <div className="col-xl-6 col-sm-12 mt-2 mb-5 pb-5">
                      <label>Carrier</label>
                      <Form.Item
                        name="carrier"
                        rules={[
                          {
                            required: true,
                            message: "Please select Carrier",
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
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="content-tabs-new row justify-content mx-1 mb-3  ">
                    <div className="row mt-3">
                      <h6 className="lead_text">Shipment Details</h6>
                    </div>
                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>Cargo Type</label>
                      <Form.Item
                        name="cargotype"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please select a Cargo Type",
                        //   },
                        // ]}
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
                                <Select.Option key={item.id} value={item.value}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-6 col-sm-12  mt-2">
                      <label>Number of pieces</label>
                      <Form.Item
                        name="npieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter Number of pieces",
                          },
                        ]}
                      >
                        <Input_Number />
                      </Form.Item>
                    </div>

                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>UOM</label>
                      <Form.Item
                        name="uom"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please select UOM",
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
                    <div className="col-xl-6 col-sm-12 mt-2">
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
                          // step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-xl-6 col-sm-12 mt-2">
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
                          // step={0.01}
                          min={0}
                          precision={2}
                          controlls={false}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1 ">
                <div className="col-md-6 col-12 ">
                  <div className="content-tabs-new row justify-content mx-1 mb-3">
                    <div className="row mt-2">
                      <h6 className="lead_text">Payment Info</h6>
                    </div>

                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>Terms</label>
                      <Form.Item
                        name="terms"
                        rules={[
                          {
                            required: true,
                            message: "Please select Terms",
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
                      <label>Currency</label>
                      <Form.Item
                        name="currency"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please select currency",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          onChange={(e) => {
                            console.log("ann", e);
                            getCurrencyRate(e);
                          }}
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

                    <div className="col-xl-6 col-sm-12 mt-2 pb-4">
                      <label>Exchange Rate</label>
                      <Form.Item
                        name="exchnagerate"
                        rules={[
                          {
                            required: true,

                            message: "Please enter a Valid Rate",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
                          value={currencyRates}
                          // onChange={handleChange}
                          align="right"
                          // step={0.01}
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
                  <div className="content-tabs-new row justify-content mx-1 mb-1">
                     <div className="row mt-2">
                      <h6 className="lead_text">Attachments</h6>
                    </div>
                    <div className="col-xl-12 col-sm-12 mt-2">
                    
                    
                      <Form.Item className="mt-2" name="new">
                        <FileUpload
                          multiple
                          filetype={"Accept only pdf and docs"}
                          // height={188}
                          listType="picture"
                          accept=".pdf,.docs,"
                          // aceept=".jpeg,.jpg,.png"
                          onPreview={handlePreview}
                          beforeUpload={beforeUpload}
                          // value={leadAttachment}
                          // onChange={(e) => setLeadAttachment(e.target.value)}
                          onChange={(file) => {
                            console.log("Before upload", file.file);
                            console.log(
                              "Before upload file size",
                              file.file.size
                            );
                            setFilenew(file.file.originFileObj);

                            // if (
                            //   file.file.size > 1000 &&
                            //   file.file.size < 500000
                            // ) {
                            //   // setLeadimg(file.file.originFileObj);
                            //   // setFileSizeError(false);
                            //   console.log(
                            //     "file greater than 1 kb and less than 500 kb"
                            //   );
                            // } else {
                            //   // setFileSizeError(true);
                            //   console.log("hgrtryyryr");
                            // }
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1 me-2 ">
                <div className="content-tabs-tablenew row justify-content m-3">
                  <div className="row mt-2">
                    <h6 className="lead_text">Task & Description</h6>
                  </div>
                  <div className="datatable">
                    <TableData
                      data={tableData}
                      columns={columns}
                      rowKey={(record) => record.key}
                      custom_table_css="table_qtn qtn_table_brdr"
                    />
                  </div>

                  <div className="d-flex justify-content-end mt-4 ms-5">
                    <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-3">
                      <p style={{ fontWeight: 600 }}>Grand Total :</p>
                    </div>

                    <div className="col-lg-2 col-sm-6 col-xs-2 me-5">
                      <Form.Item name="grandtotal">
                        <Input_Number
                          className="text_right grandtotal"
                          value={total}
                          align="right"
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
            {/* <div className="row justify-content-center">
             
              </div> */}

            {/* <div className="container mb-4 ml-1"  > */}

            {/* </div> */}

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
            show={successPopup}
            onHide={() => setSuccessPopup(false)}
            success
          />
        </div>
      </div>
    </>
  );
}
