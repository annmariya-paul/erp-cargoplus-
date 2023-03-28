import { Form, Checkbox, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import FileUpload from "../../../../components/fileupload/fileUploader";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { ROUTES } from "../../../../routes";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/button/button";
import { BsPlusCircleFill } from "react-icons/bs";
import "../enquiry/enquiry.scss";
import CustomModel from "../../../../components/custom_modal/custom_model";

import Custom_model from "../../../../components/custom_modal/custom_model";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL, CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import moment from "moment";
function Enquiry() {
  const [addForm] = Form.useForm();
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [img, setImg] = useState([]);
  const navigate = useNavigate();
  const [modalAddCustomer, setModalAddCustomer] = useState(false);
  const [imgSizeError, setImgSizeError] = useState(false);
  const [AllCustomers, setAllCustomers] = useState();
  const [AllContacts, setAllContacts] = useState();
  const [Customer_Id, setCustomer_Id] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(`${ROUTES.ENQUIRY_LIST}`);
      }, time);
    }
  };

  // api call starts !!

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

  const GetAllContacts = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/contact`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success of contact", res.data.data);
          // setAllContacts(res.data.data);
          let temp = [];
          res.data.data.forEach((item, index) => {
            if (e == item.contact_customer_id) {
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

  const GetSingleCustomer = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${e}`)
      .then((res) => {
        console.log("Response from single customer", res);
        if (res.data.success) {
          console.log("Success from single customer", res.data.data);
          console.log("contact data", res.data.data.crm_v1_contacts[0]);
          let a = res.data.data.crm_v1_contacts[0];
          addForm.setFieldsValue({
            contactperson: a.contact_id,
            contactemail: a.contact_email,
            contactphone: a.contact_phone_1,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const GetSingleContact = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/contact/${e}`)
      .then((res) => {
        console.log("Response from single contact", res);
        if (res.data.success) {
          console.log("success from single contact", res.data.data);
          addForm.setFieldsValue({
            contactemail: res.data.data.contact_email,
            contactphone: res.data.data.contact_phone_1,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // create a enquiry !!

  const CreateEnquiry = (data) => {
    let enquiry_date = moment(data.date);
    const formData = new FormData();
    formData.append("enquiry_customer_id", data.customer);
    formData.append("enquiry_source", data.source);
    formData.append("enquiry_date", enquiry_date);
    formData.append("enquiry_customer_ref", data.reference);
    formData.append("enquiry_contact_person_id", data.contactperson);
    formData.append("enquiry_remarks", data.purchasePoRef);
    if (img) {
      formData.append("attachments", img);
    }

    PublicFetch.post(`${CRM_BASE_URL_FMS}/enquiries`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("response of create", res);
        if (res.data.success) {
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(SuccessPopup, 1200);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    GetAllCustomers();
    // GetAllContacts();
    let today = new Date();
    let todayDate = moment(today);
    addForm.setFieldsValue({
      date: todayDate,
    });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <Form
          name="addForm"
          form={addForm}
          onFinish={(data) => {
            console.log("val", data);
            // createPurchase(data);
            CreateEnquiry(data);
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row px-1 pt-2">
            <h5 className="lead_text">Add Enquiry</h5>
          </div>

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Basic Info</h5>
            </div>

            <div className="col-sm-4 pt-2 d-flex">
              <div className="col-11">
                <label>
                  Customer<span className="required">*</span>
                </label>
                <Form.Item
                  name="customer"
                  rules={[
                    {
                      required: true,
                      message: "Customer is Required",
                    },
                  ]}
                >
                  <SelectBox
                    onChange={(e) => {
                      setCustomer_Id(e);
                      GetAllContacts(e);
                      GetSingleCustomer(e);
                    }}
                  >
                    {AllCustomers &&
                      AllCustomers.length > 0 &&
                      AllCustomers.map((item, index) => {
                        return (
                          <Select.Option
                            key={item.customer_id}
                            value={item.customer_id}
                          >
                            {item?.customer_name}
                          </Select.Option>
                        );
                      })}
                  </SelectBox>
                </Form.Item>
              </div>
              <div className="col-1 ">
                <Button
                  btnType="add_borderless"
                  onClick={() => {
                    setModalAddCustomer(true);
                    addForm.resetFields();
                  }}
                >
                  <BsPlusCircleFill
                    style={{
                      fontSize: "21px",
                      marginTop: "30px",
                      marginLeft: "10px",
                    }}
                  />{" "}
                </Button>
              </div>
            </div>

            <div className="col-sm-4 pt-2">
              <label>
                Enquiry No<span className="required">*</span>
              </label>
              <Form.Item name="enquiryno">
                <InputType
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>
                Date<span className="required">*</span>
              </label>
              <Form.Item
                name="date"
                className="mt-2"
                rules={[
                  {
                    required: true,
                    message: "Date is Required",
                  },
                ]}
              >
                <DatePicker
                  format={"DD-MM-YYYY"}
                  //   defaultValue={moment(newDate)}
                  //   value={purchase_date}
                  //   onChange={(e) => {
                  //     setPurchasedate(e);
                  //   }}
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>
                Source<span className="required">*</span>
              </label>
              <Form.Item
                name="source"
                className=""
                rules={[
                  {
                    required: true,
                    message: "Source is Required",
                  },
                ]}
              >
                <SelectBox>
                  <Select.Option value="reference">Reference</Select.Option>
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
              <label>
                Customer Reference<span className="required">*</span>
              </label>
              <Form.Item
                name="reference"
                rules={[
                  {
                    required: true,
                    message: "Customer Reference is Required",
                  },
                ]}
              >
                <InputType
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-2">
              <label>
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
                <SelectBox></SelectBox>
              </Form.Item>
            </div>
          </div>

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Contact Details</h5>
            </div>

            <div className="col-sm-4 pt-3">
              <label>Contact Person</label>
              <Form.Item name="contactperson">
                <SelectBox
                  onChange={(e) => {
                    GetSingleContact(e);
                  }}
                >
                  {AllContacts &&
                    AllContacts.length > 0 &&
                    AllContacts.map((item, index) => {
                      return (
                        <Select.Option
                          key={item.contact_id}
                          value={item.contact_id}
                        >
                          {item.contact_person_name}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Email</label>
              <Form.Item name="contactemail">
                <InputType
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label>Phone</label>
              <Form.Item name="contactphone">
                <InputType
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                />
              </Form.Item>
            </div>
          </div>

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-5">
            <div className="col-12">
              <h5 className="lead_text">Extra Info</h5>
            </div>

            {/* <div className="col-3">
                  <label>Organisation</label>
                  <Form.Item name="organisation">
                  
                  <InputType
                    //   value={purchasePoNo}
                    //   onChange={(e) => {
                    //     setPurchasePoNo(e.target.value);
                    //     console.log("purchasePoNo", purchasePoNo);
                    //   }}
                    />
                  </Form.Item>
                </div>

                </div> */}

            <div className="col-sm-6 pt-2">
              <label>Remarks</label>
              <Form.Item name="purchasePoRef">
                <TextArea />
              </Form.Item>
            </div>

            <div className="col-sm-6 pt-2">
              <label>Attachments</label>
              <Form.Item name="attachments" className="">
                <FileUpload
                  name="attachments"
                  //   value={attachments}
                  multiple
                  listType="file"
                  accept=".pdf,.doc,.zip"
                  height={100}
                  // onPreview={handlePreview}
                  beforeUpload={false}
                  onChange={(file) => {
                    console.log("Before upload", file.file);
                    console.log("Before upload file size", file.file.size);

                    if (file.file.size > 1000 && file.file.size < 500000) {
                      setImg(file.file.originFileObj);
                      setImgSizeError(false);
                      console.log(
                        "Image must be greater than 1 kb and less than 500 kb"
                      );
                    } else {
                      console.log("failed beacuse of large size");
                      setImgSizeError(true);
                    }
                  }}
                />
              </Form.Item>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-center my-4 gap-3">
            <Button className="save_button" btnType="save">
              Save
            </Button>
            <Button
              as="input"
              type="reset"
              value="Reset"
              onClick={() => {
                navigate(ROUTES.ENQUIRY_LIST);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>

        {/* Modal for add Customer */}

        <Custom_model
          success
          show={SuccessPopup}
          onHide={() => {
            setSuccessPopup(false);
          }}
        />
      </div>
    </>
  );
}
export default Enquiry;
