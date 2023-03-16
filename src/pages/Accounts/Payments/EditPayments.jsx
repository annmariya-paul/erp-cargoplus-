import React, { useState, useEffect } from "react";
// import "./AddPayments.styles.scss";
import { Checkbox, DatePicker, Form, InputNumber, Select } from "antd";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import Input_Number from "../../../components/InputNumber/InputNumber";
import SelectBox from "../../../components/Select Box/SelectBox";
import TableData from "../../../components/table/table_data";
import PublicFetch from "../../../utils/PublicFetch";
import { ACCOUNTS, CRM_BASE_URL_FMS } from "../../../api/bootapi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ROUTES } from "../../../routes";

const EditPayments = () => {
  const navigate = useNavigate();
  const [editForm] = Form.useForm();
  const [successPopup, setSuccessPopup] = useState(false);
  const [autoPay, setAutoPay] = useState(false);
  const [voucherNo, setVoucherNo] = useState();
  const [voucherDate, setVoucherDate] = useState();
  const [lead, setLead] = useState();
  const [amount, setAmount] = useState();
  const [mode, setMode] = useState();
  const [details, setDetails] = useState();
  const [paymentModes, setPaymentModes] = useState([]);
  const { payment_id } = useParams();
  const [invoiceData, setInvoiceData] = useState([]);
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "index",
      key: "index",
      width: "5%",
      align: "center",
    },
    {
      title: "Invoice No",
      dataIndex: "invoice_no",
      key: "invoice_no",
      width: "9%",
      align: "center",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      width: "6%",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "18%",
      align: "center",
    },
    {
      title: "Due Amount",
      dataIndex: "due_amount",
      key: "due_amount",
      width: "15%",
      align: "center",
    },
    {
      title: "Current Amount",
      dataIndex: "current_amount",
      key: "current_amount",
      width: "20%",
      align: "center",
      render: (data, index) => {
        if (autoPay) {
          return <div>{data}</div>;
        } else if (!autoPay && amount) {
          return (
            <div
              className="d-flex justify-content-center align-items-center tborder "
              key={index.index}
            >
              <Form.Item
              //name={["quotation_details", index.key, "quotation_details_cost"]}
              // name={`current_amount${index.key}`}
              // name="invoiceData"
              >
                <InputNumber
                  className="add_payments_input_box"
                  onChange={(e) => {
                    console.log("index", index);
                    console.log("inside input number table");
                    console.log(e);
                    let due_amount = parseFloat(index.due_amount);
                    let balance_amount = due_amount - parseFloat(e);
                    index.balance_amount = balance_amount;
                    index.current_amount = e;
                    console.log("new index", index);
                    let temp = [...invoiceData];
                    temp[index.index - 1] = index;
                    console.log("new temp", temp);
                    setInvoiceData([...temp]);
                  }}
                  width={100}
                  controlls={false}
                />
              </Form.Item>
            </div>
          );
        }
      },
    },
    {
      title: "Balance Amount",
      dataIndex: "balance_amount",
      key: "balance_amount",
      width: "12%",
      align: "right",
      render: (data, index) => {
        return <div>{index.balance_amount}</div>;
      },
    },
  ];

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(`${ROUTES.PAYMENTS}`);
      }, time);
    }
  };

  const getPaymentDetails = async () => {
    try {
      const res = await PublicFetch.get(`${ACCOUNTS}/payment/${payment_id}`);
      console.log("here is the response");
      console.log(res);
      if (res?.status === 200) {
        setVoucherNo(res.data.data.payment_voucher_no);
        setAmount(res.data.data.payment_amount);
        setVoucherDate(res.data.data.payment_date);
        setMode(res.data.data.accounts_v1_payment_modes.pay_mode_name);
        setLead(res.data.data.crm_v1_leads.lead_customer_name);
        setDetails(res.data.data.payment_details);
        getInvoice(res.data.data.crm_v1_leads.lead_id);
      }
    } catch (error) {
      console.log("error occured");
    }
  };

  const getInvoice = async (LeadId) => {
    console.log("LeadId", LeadId);
    //setLead(LeadId);
    try {
      const res = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/invoice/${LeadId}`
      );
      console.log(
        "here is the invoice response",
        res.data.data.fms_v1_jobs.accounts_v1_invoice_accounts
      );
      if (res.status === 200) {
        let tempData = [];
        res.data.data.fms_v1_jobs.accounts_v1_invoice_accounts.forEach(
          (item, index) => {
            let obj = {
              index: index + 1,
              invoice_no: item.invoice_accounts_no,
              due_date: moment(new Date(item.invoice_accounts_due_date)).format(
                "DD/MM/YYYY"
              ),
              amount: item.invoice_accounts_grand_total,
              due_amount: item.invoice_accounts_due_amount,
              current_amount: "",
              balance_amount: "",
              invoice_accounts_id: item.invoice_accounts_id,
            };

            tempData.push(obj);
          }
        );
        console.log("here is the temp data", tempData);
        setInvoiceData(tempData);
      }
    } catch (error) {
      console.log("error while fetching invoices");
      console.log(error);
    }
    //const res = await PublicFetch.get(`${CRM_BASE_URL_FMS}`);
  };
  const getPaymentModes = async () => {
    try {
      console.log("inside get payment modes");
      const res = await PublicFetch.get(`${ACCOUNTS}/payment-modes`);
      if (res?.status === 200) {
        console.log("here are payment modes");
        console.log(res.data.data);
        setPaymentModes(res.data.data);
      }
    } catch (error) {
      console.log("error while fetching payment modes");
      console.log(error);
    }
  };

  const saveEditPayment = async (value) => {
    console.log("inside save payment");
    try {
      let invoice_accounts = [];
      for (let i = 0; i < invoiceData.length; i++) {
        if (invoiceData[i].current_amount) {
          console.log("current amount=", invoiceData[i].current_amount);
          let obj = {
            invoice_accounts_invoice_id: invoiceData[i].invoice_accounts_id,
            current_amount: parseFloat(invoiceData[i].current_amount),
            due_amount: parseFloat(invoiceData[i].due_amount),
          };
          invoice_accounts.push(obj);
        }
      }
      const res = await PublicFetch.post(`${ACCOUNTS}/payment`, {
        payment_voucher_no: value.voucherNo,
        payment_date: moment(voucherDate).format("DD/MM/YYYY"),
        payment_pay_mode_id: value.mode,
        payment_lead_id: value.lead,
        payment_amount: parseFloat(value.amount),
        payment_details: value.details,
        payment_autopay: autoPay ? 1 : 0,
        invoice_accounts: invoice_accounts,
      });
      console.log("here is the response after posting", res);
      if (res.status === 201) {
        setSuccessPopup(true);
        close_modal(successPopup, 1200);
      }
    } catch (error) {
      console.log("error occured", error);
    }
  };

  const changeInvoiceTableData = () => {
    console.log("inside change invoice table data");
    console.log("invoice data at start");
    console.log(invoiceData);
    let temp = [...invoiceData];
    let remaining_sum = parseFloat(amount);
    let current_amount = 0;
    let balance_amount = 0;
    let newInvoiceData = [];
    for (let i = 0; i < temp.length; i++) {
      let due_amount = parseFloat(temp[i].due_amount);
      console.log("due amount=", due_amount);
      console.log("balance amount=", balance_amount);
      console.log("remaining sum", remaining_sum);
      if (due_amount <= remaining_sum) {
        current_amount = due_amount;
        balance_amount = 0;
        remaining_sum = remaining_sum - due_amount;
      } else if (due_amount > remaining_sum) {
        current_amount = remaining_sum;
        balance_amount = due_amount - remaining_sum;
        remaining_sum = 0;
      }
      newInvoiceData.push({
        ...temp[i],
        current_amount: current_amount,
        balance_amount: balance_amount.toFixed(2),
      });
      if (remaining_sum == 0) {
        break;
      }
    }
    console.log("new invoice data");
    console.log(newInvoiceData);
    setInvoiceData([
      ...newInvoiceData,
      ...invoiceData.slice(newInvoiceData.length),
    ]);
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);
  useEffect(() => {
    getPaymentModes();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading">
              <h2 style={{ color: "#0891d1" }}>Edit Payment</h2>
            </div>
          </div>
          <div className="col-md-12">
            <div
              style={{
                borderRadius: "8px",
              }}
              className="card border-0 p-3 shadow-sm"
            >
              <div className="container-fluid p-3">
                <Form
                  form={editForm}
                  onFinish={(value) => {
                    saveEditPayment(value);
                  }}
                  onFinishFailed={(value) => {
                    console.log("inside on finish failed", value);
                  }}
                >
                  <div className="row ">
                    <div className="col-xl-4  my-2">
                      <label>Voucher No : {voucherNo}</label>
                      {/* <Form.Item>
                        <InputType />
                      </Form.Item> */}
                    </div>
                    <div className="col-xl-4 my-2">
                      <label className="mb-2">
                        Voucher Date :{" "}
                        {moment(new Date(voucherDate)).format("DD/MM/YYYY")}
                      </label>
                      {/* <Form.Item>
                        <DatePicker />
                      </Form.Item> */}
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Lead : {lead}</label>
                      {/* <Form.Item>
                        <SelectBox>
                          <Select.Option>Lead 1</Select.Option>
                          <Select.Option>Lead 2</Select.Option>
                          <Select.Option>Lead 3</Select.Option>
                        </SelectBox>
                      </Form.Item> */}
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Amount</label>
                      <Form.Item
                        rules={[
                          {
                            pattern: /^[1-9]\d*$/,
                            message: "Should be whole number",
                          },
                        ]}
                        name="amount"
                      >
                        <InputType
                          value={amount}
                          onChange={(e) => {
                            console.log(e.target.value);
                            //setAmount(e.target.value);
                          }}
                          onBlur={() => {
                            if (autoPay) {
                              changeInvoiceTableData();
                            }
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Mode</label>
                      <Form.Item name="mode">
                        <SelectBox
                          value={mode}
                          onChange={(e, key) => {
                            console.log(key);
                            setMode(e);
                          }}
                        >
                          {paymentModes.map((item, index) => {
                            return (
                              <Select.Option
                                value={item.pay_mode_name}
                                key={item.pay_mode_id}
                              >
                                {item.pay_mode_name}
                              </Select.Option>
                            );
                          })}
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Auto Pay(Bill to Bill)</label>
                      <Form.Item name="autopay">
                        <Checkbox
                          onChange={(e) => {
                            console.log(e.target);
                            setAutoPay(e.target.checked);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-12 my-2">
                      <label>Details</label>
                      <Form.Item name="details">
                        <TextArea value={details} />
                      </Form.Item>
                    </div>

                    <div className="col-12 my-2">
                      <label>
                        <strong>Invoice details</strong>{" "}
                      </label>
                      <TableData data={invoiceData} columns={columns} />
                    </div>
                    <div className="col-xl-4"></div>

                    <div className="col-xl-4"></div>
                    <div className="col-12 d-flex justify-content-center my-4 pt-2">
                      <Button btnType="save" type="submit">
                        Save
                      </Button>
                      <Button btnType="save" type="" className="ms-2">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPayments;
