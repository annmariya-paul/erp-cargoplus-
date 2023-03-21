import { Select } from "antd";
import React, { useState, useEffect } from "react";
import Button from "../../../components/button/button";
import { DatePicker } from "antd";
import CustomModel from "../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../components/error/ErrorMessage";
import { Form } from "antd";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import moment from "moment";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import { ROUTES } from "../../../routes";
import Input_Number from "../../../components/InputNumber/InputNumber";
import PublicFetch from "../../../utils/PublicFetch";
import { ACCOUNTS } from "../../../api/bootapi";
import { useNavigate, useParams } from "react-router-dom";
import { CRM_BASE_URL, CRM_BASE_URL_FMS } from "../../../api/bootapi";

function Editcredit_notes() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);
  const [editForm] = Form.useForm();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [date, setDate] = useState("");
  const newDate = new Date();
  const [editnote, setEditnote] = useState("");
  const [customerid, setcustomerid] = useState("");
  const [allcustomer, setAllCustomer] = useState();
  const [invoiceno, setinvoiceno] = useState();
  const [invoiceamount, setinvoiceamount] = useState();
  const [amount, setAmount] = useState();
  const [alltypes, setalltypes] = useState();
  const [particulars, setparticulars] = useState();
  const [allinvoiceno, setallinvoiceno] = useState();
  const [dueamount, setdueamount] = useState();
  const [alltypesname, setalltypesname] = useState("");
  const [credit_note_id, setcredit_note_id] = useState("");
  const { id } = useParams();
  const [viewcreditnote, setviewcreditnote] = useState("");
  const getData = (current, pageSize) => {
    return editnote?.slice((current - 1) * pageSize, current * pageSize);
  };
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.PRODUCT);
      }, time);
    }
  };
  const getonelead = async (data) => {
    console.log("dtaa", data);
    try {
      const getlead = await PublicFetch.get(`${CRM_BASE_URL}/lead/${data}`);
      console.log("repose", getlead);
      if (getlead?.data.success) {
        let temp = [];
        getlead?.data?.data?.fms_v1_jobs?.forEach((item, index) => {
          item?.accounts_v1_invoice_accounts.forEach((invoice, inindex) => {
            temp.push(invoice);
          });

          console.log("ghdgh", temp);
        });
        setallinvoiceno(temp);

        console.log("dds", getlead?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllInvoices = async () => {
    try {
      const getinvoice = await PublicFetch.get(`${CRM_BASE_URL_FMS}/invoice`);
      console.log("rese", getinvoice);
      if (getinvoice?.data.success) {
        // setallinvoiceno(getinvoice?.data?.data);
        // setinvoiceno(getinvoice?.data?.data.lead_id);
        console.log("oosss", getinvoice?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const gettypes = async () => {
    try {
      const gettype = await PublicFetch.get(`${ACCOUNTS}/credit-note-type`);
      console.log("rese", gettype);
      if (gettype?.data.success) {
        setalltypes(gettype?.data?.data);
        // alltypesname(gettype?.data?.data.lead_id);
        console.log("dds", gettype?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getsingleCreditnote = () => {
    PublicFetch.get(`${ACCOUNTS}/credit-note/${id}`)
      .then((res) => {
        console.log("reserr", res);
        if (res.data.success) {
          console.log("sscc", res.data.success);
          let date = moment(res.data.data.credit_note_date);

          setviewcreditnote(res?.data?.data);
          editForm.setFieldsValue({
            credit_note_voucher_no: res.data.data.credit_note_voucher_no,
            credit_note_date: date,
            credit_note_amount: res.data.data.credit_note_amount,
            credit_note_type_id: res.data.data.credit_note_type_id,
            credit_note_particulars: res.data.data.credit_note_particulars,
            // credit_note_voucher_no:res.data.data.credit_note_voucher_no,
            // credit_note_voucher_no:res.data.data.credit_note_voucher_no,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleUpdate = async (data) => {
    console.log("ssssdd", data);

    try {
      const updated = await PublicFetch.patch(`${ACCOUNTS}/credit-note/${id}`, {
        credit_note_amount: data.credit_note_amount,
        credit_note_particulars: data.credit_note_particulars,
      });
      console.log("successfully updated.... ", updated);
      if (updated.data.success) {
        setSuccessPopup(true);
        // setPaymentEditPopup(false);
        // getnotes();
        getsingleCreditnote();

        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("error to update payment", err);
    }
  };
  useEffect(() => {
    if (id) {
      getsingleCreditnote();
      gettypes();
      getAllInvoices();
      getonelead();
    }
  }, [id]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  return (
    <div>
      <div className="container-fluid lead_list my-1 px-4">
        <div>
          <div className="row">
            <div className="col mt-4">
              <h5 className="lead_text">Edit Credit Notes</h5>
            </div>
            <Form
              name="editForm"
              form={editForm}
              onFinish={(value) => {
                console.log("vlzzz", value);
                handleUpdate();
                // console.log("");
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-2">
                <div className="col-xl-4 col-sm-12">
                  <label>Voucher No</label>
                  <Form.Item name="credit_note_voucher_no">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-xl-4 col-sm-12">
                  <label>Date</label>
                  <Form.Item
                    name="credit_note_date"
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
                    name="credit_note_lead_id"
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
                        gettypes(e);
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
                      // value={invoiceno}
                      optionFilterProp="children"
                      onChange={(e) => {
                        getAllInvoices(e);
                      }}
                    >
                      {allinvoiceno &&
                        allinvoiceno.length > 0 &&
                        allinvoiceno.map((item, index) => {
                          console.log("mmm", item);
                          return (
                            <Select.Option
                              key={item.invoice_accounts_invoice_id}
                              id={item.invoice_accounts_invoice_id}
                              value={item.invoice_accounts_invoice_id}
                            >
                              {item.invoice_accounts_no}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-xl-4 col-sm-12 mt-2">
                  <label>Invoice Amount</label>
                  <Form.Item name="credit_note_amount">
                    <Input_Number
                      value={invoiceamount}
                      // onChange={(value) => {
                      //   setinvoiceamount(value);
                      // }}
                      min={0}
                      precision={2}
                      control={true}
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-4 col-sm-12 mt-2">
                  <label>Due Amount</label>
                  <Form.Item name="credit_note_dueamount">
                    <Input_Number
                      value={dueamount}
                      // onChange={(value) => {
                      //   setdueamount(value);
                      // }}
                      min={0}
                      precision={2}
                      control={true}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-8 col-sm-12 mt-2">
                  <label>Particulars</label>
                  <Form.Item
                    className="mt-2"
                    name="credit_note_particulars"
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
                        //  console.log("particulars",particulars);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-4 col-sm-12 mt-2">
                  <label>Type</label>
                  <Form.Item className="mt-2" name="credit_note_type_id">
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
                  <Form.Item name="credit_note_amount">
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
export default Editcredit_notes;
