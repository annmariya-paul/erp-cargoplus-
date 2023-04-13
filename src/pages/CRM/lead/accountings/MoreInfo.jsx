import React, { useEffect, useState } from "react";
import { Form ,Select} from "antd";
import { useForm } from "react-hook-form";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";

function Moreinfo(){
    const [successPopup, setSuccessPopup] = useState(false);
    const [addForm] = Form.useForm();
    const [allfrights,setallfrights]= useState("")

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

    useEffect(() => {
      
      // getAllincoterm()
      getallfright()
    
    }, []);

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
        <div className="row py-5 ">
          <div className="col-sm-4">
            <label>Preferred Freight Type</label>
            <Form.Item name="customer_accounting_tax_no">
              
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
            name="customer_accounting_credit_days"
           
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
export default Moreinfo;