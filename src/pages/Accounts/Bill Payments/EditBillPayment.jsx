import { DatePicker, Form, Select } from "antd";
import React from "react";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import Input_Number from "../../../components/InputNumber/InputNumber";
import SelectBox from "../../../components/Select Box/SelectBox";
import TableData from "../../../components/table/table_data";

function EditBillPayment() {
  const columns = [
    {
      title: "Sl no",
      dataIndex: "slno",
      key: "slno",
      align: "right",
    },
    {
      title: "BILL NO",
      dataIndex: "bill_no",
      key: "bill_no",
    },
    {
      title: "CURRENCY",
      dataIndex: "currency",
      key: "currency",
      align: "center",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      align: "right",
    },
    {
      title: "AMOUNT(KWD)",
      dataIndex: "amountlx",
      key: "amountlx",
      align: "right",
    },
  ];
  const data = [
    {
      slno: 1,
      bill_no: "BILL0001",
      currency: "Indian Rupee",
      amount: 1000,
      amountlx: 2000,
    },
  ];
  return (
    <div className="container-fluid container_agent_report p-4">
      <div className="">
        <h4 className="lead_text">Bill Payment</h4>
      </div>
      <Form>
        <div className="row container_agent_report p-2 my-4">
          <div className="col-12 p-2">
            <h5 className="lead_text">Basic Info</h5>
          </div>
          <div className="col-4 my-2">
            <label>Voucher No</label>
            <Form.Item>
              <SelectBox>
                <Select.Option>Test</Select.Option>
              </SelectBox>
            </Form.Item>
          </div>
          <div className="col-4 my-2">
            <label className="mb-2">Date</label>
            <Form.Item>
              <DatePicker />
            </Form.Item>
          </div>
          <div className="col-4 my-2">
            <label>Vendor</label>
            <Form.Item>
              <SelectBox>
                <Select.Option>Test</Select.Option>
              </SelectBox>
            </Form.Item>
          </div>
        </div>
        <div className="row container_agent_report p-2 my-3">
          <div className="col-12">
            <h5 className="lead_text">Bill Details</h5>
          </div>
          <div className="col-12">
            <TableData columns={columns} data={data} />
          </div>
          <div className="col-6"></div>
          <div className="col-6 my-3">
            <div className="d-flex justify-content-center align-items-center gap-3">
              <label>Grand Total :</label>
              {/* <lable>:</lable> */}
              <label>2000</label>
            </div>
          </div>
        </div>
        <div className="row container_agent_report p-2 my-3">
          <div className="col-12 p-3">
            <h5 className="lead_text">Payment Details</h5>
          </div>
          <div className="col-3 my-3">
            <label>Payment Mode</label>
            <Form.Item>
              <SelectBox>
                <Select.Option>Test</Select.Option>
              </SelectBox>
            </Form.Item>
          </div>
          <div className="col-3 my-3">
            <label>Currency</label>
            <Form.Item>
              <SelectBox>
                <Select.Option>Test</Select.Option>
              </SelectBox>
            </Form.Item>
          </div>
          <div className="col-3 my-3">
            <label>Exchange</label>
            <Form.Item>
              <Input_Number />
            </Form.Item>
          </div>
          <div className="col-3 my-3">
            <label>Amount</label>
            <Form.Item>
              <Input_Number />
            </Form.Item>
          </div>
          <div className="col-6 my-3">
            <label>Remarks</label>
            <Form.Item>
              <TextArea />
            </Form.Item>
          </div>
          <div className="col-6 my-3">
            <label>Attachment</label>
            <Form.Item>
              <FileUpload />
            </Form.Item>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-12 d-flex justify-content-center">
            <Button btnType="save">Save</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditBillPayment;
