import React, { useEffect, useState } from "react";
import { Form,Select } from "antd";
import { useForm } from "react-hook-form";
import InputType from "../../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../../components/Select Box/SelectBox";
import Custom_model from "../../../../../components/custom_modal/custom_model";
import Button from "../../../../../components/button/button";
import PublicFetch from "../../../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS, CRM_BASE_URL_PURCHASING } from "../../../../../api/bootapi";
function Moreinfo({vendor}){
    const [successPopup, setSuccessPopup] = useState(false);
    const [addForm] = Form.useForm();
    const[allincoterms,setallincoterms]= useState("")
    const [allfrights,setallfrights]= useState("")

    const [vendorId, setvendorId] = useState();
// 
    const getallfright = async () => {
      try {
        const allfright = await PublicFetch.get(
          `${CRM_BASE_URL_FMS}/freightTypes`
        );
        console.log("all frights are", allfright.data.data);
        setallfrights(allfright.data.data);
       
      } catch (err) {
        console.log("error while getting the frights: ", err);
      }
    };


    const getAllincoterm = async () => {
      try {
        const allCountries = await PublicFetch.get(
          `${CRM_BASE_URL_FMS}/incoterms/minimal`
        );
        console.log("all incotermss", allCountries.data.data);
        setallincoterms(allCountries.data.data);
        // setGetCountries(allCountries.data.data);
      } catch (err) {
        console.log("error while getting the countries: ", err);
      }
    };

    const Getvendordata = () => {
      PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/${vendor?.vendor_id}`)
        .then((res) => {
          if (res?.data?.success) {
            console.log("vendor id", res?.data?.data);
            // setOneLeadData(res?.data?.data);
            setvendorId(res?.data?.data?.vendor_id);
           addForm.setFieldsValue({
            vendor_freighttype:res.data.data.crm_v1_vendor_freight_types?.ven_frt_type_id,
            vendorincoterms:res.data.data.crm_v1_vendor_incoterms?.ven_incoterm_id
           })

          } else {
            console.log("FAILED TO LOAD DATA");
          }
        })
        .catch((err) => {
          console.log("Error while getting data", err);
        });
    };

    const submitForm = (data) => {
      const formData = new FormData();
      formData.append(`name`, vendor.vendor_name);
      formData.append(`org_type`, vendor.vendor_org_type);
      formData.append(`vendor_type`, vendor.vendor_type_id);
      formData.append(`email`, vendor.vendor_email);
      formData.append(`contact`, vendor.vendor_phone);
      formData.append(`country_id`, vendor.vendor_country_id);
      formData.append(`city`, vendor.vendor_city);
      formData.append(`website`, vendor.vendor_website);
      formData.append(`state`, vendor.vendor_state);
      formData.append(`address`, vendor.vendor_address);
      // formData.append(`tax_no`, data.vendortaxno);
      // formData.append(`credit_days`, data.vendorcreditdays);
      formData.append(`freight_type`, data.vendor_freighttype);
      formData.append(`incoterm`, data.vendorincoterms);
      formData.append(`remarks`, vendor.remarks);
     
      if (data.vendor_attachments) {
        formData.append(`attachments`, data.vendor_attachments);
        // formData.append(`customer_logo`, leadimg);
      }
  
      PublicFetch.patch(`${CRM_BASE_URL_PURCHASING}/vendors/${vendor?.vendor_id}`, formData, {
        "Content-Type": "Multipart/form-Data",
      })
        .then((res) => {
          console.log("successfully updated vendor moreinfo", res);
          if (res.data.success) {

            setSuccessPopup(true);
            // addForm.resetFields();
            close_modal(successPopup, 1000);
  
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
        }, time);
      }
    };
  

    useEffect(() => {
      if (vendor?.vendor_id) {
        // getallvendorbankdetails();
        Getvendordata()
      }
      getAllincoterm()
      getallfright()
    
    }, [vendorId, vendor?.vendor_id]);

    return(
        <>

       <Form
        form={addForm}
        onFinish={(values) => {
          console.log("values iss", values);
          submitForm(values)
        }}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <div className="row py-5 px-1">
          <div className="col-sm-6">
            <label>Preferred Freight Typesss </label>
            <Form.Item name="vendor_freighttype">
              
            <SelectBox
                        // value={defaultincoterm}
                        onChange={(e) => {
                          console.log("select the brandss", e);
                          // setdefaultincoterm(parseInt(e));
                        }}
                      >
                        {allfrights &&
                          allfrights.length > 0 &&
                          allfrights.map((item, index) => {
                            console.log("fright", item);
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
          <div className="col-sm-6 ">
            <label>Incoterms</label>
            <Form.Item 
            
            name="vendorincoterms">
          <SelectBox
                        // value={defaultincoterm}
                        onChange={(e) => {
                          console.log("select the brandss", e);
                          // setdefaultincoterm(parseInt(e));
                        }}
                      >
                        {allincoterms &&
                          allincoterms.length > 0 &&
                          allincoterms.map((item, index) => {
                            console.log("njd", item);
                            return (
                              <Select.Option
                                key={item.incoterm_id}
                                value={item.incoterm_id}
                              >
                                {item.incoterm_full_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
            </Form.Item>
          </div>
         
      

          <div className=" pt-4">
          
          
            <Button type="submit" className="qtn_save" btnType="save">
              Save
            </Button>
            <Custom_model
              centered
              size={`sm`}
              success
              show={successPopup}
              onHide={() => setSuccessPopup(false)}
            />
          </div>
        </div>
      </Form>
        </>
    )
}
export default Moreinfo;