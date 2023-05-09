import { Form, Checkbox, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import FileUpload from "../../../../components/fileupload/fileUploader";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { ROUTES } from "../../../../routes";
import { useNavigate, useParams } from "react-router-dom";

import { BsPlusCircleFill } from "react-icons/bs";
import "../enquiry/enquiry.scss";
import CustomModel from "../../../../components/custom_modal/custom_model";

import Custom_model from "../../../../components/custom_modal/custom_model";
import PublicFetch from "../../../../utils/PublicFetch";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
  CRM_BASE_URL_HRMS,
} from "../../../../api/bootapi";
import moment from "moment";
import CustomerModal from "../../../../components/CustomerModal.jsx/CustomerModal";
import Button from "../../../../components/button/button";
function Enquiry() {
  const [addForm] = Form.useForm();
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [img, setImg] = useState([]);
  const [customername,setCustomerName]=useState();
  console.log("customer id",customername);
  const [customernew,setCustomernew]=useState();
  console.log("customer nameee",customernew);
  const navigate = useNavigate();
  const [modalAddCustomer, setModalAddCustomer] = useState(false);
  const [imgSizeError, setImgSizeError] = useState(false);
  const [AllCustomers, setAllCustomers] = useState();
  const [AllContacts, setAllContacts] = useState();
  const [Customer_Id, setCustomer_Id] = useState();
  const [allSalesPerson, setAllSalesPerson] = useState();

  console.log("sales person ", allSalesPerson);
  const [frighttype, setFrighttype] = useState();
  const [frightmode, setFrightmode] = useState();
  console.log("change", frightmode);
  const [frighttypemode, setFrighttypemode] = useState();
  const [allLocations, setAllLocations] = useState();
  const [locationType, setLocationType] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(`${ROUTES.ENQUIRY_LIST}`);
      }, time);
    }
  };
  

  const getallfrighttype = async () => {
    try {
      const allfrighttypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/freightTypes`
      );
      console.log("Getting all frieght types : ", allfrighttypes.data.data);
      setFrighttype(allfrighttypes.data.data);
    } catch (err) {
      console.log("Error in fetching fright types : ", err);
    }
  };
  useEffect(() => {
    // getallunits();
    // getAllLocations();
    GetSingleEnquiry();
    getallfrighttype();
  }, []);


  useEffect(() => {

  if(customername){
    GetAllCustomers();
    GetAllContacts();
    // addForm.setFieldsValue({customer : customername})
    setCustomer_Id(customername);
    handleclicknew(customername);
    // GetSingleCustomer(customername);
   
  }
  }, [customername]);

  const mode = (e) => {
    if (e) {
      {
        frighttype &&
          frighttype.length > 0 &&
          frighttype.map((item, index) => {
            if (item.freight_type_id === e) {
              console.log("reached", item.freight_type_mode);
              setFrighttypemode(item.freight_type_mode);
              locationBytype(item.freight_type_mode);
            } else {
              locationBytype();
            }
          });
      }
    }
  };


  const locationBytype = (data) => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/locations/type-location/${data}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of location type", res.data, data);
          setLocationType(res.data.data.location_type);
          let temp = [];
          res.data.data.forEach((item, index) => {
            temp.push({
              location_id: item.location_id,
              location_code: item.location_code,
              location_name: item.location_name,
              location_type: item.location_type,
              location_country: item.location_country,
            });
            setAllLocations(temp);
          });
        }
      })
      .catch((err) => {
        console.log("Error of location type", err);
      });
  };


  const [savedisbtn,setSaveddisbtn]=useState(false);
  // api call starts !!

  const GetAllCustomers = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/minimal`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success og gettimg customers", res?.data?.data);
          setAllCustomers(res?.data?.data);
         addForm.setFieldsValue({customer : customername})
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
console.log("CustomerName", customername);
  const GetSingleCustomer = (e) => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${e}`)
      .then((res) => {
        console.log("Response from single customer", res);
        if (res.data.success) {
          console.log("Success from single customer", res.data.data);
          console.log("contact data", res.data.data.crm_v1_contacts[0]);
          console.log("accounts data",res.data.data.customer_preferred_freight_type)
          let a = res.data.data.crm_v1_contacts[0];
          setAllContacts(res.data.data.crm_v1_contacts)
          // let b =res.data.data.crm_v1_customer_accounting[0];
          let b= res.data.data.customer_preferred_freight_type;
          addForm.setFieldsValue({
            contactperson: a?.contact_id,
            contactemail: a?.contact_email,
            contactphone: a?.contact_phone_1,
            customerfrighttype: b,
             enquiryno : allEnquiresno,
            
            
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const[allEnquiresno,setAllEnquiresno]=useState();
  useEffect(() => {
    if(allEnquiresno){
      addForm.setFieldsValue({ enquiryno : allEnquiresno })
    }
    // getallunits();
    // getAllLocations();
 
  }, [allEnquiresno]);

console.log("Enquiry no :",allEnquiresno);
  const GetSingleEnquiry = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiries/enquiryNumber`)
      .then((res) => {
        console.log("response of enq number", res);
        if (res.data.data) {
          console.log("success of enq", res.data.data);
          setAllEnquiresno(res?.data?.data.enquiryNumber);
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
  // const [items, setItems] = useState();
  // console.log("user id ",items)

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('UserID'));
  //   if (items) {
  //    setItems(items);
    
  //     addForm.setFieldValue({
  //       salesperson:items,
  //     })
    
  //   }
  // }, []);
  // create a enquiry !!
//   const [name, setName] = useState('');
// console.log("userid",name);
  // useEffect(() => {
  //   const personName = localStorage.getItem('UserID');
  //   // if(personName){

  //   // }
  //   addForm.setFieldsValue({
  //     salesperson : personName,
  //   });
  // }, []);
  const handleSelectCustomer = (customerId) => {
    setCustomer_Id(customerId);
    GetAllContacts(customerId);
    GetAllCustomers();
    // addForm.resetFields();
    handleclick(customerId);
  };

  const CreateEnquiry = (data) => {
    if(data){
      setSaveddisbtn(true);
    }
    let enquiry_date = moment(data.date);
    const formData = new FormData();
    formData.append("enquiry_customer_id", data.customer);
    if(data.source){
      formData.append("enquiry_source", data.source);
    }
    
    formData.append("enquiry_date", enquiry_date);
    if(data.reference){
      formData.append("enquiry_customer_ref", data.reference);
    }
    
    formData.append("enquiry_contact_person_id", data.contactperson);

    if(data.purchasePoRef){
      formData.append("enquiry_remarks", data.purchasePoRef);
    }
 
if(data.customerfrighttype){
  formData.append("enquiry_freight_type", data.customerfrighttype);
}

   
    formData.append("enquiry_sales_person_id", data.salesperson);
    // formData.append("", data.customerfrighttype);
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
          setSaveddisbtn(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
 GetAllEnquirySource();
  }, []);
  const [AllEnquirySource, setAllEnquirySource] = useState();

  const GetAllEnquirySource = () => {
    PublicFetch.get(`${CRM_BASE_URL}/enquiry_source`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of data", res.data.data);
          setAllEnquirySource(res.data.data);
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
    const personName = localStorage.getItem('UserID');
    res.data.data.forEach((item,index)=> {
      if(personName == item.employee_id){
        addForm.setFieldsValue({
          salesperson: item.employee_id
        })
      }
    })


        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  useEffect(() => {
    GetSalesPersons();
  }, []);
  const handleSearch = (value) => {
    if (!value) {
      setFilteredCustomers([]);
      return;
    }
    const filtered = AllCustomers.filter((customer) =>
      customer.customer_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };
  function disabledDate(current) {
    // Disable dates after today
    return current && current > moment().endOf('day');
  }

  useEffect(() => {
    GetAllCustomers();
    // GetAllContacts();
    let today = new Date();
    let todayDate = moment(today);
    addForm.setFieldsValue({
      date: todayDate,
    });
  }, []);

  const handleclick = (e) => {
    GetSingleCustomer(e);
  };
  const handleclicknew = (e) => {
    console.log("reached",e);
    GetSingleCustomer(e);
    // GetSingleContact(e);
  };
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
            <h5 className="lead_text">New Enquiry</h5>
          </div>

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h6 className="lead_text">Basic Info</h6>
            </div>

            <div className="col-sm-4 pt-2 d-flex">
              <div className="col-11">
                <label className="mb-1">
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
           filterOption={(input, option) =>


            option.children.toUpperCase().includes(input.toUpperCase())

          }

          showSearch={true}
          allowClear={true}
          optionFilterProp="children"
          // onSearch={handleSearch}
          // onSelect={handleSelectCustomer} // add a function to handle when the user selects a customer
          onChange={(e) => {
            handleclick(e);
            setCustomer_Id(e);
            GetAllContacts(e);
          // addForm.resetFields();
        
           
          }}
        >
          {/* {(filteredCustomers.length > 0 ? filteredCustomers : AllCustomers)?.map((item, index) => { */}
          {AllCustomers &&
            AllCustomers.length > 0 &&
            AllCustomers.map((item, index) => {
            return (
              <Select.Option key={item.customer_id} value={item.customer_id}>
                {item?.customer_name}
              </Select.Option>
            );
          })}
        </SelectBox>
                </Form.Item>
              </div>
              <div className="col-1 ">
                {/* <Button
                  btnType="add_borderless"
                  onClick={() => {
                    setModalAddCustomer(true);
                    addForm.resetFields();
                  }}
                > */}
                  <BsPlusCircleFill
                    style={{
                      fontSize: "21px",
                      marginTop: "32px",
                      marginLeft: "4px",
                      color:"#0891d1",
                    }}
                    onClick={() => {
                      setModalAddCustomer(true);
                      addForm.resetFields();
                    }}

                  />{" "}
                {/* </Button> */}
              </div>
            </div>

            <div className="col-sm-4 pt-2 ">
              <label className="mb-1">Freight Type</label>
              <Form.Item
                name="customerfrighttype"
                // rules={[
                //   {
                //     required: true,
                //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                //     message: "Please enter a Valid freight type",
                //   },
                // ]}
              >
                <SelectBox
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  onChange={(e) => {
                    console.log("date mmm", e);
                    setFrightmode(e);
                    mode(e);
                  }}
                >
                  {frighttype &&
                    frighttype.length > 0 &&
                    frighttype.map((item, index) => {
                      return (
                        <Select.Option
                          key={item.freight_type_id}
                          value={item.freight_type_id}
                        >
                          {item.freight_type_name}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Enquiry No<span className="required">*</span>
              </label>
              <Form.Item name="enquiryno"
              
                // rules={[
                //   {
                //     required: true,
                //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                //     message: "Please enter a Valid Enquiry number",
                //   },
                // ]}
              >
                <InputType
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                disabled={true}
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label className="mb-1">
                Date<span className="required">*</span>
              </label>
              <Form.Item
                name="date"
                className=""
                rules={[
                  {
                    required: true,
                    message: "Date is Required",
                  },
                ]}
              >
                <DatePicker
                  format={"DD-MM-YYYY"}
                  disabledDate={disabledDate}
                  //   defaultValue={moment(newDate)}
                  //   value={purchase_date}
                  //   onChange={(e) => {
                  //     setPurchasedate(e);
                  //   }}
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label className="mb-1">Source<span className="required">*</span></label>
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
                {/* <SelectBox>
                  <Select.Option value="reference">Reference</Select.Option>
                  <Select.Option value="direct visit">
                    Direct Visit
                  </Select.Option>
                  <Select.Option value="online registration">
                    Online Registration
                  </Select.Option>
                </SelectBox> */}
                 <SelectBox>
                  {AllEnquirySource &&
                    AllEnquirySource.length > 0 &&
                    AllEnquirySource.map((item, index) => {
                      console.log("index of enq source",item);
                      return (
                        <Select.Option
                          key={item.enq_source_id}
                          value={item.enq_source_id}
                        >
                          {item.enq_source_name}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label className="mb-1">Customer Reference</label>
              <Form.Item
                name="reference"
                // rules={[
                //   {
                //     required: true,
                //     message: "Customer Reference is Required",
                //   },
                // ]}
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
              <label className="mb-1">
                Sale Person<span className="required">*</span>
              </label>
              <Form.Item
                name="salesperson"
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

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h6 className="lead_text">Contact Details</h6>
            </div>

            <div className="col-sm-4 pt-3">
              <label className="mb-1">Contact Person</label>
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
              <label className="mb-1">Email</label>
              <Form.Item name="contactemail">
                <InputType
                disabled={true}
                //   value={purchasePoNo}
                //   onChange={(e) => {
                //     setPurchasePoNo(e.target.value);
                //     console.log("purchasePoNo", purchasePoNo);
                //   }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 pt-3">
              <label className="mb-1">Phone</label>
              <Form.Item name="contactphone">
                <InputType
                  disabled={true}
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
              <h6 className="lead_text">Extra Info</h6>
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
              <label className="mb-1">Remarks</label>
              <Form.Item name="purchasePoRef">
                <TextArea />
              </Form.Item>
            </div>

            <div className="col-sm-6 pt-2">
              <label className="mb-1">Attachments</label>
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
            <Button type="submit" btnType="save" disabled={savedisbtn}>
              Save
            </Button>
            <Button
              as="input"
              type="reset"
              value="Reset"
              className="btn_cancel"
              onClick={() => {
                navigate(ROUTES.ENQUIRY_LIST);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>

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
