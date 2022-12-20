import "./table.scss";
import React, { useState, useEffect } from "react";
// import PhoneInput from "react-phone-input-2";
import TableData from "../../../../components/table/table_data";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import Phone_Input from "../../../../components/PhoneInput/phoneInput";
import PhoneNumber from "../../../../components/phone_number/phonenumber";
import { Form, message } from "antd";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";

function Edit_Address(props) {
  const [value, setValue] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modelshowAdd, setModalshowAdd] = useState(true);
  const [editAddressModal, setEditAddressModel] = useState(false);
  const [title, setTitle] = useState();
  const [address_data, setAddress_data] = useState();
  const [pincode, setPincode] = useState();
  const [addphone, setPhone] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editAddressData, setEditAddressData] = useState("");
  const [editPin, setEditPin] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [serialNo, setserialNo] = useState(1);
  const [addressLeadId, setAddressLeadId] = useState();
  const [addressId, setAddressId] = useState();
  const [addressTable, setAddressTable] = useState();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const [oneLeadData, setOneLeadData] = useState();
  const [LeadId, setLeadId] = useState();
  // {funtion to fetch each Lead data - Ann mariya (22/11/22) }
  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/lead/${props.leadid}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Unique Lead Id", res?.data?.data);
          setOneLeadData(res?.data?.data);
          setLeadId(res?.data?.data?.lead_id);
        } else {
          console.log("FAILED TO LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Error while getting data", err);
      });
  };
  // {function to fetch addresses - Ann mariya (22/11/22)}
  const getAddresses = async () => {
    try {
      const allAddress = await PublicFetch.get(`${CRM_BASE_URL}/address`);
      if (allAddress.data.success) {
        setValue(allAddress.data.data);
        console.log("hello data", allAddress.data.data);
        // {array to set addresses of corresponding lead id}
        let array = [];
        allAddress?.data?.data?.forEach((item, index) => {
          setAddressLeadId(item?.address_lead_id);
          if (LeadId === item?.address_lead_id) {
            {
              array.push({
                address_id: item?.address_id,
                address_title: item?.address_title,
                address_content: item?.address_content,
                address_pin: item?.address_pin,
                address_contact: item?.address_contact,
              });
              setAddressTable(array);
            }
          }
        });
      } else {
        message.error("fetch data error");
      }
      console.log("All leads res : ", allAddress);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  useEffect(() => {
    getAddresses();
    GetLeadData();
  }, [LeadId]);

  // {function to show data in input fields -  Ann mariya (23-11-22)}
  const handleEditedclick = (i) => {
    console.log("edit data in list...", i);
    setAddressId(i.address_id);
    setEditTitle(i.address_title);
    setEditAddressData(i.address_content);
    setEditPin(i.address_pin);
    setEditPhone(i.address_contact);
    getAddresses();
    editForm.setFieldsValue({
      addressId: i.address_id,
      editTitle: i.address_title,
      editAddressData: i.address_content,
      editPin: i.address_pin,
      editPhone: i.address_contact,
    });
    setEditAddressModel(true);
  };

  // {function to edit address - Ann mariya(25-11-22)}
  const EditAddress = () => {
    PublicFetch.patch(`${CRM_BASE_URL}/address/${addressId}`, {
      address_lead_id: parseInt(props.leadid),
      address_title: editTitle,
      address_content: editAddressData,
      address_pin: editPin,
      address_contact: editPhone,
    })
      .then(function (response) {
        console.log("address data", response);
        if (response.data.success) {
          getAddresses();
          setEditTitle();
          setEditAddressData();
          setEditPin();
          setEditPhone();
          setEditAddressModel(false);
          setModalShow(true);
          close_modal(modalShow, 1200);
          props.onHide();
        } else {
          message.error("fetch data error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // { funtion to add address in lead edit - Ann mariya (25-11-22)}
  const AddAddress = () => {
    PublicFetch.post(`${CRM_BASE_URL}/address`, {
      address_lead_id: parseInt(props.leadid),
      address_title: title,
      address_content: address_data,
      address_pin: pincode,
      address_contact: addphone,
    })
      .then(function (response) {
        console.log("address data", response);
        if (response.data.success) {
          getAddresses();
          setAddress_data();
          setPhone();
          setPincode();
          setTitle();
          setModalshowAdd(false);
          setModalShow(true);
           addForm.resetFields();
          close_modal(modalShow, 1200);
          props.onHide();
        } else {
          message.error("fetch data error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setModalShow(false);
      }, time);
    }
  };

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: "15%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center gap-2">
            <div className="editcolor">
              <FaEdit onClick={() => handleEditedclick(index)} />
            </div>
            <div className="editcolor">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "TITLE",
      dataIndex: "address_title",
      key: "address_title",
    },
    {
      title: "ADDRESS",
      dataIndex: "address_content",
      key: "address_content",
    },
    {
      title: "PIN",
      dataIndex: "address_pin",
      key: "address_pin",
    },
    {
      title: "CONTACT",
      dataIndex: "address_contact",
      key: "address_contact",
    },
  ];
  return (
    <div>
      <div className="datatable">
        <TableData
          data={addressTable}
          columns={columns}
          custom_table_css="addresstable"
        />
      </div>
      <Custom_model
        bodyStyle={{ height: 570, overflowY: "auto" }}
        show={modelshowAdd}
        onHide={() => setModalshowAdd(false)}
        footer={false}
        {...props}
        View_list
        list_content={
          <>
            <Form
              form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
                AddAddress();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row">
                <h5 className="lead_text">Add Address</h5>
              </div>
              <div className="row mt-3">
                <div className="px-3">
                  <label>Title</label>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid title",
                      },
                      {
                        whitespace: true,
                      },
                      {
                        min: 2,
                        message: "Title must be atleast 2 characters",
                      },
                      {
                        max: 100,
                      },
                    ]}
                  >
                    <InputType
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Item>

                  <label>Address</label>
                  <Form.Item
                    className="mt-2"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a Valid address",
                      },
                      {
                        whitespace: true,
                      },
                      {
                        min: 2,
                        message: "Address must be atleast 2 characters",
                      },
                      {
                        max: 500,
                      },
                    ]}
                  >
                    <TextArea
                      value={address_data}
                      onChange={(e) => setAddress_data(e.target.value)}
                    />
                  </Form.Item>

                  <label>PIN</label>
                  <Form.Item
                    value={pincode}
                    name="pin"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid PIN",
                      },
                    ]}
                  >
                    <InputType
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </Form.Item>

                  <label>Mobile</label>
                  <Form.Item
                    name="addphone"
                    rules={[
                      {
                        pattern: new RegExp(
                          "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
                        ),
                        message: "Please enter a Valid Phone",
                      },
                      {
                        min: 6,
                        message: "Please enter valid address",
                      },
                    ]}
                  >
                    <PhoneNumber
                      defaultCountry={"IN"}
                      value={addphone}
                      id="contact_phone_1"
                      name="contact_phone_1"
                      onChange={(value) => setPhone(value)}
                    />
                    {/* <Phone_Input
                      value={addphone}
                      onChange={(value) => setPhone(value)}
                    /> */}
                  </Form.Item>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />
      <Custom_model
        bodyStyle={{ height: 570, overflowY: "auto" }}
        show={editAddressModal}
        onHide={() => setEditAddressModel(false)}
        View_list
        footer={false}
        list_content={
          <>
            <Form
              form={editForm}
              onFinish={(values) => {
                console.log("values iss", values);
                EditAddress();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row">
                <h5 className="lead_text">Edit Address</h5>
              </div>
              <div className="row mt-3">
                <div className="px-3">
                  <label>Title</label>
                  <Form.Item
                    name="editTitle"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid title",
                      },
                      {
                        whitespace: true,
                      },
                      {
                        min: 2,
                        message: "Title must be atleast 2 characters",
                      },
                      {
                        max: 100,
                      },
                    ]}
                  >
                    <InputType
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </Form.Item>
                  <label>Address</label>
                  <Form.Item
                    name="editAddressData"
                    rules={[
                      {
                        required: true,

                        message: "Please enter a Valid address",
                      },
                      {
                        whitespace: true,
                      },
                      {
                        min: 2,
                        message: "Address name must be atleast 2 characters",
                      },
                      {
                        max: 500,
                      },
                    ]}
                  >
                    <TextArea
                      value={editAddressData}
                      onChange={(e) => setEditAddressData(e.target.value)}
                    />
                  </Form.Item>
                  <label>PIN</label>
                  <Form.Item
                    name="editPin"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid PIN",
                      },
                    ]}
                  >
                    <InputType
                      value={editPin}
                      onChange={(e) => setEditPin(e.target.value)}
                    />
                  </Form.Item>

                  <label for="phone" className="form-label">
                    Mobile
                  </label>
                  <Form.Item
                    name="editPhone"
                    rules={[
                      {
                        pattern: new RegExp(
                          "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
                        ),
                        message: "Please enter a Valid Phone",
                      },
                      {
                        min: 6,
                        message: "Please enter valid address",
                      },
                    ]}
                  >
                    <Phone_Input
                      value={editPhone}
                      onChange={(value) => setEditPhone(value)}
                    />
                  </Form.Item>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />
      <Custom_model
        closable={false}
        centered
        size={`sm`}
        success
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Edit_Address;
