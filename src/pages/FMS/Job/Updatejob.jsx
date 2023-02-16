import { Form } from "antd";
import { DatePicker } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
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

function Updatejob() {
  const { id } = useParams();
  console.log("Response", id);
  const navigate = useNavigate();
  const [editForm] = Form.useForm();
  const [pageofIndex, setPageOfIndex] = useState(0);
  const [noofItems, setNoofItems] = useState(100);
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

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.LIST_JOB);
      }, time);
    }
  };

  const OneJobList = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job/${id}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setJobList(res.data.data);
          let date = moment(res.data.data.job_date);
          locationByMode(res.data.data.job_mode);
          let quotationNo = [];
          res.data.data.fms_v1_quotation_jobs.forEach((item, index) => {
            quotationNo.push(item.quotation_job_id);
          });
          editForm.setFieldsValue({
            freighttype: res.data.data.job_freight_type,
            jobno: res.data.data.job_number,
            jobdate: date,
            consignee: res.data.data.job_consignee,
            quotationno: quotationNo,
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
            job_total_exp_amountlx: res.data.data.job_total_exp_amountlx,
            grosswt: res.data.data.job_gross_wt,
            chargeablewt: res.data.data.job_chargeable_wt,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

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
    PublicFetch.get(
      `${CRM_BASE_URL}/lead?startIndex=${pageofIndex}&noOfItems=${noofItems}`
    )
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of lead", res.data.data.leads);
          setConsignees(res.data.data.leads);
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
        editForm.setFieldValue("exchangerate", a);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation?startIndex=0&noOfItems=1000`)
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
    const formData = new FormData();
    formData.append("job_number", data.jobno);
    formData.append("job_date", data.jobdate);
    formData.append("job_consignee", data.consignee);
    formData.append("job_shipper", data.shipper);
    formData.append("job_freight_type", data.freighttype);
    formData.append("job_cargo_type", data.cargotype);
    formData.append("job_carrier", data.carrier);
    formData.append("job_awb_bl_no", data.AWB);
    formData.append("job_mode", data.Mode);
    formData.append("job_origin_id", data.origin);
    formData.append("job_destination_id", data.destination);
    formData.append("job_no_of_pieces", data.noofpieces);
    formData.append("job_uom", data.Uom);
    formData.append("job_gross_wt", data.grosswt);
    formData.append("job_chargeable_wt", data.chargeablewt);
    formData.append("job_payment_terms", data.terms);
    formData.append("job_total_cost_currency", data.job_currency);
    formData.append("job_total_cost_exch", data.exchangerate);
    if (data.attachments) {
      formData.append("job_docs", data.attachments);
    }
    formData.append("job_quotation", data.quotationno);
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
  }, [id, pageofIndex, noofItems]);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="row flex-wrap">
            <div className="col-6 ">
              <h5 className="lead_text">Edit Job</h5>
            </div>
          </div>
          <div className="content-tabs">
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
              <div className="container mb-4">
                <div className="row">
                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Freight Type</label>
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
                          // disabled={disable}
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
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Job No</label>
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
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Job Date</label>
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
                        <DatePicker format={"DD-MM-YYYY"} />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Consignee</label>
                      <Form.Item
                        name="consignee"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid consignee",
                          },
                        ]}
                      >
                        <SelectBox
                          // disabled={disable}
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {consignees &&
                            consignees.length > 0 &&
                            consignees.map((item, index) => {
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
                  </div>

                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Quotation No</label>
                      <Form.Item
                        name="quotationno"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid quotationno",
                          },
                        ]}
                      >
                        <SelectBox
                          // disabled={disable}
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {quotations &&
                            quotations.length > 0 &&
                            quotations.map((item, index) => {
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
                    <div className="col-xl-3 col-sm-6 mt-2">
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
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
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
                          // disabled={disable}
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
                    <div className="col-xl-3 col-sm-6 mt-2">
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
                          // disabled={disable}
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
                  </div>

                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Origin</label>
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
                          // disabled={disable}
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
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Destination</label>
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
                          // disabled={disable}
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
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
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
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>AWB/BL No</label>
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
                        <InputType />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Terms</label>
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
                          // disabled={disable}
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
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>No of pieces</label>
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
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>UOM</label>
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
                          // disabled={disable}
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
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Currency</label>
                      <Form.Item
                        name="job_currency"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Currency",
                          },
                        ]}
                      >
                        <SelectBox
                          // disabled={disable}
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
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Exchange Rate</label>
                      <Form.Item
                        name="exchangerate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Exchange Rate",
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
                          disabled={true}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Gross wt</label>
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
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Chargeable wt</label>
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
                        <InputType />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-sm-6 ">
                      <label>Attachments</label>
                      <Form.Item
                        name="attachments"
                        // rules={[
                        //   {
                        //     required: true,
                        //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        //     message: "Please enter a Valid chargeablewt",
                        //   },
                        // ]}
                      >
                        <FileUpload />
                      </Form.Item>
                    </div>
                  </div>

                  {/* <div className="row"> */}
                  <div className="d-flex justify-content-center my-4">
                    <div className="col-lg-1 ">
                      <Button className="qtn_save" btnType="save">
                        Save
                      </Button>
                    </div>
                    <div className="col-lg-1 ">
                      <Button className="qtn_save" btnType="cancel">
                        Cancel
                      </Button>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </Form>
          </div>
        </div>
        <Custom_model
          success
          show={SuccessPopup}
          onHide={() => {
            setSuccessPopup(false);
          }}
        />
      </div>
    </>
  );
}
export default Updatejob;
