import { Form } from "antd";
import React, { useEffect } from "react";
import { DatePicker } from "antd";
import {
  CRM_BASE_URL_HRMS,
  CRM_BASE_URL_SELLING,
  GENERAL_SETTING_BASE_URL,
} from "../../../api/bootapi";
import { CRM_BASE_URL } from "../../../api/bootapi";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import { Select } from "antd";
// import { useNavigate } from "react-router-dom";
import { cargo_typeoptions } from "../../../utils/SelectOptions";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import moment from "moment";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import Custom_model from "../../../components/custom_modal/custom_model";
import Input_Number from "../../../components/InputNumber/InputNumber";
import axios from "axios";
import CheckUnique from "../../../check Unique/CheckUnique";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import { useNavigate, useParams } from "react-router-dom";
function CreateJob() {
  const { id } = useParams();
  console.log("ID is ...", id);
  const [AllQuotations, setAllQuotations] = useState();
  const [cargooptions, setCargooptions] = useState(cargo_typeoptions);
  const dateFormatList = ["DD-MM-YYYY", "DD-MM-YY"];
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [leadIdEnq, setLeadIdEnq] = useState("");
  const [disable, setDisable] = useState(false);
  const [Errormsg, setErrormsg] = useState();
  const [error, setError] = useState(false);
  const [filenew, setFilenew] = useState();
  const [uniqueName, setUniqueName] = useState(false);
  const [leadId, setLeadId] = useState("");
  console.log("qto idd id : ", leadId);
  const [successPopup, setSuccessPopup] = useState(false);
  const [date, setDate] = useState();
  const [addForm] = Form.useForm();
  const [frightmode, setFrightmode] = useState();
  console.log("change", frightmode);
  const [jobno, setJobno] = useState();
  console.log("Job no:",jobno);
  const [frighttypemode, setFrighttypemode] = useState();
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  console.log("frighttype mode ", frighttypemode);
  const [currentcount, setCurrentcount] = useState();
  const [noofItems, setNoofItems] = useState(10000);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalcount] = useState();
  const pageofIndex = noofItems * (current - 1) - 1 + 1;
  const pagesizecount = Math.ceil(totalCount / noofItems);
  const navigate = useNavigate();
  const [frighttype, setFrighttype] = useState();
  const [allLocations, setAllLocations] = useState();
  console.log("locations ", allLocations);
  const [carrierdata, setCarrierdata] = useState();
  const [allPaymentTerms, setAllPaymentTerms] = useState();
  console.log("payment terms : ", allPaymentTerms);
  const [allunit, setAllunit] = useState([]);
  console.log("all units are : ", allunit);
  const [unitTable, setunitTable] = useState("");
  const [locationType, setLocationType] = useState();
  const [allCurrency, setAllCurreny] = useState();
  const [currencyDefault, setCurrencyDefault] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [awbno, setAwbno] = useState();
  const [currencydata, setCurrencydata] = useState();
  const[jobnoqtn,setJobnoqtn]=useState();
  const [allincoterms, setallincoterms] = useState("");
  const [defaultincoterm, setdefaultincoterm] = useState("");
  const [allSalesPerson, setAllSalesPerson] = useState();
  const [allcontainertype, setallcontainertype] = useState("");
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    useEffect(() => {
      if(jobno){
        addForm.setFieldsValue({ job_no : jobno })
      }
      // getallunits();
      // getAllLocations();
   
    }, [jobno]);
    useEffect(() => {
      if(jobnoqtn){
        GetSingleJob(jobnoqtn)
        addForm.setFieldsValue({ job_no : jobno })
      }
      // getallunits();
      // getAllLocations();
   
    }, [jobnoqtn]);
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

  const [qtnid, setQtnid] = useState();
  console.log("qtn id is : ", qtnid);

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


  const GetSingleJob = (e) => {
    console.log("e",e);
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job/job-number?jobFrtType=${e}`)
      .then((res) => {
        console.log("response of job number", res);
        if (res.data.data) {
          console.log("success of job", res.data.data);
          setJobno(res?.data?.data.job_number);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };


  const getonequatation = async (id) => {
    try {
      const onequatation = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/quotation/${id}`
      );
      if (onequatation.data.success) {
        console.log("one quatation iss ::", onequatation?.data?.data.quotation);
        locationBytype(onequatation?.data?.data.quotation.quotation_mode);
        setJobnoqtn( onequatation?.data?.data.quotation.fms_v1_freight_types.freight_type_id);
        // GetSingleJob(jobnoqtn);
        addForm.setFieldsValue({
          job_chargable_weight:
            onequatation?.data?.data.quotation.quotation_chargeable_wt,
          job_grossweight:
            onequatation?.data?.data.quotation.quotation_gross_wt,
            sales_person:onequatation?.data?.data.quotation.quotation_salesperson,
          job_shipper: onequatation?.data?.data.quotation.quotation_shipper,
          job_customer:
            onequatation?.data?.data.quotation.crm_v1_customer.customer_id,

          job_credit_days:
            onequatation?.data?.data.quotation.crm_v1_customer
              .customer_credit_days,
          job_freight_type:
            onequatation?.data?.data.quotation.fms_v1_freight_types
              .freight_type_id,
          job_cargo_type:
            onequatation?.data?.data.quotation.quotation_cargo_type,
          job_mode: onequatation?.data?.data.quotation.quotation_mode,
          job_carrier:
            onequatation?.data?.data.quotation.fms_v1_carrier.carrier_id,
          job_payment_terms:
            onequatation?.data?.data.quotation.fms_v1_payment_terms
              .payment_term_id,

          job_no_of_pieces:
            onequatation?.data?.data.quotation.quotation_no_of_pieces,

          job_uom: onequatation?.data?.data.quotation.crm_v1_units.unit_id,
          job_destination_id:
            onequatation?.data?.data.quotation
              ?.fms_v1_locations_fms_v1_quotation_quotation_destination_idTofms_v1_locations
              .location_id,
          job_origin_id:
            onequatation?.data?.data.quotation
              ?.fms_v1_locations_fms_v1_quotation_quotation_origin_idTofms_v1_locations
              .location_id,
          job_currency: onequatation?.data?.data.quotation.quotation_currency,
          exchnagerate:
            onequatation?.data?.data.quotation?.quotation_exchange_rate,
          job_total_cost_amountfx:
            onequatation?.data?.data.quotation?.quotation_grand_total,
          // job_consignee: onequatation?.data?.data.quotation?.consignee,
          job_volume:onequatation?.data?.data.quotation?.quotation_volume,
          job_breadth:onequatation?.data?.data.quotation?.quotation_breadth,
          job_height:onequatation?.data?.data.quotation?.quotation_height,
          job_length:onequatation?.data?.data.quotation?.quotation_length,

          job_consignee:onequatation?.data?.data.quotation?.quotation_consignee ?? '',
          job_containertype:onequatation?.data?.data.quotation?.quotation_container_type,
        });
        setGrandTotal(onequatation?.data?.data.quotation.quotation_grand_total);
        setFrighttypemode(onequatation?.data?.data.quotation.quotation_mode);
      }
    } catch (err) {
      console.log("error to getting all freighttype", err);
    }
  };

  const getAllQuotation = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation/Minimal`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success of qtn", res.data.data);
          setAllQuotations(res.data.data);

          let temp = [];
          res.data.data.forEach((item, index) => {
            let date = moment(item.quotation_date).format("DD-MM-YYYY");
            let validity = moment(item.quotation_validity).format("DD-MM-YYYY");
            temp.push({
              quotation_cargo_type: item.quotation_cargo_type,
              quotation_carrier: item.quotation_carrier,
              quotation_id: item.quotation_id,
              quotation_no: item.quotation_no,
              quotation_date: date,
              quotation_validity: validity,
              quotation_consignee: item.quotation_consignee,
              consignee_name: item.crm_v1_customer.lead_customer_name,
              quotation_shipper: item.quotation_shipper,
              quotation_status: item.quotation_status,
              fms_v1_quotation_agents: item.fms_v1_quotation_agents,
            });
            setQtnid(item.quotation_id);
            // let name= item.crm_v1_leads.lead_customer_name;
            // console.log("name",name);
            // addForm.setFieldsValue({ consignee:name });
          });

          // let name= res.data.data.quotation_consignee;
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getfmssettings = async () => {
    try {
      const allfmssetting = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/fms`
      );
      console.log("all fmssettinggg", allfmssetting.data);
      setdefaultincoterm(allfmssetting.data.data.fms_settings_incorterm);

      addForm.setFieldsValue({
        incoterm: allfmssetting.data.data.fms_settings_incorterm,
      });
    } catch (err) {
      console.log("error while getting the fmssettinggg: ", err);
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

  useEffect(() => {
    getAllQuotation();
    getfmssettings();
    getAllincoterm();
    if(id){
      handleLeadIdEnq(id);
      let a = parseInt(id);
      addForm.setFieldsValue({
        quotationno: a,
        // oppo_enquiries: enqnw,
       });
    }
  }, []);

  const handleLeadIdEnq = (e) => {
    getonequatation(e);
    setLeadIdEnq(e);
  };

  const [allCustomerList, setAllcustomerList] = useState([]);
  console.log("all leads", allCustomerList);
  const GetAllLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/Minimal`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          // setAllLeadList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          setCurrentcount(res?.data?.data?.currentCount);
          setAllcustomerList(res?.data?.data);
          let array = [];
          res?.data?.data?.forEach((item, index) => {
            array.push({
              lead_id: item?.lead_id,
              lead_customer_name: item?.lead_customer_name,
              lead_credit_days: item?.lead_credit_days,
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

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.LIST_JOB);
      }, time);
    }
  };

  console.log("Selected lead id is ", leadId);
  const handleLeadId = (leadId) => {
    setLeadId(leadId);
  };
  const hai = new Date();
  const datenew1 = moment(hai);
  addForm.setFieldValue("jobdate", datenew1);

  useEffect(() => {
    GetAllLeadData();
  }, [noofItems, pageofIndex, pagesizecount]);

  const OnSubmit = (data) => {
    console.log("submitting data", data);

    const date1 = moment(data.jobdate);

    const docfile = data?.new?.file?.originFileObj;
    const formData = new FormData();

    formData.append("job_date", date1);
    formData.append("job_customer", data.job_customer);
    formData.append("job_consignee", data.job_consignee);
    if (data.quotationno) {
      formData.append("job_quotation", data.quotationno);
    }
// if(data.job_consignee){
//   console.log("consignee values",data.job_consignee);
//   formData.append("job_consignee",data.job_consignee);
// }
if(data.job_containertype){
  formData.append("job_container_type",data.job_containertype);
}
    formData.append("job_mode", frighttypemode);

    formData.append("job_shipper", data.job_shipper);
    formData.append("job_freight_type", data.job_freight_type);
    if(data.job_cargo_type){
      formData.append("job_cargo_type", data.job_cargo_type);
    }
    
    formData.append("job_carrier", data.job_carrier);
    formData.append("job_awb_bl_no", awbno);
    if(data.job_breadth)
    {
      formData.append("job_breadth", data.job_breadth);
    }
    if(data.job_length){
      formData.append("job_length", data.job_length);
    }
    if(data.job_height){
      formData.append("job_height", data.job_height);
    }
    
   
    formData.append("job_volume", data.job_volume);

    formData.append("job_origin_id", data.job_origin_id);
    formData.append("job_salesperson_id", data.sales_person);
    // formData.append("job_customer", data.job_customer);

    formData.append("job_destination_id", data.job_destination_id);

    formData.append("job_no_of_pieces", data.job_no_of_pieces);
    formData.append("job_uom", data.job_uom);
    formData.append("job_gross_wt", data.job_grossweight);
    formData.append("job_chargeable_wt", data.job_chargable_weight);
    if(data.job_payment_terms){
      formData.append("job_payment_terms", data.job_payment_terms);
    }
    
    formData.append("job_total_cost_curr", data.job_currency);
    formData.append("job_total_cost_exch", data.exchnagerate);
    if(data.job_credit_days){
      formData.append("job_credit_days", data.job_credit_days);
    }
  
    formData.append("job_incoterm_id", data.incoterm);

    // formData.append("job_total_cost_amountlx", grandTotal);
    // formData.append("job_currency_rate", data.job_currency);
    // formData.append("job_exchange_rate", data.exchnagerate);

    if (docfile) {
      formData.append("job_docs", docfile);
    }

    console.log("before sending data", data);
    PublicFetch.post(`${CRM_BASE_URL_FMS}/job`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("data is successfully saved", res.data.data);
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
  const mode = (e) => {
    if (e) {
      frighttype &&
        frighttype.length > 0 &&
        frighttype.map((item, index) => {
          if (item.freight_type_id === e) {
            console.log("reached", item.freight_type_mode);
            setFrighttypemode(item.freight_type_mode);
            locationBytype(item.freight_type_mode);
          }
        });
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

  // const getAllLocations = async () => {
  //   try {
  //     const locations = await PublicFetch.get(`${CRM_BASE_URL_FMS}/locations`);
  //     console.log("all locations are", locations.data.data);
  //     // setAllLocations(locations.data.data);
  //     let temp = [];
  //     locations.data.data.forEach((item, index) => {
  //       temp.push({
  //         location_id: item.location_id,
  //         location_code: item.location_code,
  //         location_name: item.location_name,
  //         location_type: item.location_type,
  //         location_country: item.countries.country_name,
  //       });
  //       setAllLocations(temp);
  //     });
  //   } catch (err) {
  //     console.log("error while getting the locations: ", err);
  //   }
  // };

  const getallcarrier = async () => {
    try {
      const getcarrier = await PublicFetch.get(`${CRM_BASE_URL_FMS}/carrier`);
      console.log("Getting all carrier : ", getcarrier.data.data);
      setCarrierdata(getcarrier.data.data);
    } catch (err) {
      console.log("Error in getting carrier : ", err);
    }
  };

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

  const CuurencyDatas = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/currency`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAllCurreny(res.data.data);
          let arr = [];
          res?.data?.data?.forEach((item, index) => {
            if (item.currency_is_default === 1) {
              arr = item?.currency_code;
              setCurrencyDefault(arr);
              addForm.setFieldsValue({
                job_currency: item?.currency_id,
              });
              getCurrencyRate(item.currency_id);
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
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

  const [currencyRates, setCurrencyRates] = useState(0);
  console.log("ratesssss", currencyRates);
  let b;
  // const getCurrencyRate = (data) => {
  //   const code = allCurrency?.filter((item) => {
  //     if (item?.currency_id === data) {
  //       b = item?.currency_code;
  //     }
  //   });
  //   console.log("code", b);
  //   console.log(";;;;;;;;;", data);
  //   axios
  //     .get(`https://open.er-api.com/v6/latest/${currencyDefault}`)
  //     .then(function (response) {
  //       console.log("currency current rate:", response);
  //       let a = response.data.rates[b];
  //       console.log("currency match", a);
  //       // setCurrencyRates(a);
  //       let rate = 1 / a;
  //       setCurrencyRates(rate);

  //       addForm.setFieldValue("exchnagerate", rate);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  //get credit days
  const getCurrencyRate = (data, ccode, allData) => {
    // console.log("currency rate find", data, ccode);
    if (data && ccode) {
      const code = allData?.filter((item, index) => {
        if (item?.currency_id === data) {
          b = item?.currency_code;
        }
      });
      console.log("code", b, code);
      console.log(";;;;;;;;;", data);
      axios
        .get(`https://open.er-api.com/v6/latest/${ccode}`)
        .then(function (response) {
          console.log("currency current rate:", response);
          let a = response?.data?.rates[b];
          console.log("currency match", a);
          let rate = 1 / a;
          addForm.setFieldsValue({ exchnagerate: rate });
          setCurrencyRates(rate);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const getCreditdays = (data) => {
    console.log("data1011", data);

    PublicFetch.get(`${CRM_BASE_URL}/customer/${data}`)
      .then((res) => {
        if (res?.data?.success) {
          let a=res.data.data.customer_preferred_freight_type;
          mode(res?.data?.data?.customer_preferred_freight_type);
          if(res.data.data.customer_preferred_freight_type){
            GetSingleJob(a);
          }

          console.log("Unique Lead Id data", res?.data?.data);
        } else {
          console.log("FAILED T LOAD DATA");
        }
        addForm.setFieldsValue({
          job_credit_days: res.data.data.customer_credit_days,
          job_freight_type:res.data.data.customer_preferred_freight_type,
         
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getallcurrency = async () => {
    try {
      const allcurrency = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/currency`
      );
      console.log("Getting all currency : ", allcurrency.data.data);
      setCurrencydata(allcurrency?.data?.data);
      // let arr = "";
      let a = 0;
      allcurrency?.data?.data?.forEach((item, index) => {
        if (item?.currency_is_default == 1) {
          setCurrencyDefault(item?.currency_code);
          getCurrencyRate(
            item?.currency_id,
            item?.currency_code,
            allcurrency?.data?.data
          );

          a = item?.currency_id;
          addForm.setFieldsValue({
            currency: item?.currency_id,
          });
        }
      });
    } catch (err) {
      console.log("Error in getting currency : ", err);
    }
  };
  const GetSalesPersons = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees/salesexecutive`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success from sales person", res.data.data);
          setAllSalesPerson(res.data.data);
          const personName = localStorage.getItem('UserID');
          res.data.data.forEach((item,index)=> {
            if(personName == item.employee_id){
              addForm.setFieldsValue({
                sales_person: item.employee_id
              })
        }
      })
    }
  })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    // getallunits();
    // getAllLocations();
    getallcurrency();
    getallcarrier();
    getallPaymentTerms();
    getallunits();
    getallfrighttype();
    CuurencyDatas();
    GetSalesPersons();
    getallcontainertype();
  }, []);
  const beforeUpload = (file, fileList) => {};

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center mb-2">
          {/* <div className="row flex-wrap">
            <div className="col-6 ">
              <h5 className="lead_text">Create Job</h5>
            </div>
          </div> */}

          <Form
            form={addForm}
            onFinish={(values) => {
              console.log("values iss", values);
              OnSubmit(values);
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
          >
            <div className="container-fluid ms-0 me-2">
              <div className="row  mt-3">
                <h5 className="lead_text">Create Job</h5>
              </div>
              <div className="row mt-1 ">
                <div className="content-tabs-new row justify-content mx-1 mb-3">
                  <div className="row mt-3 ">
                    <h6 className="lead_text">Basic Info</h6>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3 ">
                    <label>Customer<span className="required">*</span></label>
                    <Form.Item
                      name="job_customer"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid  customer",
                        },
                      ]}
                    >
                      <SelectBox
                        onChange={(e) => {
                          handleLeadId(e);
                          getCreditdays(e);
                        }}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {allCustomerList &&
                          allCustomerList.length > 0 &&
                          allCustomerList.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.customer_id}
                                value={item.customer_id}
                              >
                                {item.customer_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Freight Type<span className="required">*</span></label>
                    <Form.Item
                      name="job_freight_type"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid freight type",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        onChange={(e) => {
                          console.log("date mmm", e);
                          setFrightmode(e);
                          mode(e);
                          // setFreightId(e);
                          GetSingleJob(e);
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

                    {/* <label>Quotation No</label>
                    <Form.Item
                      name="quotationno"
                      
                    >
                      <SelectBox
                        onChange={(e) => {
                          if (e) {
                            handleLeadIdEnq(e);
                            setDisable(true);
                          } else {
                            addForm.resetFields();
                            setDisable(false);
                          }
                        }}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {AllQuotations &&
                          AllQuotations.length > 0 &&
                          AllQuotations.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.quotation_id}
                                value={item.quotation_id}
                              >
                                {item.quotation_no}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item> */}
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Job No<span className="required">*</span></label>
                    <Form.Item
                      name="job_no"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid quotation no",
                      //   },
                      // ]}
                    >
                      <InputType disabled={true} />
                      {/* <SelectBox
                        onChange={(e) => {
                          if (e) {
                            handleLeadIdEnq(e);
                            setDisable(true);
                          } else {
                            addForm.resetFields();
                            setDisable(false);
                          }
                        }}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {AllQuotations &&
                          AllQuotations.length > 0 &&
                          AllQuotations.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.quotation_id}
                                value={item.quotation_id}
                              >
                                {item.quotation_no}
                              </Select.Option>
                            );
                          })}
                      </SelectBox> */}
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Job Date<span className="required">*</span></label>
                    <Form.Item
                      name="jobdate"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid date",
                        },
                      ]}
                    >
                      <DatePicker
                        className="m-0"
                        style={{ borderWidth: 0, marginTop: 10 }}
                        defaultValue={moment(date)}
                        format={dateFormatList}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Quotation No</label>
                    <Form.Item name="quotationno">
                      <SelectBox
                        onChange={(e) => {
                          if (e) {
                            handleLeadIdEnq(e);
                            setDisable(true);
                          } else {
                            addForm.resetFields();
                            setDisable(false);
                          }
                        }}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {AllQuotations &&
                          AllQuotations.length > 0 &&
                          AllQuotations.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.quotation_id}
                                value={item.quotation_id}
                              >
                                {item.quotation_no}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>

                    {/* <label>Consignee</label>
                    <Form.Item
                      name="job_consignee"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid consignee",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item> */}
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>
                      Sale Person<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="sales_person"
                      rules={[
                        {
                          required: true,
                          message: "Sale Person is Required",
                        },
                      ]}
                    >
                      <SelectBox>
                        {allSalesPerson &&
                          allSalesPerson.length > 0 &&
                          allSalesPerson.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.employee_id}
                                value={item.employee_id}
                              >
                                {item.employee_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                    {/* <label>Shipper</label>
                    <Form.Item
                      name="job_shipper"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid shipper",
                        },
                      ]}
                    >
                      <InputType disabled={disable} />
                    </Form.Item> */}
                  </div>
                  {/* <div className="col-xl-4 col-sm-12 mt-2 px-3"> */}
                    {/* <label>
                      Sale Person<span className="required">*</span>
                    </label>
                    <Form.Item
                      name="sales_person"
                      rules={[
                        {
                          required: true,
                          message: "Sales Person is Required",
                        },
                      ]}
                    >
                      <SelectBox>
                        {allSalesPerson &&
                          allSalesPerson.length > 0 &&
                          allSalesPerson.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.employee_id}
                                value={item.employee_id}
                              >
                                {item.employee_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item> */}
                  {/* </div> */}
                </div>
              </div>
           
            <div className="row  mt-1 ">
              {/* <div className=" col-12 mt-3"> */}
                <div className="content-tabs-new row justify-content mx-1 mb-3">
                  <div className="row mt-3">
                    <h6 className="lead_text">Transportation</h6>
                  </div>
                  {/* <div className="col-xl-6 col-sm-12 mt-2" hidden>
                      <label>Mode</label>
                      <Form.Item
                        name="job_mode"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid mode",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          disabled={disable}
                         value={frighttypemode}
                        >
                          <Select.Option value="Air">Air</Select.Option>
                          <Select.Option value="Sea">Sea</Select.Option>
                          <Select.Option value="Road">Road</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div> */}

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Consignee<span className="required">*</span></label>
                    <Form.Item
                      name="job_consignee"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid consignee",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Shipper<span className="required">*</span></label>
                    <Form.Item
                      name="job_shipper"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid shipper",
                        },
                      ]}
                    >
                      <InputType  />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Origin<span className="required">*</span></label>
                    <Form.Item
                      name="job_origin_id"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid origin",
                        },
                      ]}
                    >
                      <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={disable}
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
                    <label>Destination<span className="required">*</span></label>
                    <Form.Item
                      name="job_destination_id"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid destination",
                        },
                      ]}
                    >
                      <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={disable}
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

                  <div className="col-xl-4 col-sm-12 mt-2 px-3 ">
                    <label>Carrier<span className="required">*</span></label>
                    <Form.Item
                      name="job_carrier"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid carrier",
                        },
                      ]}
                    >
                      <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={disable}
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
                    <label>AWB/BL No<span className="required">*</span></label>
                    <Form.Item
                      name="job_awb"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid AWB/BL No",
                        },
                      ]}
                    >
                      <InputType
                        onChange={(e) => {
                          setAwbno(e.target.value);
                          setUniqueName(false);
                        }}
                        // onBlur={(e) => {
                        //   checkemployeeCodeis();
                        // }}
                        onBlur={async () => {
                          let a = await CheckUnique({
                            type: "jobawbblno",
                            value: awbno,
                          });
                          console.log("hai how are u", a);
                          setUniqueName(a);
                        }}
                      />
                    </Form.Item>
                    {uniqueName ? (
                      <p style={{ color: "red" }}>
                        AWB/BL No{uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3 ">
                    <label>Container Type</label>
                    <Form.Item
                      name="job_containertype"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid carrier",
                      //   },
                      // ]}
                    >
                      <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={disable}
                      >
                        {allcontainertype &&
                          allcontainertype.length > 0 &&
                          allcontainertype.map((item, index) => {
                            console.log("datass", item);
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

              <div className="content-tabs-new row justify-content mx-1 mb-3 ">
                <div className="row mt-3">
                  {/* <div className="row content-tabs-new justify-content  mb-3"> */}
                    <h6 className="lead_text">Shipment Details</h6>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Cargo Type</label>
                    <Form.Item
                      name="job_cargo_type"
                      // rules={[
                      //   {
                      //     required: true,

                      //     message: "Please select a Valid cargotype",
                      //   },
                      // ]}
                    >
                      <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={disable}
                      >
                        {cargooptions &&
                          cargooptions.length > 0 &&
                          cargooptions.map((item, index) => {
                            return (
                              <Select.Option key={item.id} value={item.name}>
                                {item.name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>No of pieces<span className="required">*</span></label>
                    <Form.Item
                      name="job_no_of_pieces"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid no of pieces",
                        },
                      ]}
                    >
                      <Input_Number
                        className="text_right m-0"
                        // value={currencyRates}
                        // onChange={handleChange}
                        align="right"
                        // step={0.01}
                        min={0}
                        precision={2}
                        controlls={false}
                        disabled={disable}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>UOM<span className="required">*</span></label>
                    <Form.Item
                      name="job_uom"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid UOM",
                        },
                      ]}
                    >
                      <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={disable}
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

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Length</label>
                    <Form.Item
                      name="job_length"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid gross wt",
                      //   },
                      // ]}
                    >
                      <Input_Number
                        className="text_right m-0"
                        // value={currencyRates}
                        // onChange={handleChange}
                        align="right"
                        // step={0.01}
                        min={0}
                        precision={2}
                        controlls={false}
                        disabled={disable}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Breadth</label>
                    <Form.Item
                      name="job_breadth"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid gross wt",
                      //   },
                      // ]}
                    >
                      <Input_Number
                        className="text_right m-0"
                        // value={currencyRates}
                        // onChange={handleChange}
                        align="right"
                        // step={0.01}
                        min={0}
                        precision={2}
                        controlls={false}
                        disabled={disable}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Height</label>
                    <Form.Item
                      name="job_height"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid gross wt",
                      //   },
                      // ]}
                    >
                      <Input_Number
                        className="text_right m-0"
                        // value={currencyRates}
                        // onChange={handleChange}
                        align="right"
                        // step={0.01}
                        min={0}
                        precision={2}
                        controlls={false}
                        disabled={disable}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Volume<span className="required">*</span></label>
                    <Form.Item
                      name="job_volume"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter volume",
                        },
                      ]}
                    >
                      <Input_Number
                        className="text_right m-0"
                        // value={currencyRates}
                        // onChange={handleChange}
                        align="right"
                        // step={0.01}
                        min={0}
                        precision={2}
                        controlls={false}
                        // disabled={disable}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Gross wt<span className="required">*</span></label>
                    <Form.Item
                      name="job_grossweight"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid gross wt",
                        },
                      ]}
                    >
                      <Input_Number
                        className="text_right m-0"
                        // value={currencyRates}
                        // onChange={handleChange}
                        align="right"
                        // step={0.01}
                        min={0}
                        precision={2}
                        controlls={false}
                        disabled={disable}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Chargeable wt<span className="required">*</span></label>
                    <Form.Item
                      name="job_chargable_weight"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid chargeable wt",
                        },
                      ]}
                    >
                      <Input_Number
                        className="text_right m-0"
                        // value={currencyRates}
                        // onChange={handleChange}
                        align="right"
                        // step={0.01}
                        min={0}
                        precision={2}
                        controlls={false}
                        disabled={disable}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label> Incoterm<span className="required">*</span></label>
                    <Form.Item name="incoterm">
                      <SelectBox
                        value={defaultincoterm}
                        onChange={(e) => {
                          console.log("select the brandss", e);
                          setdefaultincoterm(parseInt(e));
                        }}
                      >
                        {allincoterms &&
                          allincoterms.length > 0 &&
                          allincoterms.map((item, index) => {
                            console.log("njd", item);
                            return (
                              <Select.Option
                                key={item.incoterm_id}
                                value={item.incoterm_id}
                              >
                                {item.incoterm_full_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  {/* </div> */}
                </div>
              </div>
            </div>

            <div className="row mt-1 justify-content-between">
              <div className="col-xl-6 col-lg-12 col-md-12 col-12  ">
                <div className="row content-tabs-new justify-content  mb-3">
                  <div className="row mt-2">
                    <h6 className="lead_text">Payment Info</h6>
                  </div>

                  <div className="col-xl-6 col-sm-12 mt-2">
                    <label>Terms</label>
                    <Form.Item
                      name="job_payment_terms"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid terms",
                      //   },
                      // ]}
                    >
                      <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={disable}
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
                    <label>Currency<span className="required">*</span></label>
                    <Form.Item
                      name="job_currency"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a valid currency",
                        },
                      ]}
                    >
                      <SelectBox
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={disable}
                        onChange={(e) => {
                          getCurrencyRate(e, currencyDefault, currencydata);
                        }}
                      >
                        {allCurrency &&
                          allCurrency.length > 0 &&
                          allCurrency.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.currency_id}
                                value={item.currency_id}
                              >
                                {item.currency_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-xl-6 col-sm-12 mt-2">
                    <label>Exchange Rate<span className="required">*</span></label>
                    <Form.Item
                      name="exchnagerate"
                      // rules={[
                      //   {
                      //     required: true,

                      //     message: "Please enter a Valid Rate",
                      //   },
                      // ]}
                    >
                      <Input_Number
                        className="text_right "
                        // value={currencyRates}
                        // onChange={handleChange}
                        align="right"
                        // step={0.01}
                        min={0}
                        precision={2}
                        controlls={false}
                        // disabled={true}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-6 col-sm-12 mt-2 mb-4">
                    <label>Credit Days</label>
                    <Form.Item
                      name="job_credit_days"
                      // rules={[
                      //   {
                      //     required: true,

                      //     message: "Please enter Credit Days",
                      //   },
                      // ]}
                    >
                      <InputType
                        // className="text_right"
                        // value={currencyRates}
                        // onChange={handleChange}
                        // align="right"
                        // step={0.01}
                        min={0}
                        // precision={2}
                        controlls={false}
                        // disabled={true}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-12">
                <div className="content-tabs-new row justify-content ms-1 mb-3">
                  <div className="row mt-2">
                    <h6 className="lead_text">Attachments</h6>
                  </div>
                  <div className="col-xl-12 col-sm-12 mt-2">
                    <Form.Item className="mt-2" name="new">
                      <FileUpload
                        multiple
                        filetype={"Accept only pdf and docs"}
                        listType="picture"
                        accept=".pdf,.docs,"
                        style={{ height: "60px" }}
                        // aceept=".jpeg,.jpg,.png"
                        // onPreview={handlePreview}
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
            </div>

            <div className="col-12 d-flex justify-content-center my-4 gap-3">
              <Button className="save_button" btnType="save">
                Save
              </Button>

              <Button
                as="input"
                type="reset"
                value="Reset"
                onClick={() => {
                  navigate(`${ROUTES.LIST_JOB}`);
                }}
                // className="qtn_save"
                // btnType="save"
              >
                Cancel
              </Button>
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
export default CreateJob;
