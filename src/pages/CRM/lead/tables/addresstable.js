import "./table.scss";
import React, { useState, useEffect } from "react";
import TableData from "../../../../components/table/table_data";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import PhoneNumber from "../../../../components/phone_number/phonenumber";
import { Form, message } from "antd";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import Phone_Input from "../../../../components/PhoneInput/phoneInput";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { AiOutlinePlus } from "react-icons/ai";

function AddressTable(props) {
  const [value, setValue] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modelshowAdd, setModalshowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [address_data, setAddress_data] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [addressTable, setAddressTable] = useState();
  const [addressLeadId, setAddressLeadId] = useState();
  const [serialNo, setserialNo] = useState(1);
  const [addForm] = Form.useForm();

  const [oneLeadData, setOneLeadData] = useState();
  const [LeadId, setLeadId] = useState();
  // {funtion to fetch each Lead data - Ann mariya }
  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${props.customer}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Unique Lead Id", res?.data?.data);
          setOneLeadData(res?.data?.data);
          setLeadId(res?.data?.data?.customer_id);
        } else {
          console.log("FAILED TO LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Error while getting data", err);
      });
  };
  console.log("Toggle state", props.toggle);

  // # funtion getcontacttable to fetch addresses - Noufal
  const getAllAddress = async () => {
    try {
      const allAddress = await PublicFetch.get(`${CRM_BASE_URL}/address`);
      if (allAddress.data.success) {
        setValue(allAddress.data.data);
        console.log("all address data", allAddress.data.data);
        // {array to show addresses of corresponding lead id in table - Ann mariya}
        let array = [];
        allAddress?.data?.data?.forEach((item, index) => {
          setAddressLeadId(item?.address_lead_id);
          if (props.customer === item?.address_customer_id) {
            array.push({
              address_title: item?.address_title,
              address_content: item?.address_content,
              address_pin: item?.address_pin,
              address_contact: item?.address_contact,
            });
          }
        });

        setAddressTable(array);
      } else {
        message.error("fetch data error");
      }
      console.log("All leads res : ", allAddress);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  useEffect(() => {
    if (props.customer) {
      getAllAddress();
      GetLeadData();
    }
  }, [LeadId, props.customer]);
  // { funtion to add address in lead edit - Ann mariya }
  const AddAddress = (data) => {
    PublicFetch.post(`${CRM_BASE_URL}/address`, {
      address_customer_id: parseInt(props.customer),
      address_title: title,
      address_content: address_data,
      address_pin: pincode,
      address_contact: phone,
    })
      .then(function (response) {
        console.log("hello", response);
        if (response.data.success) {
          getAllAddress();
          // setAddressTable();
          setAddress_data("");
          setPhone("");
          setPincode("");
          setTitle("");
          addForm.resetFields();
          setModalshowAdd(false);
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

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setModalShow(false);
      }, time);
    }
  };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      render: (value, item, index) => serialNo + index,
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
  console.log("address table", addressTable?.length);
  useEffect(() => {
    if (props.toggle == true && addressTable?.length <= 0) {
      setModalshowAdd(true);
      console.log("this ais test", modelshowAdd);
    }
  }, [props.toggle]);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <Button btnType="add" onClick={() => setModalshowAdd(true)}>
            Add <AiOutlinePlus />
          </Button>
        </div>
      </div>
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
                        min: 2,
                        message: "Title must be atleast 2 characters",
                      },
                      {
                        max: 100,
                        message: "Title cannot be longer than 100 characters",
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
                        message: "Address must be at least 2 characters",
                      },
                      {
                        max: 500,
                        message: "Address cannot be longer than 500 characters",
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
                    name="phone"
                    rules={[
                      {
                        required: true,
                        // pattern: new RegExp(
                        //   "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
                        // ),
                        message: "Please enter a valid phone number",
                      },
                    ]}
                  >
                    {/* <PhoneNumber
                      defaultCountry={"IN"}
                      value={phone}
                      id="contact_phone_1"
                      name="contact_phone_1"
                      onChange={(value) => setPhone(value)}
                    /> */}
                    <Phone_Input
                      value={phone}
                      onChange={(value) => setPhone(value)}
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
        centered
        size={`sm`}
        success
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default AddressTable;
