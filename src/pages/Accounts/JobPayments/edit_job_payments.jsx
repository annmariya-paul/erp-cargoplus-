import "./job_payments.scss";
import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../routes";
import moment from "moment";
import FileUpload from "../../../components/fileupload/fileUploader";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputNumber from "../../../components/InputNumber/InputNumber";
import Button from "../../../components/button/button";
import Custom_model from "../../../components/custom_modal/custom_model";
import PublicFetch from "../../../utils/PublicFetch";
import Input_Number from "../../../components/InputNumber/InputNumber";
import {
  GENERAL_SETTING_BASE_URL,
  ACCOUNTS,
  CRM_BASE_URL_FMS,
} from "../../../api/bootapi";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function EditJobPayment() {
  const { id } = useParams();
  const [editForm] = Form.useForm();
  const [successPopup, setSuccessPopup] = useState(false);
  const [jobData, setJobData] = useState();
  const [currencyDefault, setCurrencyDefault] = useState();
  const [allCurrency, setAllCurrency] = useState();
  const [fileAttach, setFileAttach] = useState();
  const [imageSize, setImageSize] = useState(false);
  const [jobPayData, setJobPayData] = useState();
  const [advanceAmount, setAdvanceAmount] = useState();
  const [jobExchangeRate, setJobExchangeRate] = useState();

  const navigate = useNavigate();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.JOB_PAYMENTS);
      }, time);
    }
  };

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

  const getAllJobs = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job?startIndex=0&noOfItems=10`)
      .then((res) => {
        if (res.data.success) {
          setJobData(res.data.data.job);
        } else {
          console.log("Failed to load data");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // {function to fetch one Job Payment data - Ann - 13/3/23}
  const getOneJobPayment = () => {
    PublicFetch.get(`${ACCOUNTS}/job-payments/${id}`)
      .then((res) => {
        if (res.data.success) {
          console.log("success job pay", res.data);
          setJobPayData(res?.data?.data);
          setJobExchangeRate(res?.data?.data?.job_pay_exchange_rate);
          setAdvanceAmount(res?.data?.data?.job_pay_advance_amount_fx);
          let voucherDate = moment(res?.data?.data?.job_pay_voucher_date);
          editForm.setFieldsValue({
            voucher_no: res?.data?.data?.job_pay_voucher_no,
            voucher_date: voucherDate,
            job_no: res?.data?.data?.fms_v1_jobs.job_number,
            jobpay_lead: res?.data?.data?.crm_v1_leads.lead_customer_name,
            job_currency:
              res?.data?.data?.generalsettings_v1_currency.currency_name,
            exchange_rate: res?.data?.data?.job_pay_exchange_rate,
            job_amount: res?.data?.data?.job_pay_job_amount,
            advance_amount: res?.data?.data?.job_pay_advance_amount_fx,
            advance_in: res?.data?.data?.job_pay_advance_amount_lx,
            jobpay_remarks: res?.data?.data?.job_pay_remarks,
            job_docs: res?.data?.data?.job_pay_docs,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    let conversion = advanceAmount / jobExchangeRate;
    editForm.setFieldsValue({
      advance_in: conversion.toFixed(2),
    });
  }, [advanceAmount, jobExchangeRate]);

  // {function to fetch edit Job Payment - Ann - 14/3/23}
  const EditJobPayment = (data) => {
    const formData = new FormData();
    formData.append("job_pay_voucher_date", data.voucher_date);
    formData.append("job_pay_job_id", jobPayData.job_pay_job_id);
    formData.append("job_pay_lead_id", jobPayData.job_pay_lead_id);
    formData.append("job_pay_currency", jobPayData.job_pay_currency);
    formData.append("job_pay_exchange_rate", data.exchange_rate);
    formData.append("job_pay_job_amount", data.job_amount);
    formData.append("job_pay_advance_amount_fx", data.advance_amount);
    formData.append("job_pay_advance_amount_lx", data.advance_in);
    formData.append("job_pay_remarks", data.jobpay_remarks);
    if (fileAttach) {
      formData.append("job_pay_docs", fileAttach);
    }
    PublicFetch.patch(`${ACCOUNTS}/job-payments/${id}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("single brand value", res);
        if (res.data.success) {
          console.log("success job pay", res.data.data);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    CurrencyData();
    getAllJobs();
    getOneJobPayment();
  }, []);

  const handleCancel = () => {
    navigate(ROUTES.JOB_PAYMENTS);
  };

  const beforeUpload = (file, fileList) => {};
  return (
    <>
      <div className="container-fluid">
        <Form
          name="addForm"
          form={editForm}
          onFinish={(values) => {
            console.log("values111333", values);
            EditJobPayment(values);
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row pt-2">
            <h5 className="lead_text">Edit Job Payment</h5>
          </div>
          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Basic Info</h5>
            </div>
            <div className="col-sm-3 pt-3">
              <label>Voucher No.</label>
              <Form.Item name="voucher_no">
                <InputType disabled />
              </Form.Item>
            </div>
            <div className="col-sm-3 pt-3">
              <label>Voucher Date</label>
              <Form.Item
                className="mt-2"
                name="voucher_date"
                // onChange={(e) => setName(e.target.value)}
              >
                <DatePicker
                  format={"DD-MM-YYYY"}
                  // value={selectedDate}
                  // onChange={(e) => {
                  //   setSelectedDate(e);
                  // }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-3 pt-3">
              <label>Job No.</label>
              <Form.Item
                name="job_no"
                // onChange={(e) => setName(e.target.value)}
              >
                <SelectBox
                  disabled
                  onChange={(e) => {
                    // handleJobNo(e);
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
            <div className="col-sm-3 pt-3">
              <label>Lead</label>
              <Form.Item
                name="jobpay_lead"
                // onChange={(e) => setName(e.target.value)}
              >
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
              <Form.Item
                name="job_currency"
                // onChange={(e) => setName(e.target.value)}
              >
                <InputType disabled />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Exchange Rate</label>
              <Form.Item
                name="exchange_rate"
                onChange={(e) => setJobExchangeRate(e.target.value)}
              >
                <Input_Number
                  className="text_right"
                  align="right"
                  precision={2}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Job Amount</label>
              <Form.Item
                name="job_amount"
                // onChange={(e) => setName(e.target.value)}
              >
                <InputNumber
                  disabled
                  className="text_right"
                  align="right"
                  precision={2}
                />
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
                  precision={2}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>
                Advance in <span>({currencyDefault})</span>
              </label>
              <Form.Item
                name="advance_in"
                // onChange={(e) => setName(e.target.value)}
              >
                <Input_Number
                  disabled
                  className="text_right"
                  align="right"
                  precision={2}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Attachments</h5>
            </div>
            <div className="col-sm-6 pt-3">
              <label>Remarks</label>
              <Form.Item
                name="jobpay_remarks"
                // onChange={(e) => setName(e.target.value)}
              >
                <TextArea />
              </Form.Item>
            </div>
            <div className="col-sm-6 mt-2 mb-4">
              <label>Attachments</label>
              <Form.Item name="job_docs" className="mt-2">
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
                    Upload Image size between 1 kb and 500 kb
                  </p>
                ) : (
                  ""
                )}
              </Form.Item>
              {/* <p className="mt-4" style={{ color: "#737576" }}>
                    {jobPayData?.job_pay_docs}
                  </p> */}
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center mt-4 mb-1 gap-3">
            <Button className="save_button">Save</Button>{" "}
            <Button
              as="input"
              type="reset"
              value="Reset"
              onClick={() => {
                handleCancel();
              }}
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
    </>
  );
}
