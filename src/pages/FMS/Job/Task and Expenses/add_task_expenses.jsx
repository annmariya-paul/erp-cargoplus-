import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import {Checkbox} from "antd";
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
import "../../Quotations/create quotation/quotation.scss";
import { ROUTES } from "../../../../routes";
import Input_Number from "../../../../components/InputNumber/InputNumber";
import moment from "moment";
import axios from "axios";

export default function Taskexpenses() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [taxratee, setTaxRatee] = useState();
  console.log("tax rate ", taxratee);
  const [cargooptions, setCargooptions] = useState(cargo_typeoptions);
  console.log("cargo options : ", cargooptions);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState();
  
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

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

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
          let grandTotal = 0;
for (let key in quotation_details) {
  let item = quotation_details[key];
  grandTotal += item["quotation_details_total"];
  setNewGrandTotal(grandTotal);
addForm.setFieldsValue({ grandtotal:grandTotal });
}

console.log("Grand Total:", grandTotal);

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
  const handleInputchange1 = (e, key, col) => {
    setTableData(
      tableData.map((item) => {
        if (item.key === key) {
          return { ...item, [col]: e };
        }
        return item;
      })
    );
    addForm.setFieldValue("quotation_details_tax_type", taxratee);
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

  // const gatallTaxType= ()=> {
  //   PublicFetch.get(`${CRM_BASE_URL_FMS}/tax-types?startIndex=${pageofIndex}&noOfItems=${noofItems}`).then((res)=> {
  //     console.
  //   })
  // }
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
      .get("https://open.er-api.com/v6/latest/USD")
      .then(function (response) {
        console.log("currency current rate:", response);
        let a = response.data.rates[b];
        console.log("currency match", a);
        setCurrencyRates(a);
        addForm.setFieldValue(
          "exchnagerate", a
        );
       
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
    setTableData(newData);
    let grandTotal = 0;
    for (let item of newData) {
      grandTotal += item["quotation_details_total"];
    }
    setNewGrandTotal(grandTotal);
    addForm.setFieldsValue({ grandtotal:grandTotal });
  };

 

//   const columns = [
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       className: "drag-visible",
//       render: (data, index) => {
//         return (
//           <div className="d-flex justify-content-center align-items-center gap-2">
//             <div className="actionEdit m-0 p-0">
//               <DragOutlined className="draggable" type="swap" />
//             </div>
//           </div>
//         );
//       },
//     },
//     {
//       title: "",
//       dataIndex: "operation",
//       render: (_, record) =>
//         tableData.length >= 1 ? (
//           <Popconfirm
//             title="Sure to delete?"
//             onConfirm={() => handleDelete(record.key)}
//           >
//             <div className="deleteIcon m-0">
//               <FaTrash />
//             </div>
//           </Popconfirm>
//         ) : null,
//     },
//     {
//       title: "",
//       dataIndex: "quotation_details_service_id",
//       key: "quotation_details_service_id",
//       width: "40%",

//       render: (data, index) => {
//         console.log("index is :", index);
//         return (
//           <div className="d-flex justify-content-center align-items-center tborder ">
//             <Form.Item
//               name={[
//                 "quotation_details",
//                 index.key,
//                 "quotation_details_service_id",
//               ]}
//               rules={[{ required: true, message: 'Please select a task' }]}
//             >
//               <SelectBox
//                 allowClear
//                 showSearch
//                 optionFilterProp="children"
//                 className="selectwidth mb-2"
//                 value={index.quotation_details_service_id}
//                 onChange={(e) => {
//                   console.log("servicess11123", e);
//                   handleInputchange1(
//                     e,
//                     index.key,
//                     "quotation_details_service_id"
//                   );
//                   // handleInputChange(e, index.key, "quotation_details_service_id", "tx")
//                 }}
//               >
//                 {services &&
//                   services.length > 0 &&
//                   services.map((item, index) => {
//                     return (
//                       <Select.Option
//                         key={item.service_id}
//                         value={item.service_id}
//                       >
//                         {item.service_name}
//                       </Select.Option>
//                     );
//                   })}
//               </SelectBox>
//             </Form.Item>
//           </div>
//         );
//       },
//       align: "center",
//     },
//     {
//       title: "COST",
//       dataIndex: "quotation_details_cost",
//       key: "quotation_details_cost",

//       render: (data, index) => {
//         console.log("index is :", index);
//         return (
//           <div className="d-flex justify-content-center align-items-center tborder ">
//             <Form.Item
//               name={["quotation_details", index.key, "quotation_details_cost"]}
//               rules={[{ required: true, message: 'Required' }]}
//             >
//               <Input_Number
//                 className="text_right"
//                 value={index.quotation_details_cost}
//                 onChange={(value) => {
//                   handleInputchange1(
//                     value,
//                     index.key,
//                     "quotation_details_cost"
//                   );
//                   console.log(" input numberevent ", value, index.key);
//                 }}
//                 align="right"
//                 // step={0.01}
//                 min={0}
//                 precision={2}
//                 controlls={false}
//               />
//             </Form.Item>
//           </div>
//         );
//       },

//       align: "right",
//     },
//     {
//       title: "TAX TYPE",
//       dataIndex: "quotation_details_tax_type",
//       key: "quotation_details_tax_type",

//       render: (data, index) => {
//         console.log("index is 112:", index.quotation_details_tax_type);
//         return (
//           <div className="d-flex justify-content-center align-items-center tborder">
//             <Form.Item
//               name={[
//                 "quotation_details",
//                 index.key,
//                 "quotation_details_tax_type",
//               ]}
//               rules={[{ required: true, message: 'Required  ' }]}
//             >
//               {/* <Input_Number
//               className="text_right"
//               value={taxratee}
//               onChange={(e) => handleInputchange1(e, index.key, "quotation_details_tax_type")}
//               align="right"
//               step={0.01}
//               min={0}
//               precision={2}
//               controlls={false}
//             /> */}

//               <SelectBox
//                 allowClear
//                 showSearch
//                 optionFilterProp="children"
//                 className="selectwidthnew mb-2"
//                 value={index.quotation_details_tax_type}
//                 onChange={(e) => {
//                   console.log("servicess11123", e);
//                   // handleInputchange1(e, index.key, "quotation_details_tax_type")
//                   handleInputChange(
//                     e,
//                     index.key,
//                     "quotation_details_tax_type",
//                     "tx"
//                   );
//                 }}
//               >
//                 {taxTypes &&
//                   taxTypes.length > 0 &&
//                   taxTypes.map((item, index) => {
//                     return (
//                       <Select.Option
//                         key={item.tax_type_id}
//                         value={item.tax_type_id}
//                       >
//                         {item.tax_type_name}
//                       </Select.Option>
//                     );
//                   })}
//               </SelectBox>
//             </Form.Item>
//           </div>
//         );
//       },
//       align: "right",
//     },
//     {
//       title: "TAX AMOUNT",
//       dataIndex: "quotation_details_tax_amount",
//       key: "quotation_details_tax_amount",

//       render: (data, index) => {
//         console.log("index is :", index);
//         return (
//           <div className="d-flex justify-content-center align-items-center tborder ">
//             <Form.Item
//               name={[
//                 "quotation_details",
//                 index.key,
//                 "quotation_details_tax_amount",
//               ]}
//               // rules={[{ required: true, message: 'Please input the name' }]}
//             >
//               <Input_Number
//                 className="text_right"
//                 // value={index.taxamount}
//                 onChange={(e) =>
//                   handleInputchange1(
//                     e,
//                     index.key,
//                     "quotation_details_tax_amount"
//                   )
//                 }
//                 align="right"
//                 // step={0.01}
//                 min={0}
//                 precision={2}
//                 controlls={false}
//               />
//             </Form.Item>
//           </div>
//         );
//       },

//       align: "right",
//     },
//     {
//       title: "TOTAL AMOUNT",
//       dataIndex: "quotation_details_total",
//       key: "quotation_details_total",

//       render: (data, index) => {
//         console.log("index is :", index);
//         return (
//           <div className="d-flex justify-content-center align-items-center tborder ">
//             <Form.Item
//               name={["quotation_details", index.key, "quotation_details_total"]}
//               // rules={[{ required: true, message: 'Please input the name' }]}
//             >
//               <Input_Number
//                 className="text_right"
//                 // value={    index.totalamount=(index.cost + index.taxamount)
//                 // }
//                 value={
//                   index.quotation_details_cost +
//                   index.quotation_details_tax_amount
//                 }
//                 onChange={(e) =>
//                   handleInputChange2(e, index, "quotation_details_total")
//                 }
//                 align="right"
//                 // step={0.01}
//                 min={0}
//                 precision={2}
//                 controlls={false}
//                 onKeyDown={(e) => handleEnter(e, index.key)}
//               />
//             </Form.Item>
//           </div>
//         );
//       },

//       align: "right",
//     },
//   ];
// const fixedColumns = [
//     {
//       title: 'Total',
//       dataIndex: 'name',
//       fixed: true,
//       width: 100,
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//     },
//   ];
//   const fixedData = [];
//   for (let i = 0; i < 20; i += 1) {
//     fixedData.push({
//       key: i,
//       name: ['Light', 'Bamboo', 'Little'][i % 3],
//       description: 'Everything that has a beginning, has an end.',
//     });
//   }
  

const columns = [
{
    
        title: 'Actions',
        dataIndex: '',
        key: '',
        width:300,
        // className:"firstrow",
        children: [
            {
    title: "",
          dataIndex: "action",
          key: "action",
          className: "drag-visible",
        //   className:"actions",
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
        //   className:"actions",
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
    ]},
    
    {
      title: '',
      dataIndex: '',
      key: '',
      width:300,
      className:"firstrow",
      children: [
        {
          title: 'Tasks',
          dataIndex: 'tasks',
          key: 'tasks',
          width: 150,
          align:"center",
          className:"firstrow",
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
                          rules={[{ required: true, message: 'Please select a task' }]}
                        >
                          <SelectBox
                            allowClear
                            showSearch
                            optionFilterProp="children"
                           
                            className="selectwidthexp mb-2"
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
        //   sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Agent',
          dataIndex: 'agent',
          key: 'agent',
          width: 150,
          align:"center",
          className:"firstrow",
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
                  rules={[{ required: true, message: 'Please select a task' }]}
                >
                  <SelectBox
                    allowClear
                    showSearch
                    optionFilterProp="children"
                   
                    className="selectwidthexp mb-2"
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
//   sorter: (a, b) => a.age - b.age,
},
        
      ],
    },
    {
      title: 'Cost',
      width:200,
      align:"center",
      className:"secondrow",
      children: [
        {
          title: 'Currency',
          dataIndex: 'currency',
          key: 'currency',
          width: 60,
          align:"center",
          className:"secondrow",
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
                  rules={[{ required: true, message: 'Please select a task' }]}
                >
                  <SelectBox
                    allowClear
                    showSearch
                    optionFilterProp="children"
                   
                    className="selectwidthexp mb-2"
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
//   sorter: (a, b) => a.age - b.age,

        },
        {
          title: 'Exchange',
          dataIndex: 'exchange',
          key: 'exchange',
          width: 60,
          align:"center",
          className:"secondrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={["quotation_details", index.key, "quotation_details_cost"]}
                  rules={[{ required: true, message: 'Required' }]}
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
            title: 'Amount Fx',
            dataIndex: 'amountfx',
            key: 'amountfx',
            width: 100,
          //   width: 80,
          //   fixed: 'right',
          align:"center",
          className:"secondrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={["quotation_details", index.key, "quotation_details_cost"]}
                  rules={[{ required: true, message: 'Required' }]}
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
              title: 'Amount Lx',
              dataIndex: 'amountlx',
              key: 'amountlx',
              width: 100,
              align:"center",
              className:"secondrow",
              render: (data, index) => {
                console.log("index is :", index);
                return (
                  <div className="d-flex justify-content-center align-items-center tborder ">
                    <Form.Item
                      name={["quotation_details", index.key, "quotation_details_cost"]}
                      rules={[{ required: true, message: 'Required' }]}
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
                        // step={0.01}
                        min={0}
                        precision={2}
                        controlls={false}
                      />
                    </Form.Item>
                  </div>
                );
              },
              // width: 80,
            //   fixed: 'right',
            },
      ],
    },
    {
        title: 'Expense',
        width:200,
        align:"center",
        className:"thirdrow",
        children: [
          {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            width: 60,
            align:"center",
            className:"thirdrow",
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
                      rules={[{ required: true, message: 'Please select a task' }]}
                    >
                      <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                       
                        className="selectwidthexp mb-2"
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
    //   sorter: (a, b) => a.age - b.age,
    },
          
          {
            title: 'Exchange',
            dataIndex: 'exchange',
            key: 'exchange',
            width: 60,
            align:"center",
            className:"thirdrow",
             render: (data, index) => {
                        console.log("index is :", index);
                        return (
                          <div className="d-flex justify-content-center align-items-center tborder ">
                            <Form.Item
                              name={["quotation_details", index.key, "quotation_details_cost"]}
                              rules={[{ required: true, message: 'Required' }]}
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
              title: 'Amount Fx',
              dataIndex: 'amountfx',
              key: 'amountfx',
              width: 100,
              align:"center",
              className:"thirdrow",
              render: (data, index) => {
                console.log("index is :", index);
                return (
                  <div className="d-flex justify-content-center align-items-center tborder ">
                    <Form.Item
                      name={["quotation_details", index.key, "quotation_details_cost"]}
                      rules={[{ required: true, message: 'Required' }]}
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
            {
                title: 'Amount Lx',
                dataIndex: 'amountlx',
                key: 'amountlx',
                width: 100,
                align:"center",
                className:"thirdrow",
                render: (data, index) => {
                    console.log("index is :", index);
                    return (
                      <div className="d-flex justify-content-center align-items-center tborder ">
                        <Form.Item
                          name={["quotation_details", index.key, "quotation_details_cost"]}
                          rules={[{ required: true, message: 'Required' }]}
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
      {
        title: 'Invoiceable',
        dataIndex: 'invoicable',
        key: 'invoicable',
        width: 80,
        align:"center",
        className:"fourthrow",
        render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={["quotation_details", index.key, "quotation_details_cost"]}
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Checkbox onChange={onChange}
                   onKeyDown={(e) => handleEnter(e, index.key)}
                  ></Checkbox>

                </Form.Item>
              </div>
            );
          },
        
        // fixed: 'right',
      },
  ];

  const [total, setTotal] = useState(0);
  const [leadId, setLeadId] = useState('');

  console.log("Selected lead id is " ,leadId)
  const handleLeadId = leadId => {
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
  const [selectedOption, setSelectedOption] = useState('');
  const [oppnew, setOppnew] = useState([]);
  console.log("Opportunities are :::", oppnew);

  const [leadIdEnq, setLeadIdEnq] = useState('');

  console.log("Selected  enquiry lead id is " ,leadIdEnq)
  const handleLeadIdEnq = leadIdenq => {
    addForm.setFieldValue("consignee",leadIdenq);
    setLeadIdEnq(leadIdenq);
  };
  // const handleFirstDropdownChange = (event) => {
  //   setSelectedOption(event);
  // };

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
            handleLeadIdEnq(item.lead_id);
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
        setAllLocations(temp);
      });
    } catch (err) {
      console.log("error while getting the locations: ", err);
    }
  };

  useEffect(() => {
    getallunits();
    getAllLocations();
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
  }, [numOfItems, pageofIndex]);



//   const [errornw, setErrornw] = useState(false);

// const validateDate = (selectedDate) => {
//   if (!selectedDate) {
//     setErrornw(true);
//     return;
//   }
//   setErrornw(false);
// };
const [qno,setQno]=useState(Date.now());
  const [filenew, setFilenew] = useState();
  console.log("file", filenew);
  const OnSubmit = (data) => {
    console.log("submitting data", data);
    const data11 = "noufal12343221";
    
    const date1 = moment(data.qdate).format("YYYY-MM-DD");
    const date2 = moment(data.vdate).format("YYYY-MM-DD");
    const docfile = data?.new?.file?.originFileObj;
    const formData = new FormData();
    formData.append("quotation_no", qno);
    formData.append("quotation_enquiry", data.eno);
    formData.append("quotation_date", date1);
    formData.append("quotation_validity", date2);
    formData.append("quotation_consignee", data.consignee);
    formData.append("quotation_shipper", data.shipper);
    formData.append("quotation_freight_type", data.freighttype);
    formData.append("quotation_cargo_type", data.cargotype);
    formData.append("quotation_carrier", data.carrier);
    formData.append("quotation_mode", data.mode);
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
                OnSubmit(value);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="container mb-4">
                <div className="row">
                  <div className="row mt-3 ">
                    
                    {/* <div className="col-xl-3 col-sm-6 mt-2">
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
                    </div> */}
  {/* <div className=" row mt-3"> */}
  <div className="col-6 d-flex">
          <div className="col-sm-4 d-flex">
            <div className="col-4">Job No</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="">JAFE-00001</p>
            </div>
          </div>

          <div className="col-sm-4 d-flex mx-3">
            <div className="col-4">Job Date</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="">01-02-2023</p>
            </div>
          </div>

          <div className="col-sm-4 d-flex">
            <div className="col-6">Quotation No</div>
            <div className="col-1">:</div>

            <div className="col-5">
              <p className="">
                QAFE-0001
              </p>
            </div>
          </div>
</div>
<div className="row">
 <div className="col-6 d-flex">

          <div className="col-sm-4 d-flex">
            <div className="col-sm-5">Consignee</div>
            <div className="col-sm-1">:</div>

            <div className="col-sm-6">
              <p className="">Test Data</p>
            </div>
          </div>

          <div className="col-sm-4 d-flex mx-4">
            <div className="col-sm-4">Shipper</div>
            <div className="col-sm-1">:</div>

            <div className="col-sm-7">
              <p className="">Test Shipper</p>
            </div>
          </div>

          <div className="col-sm-4 d-flex">
            <div className="col-sm-6">AWB/BL No</div>
            <div className="col-sm-1">:</div>

            <div className="col-sm-6">
              <p className="">176-123234</p>
            </div>
          </div>
          </div>
          </div>
          {/* </div> */}


                  </div>
                </div>
              </div>
              {/* <div className="row justify-content-center">
             
              </div> */}

              <div className="row">
                <div className="datatable">
                  <TableData custom_table_css="task_expense_table"
                    data={tableData}
                    columns={columns}
                    rowKey={(record) => record.key}
                    footer={() => 'Footer'}
                   
                  />
                  


                </div>
              </div>
              <div className="d-flex justify-content-end mt-4 mx-5">
                {/* <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-2">
                  <p style={{ fontWeight: 500 }}>Grand Total</p>
                </div>

                <div className="col-lg-2 col-sm-2 col-xs-2">
                  <Form.Item name="grandtotal">
                    <Input_Number
                      className="text_right"
                      value={total}
                      fontWeight={1000}
                      // onChange={handleChange}
                      align="right"
                      // step={0.01}
                      min={0}
                      precision={2}
                      controlls={false}
                    />
                  </Form.Item>
                </div> */}
              </div>
              <div className="d-flex justify-content-center my-4">
                <div className="col-lg-1 ">
                  <Button type="submit" className="qtn_save" btnType="save">
                    Save
                  </Button>
                </div>
                {/* <div className="col-lg-1 ">
                  <Button className="qtn_save" btnType="save">
                    Cancel
                  </Button>
                </div> */}
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
