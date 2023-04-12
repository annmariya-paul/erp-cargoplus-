import React, { useEffect, useState } from "react";
// import {  Button } from "react-bootstrap";
import Button from "../../../../components/button/button";
import { Form } from "antd";
import { useForm } from "react-hook-form";
import Custom_model from "../../../../components/custom_modal/custom_model";
import axios from "axios";
import PublicFetch from "../../../../utils/PublicFetch";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { Select } from "antd";
import InputType from "../../../../components/Input Type textbox/InputType";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import Input_Number from "../../../../components/InputNumber/InputNumber";

function Editaccounting({customerId}) {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [getCity, setCity] = useState([]);
  const [countries, setCountries] = useState("");
  const [editForm] = Form.useForm();
  const [frighttype, setFrighttype] = useState();
  const [successPopup, setSuccessPopup] = useState(false);

  const [customeraccid,setcustomeraccid]= useState("")
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(ROUTES.LEADLIST);
      }, time);
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

  const getallfrighttype = async () => {
    try {
      const allfrighttypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/freightTypes`
      );
      console.log("Getting all frieght types : ", allfrighttypes.data.data);
      setFrighttype(allfrighttypes.data.data);
      // setFrighttypemode(allfrighttypes.data.data.freight_type_mode);
    } catch (err) {
      console.log("Error in fetching fright types : ", err);
    }
  };
//   console.log("customer id iss", customerId, customer_id);

  

  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/customer/${customerId}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("one customeraccount idd", res?.data?.data.crm_v1_customer_accounting.customer_accounting_id)
          
          setcustomeraccid(res?.data?.data?.crm_v1_customer_accounting?.customer_accounting_id)
        //   setOneLeadData(res?.data?.data);
        //   setLeadType(res?.data?.data?.lead_type);
        //   setCustomerName(res?.data?.data?.customer_name);
        
        //   editForm.setFieldsValue({
        //     customer_type: res?.data?.data?.customer_type,
        //     customer_name: res?.data?.data?.customer_name,
        //     customer_address: res?.data?.data?.customer_address,
        //     customer_phone: res?.data?.data?.customer_phone,
        //     customer_email: res?.data?.data?.customer_email,
        //     customer_website: res?.data?.data?.customer_website,
        //     customer_logo: res?.data?.data?.customer_logo,
        //     customer_remarks: res?.data?.data?.customer_remarks,
        //     customer_country: res?.data?.data?.customer_country,
        //     customer_state: res?.data?.data?.customer_state,
        //     customer_city: res?.data?.data?.customer_city,
        //   });
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };



  const getonecustomeraccounting = async(data)=>{
   try{
    const customeraccounting = await PublicFetch.get(
    `${CRM_BASE_URL}/customer-accounting/2`
    )
   console.log("dataa in",customeraccounting)
   editForm.setFieldsValue({
    customer_accounting_tax_no: customeraccounting?.data?.data?.customer_accounting_tax_no,
    customer_accounting_credit_days: customeraccounting?.data?.data?.customer_accounting_credit_days,
    customer_accounting_credit_limit: customeraccounting?.data?.data?.customer_accounting_credit_limit,
   
  });
   }
   catch (err) {
    console.log("Error in fetching customeraccounting : ", err);
  }

  }


  
  useEffect(() => {
    if (customeraccid) {
        getonecustomeraccounting(customeraccid)
    }
    getallfrighttype();
    getAllCountries();
    GetLeadData()
  }, [customerId,customeraccid]);

  const OnSubmit = (value) => {
    const data = {
      customer_accounting_tax_no: value.customer_accounting_tax_no,
      customer_accounting_customer_id:parseInt(customerId),
      customer_accounting_credit_days: value.customer_accounting_credit_days,
    //   customer_accounting_preferred_freight_type:
    //     value.customer_accounting_preferred_freight_type,
    //   customer_accounting_qtn_validity_days:
    //     value.customer_accounting_qtn_validity_days,
      customer_accounting_credit_limit: value.customer_accounting_credit_limit,
    };
    PublicFetch.patch(`${CRM_BASE_URL}/customer-accounting/${customeraccid}`, data)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setSuccessPopup(true);
          // getallPaymentTerms()
          // close_modal(successPopup, 1200);

        //   editForm.resetFields();
          close_modal(successPopup, 1000);
          // setModalAddPayment(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  console.log("customer id iss", customerId, );
  console.log("custaccountno iss",customeraccid )

  return (
    <>
      <Form
        form={editForm}
        onFinish={(values) => {
          console.log("values iss", values);
          OnSubmit(values);
        }}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <div className="row py-5 px-1">
          <div className="col-sm-4 mt-2">
            <label>Tax No</label>
            <Form.Item name="customer_accounting_tax_no">
              <InputType />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <label>Credit Days</label>
            <Form.Item name="customer_accounting_credit_days">
              <Input_Number />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <label>Credit Limit</label>
            <Form.Item name="customer_accounting_credit_limit">
              <Input_Number />
            </Form.Item>
          </div>
          {/* <div className="col-sm-4">
            <label>Preferred Freight Type</label>
            <Form.Item name="customer_accounting_preferred_freight_type">
              <SelectBox allowClear showSearch optionFilterProp="children">
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
          </div> */}

          {/* <div className="col-sm-4">
            <label>Qtn validity Days</label>
            <Form.Item name="customer_accounting_qtn_validity_days">
              <Input_Number />
            </Form.Item>
          </div> */}

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
    </>
  );
}

export default Editaccounting;
