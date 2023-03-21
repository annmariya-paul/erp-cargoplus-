import React, { useState,useEffect } from "react";
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
// import { GiWorld } from "react-icons/gi";
import PublicFetch from "../../../utils/PublicFetch";
import { ACCOUNTS } from "../../../api/bootapi";
import CheckUnique from "../../../check Unique/CheckUnique";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";

export default function Payment_mode() {
  const [paymentmode, setpaymentmode] = useState("");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState("25");
  const [modalpaymentmode, setModalpaymentmode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const[searchedDesc,setSearchedDesc] = useState("");
  const [uniqueCode, setUniqueCode] = useState(false);
  const [uniqueName, setUniqueName] = useState(false);
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [paymentEditPopup, setPaymentEditPopup] = useState(false);
  const [editpaymentmodeid,seteditpaymentmodeid]= useState("")
  const [editpaymentmodename, seteditpaymentmodename] = useState("");
  const [editpaymentmodedesc, seteditpaymentmodedesc] = useState("");
  const [payments,setpayments] = useState("")
  const [serialNo, setserialNo] = useState(1);
  const [editUniqueName, setEditUniqueName] = useState();
  const [adForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [uniqueEditName, setUniqueEditName] = useState(false);
  const getData = (current, pageSize) => {
    return payments?.slice((current - 1) * pageSize, current * pageSize);
  };

  const [viewpaymentmode, setViewpaymentmode] = useState({
    id:"",
    name: "",
    description: "",
  });



  const handleupdate = async (data) => {
    console.log("dataa",data);
    try {
      const updated = await PublicFetch.patch(
        `${ACCOUNTS}/payment-modes/${editpaymentmodeid}`,
        {
          pay_mode_name:data.paymentmodename,
          pay_mode_desc:data.paymentmodedesc,
          
        }
      );
      console.log("successfully updated ", updated);
      if (updated.data.success) {
        setSuccessPopup(true)
        setPaymentEditPopup(false);
        getallpayment();
  
        close_modal(successPopup,1000 );
      } 
    } catch (err) {
      console.log("error to update payment",err);
    }
  };



  const handleviewtoedit = (i) => {
    console.log("editing data iss", i);
    seteditpaymentmodeid(i.pay_mode_id);
    seteditpaymentmodename(i.name);
    seteditpaymentmodedesc(i.description);
    editForm.setFieldsValue({
      paymentmodename: i.name,
      paymentmodedesc: i.description,
    });
    setPaymentEditPopup(true);
    // setShowViewModal(true)
    // console.log("setshowviewmodal",setShowViewModal);
  };
  const handleViewClick = (item) => {
    console.log("view all atributes",item);
    setViewpaymentmode({
      ...viewpaymentmode,
      id: item.pay_mode_id,
      name: item.pay_mode_name,
      description: item.pay_mode_desc,
    });

    setShowViewModal(true);
    // setPaymentEditPopup(true);
  };
  const handleEditclick  = (e) => {
    console.log("editing id iss", e);
    seteditpaymentmodeid(e.pay_mode_id);
    seteditpaymentmodename(e.pay_mode_name);
    seteditpaymentmodedesc(e.pay_mode_desc);
    setEditUniqueName(e?.pay_mode_name);
    editForm.setFieldsValue({
      paymentmodename: e.pay_mode_name,
      paymentmodedesc: e.pay_mode_desc,
    });
    setPaymentEditPopup(true);
  };


  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

   
const createPayment = async() => {
  try{
    const addpayment = await PublicFetch.post(`${ACCOUNTS}/payment-modes`,
    {
      pay_mode_name:name,
      pay_mode_desc:description,
    });
    
    console.log("payment added successfully", addpayment);

    if (addpayment.data.success) {
      setSuccessPopup(true);
      getallpayment();
      adForm.resetFields();
      setModalpaymentmode(false);
      close_modal(successPopup, 1000);
    }
  } catch (err) {
    console.log("err to add the payments", err);
  } 
};


// const getpayment = async() => {
//   try{
//     const getpaymentt = await PublicFetch.post
//     (`${ACCOUNTS}/payment-modes`,
//    );
    
//     console.log("get a payment", getpaymentt);
//   } catch (err) {
//     console.log("error", err);
//   } 
// };



const getallpayment = async () => {
  try {
    const allpayments = await PublicFetch.get(
      `${ACCOUNTS}/payment-modes`
    );
    console.log("getting all payments", allpayments);
    setpayments(allpayments.data.data);
  } catch (err) {
    console.log("error to fetching  payments", err);
  }
};
useEffect(() => {
  getallpayment()
  // getpayment()
}, []);

  const columns = [
    {
      title: "SI.NO",
      key: "index",
      width: "20%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "PAYMENT MODE",
      dataIndex: "pay_mode_name",
      key: "pay_mode_name",
      width: "30%",
        filteredValue: [searchedText],
        onFilter: (value, record) => {
          return String(record.pay_mode_name)
          .toLowerCase()
            .includes(value.toLowerCase())||
            String(record.pay_mode_desc)
            .toLowerCase()
            .includes(value.toLowerCase())
        },
      align: "left",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "pay_mode_desc",
      key: "pay_mode_desc",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.pay_mode_desc)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "left",
    },
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
                setUniqueEditName(false);
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
  ];
  
  // const data = [
  //   {
  //     sl_no: "1",
  //     payment_mode: "cod",
  //     description: "cod cod",
  //   },
  // ];


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
              value={searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
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
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
          </div>

          <div className="col-4 ">
            <Button
              btnType="add"
              onClick={() => {
                setModalpaymentmode(true);
                setUniqueName(false);
                adForm.resetFields();
              }}
            >
              Add Payment Mode
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={data}
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
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
        </div>
      </div>

      <Custom_model
        show={modalpaymentmode}
        onHide={() => setModalpaymentmode(false)}
        header="Add Fright"
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Payment Mode</h5>
            </div>
            <Form
              form={adForm}
                onFinish={(data) => {
                  console.log("val", data);
                  createPayment()
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
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
                    >
                      <InputType 
                       value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        console.log("name name",name);
                        setUniqueName(false);
                      }}
                      onBlur={async () => {
                        let n = await CheckUnique({
                          type: "paymentmodename",
                          value: name,
                        });
                        setUniqueName(n);
                      }}
                       />
                    </Form.Item>
                    {uniqueName ? (
                      <p style={{ color: "red" }}>
                    Payment mode Name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Description</label>
                  <div>
                    <Form.Item name="description">
                      <TextArea
                      onChange={(e) => {
                        setDescription(e.target.value);
                        console.log("descriptionssssss",e.target.value);
                      }} />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button type="submit" btnType="save">Save</Button>
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
                    console.log("ppppppp",viewpaymentmode);
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
                  {viewpaymentmode.name}
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
                  {/* cod cod */}
                  {viewpaymentmode.description}
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
                    handleupdate(values);
                    console.log("nnnnnn",values);
                  }}
                  // onFinish={handleupdate}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="col-12">
                    <label>Name</label>
                    <Form.Item
                      name="paymentmodename"
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
                          setUniqueEditName(false);
                        }}

                        onBlur={ async () => {
                         
                          if (editUniqueName !== editpaymentmodename) {
                            let a = await CheckUnique({type:"paymentmodename",value:editpaymentmodename})
                         
                            setUniqueEditName(a);
                          }
                       
                        }}
                      />
                    </Form.Item>
                    {uniqueEditName ? (
                      <p style={{ color: "red"}}>
                      Payment mode Name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}

                  </div>
                  <div className="col-12">
                    <label>Description</label>
                    <Form.Item 
                    name="paymentmodedesc"
                    >
                      <TextArea
                        value={editpaymentmodedesc}
                        onChange={(e) => {
                          seteditpaymentmodedesc(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-12 d-flex justify-content-center mt-5">
                    <Button className="save_button">Save</Button>
                  </div>
                </Form>
              </div>
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
