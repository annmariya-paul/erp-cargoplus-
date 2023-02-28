import React, { useEffect, useState } from "react";
import "./lead.styles.scss";
import { Link } from "react-router-dom";
// import { Form } from "react-bootstrap";
import { Form, Input } from "antd";
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
import { CRM_BASE_URL } from "../../../api/bootapi";
// import ErrorMsg from "../../components/errormessage";
import Countrystate from "./location/countryselect";
import Custom_model from "../../../components/custom_modal/custom_model";
import { message, Select } from "antd";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputType from "../../../components/Input Type textbox/InputType";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../check Unique/CheckUnique";
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
  const [leadType, setLeadType] = useState("");
  const [FileSizeError, setFileSizeError] = useState(false);
  const [leadName, setLeadName] = useState();
  const [leadUsertype, setLeadUsertype] = useState("O");
  const [organizationDisable, setOrganizationDisable] = useState();
  const [leadOrganization, setLeadOrganization] = useState("");
  const [leadSource, setLeadSource] = useState("online registration");
  const [leadDescription, setLeadDescription] = useState("");
  const [leadAttachment, setLeadAttachment] = useState();
  const [leadStatus, setLeadStatus] = useState("4");
  const [leadId, setLeadId] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [leadimg, setLeadimg] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [leadid,setleadid]=useState()

  const [uniqueCode, setuniqueCode] = useState();
  const [addForm] = Form.useForm();

  const [error, setError] = useState(false);
  const toggleTab = (index) => {
  setToggleState(index);   
  };



  const errormessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Lead is not saved',
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

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setModalShow(false);
      }, time);
    }
  };

  const Submit = () => {
    setFormSubmitted(true);
    const formData = new FormData();
    formData.append("lead_type", leadType);
    formData.append("lead_customer_name", leadName);
    formData.append("lead_user_type", leadUsertype);
    formData.append("lead_organization", leadOrganization);
    formData.append("lead_source", leadSource);
    if (leadDescription) {
      formData.append("lead_description", leadDescription);
    }
    formData.append("attachments", leadimg);
    formData.append("lead_status", leadStatus);
    //  console.log(data);
    PublicFetch.post(`${CRM_BASE_URL}/lead`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then(function (response) {
        console.log("hello", response);
        if (response.data.success) {
          console.log("hello", response.data.data);
          setLeadType();
          setLeadName();
          setLeadUsertype();
          setLeadOrganization();
          setLeadSource();
          setLeadAttachment();
          setLeadDescription();
          setLeadStatus();
          setModalShow(true);
          close_modal(modalShow, 1000);
          setModalContact(false);
          toggleTab(2);
          setLeadId(response?.data?.data?.lead_id);
        } else {

          console.log("Failed while adding data");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // }
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

  console.log("lead id::", leadId);

  // console.log("leadd id iss", leadType.leadtypes.options[0]);

  return (
    <>
          {contextHolder}
      <h5 className="lead_text">Add Lead/Customer</h5>
      <div className="container-fluid">
        <div className="lead_container">
          <div className="row justify-content-md-center">
            <div className="bloc-tabs tabs-responsive">
              <button
                id="button-tabs"
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                Basic Info
              </button>
              <button
                id="button-tabs"
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => {
                  leadId==null ?errormessage():toggleTab(2)
                 }}
              >
                Contacts
              </button>
              <button
                id="button-tabs"
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => {
                  leadId==null ?errormessage():toggleTab(3)
                }}
              >
                Address
              </button>
              <button
                className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                onClick={() => {
                  leadId==null ?errormessage():toggleTab(4)
                }}
              >
                Location
              </button>
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
                    Submit();
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row px-1">
                    <div className="col-sm-4 pt-2">
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
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>Name</label>
                      <Form.Item
                        name="leadcustomername"
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
                          value={leadName}
                          onChange={(e) =>{ 
                            setLeadName(e.target.value)
                            setuniqueCode(false);
                          }}

                          onBlur={async() => {
                          
                            let a = await CheckUnique({type:"leadcustomername",value:leadName})
                            setuniqueCode(a)
                          }}
                        />
                      </Form.Item>
                      {uniqueCode ? (
                      <div>
                        <label style={{ color: "red" }}>
                          lead name {UniqueErrorMsg.UniqueErrName}
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>User Type</label>
                      <Form.Item
                        // name="leadUsertype"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <SelectBox
                          value={leadUsertype}
                          onChange={(e) => {
                            setLeadUsertype(e);
                            setOrganizationDisable(e);
                          }}
                        >
                          <Select.Option value="O">Organisation</Select.Option>
                          <Select.Option value="I">Indivdual</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>Organisation</label>
                      <Form.Item
                        name="leadOrganization"
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
                        <InputType
                          disabled={organizationDisable === "I"}
                          value={leadOrganization}
                          onChange={(e) => setLeadOrganization(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>Source</label>
                      <Form.Item
                        // name={leadSource}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <SelectBox
                          value={leadSource}
                          onChange={(e) => setLeadSource(e)}
                        >
                          <Select.Option value="reference">
                            Reference
                          </Select.Option>
                          <Select.Option value="direct visit">
                            Direct Visit
                          </Select.Option>
                          <Select.Option value="online registration">
                            Online Registration
                          </Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-lg-3 col-xs-12 col-sm-5 col-md-5 mt-3">
                        <Form.Item name="new">
                          <FileUpload
                            multiple
                            filetype={"Accept only pdf and docs"}
                            listType="picture"
                            accept=".pdf,.docs,"
                            onPreview={handlePreview}
                            beforeUpload={true}
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
                    <div className="col-sm-8 pt-2">
                      <label className="mb-2">Description</label>
                      <Form.Item
                        name="Description"
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
                          value={leadDescription}
                          onChange={(e) => setLeadDescription(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 pt-2">
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
                    </div>

                    <div className="col">
                      <Button type="submit" btnType="save">
                        Save
                      </Button>
                      <Custom_model
                        size={`sm`}
                        success
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </div>
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
                    <Button btnType="add" onClick={() => setModalContact(true)}>
                      Add <AiOutlinePlus />
                    </Button>
                    {/* <AddContact
                      lead={leadId}
                      show={modalContact}
                      onHide={() => setModalContact(false)}
                    /> */}
                  </div>
                  <div className="col-12 mt-2">
                    <ContactTable
                      show={modalContact}
                      onHide={() => setModalContact(false)}
                      // leads
                      leadscontid={leadId}
                    />
                  </div>
                  <div className="col mt-4">
                    <Button btnType="save" onClick={() => toggleTab(3)}>
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
                    <Button btnType="add" onClick={() => setModalAddress(true)}>
                      Add <AiOutlinePlus />
                    </Button>
                    {/* <AddAddress
                      show={modalAddress}
                      onHide={() => setModalAddress(false)}
                    /> */}
                  </div>
                  <div className="row mt-2 ms-2">
                    <AddressTable
                      lead={leadId}
                      show={modalAddress}
                      onHide={() => setModalAddress(false)}
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
                  <Countrystate />
                </div>
              </div>{" "}
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
