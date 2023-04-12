import React, { useEffect, useState } from "react";
import { Form ,Select} from "antd";
import { useForm } from "react-hook-form";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL, CRM_BASE_URL_FMS } from "../../../../api/bootapi";

function EditMoreinfo( props){
    const [successPopup, setSuccessPopup] = useState(false);
    const [editForm] = Form.useForm();
    const [customeraccid,setcustomeraccid]= useState()
    const [customerTaxno,setcustomerTaxno]= useState()
    const [customerCreditdays,setcustomerCreditdays]= useState()
    const [customerCreditlimit,setcustomerCreditlimit]= useState()

    const [allfrights,setallfrights]= useState("")

    const close_modal = (mShow, time) => {
      if (!mShow) {
        setTimeout(() => {
          setSuccessPopup(false);
          // navigate(ROUTES.LEADLIST);
        }, time);
      }
    };


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

    const GetLeadData = () => {
      PublicFetch.get(`${CRM_BASE_URL}/customer/${props.customerId}`)
        .then((res) => {
          if (res?.data?.success) {
            console.log("customer details", res?.data?.data);
            setcustomeraccid(res?.data?.data.crm_v1_customer_accounting?.customer_accounting_id)
         
          } else {
            console.log("FAILED T LOAD DATA");
          }
        })
        .catch((err) => {
          console.log("Errror while getting data", err);
        });
    };

    const getonecustomeraccounting = async()=>{
      try{
       const customeraccounting = await PublicFetch.get(
       `${CRM_BASE_URL}/customer-accounting/${customeraccid}`
       )
      console.log("moreinfo datata",customeraccounting)
      setcustomerTaxno(customeraccounting?.data?.data?.customer_accounting_tax_no)
      setcustomerCreditdays(customeraccounting?.data?.data?.customer_accounting_credit_days)
      setcustomerCreditlimit(customeraccounting?.data?.data?.customer_accounting_credit_limit)
      editForm.setFieldsValue({
        customer_accounting_frieghttype: customeraccounting?.data?.data?.customer_accounting_preferred_freight_type,
        customer_accounting_qtnvalidity_days: customeraccounting?.data?.data?.customer_accounting_qtn_validity_days,
      //  customer_accounting_credit_limit: customeraccounting?.data?.data?.customer_accounting_credit_limit,
      
     });
      }
      catch (err) {
       console.log("Error in fetching customeraccounting : ", err);
     }
   
     }

console.log("editting",customeraccid)

    useEffect(() => {
      
      GetLeadData()
      getallfright()
      getonecustomeraccounting()
    
    }, [props.customerId]);


    const OnSubmit = (value) => {
      const data = {
        customer_accounting_tax_no: customerTaxno,
        customer_accounting_customer_id:parseInt(props?.customerId),
        customer_accounting_credit_days: customerCreditdays,
        customer_accounting_preferred_freight_type:value.customer_accounting_frieghttype,
        customer_accounting_qtn_validity_days:value.customer_accounting_qtnvalidity_days,
        customer_accounting_credit_limit: customerCreditlimit,
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

    return(
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
        <div className="row py-5 ">
          <div className="col-sm-4">
            <label>Preferred Freight Type</label>
            <Form.Item name="customer_accounting_frieghttype">
              
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
            <label>Qtn validity Days</label>
            <Form.Item 
            name="customer_accounting_qtnvalidity_days"
           
            >
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
        </>
    )
}
export default EditMoreinfo;