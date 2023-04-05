import "./table.scss";
import TableData from "../../../../components/table/table_data";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import { Form, message } from "antd";
import InputType from "../../../../components/Input Type textbox/InputType";
import PhoneNumber from "../../../../components/phone_number/phonenumber";
import Phone_Input from "../../../../components/PhoneInput/phoneInput";
import { AiOutlinePlus } from "react-icons/ai";

function ContactTable(props) {
  const [contactTable, setContactTable] = useState();
  const [contactCustomerId, setContactCustomerId] = useState();
  const [ContactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [serialNo, setserialNo] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [showSuccessMOdal, setShowSuccessModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [addForm] = Form.useForm();

  const [oneLeadData, setOneLeadData] = useState();
  const [CustomerId, setCustomerId] = useState();
  // {funtion to fetch each Lead data - Ann mariya (22/11/22) }
  console.log("hai halo", props.customer);

  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${props?.customer}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Unique Lead Id", res?.data?.data);
          setOneLeadData(res?.data?.data);
          setCustomerId(res?.data?.data?.customer_id);
        } else {
          console.log("FAILED TO LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Error while getting data", err);
      });
  };

  // # funtion getcontacttable to fetch contacts to contact table - Noufal
  const getcontacttable = () => {
    PublicFetch.get(`${CRM_BASE_URL}/contact`)
      .then((res) => {
        console.log("all contacts data", res);
        if (res?.data?.success) {
          // # array to set contacts of corresponding Lead Id - Ann Mariya
          let array = [];
          res?.data?.data?.forEach((item, index) => {
            setContactCustomerId(item?.contact_customer_id);
            console.log("Lead Id : ", CustomerId);
            if (props.customer === item?.contact_customer_id) {
              console.log("Insie if", item);
              array.push({
                contact_person_name: item?.contact_person_name,
                contact_email: item?.contact_email,
                contact_phone_1: item?.contact_phone_1,
                contact_phone_2: item?.contact_phone_2,
                contact_designation: item?.contact_designation,
              });
            }
          });
          setContactTable([...array]);

          // setContactTable(res.data.data);
        } else {
          console.log("Failed to fetch data");
        }
      })
      .catch((err) => {
        console.log("Error While Getting Data", err);
      });
  };

  useEffect(() => {
    if (props.customer) {
      getcontacttable();
      GetLeadData();
    }
    // AddContact();
  }, [CustomerId, props.customer]);

  // const close_modal2 = (time) => {
  //   setTimeout(() => {
  //     getcontacttable();
  //   });
  // };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "NAME",
      dataIndex: "contact_person_name",
      key: "contact_email",
    },
    {
      title: "EMAIL",
      dataIndex: "contact_email",
      key: "contact_email",
    },
    {
      title: "PHONE",
      dataIndex: "contact_phone_1",
      key: "contact_phone_1",
    },
    {
      title: "MOBILE",
      dataIndex: "contact_phone_2",
      key: "contact_phone_2",
    },
    {
      title: "DESIGNATION",
      dataIndex: "contact_designation",
      key: "contact_designation",
    },
  ];

  // # function AddContact to add contacts - Noufal
  const AddContact = () => {
    PublicFetch.post(`${CRM_BASE_URL}/contact`, {
      contact_customer_id: parseInt(props.customer),
      contact_person_name: ContactName,
      contact_email: email,
      contact_phone_1: phone,
      contact_phone_2: mobile,
      contact_designation: designation,
    })
      .then((res) => {
        console.log("contact data,", res);
        if (res?.data?.success) {
          getcontacttable();
          // setContactTable();
          setContactName("");
          setEmail("");
          setPhone("");
          setMobile("");
          setDesignation("");
          addForm.resetFields();
          setModalShow(false);
          setShowSuccessModal(true);
          close_modal(showSuccessMOdal, 1200);
          props.onHide();
        } else {
          console.log("Cannot Get Data while fetching");
        }
      })
      .catch((err) => {
        console.log("error while adding data", err);
      });
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setShowSuccessModal(false);
      }, time);
    }
  };

  useEffect(() => {
    if (props.toggle == true && contactTable?.length <= 0) {
      setModalShow(true);
      console.log("this ais test", modalShow);
    }
  }, [props.toggle, contactTable?.length]);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <Button btnType="add" onClick={() => setModalShow(true)}>
            New Contact <AiOutlinePlus />
          </Button>
        </div>
      </div>
      <div className="datatable">
        <TableData
          data={contactTable}
          columns={columns}
          custom_table_css="contact_table"
        />
      </div>
      <Custom_model
        bodyStyle={{ height: 580, overflowY: "auto" }}
        show={modalShow}
        onHide={() => setModalShow(false)}
        View_list
        footer={false}
        {...props}
        list_content={
          <>
            <div className="row ">
              <h5 className="lead_text">Add Contact</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
                AddContact();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row pt-3">
                <div className="px-3">
                  <label className="mt-3">Name</label>
                  <Form.Item
                    name="ContactName"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid Name",
                      },
                      {
                        min: 2,
                        message: "Name must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message: "Name cannot be langer than 100 characters",
                      },
                    ]}
                  >
                    <InputType
                      value={ContactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </Form.Item>
                  <label className="mt-3">Designation</label>
                  <Form.Item
                    name="designation"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid Designation",
                      },
                      {
                        whitespace: true,
                      },
                      {
                        min: 2,
                        message: "Designation must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message:
                          "Designation cannot be longer than 100 characters",
                      },
                    ]}
                  >
                    <InputType
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </Form.Item>
                  <label className="mt-3">Phone </label>
                  <Form.Item
                    name="phone"
                    className="mt-1"
                    rules={[
                      {
                        required: true,
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
                      countryCodeEditable={false}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                    />
                  </Form.Item>

                  <label className="mt-3">Mobile</label>
                  <Form.Item name="mobile" className="mt-1">
                    {/* <PhoneNumber
                      defaultCountry={"IN"}
                      value={mobile}
                      id="contact_phone_2"
                      name="contact_phone_2"
                      onChange={(value) => setMobile(value)}
                    /> */}
                    <Phone_Input
                      value={mobile}
                      onChange={(value) => setMobile(value)}
                    />
                  </Form.Item>

                  <label className="mt-3">Email</label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp(
                          "^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
                        ),
                        message: "Please enter a Valid Email",
                      },
                    ]}
                  >
                    <InputType
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="d-flex justify-content-center mt-5">
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
        show={showSuccessMOdal}
        onHide={() => setShowSuccessModal(false)}
      />
    </div>
  );
}

export default ContactTable;
