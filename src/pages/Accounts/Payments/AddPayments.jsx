import React, { useState, useEffect } from "react";
import "./AddPayments.scss";
import { Checkbox, DatePicker, Form, InputNumber, Select } from "antd";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import Input_Number from "../../../components/InputNumber/InputNumber";
import SelectBox from "../../../components/Select Box/SelectBox";
import TableData from "../../../components/table/table_data";
import PublicFetch from "../../../utils/PublicFetch";
import { ACCOUNTS, CRM_BASE_URL, CRM_BASE_URL_FMS } from "../../../api/bootapi";
import moment from "moment";

const AddPayments = () => {
  const [amount, setAmount] = useState();
  const [autoPay, setAutoPay] = useState(false);
  const [leads, setLeads] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [lead, setLead] = useState();
  const [paymentModes, setPaymentModes] = useState([]);
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
        console.log("index is :", index);
        return (
          <div
            className="d-flex justify-content-center align-items-center tborder "
            key={index.index}
          >
            <Form.Item
            //name={["quotation_details", index.key, "quotation_details_cost"]}
            // name={`current_amount${index.key}`}
            >
              <InputNumber
                className="add_payments_input_box"
                onChange={(e) => {
                  console.log(e);
                }}
                width={100}
                controlls={false}
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Balance Amount",
      dataIndex: "balance_amount",
      key: "balance_amount",
      width: "12%",
      align: "center",
    },
  ];

  const data = [
    {
      index: "1",
      invoice_no: "INV/0001",
      due_date: "5/3/2023",
      amount: "1000.00",
      due_amount: "600.00",

      // current_amount: "600.00",
      balance_amount: "0.00",
    },
    {
      index: "2",
      invoice_no: "INV/0002",
      due_date: "6/3/2023",
      amount: "5000.00",
      due_amount: "4000.00",
      align: "center",
      //  current_amount: "10 00.00",
      balance_amount: "3000.00",
    },
    {
      index: "3",
      invoice_no: "INV/0003",
      due_date: "10/3/2023",
      amount: "8000.00",
      due_amount: "8000.00",
      //  current_amount: " ",
      balance_amount: "8000.00",
    },
  ];

  const getAllLeads = async () => {
    try {
      const res = await PublicFetch.get(
        `${CRM_BASE_URL}/lead?startIndex=0&noOfItems=25`
      );
      console.log("here is the response");
      console.log(res);
      if (res?.status === 200) {
        setLeads(res.data.data.leads);
      }
    } catch (error) {
      console.log("error occured");
      console.log(error);
    }
  };

  const getInvoice = async (value) => {
    console.log("value", value);
    try {
      const res = await PublicFetch.get(`${CRM_BASE_URL_FMS}/invoice/${value}`);
      if (res.status === 200) {
        let tempData = [];
        res.data.data.fms_v1_jobs.accounts_v1_invoice_accounts.forEach(
          (item, index) => {
            let obj = {
              index: index,
              invoice_no: item.invoice_accounts_no,
              due_date: moment(new Date(item.invoice_accounts_due_date)).format(
                "DD/MM/YYYY"
              ),
              amount: item.invoice_accounts_due_amount,
              invoice_accounts_id: item.invoice_accounts_id,
            };
            tempData.push(obj);
          }
        );
        setInvoiceData(tempData);
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log("error while fetching invoices");
      console.log(error);
    }
    //const res = await PublicFetch.get(`${CRM_BASE_URL_FMS}`);
  };
  const getPaymentModes = async () => {
    try {
      const res = await PublicFetch.get(`${ACCOUNTS}/payment-modes`);
      if (res?.status === 200) {
        console.log("here are payment modes");
        console.log(res.data);
        setPaymentModes(res.data.data);
      }
    } catch (error) {
      console.log("error while fetching payment modes");
      console.log(error);
    }
  };
  useEffect(() => {
    getAllLeads();
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
              <h2 style={{ color: "#0891d1" }}>Add Payment</h2>
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
                <Form>
                  <div className="row ">
                    <div className="col-xl-4  my-2">
                      <label>Voucher No</label>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label className="mb-2">Voucher Date</label>
                      <Form.Item>
                        <DatePicker />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Lead</label>
                      <Form.Item>
                        <SelectBox onChange={getInvoice}>
                          {leads.map((item, index) => {
                            return (
                              <Select.Option value={item.lead_id}>
                                {item.lead_customer_name}
                              </Select.Option>
                            );
                          })}
                        </SelectBox>
                      </Form.Item>
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
                      >
                        <InputType
                          onChange={(e) => {
                            console.log(e.target.value);
                            //setAmount(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Mode</label>
                      <Form.Item>
                        <SelectBox>
                          {paymentModes.map((item, index) => {
                            return (
                              <Select.Option value={item.pay_mode_id}>
                                {item.pay_mode_name}
                              </Select.Option>
                            );
                          })}
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Auto Pay(Bill to Bill)</label>
                      <Form.Item>
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
                      <Form.Item>
                        <TextArea />
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

export default AddPayments;
