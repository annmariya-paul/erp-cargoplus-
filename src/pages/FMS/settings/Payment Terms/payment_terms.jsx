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
import MyPagination from "../../../../components/Pagination/MyPagination";
//Payment terms page
export default function PaymentTerms(props) {
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [searchedText, setSearchedText] = useState("");

  const [modalAddPayment, setModalAddPayment] = useState(false);

  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);


  const [descriptionInput, setDescriptionInput] = useState();
  const [NameInput, setNameInput] = useState();

  const [Errormsg, setErrormsg] = useState();

  const [showViewModal, setShowViewModal] = useState(false);
  const [PaymentEditPopup, setPaymentEditPopup] = useState(false);
  const [allPaymentTerms, setAllPaymentTerms] = useState();
  const [editForm] = Form.useForm();
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const [viewpayments, setViewPayments] = useState({
    payment_term_id: "",
    payment_term_name: "",
    payment_term_shortname: "",
    payment_term_description: "",
  });

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
            <div className="editIcon m-0" onClick={() => paymentEdit(index)}>
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
      dataIndex: "payment_term_name",
      key: "payment_term_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.payment_term_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "SHORT NAME",
      dataIndex: "payment_term_shortname",
      key: "payment_term_shortname",
      
      onFilter: (value, record) => {
        return String(record.payment_term_shortname)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "payment_term_description",
      key: "payment_term_description",
      
      onFilter: (value, record) => {
        return String(record.payment_term_description)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
  ];

  const [paymentname, setPaymentname] = useState();
  const [payment_id, setPayment_id] = useState();

  const getData = (current, pageSize) => {
    return allPaymentTerms?.slice((current - 1) * pageSize, current * pageSize);
  };



  const handleviewtoedit = (i) => {
    console.log("editing data iss", i);

    setPaymentname(i.paymentviewname);

    addForm.setFieldsValue({
      paymentment: i.paymentviewname,
    });
    setPaymentEditPopup(true);
  };

  const getallPaymentTerms = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/paymentTerms`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("successs", res.data.data);
          setAllPaymentTerms(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const CreatePaymentTerms = (data) => {
    PublicFetch.post(`${CRM_BASE_URL_FMS}/paymentTerms`, data)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setSuccessPopup(true);
          getallPaymentTerms()
          close_modal(successPopup, 1200);
          addForm.resetFields();
          setModalAddPayment(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const paymentEdit = (e) => {
    console.log("payment edit", e);
    setNameInput(e.payment_name);
    setPayment_id(e.payment_term_id);
    addForm.setFieldsValue({
      payment_id: e.payment_term_id,
      NameInput: e.payment_term_name,
      ShortNameInput: e.payment_term_shortname,
      description: e.payment_term_description,
    });
    setPaymentEditPopup(true);
  };
  const handleViewClick = (item) => {
    console.log("view all payment", item);
    setViewPayments({
      ...viewpayments,
      payment_term_id: item.payment_term_id,
      payment_term_name: item.payment_term_name,
      payment_term_shortname: item.payment_term_shortname,
      payment_term_description: item.payment_term_description,
    });

    setShowViewModal(true);
  };
  console.log("jhwdwjh", payment_id);

  const updatePaymentTerms = (data) => {
    PublicFetch.patch(`${CRM_BASE_URL_FMS}/paymentTerms/${payment_id}`, {
      payment_term_name: data.NameInput,
      payment_term_shortname: data.ShortNameInput,
      payment_term_description: data.description,
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          setPaymentEditPopup(false);
          addForm.resetFields();
          getallPaymentTerms();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getallPaymentTerms();
  }, []);

  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Add Payment Term</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-5">
            <Input.Search
              placeholder="Search by Name"
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
        <div className="row my-2">
          <div className="col-4  ">
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
          <div className="col-4 d-flex justify-content-center align-items-center">
          <MyPagination
           total={parseInt(allPaymentTerms?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
      </div>

          <div className="col-4">
            <Button btnType="add" onClick={() => setModalAddPayment(true)}>
              Add Payment Terms
            </Button>
          </div>
         
             

        </div>

   
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={allPaymentTerms}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="py-5 d-flex  justify-content-center">
          <MyPagination
           total={parseInt(allPaymentTerms?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
        </div>
      </div>

      <CustomModel
        show={modalAddPayment}
        onHide={() => setModalAddPayment(false)}
        header="Add Payment"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Payment</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                CreatePaymentTerms(data);
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
                      name="payment_term_name"
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
                      name="payment_term_shortname"
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
                    <Form.Item name="payment_term_description">
                      <TextArea />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button type="submit" btnType="save">
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </>
        }
      ></CustomModel>
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />

      <CustomModel
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col-10">
                <h5 className="lead_text"> Payment Terms</h5>
              </div>
              <div className="col-2">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    paymentEdit(viewpayments);
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
                <p className="modal-view-data">
                  {viewpayments.payment_term_name}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p>Short Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {" "}
                  {viewpayments.payment_term_shortname}{" "}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Description</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                  {" "}
                  {viewpayments.payment_term_description}{" "}
                </p>
              </div>
            </div>
          </div>
        }
      />
      <CustomModel
        show={PaymentEditPopup}
        onHide={() => setPaymentEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Payment Terms</h5>
              </div>
              <div className="row my-3 ">
                <Form
                  form={addForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                    updatePaymentTerms(values);
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
                          message: "Please enter a Valid payment Name",
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
                      <Form.Item name="description">
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
