import React, { useEffect, useState } from "react";
import CustomModel from "../../../../components/custom_modal/custom_model";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import { MdPageview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Form, Input, Select, DatePicker } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import InputType from "../../../../components/Input Type textbox/InputType";
import Button from "../../../../components/button/button";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";
import {ROUTES} from "../../../../routes";

import Custom_model from "../../../../components/custom_modal/custom_model";
import { Link, useNavigate } from "react-router-dom";
import {
  CRM_BASE_URL_PURCHASING,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import { vendor_Organisation } from "../../../../utils/SelectOptions";





function Addvendor(){
  const [addForm] = Form.useForm();

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

  
  const [totalvendor,settotalvendor] =useState("")






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

  const getallvendors = async () => {
    try {
      const allvendor = await PublicFetch.get(
        `${CRM_BASE_URL_PURCHASING}/vendors`
      );
      console.log("getting all vendorss", allvendor.data.data);
      settotalvendor(allvendor.data.data)
      // setAllvendor(allvendor.data.data)
      let arry = [];
      allvendor.data.data.map((i, indx) => {
        vendor_Organisation.forEach((itm,index)=>{
          console.log("vndr",itm)
          if (
            itm.value === i.vendor_org_type
          )
          {

        arry.push({
          vendor_name: i.vendor_name,
          vendor_email: i.vendor_email,
          vendor_org_type: itm.name,
          vendor_country: i.countries.country_name,
          vendor_country_id: i.vendor_country_id,
          vendor_contact: i.vendor_contact,
          vendor_city: i.vendor_city,
          vendor_address: i.vendor_address,
          vendor_description: i.vendor_desc,
          vendor_type_id: i.vendor_type_id,
          vender_id: i.vendor_id,
          vender_taxno: i.vendor_tax_no,
          vendor_country_id: i.vendor_country_id,
        });
      }

      })
      });
      console.log("arryss", arry);
      setAllvendor(arry);

      // setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendor", err);
    }
  };
  const handleChange = (e) => {
    setCountryis(e);
  };
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
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(`${ROUTES.VENDOR}`);
      }, time);
    }
  };
  const createvendor = async () => {
    try {
      const addvendor = await PublicFetch.post(
        `${CRM_BASE_URL_PURCHASING}/vendors`,
        {
          name: vendorname,
          org_type: vendorOrganisation,
          vendor_type: vendortyp,
          email: vendoremail,
          contact: vendorcontact,
          country_id: countryis,
          city: vendorcity,
          address: vendoraddress,
          desc: vendordescription,
          tax_no: vendortaxno,
        }
      );
      console.log("vendors added successfully", addvendor);
      if (addvendor.data.success) {
        setSuccessPopup(true);
        getallvendors();
        addForm.resetFields();
    
        close_modal(successPopup, 1000);
      }
    } catch (err) {
      console.log("err to add the vendors", err);
    }
  };

  useEffect(() => {
    getallvendortype();
    getallvendors();
    getCountry();
  }, []);

    return(
      <>
        <div className="container-fluid ">

<Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                createvendor();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >

<div className="row px-1 pt-2">
            <h5 className="lead_text">Add Vendor</h5>
          </div>



          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Basic Info</h5>
            </div>

            <div className="col-sm-4 pt-2 ">
             
          
                  <label> Name<span className="required">*</span></label>
                 
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
                  <label> Organisation Type<span className="required">*</span></label>
                  
                    <Form.Item
                      name="vendorOrganisation"
                      rules={[
                        {
                          required: true,
                          // pattern: new RegExp("^[A-Za-z ]+$"),
                          message: "Please enter a Valid organisation",
                        },
                      ]}
                    >
                      <SelectBox
                      showSearch={true}
                      allowClear
                      optionFilterProp="children"
                        value={vendorOrganisation}
                        onChange={(e) => {
                          setvendorOrganisation(e);
                          // setOrganizationDisable(e);
                        }}
                      >
                        <Select.Option value="ORG">Organisation</Select.Option>
                        <Select.Option value="IND">Indivdual</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  
                </div>

                <div className="col-sm-4 pt-2">
                  <label>Type<span className="required">*</span></label>
                  
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

                <div className="col-sm-4 pt-2">
                  <label>Tax No</label>
                
                    <Form.Item name="vendortaxno">
                      <InputType
                        value={vendortaxno}
                        onChange={(e) => {
                          setvendortaxno(e.target.value);
                        }}
                      />
                    </Form.Item>
              
                </div>
                <div className="col-sm-4 pt-2">
                  <label>Country<span className="required">*</span></label>
                
                    <Form.Item
                      name="vendorcountry"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Valid country",
                        },
                      ]}
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
            
                </div>
          

              </div>

              <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Contact Details</h5>
            </div>


              <div className="col-sm-4 pt-3">
             
                  <label> Email<span className="required">*</span></label>
                
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
                        value={vendoremail}
                        onChange={(e) => {
                          setvendoremail(e.target.value);
                        }}
                      />
                    </Form.Item>
                  
                </div>

                <div className="col-sm-4 pt-3">
                  <label> Contact<span className="required">*</span></label>
                  
                    <Form.Item
                      name="vendorcontact"
                      rules={[
                        {
                          required: true,

                          message: "Please enter a Valid contact",
                        },

                        // {
                        //   min: 3,
                        //   message: "Name must be atleast 3 characters",
                        // },
                        // {
                        //   max: 100,
                        //   message: " Name cannot be longer than 100 characters",
                        // },
                      ]}
                    >
                      <InputType
                        value={vendorcontact}
                        onChange={(e) => {
                          setvendorcontact(e.target.value);
                        }}
                      />
                    </Form.Item>
                
                </div>

               
              </div>
             

              <div className="row jobpay_cards mt-3 mx-0 px-2 py-5">
            <div className="col-12">
              <h5 className="lead_text">Extra Info</h5>
            </div>

            <div className="col-sm-6 pt-2">
                  <label> Address</label>
                  <div>
                    <Form.Item 
                     className="py-1"
                    name="vendoraddress"
                    >
                      <TextArea
                        value={vendoraddress}
                        onChange={(e) => {
                          setvendoraddress(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>


                <div className="col-sm-6 pt-2">
            
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
                </div>

              </div>

          

           

              <div className="col-12 d-flex justify-content-center my-4 gap-3">
             
                  <Button  className="save_button" btnType="save">Save</Button>
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

             <Custom_model
              size={"sm"}
              show={successPopup}
              onHide={() => setSuccessPopup(false)}
              success
            />     
        </div>
       </> 
    )
}
export default Addvendor;