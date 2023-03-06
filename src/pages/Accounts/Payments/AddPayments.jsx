import React, { useState } from "react";
import "./AddPayments.styles.scss";
import { Checkbox, DatePicker, Form, InputNumber, Select } from "antd";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import Input_Number from "../../../components/InputNumber/InputNumber";
import SelectBox from "../../../components/Select Box/SelectBox";
import TableData from "../../../components/table/table_data";

const AddPayments = () => {
  const [amount, setAmount] = useState();
  const [autoPay, setAutoPay] = useState(false);
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
                onChange={(e) => {
                  console.log(e);
                }}
                width={100}
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
                        <SelectBox>
                          <Select.Option>Lead 1</Select.Option>
                          <Select.Option>Lead 2</Select.Option>
                          <Select.Option>Lead 3</Select.Option>
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
                          <Select.Option>Mode 1</Select.Option>
                          <Select.Option>Mode 2</Select.Option>
                          <Select.Option>Mode 3</Select.Option>
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
                      <TableData data={data} columns={columns} />
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
