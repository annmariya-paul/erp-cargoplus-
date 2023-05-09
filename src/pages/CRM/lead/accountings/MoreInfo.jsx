import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { useForm } from "react-hook-form";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { Alert, Space } from 'antd';

function Moreinfo({ customerdetails }) {
  const [successPopup, setSuccessPopup] = useState(false);
  const [onecustomerData, setOnecustomerData] = useState();
  const [addForm] = Form.useForm();
  const [allfrights, setallfrights] = useState("");
  const [countries, setCountries] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.CUSTOMER_LIST)
        // navigate(ROUTES.LEADLIST);
      }, time);
    }
  };

  const handlecancel = ()=>{
    navigate(ROUTES.CUSTOMER_LIST);
  }

  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${customerdetails?.customer_id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Unique Lead Id data", res?.data?.data);
          setOnecustomerData(res?.data?.data);

          addForm.setFieldsValue({
            customer_accounting_freighttype:
              res?.data?.data?.customer_preferred_freight_type,
            customer_accounting_qtnvalidity_days:
              res?.data?.data?.customer_qtn_validity_days,
          });
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  const createCustomermoreinfo = (data) => {
    const formData = new FormData();
    formData.append(`customer_name`, onecustomerData?.customer_name);
    formData.append(`customer_type`, onecustomerData?.customer_type);
    formData.append(`customer_phone`, onecustomerData?.customer_phone);
    formData.append(`customer_email`, onecustomerData?.customer_email);


    onecustomerData?.customer_address &&  formData.append(`customer_address`, onecustomerData?.customer_address);
    onecustomerData?.customer_website && formData.append(`customer_website`, onecustomerData?.customer_website);
    onecustomerData?.customer_country &&  formData.append(`customer_country`, onecustomerData?.customer_country);
    
    onecustomerData?.customer_remarks && formData.append(`customer_remarks`, onecustomerData?.customer_remarks);
   
    onecustomerData?.customer_state && formData.append(`customer_state`, onecustomerData?.customer_state);
    onecustomerData?.customer_city && formData.append(`customer_city`, onecustomerData?.customer_city);

    onecustomerData?.customer_tax_no && formData.append(`customer_tax_no`, onecustomerData?.customer_tax_no);
    onecustomerData?.customer_credit_days && formData.append(`customer_credit_days`,onecustomerData?.customer_credit_days);
    onecustomerData?.customer_credit_limit && formData.append(`customer_credit_limit`,onecustomerData?.customer_credit_limit);

    data.customer_accounting_freighttype && formData.append(
      `customer_preferred_freight_type`,
      data.customer_accounting_freighttype
    );
    data.customer_accounting_qtnvalidity_days && formData.append(
      `customer_qtn_validity_days`,
      data.customer_accounting_qtnvalidity_days
    );

    console.log("customerr accountinggs", data);
    // if (leadimg) {
    //   formData.append(`customer_logo`, leadimg);
    // }

    let tmp=false
if(data?.customer_accounting_freighttype|| data?.customer_accounting_qtnvalidity_days ){
  tmp=true
}
if(tmp === true){


    if (onecustomerData) {
      PublicFetch.patch(
        `${CRM_BASE_URL}/customer/${customerdetails?.customer_id}`,
        formData,
        {
          "Content-Type": "Multipart/form-Data",
        }
      )
        .then((res) => {
          console.log("data addedsuccessfully", res);
          if (res.data.success) {
            GetLeadData();
            setSuccessPopup(true);
            close_modal(modalShow, 1000, res?.data?.data);
            // setModalContact(false);
          }
         
        })

        .catch((err) => {
          console.log("Error", err);
        
        });
    } else {
      PublicFetch.post(`${CRM_BASE_URL}/customer`, formData, {
        "Content-Type": "Multipart/form-Data",
      })
        .then((res) => {
          console.log("data addedsuccessfully", res);
          if (res.data.success) {
            GetLeadData();
            setSuccessPopup(true);
            close_modal(modalShow, 1000, res?.data?.data);
            // setModalContact(false);
          }
          
        })

        .catch((err) => {
          console.log("Error", err);
          setError(true)
        });
    }

  }
  else{
    setError(true)
  }
  };

  useEffect(() => {
    if (customerdetails?.customer_id) {
      GetLeadData();
    }

    getallfright();
    getAllCountries();
  }, [customerdetails?.customer_id]);
  //  console.log("customerr acctingg",customerdetails)


  return (
    <>
      <Form
        form={addForm}
        onFinish={(values) => {
          console.log("values iss", values);
          createCustomermoreinfo(values);
        }}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <div className="row py-5 ">
          <div className="col-sm-4">
            <label>Preferred Freight Type</label>
            <Form.Item name="customer_accounting_freighttype">
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
          <div className="col-sm-4 ">
            <label>Quotation validity Days</label>
            <Form.Item name="customer_accounting_qtnvalidity_days">
              <InputType />
            </Form.Item>
          </div>

          <div className=" pt-4 d-flex justify-content-center">
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
            <Button type="submit" className="qtn_save" btnType="cancel" 
          onClick ={()=>{
            handlecancel()
          }}
            >
              Cancel
            </Button>
          </div>
          <Custom_model
              centered
              size={`sm`}
              success
              show={successPopup}
              onHide={() => setSuccessPopup(false)}
            />
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
  );
}
export default Moreinfo;
