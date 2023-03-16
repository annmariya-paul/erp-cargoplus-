import "./job_payments.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import {
  CRM_BASE_URL_FMS,
  ACCOUNTS,
  GENERAL_SETTING_BASE_URL,
} from "../../../api/bootapi";
import moment from "moment";
import FileUpload from "../../../components/fileupload/fileUploader";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputNumber from "../../../components/InputNumber/InputNumber";
import Custom_model from "../../../components/custom_modal/custom_model";
import PublicFetch from "../../../utils/PublicFetch";
import Input_Number from "../../../components/InputNumber/InputNumber";
import Button from "../../../components/button/button";

export default function AddJobPayments() {
  const [addForm] = Form.useForm();
  const [date,setDate] = useState();
  const [successPopup, setSuccessPopup] = useState(false);
  const [currencyDefault, setCurrencyDefault] = useState();
  const [allCurrency, setAllCurrency] = useState();
  const [jobData, setJobData] = useState();
  const [jobTotalCost, setJobTotalCost] = useState();
  const [advanceAmount, setAdvanceAmount] = useState();
  const [convertAmount, setConvertAmount] = useState();
  const [jobExchangeRate, setJobExchangeRate] = useState();
  const [fileAttach,setFileAttach] = useState();
  const [JobLeadId,setJobLeadId] = useState();
  const [currencyId,setCurrencyId] = useState();
  const [imageSize,setImageSize] = useState(false);
console.log("jjj",JobLeadId);
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const navigate = useNavigate();

  const CurrencyData = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/currency`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAllCurrency(res.data.data);
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
  console.log("iiii", currencyRates);
  let b;
  const getCurrencyRate = (data) => {
    console.log("hhhhhh", data);
    const code = jobData?.filter((item) => {
      if (item?.generalsettings_v1_currency.currency_code === data) {
        b = item?.generalsettings_v1_currency.currency_code;
      }
    });
    axios
      .get(`https://open.er-api.com/v6/latest/${currencyDefault}`)
      .then(function (response) {
        console.log("currency current rate:", response);
        let a = response.data.rates[b];
        console.log("eeee", a);
        setCurrencyRates(a);
        addForm.setFieldValue("exchnagerate", a);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let conversion = advanceAmount / jobExchangeRate;
    addForm.setFieldsValue({
      advanceIn_DefCurrency: conversion.toFixed(2),
    });
  }, [advanceAmount, jobExchangeRate]);

  const getAllJobs = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job?startIndex=0&noOfItems=10`)
      .then((res) => {
        if (res.data.success) {
          console.log("jobbbb", res.data.data);
          setJobData(res.data.data.job);
        } else {
          console.log("Failed to load data");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getOneJob = async (id) => {
    try {
      const oneJob = await PublicFetch.get(`${CRM_BASE_URL_FMS}/job/${id}`);
      if (oneJob.data.success) {
        setJobLeadId(oneJob?.data?.data?.crm_v1_leads?.lead_id);
        setCurrencyId(
          oneJob?.data?.data.generalsettings_v1_currency.currency_id
        );
        let jobAmount = 0;
        if (oneJob?.data?.data?.fms_v1_job_task_expenses) {
          oneJob?.data?.data?.fms_v1_job_task_expenses.map((i, index) => {
            jobAmount += i.job_task_expense_cost_subtotalfx;
          });
        }
        addForm.setFieldsValue({
          // JobLeadId: oneJob?.data?.data?.crm_v1_leads?.lead_id,
          lead_name: oneJob?.data?.data?.crm_v1_leads?.lead_customer_name,
          currency:
            oneJob?.data?.data.generalsettings_v1_currency.currency_name,
          Job_exchangeRate: oneJob?.data?.data.job_total_cost_exch.toFixed(2),
          job_amount: jobAmount.toFixed(2),
        });
        setJobExchangeRate(oneJob?.data?.data.job_total_cost_exch);
        getCurrencyRate(
          oneJob?.data?.data.generalsettings_v1_currency.currency_code
        );
      }
    } catch (err) {
      console.log("error to getting a job", err);
    }
  };

  const handleJobNo = (e) => {
    if (e) {
      getOneJob(e);
    }
  };

  useEffect(() => {
    CurrencyData();
    getAllJobs();
  }, []);

  const newDate = new Date();
  const thisDate = moment(newDate);
  addForm.setFieldValue("voucher_date", thisDate);

  const addJobPayment = (data) => {
     console.log("addcreditdata", data);
    const date = moment(data.voucher_date);
    const formData = new FormData();
   
    formData.append("job_pay_voucher_date", date);
    formData.append("job_pay_job_id", data.job_id);
    formData.append("job_pay_lead_id", JobLeadId);
    formData.append("job_pay_currency", currencyId);
    formData.append("job_pay_exchange_rate", data.Job_exchangeRate);
    formData.append("job_pay_job_amount", data.job_amount);
    formData.append("job_pay_advance_amount_fx", data.advance_amount);
    formData.append("job_pay_advance_amount_lx", data.advanceIn_DefCurrency);
    formData.append("job_pay_remarks", data.remarks);
    // formData.append("job_pay_docs", data.attachment);
    if (fileAttach) {
      formData.append("job_pay_docs", fileAttach);
    }
   
    PublicFetch.post(`${ACCOUNTS}/job-payments`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          console.log("hello", res.data.data);
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000);
        } else {
          console.log("helo", res.data.data);
          // setBrandError(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
        // setError(true);
      });
  };

   const beforeUpload = (file, fileList) => {};
  return (
    <>
      <div className="container-fluid">
        {/* <div className="row"> */}
        <Form
          name="addForm"
          form={addForm}
          onFinish={(values) => {
            console.log("jobpayvalues", values);
            addJobPayment(values);
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row px-1 pt-2">
            <h5 className="lead_text">Add Job Payment</h5>
          </div>

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Basic Info</h5>
            </div>
            <div className="col-sm-4 pt-2">
              <label>Voucher Date</label>
              <Form.Item className="mt-2" name="voucher_date">
                <DatePicker format={"DD-MM-YYYY"} defaultValue={moment(date)} />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label>Job No.</label>
              <Form.Item name="job_id">
                <SelectBox
                  onChange={(e) => {
                    handleJobNo(e);
                  }}
                >
                  {jobData &&
                    jobData.length > 0 &&
                    jobData.map((item, index) => {
                      return (
                        <Select.Option value={item.job_id} key={item.job_id}>
                          {item.job_number}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label>Lead</label>
              <Form.Item name="lead_name">
                <InputType disabled />
              </Form.Item>
            </div>
          </div>
          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Payment Info</h5>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Currency</label>
              <Form.Item name="currency">
                <InputType disabled />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Exchange Rate</label>
              <Form.Item
                name="Job_exchangeRate"
                onChange={(e) => setJobExchangeRate(e.target.value)}
              >
                <Input_Number
                  className="text_right"
                  align="right"
                  min={2}
                  precision={2}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Job Amount</label>
              <Form.Item name="job_amount">
                <InputNumber disabled min={2} precision={2} />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Advance Amount</label>
              <Form.Item
                name="advance_amount"
                onChange={(e) => setAdvanceAmount(e.target.value)}
              >
                <Input_Number
                  className="text_right"
                  align="right"
                  min={2}
                  precision={2}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>
                Advance in <span>({currencyDefault})</span>
              </label>
              <Form.Item
                name="advanceIn_DefCurrency"
                // onChange={(e) => setName(e.target.value)}
              >
                <Input_Number
                  className="text_right"
                  align="right"
                  disabled
                  min={2}
                  precision={2}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Attachments</h5>
            </div>
            <div className="col-sm-6 pt-2">
              <label className="mb-2">Remarks</label>
              <Form.Item
                name="remarks"
                // onChange={(e) => setName(e.target.value)}
              >
                <TextArea />
              </Form.Item>
            </div>
            <div className="col-sm-6 mt-2 mb-4">
              <label>Attachments</label>
              <Form.Item name="attachment" className="mt-2">
                <FileUpload
                  multiple
                  listType="picture"
                  accept=".pdf,.docx,.zip"
                  height={100}
                  beforeUpload={beforeUpload}
                  onChange={(file) => {
                    console.log("Before upload file size", file.file.size);
                    if (file.file.size > 2000 && file.file.size < 500000) {
                      setFileAttach(file.file.originFileObj);
                      setImageSize(false);
                      console.log("select imaggg", file.file.originFileObj);
                      console.log(
                        "image is greater than 2 kb and less than 500 kb"
                      );
                    } else {
                      setImageSize(true);
                      console.log("Error in image upload");
                    }
                  }}
                />
                {imageSize ? (
                  <p style={{ color: "red" }}>
                    Upload File size between 1 kb and 500 kb
                  </p>
                ) : (
                  ""
                )}
              </Form.Item>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center mt-4 gap-3">
            <Button btnType="save" className="save_button">
              Save
            </Button>
            <Button
              as="input"
              type="reset"
              value="Reset"
              onClick={() => {
                navigate(ROUTES.JOB_PAYMENTS);
              }}
            >
              Cancel
            </Button>
          </div>
          {/* </div> */}
        </Form>
        {/* </div> */}
        <Custom_model
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </div>
    </>
  );
}
