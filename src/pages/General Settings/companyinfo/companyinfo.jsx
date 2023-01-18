import { Form, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import InputType from "../../../components/Input Type textbox/InputType"
import Button from "../../../components/button/button"
import Custom_model from "../../../components/custom_modal/custom_model";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../components/Select Box/SelectBox";
import FileUpload from "../../../components/fileupload/fileUploader";
import { getData, getNameList } from "country-list";
import Phone_Input from "../../../components/PhoneInput/phoneInput";

function Companyinfo(){
  const [countryis, setCountryis] = useState();
  const options = useMemo(() => getData(), []);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [addForm]=Form.useForm()

    const handleChange = (e) => {
      setCountryis(e);
    };
  
    return (
        <div>
          <div className="">
            <div className="row">
              <div className="col-12">
                <div className="card  border-0 shadow-sm">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <h4 className="">Add CompanyInfo</h4>
                        <div className="">
                          <Form
                          form={addForm}
                          onFinish={(value) => {
                            console.log("the formvaluess iss", value);
                            // submitaddunit();
                          }}
                          onFinishFailed={(error) => {
                            console.log(error);
                          }}
                          >
                            <div className="row">
                              <div className="col-xl-6 col-lg-6  col-12">
                                <div className="">
                                  <label>Company Name</label>
                                  <Form.Item
                                name="companyname"
                                rules={[
                                  {
                                    required: true,
                                    message: "Company Name is Required",
                                  },
                                ]}
                              >
                                <InputType/>
                                
                              </Form.Item>
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6  col-12">
                                <div className="">
                                  <label>Address</label>
                                  <Form.Item
                                name="address"
                                rules={[
                                  {
                                    required: true,
                                    message: "Address is Required",
                                  },
                                ]}
                              >
                                <TextArea/>
                                
                              </Form.Item>
                                </div>
                              </div>
                              </div>

                              <div className="row mt-2">
                              <div className="col-xl-6 col-lg-6  col-12">
                                <div className="">
                                  <label>Email</label>
                                  <Form.Item
                                name="companyemail"
                                rules={[
                                  {
                                    required: true,
                                    message: "Email is Required",
                                  },
                                ]}
                              >
                                <InputType/>
                                
                              </Form.Item>
                                </div>
                              </div>
                              <div className=" col-sm-6">
                                <div>
                                  <label>Phone</label>
                                  <Form.Item
                                  className="mt-2"
                              >
                               <Phone_Input
                               
                               />
                                
                              </Form.Item>
                                </div>
                              </div>
                              </div>
                              <div className="row mt-2">
                              <div className="col-xl-6 col-lg-6 col-12">
                                <div className="">
                                  <label>Country</label>
                                  <Form.Item>
                                <SelectBox
                                  value={countryis}
                                  onChange={handleChange}
                                >
                                  {options.map((item, index) => {
                                    return (
                                      <Select.Option
                                        key={item.code}
                                        value={item.name}
                                      >
                                        {item.name}
                                      </Select.Option>
                                    );
                                  })}
                                </SelectBox>
                              </Form.Item>
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6 col-12">
                                <div className="">
                                  <label>ZipCode</label>
                                  <Form.Item
                                name="zipcode"
                                rules={[
                                  {
                                    required: true,
                                    message: "zipcode is Required",
                                  },
                                ]}
                              >
                                <InputType/>
                                
                              </Form.Item>
                                </div>
                              </div>
                              </div>
                              <div className="row">
                               <div className="col-xl-6 col-lg-6  col-12">
                               <div className="">
                                <label>Logo</label>
                                <FileUpload/>
                                </div>
                               </div>
                               <div className="col-xl-6 col-lg-6 col-12">
                              <div className="">
                              <label>Water Mark</label>
                               <FileUpload/>
                              </div>
                               </div>
                              </div>

                              <div className="col-12 mt-2 py-3">
                                <div className="d-flex justify-content-center">
                                 
                                  <Button
                                    type="submit"
                                    className="p-2 save_button_style"
                                  >
                                    Save
                                  </Button>
                                </div>
                              </div>
                           
                          </Form>
                      
                          
                          <Custom_model
                          size={"sm"}
                          show={saveSuccess}
                          onHide={() => setSaveSuccess(false)}
                          success
                          />
    
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
export default Companyinfo