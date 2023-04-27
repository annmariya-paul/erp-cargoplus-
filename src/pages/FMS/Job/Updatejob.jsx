import { Form } from "antd";
import { DatePicker } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
  CRM_BASE_URL_HRMS,
  CRM_BASE_URL_SELLING,
  GENERAL_SETTING_BASE_URL,
} from "../../../api/bootapi";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import PublicFetch from "../../../utils/PublicFetch";
import { Select } from "antd";
import { cargo_typeoptions } from "../../../utils/SelectOptions";
import Input_Number from "../../../components/InputNumber/InputNumber";
import moment from "moment";
import Custom_model from "../../../components/custom_modal/custom_model";
import { ROUTES } from "../../../routes";
import CheckUnique from "../../../check Unique/CheckUnique";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";

function Updatejob() {
  const { id } = useParams();
  console.log("Response", id);
  const [uniqueName, setUniqueName] = useState(false);
  const navigate = useNavigate();
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [editForm] = Form.useForm();
  const [awbno, setAwbno] = useState();
  const [pageofIndex, setPageOfIndex] = useState(0);
  const [noofItems, setNoofItems] = useState(1000);
  const [JobList, setJobList] = useState();
  const [freightType, setFreightTypes] = useState();
  const [consignees, setConsignees] = useState();
  const [quotations, setQuotations] = useState();
  const [carriers, setCarriers] = useState();
  const [PaymentTerm, setPaymentTerms] = useState();
  const [Units, setUnits] = useState();
  const [cargoTypes, setCargoTypes] = useState(cargo_typeoptions);
  const [locations, setLocations] = useState();
  const [allCurrency, setAllCurreny] = useState();
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [disable, setDisable] = useState(false);
  const [quotationdisable, setQuotationDisable] = useState(true);
  const [allSalesPerson, setAllSalesPerson] = useState();
  const [allcontainertype, setallcontainertype] = useState("");

  const [allincoterms, setallincoterms] = useState("");
  const [defaultincoterm, setdefaultincoterm] = useState("");
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.LIST_JOB);
      }, time);
    }
  };

const[qtnnumber,setQtnNumber]=useState();
console.log("number ",qtnnumber);
  const OneJobList = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job/${id}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of job", res.data.data);
          setJobList(res.data.data);
         setQtnNumber(res.data.data?.fms_v1_quotation_jobs[0]?.fms_v1_quotation?.quotation_no);
          let date = moment(res.data.data.job_date);
          locationByMode(res.data.data.job_mode);
          let quotationNo = [];
          res.data.data.fms_v1_quotation_jobs.forEach((item, index) => {
            quotationNo.push(item.quotation_job_id);
            if (item.quotation_job_id) {
              setDisable(true);
            } else {
              setDisable(false);
              // setQuotationDisable(true);
            }
          });
          editForm.setFieldsValue({
            freighttype: res.data.data.job_freight_type,
            jobno: res.data.data.job_number,
            jobdate: date,
            customer: res.data.data.job_customer,
            consignee: res.data.data.job_consignee,
            // quotationno: qtnnumber,
            shipper: res.data.data.job_shipper,
            cargotype: res.data.data.job_cargo_type,
            Mode: res.data.data.job_mode,
            origin: res.data.data.job_origin_id,
            destination: res.data.data.job_destination_id,
            carrier: res.data.data.job_carrier,
            AWB: res.data.data.job_awb_bl_no,
            terms: res.data.data.job_payment_terms,
            noofpieces: res.data.data.job_no_of_pieces,
            Uom: res.data.data.job_uom,
            job_currency: res.data.data.job_total_cost_curr,
            exchangerate: res.data.data.job_total_cost_exch,
            creditdays: res.data.data.job_credit_days,
            job_total_exp_amountlx: res.data.data.job_total_exp_amountlx,
            grosswt: res.data.data.job_gross_wt,
            chargeablewt: res.data.data.job_chargeable_wt,
            incoterm: res.data.data.job_incoterm_id,
            sales_person: res.data.data.job_salesperson_id,
            length:res.data.data.job_length,
            height:res.data.data.job_height,
            breadth:res.data.data.job_breadth,
            volume:res.data.data.job_volume,
            containertype:res.data.data.job_container_type,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
 useEffect(() => {
    if(qtnnumber){
editForm.setFieldsValue({quotationno :qtnnumber })
    }
     },[qtnnumber]);
  const freightTypes = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/freightTypes`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success of freight type", res.data.data);
          setFreightTypes(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const Consigneebylead = () => {
    PublicFetch.get(`${CRM_BASE_URL}/lead/Minimal`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of lead", res.data.data.leads);
          setConsignees(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const Carriers = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/carrier`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of carrier", res.data.data);
          setCarriers(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const paymentTerms = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/paymentTerms`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success of paymentTerms", res.data.data);
          setPaymentTerms(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const Uom = () => {
    PublicFetch.get(`${CRM_BASE_URL_SELLING}/unit`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Suucess of oum", res.data.data);
          setUnits(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const currencys = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/currency`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success of cuurency", res.data.data);
          setAllCurreny(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
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
      .get("https://open.er-api.com/v6/latest/USD")
      .then(function (response) {
        console.log("currency current rate:", response);
        let a = response.data.rates[b];
        console.log("currency match", a);
        // setCurrencyRates(a);
        let rate = 1 / a;
        setCurrencyRates(rate);
        // addForm.setFieldValue("exchnagerate", rate)
        editForm.setFieldValue("exchangerate", rate);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [frighttype, setFrighttype] = useState();
  const [frighttypemode, setFrighttypemode] = useState();


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
 const getCreditdays = (data) => {
    console.log("data1011", data);

    PublicFetch.get(`${CRM_BASE_URL}/customer/${data}`)
      .then((res) => {
        if (res?.data?.success) {
          let a=res.data.data.customer_preferred_freight_type;
          mode(res?.data?.data?.customer_preferred_freight_type);
          // if(res.data.data.customer_preferred_freight_type){
          //   GetSingleJob(a);
          // }

          console.log("Unique Lead Id data", res?.data?.data);
        } else {
          console.log("FAILED T LOAD DATA");
        }
        editForm.setFieldsValue({
          creditdays: res.data.data.customer_credit_days,
          // freighttype:res.data.data.customer_preferred_freight_type,
         
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [leadId, setLeadId] = useState("");
  console.log("qto idd id : ", leadId);
  console.log("Selected lead id is ", leadId);
  const handleLeadId = (leadId) => {
    setLeadId(leadId);
  };
  const locationByMode = (data) => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/locations/type-location/${data}`)
      .then((res) => {
        console.log("Resoponse", res);
        if (res.data.success) {
          console.log("Success of location by mode", res.data.data);
          setLocations(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const allQuotations = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation/Minimal`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of quotation", res.data.data);
          setQuotations(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const submitForm = (data) => {
    let docfile = data?.new?.file?.originFileObj;
    const formData = new FormData();
    formData.append("job_number", data.jobno);
    formData.append("job_date", data.jobdate);
    formData.append("job_consignee", data.consignee);
    formData.append("job_shipper", data.shipper);
    formData.append("job_customer", data.customer);
    formData.append("job_freight_type", data.freighttype);
    if(data.cargotype){
      formData.append("job_cargo_type", data.cargotype);
    }
    
    formData.append("job_carrier", data.carrier);
    formData.append("job_awb_bl_no", data.AWB);
    formData.append("job_mode", data.Mode);
    if(data.breadth)
    {
      formData.append("job_breadth", data.breadth);
    }
    if(data.length){
      formData.append("job_length", data.length);
    }
    if(data.height){
      formData.append("job_height", data.height);
    }
    
   
    formData.append("job_volume", data.volume);



    formData.append("job_origin_id", data.origin);
    formData.append("job_destination_id", data.destination);
    formData.append("job_no_of_pieces", data.noofpieces);
    formData.append("job_uom", data.Uom);
    formData.append("job_gross_wt", data.grosswt);
    formData.append("job_chargeable_wt", data.chargeablewt);
    if(data.terms){
      formData.append("job_payment_terms", data.terms);
    }
   
    formData.append("job_total_cost_curr", data.job_currency);
    formData.append("job_total_cost_exch", data.exchangerate);
    if(data.creditdays){
      formData.append("job_credit_days", data.creditdays);
    }
    
    if(data.containertype){
      formData.append("job_container_type",data.containertype);
    }
    formData.append("job_salesperson_id", data.sales_person);
    formData.append("job_incoterm_id", data.incoterm);

    if (docfile) {
      formData.append("attachments", docfile);
    }
    if(data.quotationno){
      formData.append("job_quotation", data.quotationno);
    }
    
    PublicFetch.patch(`${CRM_BASE_URL_FMS}/job/${id}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setSuccessPopup(true);
          close_modal(SuccessPopup, 1200);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  // incoterm add

  // const getfmssettings = async () => {
  //   try {
  //     const allfmssetting = await PublicFetch.get(
  //       `${GENERAL_SETTING_BASE_URL}/fms`
  //     );
  //     console.log("all fmssettinggg", allfmssetting.data);
  //     setdefaultincoterm(allfmssetting.data.data.fms_settings_incorterm)

  //   } catch (err) {
  //     console.log("error while getting the fmssettinggg: ", err);
  //   }
  // };

  const getAllincoterm = async () => {
    try {
      const allincoterm = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/incoterms/minimal`
      );
      console.log("all incotermss", allincoterm.data.data);
      setallincoterms(allincoterm.data.data);
      // setGetCountries(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
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

  const GetSalesPersons = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees/salesexecutive`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success from sales person", res.data.data);
          setAllSalesPerson(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    GetAllLeadData();
    getAllQuotation();
  }, []);
 
  const [allCustomerList, setAllcustomerList] = useState([]);
  console.log("all leads", allCustomerList);
  const GetAllLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/Minimal`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("All lead data", res?.data?.data);
          // setAllLeadList(res?.data?.data?.leads);
          // setTotalcount(res?.data?.data?.totalCount);
          // setCurrentcount(res?.data?.data?.currentCount);
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
  const [filenew, setFilenew] = useState();
  const [qtnid, setQtnid] = useState();
  console.log("qtn id is : ", qtnid);
  const [AllQuotations, setAllQuotations] = useState();
  console.log("all qtns",AllQuotations);

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
              // quotation_cargo_type: item.quotation_cargo_type,
              // quotation_carrier: item.quotation_carrier,
              quotation_id: item.quotation_id,
              quotation_no: item.quotation_no,
              // quotation_date: date,
              // quotation_validity: validity,
              // quotation_consignee: item.quotation_consignee,
              // consignee_name: item.crm_v1_customer.lead_customer_name,
              // quotation_shipper: item.quotation_shipper,
              // quotation_status: item.quotation_status,
              // fms_v1_quotation_agents: item.fms_v1_quotation_agents,
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
  const [locationType, setLocationType] = useState();
  const [allLocations, setAllLocations] = useState();
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
    if (id) {
      OneJobList();
    }
    freightTypes();
    Consigneebylead();
    Carriers();
    paymentTerms();
    Uom();
    currencys();
    allQuotations();
    getAllincoterm();
    GetSalesPersons();
    getallcontainertype();
  }, [id, pageofIndex, noofItems]);
  const beforeUpload = (file, fileList) => {};

  return (
    <>
      <div className="container-fluid ">
        <div className="row justify-content-md-center mb-2">
          {/* <div className="row flex-wrap">
            <div className="col-6 ">
              <h5 className="lead_text"></h5>
            </div>
          </div> */}

          <Form
            form={editForm}
            onFinish={(values) => {
              console.log("values iss", values);
              submitForm(values);
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
          >
            <div className="container-fluid ms-0 me-2">
              <div className="row  mt-3">
                <h5 className="lead_text">Edit Job</h5>
              </div>
              <div className="row mt-1 ">
                <div className="content-tabs-new row justify-content mx-1 mb-3">
                  <div className="row mt-3 ">
                    <h6 className="lead_text">Basic Info</h6>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3 ">
                    <label>Customer<span className="required">*</span></label>
                    <Form.Item
                      name="customer"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid consignee",
                        },
                      ]}
                    >
                      <SelectBox
                        onChange={(e) => {
                          handleLeadId(e);
                          getCreditdays(e);
                        }}
                        disabled={disable}
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
                      name="freighttype"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid freighttype",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {freightType &&
                          freightType.length > 0 &&
                          freightType.map((item, index) => {
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
                    <label>Job No<span className="required">*</span></label>
                    <Form.Item
                      name="jobno"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid jobno",
                        },
                      ]}
                    >
                      <InputType disabled={disable} />
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
                          message: "Please enter a Valid jobdate",
                        },
                      ]}
                    >
                      <DatePicker format={"DD-MM-YYYY"} disabled={disable} />
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
                      //     message: "Please enter a Valid quotationno",
                      //   },
                      // ]}
                    >
                      <SelectBox
                        disabled={quotationdisable}
                        value={qtnnumber}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {/* {AllQuotations &&
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
                          })} */}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  {/* <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Shipper</label>
                    <Form.Item
                      name="shipper"
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Consignee</label>
                    <Form.Item
                      name="consignee"
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
                  </div> */}
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
                      <SelectBox disabled={disable} >
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
                  </div>

                </div>
              </div>
            {/* </div> */}
            <div className="row  mt-1 ">
              <div className=" content-tabs-new row justify-content mx-1 mb-3">
                {/* <div className="content-tabs-new row justify-content mx-1 mb-3"> */}
                  <div className="row mt-3">
                    <h6 className="lead_text">Transportation</h6>
                  </div>

                  <div className="col-xl-6 col-sm-12 mt-2" hidden>
                    <label>Mode</label>
                    <Form.Item
                      name="Mode"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Mode",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        onChange={(e) => {
                          locationByMode(e);
                        }}
                      >
                        <Select.Option key={1} value="Air">
                          Air
                        </Select.Option>
                        <Select.Option key={2} value="Sea">
                          Sea
                        </Select.Option>
                        <Select.Option key={3} value="Road">
                          Road
                        </Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Consignee<span className="required">*</span></label>
                    <Form.Item
                      name="consignee"
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Shipper<span className="required">*</span></label>
                    <Form.Item
                      name="shipper"
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3 ">
                    <label>Carrier<span className="required">*</span></label>
                    <Form.Item
                      name="carrier"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid carrier",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {carriers &&
                          carriers.length > 0 &&
                          carriers.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.carrier_id}
                                value={item.carrier_id}
                              >
                                {item.carrier_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Origin<span className="required">*</span></label>
                    <Form.Item
                      name="origin"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid origin",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {locations &&
                          locations.length > 0 &&
                          locations.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.location_id}
                                value={item.location_id}
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
                      name="destination"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid destination",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {locations &&
                          locations.length > 0 &&
                          locations.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.location_id}
                                value={item.location_id}
                              >
                                {item.location_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-xl-4 col-sm-12 mt-2 px-3 ">
                    <label>AWB/BL No<span className="required">*</span></label>
                    <Form.Item
                      name="AWB"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid AWB",
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Container Type</label>
                    <Form.Item
                      name="containertype"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid containertype",
                      //   },
                      // ]}
                    >
                      <SelectBox disabled={disable} >
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
                {/* </div> */}
              </div>
              <div className=" content-tabs-new row justify-content mx-1 mb-3">
                {/* <div className="content-tabs-new row justify-content mx-1 mb-3 me-3"> */}
                  <div className="row mt-3">
                    <h6 className="lead_text">Shipment Details</h6>
                  </div>
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Cargo Type</label>
                    <Form.Item
                      name="cargotype"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid cargotype",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {cargoTypes &&
                          cargoTypes.length > 0 &&
                          cargoTypes.map((item, index) => {
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
                      name="noofpieces"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid noofpieces",
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>UOM<span className="required">*</span></label>
                    <Form.Item
                      name="Uom"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Uom",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {Units &&
                          Units.length > 0 &&
                          Units.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.unit_id}
                                value={item.unit_id}
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
                      //     message: "Please enter a Valid grosswt",
                      //   },
                      // ]}
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Breadth</label>
                    <Form.Item
                      name="breadth"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid grosswt",
                      //   },
                      // ]}
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Height</label>
                    <Form.Item
                      name="height"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid grosswt",
                      //   },
                      // ]}
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

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Volume<span className="required">*</span></label>
                    <Form.Item
                      name="volume"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid grosswt",
                      //   },
                      // ]}
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Gross wt<span className="required">*</span></label>
                    <Form.Item
                      name="grosswt"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid grosswt",
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
                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label>Chargeable wt<span className="required">*</span></label>
                    <Form.Item
                      name="chargeablewt"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid chargeablewt",
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

                  <div className="col-xl-4 col-sm-12 mt-2 px-3">
                    <label> Incoterm<span className="required">*</span></label>
                    <Form.Item name="incoterm">
                      <SelectBox
                        // value={defaultincoterm}
                        disabled={disable} 
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
                  </div>
                {/* </div> */}
              </div>
            </div>

            <div className="row mt-1 justify-content-between">
              <div className="col-xl-6 col-lg-12 col-md-12 col-12 ">
                <div className="row content-tabs-new justify-content  mb-3">
                  <div className="row mt-2">
                    <h6 className="lead_text">Payment Info</h6>
                  </div>
                  <div className="col-xl-6 col-sm-12 mt-2">
                    <label>Terms<span className="required">*</span></label>
                    <Form.Item
                      name="terms"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid terms",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {PaymentTerm &&
                          PaymentTerm.length > 0 &&
                          PaymentTerm.map((item, index) => {
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
                          // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Currency",
                        },
                      ]}
                    >
                      <SelectBox
                        disabled={disable}
                        allowClear
                        showSearch
                        optionFilterProp="children"
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
                                {item.currency_name}{" "}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-xl-6 col-sm-12 mt-2">
                    <label>Exchange Rate<span className="required">*</span></label>
                    <Form.Item
                      name="exchangerate"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Exchange Rate",
                        },
                      ]}
                    >
                      <Input_Number
                        className="text_right"
                        value={currencyRates}
                        disabled={disable} 
                        // onChange={handleChange}
                        align="right"
                        // step={0.01}
                        // min={0}
                        precision={4}
                        // controlls={false}
                        // disabled={true}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-xl-6 col-sm-12 mt-2  mb-4">
                    <label>Credit Days</label>
                    <Form.Item
                      name="creditdays"
                      // rules={[
                      //   {
                      //     required: true,
                      //     // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter credit days",
                      //   },
                      // ]}
                    >
                      <InputType
                      disabled={disable} 
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
                  <div className="col-xl-12 col-sm-12 mt-2 ">
                    <Form.Item  className="mt-2" 
                      name="new"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid chargeablewt",
                      //   },
                      // ]}
                    >
                      <FileUpload
                        beforeUpload={beforeUpload}
                        multiple
                        filetype={"Accept only pdf and docs"}
                        listType="picture"
                        accept=".pdf,.docs,"
                        style={{ height: "60px" }}
                        onChange={(file) => {
                          console.log("Before upload", file.file);
                          console.log(
                            "Before upload file size",
                            file.file.size
                          );
                          setFilenew(file.file.originFileObj);
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
                  navigate(ROUTES.LIST_JOB);
                }}
              >
                Cancel
              </Button>
            </div>
            {/* </div> */}
          </Form>

          <Custom_model
            success
            show={SuccessPopup}
            onHide={() => {
              setSuccessPopup(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
export default Updatejob;
