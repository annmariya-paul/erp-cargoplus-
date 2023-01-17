import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { MdPageview } from "react-icons/md";
import { Form, Input, Select, DatePicker } from "antd";
import TableData from "../../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { FiEdit } from "react-icons/fi";
import CustomModel from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";

export default function TaxType() {
  const [searchedText, setSearchedText] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [error, setError] = useState(false);
  const [modalAddTaxtype, setModalAddTaxtype] = useState(false);
  const [modalEditTaxtype, setModalEditTaxtype] = useState(false);
  const [ViewTaxtypeModal, setViewTaxtypeModal] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "30%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="editIcon m-0"
              onClick={() => setModalEditTaxtype(index)}
            >
              <FaEdit />
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => setViewTaxtypeModal(index)}
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "TAX TYPE NAME",
      dataIndex: "taxtype_name",
      key: "taxtype_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.taxtype_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "TAX PERCENTAGE",
      dataIndex: "tax_percentage",
      key: "tax_percentage",
    //   filteredValue: [searchedText],
    //   onFilter: (value, record) => {
    //     return String(record.tax_percentage)
    //       .toLowerCase()
    //       .includes(value.toLowerCase());
    //   },
      align: "center",
    },
  ];

  const data = [
    {
      taxtype_name: "Payroll Tax",
      tax_percentage: "15",
      key: "1",
    },
    {
      taxtype_name: "Sales Tax",
      tax_percentage: "20",
      key: "2",
    },
    {
      taxtype_name: "Value-added Tax",
      tax_percentage: "07",
      key: "3",
    },
  ];
  return (
    <>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Tax Types</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Tax type Name"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 px-3">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
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
          <div className="col-9 d-flex justify-content-end">
            <Button btnType="add" onClick={() => setModalAddTaxtype(true)}>
              Add Tax Type
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
      {/* {add tax type modal} */}
      <CustomModel
        show={modalAddTaxtype}
        onHide={() => setModalAddTaxtype(false)}
        header="Add Tax Type"
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Tax Type</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Tax Type Name</label>
                  <div>
                    <Form.Item
                      name="taxtype_name"
                      rules={[
                        {
                          required: true,
                          //   pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Tax Percentage</label>
                  <div>
                    <Form.Item
                      name="tax_percentage"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a valid tax percentage",
                        },
                        {
                          pattern: new RegExp("^[0-9]+$"),
                          message: "Tax percentage must be numeric",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />
      {/* {edit tax type modal} */}
      <CustomModel
        show={modalEditTaxtype}
        onHide={() => setModalEditTaxtype(false)}
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Edit Tax Type</h5>
            </div>
            <Form
              form={editForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Tax Type Name</label>
                  <div>
                    <Form.Item
                      name="taxtype_name"
                      rules={[
                        {
                          required: true,
                          //   pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Tax Percentage</label>
                  <div>
                    <Form.Item
                      name="tax_percentage"
                      rules={[
                        {
                          required: true,
                          message: "Please entera valid tax percentage",
                        },
                        {
                          pattern: new RegExp("^[0-9]+$"),
                          message: "Tax percentage must be numeric",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />
      {/* {view tax type modal} */}

      <Custom_model
        show={ViewTaxtypeModal}
        onHide={() => setViewTaxtypeModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row mb-5">
              <div className="col-9">
                <h5 className="lead_text">Tax Type</h5>
              </div>
              <div className="col-3">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    setModalEditTaxtype(true);
                    setViewTaxtypeModal(false);
                  }}
                >
                  Edit
                  <FiEdit
                    style={{ marginBottom: "4px", marginInline: "3px" }}
                  />
                </Button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Tax Type Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">Direct tax</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <p>Tax Percentage</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 ">
                <p className="modal-view-data">10 %</p>
              </div>
            </div>
          </div>
        }
      />
      {/* { sucess popup modal} */}
      <Custom_model
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </>
  );
}
