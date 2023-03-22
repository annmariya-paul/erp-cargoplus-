import "./purchase.scss";
import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Popconfirm } from "antd";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import Button from "../../../../components/button/button";
import Input_Number from "../../../../components/InputNumber/InputNumber";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import FileUpload from "../../../../components/fileupload/fileUploader";
import TableData from "../../../../components/table/table_data";

export default function CreatePurchase() {
  const [serialNo, setserialNo] = useState(1);
  const [count, setCount] = useState(2);
  const [sampletable, setSampletable] = useState( [
    {
      key:1,
      awb_bl: "",
      job_no: "",
      amount:"",
    },
  ]);
   
  
  const handleAdd = () => {
    const newRow = {
      key: count,
      awb_bl: "",
      job_no: "",
      amount: "",
    };
    setSampletable(pre=>{
      return [...pre, newRow]
    })
     setCount(count + 1);
  };

   const handleDelete = (key) => {
     const deleteData = sampletable.filter((item) => item.key !== key);
     setSampletable(deleteData);
   };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
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
          <div className="row">
            <InputType className="input_bg table_input" />
          </div>
        );
      },
    },
    {
      title: "JOB NO",
      dataIndex: "job_no",
      key: "job_no",
      width: "20%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="row pb-1">
            <SelectBox className="input_bg table_input"></SelectBox>
          </div>
        );
      },
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      width: "20%",
      render: (data, index) => {
        return (
          <div className="row">
            <Input_Number className="input_bg table_input" precision={2} />
          </div>
        );
      },
    },
    {
      title: "ACTION",
      dataIndex: "ACTION",
      width: "7%",
      align: "center",
      render: (_, record) =>
        sampletable.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
          </Popconfirm>
        ) : null,
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
              <label>Purchase Date</label>
              <Form.Item name="purchase_date" className="mt-2">
                <DatePicker></DatePicker>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Due Date</label>
              <Form.Item name="due_date" className="mt-2">
                <DatePicker></DatePicker>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Vendor</label>
              <Form.Item name="vendor">
                <SelectBox></SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Bill No</label>
              <Form.Item name="bill_no">
                <InputType />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Task</label>
              <Form.Item name="task">
                <SelectBox></SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Currency</label>
              <Form.Item name="currency">
                <SelectBox></SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Exchange Rate</label>
              <Form.Item name="exchange_rate">
                <InputType />
              </Form.Item>
            </div>
          </div>

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">AWB/NO Details</h5>
            </div>

            <div className="col-sm-12">
              <div className="d-flex justify-content-end">
                <Button onClick={handleAdd} btnType="add_borderless">
                  Add New Row
                </Button>
              </div>
              <div className="datatable">
                <TableData
                  data={sampletable}
                  columns={columns}
                  rowKey={(record) => record.key}
                  custom_table_css="table_qtn qtn_table_brdr"
                />
              </div>
            </div>
            <div className=" col-12 d-flex justify-content-end mt-3 ps-5">
              <div className="col-lg-2 col-sm-4 col-xs-3 d-flex justify-content-end mt-3 me-3">
                <p style={{ fontWeight: 600 }}>Total :</p>
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
            </div>
          </div>
          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Attachments</h5>
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
            <div className="col-12 d-flex justify-content-center">
              <Button btnType="save">Submit</Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
