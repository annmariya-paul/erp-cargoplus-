//Opportunity adding model created 14.10.22 shahida

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { DatePicker, Form, Select } from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import { BsPlusCircleFill } from "react-icons/bs";
import CustomerModal from "../../../../components/CustomerModal.jsx/CustomerModal";
import Custom_model from "../../../../components/custom_modal/custom_model";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
  CRM_BASE_URL_HRMS,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { message } from "antd";
import { ROUTES } from "../../../../routes";
// import TextArea from "antd/lib/input/TextArea";
import "../opportunity_ List/opportunitylist.scss";
import SelectBox from "../../../../components/Select Box/SelectBox";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import FileUpload from "../../../../components/fileupload/fileUploader";
import Input_Number from "../../../../components/InputNumber/InputNumber";
// export default function AddOpportunity(props) {
export default function AddOpportunity() {
  const { id } = useParams();
  console.log("ID is ...", id);
  const [addForm] = Form.useForm();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const [modalOpportunity, setModalOpportunity] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [date, setDate] = useState();
  const [validityDate, setValidityDate] = useState();
  const [name, setName] = useState();
  const [modalAddCustomer, setModalAddCustomer] = useState(false);
  const [value, setValue] = useState([]);
  const [ShowEditModal, setShowEditModal] = useState(false); //oppertunity edit modal
  const [showProgressModal, setShowProgresssModal] = useState(false); //Oppoertunity progress modal
  const [SuccessPopup, setSuccessPopup] = useState(false); //success popups
  const [showViewModal, setShowViewModal] = useState(false);

  const [amount, setAmount] = useState();
  //  const result=Number(amount).toFixed(2);

  const numberChange = (e) => {
    const float = parseFloat(e.target.value);
    setOppAmount(float.toFixed(2));
  };
  const config = {
    rules: [{ required: true, message: "Please select Date!" }],
  };
  const [oppoNumber, setOppoNumber] = useState();
  const [opptype, setOppType] = useState(null);
  const [oppfrom, setOppFrom] = useState();
  const [oppId, setOppID] = useState(parseInt(id));
  const [oppsource, setOppSource] = useState();
  const [oppparty, setOppParty] = useState();
  // console.log(oppparty);
  // const [date, setDate] = useState(); //for date

  const [oppvalidity, setOppValidity] = useState();
  const [oppamount, setOppAmount] = useState();
  const [oppdescription, setOppDescription] = useState();
  const [oppstatus, setOppStatus] = useState();
  const [leadName, setLeadName] = useState("");
  const [opporFrom, setOpporFrom] = useState("customer");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imageSize, setImageSize] = useState(false);
  const [fileAttach, setFileAttach] = useState([]);
  const [allSalesPerson, setAllSalesPerson] = useState();
  const [selectedValues, setSelectedValues] = useState([]);
  const [Customer_Id, setCustomer_Id] = useState();

  const [Customer, setCustomer] = useState();
  const [customername, setCustomerName] = useState();
  console.log("customer id", customername);
  const [customernew, setCustomernew] = useState();
  console.log("customer nameee", customernew);
  const [AllCustomers, setAllCustomers] = useState();

  useEffect(() => {
    //
    if (customername) {
      GetAllCustomers();
      GetAllContacts();
      addForm.setFieldsValue({ oppo_customer: customername });
      setCustomer_Id(customername);
      handleclicknew(customername);
      // GetSingleCustomer(customername);
    }
  }, [customername]);

  const handleclicknew = (e) => {
    console.log("reached", e);
    GetSingleCustomer(e);
    // GetSingleContact(e);
  };

  const GetAllCustomers = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/minimal`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success og gettimg customers", res?.data?.data);
          setAllCustomers(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  //  const GetSalesPersons = () => {

  //   PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees/salesexecutive`)
  //     .then((res) => {
  //       console.log("response", res);
  //       if (res.data.success) {

  //         console.log("Success from sales person", res.data.data);
  //         setAllSalesPerson(res.data.data);
  //   const personName = localStorage.getItem('UserID');
  //   res.data.data.forEach((item,index)=> {
  //     if(personName == item.employee_id){
  //       addForm.setFieldsValue({
  //         salesperson: item.employee_id
  //       })
  //     }
  //   })

  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // };

  // useEffect(() => {
  //   GetSalesPersons();
  // }, []);
  console.log("cus id : and customer", Customer_Id, Customer);
  const handleMultiSelectChange = (event) => {
    const values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValues(values);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleAddImage = (e) => {
    console.log("handleAddImage", e);
    let temp = [];
    e?.fileList?.forEach((item, index) => {
      temp.push(item?.originFileObj);
    });
    console.log("tempereay file", temp);
  };

  // const GetLeadData = () => {
  //   PublicFetch.get(`${CRM_BASE_URL}/lead/${id}`)
  //     .then((res) => {
  //       if (res?.data?.success) {
  //         console.log("Unique Lead Id data", res?.data?.data);

  //         setLeadName(res?.data?.data?.lead_customer_name);
  //       } else {
  //         console.log("FAILED T LOAD DATA");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Errror while getting data", err);
  //     });
  // };

  const [enquiryData, setEnquiryData] = useState();
  const getAllEnquiry = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiries`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setEnquiryData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const [customersData, setCustomersData] = useState();
  console.log("ssssss", customersData);
  const getCustomers = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/minimal`)
      .then((res) => {
        console.log("response of customersss", res);
        if (res.data.success) {
          setCustomersData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllEnquiry();
    getCustomers();
    // GetLeadData();
  }, []);

  useEffect(() => {
    if (Customer_Id) {
      oneContact(Customer_Id);
    }
    // GetLeadData();
  }, [Customer_Id]);

  useEffect(() => {
    addForm.setFieldsValue({
      oppo_source: "reference",
      oppo_type: "sales",
      oppo_probability: "L",
      oppo_status: 1,
    });
  }, []);

  const [allIncoterms, setAllIncoterms] = useState();
  console.log("incoterm", allIncoterms);

  const getAllIncoterms = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/incoterms?startIndex=0&noOfItems=10`)
      .then((res) => {
        addForm.setFieldsValue({
          oppo_incoterm: res.data.data.incoterms[0].incoterm_id,
        });
        console.log("response", res);
        if (res.data.success) {
          setAllIncoterms(res.data.data.incoterms);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getAllIncoterms();
  }, []);

  // { function to add opportunity - Ann - 29/3/23}
  const newDate = new Date();
  const thisDate = moment(newDate);
  addForm.setFieldValue("oppor_date", thisDate);
  addForm.setFieldValue("oppo_validity", thisDate);

  const oppdata = (data) => {
    const date = moment(data.oppor_date).format("MM/DD/YYYY");
    const validityDate = moment(data.oppo_validity).format("MM/DD/YYYY");
    const formData = new FormData();
    formData.append("opportunity_date", date);
    formData.append("opportunity_customer_id", data.oppo_customer);
    formData.append("opportunity_from", opporFrom);
    formData.append("opportunity_customer_ref", data.oppo_customer_ref);
    formData.append("opportunity_source", data.oppo_source);
    formData.append("opportunity_contact_id", data.contact_person);
    formData.append("opportunity_party", data.contact_person);
    formData.append("opportunity_type", data.oppo_type);
    formData.append("opportunity_incoterm_id", data.oppo_incoterm);
    formData.append("opportunity_validity", validityDate);
    formData.append("opportunity_amount", data.oppo_amount);
    formData.append("opportunity_probability", data.oppo_probability);
    formData.append("opportunity_description", data.oppo_description);
    formData.append("opportunity_status", data.oppo_status);
    formData.append("opportunity_salesperson_id", data.sales_person);
    //  formData.append("opportunity_enquiries",JSON.stringify(data.oppo_enquiries));
    data.oppo_enquiries?.length &&
      data.oppo_enquiries.map((item, index) => {
        console.log("userdata task", index);

        formData.append(`opportunity_enquiries[${index}]`, item);
      });

    // formData.append("opportunity_enquiries",JSON.stringify(["8","9"]));
    // formData.append("opportunity_enquiries[0]",8);
    // formData.append("opportunity_enquiries[1]",9);
    // selectedValues.forEach((value) => {
    //   formData.append("opportunity_enquiries", value);
    // });

    if (fileAttach) {
      formData.append(`attachments`, fileAttach);
    }
    PublicFetch.post(`${CRM_BASE_URL}/opportunity`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          console.log("hello", res.data.data);
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(SuccessPopup, 1000);
        } else {
          console.log("helo", res.data.data);
          // setBrandError(res.data.data);
        }
      })
      .catch((err) => {
        console.log("error", err);
        // setError(true);
      });
  };
  const [AllContacts, setAllContacts] = useState();
  console.log("all contacts data", AllContacts);
  useEffect(() => {
    handleJobNo();
  }, []);

  // { function to get contacts - Ann - 29/3/23}
  const [custContacts, setCustContacts] = useState();
  const handleJobNo = (e) => {
    if (e) {
      PublicFetch.get(`${CRM_BASE_URL}/contact`)
        .then((res) => {
          console.log("response", res);
          if (res.data.success) {
            console.log("Success data", res.data.data);
            let temp = [];
            res?.data?.data?.forEach((i, index) => {
              if (e === i.contact_customer_id) {
                temp.push({
                  contact_id: i.contact_id,
                  contact_person_name: i.contact_person_name,
                });
              }
            });
            setCustContacts(temp);
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  // { function to get single contact - Ann - 29/3/23}
  const [contactdetail, setContactdetail] = useState();
  const oneContact = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/contact/${e}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success data of contact", res.data.data);
          setContactdetail(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const GetAllContacts = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/contact`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success of contact", res.data.data);
          // setAllContacts(res.data.data);
          let temp = [];
          res.data.data.forEach((item, index) => {
            if (e == item.enquiry_contact_person_id) {
              temp.push(item);
            }
          });
          setAllContacts(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(`${ROUTES.OPPORTUNITY}`);
      }, time);
    }
  };
  const handleDatas = (data) => {
    console.log("data", data);
    getOneEnquiry(data);
    // oneContact(Customer_Id)
    GetAllContacts(Customer_Id);
  };

  const [allenqdata, setAllEnqdata] = useState();
  console.log("all data", allenqdata);
  const getOneEnquiry = (e) => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiries/${e[0]}`).then((res) => {
      console.log("responsewww", res);
      if (res.data.success) {
        console.log("Success from one enquiry", res.data.data);
        setAllEnqdata(res.data.data);
        setCustomer(res.data.data.crm_v1_customer?.customer_id);
        setCustomer_Id(res.data.data.enquiry_contact_person_id);
        let a = res.data.data.crm_v1_contacts[0];
        addForm.setFieldsValue({
          oppo_customer: res.data.data.crm_v1_customer.customer_id,
          // contact_person:res.data.data.crm_v1_contacts.contact_id,
          // contactemail:res.data.data.crm_v1_contacts.contact_email,
          // contactphone:res.data.data.crm_v1_contacts.contact_phone_1,
        });
        PublicFetch.get(
          `${CRM_BASE_URL}/customer/${res.data.data.crm_v1_customer?.customer_id}`
        )
          .then((res) => {
            console.log("Response from single customer", res);
            if (res.data.success) {
              let a = res.data.data.crm_v1_contacts[0];
              setAllContacts(res.data.data.crm_v1_contacts);
              // let b =res.data.data.crm_v1_customer_accounting[0];
              let b = res.data.data.customer_preferred_freight_type;
              addForm.setFieldsValue({
                contact_person: a?.contact_id,
                contactemail: a?.contact_email,
                contactphone: a?.contact_phone_1,
                // customerfrighttype: b,
              });
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    });
  };

  const handleclick = (e) => {
    GetSingleCustomer(e);
  };
  const GetSingleCustomer = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${e}`)
      .then((res) => {
        console.log("Response from single customer", res);
        if (res.data.success) {
          console.log("Success from single customer", res.data.data);
          console.log("contact data", res.data.data.crm_v1_contacts[0]);
          console.log(
            "accounts data",
            res.data.data.customer_preferred_freight_type
          );
          let a = res.data.data.crm_v1_contacts[0];
          setAllContacts(res.data.data.crm_v1_contacts);
          // let b =res.data.data.crm_v1_customer_accounting[0];
          let b = res.data.data.customer_preferred_freight_type;
          addForm.setFieldsValue({
            contact_person: a?.contact_id,
            contactemail: a?.contact_email,
            contactphone: a?.contact_phone_1,
            customerfrighttype: b,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const GetSalesPersons = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees/salesexecutive`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success from sales person", res.data.data);
          setAllSalesPerson(res.data.data);
          const personName = localStorage.getItem("UserID");
          res.data.data.forEach((item, index) => {
            if (personName == item.employee_id) {
              addForm.setFieldsValue({
                sales_person: item.employee_id,
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    GetSalesPersons();
  }, []);

  const beforeUpload = (file, fileList) => {};

  return (
    <>
      <div className="container-fluid">
        <Form
          name="addForm"
          form={addForm}
          onFinish={(values) => {
            console.log("jobpayvalues", values);
            oppdata(values);
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row pt-2">
            <h5 className="lead_text">New Opportunity</h5>
          </div>

          <div className="row crm_cards mt-2 mx-0 px-2 py-4">
            <div className="col-12">
              <h6 className="lead_text">Basic Info</h6>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">Enquiry No.</label>
              <Form.Item
                name="oppo_enquiries"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please Select an Enquiry Number",
                //   },
                // ]}
              >
                <SelectBox
                  placeholder={"--Please Select--"}
                  mode="multiple"
                  // maxTagCount="responsive"
                  value={selectedValues}
                  // onChange={handleMultiSelectChange}
                  onChange={(e) => {
                    handleDatas(e);
                    console.log("reached", e);
                  }}
                  // value={oppoNumber}
                  // onChange={(e) => setOppoNumber(e.target.value)}
                >
                  {enquiryData &&
                    enquiryData.length > 0 &&
                    enquiryData.map((item, index) => {
                      return (
                        <Select.Option
                          value={item.enquiry_id}
                          key={item.enquiry_id}
                        >
                          {item.enquiry_no}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-1 d-flex">
              <div className="col-11">
                <label className="mb-1">
                  Customer<span className="req_star">*</span>
                </label>
                <Form.Item
                  name="oppo_customer"
                  rules={[
                    {
                      required: true,
                      message: "Please Select a Customer",
                    },
                  ]}
                >
                  <SelectBox
                    placeholder={"--Please Select--"}
                    // value={opptype}
                    onChange={(e) => {
                      setCustomer_Id(e);
                      GetAllContacts(e);
                      // addForm.resetFields();
                      handleclick(e);
                    }}
                  >
                    {customersData &&
                      customersData.length > 0 &&
                      customersData.map((item, index) => {
                        return (
                          <Select.Option
                            value={item.customer_id}
                            key={item.customer_id}
                          >
                            {item.customer_name}
                          </Select.Option>
                        );
                      })}
                  </SelectBox>
                </Form.Item>
              </div>
              <div className="col-1 mt-4 ps-1">
                {" "}
                <BsPlusCircleFill
                  style={{
                    fontSize: "21px",
                    marginTop: "10px",
                    marginLeft: "10px",
                    color: "#0891d1",
                  }}
                  onClick={() => {
                    setModalAddCustomer(true);
                    addForm.resetFields();
                  }}
                />
              </div>
            </div>

            <div className="col-sm-4 pt-1">
              <label className="mb-1">Date</label>
              <Form.Item
                name="oppor_date"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select an option",
                //   },
                // ]}
              >
                <DatePicker
                  style={{ borderWidth: 0, marginTop: 2 }}
                  format={"DD-MM-YYYY"}
                  defaultValue={moment(date)}
                />
              </Form.Item>
            </div>

            {/* <div className="col-sm-4 pt-2">
              <label>
                From<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_from"
                rules={[
                  {
                    required: true,
                    message: "Please Select a value",
                  },
                ]}
              >
                <SelectBox placeholder={"--Please Select--"}>
                  <Select.Option value="customer">Customer</Select.Option>
                  <Select.Option value="lead">Lead</Select.Option>
                </SelectBox>
              </Form.Item>
            </div> */}

            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Source<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_source"
                rules={[
                  {
                    required: true,
                    message: "Please Select a value",
                  },
                ]}
              >
                <SelectBox
                  // defaultValue="reference"
                  placeholder={"--Please Select--"}
                  // value={oppsource}
                  // onChange={(e) => setOppSource(e)}
                >
                  <Select.Option value="reference">reference</Select.Option>
                  <Select.Option value="direct visit">
                    direct visit
                  </Select.Option>
                  <Select.Option value="online registration">
                    online registration
                  </Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Customer Reference<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_customer_ref"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please enter a valid Customer Reference",
                //   },
                // ]}
              >
                <InputType />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Sale Person<span className="required">*</span>
              </label>
              <Form.Item
                name="sales_person"
                rules={[
                  {
                    required: true,
                    message: "Sales Person is Required",
                  },
                ]}
              >
                <SelectBox>
                  {allSalesPerson &&
                    allSalesPerson.length > 0 &&
                    allSalesPerson.map((item, index) => {
                      return (
                        <Select.Option
                          key={item.employee_id}
                          value={item.employee_id}
                        >
                          {item.employee_name}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>
          </div>
          <div className="row crm_cards mt-3 mx-0 px-2 py-4">
            <div className="col-12">
              <h6 className="lead_text">Contact Details</h6>
            </div>
            <div className="col-sm-4 pt-1">
              <label className="mb-1">
                Contact Person<span className="req_star">*</span>
              </label>
              <Form.Item
                name="contact_person"
                rules={[
                  {
                    required: true,
                    message: "Please Select a value",
                  },
                ]}
              >
                <SelectBox
                  placeholder={"--Please Select--"}
                  // value={oppprobability}
                  // onChange={(e) => oneContact(e)}
                >
                  {AllContacts &&
                    AllContacts.length > 0 &&
                    AllContacts.map((item, index) => {
                      console.log("item", item);
                      return (
                        <Select.Option
                          value={item.contact_id}
                          key={item.contact_id}
                        >
                          {item.contact_person_name}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label className="mb-1">Email</label>
              <Form.Item name="contactemail">
                <InputType
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                />
              </Form.Item>
              {/* <InputType disabled value={contactdetail?.contact_email} /> */}
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">Phone</label>
              <Form.Item name="contactphone">
                <InputType
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                />
              </Form.Item>
              {/* <InputType disabled value={contactdetail?.contact_phone_1} /> */}
            </div>
          </div>
          <div className="row crm_cards mt-3 mx-0 px-2 py-4">
            <div className="col-12">
              <h6 className="lead_text">Extra Info</h6>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Opportunity Type<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_type"
                rules={[
                  {
                    required: true,
                    message: "Please select a Type",
                  },
                ]}
              >
                <SelectBox
                // defaultValue="sales"
                // value={oppurtunitytype}
                // onChange={(e) => {
                //   setoppurtunitytype(e);
                // }}
                >
                  <Select.Option value="sales">Sales</Select.Option>
                  <Select.Option value="support">Support</Select.Option>
                  <Select.Option value="maintenance">Maintenance</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4  pt-2">
              <label className="mb-1">
                Valid Up to<span className="req_star">*</span>
              </label>
              <Form.Item name="oppo_validity" {...config}>
                <DatePicker
                  style={{ borderWidth: 0, marginTop: 2 }}
                  format={"DD-MM-YYYY"}
                  defaultValue={moment(validityDate)}
                  // initialValues={oppurtunityvalidity}
                  // format={dateFormatList}
                  // disabledDate={(d) => !d || d.isBefore(today)}
                  // onChange={(e) => {
                  //   console.log("date mmm", e);
                  //   setOppurtunityvalidity(e);
                  // }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Expecting Amount<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid amount",
                  },
                ]}
              >
                <Input_Number precision={2} />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Probability of conversion<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_probability"
                rules={[
                  {
                    required: true,
                    message: "please select valid Name",
                  },
                ]}
              >
                <SelectBox
                // defaultValue="M"
                // value={oppurtunityprobability}
                // onChange={(e) => {
                //   setOppurtunityProbability(e);
                // }}
                >
                  <Select.Option value="L">low</Select.Option>
                  <Select.Option value="M">medium</Select.Option>
                  <Select.Option value="H">high</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Incoterm<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_incoterm"
                rules={[
                  {
                    required: true,
                    message: "please select an incoterm",
                  },
                ]}
              >
                <SelectBox
                  placeholder={"--Please Select--"}
                  // value={oppprobability}
                  // onChange={(e) => oneContact(e)}
                >
                  {allIncoterms &&
                    allIncoterms.length > 0 &&
                    allIncoterms.map((item, index) => {
                      console.log("item", item);
                      return (
                        <Select.Option
                          value={item.incoterm_id}
                          key={item.incoterm_id}
                        >
                          {item.incoterm_short_name}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Status<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_status"
                rules={[
                  {
                    required: true,
                    message: "Please Select a value",
                  },
                ]}
              >
                <SelectBox
                  //  defaultValue={1}
                  placeholder={"--Please Select--"}
                  value={oppstatus}
                  onChange={(e) => setOppStatus(e)}
                >
                  <Select.Option value={1}>New</Select.Option>
                  <Select.Option value={2}>Interested</Select.Option>
                  <Select.Option value={3}>Converted</Select.Option>
                  <Select.Option value={4}>Lost</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-6 pt-2">
              <label>
                Remarks<span className="req_star">*</span>
              </label>
              <Form.Item
                className="mt-2"
                name="oppo_description"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please enter valid details",
                //   },
                // ]}
              >
                <TextArea
                  value={oppdescription}
                  onChange={(e) => setOppDescription(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-sm-6 mt-2">
              <label>Attachments</label>
              <Form.Item name="attachments" className="mt-2">
                <FileUpload
                  multiple
                  // filetype={"Accept only pdf, docx and zip"}
                  listType="picture"
                  accept=".pdf,.docx,.zip,.jpeg"
                  height={100}
                  beforeUpload={beforeUpload}
                  onChange={(file) => {
                    console.log("Before upload file size", file.file.size);
                    if (file.file.size > 2000 && file.file.size < 500000) {
                      setFileAttach(file.file.originFileObj);
                      setImageSize(false);
                      console.log("select imaggg", file.file.originFileObj);
                      console.log(
                        "image is greater than 2 kb and less than 500 kb"
                      );
                    } else {
                      setImageSize(true);
                      console.log("Error in image upload");
                    }
                  }}
                />
                {imageSize ? (
                  <p style={{ color: "red" }}>
                    Upload File size between 2 kb and 500 kb
                  </p>
                ) : (
                  ""
                )}
              </Form.Item>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-center py-3 gap-3">
            <Button btnType="save">Save</Button>
            <Button
              as="input"
              type="reset"
              value="Reset"
              onClick={() => {
                navigate(ROUTES.OPPORTUNITY);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
        {/* </>
        }
        // {...props}
      ></Custom_model> */}

        {/* Modal for add Customer */}
        <CustomerModal
          setCustomerName={setCustomerName}
          setCustomernew={setCustomernew}
          show={modalAddCustomer}
          onHide={() => {
            setModalAddCustomer(false);
          }}
        />
        <Custom_model
          // size={`sm`}
          success
          show={SuccessPopup}
          onHide={() => setSuccessPopup(false)}
          footer={false}
        />
      </div>
    </>
  );
}
