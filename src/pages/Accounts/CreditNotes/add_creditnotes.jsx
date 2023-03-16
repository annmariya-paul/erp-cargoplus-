import { Select } from "antd";
import { Checkbox, Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import PublicFetch from "../../../utils/PublicFetch";
import { ACCOUNTS, CRM_BASE_URL, CRM_BASE_URL_FMS } from "../../../api/bootapi";
import Button from "../../../components/button/button";
import { DatePicker } from "antd";
import CustomModel from "../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../components/error/ErrorMessage";
import FileUpload from "../../../components/fileupload/fileUploader";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { TreeSelect } from "antd";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import moment from "moment";
import { ROUTES } from "../../../routes";
import Input_Number from "../../../components/InputNumber/InputNumber";
// import { type } from "@testing-library/user-event/dist/type";
function Addcredit_notes() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [addForm] = Form.useForm();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [allcustomer, setAllCustomer] = useState();
  const [customerid, setcustomerid] = useState("");
  const newDate = new Date();
  const [invoiceno, setinvoiceno] = useState();
  const [invoiceamount, setinvoiceamount] = useState();
  const [amount, setAmount] = useState();
  const [alltypes, setalltypes] = useState();
  const [particulars, setparticulars] = useState();
  const [allinvoiceno, setallinvoiceno] = useState();
  const [dueamount, setdueamount] = useState();
  const [alltypesname, setalltypesname] = useState("");
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.PRODUCT);
      }, time);
    }
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const creditnote = async () => {
    try {
      const addcreditnote = await PublicFetch.post(`${ACCOUNTS}/credit-note`, {
        credit_note_date: date,
        credit_note_amount: amount,
        credit_note_type_id: alltypes,
        credit_note_lead_id: customerid,
        credit_note_particulars: particulars,
      });
      console.log("credit notes added successfully", addcreditnote);
    } catch (err) {
      console.log("err to add the credit notes", err);
    }
  };
  const GetAllLeadData = async () => {
    try {
      const getalllead = await PublicFetch.get(`${CRM_BASE_URL}/lead/Minimal`);
      console.log("response", getalllead);
      if (getalllead?.data.success) {
        setAllCustomer(getalllead?.data?.data);

        setcustomerid(getalllead?.data?.data.lead_id);
        console.log("idddsss", getalllead?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const getAllInvoices = async() => {
  //   try{
  //     const getinvoice= await PublicFetch.get(`${CRM_BASE_URL_FMS}/invoice`,)
  //     console.log("response", getinvoice);
  //     if(getinvoice?.data.success){
  //       setallinvoiceno(getinvoice?.data?.data)
  //       setinvoiceno(getinvoice?.data?.data.lead_id)
  //       console.log("oosss",getinvoice?.data?.data)
  //     }
  //    }catch(err){
  //       console.log(err);
  //     }
  // }
  const getAllInvoices = async () => {
    try {
      const getinvoice = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/invoice`
      );
      console.log("rese", getinvoice);
      if (getinvoice?.data.success) {
        setallinvoiceno(getinvoice?.data?.data);
        setinvoiceno(getinvoice?.data?.data.lead_id);
        console.log("oosss", getinvoice?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const gettypes = async () => {
    try {
      const gettype = await PublicFetch.get(`${ACCOUNTS}/credit-note-type`);
      console.log("response", gettype);
      if (gettype?.data.success) {
        setalltypes(gettype?.data?.data);
        alltypesname(gettype?.data?.data.lead_id);
        console.log("dds", gettype?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getonelead = async(data) => {
    console.log("dtaa",data);
    try{
      const getlead = await PublicFetch.get(`${CRM_BASE_URL}/lead/${data}`);
    }catch(err){
      console.log(err);
    }



  }
  useEffect(() => {
    GetAllLeadData();
    getAllInvoices();
    gettypes();
  }, []);
  return (
    <div>
      <div className="container-fluid lead_list my-1 px-4">
        <div>
          <div className="row">
            <div className="col mt-4">
              <h5 className="lead_text">Add Credit Notes</h5>
            </div>
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("valssss", value);
                creditnote();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-2">
                <div className="col-xl-4 col-sm-12 mt-2">
                  <label>Date</label>
                  <Form.Item
                    name="creditnote_date"
                    className="mt-2"
                    rules={[
                      {
                        required: true,
                        message: "Date is Required",
                      },
                    ]}
                  >
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      defaultValue={moment(newDate)}
                      value={date}
                      onChange={(e) => {
                        setDate(e);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-4 col-sm-12">
                  <label>Customer</label>
                  <Form.Item
                    className="mt-2"
                    name="customer"
                    rules={[
                      {
                        required: true,
                        message: "Customer is Required",
                      },
                    ]}
                  >
                    <SelectBox
                      showSearch={true}
                      allowClear
                      value={customerid}
                      optionFilterProp="children"
                      onChange={(e) => {
                        setcustomerid(e);
                        getonelead(e)
                      }}
                    >
                      {allcustomer &&
                        allcustomer.length > 0 &&
                        allcustomer.map((item, index) => {
                          console.log("itm", item);
                          return (
                            <Select.Option
                              key={item.lead_id}
                              id={item.lead_id}
                              value={item.lead_id}
                            >
                              {item.lead_customer_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-xl-4 col-sm-12">
                  <label>Invoice No</label>
                  <Form.Item name="invoiceno">
                    <SelectBox
                      showSearch={true}
                      allowClear
                      value={invoiceno}
                      optionFilterProp="children"
                      onChange={(e) => {
                        setinvoiceno(e);
                      }}
                    >
                      {allinvoiceno &&
                        allinvoiceno.length > 0 &&
                        allinvoiceno.map((item, index) => {
                          console.log("mmm", item);
                          return (
                            <Select.Option
                              key={item.invoice_id}
                              id={item.invoice_id}
                              value={item.invoice_id}
                            >
                              {item.invoice_no}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-xl-6 col-sm-12 mt-2">
                  <label>Invoice Amount</label>
                  <Form.Item name="invoiceamount">
                    <Input_Number
                      value={invoiceamount}
                      onChange={(value) => {
                        setinvoiceamount(value);
                      }}
                      min={0}
                      precision={2}
                      control={true}
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-6 col-sm-12 mt-2">
                  <label>Due Amount</label>
                  <Form.Item name="dueamount">
                    <Input_Number
                      value={dueamount}
                      onChange={(value) => {
                        setdueamount(value);
                      }}
                      min={0}
                      precision={2}
                      control={true}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-sm-12 mt-2">
                  <label>Particulars</label>
                  <Form.Item
                    className="mt-2"
                    name="particulars"
                    onChange={(e) => {
                      setparticulars(e.target.value);
                      // console.log("name name",name);
                    }}
                    rules={[
                      {
                        min: 2,
                        message: "Description must be at least 2 characters",
                      },
                      {
                        max: 500,
                        message:
                          "Description cannot be longer than 500 characters",
                      },
                    ]}
                  >
                    <TextArea
                      value={particulars}
                      onChange={(e) => {
                        setparticulars(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-6 col-sm-12 mt-2">
                  <label>Type</label>
                  <Form.Item className="mt-2" name="type">
                    <SelectBox
                      showSearch={true}
                      allowClear
                      value={alltypes}
                      optionFilterProp="children"
                      onChange={(e) => {
                        setalltypesname(e);
                      }}
                    >
                      {alltypes &&
                        alltypes.length > 0 &&
                        alltypes.map((item, index) => {
                          console.log("lll", item);
                          return (
                            <Select.Option
                              key={item.credit_note_type_id}
                              id={item.credit_note_type_id}
                              value={item.credit_note_type_id}
                            >
                              {item.credit_note_type_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                  <label>Amount</label>
                  <Form.Item name="amount">
                    <InputType
                      value={amount}
                      onChange={(e) => {
                        setAmount(e);
                      }}
                      min={0}
                      precision={2}
                      control={true}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="col-12 d-flex justify-content-center pt-2 mt-2">
                <Button className="save_button">Save</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {error ? <ErrorMsg code={"500"} /> : ""}
    </div>
  );
}

export default Addcredit_notes;
