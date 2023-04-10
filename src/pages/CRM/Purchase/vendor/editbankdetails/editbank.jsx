import React, { useEffect, useState } from "react";
import { Checkbox, Form } from "antd";
import { useForm } from "react-hook-form";
import InputType from "../../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../../components/Select Box/SelectBox";
import Custom_model from "../../../../../components/custom_modal/custom_model";
import Button from "../../../../../components/button/button";
import TableData from "../../../../../components/table/table_data";
import { AiOutlinePlus } from "react-icons/ai";
import { CRM_BASE_URL_PURCHASING } from "../../../../../api/bootapi";
import PublicFetch from "../../../../../utils/PublicFetch";
function EditBank( vendor ){
    const [successPopup, setSuccessPopup] = useState(false);
    const [addForm] = Form.useForm();
    const [serialNo, setserialNo] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [vendorId, setvendorId] = useState();


    const Getvendordata = () => {
      PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/${vendor?.vendor_id}`)
        .then((res) => {
          if (res?.data?.success) {
            console.log("Unique Lead Id", res?.data?.data);
            // setOneLeadData(res?.data?.data);
            setvendorId(res?.data?.data?.vendor_id);
          } else {
            console.log("FAILED TO LOAD DATA");
          }
        })
        .catch((err) => {
          console.log("Error while getting data", err);
        });
    };
  

    const getvendorbankdetails = async () => {
      try {
        const allvendortypes = await PublicFetch.get(
          `${process.env.REACT_APP_BASE_URL}/crm/purchase/v1/vendor-bank-details`
        );
        console.log("getting all  vendorbankdetails", allvendortypes);
        // setvendortypes(allvendortypes.data.data);
      } catch (err) {
        console.log("error to fetching  vendorbankdetails", err);
      }
    };

    const  createvendorbankdetails = async (data) => {
      try {
        const addvendorbnkdetails = await PublicFetch.post(
          `${process.env.REACT_APP_BASE_URL}/crm/purchase/v1/vendor-bank-details`,
          {
            ven_bank_det_account_name:data.vend_accname,
            ven_bank_det_account_no: data.vend_accno,
            ven_bank_det_bank: data.vend_bankname,
            ven_bank_det_IBAN: data.vend_ibanno,
            ven_bank_det_branch: data.vend_branchname,
            ven_bank_det_default: data.vend_defaultbnk,
            ven_bank_det_vendor_id: vendor?.vendor_id,
          }
        );
        console.log("successfully add vendorbankdetails", addvendorbnkdetails);
        // setvendortypes(allvendortypes.data.data);
      } catch (err) {
        console.log("error to fetching  vendorbankdetails", err);
      }
    };

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


  
    useEffect(() => {
      getvendorbankdetails()
      if (vendor?.vendor_id) {
        // getallvendorbankdetails();
        Getvendordata()
      }
    }, [vendorId, vendor?.vendor_id]);


console.log("vendorbankk id iss",vendor?.vendor_id)
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
          createvendorbankdetails(values)
        }}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <div className="row py-5 px-1">
          <div className="col-sm-6 pb-2 ">
            <label>Account Name</label>
            <Form.Item name="vend_accname">
              
              <InputType />
            </Form.Item>
          </div>
          <div className="col-sm-6 pb-2">
            <label>Account No</label>
            <Form.Item name="vend_accno">
            <InputType />
            </Form.Item>
          </div>
          <div className="col-sm-6 pb-2  mt-2">
            <label>Bank Name</label>
            <Form.Item name="vend_bankname">
            <InputType />
            </Form.Item>
          </div>
          

          <div className="col-sm-6 pb-2 mt-2">
            <label>Branch Name</label>
            <Form.Item name="vend_branchname">
               <InputType />
            </Form.Item>
          </div>
          <div className="col-sm-6 pb-2 mt-2">
            <label>IBAN No</label>
            <Form.Item name="vend_ibanno">
               <InputType />
            </Form.Item>
          </div>
          <div className="col-6 pt-2 pb-2 mt-2">
                      <label>Default Bank</label>
                      <div>
                        <Form.Item
                          name="vend_defaultbnk"
                        
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
export default EditBank;