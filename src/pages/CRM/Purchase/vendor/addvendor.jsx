import React, { useEffect, useState } from "react";
import CustomModel from "../../../../components/custom_modal/custom_model";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { MdPageview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Form, Input, Select, DatePicker,Radio,message } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import InputType from "../../../../components/Input Type textbox/InputType";
import Button from "../../../../components/button/button";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";
import { ROUTES } from "../../../../routes";

import Custom_model from "../../../../components/custom_modal/custom_model";
import { Link, useNavigate } from "react-router-dom";
import {
  CRM_BASE_URL_PURCHASING,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import { vendor_Organisation } from "../../../../utils/SelectOptions";
import FileUpload from "../../../../components/fileupload/fileUploader";
import "./vendor.scss";
import Accounting from "./Accountings/Accountings";
import Bankdetails from "./bankdetails/bankdetails";
import ContactTable from "../../lead/tables/contactstable";
import Moreinfo from "./Moreinfo/moreinfo";
import Contact from "./vendorcontact/Contact";


function Addvendor({ }  ) {
  const [addForm] = Form.useForm();
  // const [messageApi, contextHolder] = message.useMessage();
  const [successPopup, setSuccessPopup] = useState(false);

  const navigate = useNavigate();


  const [allvendor, setAllvendor] = useState("");
  const [allCountries, setAllCountries] = useState("");

  const [countryis, setCountryis] = useState();
  const [vendortypes, setvendortypes] = useState("");

  const [vendorname, setvendorname] = useState("");
  const [vendorOrganisation, setvendorOrganisation] = useState("");
  const [vendoremail, setvendoremail] = useState("");
  const [vendorcontact, setvendorcontact] = useState("");
  const [vendorcity, setvendorcity] = useState("");
  const [vendoraddress, setvendoraddress] = useState("");
  const [vendortyp, setvendortyp] = useState("");
  const [vendortaxno, setvendortaxno] = useState("");
  const [vendordescription, setvendordescription] = useState("");
  const [totalvendor, settotalvendor] = useState("");

  const [vendorattachment,setvendorattachment] = useState("")

  const[vendorId,setVendorId] = useState()

  const [toggleState, setToggleState] = useState(1);

  const [timeOut, setTimeOuts] = useState(false);
  const [Toggle4, setToggle4] = useState(false);
  const [Toggle3, setToggle3] = useState(false);


  const beforeUpload = (file, fileList) => {};
  const [messageApi, contextHolder] = message.useMessage();


  const errormessage = () => {
    messageApi.open({
      type: "error",
      content: "Create a Vendor",
    });
  };

  const getallvendortype = async () => {
    try {
      const allvendortypes = await PublicFetch.get(
        `${CRM_BASE_URL_PURCHASING}/vendorTypes`
      );
      console.log("getting all vendorTypes", allvendortypes);
      setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendortypes", err);
    }
  };


  const getData = (current, pageSize) => {
    return allvendor?.slice((current - 1) * pageSize, current * pageSize);
  };

  // const getallvendors = async () => {
  //   try {
  //     const allvendor = await PublicFetch.get(
  //       `${CRM_BASE_URL_PURCHASING}/vendors`
  //     );
  //     console.log("getting all vendorss", allvendor.data.data);
  //     settotalvendor(allvendor.data.data);
      
  //     let arry = [];
  //     allvendor.data.data.map((i, indx) => {
  //       vendor_Organisation.forEach((itm, index) => {
  //         console.log("vndr", itm);
  //         if (itm.value === i.vendor_org_type) {
  //           arry.push({
  //             vendor_name: i.vendor_name,
  //             vendor_email: i.vendor_email,
  //             vendor_org_type: itm.name,
  //             vendor_country: i.countries.country_name,
  //             vendor_country_id: i.vendor_country_id,
  //             vendor_contact: i.vendor_contact,
  //             vendor_city: i.vendor_city,
  //             vendor_address: i.vendor_address,
  //             vendor_description: i.vendor_desc,
  //             vendor_type_id: i.vendor_type_id,
  //             vender_id: i.vendor_id,
  //             vender_taxno: i.vendor_tax_no,
  //             vendor_country_id: i.vendor_country_id,
  //           });
  //         }
  //       });
  //     });
  //     console.log("arryss", arry);
  //     setAllvendor(arry);

  //     // setvendortypes(allvendortypes.data.data);
  //   } catch (err) {
  //     console.log("error to fetching  vendor", err);
  //   }
  // };
  const handleChange = (e) => {
    setCountryis(e);
  };

  // const errormessage = () => {
  //   messageApi.open({
  //     type: "error",
  //     content: "Create a Customer",
  //   });
  // };
  const getCountry = () => {
    PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/country`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAllCountries(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const close_modal = (mShow, time,venddata) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        setTimeOuts(true);
        setVendorId(venddata);
        toggleTab(2);
        // toggleTab(4);
        // navigate(`${ROUTES.VENDOR}`);
      }, time);
    }
  };
console.log("bnkdetails id iss",vendorId)

  // const createvendor = async () => {
  //   try {
  //     const addvendor = await PublicFetch.post(
  //       `${CRM_BASE_URL_PURCHASING}/vendors`,
  //       {
  //         name: vendorname,
  //         org_type: vendorOrganisation,
  //         vendor_type: vendortyp,
  //         email: vendoremail,
  //         contact: vendorcontact,
  //         country_id: countryis,
  //         city: vendorcity,
  //         address: vendoraddress,
  //         desc: vendordescription,
  //         tax_no: vendortaxno,
  //       }
  //     );
  //     console.log("vendors added successfully", addvendor);
  //     if (addvendor.data.success) {
  //       setSuccessPopup(true);
  //       getallvendors();
  //       addForm.resetFields();

  //       close_modal(successPopup, 1000);
  //     }
  //   } catch (err) {
  //     console.log("err to add the vendors", err);
  //   }
  // };

  const createvendor = (data) => {
    const formData = new FormData();
    formData.append(`name`, data.vendorname);
    formData.append(`org_type`, data.org_type);
    formData.append(`vendor_type`, data.vendortype);
    formData.append(`email`, data.vendoremail);
    formData.append(`contact`, data.vendorphone);

    data?.vendorcountry && formData.append(`country_id`, data?.vendorcountry);
    data?.vendorwebsite && formData.append(`website`, data?.vendorwebsite);
    data?.vendorcity && formData.append(`city`, data?.vendorcity);
    data?.vendorstate && formData.append(`state`, data?.vendorstate);

    // formData.append(`city`, data.vendorcity);
    // formData.append(`website`, data.vendorwebsite);
    // formData.append(`state`, data.vendorstate);
    formData.append(`address`, data.vendoraddress);
    formData.append(`remarks`, data.vendorremarks);
   
    if (data.vendor_attachments) {
      formData.append(`attachments`, data.vendor_attachments);
      // formData.append(`customer_logo`, leadimg);
    }

    PublicFetch.post(`${CRM_BASE_URL_PURCHASING}/vendors`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("successfully added", res);
        if (res.data.success) {
          setSuccessPopup(true);
          addForm.resetFields();
          close_modal(successPopup, 1000,res?.data?.data);

        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };


  useEffect(() => {
    addForm.setFieldsValue({ org_type: "ORG" });
    getallvendortype();
    // getallvendors();
    getCountry();
  }, []);


  const toggleTab = (index) => {
    setToggleState(index);

  };


  const handleContactTab = (e) => {
    if (e) {
      setTimeOuts(true);
      setToggle4(false);
      toggleTab(2);
    }
  };

  const handleAccountingTab = () => {
    setTimeOuts(false);
    // setToggle4(false);
    toggleTab(3);
  };

  const handleBankTab = () => {
    setTimeOuts(false);
    setToggle4(false);
    toggleTab(4);
 
  };
  const handleMoreinfoTab = () => {
    setTimeOuts(false);
    setToggle4(false);
    toggleTab(5);
   
  };


  return (
    <>
    {contextHolder}
      <h5 className="lead_text">Add Vendor</h5>
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
                    // handleContactTab(e);
                    vendorId == null ? errormessage() : handleContactTab(e);
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
                    // handleAccountingTab(e);
                    vendorId == null ? errormessage() : handleAccountingTab(e);
                  }}
                >
                  Accounting
                </button>
              </div>
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                  onClick={(e) => {
                    // handleBankTab(e);
                    vendorId == null ? errormessage() : handleBankTab(e);
                  }}
                >
                  Bank Details
                </button>
              </div>
              <div className="col-xl-1 col-sm-2 pe-1">
                <button
                  className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
                  onClick={(e) => {
                    // handleMoreinfoTab(e);
                    vendorId == null ? errormessage() : handleMoreinfoTab(e);
                  }}
                >
                  More Info
                </button>
              </div>

            </div>
            <div className="content-tabs">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                <Form
                  form={addForm}
                  onFinish={(data) => {
                    console.log("valuezzzzzzz", data);
                    createvendor(data);
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                 

                  <div className="row  mt-3 mx-0 px-2 py-1">
                    <div className="col-sm-4 pt-2 ">
                      <label>
                       
                        Name<span className="required">*</span>
                      </label>

                      <Form.Item
                        name="vendorname"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z ]+$"),
                            message: "Please enter a Valid vendor Name",
                          },
                        ]}
                      >
                        <InputType
                          value={vendorname}
                          onChange={(e) => {
                            setvendorname(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-sm-4 pt-2">
                      <label>
                        Organisation Type<span className="required">*</span>
                      </label>
  
                      <Form.Item
                        name="org_type"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Valid organisation",
                          },
                        ]}
                      >
                        <Radio.Group
                        className="d-flex gap-5"
                          defaultValue="ORG"
                        >
                          <Radio value="ORG">Organization</Radio>
                          <Radio value="IND">Individual</Radio>
                        </Radio.Group>
                       
                      </Form.Item>
                    </div>

                    <div className="col-sm-4 pt-2">
                      <label>
                        Vendor Type<span className="required">*</span>
                      </label>

                      <Form.Item
                        name="vendortype"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Valid vendortype",
                          },
                        ]}
                      >
                        <SelectBox
                          showSearch={true}
                          allowClear
                          value={vendortyp}
                          optionFilterProp="children"
                          onChange={(e) => {
                            setvendortyp(e);
                          }}
                        >
                          {vendortypes &&
                            vendortypes.length > 0 &&
                            vendortypes.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.vendor_type_id}
                                  id={item.vendor_type_id}
                                  value={item.vendor_type_id}
                                >
                                  {item.vendor_type_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-sm-6 pt-1">
                      <label> Address</label>
                      <div>
                        <Form.Item className="py-1" 
                        name="vendoraddress">
                          <TextArea
                            // value={vendordescription}
                            // onChange={(e) => {
                            //   setvendordescription(e.target.value);
                            // }}
                            className="address_height"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-6 pt-1">
                      <label> Attachments</label>
                      <div>
                        <Form.Item className="py-1" 
                        name="vendor_attachments"
                        >
                          <FileUpload
                            beforeUpload={beforeUpload}
                            multiple
                            height={100}
                            listType="picture"
                            accept=".pdf,.docs,"
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  <div className="row  mt-1 mx-0 px-2 py-1">
                    {/* <div className="col-12">
                      <h5 className="lead_text">Contact Details</h5>
                    </div> */}

                    <div className="col-sm-4 pt-3">
                      <label>
                        Phone<span className="required">*</span>
                      </label>

                      <Form.Item
                        name="vendorphone"
                        rules={[
                          {
                            required: true,

                            message: "Please enter a Valid contact",
                          },

                        ]}
                      >
                        <InputType
                          // value={vendorcontact}
                          // onChange={(e) => {
                          //   setvendorcontact(e.target.value);
                          // }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 pt-3">
                      <label>
                        {" "}
                        Email<span className="required">*</span>
                      </label>

                      <Form.Item
                        name="vendoremail"
                        rules={[
                          {
                            required: true,
                            // pattern: new RegExp("^[A-Za-z ]+$"),
                            message: "Please enter a Valid email",
                          },
                        ]}
                      >
                        <InputType
                          // value={vendoremail}
                          // onChange={(e) => {
                          //   setvendoremail(e.target.value);
                          // }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-sm-4 pt-3">
                      <label>
                        {" "}
                        Website
                        {/* <span className="required">*</span> */}
                      </label>

                      <Form.Item
                        name="vendorwebsite"
                        // rules={[
                        //   {
                        //     required: true,

                        //     message: "Please enter a Valid Website",
                        //   },

                        // ]}
                      >
                        <InputType
                          // value={vendorcontact}
                          // onChange={(e) => {
                          //   setvendorcontact(e.target.value);
                          // }}
                        />
                      </Form.Item>
                    </div>

                    <div className="col-sm-4 pt-2">
                      <label>
                        Country
                        {/* <span className="required">*</span> */}
                      </label>

                      <Form.Item
                        name="vendorcountry"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please enter a Valid country",
                        //   },
                        // ]}
                      >
                        <SelectBox
                          showSearch={true}
                          allowClear
                          // value={countryis}
                          optionFilterProp="children"
                          onChange={handleChange}
                        >
                          {allCountries &&
                            allCountries.length > 0 &&
                            allCountries.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.country_id}
                                  id={item.country_id}
                                  value={item.country_id}
                                >
                                  {item.country_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                      {/* <label>City</label>
                
                    <Form.Item name="vendorcity">
                      <InputType
                        value={vendorcity}
                        onChange={(e) => {
                          setvendorcity(e.target.value);
                        }}
                      />
                    </Form.Item> */}
                    </div>

                    <div className="col-sm-4 pt-2">
                      <label>State</label>

                      <Form.Item name="vendorstate">
                        <InputType
                        
                        />
                      </Form.Item>
                      {/* <label>Tax No</label>
                
                    <Form.Item name="vendortaxno">
                      <InputType
                        value={vendortaxno}
                        onChange={(e) => {
                          setvendortaxno(e.target.value);
                        }}
                      />
                    </Form.Item> */}
                    </div>
                    <div className="col-sm-4 pt-2">
                      <label>City</label>

                      <Form.Item name="vendorcity">
                        <InputType
                          value={vendorcity}
                          onChange={(e) => {
                            setvendorcity(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="row  mt-1 mx-0 px-2 py-1">
                    {/* <div className="col-12">
                      <h5 className="lead_text">Extra Info</h5>
                    </div> */}

                    <div className="col-sm-12 pt-1">
                      <label> Remarks</label>
                      <div>
                        <Form.Item className="py-1" 
                        name="vendorremarks">
                          <TextArea
                            value={vendoraddress}
                            onChange={(e) => {
                              setvendoraddress(e.target.value);
                            }}
                          />

                        </Form.Item>
                      </div>
                    </div>

                    {/* <div className="col-sm-6 pt-2">
            
                  <label> Description</label>
                  <div>
                    <Form.Item 
                    className="py-1"
                    name="vendordescription">
                      <TextArea
                        value={vendordescription}
                        onChange={(e) => {
                          setvendordescription(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div> */}
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
                        navigate(`${ROUTES.VENDOR}`);
                      }}
                      // className="qtn_save"
                      // btnType="save"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>

              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <div className="row mt-3 px-1" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12"></div>
                  <div className="col-12 mt-2">
                    <Contact 
                     vendor={vendorId}
                    toggle={timeOut} />
                  </div>
                  <div className="col mt-4">
                    {/* <Button btnType="save" onClick={(e) => handleAddressTab(e)}>
                      Next
                    </Button> */}
                  </div>
                </div>
              </div>

              <div
                className={
                  toggleState === 3 ? "content  active-content" : "content"
                }
              >
                <div className="row mt-3 px-1" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12"></div>
                  <div className="col-12 mt-2">
                    <Accounting
                    vendor={vendorId}
                    toggle={Toggle3} />
                  </div>
                  <div className="col mt-4">
                    {/* <Button btnType="save" onClick={(e) => handleAddressTab(e)}>
                      Next
                    </Button> */}
                  </div>
                </div>
              </div>

              <div
                className={
                  toggleState === 4 ? "content  active-content" : "content"
                }
              >
                <div className="row mt-3 px-1" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12"></div>
                  <div className="col-12 mt-2">
                    <Bankdetails 
                    vendor={vendorId}
                    toggle={Toggle3} />
                  </div>
                  <div className="col mt-4">
                    {/* <Button btnType="save" onClick={(e) => handleAddressTab(e)}>
                      Next
                    </Button> */}
                  </div>
                </div>
              </div>
              <div
                className={
                  toggleState === 5 ? "content  active-content" : "content"
                }
              >
                <div className="row mt-3 px-1" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12"></div>
                  <div className="col-12 mt-2">
                    <Moreinfo 
                    vendor={vendorId}
                    toggle={timeOut} />
                  </div>
                  <div className="col mt-4">
                    {/* <Button btnType="save" onClick={(e) => handleAddressTab(e)}>
                      Next
                    </Button> */}
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* <div className="container-fluid "> */}

          <Custom_model
            size={"sm"}
            show={successPopup}
            onHide={() => setSuccessPopup(false)}
            success
          />

          {/* </div> */}
        </div>
      </div>
    </>
  );
}
export default Addvendor;
