import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import Custom_model from "../../../../components/custom_modal/custom_model";

export default function CreditNoteType() {
  const [addForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [addCreditNote, setAddCreditNote] = useState(false);
  const [editCreditNote,setEditCreditNote]=useState(false);
  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "10%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "credit_note_name",
      key: "credit_note_name",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.freight_type_name  || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      width: "12%",
      render: (data, index) => {
        return (
          <div className=" d-flex justify-content-center align-items-center gap-3">
            <div
              className="actionEdit"
              onClick={() => setEditCreditNote(true)}
            >
              <FaEdit />
            </div>
            {/* <div className="actionEdit">
              <MdPageview />
            </div> */}
            <div className="actionDel">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];
  const data = [
    { credit_note_name: "Test name", description: "test Description" },
  ];
  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Credit Note Type</h5>
          </div>
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search"
              style={{ margin: "5px", borderRadius: "5px" }}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-4 ">
            <Select
              bordered={false}
              className="page_size_style"
              //   value={pageSize}
              //   onChange={(e) => setPageSize(e)}
            >
              <Select.Option value="25">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">25</span>
              </Select.Option>
              <Select.Option value="50">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1"> 50</span>
              </Select.Option>
              <Select.Option value="100">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">100</span>
              </Select.Option>
            </Select>
          </div>

          <div className="col-4 d-flex  align-items-center justify-content-center">
            {/* <MyPagination
              total={parseInt(paymentmode?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
            /> */}
          </div>

          <div className="col-4 ">
            {/* <Link to={ROUTES.ADD_JOBPAYMENT}> */}
            <Button btnType="add" onClick={() => setAddCreditNote(true)}>
              Add Credit Note Type
            </Button>
            {/* </Link> */}
          </div>
        </div>

        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <Custom_model
          show={addCreditNote}
          onHide={() => setAddCreditNote(false)}
          footer={false}
          View_list
          list_content={
            <>
              {" "}
              <div className="row">
                <h5 className="lead_text">Add Credit Note Type</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                  // createBranches();
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-4">
                  <div className="col-12 pt-1">
                    <label>Name</label>
                    <Form.Item
                      name="credit_note_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Branch Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Description</label>
                    <Form.Item
                      name="credit_note_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Branch Name",
                        },
                      ]}
                    >
                      <TextArea />
                    </Form.Item>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-center gap-3">
                    <Button btnType="save">Save</Button>
                    <Button
                      as="input"
                      type="reset"
                      value="Reset"
                      onClick={() => {
                        setAddCreditNote(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            </>
          }
        />
         <Custom_model
          show={editCreditNote}
          onHide={() => setEditCreditNote(false)}
          footer={false}
          View_list
          list_content={
            <><div className="row">
                <h5 className="lead_text">Edit Credit Note Type</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                  // createBranches();
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-4">
                  <div className="col-12 pt-1">
                    <label>Name</label>
                    <Form.Item
                      name="credit_note_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Branch Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Description</label>
                    <Form.Item
                      name="credit_note_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Branch Name",
                        },
                      ]}
                    >
                      <TextArea />
                    </Form.Item>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-center gap-3">
                    <Button btnType="save">Save</Button>
                    <Button
                      as="input"
                      type="reset"
                      value="Reset"
                      onClick={() => {
                        setEditCreditNote(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                </Form></>}/>
      </div>
    </>
  );
}
