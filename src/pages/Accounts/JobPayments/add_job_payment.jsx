import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Select, DatePicker } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import {
  CRM_BASE_URL_FMS,
  CRM_BASE_URL_SELLING,
  GENERAL_SETTING_BASE_URL,
} from "../../../api/bootapi";
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

export default function AddJobPayments () {
  const [addForm] = Form.useForm();
  const [successPopup, setSuccessPopup] = useState(false);
  const [currencyDefault,setCurrencyDefault] = useState();
  const [allCurrency, setAllCurrency] = useState();
  const [jobCount,setJobCount] = useState();

  const navigate = useNavigate();
  const newDate = new Date();

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

  let cur_code;
  const getCurrencyRate = (data) => {
    const code = allCurrency?.filter((item) => {
      if (item?.currency_id === data) {
        cur_code = item?.currency_code;
      }
    });
    axios
      .get(`https://open.er-api.com/v6/latest/${currencyDefault}`)
      .then(function (response) {
        console.log("currency current rate:", response);
        let a = response.data.rates[cur_code];
        // setCurrencyRates(a);
        addForm.setFieldValue("exchnagerate", a);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

   const getAllJobs = () => {
     PublicFetch.get(`${CRM_BASE_URL_FMS}/job?startIndex=0&noOfItems=10`)
       .then((res) => {
         if (res.data.success) {
           setJobCount(res.data.data);
         } else {
           console.log("Failed to load data");
         }
       })
       .catch((err) => {
         console.log("Error", err);
       });
   };

   useEffect(() => {
     CurrencyData();
     getAllJobs();
   }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="content-tabs" style={{ maxHeight: "1000px" }}>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("values111333", value);
                // OnSubmit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row px-3 pt-4">
                <div>
                  <h5 className="lead_text">Add Job Payment</h5>
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
                      defaultValue={moment(newDate)}
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
                    <SelectBox>
                      <Select.Option>test 1</Select.Option>
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-sm-3 pt-3">
                  <label>Lead</label>
                  <Form.Item
                    name="lead"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <InputType disabled />
                  </Form.Item>
                </div>
                <div className="col-sm-3 pt-3">
                  <label>Currency</label>
                  <Form.Item
                    name="job_currency"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <InputType disabled />
                  </Form.Item>
                </div>
                <div className="col-sm-3 pt-3">
                  <label>Exchange Rate</label>
                  <Form.Item
                    name="exchange_rate"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <Input_Number />
                  </Form.Item>
                </div>
                <div className="col-sm-3 pt-3">
                  <label>Job Amount</label>
                  <Form.Item
                    name="job_amount"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <InputNumber />
                  </Form.Item>
                </div>
                <div className="col-sm-3 pt-3">
                  <label>Advance Amount</label>
                  <Form.Item
                    name="advance_amount"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <Input_Number />
                  </Form.Item>
                </div>
                <div className="col-sm-3 pt-3">
                  <label>
                    Advance in <span>({currencyDefault})</span>
                  </label>
                  <Form.Item
                    name="advance_amount"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <Input_Number />
                  </Form.Item>
                </div>
                <div className="col-sm-6 pt-2">
                  <label className="mb-2">Remarks</label>
                  <Form.Item
                    name="advance_amount"
                    // onChange={(e) => setName(e.target.value)}
                  >
                    <TextArea />
                  </Form.Item>
                </div>
                <div className="col-6 mt-2">
                  <label>Display Picture</label>
                  <Form.Item name="new" className="mt-2">
                    <FileUpload
                      multiple
                      listType="picture"
                      accept=".png,.jpeg"
                      height={100}
                      // beforeUpload={beforeUpload}
                      onChange={(file) => {
                        console.log("Before upload file size", file.file.size);
                        if (file.file.size > 2000 && file.file.size < 500000) {
                          // setImg(file.file.originFileObj);
                          // setImageSize(false);
                          console.log("select imaggg", file.file.originFileObj);
                          console.log(
                            "image is greater than 2 kb and less than 500 kb"
                          );
                        } else {
                          // setImageSize(true);
                          console.log("Error in image upload");
                        }
                      }}
                    />
                    {/* {imageSize ? (
                      <p style={{ color: "red" }}>
                        Upload Image size between 1 kb and 500 kb
                      </p>
                    ) : (
                      ""
                    )} */}
                  </Form.Item>
                </div>
                <div className="col-12 d-flex justify-content-center mt-5 pt-4 gap-3 ">
                  <Button btnType="save" className="save_button">Save</Button>{" "}
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
              </div>
            </Form>
          </div>
        </div>
        <Custom_model
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </div>
    </>
  );
};

