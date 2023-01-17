import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { Link } from "react-router-dom";
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
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";
import TextArea from "../../../../components/ InputType TextArea/TextArea";

export default function TermsOfShipment(props) {
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [searchedText, setSearchedText] = useState("");

  const [modalAddShipment, setModalAddShipment] = useState(false);

  const [pageSize, setPageSize] = useState("25");
  const [descriptionInput, setDescriptionInput] = useState();
  const [NameInput, setNameInput] = useState();

  const [Errormsg, setErrormsg] = useState();

  const [showViewModal, setShowViewModal] = useState(false);
  const [ShipmentEditPopup, setShipmentEditPopup] = useState(false);
  const [editForm] = Form.useForm();
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const shipmentEdit = (e) => {
    console.log("shipment edit", e);
    setNameInput(e.shipment_name);

    editForm.setFieldsValue({
      shipment_id: e.shipment_id,
      NameInput: e.shipment_name,
    });
    setShipmentEditPopup(true);
  };
  const [viewshipments, setViewShipments] = useState({
    id: "",
    shipmentviewname: "",
  });
  const handleViewClick = (item) => {
    console.log("view all shipment", item);
    setViewShipments({
      ...viewshipments,
      id: item.shipment_id,
      shipmentviewname: item.shipment_name,
    });

    setShowViewModal(true);
  };

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
            <div className="editIcon m-0" onClick={() => shipmentEdit(index)}>
              <FaEdit />
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index)}
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
      title: " NAME",
      dataIndex: "shipment_name",
      key: "shipment_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.shipment_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "SHORT NAME",
      dataIndex: "shipment_short_name",
      key: "shipment_short_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.shipment_short_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "Descripton",
      dataIndex: "shipment_description",
      key: "shipment_description",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.shipment_description)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
  ];

  const data = [
    {
      shipment_name: "Test",
      shipment_short_name: "abc",
      shipment_description: "Test data",

      key: "1",
    },
    {
      shipment_name: "Test one",
      shipment_short_name: "QQ1",
      shipment_description: "Test data abc",
      key: "2",
    },
    {
      shipment_name: "Abc",
      shipment_short_name: "sh1",
      shipment_description: "Test data new",
      key: "3",
    },
  ];

  const [shipmentname, setShipmentname] = useState();
  const [shipment_id, setShipment_id] = useState();

  const handleviewtoedit = (i) => {
    console.log("editing data iss", i);
    setShipment_id(i.id);
    setShipmentname(i.shipmentviewname);

    addForm.setFieldsValue({
      shipment: i.shipmentviewname,
    });
    setShipmentEditPopup(true);
  };

  return (
    <>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Terms of Shipment</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Fright type Name"
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
            <Button btnType="add" onClick={() => setModalAddShipment(true)}>
              Add Shipment
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(numofItemsTo, pageofIndex)}

            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>

      <CustomModel
        show={modalAddShipment}
        onHide={() => setModalAddShipment(false)}
        header="Add Shipment"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Shipment</h5>
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
                  <label> Name</label>
                  <div>
                    <Form.Item
                      name="shipmentname"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Short Name</label>
                  <div>
                    <Form.Item
                      name="shipmentshortname"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid Short Name",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Description</label>
                  <div>
                    <Form.Item name="shipmentdescription">
                      <TextArea />
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
      >
        <Custom_model
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </CustomModel>

      <Custom_model
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col-10">
                <h5 className="lead_text">Terms Of Shipment</h5>
              </div>
              <div className="col-2">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    handleviewtoedit(viewshipments);
                    // setShowModalEdit(true);
                    setShowViewModal(false);
                  }}
                >
                  Edit
                  <FiEdit
                    style={{ marginBottom: "4px", marginInline: "3px" }}
                  />
                </Button>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">ABC</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p>Short Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">Abc</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Description</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">Test Data</p>
              </div>
            </div>
          </div>
        }
      />
      <Custom_model
        show={ShipmentEditPopup}
        onHide={() => setShipmentEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Shipment</h5>
              </div>
              <div className="row my-3 ">
                <Form
                  form={editForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="col-12 pt-1">
                    <label>Name</label>
                    <Form.Item
                      name="NameInput"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid shipment Name",
                        },
                      ]}
                    >
                      <InputType className="input_type_style w-100" />
                    </Form.Item>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Short Name</label>
                    <Form.Item
                      name="ShortNameInput"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid  Short Name",
                        },
                      ]}
                    >
                      <InputType className="input_type_style w-100" />
                    </Form.Item>
                  </div>
                  <div className="col-12 pt-1">
                    <label>Description</label>
                    <div>
                      <Form.Item name="codeInput">
                        <TextArea />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-12 d-flex justify-content-center mt-5">
                    <Button className="save_button">Save</Button>
                  </div>
                </Form>
              </div>
              {error ? (
                <div className="">
                  <ErrorMsg code={"400"} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        }
      />
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {error ? <ErrorMsg code={"500"} /> : " "}
    </>
  );
}
