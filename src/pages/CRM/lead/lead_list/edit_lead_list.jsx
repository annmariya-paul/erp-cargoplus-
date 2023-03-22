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
import { CRM_BASE_URL } from "../../../../api/bootapi";
import Countrystate from "../location/countryselect";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
// import ErrorMsg from "../../components/errormessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import Select from "rc-select";
import "../lead.styles.scss"

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
  const [leadName, setLeadName] = useState("");
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
  const [leadcreditdays,setleadcreditdays]= useState()

  const [editForm] = Form.useForm();
  const [error, setError] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const navigate = useNavigate();

  const goToLeadlist = () => {
    navigate("/lead_list");
  };

  const handleCancel=()=>{
    navigate(ROUTES.LEADLIST)
  }
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
        goToLeadlist();
      }, time);
    }
  };
  const [oneLeadData, setOneLeadData] = useState();

  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/lead/${id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Unique Lead Id data", res?.data?.data);
          setOneLeadData(res?.data?.data);
          setLeadType(res?.data?.data?.lead_type);
          setLeadName(res?.data?.data?.lead_customer_name);
          setLeadUsertype(res?.data?.data?.lead_user_type);
          setLeadOrganization(res?.data?.data?.lead_organization);
          setLeadSource(res?.data?.data?.lead_source);
          setLeadDescription(res?.data?.data?.lead_description);
          setLeadAttachment(res?.data?.data?.attachments);
          setsambpledata(res?.data?.data?.attachments);
          setLeadStatus(res?.data?.data?.lead_status);
          setleadcreditdays(res?.data?.data?.lead_credit_days);
          editForm.setFieldsValue({
            leadType: res?.data?.data?.lead_type,
            leadName: res?.data?.data?.lead_customer_name,
            leadUsertype: res?.data?.data?.lead_user_type,
            leadSource: res?.data?.data?.lead_source,
            leadOrganization: res?.data?.data?.lead_organization,
            leadDescription: res?.data?.data?.lead_description,
            leadAttachment: res?.data?.data?.attachments,
            leadStatus: res?.data?.data?.lead_status,
            creditdays:res?.data?.data?.lead_credit_days,
          });
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetLeadData();
  }, [id]);

  console.log("grt all data", oneLeadData);
  const uploaad = `${process.env.REACT_APP_BASE_URL}/${sampledata}`;
  console.log("uploads11", uploaad);

  const updateUser = (event) => {
    setFormSubmitted(true);
    const formData = new FormData();
    formData.append("lead_type", leadType);
    formData.append("lead_customer_name", leadName);
    formData.append("lead_user_type", leadUsertype);
    formData.append("lead_organization", leadOrganization);
    formData.append("lead_source", leadSource);
    formData.append("lead_credit_days", leadcreditdays);
    if (leadDescription) {
      formData.append("lead_description", leadDescription);
    }
    if (leadAttachment) {
      formData.append("attachments", leadAttachment);
    }

    formData.append("lead_status", leadStatus);

    PublicFetch.patch(`${CRM_BASE_URL}/lead/${id}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then(function (response) {
        console.log("hellooooooo", response);

        if (response.data.success) {
          console.log("hello", response.data.data);
          setModalShow(true);
          close_modal(modalShow, 1200);
        } else {
          console.log("Failed while adding data");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log("kkkkkk", leadDescription, leadName);
  const beforeUpload = (file, fileList) => {};
  return (
    <>
      <div className="container-fluid">
        <div className="lead_container">
          <div className="row justify-content-md-center">
            <div className="bloc-tabs tabs-responsive">
              <div className="col-sm-2">
                <button
                  id="button-tabs"
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Basic Info
                </button>
              </div>
              <div className="col-sm-2">
                <button
                  id="button-tabs"
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Contacts
                </button>
              </div>
              <div className="col-sm-2">
                <button
                  id="button-tabs"
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
                >
                  Address
                </button>
              </div>
              <div className="col-sm-2">
                <button
                  className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(4)}
                >
                  Location
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
                    <h5 class="lead_text"> Edit Lead/Customer ({leadName})</h5>
                  </div>
                  <div className="col-md-5 col-sm-12 ">
                    <div className="d-flex justify-content-end">
                      <div
                        className="col-md-5 col-sm-6  d-flex justify-content-end"
                        // style={{ justifyContent: "center" }}
                      >


{/* <Link
                          to={`${ROUTES.OPPORTUNITY_LEAD}/${id}`}
                          className="nav-link"
                        >
                          <Button btnType="add_borderless">
                            <BsPlusCircleFill style={{ fontSize: "16px" }} />{" "}
                            View Opportunity
                          </Button>
                        </Link> */}
                        
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
                    updateUser();
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
                        name="leadName"
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
                          onChange={(e) => setLeadName(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>User Type</label>
                      <Form.Item
                        // name="leadUsertype"
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
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>Organization</label>
                      <Form.Item
                        name="leadOrganization"
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
                        <InputType
                          disabled={organizationDisable === "I"}
                          // value={leadOrganization}
                          onChange={(e) => setLeadOrganization(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>Source</label>
                      <Form.Item
                        name="leadSource"
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
                    <div className="col-sm-4 pt-2">
                      <label>Credit Days</label>
                      <Form.Item
                        name="creditdays"
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
                    {/* <div className="col-12 mt-3">
                      <Form.Item name="leadAttachment">
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
                    </div> */}
                    <div className="col-sm-4 pt-2">
                      <label>Description</label>
                      <Form.Item
                        name="leadDescription"
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
                    <div className="col-sm-4 pt-3 mt-3">
                      <Form.Item name="leadAttachment">
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
                    <div className="col-sm-4 pt-1">
                      <label>Lead Status</label>
                      <Form.Item
                        name="leadStatus"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Type",
                          },
                        ]}
                      >
                        <SelectBox
                          // value={leadStatus}
                          onChange={(e) => setLeadStatus(e)}
                        >
                          <Select.Option value={1}>Lead</Select.Option>
                          <Select.Option value={2}>Opportunity</Select.Option>
                          <Select.Option value={3}>Quotation</Select.Option>
                          <Select.Option value={4}>Interested</Select.Option>
                          <Select.Option value={5}>Converted</Select.Option>
                          <Select.Option value={6}>Lost</Select.Option>
                          <Select.Option value={7}>DND</Select.Option>
                        </SelectBox>
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
                    <Button btnType="add" onClick={() => setModalContact(true)}>
                      Add <AiOutlinePlus />
                    </Button>
                  </div>
                  <div className="col-12 mt-2">
                    <EditContact
                      show={modalContact}
                      onHide={() => setModalContact(false)}
                      leadid={id}
                    />
                  </div>
                  <div className="col mt-4">
                    <Button btnType="save">Save</Button>
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
                    <Button btnType="add" onClick={() => setModalAddress(true)}>
                      Add <AiOutlinePlus />
                    </Button>
                  </div>
                  <div className="col-12 mt-2">
                    <Edit_Address
                      leadid={id}
                      show={modalAddress}
                      onHide={() => setModalAddress(false)}
                    />
                  </div>
                  <div className="col mt-4">
                    <Button btnType="save">Save</Button>
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

export default LeadEdit;
