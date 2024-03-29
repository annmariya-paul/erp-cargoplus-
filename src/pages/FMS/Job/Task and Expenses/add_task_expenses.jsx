import "../../Job/job.scss";
import React, { useState, useEffect } from "react";
import { GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";
import { Checkbox, Input, Select, Tooltip } from "antd";
import axios from "axios";
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
import { ROUTES } from "../../../../routes";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

export default function Taskexpenses() {
  const { id } = useParams();
  console.log("id :::::", id);
  const [successPopup, setSuccessPopup] = useState(false);
  const [alljobs, setAllJobs] = useState();
  const [addForm] = Form.useForm();
  const [services, setServices] = useState([]);
  const [isService, setIsService] = useState();
  const [currencyDefault, setCurrencyDefault] = useState();
  const [defaultCurrencydata, setDefaultCurrencyData] = useState();
  const [currencyRates, setCurrencyRates] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [iscostAmount, setIsCostAmount] = useState(false);
  const [isExpenseAmount, setIsExpenseAmount] = useState(false);
  const [costAmount, setCostAmount] = useState();
  const [currentKey, setCurrentKey] = useState();

  console.log("Servicesss are :::", services);

  const dataSource = [
    {
      key: 1,
      job_task_expense_task_id: "",
      job_task_expense_taxgroup_id: "",
      job_task_expense_tax_perc: "",
      job_task_expense_agent_id: "",
      job_task_expense_cost_amountfx: "",
      job_task_expense_cost_taxfx: "",
      job_task_expense_cost_subtotalfx: "",
      job_task_expense_exp_curr: defaultCurrencydata,
      job_task_expense_exp_exch: currencyRates,
      job_task_expense_exp_amountfx: "",
      job_task_expense_exp_amountlx: "",
      // job_task_expense_id: "",
      job_task_expense_invoiceable: 0,
    },
  ];

  const [tableData, setTableData] = useState(dataSource);
  const [newGrandTotal, setNewGrandTotal] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.LIST_JOB);
      }, time);
    }
  };
  const getIndexInParent = (el) =>
    Array.from(el.parentNode.children).indexOf(el);

  // const handleEnter = (e) => {
  //   console.log("Hello");
  //   console.log("Key ::::::: ", e.key);
  //   if (e.key === "Enter" || e.key === "Tab") {
  //     setTableData([
  //       ...tableData,
  //       {
  //         // key: `${tableData.length + 1}`,
  //         key: uuidv4(),

  //         job_task_expense_task_id: "",
  //         job_task_expense_taxtype_id: "",
  //         job_task_expense_tax_perc: "",
  //         job_task_expense_agent_id: "",
  //         job_task_expense_cost_amountfx: "",
  //         job_task_expense_cost_taxfx:"",
  //         job_task_expense_cost_subtotalfx:"",
  //         job_task_expense_exp_curr:"",
  //         job_task_expense_exp_exch:"",
  //         job_task_expense_exp_amountfx:"",
  //         job_task_expense_exp_amountlx:"",
  //       },
  //     ]);
  //   }
  // };

  const [amount, setAmount] = useState(0);
  const handleChange = (value) => {
    setAmount(value);
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
    console.log("Deleted id", key);
    const newData = tableData?.filter((item) => item?.key !== key);
    setTableData(newData);
    const newData1 = sampletable?.filter((item) => item?.key !== key);
    if (newData1.length > 0) {
      setSampletable(newData1);
    }
    let grandTotal = 0;
    for (let item of newData) {
      grandTotal += item["quotation_details_total"];
    }
    setNewGrandTotal(grandTotal);
    if (newData1 <= 0) {
      addForm.setFieldsValue({ Job_quotation_details: newData1 });
    }
    addForm.setFieldsValue({ grandtotal: grandTotal });
  };
  const [taxGroup, setTaxGroup] = useState();

  const handleInputChange = (e, key, col, tx) => {
    console.log("gai guys", e, key, tx);
    let totalamount2 = 0;
    let a = 0;
    if (e === null) {
      e = 0;
    }
    let oldvalues = addForm.getFieldsValue();
    let { Job_quotation_details } = oldvalues;
    let usevalue = Job_quotation_details[key];
    console.log("The Tax Group id", a);
    a = usevalue["job_task_expense_taxgroup_id"];
    setTaxGroup(a);
    if (tx && e !== null) {
      totalamount2 = e * currencyRates;

      let existingValues = addForm.getFieldsValue();
      console.log("existing form", existingValues);
      let { Job_quotation_details } = existingValues;
      let assignValues = Job_quotation_details[key];

      console.log(
        "Tax Groyup id",
        assignValues["job_task_expense_taxgroup_id"]
      );

      assignValues["job_task_expense_exp_amountfx"] = e;

      let totalAmount =
        assignValues["job_task_expense_exp_exch"] *
        assignValues["job_task_expense_exp_amountfx"];

      assignValues["job_task_expense_exp_amountlx"] = totalamount2;
      console.log("quation deatils", Job_quotation_details);
      addForm.setFieldsValue({ Job_quotation_details });
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
              job_task_expense_exp_amountfx: e,
              job_task_expense_exp_amountlx: totalamount2,
            };
          }
          return item;
        })
      );
      setSampletable(
        sampletable.map((item) => {
          if (item.key === key) {
            return {
              ...item,
              job_task_expense_exp_amountfx: e,
              job_task_expense_exp_amountlx: totalamount2,
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
    } else {
      setTableData(
        tableData.map((item) => {
          if (item.key == key) {
            return { ...item, [col]: e };
          }
          return item;
        })
      );
      setSampletable(
        sampletable.map((item) => {
          if (item.key == key) {
            return { ...item, [col]: e };
          }
          return item;
        })
      );
    }
    // }
    // });
  };

  const handleInputChange2 = (e, key, col) => {
    console.log("Tax amount to be clacilated", e, key, col);
    let taxpercentage = "";
    taxgroups.map((item, index) => {
      let tax_percnt = 0;
      let totalTax_percent = 0;
      console.log("condition:false", e);

      if (col && e === item?.tax_group_id) {
        console.log("condition:true", e);
        item?.fms_v1_tax_types?.forEach((taxtype, typeindex) => {
          tax_percnt = taxtype?.tax_type_percentage;
          console.log("tax type percentage", taxtype?.tax_type_percentage);
        });
        totalTax_percent += tax_percnt;
        console.log("Total tax percentage", totalTax_percent);
        let existingValues = addForm.getFieldsValue();
        let { Job_quotation_details } = existingValues;
        let assignValues = Job_quotation_details[key];
        assignValues["job_task_expense_taxgroup_id"] = item.tax_group_id;
        assignValues["job_task_expense_tax_perc"] = totalTax_percent;
        taxpercentage = totalTax_percent;
        let taxAmount =
          (assignValues["job_task_expense_cost_amountfx"] * totalTax_percent) /
          100;
        assignValues["job_task_expense_cost_taxfx"] = taxAmount;
        let totalAmount =
          assignValues["job_task_expense_cost_amountfx"] +
          assignValues["job_task_expense_cost_taxfx"];
        assignValues["job_task_expense_cost_subtotalfx"] = totalAmount;
        console.log("totalAmount", totalAmount);
        addForm.setFieldsValue({ Job_quotation_details });

        setTableData(
          tableData.map((item) => {
            if (item.key === key) {
              return {
                ...item,
                job_task_expense_taxgroup_id: e,
                job_task_expense_cost_taxfx: taxAmount,
                job_task_expense_tax_perc: taxpercentage,
                job_task_expense_cost_subtotalfx: totalAmount,
              };
            }
            return item;
          })
        );
        setSampletable(
          sampletable.map((item) => {
            if (item.key === key) {
              return {
                ...item,
                job_task_expense_taxgroup_id: e,
                job_task_expense_tax_perc: taxpercentage,
                job_task_expense_cost_taxfx: taxAmount,
                job_task_expense_cost_subtotalfx: totalAmount,
              };
            }
            return item;
          })
        );
      }
    });
  };

  const handleInputchange1 = (e, key, col, check) => {
    console.log("Teschinal error", e, key, col);
    setTableData(
      tableData.map((item) => {
        if (item.key == key) {
          return { ...item, [col]: e };
        }
        return item;
      })
    );
    setSampletable(
      sampletable.map((item) => {
        if (item.key == key) {
          return { ...item, [col]: e };
        }
        return item;
      })
    );
    if (!check && e && key && col) {
      console.log("hai everybody", e, col);
      allservices.map((item, index) => {
        if (e === item.service_id) {
          setTaxGroup(item.service_taxgroup);
          let existingValues = addForm.getFieldsValue();
          let { Job_quotation_details } = existingValues;
          let assignValues = Job_quotation_details[key];
          assignValues["job_task_expense_taxgroup_id"] = item?.service_taxgroup;
          // assignValues["job_task_expense_tax_perc"] =
          //   item?.fms_v1_tax_types?.tax_type_percentage;

          // let taxAmount =
          //   (assignValues["job_task_expense_cost_amountfx"] *
          //     item?.fms_v1_tax_types?.tax_type_percentage) /
          //   100;
          // assignValues["job_task_expense_cost_taxfx"] = taxAmount;
          // let totalAmount =
          //   assignValues["job_task_expense_cost_amountfx"] +
          //   assignValues["job_task_expense_cost_taxfx"];
          // assignValues["job_task_expense_cost_subtotalfx"] = totalAmount;
          addForm.setFieldsValue({ Job_quotation_details });
          // setTableData(
          //   tableData.map((item) => {
          //     if (item.key == key) {
          //       return {
          //         ...item,
          //         job_task_expense_cost_taxfx: ,
          //         job_task_expense_taxtype_id: 3,
          //         job_task_expense_tax_perc: 3,
          //       };
          //     }
          //     return item;
          //   })
          // );
          // setSampletable(
          //   sampletable.map((item) => {
          //     if (item.key == key) {
          //       return {
          //         ...item,
          //         job_task_expense_cost_taxfx: 123,
          //         job_task_expense_taxtype_id: 3,
          //         job_task_expense_tax_perc: 3,
          //       };
          //     }
          //     return item;
          //   })
          // );
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
  const [currencydata, setCurrencydata] = useState();

  const getallcurrency = async () => {
    try {
      const allcurrency = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/currency`
      );
      console.log("Getting all currency : ", allcurrency.data.data);
      setCurrencydata(allcurrency.data.data);
      let arr = [];
      allcurrency?.data?.data?.forEach((item, index) => {
        if (item?.currency_is_default === 1) {
          arr = item?.currency_code;
          setCurrencyDefault(arr);
          setDefaultCurrencyData(item?.currency_id);
          getCurrencyRate(item?.currency_id, index);
        }
      });
    } catch (err) {
      console.log("Error in getting currency : ", err);
    }
  };

  useEffect(() => {
    getallcurrency();
  }, []);

  console.log("ratesssss", currencyRates);
  let b;
  const getCurrencyRate = (data, key) => {
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
        let c = 1 / a;
        setCurrencyRates(c);
        let existingvalues = addForm.getFieldsValue();
        let { Job_quotation_details } = existingvalues;
        let assignValues = Job_quotation_details[key];
        assignValues["job_task_expense_exp_exch"] = c;
        addForm.setFieldsValue({ Job_quotation_details });
        console.log("form data s......", Job_quotation_details);

        addForm.setFieldValue("job_task_expense_exp_exch", c);
        setTableData(
          tableData.map((item, index) => {
            if (item.key === key) {
              return {
                ...item,
                job_task_expense_exp_exch: c,
                job_task_expense_exp_curr: data,
              };
            }
            return item;
          })
        );
        setSampletable(
          sampletable.map((item, index) => {
            if (item.key === key) {
              return {
                ...item,
                job_task_expense_exp_exch: c,
                job_task_expense_exp_curr: data,
              };
            }
            return item;
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEnter = (e) => {
    // setCurrentKey(currentKey + 1);
    console.log("Hello");
    console.log("Key ::::::: ", e.key);

    if (e.key === "Enter" || e.key === "Tab") {
      setTableData([
        ...tableData,
        {
          key: tableData.length + 1,
          job_task_expense_task_id: "",
          job_task_expense_taxgroup_id: "",
          job_task_expense_tax_perc: "",
          job_task_expense_agent_id: "",
          job_task_expense_cost_amountfx: "",
          job_task_expense_cost_taxfx: "",
          job_task_expense_cost_subtotalfx: "",
          job_task_expense_exp_curr: defaultCurrencydata,
          job_task_expense_exp_exch: currencyRates,
          job_task_expense_exp_amountfx: "",
          job_task_expense_exp_amountlx: "",
          job_task_expense_invoiceable: 0,
        },
      ]);
      setSampletable([
        ...sampletable,
        {
          key: sampletable.length + 1,
          job_task_expense_task_id: "",
          job_task_expense_taxgroup_id: "",
          job_task_expense_tax_perc: "",
          job_task_expense_agent_id: "",
          job_task_expense_cost_amountfx: "",
          job_task_expense_cost_taxfx: "",
          job_task_expense_cost_subtotalfx: "",
          job_task_expense_exp_curr: defaultCurrencydata,
          job_task_expense_exp_exch: currencyRates,
          job_task_expense_exp_amountfx: "",
          job_task_expense_exp_amountlx: "",
          job_task_expense_invoiceable: 0,
        },
      ]);

      setCostAmount();
      setExpenseAmount();

      handleAmt(e, currentKey, "jfhiefiefei");

      // handlecurrency(e, tableData.length + 1);
    }
    console.log("tabledata", tableData);
    // let sum = 0;
    // tableData.forEach((item) => {
    //   sum += item.quotation_details_cost + item.quotation_details_tax_amount;
    // });
    // console.log("sum", sum);
    // setTotal(sum);
  };

  console.log("all jobs : ", alljobs);
  const [qtnno, setQtnno] = useState();
  const [tabledata, setTabledata] = useState();
  const [grandtotal, setGrandTotal] = useState();
  const [detailstable, setAlldetailstable] = useState();
  console.log("details", detailstable);
  console.log("qtntable: ", tabledata);
  console.log("qtnno: ", qtnno);
  console.log("grandtotal: ", grandtotal);
  const navigate = useNavigate();
  const [servicename, setService] = useState();
  console.log("service name ", servicename);
  const [tax, setTax] = useState();
  console.log("tax name:", tax);
  // console.log("tax type ::123", taxType);
  const [sampletable, setSampletable] = useState(dataSource);
  const [currency, setCurrency] = useState();
  const [exchangedata, setExchangeData] = useState();
  const [taxgroups, setAlltaxGroup] = useState();
  const [isChecked, setIschecked] = useState(0);
  const [allExpenseData, setAllExpenseData] = useState();
  const [AllQuotationNo, setAllQuotationNo] = useState();
  console.log("All expense data", allExpenseData);

  const getSingleJob = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job/${id}`)
      .then((res) => {
        console.log("response of job", res);
        if (res.data.success) {
          console.log("Success of job", res.data.data);
          let newdatas = [];
          let servdata = [];

          res.data.data.fms_v1_quotation_jobs.forEach((item, index) => {
            newdatas.push(item.fms_v1_quotation.quotation_no);
            setQtnno(newdatas);
          });
          console.log("temperary", servdata);
          // setTax(servdata);
          setAllExpenseData(res?.data?.data?.fms_v1_job_task_expenses);
          setAllQuotationNo(res?.data?.data?.fms_v1_quotation_jobs);

          // res?.data?.data?.fms_v1_job_task_expenses?.forEach((item, index) => {
          //   console.log("Set for diplaying data", item);
          //   servdata?.push({
          //     job_task_expense_task_id: item?.crm_v1_services.service_id,
          //     job_task_expense_cost_amountfx:
          //       item?.job_task_expense_cost_amountfx,
          //     job_task_expense_taxgroup_id:
          //       item?.fms_v1_tax_groups?.tax_group_id,
          //     job_task_expense_taxgroup_name:
          //       item?.fms_v1_tax_taxgroups?.tax_group_name,
          //     job_task_expense_tax_perc:
          //       item.fms_v1_tax_types.tax_type_percentage,
          //     job_task_expense_cost_taxfx: item.job_task_expense_cost_taxfx,
          //     job_task_expense_cost_subtotalfx:
          //       item.job_task_expense_cost_subtotalfx,
          //     job_task_expense_agent_id: item.job_task_expense_agent_id,
          //     job_task_expense_exp_amountfx: item.job_task_expense_exp_amountfx,
          //     job_task_expense_exp_amountlx: item.job_task_expense_exp_amountlx,
          //     job_task_expense_exp_curr: item.job_task_expense_exp_curr,
          //     job_task_expense_exp_exch: item.job_task_expense_exp_exch,
          //     job_task_expense_id: item.job_task_expense_id,
          //     job_task_expense_invoiceable: item.job_task_expense_invoiceable,
          //     job_task_expense_job_id: item.job_task_expense_job_id,
          //   });
          // });

          // setGrandTotal(item.fms_v1_quotation.quotation_grand_total);

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
            job_consignee1: res.data.data.crm_v1_customer.customer_name,
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
            job_origin_id1:
              res.data.data
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
    let newdatas = [];
    let servdata = [];
    allExpenseData?.forEach((item, index) => {
      console.log("Set for diplaying data", item);
      servdata?.push({
        job_task_expense_task_id: item?.crm_v1_services.service_id,
        job_task_expense_cost_amountfx: item?.job_task_expense_cost_amountfx,
        job_task_expense_taxgroup_id: item?.fms_v1_tax_groups?.tax_group_id,
        job_task_expense_tax_perc: item?.job_task_expense_tax_perc,
        // job_task_expense_tax_perc: item.fms_v1_tax_types.tax_type_percentage,
        job_task_expense_cost_taxfx: item.job_task_expense_cost_taxfx,
        job_task_expense_cost_subtotalfx: item.job_task_expense_cost_subtotalfx,
        job_task_expense_agent_id: item.job_task_expense_agent_id,
        job_task_expense_exp_amountfx: item.job_task_expense_exp_amountfx,
        job_task_expense_exp_amountlx: item.job_task_expense_exp_amountlx,
        job_task_expense_exp_curr: item.job_task_expense_exp_curr,
        job_task_expense_exp_exch: item.job_task_expense_exp_exch,
        job_task_expense_id: item.job_task_expense_id,
        job_task_expense_invoiceable: item.job_task_expense_invoiceable,
        job_task_expense_job_id: item.job_task_expense_job_id,
      });
    });
    setTax(servdata);
    AllQuotationNo?.forEach((item, index) => {
      newdatas.push(item?.fms_v1_quotation?.quotation_no);
      setQtnno(newdatas);
    });
  }, [allExpenseData]);

  useEffect(() => {
    let Job_quotation_details = [];

    tax &&
      tax?.map((item, index) => {
        let a = 0;
        let b = 0;
        item.job_task_expense_cost_amountfx &&
          (a = item.job_task_expense_cost_amountfx);
        item.job_task_expense_exp_amountfx &&
          (b = item.job_task_expense_exp_amountfx);
        setIsService(item.job_task_expense_task_id);
        Job_quotation_details.push({
          key: index,
          job_task_expense_task_id: item.job_task_expense_task_id,
          job_task_expense_tax_perc: item.job_task_expense_tax_perc,
          job_task_expense_taxgroup_id: item.job_task_expense_taxgroup_id,
          job_task_expense_cost_amountfx: a,
          job_task_expense_cost_taxfx: item.job_task_expense_cost_taxfx,
          job_task_expense_cost_subtotalfx:
            item.job_task_expense_cost_subtotalfx,
          job_task_expense_exp_curr: defaultCurrencydata,
          job_task_expense_exp_exch: currencyRates,
          job_task_expense_exp_amountfx: b,
          job_task_expense_exp_amountlx: item.job_task_expense_exp_amountlx,
          job_task_expense_agent_id: item.job_task_expense_agent_id,
          job_task_expense_invoiceable: item.job_task_expense_invoiceable,
        });
      });
    console.log("mainItem", tableData);
    if (Job_quotation_details && Job_quotation_details.length > 0) {
      setTableData([...Job_quotation_details]);
      addForm.setFieldsValue({ Job_quotation_details });
      setSampletable([...Job_quotation_details]);
    } else {
      setTableData([...dataSource]);
      addForm.setFieldsValue({ dataSource });
      setSampletable([...dataSource]);
    }
  }, [tax, defaultCurrencydata, currencyRates]);

  console.log("is deafult is ", defaultCurrencydata);

  console.log("table inside data", tableData);
  useEffect(() => {
    if (id) {
      getSingleJob();
    }
  }, [id]);
  const getAllservices = () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/service/Minimal`)
      .then((res) => {
        console.log("all services is ", res.data.data);
        if (res?.data?.success) {
          console.log("All services dataawww", res?.data?.data);
          setAllservices(res?.data?.data);
          setServices(res?.data?.data);
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
              service_taxtype: item?.service_taxtype,
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

  const GetAllTaxGroups = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/tax_group`)
      .then((res) => {
        console.log("Response");
        if (res.data.success) {
          console.log("Success");
          setAlltaxGroup(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const getAllTaxtype = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/tax-types/Minimal`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of tax type", res.data.data);
          // setAlltaxtypes(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllservices();
    getAllTaxtype();
    GetAllTaxGroups();
    // handleAmt();
  }, [numOfItems, pageofIndex]);

  const tooltipcolor = ["#6c6d6f"];

  // useEffect(() => {
  //   tableData.map((item, index) => {
  //     if (
  //       item.job_task_expense_cost_amountfx === null ||
  //       item.job_task_expense_exp_amountfx === null
  //     ) {
  //       setIsCostAmount(true);
  //       setIsExpenseAmount(true);
  //     } else if (item.job_task_expense_cost_amountfx !== null) {
  //       setIsExpenseAmount(false);
  //     } else if (item.job_task_expense_exp_amountfx !== null) {
  //       setIsCostAmount(false);
  //     }
  //   });
  //   // console.log("euwdu", isExpenseAmount, iscostAmount);
  // }, [isExpenseAmount, iscostAmount]);

  useEffect(() => {
    console.log("constAmt", costAmount, expenseAmount);
    if (costAmount || expenseAmount) {
      setIsExpenseAmount(false);
      setIsCostAmount(false);
    } else {
      setIsExpenseAmount(true);
      setIsCostAmount(true);
    }
    handleAmt(1, 2, "");
  }, [costAmount, expenseAmount]);

  const handleAmt = (e, key, col) => {
    let values = addForm.getFieldsValue();
    let { Job_quotation_details } = values;
    console.log("job quotations lte", Job_quotation_details);
    let cost = 0;
    let assignValues = Job_quotation_details[key];
    if (assignValues) {
      costAmount &&
        !assignValues["job_task_expense_exp_amountfx"] &&
        !expenseAmount &&
        (assignValues["job_task_expense_exp_amountfx"] = cost);

      !costAmount &&
        expenseAmount &&
        !assignValues["job_task_expense_cost_amountfx"] &&
        (assignValues["job_task_expense_cost_amountfx"] = cost);
    }
    // assignValues && (assignValues["job_task_expense_cost_amountfx"] = cost);
    addForm.setFieldsValue({ Job_quotation_details });
    if (costAmount || expenseAmount) {
      setIsExpenseAmount(false);
      setIsCostAmount(false);
    } else {
      setIsExpenseAmount(true);
      setIsCostAmount(true);
    }
    // if (e && col && key) {
    console.log("keyOfTable", e, key);
    tableData.map((item, index) => {
      console.log("itemOfKey", item.key);
      console.log("tableLEngth", tableData?.length);
      // if (item.key == tableData?.length - 1) {
      //   setCurrentKey(key);
      // }
    });
    // }
  };

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
            <Tooltip title="Click and Drag to move" color={tooltipcolor}>
              <div className="deleteIcon m-0 p-0">
                <DragOutlined className="draggable" type="swap" />
              </div>{" "}
            </Tooltip>
            <Tooltip title="Delete Row" color={tooltipcolor}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <div className="deleteIcon m-0">
                  <FaTrash />
                </div>
              </Popconfirm>{" "}
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: "Tasks",
      dataIndex: "job_task_expense_task_id",
      key: "job_task_expense_task_id",
      width: "10%",
      className: "firstrow req_font",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={[
                "Job_quotation_details",
                index.key,
                "job_task_expense_task_id",
              ]}
              rules={[{ required: true, message: "Please select" }]}
            >
              <Select
                style={{ minWidth: "140px" }}
                bordered={false}
                showArrow={false}
                allowClear
                showSearch
                optionFilterProp="children"
                width={30}
                className="selectwidthexp mb-2"
                value={index.job_task_expense_task_id}
                onChange={(e) => {
                  handleInputchange1(e, index.key, "job_task_expense_task_id");
                  setIsService(e);
                  console.log("servicess11123", e);
                }}
                onBlur={() => {
                  // if (isService) {
                  handleInputChange2(
                    taxGroup,
                    index.key,
                    "job_task_expense_cost_taxfx"
                  );
                  // }
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
      title: "Tax Type",
      dataIndex: "job_task_expense_taxgroup_id",
      key: "job_task_expense_taxgroup_id",
      width: "3%",
      className: "firstrow",
      render: (data, index) => {
        console.log("index is :", index);

        return (
          <div className="d-flex justify-content-center align-items-center tborder ">
            <Form.Item
              name={[
                "Job_quotation_details",
                index.key,
                "job_task_expense_taxgroup_id",
              ]}
              // rules={[{ required: true, message: "Required" }]}
            >
              <Select
                style={{ minWidth: "60px" }}
                bordered={false}
                showArrow={false}
                allowClear
                showSearch
                optionFilterProp="children"
                className="selectwidthexp mb-2"
                value={index.job_task_expense_taxgroup_id}
                onChange={(e) => {
                  console.log("servicess11123", e);
                  // handleInputchange1(e, index.key, "job_task_expense_task_id");
                  // handleInputChange(
                  //   e,
                  //   index.key,
                  //   "job_task_expense_taxtype_id",
                  //   "tx"
                  // );
                }}
                disabled={true}
              >
                {taxgroups &&
                  taxgroups.length > 0 &&
                  taxgroups.map((item, index) => {
                    return (
                      <Select.Option
                        key={item.tax_group_id}
                        value={item.tax_group_id}
                      >
                        {item.tax_group_name}
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
      dataIndex: "job_task_expense_tax_perc",
      key: "job_task_expense_tax_perc",
      width: "10%",
      align: "right",
      className: "firstrow",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div
            style={{ width: "57px" }}
            className="d-flex justify-content-center align-items-center tborder "
          >
            <Form.Item
              name={[
                "Job_quotation_details",
                index.key,
                "job_task_expense_tax_perc",
              ]}
              // rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber
                style={{ minWidth: "20px" }}
                bordered={false}
                className="input_bg w-100 "
                value={index.job_task_expense_tax_perc}
                // onChange={(value) => {
                //   console.log(" input numberevent ", value, index.key);
                // }}
                align="right"
                min={0}
                precision={2}
                controlls={false}
                disabled={true}
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Agent",
      dataIndex: "job_task_expense_agent_id",
      key: "job_task_expense_agent_id",
      width: "5%",
      className: "firstrow",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div
            style={{ width: "110px" }}
            className="d-flex justify-content-center align-items-center tborder "
          >
            <Form.Item
              name={[
                "Job_quotation_details",
                index.key,
                "job_task_expense_agent_id",
              ]}
              // rules={[{ required: true, message: "Required" }]}
            >
              <Select
                className="w-100"
                style={{ minWidth: "110px" }}
                bordered={false}
                showArrow={false}
                width={"1000px"}
                allowClear
                showSearch
                optionFilterProp="children"
                value={index.job_task_expense_agent_id}
                onChange={(e) => {
                  console.log("servicess11123", e);
                  // if (isService) {
                  handleInputchange1(e, index.key, "job_task_expense_agent_id");
                  // }
                }}
              >
                {agentdata &&
                  agentdata.length > 0 &&
                  agentdata.map((item, index) => {
                    return (
                      <Select.Option key={item.agent_id} value={item.agent_id}>
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
      width: "100%",
      align: "center",
      className: "secondrow",
      children: [
        {
          title: "Amount",
          dataIndex: "job_task_expense_cost_amountfx",
          key: "job_task_expense_cost_amountfx",
          width: "5%",
          align: "right",
          className: "secondrow",
          render: (data, index) => {
            console.log("index is :", index);

            return (
              <>
                <div className="d-flex justify-content-center align-items-center tborder ">
                  <Form.Item
                    name={[
                      "Job_quotation_details",
                      index.key,
                      "job_task_expense_cost_amountfx",
                    ]}
                    rules={[
                      {
                        required: isExpenseAmount,
                        message: "Required",
                      },
                    ]}
                  >
                    <InputNumber
                      bordered={false}
                      className=""
                      value={index.job_task_expense_cost_amountfx}
                      onChange={(e) => {
                        handleInputChange(
                          e,
                          index.key,
                          "job_task_expense_cost_amountfx"
                        );

                        setCostAmount(e);
                        handleAmt(e, index.key);

                        console.log(" input numberevent ", e, index.key);
                      }}
                      align="right"
                      min={0}
                      precision={2}
                      controlls={false}
                      onBlur={() => {
                        // if (isService) {
                        handleInputChange2(
                          taxGroup,
                          index.key,
                          "job_task_expense_cost_taxfx"
                        );
                        // }
                        handleAmt(
                          costAmount,
                          index.key,
                          "job_task_expense_cost_amountfx"
                        );
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  {/* {tableData?.length - 1 === index.key && iscostAmount ? (
                    <>
                      <div className="text-center">
                        <label style={{ color: "red" }}>Required</label>
                      </div>
                    </>
                  ) : (
                    ""
                  )} */}
                </div>
              </>
            );
          },
        },
        {
          title: "Tax",
          dataIndex: "job_task_expense_cost_taxfx",
          key: "job_task_expense_cost_taxfx",
          width: "5%",
          align: "right",
          className: "secondrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div
                style={{ width: "70px" }}
                className="d-flex justify-content-center align-items-center tborder "
              >
                <Form.Item
                  name={[
                    "Job_quotation_details",
                    index.key,
                    "job_task_expense_cost_taxfx",
                  ]}
                  // rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="input_bg m-0 p-0 w-100"
                    value={index.job_task_expense_cost_taxfx}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
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
        },
        {
          title: "Total",
          dataIndex: "job_task_expense_cost_subtotalfx",
          key: "job_task_expense_cost_subtotalfx",
          width: "5%",
          //   width: 80,
          //   fixed: 'right',
          align: "right",
          className: "secondrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "Job_quotation_details",
                    index.key,
                    "job_task_expense_cost_subtotalfx",
                  ]}
                  // rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="input_bg m-0 p-0"
                    value={index.job_task_expense_cost_subtotalfx}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
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
        },
      ],
    },
    {
      title: "Expense",
      width: "100%",
      align: "center",
      className: "thirdrow",
      children: [
        {
          title: "Currency",
          dataIndex: "job_task_expense_exp_curr",
          key: "job_task_expense_exp_curr",
          width: 0,
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                // name={[
                //   "Job_quotation_details",
                //   index.key,
                //   "job_task_expense_exp_curr",
                // ]}
                // rules={[{ required: true, message: "Required" }]}
                >
                  <Select
                    style={{ minWidth: "70px" }}
                    bordered={false}
                    showArrow={false}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    className="selectwidthexp mb-2"
                    value={index?.job_task_expense_exp_curr}
                    onChange={(e) => {
                      console.log("ann", e);
                      getCurrencyRate(e, index.key);
                      setCurrency(e);
                      setDefaultCurrencyData(e);
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
                            {item.currency_code}
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
          dataIndex: "job_task_expense_exp_exch",
          key: "job_task_expense_exp_exch",
          width: "5%",
          align: "right",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is : 11324", index);
            return (
              <div
                style={{ width: "70px" }}
                className="d-flex justify-content-center align-items-center tborder "
              >
                <Form.Item
                // name={[
                //   "Job_quotation_details",
                //   index.key,
                //   "job_task_expense_exp_exch",
                // ]}
                // rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    // style={{ minWidth: "70px" }}
                    bordered={false}
                    className="w-100"
                    value={index.job_task_expense_exp_exch}
                    // value={currencyRates}
                    // value={amount}
                    onChange={(e) => {
                      handleChange(e);
                      setExchangeData(e);
                      setCurrencyRates(e);
                    }}
                    // onChange={(value) => {
                    //   console.log(" input numberevent ", value, index.key);
                    // }}
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
        },
        {
          title: "Amount Fx",
          dataIndex: "job_task_expense_exp_amountfx",
          key: "job_task_expense_exp_amountfx",
          width: "10%",
          align: "right",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            let isjob_task_expense_cost_amountfx = true;
            if (index?.job_task_expense_cost_amountfx !== null && index?.key) {
              isjob_task_expense_cost_amountfx = false;
            }
            console.log("indexindex", index);
            return (
              <>
                <div className="d-flex justify-content-center align-items-center tborder ">
                  <Form.Item
                    name={[
                      "Job_quotation_details",
                      index.key,
                      "job_task_expense_exp_amountfx",
                    ]}
                    rules={[
                      {
                        required: iscostAmount ? true : false,
                        message: "Required",
                      },
                    ]}
                  >
                    <InputNumber
                      bordered={false}
                      // className="text_right"
                      value={index.job_task_expense_exp_amountfx}
                      onChange={(e) => {
                        handleInputChange(
                          e,
                          index.key,
                          "job_task_expense_exp_amountfx",
                          "tx"
                        );
                        setExpenseAmount(e);
                        handleAmt(
                          e,
                          index.key,
                          "job_task_expense_exp_amountfx"
                        );
                        console.log(" input numberevent ", e, index.key);
                      }}
                      align="right"
                      // step={0.01}
                      min={0}
                      precision={2}
                      controlls={false}
                    />
                  </Form.Item>
                </div>
                <div className="">
                  {/* {tableData?.length - 1 === index.key && isExpenseAmount ? (
                    <div className="text-center">
                      <label style={{ color: "red" }}>Required</label>
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
              </>
            );
          },
        },
        {
          title: "Amount Lx",
          dataIndex: "job_task_expense_exp_amountlx",
          key: "job_task_expense_exp_amountlx",
          width: "10%",
          align: "right",
          className: "thirdrow",
          render: (data, index) => {
            console.log("index is :", index);
            return (
              <div className="d-flex justify-content-center align-items-center tborder ">
                <Form.Item
                  name={[
                    "Job_quotation_details",
                    index.key,
                    "job_task_expense_exp_amountlx",
                  ]}
                  // rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    bordered={false}
                    className="input_bg"
                    value={index?.job_task_expense_exp_amountlx}
                    onChange={(value) => {
                      console.log(" input numberevent ", value, index.key);
                    }}
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
          //   fixed: 'right',
        },
      ],
    },
    {
      title: "Invoiceable",
      dataIndex: "checkbox",
      key: "checkbox",
      align: "center",
      width: "8px",
      render: (data, index) => {
        console.log("hai this index of atble", index);
        return (
          <div>
            <Checkbox
              // value={isChecked}
              onChange={(e) => {
                handleChecked(e, index.key);
                if (e.target.checked) {
                  handleInputchange1(
                    1,
                    index.key,
                    "job_task_expense_invoiceable",
                    1
                  );
                } else {
                  handleInputchange1(
                    0,
                    index.key,
                    "job_task_expense_invoiceable",
                    1
                  );
                }
              }}
              checked={index.job_task_expense_invoiceable == 1 ? true : false}
              onKeyDown={(e) => {
                handleEnter(e, index.key);
                handlecurrency(e, index.key);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleChecked = (e, key) => {
    console.log("isChecked", e);
    if (e.target.checked) {
      console.log("suceccss checked", e.target.checked);
      setIschecked(1);
    }
  };

  console.log("isCostAmt", iscostAmount);
  console.log("isExpAmt", isExpenseAmount);

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
        `${process.env.REACT_APP_BASE_URL}/agents/minimal`
      );
      console.log("all agentss are ::", allagent?.data?.data);
      let array = [];
      allagent?.data?.data?.forEach((item, index) => {
        array.push({
          agent_id: item.agent_id,
          agent_country: item.agent_country,
          agent_emp_id: item.crm_v1_vendors.vendor_id,
          agent_emp_name: item.crm_v1_vendors.vendor_name,
        });
      });
      setAgentdata(array);
    } catch (err) {
      console.log("error to getting all units", err);
    }
  };

  const handlecurrency = (e, key) => {
    // let existingvalues = addForm.getFieldsValue();
    // let { Job_quotation_details } = existingvalues;
    // let assignValues = Job_quotation_details[key];
    // assignValues["job_task_expense_exp_curr"] = defaultCurrencydata;
    // assignValues["job_task_expense_exp_exch"] = currencyRates;
    // addForm.setFieldsValue({ Job_quotation_details });
    // console.log("form data s......", Job_quotation_details);
    // addForm.setFieldValue("job_task_expense_exp_exch", currencyRates);
  };

  useEffect(() => {
    tableData.map((item, index) => {
      console.log("key ovf table", item?.key);
      if (defaultCurrencydata !== null) {
        let existingvalues = addForm.getFieldsValue();
        let { Job_quotation_details } = existingvalues;
        let assignValues = Job_quotation_details[item?.key];
        assignValues["job_task_expense_exp_curr"] = defaultCurrencydata;

        addForm.setFieldsValue({ Job_quotation_details });
        getCurrencyRate(defaultCurrencydata, item?.key);
      }
    });
  }, [defaultCurrencydata]);

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
  const [totalcost, setTotalCost] = useState();
  const [totalExpense, setTotalExpense] = useState();
  console.log("locations ", allLocations);

  useEffect(() => {
    let total = 0;
    let expense = 0;
    tableData.map((item, index) => {
      console.log("Test total", item);
      total += item?.job_task_expense_cost_subtotalfx;
      expense += item?.job_task_expense_exp_amountlx;
    });
    total = Number.parseFloat(total);
    expense = Number.parseFloat(expense);
    setTotalCost(total.toFixed(2));
    setTotalExpense(expense.toFixed(2));
  }, [tableData]);

  console.log("total cost ::", totalcost);

  const submitData = (data) => {
    let temp = false;
    // if (costAmount || expenseAmount) {
    //   setIsExpenseAmount(false);
    //   setIsCostAmount(false);
    // } else {
    //   setIsExpenseAmount(true);
    //   setIsCostAmount(true);
    //   temp = false;
    // }
    tableData.map((item, index) => {
      if (
        item.job_task_expense_cost_amountfx &&
        item.job_task_expense_exp_amountfx !== null
      ) {
        temp = true;
      }
    });
    console.log("costAmt", iscostAmount);
    if ((temp = true)) {
      const payload = tableData?.map((item, index) => {
        !item?.job_task_expense_cost_amountfx &&
          delete item?.job_task_expense_cost_amountfx;
        !item?.job_task_expense_cost_subtotalfx &&
          delete item?.job_task_expense_cost_subtotalfx;
        !item?.job_task_expense_exp_amountfx &&
          delete item?.job_task_expense_exp_amountfx;
        !item?.job_task_expense_exp_amountlx &&
          delete item?.job_task_expense_exp_amountlx;
        return item;
      });
      PublicFetch.post(`${CRM_BASE_URL_FMS}/job-task-expenses/${id}`, {
        job_task_expense: payload,
      })
        .then((res) => {
          console.log("Response", res);
          if (res.data.success) {
            console.log("success of submitting data", res.data.data);
            setSuccessPopup(true);
            close_modal(successPopup, 1200);
            getSingleJob();
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
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
              onFinish={(value, index) => {
                console.log("values iss", value);
                // if (costAmount && expenseAmount) {
                submitData(value);
                // setIsCostAmount(true);
                // setIsExpenseAmount(true);
                // console.log("submmiittiing by me", value, index);
                // handleAmt();
                // }
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
                        <td style={{ width: "70px" }}>{qtnno}</td>
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
                        <td style={{ width: "70px" }}>
                          {alljobs?.job_consignee1}
                        </td>

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
                        <td style={{ width: "160px" }}>
                          {alljobs?.job_shipper}
                        </td>

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
                        <td style={{ width: "190px" }}>
                          {alljobs?.job_awb_bl_no}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="datatable">
                  <TableData
                    tableType="secondary"
                    data={sampletable}
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
                          {totalcost}
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
                          {totalExpense}
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
