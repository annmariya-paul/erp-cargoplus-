import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {} from "react-bootstrap";
import { message } from "antd";
// import "./lead.styles.scss";
import { Link } from "react-router-dom";
import Button from "../../../../components/button/button";
import { Form } from "antd";
import { ROUTES } from "../../../../routes";
import { AiOutlinePlus } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { BsPlusCircleFill } from "react-icons/bs";
import FileUpload from "../../../../components/fileupload/fileUploader";
import EditContact from "../tables/edit_contacts";
import Edit_Address from "../tables/edit_address";
import AddressTable from "../tables/contactstable";
import AddOpportunity from "../modals/addopportunity";
import PublicFetch from "../../../../utils/PublicFetch";
import { LeadStatus } from "../../../../utils/SelectOptions";
import {
  CRM_BASE_URL,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import Countrystate from "../accountings/Accounting";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
// import ErrorMsg from "../../components/errormessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import Select from "rc-select";
import "../lead.styles.scss";
import Phone_Input from "../../../../components/PhoneInput/phoneInput";

function LeadEdit() {
  // const history=useHistory();
  const { id } = useParams();
  // console.log("ID is ...",id);

  const [useredit, setUseredit] = useState();
  const [toggleState, setToggleState] = useState(1);
  const [basicinfoData, setBasicinfoData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalAddress, setModalAddress] = useState(false);
  const [modalOpportunity, setModalOpportunity] = useState(false);
  const [leadType, setLeadType] = useState("");
  const [CustomerName, setCustomerName] = useState("");
  const [leadUsertype, setLeadUsertype] = useState("");
  const [leadOrganization, setLeadOrganization] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [leadDescription, setLeadDescription] = useState("");
  const [leadAttachment, setLeadAttachment] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [leadId, setLeadId] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileSizeError, setFileSizeError] = useState(false);
  const [sampledata, setsambpledata] = useState();
  const [organizationDisable, setOrganizationDisable] = useState();
  const [leadcreditdays, setleadcreditdays] = useState();
  const [toggle2, setToggel2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [countries, setCountries] = useState("");

  const [editForm] = Form.useForm();
  const [error, setError] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const navigate = useNavigate();

  const goToLeadlist = () => {
    navigate(ROUTES.CUSTOMER_LIST);
  };

  const handleCancel = () => {
    navigate(ROUTES.CUSTOMER_LIST);
  };
  console.log("lead attachment", leadAttachment);

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
        // handletoggle2(time);
        goToLeadlist();
      }, time);
    }
  };
  const [oneLeadData, setOneLeadData] = useState();

  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Unique Lead Id data", res?.data?.data);
          setOneLeadData(res?.data?.data);
          setLeadType(res?.data?.data?.lead_type);
          setCustomerName(res?.data?.data?.customer_name);
          setLeadUsertype(res?.data?.data?.lead_user_type);
          setLeadOrganization(res?.data?.data?.lead_organization);
          setLeadSource(res?.data?.data?.lead_source);
          setLeadDescription(res?.data?.data?.lead_description);
          setLeadAttachment(res?.data?.data?.attachments);
          setsambpledata(res?.data?.data?.attachments);
          setLeadStatus(res?.data?.data?.lead_status);
          setleadcreditdays(res?.data?.data?.lead_credit_days);
          editForm.setFieldsValue({
            customer_type: res?.data?.data?.customer_type,
            customer_name: res?.data?.data?.customer_name,
            customer_address: res?.data?.data?.customer_address,
            customer_phone: res?.data?.data?.customer_phone,
            customer_email: res?.data?.data?.customer_email,
            customer_website: res?.data?.data?.customer_website,
            customer_logo: res?.data?.data?.customer_logo,
            customer_remarks: res?.data?.data?.customer_remarks,
            customer_country: res?.data?.data?.customer_country,
            customer_state: res?.data?.data?.customer_state,
            customer_city: res?.data?.data?.customer_city,
          });
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
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

  useEffect(() => {
    getAllCountries();
    GetLeadData();
  }, [id]);

  console.log("grt all data", oneLeadData);
  const uploaad = `${process.env.REACT_APP_BASE_URL}/${sampledata}`;
  console.log("uploads11", uploaad);

  // const updateUser = (event) => {             //// old lead api for updating a lead
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
  //   if (leadAttachment) {
  //     formData.append("attachments", leadAttachment);
  //   }

  //   formData.append("lead_status", leadStatus);

  //   PublicFetch.patch(`${CRM_BASE_URL}/lead/${id}`, formData, {
  //     "Content-Type": "Multipart/form-Data",
  //   })
  //     .then(function (response) {
  //       console.log("hellooooooo", response);

  //       if (response.data.success) {
  //         console.log("hello", response.data.data);
  //         setModalShow(true);
  //         close_modal(modalShow, 1200);
  //       } else {
  //         console.log("Failed while adding data");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const UpdateCustomer = (data) => {
    const formData = new FormData();
    formData.append(`customer_name`, data.customer_name);
    formData.append(`customer_type`, data.customer_type);
    formData.append(`customer_address`, data.customer_address);
    formData.append(`customer_phone`, data.customer_phone);
    formData.append(`customer_email`, data.customer_email);
    formData.append(`customer_website`, data.customer_website);
    formData.append(`customer_remarks`, data.customer_remarks);
    formData.append(`customer_country`, data.customer_country);
    formData.append(`customer_state`, data.customer_state);
    formData.append(`customer_city`, data.customer_city);
    if (leadAttachment) {
      formData.append(`customer_logo`, leadAttachment);
    }

    PublicFetch.patch(`${CRM_BASE_URL}/customer/${id}`, formData, {
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

  const handletoggle2 = (e) => {
    if (e) {
      setToggel2(true);
      setToggle3(false);
      toggleTab(2);
    }
  };

  const handletoggle3 = (e) => {
    if (e) {
      setToggle3(true);
      setToggel2(false);
      toggleTab(3);
    }
  };

  console.log("kkkkkk", leadDescription, CustomerName);
  const beforeUpload = (file, fileList) => {};
  return (
    <>
      <div className="container-fluid">
        <div className="lead_container">
          <div className="row justify-content-md-center">
            <div className="mb-2">
              <h5 class="lead_text"> Edit Customer ({CustomerName})</h5>
            </div>
            <div className="bloc-tabs tabs-responsive">
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  id="button-tabs"
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => {
                    toggleTab(1);
                    setToggel2(false);
                    setToggle3(false);
                  }}
                >
                  Basic Info
                </button>
              </div>
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  id="button-tabs"
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={(e) => handletoggle2(e)}
                >
                  Contacts
                </button>
              </div>
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  id="button-tabs"
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={(e) => handletoggle3(e)}
                >
                  Address
                </button>
              </div>
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                  onClick={() => {
                    toggleTab(4);
                    setToggel2(false);
                    setToggle3(false);
                  }}
                >
                  Accounting
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
                <div className="row mb-2 ">
                  <div class="col-md-7 col-sm-12">
                    {/* <h5 class="lead_text"> Edit Customer ({leadName})</h5> */}
                  </div>
                  <div className="col-md-5 col-sm-12 ">
                    <div className="d-flex justify-content-end">
                      <div
                        className="col-md-5 col-sm-6  d-flex justify-content-end"
                        // style={{ justifyContent: "center" }}
                      >
                        <Link
                          to={`${ROUTES.ADD_OPPORTUNITY}/${id}`}
                          className="nav-link"
                        >
                          <Button btnType="add_borderless">
                            <BsPlusCircleFill style={{ fontSize: "16px" }} />{" "}
                            New Opportunity
                          </Button>
                        </Link>

                        {/* <Button
                          btnType="add_borderless"
                          onClick={() => setModalOpportunity(true)}
                        >
                          <BsPlusCircleFill style={{ fontSize: "16px" }} /> Add
                          Opportunity
                        </Button>
                        <AddOpportunity
                          modalOpportunity={modalOpportunity}
                          onCancel={() => setModalOpportunity(false)}
                          style="width:1250px"
                        /> */}
                      </div>
                      <div
                        className="col-md-6 col-sm-4  d-flex justify-content-end"
                        // style={{ justifyContent: "center" }}
                      >
                        <Link
                          to={`${ROUTES.OPPORTUNITY_LEAD}/${id}`}
                          className="nav-link"
                        >
                          <Button btnType="add_borderless">
                            <BsPlusCircleFill style={{ fontSize: "16px" }} />{" "}
                            View Opportunity
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Form
                  form={editForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                    // updateUser();
                    UpdateCustomer(values);
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
                      <label>Name</label>
                      <Form.Item
                        name="customer_name"
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
                            message:
                              "Name cannot be longer than 100 characters",
                          },
                        ]}
                      >
                        <InputType
                          // value={leadName}
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </Form.Item>
                      <div className=" mt-2">
                        <label>Phone</label>
                        <Form.Item
                          name="customer_phone"
                          rules={[
                            {
                              required: true,
                              message: "Please select a Type",
                            },
                          ]}
                        >
                          <Phone_Input
                            value={leadcreditdays}
                            onChange={(value) => setleadcreditdays(value)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>Customer Type</label>
                      <Form.Item
                        name="customer_type"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
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
                          <Select.Option value="I">Individual</Select.Option>
                        </SelectBox>
                      </Form.Item>
                      <div className="mt-2">
                        <label>Email</label>
                        <Form.Item
                          name="customer_email"
                          rules={[
                            {
                              required: true,
                              message: "Please select a Type",
                            },
                          ]}
                        >
                          <InputType
                            value={leadcreditdays}
                            onChange={(e) => {
                              setleadcreditdays(e.target.value);
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>Address</label>
                      <Form.Item
                        name="customer_address"
                        rules={[
                          {
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Organization",
                          },
                          {
                            whitespace: true,
                          },
                          {
                            min: 2,
                            message:
                              "Organization must be at least 2 characters",
                          },
                          {
                            max: 100,
                            message:
                              "Organization cannot be longer than 100 characters",
                          },
                        ]}
                      >
                        <TextArea
                          // disabled={organizationDisable === "I"}
                          // value={leadOrganization}
                          onChange={(e) => setLeadOrganization(e.target.value)}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-sm-4 pt-2">
                      <label>Website</label>
                      <Form.Item
                        name="customer_website"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <InputType
                          value={leadcreditdays}
                          onChange={(e) => {
                            setleadcreditdays(e.target.value);
                          }}
                        />
                      </Form.Item>
                      <div className="mt-2">
                        <label>State</label>
                        <Form.Item
                          name="customer_state"
                          rules={[
                            {
                              required: true,
                              message: "Please select a Type",
                            },
                          ]}
                        >
                          <InputType
                            value={leadcreditdays}
                            onChange={(e) => {
                              setleadcreditdays(e.target.value);
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>Country</label>
                      <Form.Item
                        name="customer_country"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          // value={leadSource}
                          onChange={(e) => setLeadSource(e)}
                        >
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
                      <div className="mt-2">
                        <label>City</label>
                        <Form.Item
                          name="customer_city"
                          rules={[
                            {
                              required: true,
                              message: "Please select a Type",
                            },
                          ]}
                        >
                          <InputType
                            value={leadcreditdays}
                            onChange={(e) => {
                              setleadcreditdays(e.target.value);
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-sm-4 pt-3 mt-3">
                      <Form.Item name="customer_logo">
                        <FileUpload
                          multiple
                          filetype={"Accept only pdf and docs"}
                          listType="picture"
                          accept=".pdf,.docs,"
                          // onPreview={handlePreview}
                          beforeUpload={beforeUpload}
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
                              setLeadAttachment(file.file.originFileObj);
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

                    <div className="col-sm-12 pt-2">
                      <label>Remarks</label>
                      <Form.Item
                        name="customer_remarks"
                        className="py-2"
                        rules={[
                          {
                            min: 2,
                            message:
                              "Description must be at least 2 characters",
                          },
                          {
                            max: 500,
                            message:
                              "Description cannot be longer than 500 characters",
                          },
                        ]}
                      >
                        <TextArea
                          // value={leadDescription}
                          className="descheight"
                          onChange={(e) => setLeadDescription(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div className=" d-flex justify-content-center gap-2 mt-4 pt-4">
                      <Button type="submit" btnType="save">
                        Update
                      </Button>
                      <Button
                        as="input"
                        type="reset"
                        value="Reset"
                        onClick={() => {
                          handleCancel();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Form>
                <Custom_model
                  size={`sm`}
                  success
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <div className="row mt-2 ps-3" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12">
                    {/* <Button btnType="add" onClick={() => setModalContact(true)}>
                      Add <AiOutlinePlus />
                    </Button> */}
                  </div>
                  <div className="col-12 mt-2">
                    <EditContact
                      // show={modalContact}
                      // onHide={() => setModalContact(false)}
                      toggle={toggle2}
                      Customerid={id}
                    />
                  </div>
                  <div className="col mt-4">
                    <Button
                      btnType="save"
                      onClick={(e) => {
                        handletoggle3(e);
                      }}
                    >
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
                <div className="row mt-2 ps-3" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12">
                    {/* <Button btnType="add" onClick={() => setModalAddress(true)}>
                      Add <AiOutlinePlus />
                    </Button> */}
                  </div>
                  <div className="col-12 mt-2">
                    <Edit_Address
                      Customerid={id}
                      toggle={toggle3}
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
                  <Countrystate customerId={id} />
                </div>
              </div>{" "}
              {/* <Custom_model
                size={`sm`}
                success
                show={modalShow}
                onHide={() => setModalShow(false)}
              /> */}
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

export default LeadEdit;
