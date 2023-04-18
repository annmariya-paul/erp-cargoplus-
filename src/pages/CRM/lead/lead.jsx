import React, { useEffect, useState } from "react";
import "./lead.styles.scss";
import { Link } from "react-router-dom";
// import { Form } from "react-bootstrap";
import { Form, Input, Radio } from "antd";
import Button from "../../../components/button/button";
import { ROUTES } from "../../../routes";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import FileUpload from "../../../components/fileupload/fileUploader";
import ContactTable from "./tables/contactstable";
import AddressTable from "./tables/addresstable";
import AddAddress from "./modals/addaddress";
import AddContact from "./modals/addcontact";
import AddOpportunity from "./modals/addopportunity";
import PublicFetch from "../../../utils/PublicFetch";
import { LeadStatus } from "../../../utils/SelectOptions";
import { CRM_BASE_URL, GENERAL_SETTING_BASE_URL } from "../../../api/bootapi";
// import ErrorMsg from "../../components/errormessage";
import Countrystate from "./accountings/Accounting";
import Custom_model from "../../../components/custom_modal/custom_model";
import { message, Select } from "antd";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputType from "../../../components/Input Type textbox/InputType";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../check Unique/CheckUnique";
import Phone_Input from "../../../components/PhoneInput/phoneInput";
import Moreinfo from "./accountings/MoreInfo";
// import { useForm } from "react-hook-form";
// import {  message } from 'antd';

function Lead({}) {
  const [toggleState, setToggleState] = useState(1);
  const [basicinfoData, setBasicinfoData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalAddress, setModalAddress] = useState(false);
  const [modalOpportunity, setModalOpportunity] = useState(false);
  const [leadType, setLeadType] = useState("C");
  const [FileSizeError, setFileSizeError] = useState(false);
  const [leadName, setLeadName] = useState();
  const [leadUsertype, setLeadUsertype] = useState("organization");
  const [organizationDisable, setOrganizationDisable] = useState();
  const [leadOrganization, setLeadOrganization] = useState("");
  const [leadSource, setLeadSource] = useState("online registration");
  const [leadDescription, setLeadDescription] = useState("");
  const [leadAttachment, setLeadAttachment] = useState();
  const [leadStatus, setLeadStatus] = useState("4");
  const [CustomerId, setCustomerId] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [leadimg, setLeadimg] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [leadcreditdays, setLeadcreditdays] = useState(10);
  const [uniqueCode, setuniqueCode] = useState();
  const [timeOut, setTimeOuts] = useState(false);
  const [Toggle4, setToggle4] = useState(false);
  const [countries, setCountries] = useState("");
  const [isAccountsave, setIsAccountSave] = useState();
  const [contactTable, setContactTable] = useState();

  const [customerdetails, setcustomerdetails] = useState();

  const [addForm] = Form.useForm();

  const [error, setError] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const errormessage = () => {
    messageApi.open({
      type: "error",
      content: "Create a Customer",
    });
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

  const close_modal = (mShow, time, customer) => {
    if (!mShow) {
      setTimeout(() => {
        setModalShow(false);
        setTimeOuts(true);
        setCustomerId(customer?.customer_id);
        setcustomerdetails(customer);
        toggleTab(2);
      }, time);
    }
  };

  const getallContacts = () => {
    PublicFetch.get(`${CRM_BASE_URL}/contact`)
      .then((res) => {
        console.log("Contact table data".res);
        if (res.data.success) {
          res?.data?.data?.forEach((item, index) => {
            if (CustomerId == item.contact_customer_id) {
              console.log("ys its contatact of customer");
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getAllCountries = async () => {
    try {
      const allCountries = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/country`
      );
      console.log("countries are", allCountries.data.data);
      setCountries(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };
  // const Submit = () => {         /// old lead api creating a lead
  //   setFormSubmitted(true);
  //   const formData = new FormData();
  //   formData.append("lead_type", leadType);
  //   formData.append("lead_customer_name", leadName);
  //   formData.append("lead_user_type", leadUsertype);
  //   formData.append("lead_organization", leadOrganization);
  //   formData.append("lead_source", leadSource);
  //   formData.append("lead_credit_days", leadcreditdays);
  //   if (leadDescription) {
  //     formData.append("lead_description", leadDescription);
  //   }
  //   formData.append("attachments", leadimg);
  //   formData.append("lead_status", leadStatus);
  //   //  console.log(data);
  //   PublicFetch.post(`${CRM_BASE_URL}/lead`, formData, {
  //     "Content-Type": "Multipart/form-Data",
  //   })
  //     .then(function (response) {
  //       console.log("hello", response);
  //       if (response.data.success) {
  //         console.log("hello", response.data.data);
  //         setLeadType();
  //         setLeadName();
  //         setLeadUsertype();
  //         setLeadOrganization();
  //         setLeadSource();
  //         setLeadAttachment();
  //         setLeadDescription();
  //         setLeadStatus();
  //         setModalShow(true);
  //         close_modal(modalShow, 1000, response?.data?.data?.lead_id);
  //         setModalContact(false);
  //         let idoflead = response?.data?.data?.lead_id;
  //         setLeadcreditdays();
  //       } else {
  //         console.log("Failed while adding data");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   // }
  // };

  const createCustomer = (data) => {
    const formData = new FormData();
    formData.append(`customer_name`, data.customer_name);
    formData.append(`customer_type`, data.customer_type);
    formData.append(`customer_address`, data.customer_address);
    formData.append(`customer_phone`, data.customer_phone);
    formData.append(`customer_email`, data.customer_email);

    data?.customer_website && formData.append(`customer_website`, data.customer_website);
    data?.customer_remarks && formData.append(`customer_remarks`, data.customer_remarks);
    data?.customer_country && formData.append(`customer_country`, data.customer_country);
    data?.customer_state &&  formData.append(`customer_state`, data.customer_state);
    data?.customer_city && formData.append(`customer_city`, data.customer_city);
    
    if (leadimg) {
      formData.append(`customer_logo`, leadimg);
    }

    PublicFetch.post(`${CRM_BASE_URL}/customer`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setModalShow(true);
          close_modal(modalShow, 1000, res?.data?.data);
          setModalContact(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const options = [
    {
      value: "L",
      label: "Lead",
    },
    {
      value: "c",
      label: "Customer",
    },
  ];

  console.log("lead id::", CustomerId);

  // console.log("leadd id iss", leadType.leadtypes.options[0]);
  const beforeUpload = (file, fileList) => {};

  const handleAddImage = (e) => {
    console.log("handleAddImage", e);
    let temp = [];
    e?.fileList?.forEach((item, index) => {
      temp.push(item?.originFileObj);
    });
    console.log("tempereay file", temp);
  };

  const handleAddressTab = (e) => {
    if (e) {
      setToggle4(true);
      setTimeOuts(false);
      toggleTab(3);
    }
  };
  const handleContactTab = (e) => {
    if (e) {
      setTimeOuts(true);
      setToggle4(false);
      toggleTab(2);
    }
  };

  const handleAccountingTab = () => {
    toggleTab(4);
    setTimeOuts(false);
    setToggle4(false);
  };

  const handleMoreinfoTab = () => {
    toggleTab(5);
    // setTimeOuts(false);
    // setToggle4(false);
  };

  useEffect(() => {
    addForm.setFieldsValue({ customer_type: "organization" });
    if (CustomerId) {
      getallContacts();
    }
    getAllCountries();
  }, [CustomerId]);

  console.log("uegwy", isAccountsave);

  return (
    <>
      {contextHolder}
      <h5 className="lead_text">Add Customer</h5>
      <div className="container-fluid">
        <div className="lead_container">
          <div className="row justify-content-md-center">
            <div className="bloc-tabs tabs-responsive">
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  id="button-tabs"
                  className={toggleState === 1 ? "tabs active-tabs " : "tabs "}
                  onClick={() => {
                    toggleTab(1);
                    setTimeOuts(false);
                    setToggle4(false);
                  }}
                >
                  Basic Info
                </button>
              </div>
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  id="button-tabs"
                  className={toggleState === 2 ? "tabs active-tabs " : "tabs "}
                  onClick={(e) => {
                    CustomerId == null ? errormessage() : handleContactTab(e);
                  }}
                >
                  Contacts
                </button>
              </div>
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  id="button-tabs"
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={(e) => {
                    CustomerId == null ? errormessage() : handleAddressTab(e);
                  }}
                >
                  Address
                </button>
              </div>
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                  onClick={(e) => {
                    CustomerId == null
                      ? errormessage()
                      : handleAccountingTab(e);
                  }}
                >
                  Accounting
                </button>
              </div>
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
                  onClick={(e) => {
                    // CustomerId !== null ? errormessage(): handleAccountingTab(e);
                    handleMoreinfoTab();
                  }}
                >
                  MoreInfo
                </button>
              </div>
            </div>

            <div className="content-tabs">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                {/* <div className="col-12"> */}
                {/* <div className="row mb-2 justify-content-end">
                  <div
                    className="col-md-3 col-xl-2 col-sm-6 d-flex"
                    style={{ justifyContent: "center" }}
                  >
                    <Button
                      btnType="add_borderless"
                      onClick={() => setModalOpportunity(true)}
                    >
                      <BsPlusCircleFill style={{ fontSize: "16px" }} /> Add
                      Opportunity
                    </Button>
                    <AddOpportunity
                      show={modalOpportunity}
                      onHide={() => setModalOpportunity(false)}
                      style="width:1250px"
                    />
                  </div>
                  <div
                    className="col-md-3 col-xl-2 col-sm-6 d-flex"
                    style={{ justifyContent: "center" }}
                  >
                    <Link to={ROUTES.OPPORTUNITY} className="nav-link">
                      <Button onClick={Submit} btnType="add_borderless">
                        <BsPlusCircleFill style={{ fontSize: "16px" }} /> View
                        Opportunity
                      </Button>
                    </Link>
                  </div>
                </div> */}
                {/* </div> */}

                <Form
                  form={addForm}
                  onFinish={(value) => {
                    console.log("values111333", value);
                    // Submit();
                    createCustomer(value);
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row px-1">
                    {/* <div className="col-sm-4 pt-2">
                      <label>Type</label>
                      <Form.Item
                        name="leadType"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          value={leadType}
                          onChange={(e) => setLeadType(e)}
                        >
                          <Select.Option value="L">Lead</Select.Option>
                          <Select.Option value="C">Customer</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div> */}
                    <div className="col-sm-4 pt-2">
                      <label>
                        Name<span className="required">*</span>
                      </label>

                      <Form.Item
                        name="customer_name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a valid Name",
                          },
                          {
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "special characters are not allowed",
                          },
                          {
                            min: 2,
                            message: "Name must be at least 2 charaters",
                          },
                          {
                            max: 100,
                            message: "Name cannot be longer than 100 charaters",
                          },
                        ]}
                      >
                        <InputType
                          // value={leadName}
                          onChange={(e) => {
                            setLeadName(e.target.value);
                            setuniqueCode(false);
                          }}
                          onBlur={async () => {
                            let a = await CheckUnique({
                              type: "customername",
                              value: leadName,
                            });
                            setuniqueCode(a);
                          }}
                        />
                      </Form.Item>
                      {uniqueCode ? (
                        <div>
                          <label style={{ color: "red" }}>
                            Customer name {UniqueErrorMsg.UniqueErrName}
                          </label>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="mt-4">
                        <label>
                          Phone <span className="required">*</span>
                        </label>
                        <Form.Item
                          name="customer_phone"
                          rules={[
                            {
                              required: true,
                              message: "Please enter a valid Phone Number",
                            },
                          ]}
                        >
                          <Phone_Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>
                        Customer Type<span className="required">*</span>
                      </label>
                      <Form.Item
                        className="my-2 pb-3"
                        name="customer_type"
                        rules={[
                          {
                            required: true,
                            message: "Please select Customer Type",
                          },
                        ]}
                      >
                        <Radio.Group
                          value={leadUsertype}
                          onChange={(e) => {
                            setLeadUsertype(e);
                            // setOrganizationDisable(e);
                          }}
                          defaultValue="organization"
                        >
                          <Radio value="organization">Organization</Radio>
                          <Radio value="individual">Individual</Radio>
                        </Radio.Group>
                        {/* <SelectBox
                          value={leadUsertype}
                          onChange={(e) => {
                            setLeadUsertype(e);
                            setOrganizationDisable(e);
                          }}
                        >
                          <Select.Option value="organization">
                            Organisation
                          </Select.Option>
                          <Select.Option value="individual">
                            Indivdual
                          </Select.Option>
                        </SelectBox> */}
                      </Form.Item>
                      <div className="mt-1">
                        <label>
                          Email <span className="required">*</span>
                        </label>
                        <Form.Item
                          name="customer_email"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp(
                                "^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
                              ),
                              message: "Please enter a valid Email",
                            },
                          ]}
                        >
                          <InputType
                            value={leadcreditdays}
                            onChange={(e) => setLeadcreditdays(e.target.value)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label className="">Address</label>
                      <Form.Item
                        name="customer_address"
                        rules={[
                          {
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Special characters are not allowed",
                          },
                          {
                            min: 2,
                            message: "organisation has at least 2 characters",
                          },
                          {
                            max: 100,
                            message:
                              "organisation cannot be longer than 100 characters",
                          },
                        ]}
                      >
                        <TextArea
                          // disabled={organizationDisable === "I"}
                          style={{ minHeight: "100px" }}
                          value={leadOrganization}
                          onChange={(e) => setLeadOrganization(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    {/* <div className="col-sm-4 pt-2">
                     
                    </div> */}

                    <div className="col-sm-4 pt-2">
                      <label>Website</label>
                      <Form.Item
                        name="customer_website"
                        rules={
                          [
                            {
                              pattern: new RegExp("[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"),
                              message: "Enter valid website",
                            },
                            // {
                            //   min: 2,
                            //   message: "organisation has at least 2 characters",
                            // },
                            // {
                            //   max: 100,
                            //   message:
                            //     "organisation cannot be longer than 100 characters",
                            // },
                          ]
                        }
                      >
                        <InputType
                          value={leadcreditdays}
                          onChange={(e) => setLeadcreditdays(e.target.value)}
                        />
                      </Form.Item>
                      <div className="mt-3">
                        <label>State</label>
                        <Form.Item
                          name="customer_state"
                          rules={
                            [
                              // {
                              //   pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                              //   message: "Special characters are not allowed",
                              // },
                              // {
                              //   min: 2,
                              //   message: "organisation has at least 2 characters",
                              // },
                              // {
                              //   max: 100,
                              //   message:
                              //     "organisation cannot be longer than 100 characters",
                              // },
                            ]
                          }
                        >
                          <InputType
                            value={leadcreditdays}
                            onChange={(e) => setLeadcreditdays(e.target.value)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>Country</label>
                      <Form.Item
                        name="customer_country"
                        rules={
                          [
                            // {
                            //   pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            //   message: "Special characters are not allowed",
                            // },
                            // {
                            //   min: 2,
                            //   message: "organisation has at least 2 characters",
                            // },
                            // {
                            //   max: 100,
                            //   message:
                            //     "organisation cannot be longer than 100 characters",
                            // },
                          ]
                        }
                      >
                        <SelectBox>
                          {countries &&
                            countries.length > 0 &&
                            countries.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.country_id}
                                  value={item.country_id}
                                >
                                  {item.country_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                      <div className="mt-2 pt-2">
                        <label className="">City</label>
                        <Form.Item
                          name="customer_city"
                          rules={
                            [
                              // {
                              //   pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                              //   message: "Special characters are not allowed",
                              // },
                              // {
                              //   min: 2,
                              //   message: "organisation has at least 2 characters",
                              // },
                              // {
                              //   max: 100,
                              //   message:
                              //     "organisation cannot be longer than 100 characters",
                              // },
                            ]
                          }
                        >
                          <InputType
                            value={leadcreditdays}
                            onChange={(e) => setLeadcreditdays(e.target.value)}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-sm-4 mt-4 py-2">
                      <div className="">
                        <Form.Item name="customer_logo">
                          <FileUpload
                            multiple
                            style={{ height: "50px" }}
                            filetype={"Accept only pdf and docs"}
                            listType="picture"
                            accept=".pdf,.docs,"
                            // onPreview={handlePreview}
                            beforeUpload={beforeUpload}
                            // value={leadAttachment}
                            // onChange={(e) => setLeadAttachment(e.target.value)}
                            onChange={(file) => {
                              console.log("Before upload", file.file);
                              console.log(
                                "Before upload file size",
                                file.file.size
                              );
                              if (
                                file.file.size > 1000 &&
                                file.file.size < 500000
                              ) {
                                setLeadimg(file.file.originFileObj);
                                setFileSizeError(false);
                                console.log(
                                  "file greater than 1 kb and less than 500 kb"
                                );
                              } else {
                                setFileSizeError(true);
                                console.log("hgrtryyryr");
                              }
                            }}
                          />
                          {FileSizeError ? (
                            <div>
                              <label style={{ color: "red" }}>
                                File size must be between 1kb and 500kb
                              </label>
                            </div>
                          ) : (
                            ""
                          )}
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-12 pt-2">
                      <label className="">Remarks</label>
                      <Form.Item
                        name="customer_remarks"
                        rules={[
                          {
                            min: 5,
                            message:
                              "Description must be at least 5 characters",
                          },
                          {
                            max: 500,
                            message:
                              "Description cannot be longer than 500 characters",
                          },
                        ]}
                      >
                        <TextArea
                          className="descheight"
                          // value={leadDescription}
                          onChange={(e) => setLeadDescription(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    {/* <div className="col-sm-4 pt-2">
                      <div className="row">
                        <div className="col-12">
                          <label>Lead Status</label>
                          <Form.Item
                            // name="leadStatus"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <SelectBox
                              value={leadStatus}
                              onChange={(e) => setLeadStatus(e)}
                            >
                              <Select.Option value="1">Lead</Select.Option>
                              <Select.Option value="2">
                                Opportunity
                              </Select.Option>
                              <Select.Option value="3">Quotation</Select.Option>
                              <Select.Option value="4">
                                Interested
                              </Select.Option>
                              <Select.Option value="5">Converted</Select.Option>
                              <Select.Option value="6">Lost</Select.Option>
                              <Select.Option value="7">DND</Select.Option>
                            </SelectBox>
                          </Form.Item>
                        </div>
                      </div>
                    </div> */}
                    <div className=" d-flex justify-content-center py-2">
                      <div className="">
                        <Button type="submit" btnType="save" className="mt-4">
                          Save
                        </Button>
                      </div>
                    </div>
                    <Custom_model
                      size={`sm`}
                      success
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </div>
                </Form>
              </div>
              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <div className="row mt-3 px-1" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12">
                    {/* <Button btnType="add" onClick={() => setModalContact(true)}>
                      Add <AiOutlinePlus />
                    </Button> */}
                    {/* <AddContact
                      lead={leadId}
                      show={modalContact}
                      onHide={() => setModalContact(false)}
                    /> */}
                  </div>
                  <div className="col-12 mt-2">
                    <ContactTable
                      // show={modalContact}
                      // onHide={() => setModalContact(false)}
                      // leads
                      customer={CustomerId}
                      toggle={timeOut}
                    />
                  </div>
                  <div className="col mt-4">
                    <Button btnType="save" onClick={(e) => handleAddressTab(e)}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={
                  toggleState === 3 ? "content  active-content" : "content"
                }
              >
                <div className="row mt-3 px-1" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12">
                    {/* <Button btnType="add" onClick={() => setModalAddress(true)}>
                      Add <AiOutlinePlus />
                    </Button> */}
                    {/* <AddAddress
                      show={modalAddress}
                      onHide={() => setModalAddress(false)}
                    /> */}
                  </div>
                  <div className="row mt-2 ms-2">
                    <AddressTable
                      customer={CustomerId}
                      toggle={Toggle4}
                      // show={modalAddress}
                      // onHide={() => setModalAddress(false)}
                    />
                  </div>
                  <div className="col mt-4">
                    <Button btnType="save" onClick={() => toggleTab(4)}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={
                  toggleState === 4 ? "content  active-content" : "content"
                }
              >
                <div className="col-lg" style={{ borderRadius: "3px" }}>
                  <Countrystate
                    customerdetails={customerdetails}
                    setIsAccountSave={(value) => {
                      console.log("igywf", value);
                      if (value) {
                        handleMoreinfoTab();
                      }
                    }}
                    // customer_id={CustomerId}
                  />
                </div>
              </div>{" "}
              <div
                className={
                  toggleState === 5 ? "content  active-content" : "content"
                }
              >
                <div className="col-lg" style={{ borderRadius: "3px" }}>
                  <Moreinfo customerdetails={customerdetails} />
                </div>
              </div>
              <Custom_model
                size={`sm`}
                success
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
        </div>
        <br />
        {/* {error ? (
            <div>
              {" "}
              <ErrorMsg />
            </div>
          ) : (
            ""
          )} */}
      </div>
    </>
  );
}

export default Lead;
