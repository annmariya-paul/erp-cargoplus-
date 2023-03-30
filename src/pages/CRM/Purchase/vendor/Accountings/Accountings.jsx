import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { useForm } from "react-hook-form";
import InputType from "../../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../../components/Select Box/SelectBox";
import Custom_model from "../../../../../components/custom_modal/custom_model";
import Button from "../../../../../components/button/button";
function Accounting(){
    const [successPopup, setSuccessPopup] = useState(false);
    const [addForm] = Form.useForm();
    return(
        <>

       <Form
        form={addForm}
        onFinish={(values) => {
          console.log("values iss", values);
        //   OnSubmit(values);
        }}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <div className="row py-5 px-1">
          <div className="col-sm-4">
            <label>Tax No</label>
            <Form.Item name="customer_accounting_tax_no">
              
              <InputType />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <label>Credit Days</label>
            <Form.Item name="customer_accounting_credit_days">
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
export default Accounting;