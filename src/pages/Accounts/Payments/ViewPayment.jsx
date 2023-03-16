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
import moment from "moment";

const ViewPayment = () => {
  const [autoPay, setAutoPay] = useState(false);
  const { payment_id } = useParams();
  const [singlePayment, setSinglePayment] = useState({
    voucher_no: "",
    voucher_date: "",
    lead: "",
    amount: "",
    mode: "",
    details: "",
  });

  const [voucherNo, setVoucherNo] = useState();
  const [voucherDate, setVoucherDate] = useState();
  const [lead, setLead] = useState();
  const [amount, setAmount] = useState();
  const [mode, setMode] = useState();
  const [details, setDetails] = useState();
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
    // {
    //   title: "Current Amount",
    //   dataIndex: "current_amount",
    //   key: "current_amount",
    //   width: "20%",
    //   align: "center",
    //   render: (data, index) => {
    //     console.log("index is :", index);
    //     return (
    //       <div
    //         className="d-flex justify-content-center align-items-center tborder "
    //         key={index.index}
    //       >
    //         <Form.Item
    //         //name={["quotation_details", index.key, "quotation_details_cost"]}
    //         // name={`current_amount${index.key}`}
    //         >
    //           <InputNumber
    //             onChange={(e) => {
    //               console.log(e);
    //             }}
    //             width={100}
    //           />
    //         </Form.Item>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Balance Amount",
    //   dataIndex: "balance_amount",
    //   key: "balance_amount",
    //   width: "12%",
    //   align: "center",
    // },
  ];

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

  useEffect(() => {
    getPaymentDetails();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading">
              <h2 style={{ color: "#0891d1" }}>View Payment</h2>
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
                {/* <Form> */}
                <div className="row ">
                  <div className="col-xl-4  my-2">
                    <label>Voucher No : {voucherNo}</label>
                    <div></div>
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
                    <div></div>
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
                    <div></div>
                  </div>
                  <div className="col-xl-4 my-2">
                    <label>Amount : {amount}</label>
                    <div></div>
                    {/* <Form.Item
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
                    </Form.Item> */}
                  </div>
                  <div className="col-xl-4 my-2">
                    <label>Mode : {mode}</label>
                    <div></div>
                    {/* <Form.Item>
                      <SelectBox>
                        <Select.Option>Mode 1</Select.Option>
                        <Select.Option>Mode 2</Select.Option>
                        <Select.Option>Mode 3</Select.Option>
                      </SelectBox>
                    </Form.Item> */}
                  </div>
                  {/* <div className="col-xl-4 my-2">
                    <label>Auto Pay(Bill to Bill)</label>
                    <Form.Item>
                      <Checkbox
                        onChange={(e) => {
                          console.log(e.target);
                          setAutoPay(e.target.checked);
                        }}
                      />
                    </Form.Item>
                  </div> */}
                  <div className="col-12 my-2">
                    <label>Details</label>
                    <div>{details}</div>

                    {/* <Form.Item>
                      <TextArea />
                    </Form.Item> */}
                  </div>

                  <div className="col-12 my-2">
                    <label>
                      <strong>Invoice details</strong>{" "}
                    </label>
                    <TableData data={invoiceData} columns={columns} />
                  </div>
                  <div className="col-xl-4"></div>

                  <div className="col-xl-4"></div>
                  {/* <div className="col-12 d-flex justify-content-center my-4 pt-2">
                    <Button btnType="save" type="submit">
                      Save
                    </Button>
                    <Button btnType="save" type="" className="ms-2">
                      Cancel
                    </Button>
                  </div> */}
                </div>
                {/* </Form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPayment;
