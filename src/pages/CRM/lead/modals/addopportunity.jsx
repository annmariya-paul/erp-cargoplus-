//Opportunity adding model created 14.10.22 shahida

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { DatePicker, Form, Select } from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import Custom_model from "../../../../components/custom_modal/custom_model";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
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
  console.log(date);
  const [name, setName] = useState();

  const [value, setValue] = useState([]);
  const [ShowEditModal, setShowEditModal] = useState(false); //oppertunity edit modal
  const [showProgressModal, setShowProgresssModal] = useState(false); //Oppoertunity progress modal
  const [successPopup, setSuccessPopup] = useState(false); //success popups
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
  // console.log(oppId);
  const [oppsource, setOppSource] = useState();
  const [oppparty, setOppParty] = useState();
  // console.log(oppparty);
  // const [date, setDate] = useState(); //for date

  const [oppvalidity, setOppValidity] = useState();
  const [oppamount, setOppAmount] = useState();
  const [oppprobability, setOppProbaility] = useState();
  // console.log(oppprobability);
  const [oppdescription, setOppDescription] = useState();
  // console.log(oppdescription);
  const [oppstatus, setOppStatus] = useState();
  const [leadName, setLeadName] = useState("");
  console.log("lead name :", leadName);
  // console.log(typeof oppstatus);
  const [imageSize, setImageSize] = useState(false);
  const [fileAttach, setFileAttach] = useState();

  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/lead/${id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Unique Lead Id data", res?.data?.data);

          setLeadName(res?.data?.data?.lead_customer_name);
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

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
    PublicFetch.get(`${CRM_BASE_URL}/customer?startIndex=0&noOfItems=10`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setCustomersData(res?.data?.data?.customers);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (id) {
      getAllEnquiry();
      getCustomers();
      GetLeadData();
    }
  }, [id]);

  // const oppdata = (data) => {
  //   console.log("ssss");
  //   PublicFetch.post(`${CRM_BASE_URL}/opportunity`, {
  //     opportunity_number: oppoNumber,
  //     opportunity_type: opptype,
  //     opportunity_from: oppfrom,
  //     opportunity_lead_id: oppId,
  //     opportunity_source: oppsource,
  //     opportunity_party: name,
  //     opportunity_validity: date,
  //     opportunity_amount: oppamount,
  //     opportunity_probability: oppprobability,
  //     opportunity_description: oppdescription,
  //     opportunity_status: oppstatus,
  //   })
  //     .then(function (response) {
  //       console.log("post of opportuity", response);
  //       if (response.data.success) {
  //         setOppoNumber();
  //         setOppType();
  //         setOppFrom();
  //         setOppSource();
  //         setOppParty();
  //         setDate();
  //         setOppAmount();
  //         setOppProbaility();
  //         setOppDescription();
  //         setName();
  //         setAmount();
  //         setDate();
  //         setOppValidity();
  //         setOppID();
  //         setOppStatus();
  //         setModalShow(true);
  //         setShowViewModal(false);
  //         setShowEditModal(false);
  //         setSuccessPopup(true);
  //         close_modal(successPopup, 1200);
  //         // props.onCancel();
  //         form.resetFields();
  //       } else {
  //         message.error("fetch data error");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const newDate = new Date();
  const thisDate = moment(newDate);
  addForm.setFieldValue("oppor_date", thisDate);

  const oppdata = (data) => {
    console.log("addcreditdata", data);
     const date = moment(data.oppor_date);
    const formData = new FormData();
    formData.append("opportunity_date", date);
    formData.append("opportunity_customer_id", data.oppo_customer);
    formData.append("opportunity_customer_ref", data.oppo_customer_ref);
    formData.append("opportunity_source", data.oppo_source);
    formData.append("opportunity_contact_id", data.job_amount);
    formData.append("opportunity_type", data.oppo_type);
    formData.append("opportunity_incoterm_id", data.oppo_incoterm);
    formData.append("opportunity_validity", data.oppo_validity);
    formData.append("opportunity_amount", data.oppo_amount);
    formData.append("opportunity_probability", data.oppo_probability);
    formData.append("opportunity_description", data.oppo_description);
    formData.append("opportunity_status", data.oppo_status);
    formData.append("opportunity_enquiries", data.oppo_enquiries);
    formData.append("opportunity_enquiries[1]", data.oppo_enquiries);
    if (fileAttach) {
      formData.append("attachments", fileAttach);
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
          close_modal(successPopup, 1000);
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

  // useEffect(() => {
  //   oppdata();
  // }, []);

  //API added
  useEffect(() => {
    getAllContact();
  }, []);

  const getAllContact = async () => {
    try {
      const allNames = await PublicFetch.get(`${CRM_BASE_URL}/contact`);
      if (allNames.data.success) {
        setValue(allNames.data.data);
        console.log("hello data names new add content", allNames.data.data);
        let temp = [];
        
      } else {
        message.error("fetch data error");
      }
      console.log("All leads res : ", allNames);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setModalShow(false);
      }, time);
    }
  };

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

          <div className="row crm_cards mt-2 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Basic Info</h5>
            </div>
            <div className="col-sm-4 pt-2">
              <label>
                Enquiry No.<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_enquiries"
                rules={[
                  {
                    required: true,
                    message: "Please Select an Enquiry Number",
                  },
                ]}
              >
                <SelectBox
                  placeholder={"--Please Select--"}
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
            <div className="col-sm-4 pt-2 d-flex">
              <div className="col-11">
                <label>
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
                    // onChange={(e) => setOppType(e)}
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
              <div className="col-1 mt-4 pt-2 ps-1">
                <Button btnType="add_borderless" type="button">
                  {" "}
                  <AiOutlinePlusCircle style={{ fontSize: "25px" }} />
                </Button>
              </div>
            </div>

            {/* <div className="col-sm-4 pt-2">
              <label>
                Opportunity No.<span className="req_star">*</span>
              </label>
              <Form.Item
                name="opportunity_no"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid Opportunity No.",
                  },
                ]}
              >
                <InputType />
              </Form.Item>
            </div> */}

            <div className="col-sm-4 pt-2">
              <label>Date</label>
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
                  style={{ borderWidth: 0, marginTop: 11 }}
                  format={"DD-MM-YYYY"}
                  defaultValue={moment(date)}
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>
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
              <label>
                Customer Reference<span className="req_star">*</span>
              </label>
              <Form.Item
                name="oppo_customer_ref"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid Customer Reference",
                  },
                ]}
              >
                <InputType />
                {/* <SelectBox
                  placeholder={"--Please Select--"}
                  value={name}
                  onChange={(e) => setName(parseInt(e))}
                >
                  {value &&
                    value.length > 0 &&
                    value.map((item, index) => {
                      if (id == item.contact_lead_id) {
                        return (
                          <option key={item.contact_id} value={item.contact_id}>
                            {item.contact_person_name}
                          </option>
                        );
                      }
                    })}
                </SelectBox> */}
              </Form.Item>
            </div>
          </div>
          <div className="row crm_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Contact Details</h5>
            </div>
            <div className="col-sm-4 pt-2">
              <label>
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
                  // onChange={(e) => setOppProbaility(e)}
                >
                  <Select.Option value="L">test</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Email</label>
              {/* <Form.Item
                name="email"
                rules={[
                  {
                    message: "Please enter a valid email",
                  },
                ]}
              > */}
              <InputType
                disabled
                // value={oppamount}
                // onChange={(e) =>
                //   setOppAmount(parseFloat(e.target.value).toFixed(2))
                // }
              />
              {/* </Form.Item> */}
            </div>
            <div className="col-sm-4 pt-2">
              <label>Phone</label>
              {/* <Form.Item
                name="phone"
                rules={[
                  {
                    message: "Please enter a valid phone number",
                  },
                ]}
              > */}
              <InputType
                disabled
                // value={oppamount}
                // onChange={(e) =>
                //   setOppAmount(parseFloat(e.target.value).toFixed(2))
                // }
              />
              {/* </Form.Item> */}
            </div>
          </div>
          <div className="row crm_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Extra Info</h5>
            </div>
            <div className="col-sm-4 pt-2">
              <label>
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
              <label>
                Valid Up to<span className="req_star">*</span>
              </label>
              <Form.Item name="oppo_validity" {...config}>
                <DatePicker
                  style={{ borderWidth: 0, marginTop: 11 }}
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
            <div className="col-sm-4 pt-3">
              <label>Expecting Amount</label>
              <Form.Item
                name="oppo_amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid amount",
                  },
                ]}
              >
                <InputType
                // value={oppurtunityamount}
                // onChange={(e) => {
                //   setOppurtunityamount(e.target.value);
                // }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label>
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
              <label>
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
                // value={oppurtunityprobability}
                // onChange={(e) => {
                //   setOppurtunityProbability(e);
                // }}
                >
                  <Select.Option value="EXW">EXW</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label>
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
                rules={[
                  {
                    required: true,
                    message: "Please enter valid details",
                  },
                ]}
              >
                <TextArea
                  value={oppdescription}
                  onChange={(e) => setOppDescription(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-sm-6 mt-2 mb-4">
              <label>Attachments</label>
              <Form.Item name="attachment" className="mt-2">
                <FileUpload
                  multiple
                  listType="picture"
                  accept=".pdf,.docx,.jpeg"
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
                    Upload File size between 1 kb and 500 kb
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
        <Custom_model
          size={`sm`}
          success
          show={modalShow}
          onHide={() => setModalShow(false)}
          footer={false}
        />
      </div>
    </>
  );
}
