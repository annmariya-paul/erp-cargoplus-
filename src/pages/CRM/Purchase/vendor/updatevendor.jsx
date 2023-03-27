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
import { useNavigate, useParams, Link } from "react-router-dom";
import Custom_model from "../../../../components/custom_modal/custom_model";

import {
  CRM_BASE_URL_PURCHASING,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import { vendor_Organisation } from "../../../../utils/SelectOptions";

function Updatevendor(){
    const { id } = useParams();
    console.log("Response", id);
    const [addForm] = Form.useForm();
    const [error, setError] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [searchedText, setSearchedText] = useState("");
    const [modalvendor, setModalvendor] = useState(false);
    const [pageSize, setPageSize] = useState("25");
    const [current, setCurrent] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false);
  
    const [allvendor, setAllvendor] = useState("");
    const [allCountries, setAllCountries] = useState("");
    const [vendorEditPopup, setVendorEditPopup] = useState(false);
    const [editForm] = Form.useForm();
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
    const navigate = useNavigate();
    const [editvendorname, seteditvendorname] = useState("");
    const [editvendorOrganisation, seteditvendorOrganisation] = useState("");
    const [editvendoremail, seteditvendoremail] = useState("");
    const [editvendorcontact, seteditvendorcontact] = useState("");
    const [editvendorcity, seteditvendorcity] = useState("");
    const [editvendoraddress, seteditvendoraddress] = useState("");
    const [editvendortyp, seteditvendortyp] = useState("");
    const [editvendortaxno, seteditvendortaxno] = useState("");
    const [editvendordescription, seteditvendordescription] = useState("");
    const [editcountry, seteditcountry] = useState("");
    const [editvendorid, seteditvendorid] = useState("");
    const [totalvendor,settotalvendor] =useState("")
    const [vendor_org,setvendor_org]= useState(vendor_Organisation );
    const [serialNo, setserialNo] = useState(1);
    const [viewvendor, setViewvendor] = useState({
      id: "",
      vendor_name: "",
      vendor_organisation: "",
      vendor_type: "",
      vendor_email: "",
      vendor_contact: "",
      vendor_country: "",
      vendor_city: "",
      vendor_taxno: "",
      vendor_address: "",
      vendor_description: "",
      vendor_country_id: "",
    });
  
    const handleViewClick = (item) => {
      console.log("view a vendor", item);
      setViewvendor({
        ...viewvendor,
        id: item.vender_id,
        vendor_name: item.vendor_name,
        vendor_email: item.vendor_email,
        vendor_contact: item.vendor_contact,
        vendor_city: item.vendor_city,
        vendor_country: item.vendor_country,
        vendor_organisation: item.vendor_org_type,
        vendor_type: item.vendor_type_id,
        vendor_description: item.vendor_description,
        vendor_taxno: item.vender_taxno,
        vendor_address: item.vendor_address,
        vendor_country_id: item.vendor_country_id,
      });
      setShowViewModal(true);
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
  
    const handleEditclick = (e) => {
      console.log("editing id iss", e);
      seteditvendorid(e.vender_id);
      seteditvendorname(e.vendor_name);
      seteditvendoremail(e.vendor_email);
      seteditvendorcity(e.vendor_city);
      seteditvendoraddress(e.vendor_address);
      seteditvendorcontact(e.vendor_contact);
      seteditvendordescription(e.vendor_description);
      seteditvendortaxno(e.vender_taxno);
  
      seteditvendorOrganisation(e.vendor_org_type);
      seteditcountry(e.vendor_country_id);
      seteditvendortyp(e.vendor_type_id);
  
      editForm.setFieldsValue({
        vendor_name: e.vendor_name,
        vendor_Organisation: e.vendor_org_type,
        vendor_email: e.vendor_email,
        vendor_contact: e.vendor_contact,
        vendor_city: e.vendor_city,
        vendor_taxno: e.vender_taxno,
        vendor_address: e.vendor_address,
        vendor_description: e.vendor_description,
  
        vendor_country: e.vendor_country_id,
        vendor_type: e.vendor_type_id,
  
        // vendortypename: e.vendor_type_name,
        // vendortypedesc: e.vendor_type_desc,
      });
      setVendorEditPopup(true);
    };
  
    const handleviewtoedit = (e) => {
      console.log("editing view to edit", e);
      seteditvendorid(e.id);
      seteditvendorname(e.vendor_name);
      seteditvendoremail(e.vendor_email);
      seteditvendorcity(e.vendor_city);
      seteditvendoraddress(e.vendor_address);
      seteditvendorcontact(e.vendor_contact);
      seteditvendordescription(e.vendor_description);
      seteditvendortaxno(e.vendor_taxno);
  
      seteditvendorOrganisation(e.vendor_organisation);
      seteditcountry(e.vendor_country_id);
      seteditvendortyp(e.vendor_type);
  
      editForm.setFieldsValue({
        vendor_name: e.vendor_name,
        vendor_Organisation: e.vendor_organisation,
        vendor_email: e.vendor_email,
        vendor_contact: e.vendor_contact,
        vendor_city: e.vendor_city,
        vendor_taxno: e.vendor_taxno,
        vendor_address: e.vendor_address,
        vendor_description: e.vendor_description,
  
        vendor_country: e.vendor_country_id,
        vendor_type: e.vendor_type,
      });
      setVendorEditPopup(true);
    };
  
    const submitForm = async (data) => {
      try {
        const updated = await PublicFetch.patch(
          `${CRM_BASE_URL_PURCHASING}/vendors/${id}`,
          {
            name: data.vendor_name,
            org_type: data.vendor_Organisation,
            vendor_type: data.vendor_type,
            email: data.vendor_email,
            contact: data.vendor_contact,
            country_id: data.vendor_country,
            city: data.vendor_city,
            address: data.vendor_address,
            desc: data.vendor_description,
            tax_no: data.vender_taxno,
          }
        );
        console.log("successfully updated ", updated);
        if (updated.data.success) {
          setSuccessPopup(true);
       
          getallvendors();
          close_modal(successPopup, 1000);
         
        }
      } catch (err) {
        console.log("error to update vendor");
      }
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
    const [vendorList, setVendorList] = useState();
    const getData = (current, pageSize) => {
      return allvendor?.slice((current - 1) * pageSize, current * pageSize);
    };
    const Onevendor = () => {
        PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/${id}`)
          .then((res) => {
            console.log("response", res);
            if (res.data.success) {
              console.log("success of vendors", res.data.data);
              setVendorList(res.data.data);
              editForm.setFieldsValue({
                vendor_name: res.data.data.vendor_name,
                vendor_Organisation: res.data.data.vendor_org_type,
                vendor_email: res.data.data.vendor_email,
                vendor_contact: res.data.data.vendor_contact,
                vendor_city: res.data.data.vendor_city,
                vendor_taxno: res.data.data.vendor_tax_no,
                vendor_address: res.data.data.vendor_address,
                vendor_description: res.data.data.vendor_desc,
          
                vendor_country: res.data.data.vendor_country_id,
                vendor_type: res.data.data.vendor_type_id,
              });
           
           
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
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
  
    const close_modal = (mShow, time) => {
      if (!mShow) {
        setTimeout(() => {
          setSuccessPopup(false);
          navigate(`${ROUTES.VENDOR}`);
        }, time);
      }
    };
  
 
    useEffect(() => {
      getallvendortype();
      getallvendors();
      getCountry();
      Onevendor();
    }, []);





    return(
        <>


<div className="container-fluid ">
        <Form
          form={editForm}
          onFinish={(values) => {
            console.log("values iss", values);
            // handleupdate()
            submitForm(values);    
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >


<div className="row px-1 ">
            <h5 className="lead_text">Update Vendor</h5>
          </div>
          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Basic Info</h5>
            </div>

            <div className="col-sm-4 pt-2 ">
              <label> Name<span className="required">*</span></label>
              
                <Form.Item
                  name="vendor_name"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("^[A-Za-z ]+$"),
                      message: "Please enter a Valid vendor Name",
                    },

                   
                  ]}
                  // onChange={(e) => setFrighttypename(e.target.value)}
                >
                  <InputType
                    value={editvendorname}
                    onChange={(e) => {
                      seteditvendorname(e.target.value);
                    }}
                  />
                </Form.Item>
              
            </div>

            <div className="col-sm-4 pt-2 ">
              <label> Organisation Type<span className="required">*</span></label>
              
                <Form.Item
                  name="vendor_Organisation"
                  rules={[
                    {
                      required: true,
                      // pattern: new RegExp("^[A-Za-z ]+$"),
                      message: "Please enter a Valid organisation",
                    },

                  
                  ]}
                >
                  <SelectBox
                    value={editvendorOrganisation}
                    onChange={(e) => {
                      seteditvendorOrganisation(e);
                      // setOrganizationDisable(e);
                    }}
                  >
                    <Select.Option value="ORG">
                      Organisation
                    </Select.Option>
                    <Select.Option value="IND">Indivdual</Select.Option>
                  </SelectBox>
                </Form.Item>
              
            </div>

            <div className="col-sm-4 pt-2 ">
              <label>Type<span className="required">*</span></label>
            
                <Form.Item
                  name="vendor_type"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a Valid vendortype",
                    },
                  ]}
                >
                  <SelectBox
                  disabled={true}
                    showSearch={true}
                    allowClear
                    value={editvendortyp}
                    optionFilterProp="children"
                    onChange={(e) => {
                      seteditvendortyp(e);
                    }}
                    // onChange={handleChange}
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

            <div className="col-sm-4 pt-2 ">
              <label>Country<span className="required">*</span></label>
              
                <Form.Item
                  name="vendor_country"
                  rules={[
                    {
                      required: true,
                    
                      message: "Please select a Valid country",
                    },
                  ]}
                >
                  <SelectBox
                    showSearch={true}
                    allowClear
                    // value={countryis}
                    value={editcountry}
                    optionFilterProp="children"
                    // onChange={handleChange}
                    onChange={(e) => {
                      seteditcountry(e);
                    }}
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

            
        
            <div className="col-sm-4 pt-2 ">
              <label>City</label>
              <div>
                <Form.Item
                  name="vendor_city"
                 
                >
                  <InputType
                    value={editvendorcity}
                    onChange={(e) => {
                      seteditvendorcity(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-sm-4 pt-2 ">
              <label>Tax No</label>
              
                <Form.Item
                  name="vendor_taxno"
                  
                >
                  <InputType
                    value={editvendortaxno}
                    onChange={(e) => {
                      seteditvendortaxno(e.target.value);
                    }}
                  />
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
                  name="vendor_email"
                  rules={[
                    {
                      required: true,
                      // pattern: new RegExp("^[A-Za-z ]+$"),
                      message: "Please enter a Valid email",
                    },

                  
                  ]}
               
                >
                  <InputType
                    value={editvendoremail}
                    onChange={(e) => {
                      seteditvendoremail(e.target.value);
                    }}
                  />
                </Form.Item>
              
            </div>

            <div className="col-sm-4 pt-3">
              <label> Contact<span className="required">*</span></label>
              
                <Form.Item
                  name="vendor_contact"
                  rules={[
                    {
                      required: true,
                      // pattern: new RegExp("^[A-Za-z ]+$"),
                      message: "Please enter a Valid contact",
                    },

                    
                  ]}
                >
                  <InputType
                    value={editvendorcontact}
                    onChange={(e) => {
                      seteditvendorcontact(e.target.value);
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
              
                <Form.Item
                  name="vendor_address"
                  className="mt-1"
                >
                  <TextArea
                    value={editvendoraddress}
                    onChange={(e) => {
                      seteditvendoraddress(e.target.value);
                    }}
                  />
                </Form.Item>
              
            </div>
          
            <div className="col-sm-6 pt-2">
              <label> Description</label>
              
                <Form.Item
                  name="vendor_description"
                  className="mt-1"
                >
                  <TextArea
                    value={editvendordescription}
                    onChange={(e) => {
                      seteditvendordescription(e.target.value);
                    }}
                  />
                </Form.Item>
              
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
export default Updatevendor;