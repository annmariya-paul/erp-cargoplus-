import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { useForm } from "react-hook-form";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import Button from "../../../../components/button/button";
import Input_Number from "../../../../components/InputNumber/InputNumber";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import FileUpload from "../../../../components/fileupload/fileUploader";
import TableData from "../../../../components/table/table_data";

export default function CreatePurchase() {
const [serialNo, setserialNo] = useState(1);

 const columns = [
   {
     title: "Sl. No.",
     key: "index",
     width: "8%",
     render: (value, item, index) => serialNo + index,
     align: "center",
   },
   {
     title: "AWB/BL",
     dataIndex: "awb_bl",
     key: "awb_bl",
     width: "20%",
     render: (data, index) => {
       console.log("index is :", index);
       return (
         <div className="d-flex justify-content-center align-items-center tborder ">
           <InputType />
         </div>
       );
     },
   },
   {
     title: "JOB NO",
     dataIndex: "job_no",
     key: "job_no",
     width: "20%",
   },
   {
     title: "AMOUNT",
     dataIndex: "amount",
     key: "amount",
     align: "right",
     width: "20%",
     render: (data, index) => {
       return (
         <div className="d-flex justify-content-center align-items-center tborder ">
           <Input_Number />
         </div>
       );
     },
   },
 ];

 const data = [
   {
     awb_bl: "",
     job_no: "JAir-00002",
   },
 ];
  return (
    <>
      <div className="container-fluid">
        <Form
          name="addForm"
          // form={editForm}
          onFinish={(values) => {
            console.log("values111333", values);
            // EditJobPayment(values);
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row pt-2">
            <h5 className="lead_text">Add Purchase</h5>
          </div>
          <div className="row jobpay_cards mt-2 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Basic Info</h5>
            </div>
            <div className="col-sm-4 pt-3">
              <label>PO No.</label>
              <Form.Item name="po_no">
                <InputType disabled />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>PO Reference</label>
              <Form.Item name="po_reference">
                <InputType />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Purchase Date</label>
              <Form.Item name="purchase_date">
                <DatePicker></DatePicker>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Due Date</label>
              <Form.Item name="due_date">
                <DatePicker></DatePicker>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Vendor</label>
              <Form.Item name="vendor">
                <SelectBox></SelectBox>
              </Form.Item>
            </div>
          </div>
          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Payment Info</h5>
            </div>
            <div className="col-sm-6 pt-3">
              <label>Payment Mode</label>
              <Form.Item name="payment_mode">
                <SelectBox></SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-6 pt-3">
              <label>Credit Days</label>
              <Form.Item name="credit_days">
                <InputType />
              </Form.Item>
            </div>
            <div className="col-sm-6 pt-3 mb-4">
              <label>Remarks</label>
              <Form.Item name="remarks" className="mt-2">
                <TextArea />
              </Form.Item>
            </div>
            <div className="col-sm-6 pt-3">
              <label>Attachments</label>
              <Form.Item name="attachments" className="mt-2">
                <FileUpload height={100} />
              </Form.Item>
            </div>
          </div>
          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">AWB/NO Details</h5>
            </div>
            <div className="col-sm-6 pt-3">
              <label>Bill No.</label>
              <Form.Item name="bill_no">
                <InputType />
              </Form.Item>
            </div>
            <div className="col-sm-6 pt-3">
              <label>No. of AWB/BLN</label>
              <Form.Item name="no_AWB_BLN">
                <InputType />
              </Form.Item>
            </div>
            <div className="col-sm-12 pt-3">
              <div className="datatable">
                <TableData
                  data={data}
                  columns={columns}
                  rowKey={(record) => record.key}
                  bordered
                  custom_table_css="table_qtn task_expense_table"
                />
              </div>
            </div>
            <div className=" col-12 d-flex justify-content-end mt-4 ps-5">
              <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-3">
                <p style={{ fontWeight: 600 }}>Grand Total :</p>
              </div>

              <div className="col-lg-2 col-sm-6 col-xs-2 me-5">
                <Form.Item name="grandtotal">
                  <Input_Number
                    className="text_right grandtotal"
                    // value={total}
                    align="right"
                    min={0}
                    precision={2}
                    controlls={false}
                    disabled={true}
                  />
                </Form.Item>
              </div>
              <div className="col-sm-1">
                  <Button btnType="save">Submit</Button> 
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
