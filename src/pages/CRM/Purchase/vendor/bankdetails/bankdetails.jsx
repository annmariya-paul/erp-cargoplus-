import React, { useEffect, useState } from "react";
import { Checkbox, Form } from "antd";
import { useForm } from "react-hook-form";
import InputType from "../../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../../components/Select Box/SelectBox";
import Custom_model from "../../../../../components/custom_modal/custom_model";
import Button from "../../../../../components/button/button";
import TableData from "../../../../../components/table/table_data";
import { AiOutlinePlus } from "react-icons/ai";
function Bankdetails(){
    const [successPopup, setSuccessPopup] = useState(false);
    const [addForm] = Form.useForm();
    const [serialNo, setserialNo] = useState(1);
    const [modalShow, setModalShow] = useState(false);

    const columns = [
      {
        title: "Sl. No.",
        key: "index",
        render: (value, item, index) => serialNo + index,
        align: "center",
      },
      {
        title: " ACCOUNT NAME",
        dataIndex: "contact_person_name",
        key: "contact_email",
      },
      {
        title: "ACCOUNT NO",
        dataIndex: "contact_email",
        key: "contact_email",
      },
      {
        title: "BANK NAME",
        dataIndex: "contact_phone_1",
        key: "contact_phone_1",
      },
      {
        title: "IBAN NO",
        dataIndex: "contact_phone_2",
        key: "contact_phone_2",
      },
     
    ];


    return(
        <>
 <div className="row">
        <div className="col-12">
          <Button btnType="add" onClick={() => setModalShow(true)}>
            New Bank Details <AiOutlinePlus />
          </Button>
        </div>
      </div>
      <div className="datatable">
        <TableData
          // data={contactTable}
          columns={columns}
          custom_table_css="contact_table"
        />
      </div>

<Custom_model
 bodyStyle={{ height: 580, overflowY: "auto" }}
 show={modalShow}
 onHide={() => setModalShow(false)}
 View_list
 footer={false}
//  {...props}
 list_content={
  <>
  <div className="row ">
              <h5 className="lead_text">New Bank Details </h5>
            </div>
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
          <div className="col-sm-6 pb-2 ">
            <label>Account Name</label>
            <Form.Item name="customer_accounting_tax_no">
              
              <InputType />
            </Form.Item>
          </div>
          <div className="col-sm-6 pb-2">
            <label>Account No</label>
            <Form.Item name="customer_accounting_credit_days">
            <InputType />
            </Form.Item>
          </div>
          <div className="col-sm-6 pb-2  mt-2">
            <label>Bank Name</label>
            <Form.Item name="customer_accounting_credit_limit">
            <InputType />
            </Form.Item>
          </div>
          

          <div className="col-sm-6 pb-2 mt-2">
            <label>Branch Name</label>
            <Form.Item name="customer_accounting_qtn_validity_days">
               <InputType />
            </Form.Item>
          </div>
          <div className="col-sm-6 pb-2 mt-2">
            <label>IBAN No</label>
            <Form.Item name="customer_accounting_qtn_validity_days">
               <InputType />
            </Form.Item>
          </div>
          <div className="col-6 pt-2 pb-2 mt-2">
                      <label>Default Bank</label>
                      <div>
                        <Form.Item
                          name="editdefaultbnk"
                        
                        >
                         
                          <Checkbox
                            // value={currencyDefault}
                            // onChange={handleCheckededit}
                            // checked={editdefaultbank == 1 ? true : false}
                          ></Checkbox>
                        </Form.Item>
                      </div>
                    </div>

          <div className=" pt-4 d-flex justify-content-center">
          
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
 }
/>

      
        </>
    )
}
export default Bankdetails;