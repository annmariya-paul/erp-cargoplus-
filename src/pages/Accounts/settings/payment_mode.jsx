import React, { useState } from "react";
import Button from "../../../components/button/button";
import Custom_model from "../../../components/custom_modal/custom_model";
import InputType from "../../../components/Input Type textbox/InputType";
import { FiEdit } from "react-icons/fi";
import { Form, Input, Select, DatePicker } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableData from "../../../components/table/table_data";
import MyPagination from "../../../components/Pagination/MyPagination";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import { MdPageview } from "react-icons/md";
import { GiWorld } from "react-icons/gi";

export default function Payment_mode() {
  const [paymentmode, setpaymentmode] = useState("");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [modalpaymentmode, setModalpaymentmode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [paymentEditPopup, setPaymentEditPopup] = useState(false);
  const [editpaymentmodename,seteditpaymentmodename]= useState("")
  const [editpaymentmodedesc,seteditpaymentmodedesc]= useState("")

  const [adForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const getData = (current, pageSize) => {
    return paymentmode?.slice((current - 1) * pageSize, current * pageSize);
  };

  const [viewpaymentmode, setViewpaymentmode] = useState({
    name: "",
    description: "",
  });

const handleupdate = ( ) => {

}

  // const handleEditclick = (e) => {
  //   setModalpaymentmode(true)

  //  }

  const handleEditclick = (e) => {
    setPaymentEditPopup(true);
    // setShowViewModal(true)
    // console.log("setshowviewmodal",setShowViewModal);
  };
  const handleViewClick = (e) => {
    setShowViewModal(true);
    // setPaymentEditPopup(true);

  };
  const handleviewtoedit = (i) => {
    setPaymentEditPopup(true);


  };

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key", 
      width: "30%",
      render: (data, index) => {
        console.log("table index", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="editIcon m-0"
              onClick={() => {
                handleEditclick(index);
              }}
            >
              <FaEdit />
            </div>
            <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index)}
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "PAYMENT MODE",
      dataIndex: "payment_mode",
      key: "freight_type_name",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.freight_type_name  || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "freight_type_prefix",

      onFilter: (value, record) => {
        return String(record.freight_type_prefix)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
  ];
  const data = [
    {
      payment_mode: "cod",
      description: "cod cod",
    },
  ];
  return (
    <>
      <div className="container-fluid container_fms pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Payment Mode</h5>
          </div>
          {/* <Leadlist_Icons /> */}
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

          <div className="col-4 d-flex  align-items-center justify-content-center">
            <MyPagination
              total={parseInt(paymentmode?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
            />
          </div>

          <div className="col-4 ">
            <Button
              btnType="add"
              onClick={() => {
                setModalpaymentmode(true);
              }}
            >
              Add Payment Mode
            </Button>
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
        <div className="d-flex py-2 justify-content-center">
          <MyPagination
            total={parseInt(paymentmode?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
          />
        </div>
      </div>

      <Custom_model
        show={modalpaymentmode}
        onHide={() => setModalpaymentmode(false)}
        header="Add Fright"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Payment Mode</h5>
            </div>
            <Form
              form={adForm}
              //   onFinish={(data) => {
              //     console.log("valuezzzzzzz", data);
              //     createvendortype()
              //   }}
              //   onFinishFailed={(error) => {
              //     console.log(error);
              //   }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Name</label>
                  <div>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid  Name",
                        },

                        {
                          min: 3,
                          message: "Name must be atleast 3 characters",
                        },
                        {
                          max: 100,
                          message: " Name cannot be longer than 100 characters",
                        },
                      ]}
                      // onChange={(e) => setFrighttypename(e.target.value)}
                    >
                      <InputType value={name} />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Description</label>
                  <div>
                    <Form.Item name="description">
                      <TextArea value={description} />
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
          //   onHide={() => setSuccessPopup(false)}
          // success
        />
      </Custom_model>

      {/* view modal */}

      <Custom_model
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        View_list
        list_content={
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col-9">
                <h5 className="lead_text">Payment Mode</h5>
              </div>
              <div className="col-3">
                <Button
                  btnType="add_borderless"
                  className="edit_button"
                  onClick={() => {
                    handleviewtoedit(viewpaymentmode);
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
                  cod
                  {/* {viewpaymentmode.name} */}
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
                  cod cod
                  {/* {viewpaymentmode.description} */}
                </p>
              </div>
            </div>
          </div>
        }
      />




      {/* edit modal */}
      <Custom_model
        show={paymentEditPopup}
        onHide={() => setPaymentEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Payment Mode</h5>
              </div>
              <div className="row my-3 ">
                <Form
                  form={editForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                    handleupdate()
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="col-12">
                    <label>Name</label>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid name",
                        },
                        {
                          min: 2,
                          message: "Name must be at least 2 characters",
                        },
                        {
                          max: 100,
                          message: "Name cannot be longer than 100 characters",
                        },
                      ]}
                    >
                      <InputType
                        className="input_type_style w-100"
                        value={editpaymentmodename}
                        onChange={(e) => {
                          seteditpaymentmodename(e.target.value);
                        //   setErrormsg("");
                         
                        }}
                      
                      />
                    </Form.Item>
                    {/* {Errormsg ? (
                          <label style={{ color: "red" }}>{Errormsg}</label>
                        ) : (
                          ""
                        )} */}
                    {/* {uniqueeditCode ? (
                      <p
                        style={{ color: "red", marginTop: "-24px" }}
                        className="mb-2"
                      >
                        Freight type Name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null} */}
                  </div>
                  <div className="col-12">
                    <label>Description</label>
                    <Form.Item 
                    name="description"
                    >
                     <TextArea  
                     value={editpaymentmodedesc}
                     onChange={(e)=>{
                      seteditpaymentmodedesc(e.target.value)
                     }}
                     />
                    </Form.Item>
                  </div>

                  

                  <div className="col-12 d-flex justify-content-center mt-5">
                    <Button className="save_button">Save</Button>
                  </div>
                </Form>
              </div>
              {/* {error ? (
                <div className="">
                  <ErrorMsg code={"400"} />
                </div>
              ) : (
                ""
              )} */}
            </div>
          </div>
        }
      />
      <Custom_model
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
  




    </>
  );
}
