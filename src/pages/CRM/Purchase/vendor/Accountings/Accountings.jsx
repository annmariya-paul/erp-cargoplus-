import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { useForm } from "react-hook-form";
import InputType from "../../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../../components/Select Box/SelectBox";
import Custom_model from "../../../../../components/custom_modal/custom_model";
import Button from "../../../../../components/button/button";
import PublicFetch from "../../../../../utils/PublicFetch";
import { CRM_BASE_URL_PURCHASING } from "../../../../../api/bootapi";
import { Alert, Space } from 'antd';
function Accounting({vendor}){
    const [successPopup, setSuccessPopup] = useState(false);
    const [editForm] = Form.useForm();

    const [vendorId, setvendorId] = useState();
  const [onevendordata,setonevendordata] = useState()
  const [error, setError] = useState(false);

    const Getvendordata = () => {
      PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/${vendor?.vendor_id}`)
        .then((res) => {
          if (res?.data?.success) {
            console.log("vendor id", res?.data?.data);
            setonevendordata(res?.data?.data)
            // setOneLeadData(res?.data?.data);
            setvendorId(res?.data?.data?.vendor_id);
             editForm.setFieldsValue({
              vendortaxno:res.data.data.vendor_tax_no,
              vendorcreditdays:res.data.data.vendor_credit_days
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

      vendor?.vendor_country_id && formData.append(`country_id`, vendor?.vendor_country_id);
      vendor?.vendor_city &&  formData.append(`city`, vendor?.vendor_city);
      vendor?.vendor_website && formData.append(`website`, vendor?.vendor_website);
      vendor?.vendor_state && formData.append(`state`, vendor?.vendor_state);
      vendor?.vendor_address && formData.append(`address`, vendor?.vendor_address);



      // formData.append(`country_id`, vendor.vendor_country_id);
      // formData.append(`city`, vendor.vendor_city);
      // formData.append(`website`, vendor.vendor_website);
      // formData.append(`state`, vendor.vendor_state);
      // formData.append(`address`, vendor.vendor_address);
     formData.append(`tax_no`, data.vendortaxno);
     formData.append(`credit_days`, data.vendorcreditdays);
      formData.append(`remarks`, vendor.remarks);
     
      if (data.vendor_attachments) {
        formData.append(`attachments`, data.vendor_attachments);
        // formData.append(`customer_logo`, leadimg);
      }
  
      if (onevendordata) {

        PublicFetch.patch(`${CRM_BASE_URL_PURCHASING}/vendors/${vendor?.vendor_id}`, formData, {
          "Content-Type": "Multipart/form-Data",
        })
          .then((res) => {
            console.log("successfully updated", res);
            if (res.data.success) {
            
             Getvendordata()
              setSuccessPopup(true);
              close_modal(successPopup, 1000,res?.data?.data);
               
            }
            // else{
            //   setError(true)
            // }
          })
          .catch((err) => {
            console.log("Error", err);
            setError(true)
          });
      }
      else{
        PublicFetch.post(`${CRM_BASE_URL_PURCHASING}/vendors`, formData, {
          "Content-Type": "Multipart/form-Data",
        })
          .then((res) => {
            console.log("successfully addedd", res);
            if (res.data.success) {
              setError(false)
             Getvendordata()
              setSuccessPopup(true);
              close_modal(successPopup, 1000,res?.data?.data);
    
            }
            // else{
            //   setError(true)
            // }
          })
          .catch((err) => {
            console.log("Error", err);
            setError(true);
          });

      }

      

     
    };



    const close_modal = (mShow, time ) => {
      if (!mShow) {
        setTimeout(() => {
          setSuccessPopup(false);
          setError(false)
          // setTimeOuts(true);
          // console.log("ediittt",venderdata)
          // setVendorId(venderdata);
        }, time);
      }
    };

    useEffect(() => {
      if (vendor?.vendor_id) {
        // getallvendorbankdetails();
        Getvendordata()
      }
    }, [vendorId, vendor?.vendor_id]);
    console.log("accountttvendeor id iss",vendor?.vendor_id)

    return(
        <>

       <Form
        form={editForm}
        onFinish={(values) => {
          console.log("values iss", values);
          submitForm(values)
        }}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <div className="row py-1 px-1">
          <div className="col-sm-4">
            <label>Tax No</label>
            <Form.Item name="vendortaxno">
              
              <InputType  onChange={()=>{ setError(false)}}/>
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <label>Credit Days</label>
            <Form.Item name="vendorcreditdays">
            <InputType />
            </Form.Item>
          </div>
         
          

        

          <div className=" pt-4">
            {/* <Button
              btntype="submit"
              className="btn_save"
              // onClick={() => setModalShow(true)}
            >
              Save
            </Button> */}
          
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
      <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    {error ?  <Alert
      message="Error"
      description="Please enter atleast one data."
      type="error"
      showIcon

    /> :"" }
   
  </Space>
        </>
    )
}
export default Accounting;