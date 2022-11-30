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
import PhoneInput from "react-phone-input-2";
import PhoneNumber from "../../../../components/phone_number/phonenumber";

import Lead from "../lead";

function ContactTable(props) {
  const [contactTable, setContactTable] = useState();
  const [contactLeadId, setContactLeadId] = useState();
  const [phone, setPhone] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [mobile, setMobile] = useState();
  const [modalShow, setModalShow] = useState(true);
  const [showSuccessMOdal, setShowSuccessModal] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [ContactName, setContactName] = useState();
  const [email, setEmail] = useState();
  // const [phoneno, setPhoneno] = useState();
  const [AllContact, setAllcontact] = useState({});
  const [designation, setDesignation] = useState();
  const [validated, setValidated] = useState(false);
  const [validateErr, setValidateErr] = useState(false);
  const [showError, setShowError] = useState(false);
  const [addForm] = Form.useForm();

  // const getoneleads = async () => {
  //   try {
  //     const onelead = await PublicFetch.get(
  //       `${CRM_BASE_URL}/lead/${props.lead}`
  //     );
  //     console.log("getoneleaddds isss", onelead);
  //   } catch (err) {
  //     console.log("error while getting all leads: ", err);
  //   }
  // };

  const [oneLeadData, setOneLeadData] = useState();
  const [LeadId, setLeadId] = useState();
  // {funtion to fetch each Lead data - Ann mariya (22/11/22) }
  console.log("hai halo", props.lead);
  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/lead/${props.lead}`)
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
  // # funtion getcontacttable to fetch contacts to contact table - Noufal
  const getcontacttable = () => {
    PublicFetch.get(`${CRM_BASE_URL}/contact`)
      .then((res) => {
        console.log("fjehfer", res);
        if (res.data.success) {
          let array = [];
          res?.data?.data?.forEach((item, index) => {
            setContactLeadId(item?.contact_lead_id);
            if (LeadId === item?.contact_lead_id) {
              {
                array.push({
                  // contact_id: item?.contact_id,
                  contact_person_name: item?.contact_person_name,
                  contact_email: item?.contact_email,
                  contact_phone_1: item?.contact_phone_1,
                  contact_phone_2: item?.contact_phone_2,
                  contact_designation: item?.contact_designation,
                });
                setContactTable(array);
              }
            }
          });

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
    getcontacttable();
    GetLeadData();
  }, [LeadId]);

  const columns = [
    {
      title: "#",
      dataIndex: "contact_id",
      key: "contact_id",
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
      contact_lead_id: parseInt(props.lead),
      contact_person_name: ContactName,
      contact_email: email,
      contact_phone_1: phone,
      contact_phone_2: mobile,
      contact_designation: designation,
    })
      .then((res) => {
        console.log("contact data,", res);
        if (res.data.success) {
          getcontacttable();
          setContactName();
          setEmail();
          setPhone();
          setMobile();
          setDesignation();
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

  return (
    <div>
      <div className="datatable">
        <TableData
          data={contactTable}
          columns={columns}
          custom_table_css="contact_table"
        />
      </div>
      <Custom_model
        bodyStyle={{ height: 620, overflowY: "auto" }}
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
              <div className="row mt-3">
                <div className="px-3">
                  <label>Name</label>
                  <Form.Item
                    name="ContactName"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a Valid Name",
                      },
                      {
                        whitespace: true,
                      },
                      {
                        min: 2,
                        message: "Name must be atleast 2 characters",
                      },
                      {
                        max: 100,
                      },
                    ]}
                  >
                    <InputType
                      value={ContactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </Form.Item>

                  <label>Email</label>
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

                  <label>Phone Primary</label>
                  <Form.Item
                    className=" mt-1"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp(
                          "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
                        ),
                        message: "Please enter a Valid Phone number",
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
                    <PhoneInput
                      country={"in"}
                      enableSearch={true}
                      countryCodeEditable={false}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                    />
                  </Form.Item>

                  <label className="mb-2">Phone Secondary</label>
                  <Form.Item name="mobile" 
                  className="mt-1">
                    {/* <PhoneNumber
                      defaultCountry={"IN"}
                      value={mobile}
                      id="contact_phone_2"
                      name="contact_phone_2"
                      onChange={(value) => setMobile(value)}
                    /> */}
                    <PhoneInput
                      country={"in"}
                      enableSearch={true}
                      value={mobile}
                      countryCodeEditable={false}
                      onChange={(value) => setMobile(value)}
                    />
                  </Form.Item>

                  <label>Designation</label>
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
                        message: "Designation must be atleast 2 characters",
                      },
                      {
                        max: 100,
                      },
                    ]}
                  >
                    <InputType
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
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
      ></Custom_model>
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
