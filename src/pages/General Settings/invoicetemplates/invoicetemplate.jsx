import { Form, Select, Input } from "antd";
import { useEffect, useState } from "react";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputType from "../../../components/Input Type textbox/InputType";
function Invoicetemplateselect(){
    const [addform] = Form.useForm();

    return(
        <>
           <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <div>
              <h5 className="modal-title w-100">New FMS settings</h5>
            </div>

            <Form
              name="addForm"
                form={addform}
              onFinish={(data) => {
                // console.log("val", data);
                // createfmssettings()
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-4">
                <div className="col-6">
                  <label>Default Incoterm</label>
                  <Form.Item 
                  name="incoterm"
                  >
                  <SelectBox
                 
                  >
                      

                  </SelectBox>
                    
                  </Form.Item>
                </div>
               
                <div className="col-6">
                  <label>Quotation Validity</label>
                  <Form.Item name="qtnvalidity" className="">
                  <InputType
                     
                    />
                  </Form.Item>
                </div>
                
              </div>
              <div className="col-12 d-flex justify-content-center mt-5 pt-4 gap-3 ">
                  <Button className="save_button">Save</Button>{" "}
                 
                </div>
            </Form>
          </div>
        </div>
      </div>

        </>
    )
}
export default Invoicetemplateselect;