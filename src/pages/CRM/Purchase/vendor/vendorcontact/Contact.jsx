import "./contact.scss";
import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../../../../components/button/button";
import TableData from "../../../../../components/table/table_data";
import Custom_model from "../../../../../components/custom_modal/custom_model";
import InputType from "../../../../../components/Input Type textbox/InputType";
import Phone_Input from "../../../../../components/PhoneInput/phoneInput";
import { CRM_BASE_URL_PURCHASING } from "../../../../../api/bootapi";
import PublicFetch from "../../../../../utils/PublicFetch";
import { FaEdit, FaTrash } from "react-icons/fa";

function Contact({vendor,toggle }) {
  const [contactTable, setContactTable] = useState();
//   const [contactCustomerId, setContactCustomerId] = useState();
//   const [ContactName, setContactName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [designation, setDesignation] = useState("");
  const [serialNo, setserialNo] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [showSuccessMOdal, setShowSuccessModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [addForm] = Form.useForm();

  const [allcontact,setallcontact]=useState()
  const [editmodalShow, seteditModalShow] = useState(false);
  const [editForm] = Form.useForm();

  const[vendcontactid,setvendcontactid]= useState()
  const [vendorId, setvendorId] = useState();
 
  const Getvendordata = () => {
    PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/${vendor?.vendor_id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("one vendor dataa contacts", res?.data?.data);
          // setOneLeadData(res?.data?.data);
          setvendorId(res?.data?.data?.vendor_id);
        } else {
          console.log("FAILED TO LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Error while getting data", err);
      });
  };

  const  createvendorcontacts = async (data) => {
    try {
      const addvendorcontacts = await PublicFetch.post(
        `${process.env.REACT_APP_BASE_URL}/crm/purchase/v1/vendor-contact`,
        {
          ven_contact_vendor_id: vendor?.vendor_id,
          ven_contact_person_name:data.ContactName,
          ven_contact_email: data.contactemail,
          ven_contact_phone_1: data.contactphone1,
          ven_contact_phone_2: data.contactphone2,
          ven_contact_designation: data.contactdesignation,
        }
      );
      console.log("successfully add vendorcontacts", addvendorcontacts);
      if (addvendorcontacts.data.success) {
        getvendorcontacts()
         setModalShow(false)
         addForm.resetFields()
        setShowSuccessModal(true);
        close_modal(showSuccessMOdal, 1000);

      }
      // setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendorcontacts", err);
    }
  };

  const getvendorcontacts = async () => {
    try {
      const allvendorcontacts = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/crm/purchase/v1/vendor-contact`
      );
      console.log("getting all  vendorcontacts", allvendorcontacts);
      if(allvendorcontacts.data.success){

        let array = [];
        allvendorcontacts?.data?.data?.forEach((item, index) => {
         
          if (vendor?.vendor_id === item?.ven_contact_vendor_id) {
            console.log("contactdetails in one vendor", item);
            array.push({
             contact_person_name: item?.ven_contact_person_name,
             contact_email: item?.ven_contact_email,
             contact_phone_1: item?.ven_contact_phone_1,
             contact_phone_2: item?.ven_contact_phone_2,
             contact_designation:item?.ven_contact_designation,
             contact_id:item?.ven_contact_id
            });
          }
        });
        setallcontact([...array])

      }
      // setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendorcontacts", err);
    }
  };

  const  updateaddvendorcontacts = async (data) => {
    try {
      const editvendorcontacts = await PublicFetch.patch(
        `${process.env.REACT_APP_BASE_URL}/crm/purchase/v1/vendor-contact/${vendcontactid}`,
        {
          ven_contact_vendor_id: vendor?.vendor_id,
          ven_contact_person_name:data.editcontactName,
          ven_contact_email: data.editcontactemail,
          ven_contact_phone_1: data.editcontactphone1,
          ven_contact_phone_2: data.editcontactphone2,
          ven_contact_designation: data.editcontactdesignation,
        }
      );
      console.log("successfully update vendorcontacts", editvendorcontacts);
      if (editvendorcontacts.data.success) {
        getvendorcontacts()
        seteditModalShow(false)
        // addForm.resetFields()
       setShowSuccessModal(true);
       close_modal(showSuccessMOdal, 1000);

      }
      
    } catch (err) {
      console.log("error to fetching  vendorcontacts", err);
    }
  };

 
  const handleEditedclick= (e)=>{
    console.log("editvendor contact",e)
    setvendcontactid(e.contact_id)
   editForm.setFieldsValue({
    editcontactName:e.contact_person_name,
    editcontactemail:e.contact_email,
    editcontactdesignation:e.contact_designation,
    editcontactphone1:e.contact_phone_1,
    editcontactphone2:e.contact_phone_2,
   })

    seteditModalShow(true)
  }


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
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: "15%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center gap-2">
            <div className="editcolor">
              <FaEdit
              onClick={() => handleEditedclick(index)} 
              />
            </div>
            <div className="editcolor">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];




  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setShowSuccessModal(false);
      }, time);
    }
  };
  useEffect(() => {
    if (vendor?.vendor_id) {
        getvendorcontacts();
      Getvendordata()
    }
  }, [vendorId, vendor?.vendor_id]);


  useEffect(() => {
    if (toggle == true && allcontact?.length <= 0) {
      setModalShow(true);
      console.log("this ais test", modalShow);
    }
  }, [toggle, allcontact?.length]);


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
          data={allcontact}
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
       
        list_content={
          <>
            <div className="row ">
              <h5 className="lead_text">New Contact</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
                createvendorcontacts(values)
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row pt-3">
                <div className="px-3">
                  <label className="mt-3">Name
                  <span className="required">*</span>
                  </label>
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
                    //   value={ContactName}
                    //   onChange={(e) => setContactName(e.target.value)}
                    />
                  </Form.Item>
                  <label className="mt-3">Designation
                  <span className="required">*</span></label>
                  <Form.Item
                    name="contactdesignation"
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
                    //   value={designation}
                    //   onChange={(e) => setDesignation(e.target.value)}
                    />
                  </Form.Item>
                  <label className="mt-3">Phone 
                  <span className="required">*</span></label>
                  <Form.Item
                    name="contactphone1"
                    className="mt-1"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid phone number",
                      },
                    ]}
                  >
                   
                   
                    <Phone_Input
                      countryCodeEditable={false}
                    //   value={phone}
                    //   onChange={(value) => setPhone(value)}
                    />
                  </Form.Item>

                  <label className="mt-3">Mobile</label>
                  <Form.Item 
                  name="contactphone2" 
                  className="mt-1">
                    <Phone_Input
                    //   value={mobile}
                    //   onChange={(value) => setMobile(value)}
                    />
                  </Form.Item>

                  <label className="mt-3">Email
                  <span className="required">*</span></label>
                  <Form.Item
                    name="contactemail"
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
                    //   value={email}
                    //   onChange={(e) => setEmail(e.target.value)}
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
        bodyStyle={{ height: 580, overflowY: "auto" }}
        show={editmodalShow}
        onHide={() => seteditModalShow(false)}
        View_list
        footer={false}
       
        list_content={
          <>
            <div className="row ">
              <h5 className="lead_text">Edit Contact</h5>
            </div>
            <Form
              form={editForm}
              onFinish={(values) => {
                console.log("values iss", values);
                updateaddvendorcontacts(values)
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row pt-3">
                <div className="px-3">
                  <label className="mt-3">Name</label>
                  <Form.Item
                    name="editcontactName"
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
                    //   value={ContactName}
                    //   onChange={(e) => setContactName(e.target.value)}
                    />
                  </Form.Item>
                  <label className="mt-3">Designation</label>
                  <Form.Item
                    name="editcontactdesignation"
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
                    //   value={designation}
                    //   onChange={(e) => setDesignation(e.target.value)}
                    />
                  </Form.Item>
                  <label className="mt-3">Phone </label>
                  <Form.Item
                    name="editcontactphone1"
                    className="mt-1"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid phone number",
                      },
                    ]}
                  >
                   
                   
                    <Phone_Input
                      countryCodeEditable={false}
                    //   value={phone}
                    //   onChange={(value) => setPhone(value)}
                    />
                  </Form.Item>

                  <label className="mt-3">Mobile</label>
                  <Form.Item 
                  name="editcontactphone2" 
                  className="mt-1">
                    <Phone_Input
                    //   value={mobile}
                    //   onChange={(value) => setMobile(value)}
                    />
                  </Form.Item>

                  <label className="mt-3">Email</label>
                  <Form.Item
                    name="editcontactemail"
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
                    //   value={email}
                    //   onChange={(e) => setEmail(e.target.value)}
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

export default Contact;
