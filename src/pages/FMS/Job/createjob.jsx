import { Form } from "antd";
import React, { useEffect } from "react";
import { DatePicker } from "antd";
import {
  CRM_BASE_URL_SELLING,
  GENERAL_SETTING_BASE_URL,
} from "../../../api/bootapi";
import { CRM_BASE_URL } from "../../../api/bootapi";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
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

function CreateJob() {
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
  const [frightmode,setFrightmode]= useState();
  console.log("change",frightmode);
  const [frighttypemode,setFrighttypemode]=useState();
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  console.log("frighttype mode ",frighttypemode);
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
  const [awbno,setAwbno]=useState();

  const[allincoterms,setallincoterms]=useState("")
  const [defaultincoterm,setdefaultincoterm] = useState("")

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

  const getonequatation = async (id) => {
    try {
      const onequatation = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/quotation/${id}`
      );
      if (onequatation.data.success) {
        console.log("one quatation iss ::", onequatation?.data?.data.quotation);
        locationBytype(onequatation?.data?.data.quotation.quotation_mode);
        addForm.setFieldsValue({
          job_chargable_weight:
            onequatation?.data?.data.quotation.quotation_chargeable_wt,
          job_grossweight:
            onequatation?.data?.data.quotation.quotation_gross_wt,

          job_shipper: onequatation?.data?.data.quotation.quotation_shipper,
          job_customer:
            onequatation?.data?.data.quotation.crm_v1_leads.lead_id,

          job_credit_days:
            onequatation?.data?.data.quotation.crm_v1_leads.lead_credit_days,
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
          console.log("success", res.data.data);
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
              consignee_name: item.crm_v1_leads.lead_customer_name,
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
      setdefaultincoterm(allfmssetting.data.data.fms_settings_incorterm)
     

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
      setallincoterms(allCountries.data.data)
      // setGetCountries(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  useEffect(() => {
    getAllQuotation();
    getfmssettings()
    getAllincoterm()
  }, []);

  const handleLeadIdEnq = (e) => {
    getonequatation(e);
    setLeadIdEnq(e);
  };

  const [allLeadList, setAllLeadList] = useState([]);
  console.log("all leads", allLeadList);
  const GetAllLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/lead/Minimal`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          // setAllLeadList(res?.data?.data?.leads);
          setTotalcount(res?.data?.data?.totalCount);
          setCurrentcount(res?.data?.data?.currentCount);
          setAllLeadList(res.data.data);
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
     
    
    formData.append("job_mode",frighttypemode);
  
    formData.append("job_shipper", data.job_shipper);
    formData.append("job_freight_type", data.job_freight_type);
    formData.append("job_cargo_type", data.job_cargo_type);
    formData.append("job_carrier", data.job_carrier);
    formData.append("job_awb_bl_no", awbno);
    
    formData.append("job_origin_id", data.job_origin_id);
    
    formData.append("job_customer", data.job_customer);

    formData.append("job_destination_id", data.job_destination_id);

    formData.append("job_no_of_pieces", data.job_no_of_pieces);
    formData.append("job_uom", data.job_uom);
    formData.append("job_gross_wt", data.job_grossweight);
    formData.append("job_chargeable_wt", data.job_chargable_weight);
    formData.append("job_payment_terms", data.job_payment_terms);
    formData.append("job_total_cost_currency", data.job_currency);
    formData.append("job_total_cost_exch", data.exchnagerate);
    formData.append("job_credit_days", data.job_credit_days);
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
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const [currencyRates, setCurrencyRates] = useState(0);
  console.log("ratesssss", currencyRates);
  let b;
  const getCurrencyRate = (data) => {
    const code = allCurrency?.filter((item) => {
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
        // setCurrencyRates(a);
        let rate=1/a;
        setCurrencyRates(rate);

        addForm.setFieldValue("exchnagerate", rate);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //get credit days

  const getCreditdays = (data) => {
    console.log("data1011", data);
    // const code = allLeadList?.filter((item) => {
    //   if (item?.lead_id === data) {
    //     b = item?.lead_id;

    //   }
    // });
    // console.log("code", b);
    // console.log(";;;;;;;;;", data);
    PublicFetch.get(`${CRM_BASE_URL}/lead/${data}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Unique Lead Id data", res?.data?.data);
          // setOneLeadData(res?.data?.data);
        } else {
          console.log("FAILED T LOAD DATA");
        }

        addForm.setFieldValue(
          "job_credit_days",
          res?.data?.data.lead_credit_days
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // getallunits();
    // getAllLocations();
    getallcarrier();
    getallPaymentTerms();
    getallunits();
    getallfrighttype();
    CuurencyDatas();
  }, []);
  const beforeUpload = (file, fileList) => {};

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          {/* <div className="row flex-wrap">
            <div className="col-6 ">
              <h5 className="lead_text">Create Job</h5>
            </div>
          </div> */}
          <div className="content-tabs">
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
              <div className="container-fluid ">
                <div className="row  mt-3">
                  <h4 className="lead_text">Create Job</h4>
                </div>
                <div className="row ms-1 mb-3 ">
                  <div className="content-tabs-new row justify-content px-4">
                    <div className="row mt-3 ">
                      <h5 className="lead_text">Basic Info</h5>
                    </div>
                    <div className="col-xl-4 col-sm-12 mt-2 px-3 ">
                      <label>Job Date</label>
                      <Form.Item
                        name="jobdate"
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
                          defaultValue={moment(date)}
                          format={dateFormatList}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label>Quotation No</label>
                      <Form.Item
                        name="quotationno"
                        // rules={[
                        //   {
                        //     required: true,
                        //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        //     message: "Please enter a Valid quotation no",
                        //   },
                        // ]}
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
                      </Form.Item>
                    </div>

                    <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label>Freight Type</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
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
                      <label>Customer</label>
                      <Form.Item
                        name="job_customer"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid  customer",
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
                  
                    <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label>Consignee</label>
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
                        <InputType  />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 col-sm-12 mt-2 px-3">
                      <label>Shipper</label>
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
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mt-3 px-1 ">
                <div className="col-md-6 col-12 mt-3">
                  <div className="content-tabs-new row justify-content mx-1 mb-3">
                    <div className="row mt-3">
                      <h5 className="lead_text">Transportation</h5>
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
                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>Origin</label>
                      <Form.Item
                        name="job_origin_id"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid origin",
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

                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>Destination</label>
                      <Form.Item
                        name="job_destination_id"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Destination",
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

                    <div className="col-xl-6 col-sm-12 mt-4  mb-5 pb-4">
                      <label>Carrier</label>
                      <Form.Item
                        name="job_carrier"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid carrier",
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
                    <div className="col-xl-6 col-sm-12 mt-4 mb-2">
                      <label>AWB/BL No</label>
                      <Form.Item
                        name="job_awb"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid AWB/BL No",
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
                          onBlur={ async () => {
                            
                            let a = await CheckUnique({type:"jobawbblno",value:awbno})
                            console.log("hai how are u", a)
                            setUniqueName(a);
                            
                          }}
                        />
                      </Form.Item>
                      {uniqueName ? (
                            <p style={{ color: "red"  }}>
                         AWB/BL No{uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12 mt-3 pb-1">
                  <div className="content-tabs-new row justify-content mx-1 mb-3 me-3">
                    <div className="row mt-3">
                      <h5 className="lead_text">Shipment Details</h5>
                    </div>
                    <div className="col-xl-6 col-sm-12 mt-2">
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
                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>No of pieces</label>
                      <Form.Item
                        name="job_no_of_pieces"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid no of pieces",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
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
                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>UOM</label>
                      <Form.Item
                        name="job_uom"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid UOM",
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

                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>Gross wt</label>
                      <Form.Item
                        name="job_grossweight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid gross wt",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
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
                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>Chargeable wt</label>
                      <Form.Item
                        name="job_chargable_weight"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid chargeable wt",
                          },
                        ]}
                      >
                        <Input_Number
                          className="text_right"
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

                    <div className="col-xl-6 col-sm-12 mt-2">
                    <label> Incoterm</label>
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
                          console.log("njd",item)
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3 px-1 ">
                <div className="col-md-6 col-12 ">
                  <div className="content-tabs-new row justify-content mx-1 mb-3">
                    <div className="row mt-3">
                      <h5 className="lead_text">Payment Info</h5>
                    </div>

                    <div className="col-xl-6 col-sm-12 mt-2">
                      <label>Terms</label>
                      <Form.Item
                        name="job_payment_terms"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid terms",
                          },
                        ]}
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
                      <label>Currency</label>
                      <Form.Item
                        name="job_currency"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid currency",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          disabled={disable}
                          onChange={(e) => {
                            getCurrencyRate(e);
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
                        rules={[
                          {
                            required: true,

                            message: "Please enter Credit Days",
                          },
                        ]}
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
                <div className="col-md-6 col-12">
                  <div className="content-tabs-new row justify-content-center mx-1 mb-1 me-3">
                    <div className="row mt-3">
                      <h5 className="lead_text">Attachments</h5>
                    </div>
                    <div className="col-xl-8 col-sm-12 mt-2">
                      <Form.Item className="mt-2" name="new">
                        <FileUpload
                          multiple
                          filetype={"Accept only pdf and docs"}
                          listType="picture"
                          accept=".pdf,.docs,"
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
      </div>
    </>
  );
}
export default CreateJob;
