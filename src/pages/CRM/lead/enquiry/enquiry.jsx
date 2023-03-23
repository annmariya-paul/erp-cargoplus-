import { Form, Checkbox, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import FileUpload from "../../../../components/fileupload/fileUploader";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";


function Enquiry (){

    const [img, setImg] = useState([]);
    const [imgSizeError, setImgSizeError] = useState(false);
    return(
        <>
        <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <div >
              <h5 className="modal-title w-100">Add Enquiry</h5>
            </div>
            <Form
              name="addForm"
            //   form={addform}
              onFinish={(data) => {
                // console.log("val", data);
                // createPurchase(data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
                 <div className="row my-4">
                <div className="col-3">
                  <label>Enquiry No</label>
                  <Form.Item name="enquiryno">
                    <InputType
                    //   value={purchasePoNo}
                    //   onChange={(e) => {
                    //     setPurchasePoNo(e.target.value);
                    //     console.log("purchasePoNo", purchasePoNo);
                    //   }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Date</label>
                  <Form.Item 
                  name="Date"
                  className="mt-2"
                  >
                  
                  <DatePicker
                    //   format={"DD-MM-YYYY"}
                    //   defaultValue={moment(newDate)}
                    //   value={purchase_date}
                    //   onChange={(e) => {
                    //     setPurchasedate(e);
                    //   }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Reference No</label>
                  <Form.Item name="reference">
                  
                    <InputType
                    //   value={purchasePoNo}
                    //   onChange={(e) => {
                    //     setPurchasePoNo(e.target.value);
                    //     console.log("purchasePoNo", purchasePoNo);
                    //   }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Organisation</label>
                  <Form.Item name="organisation">
                  
                  <InputType
                    //   value={purchasePoNo}
                    //   onChange={(e) => {
                    //     setPurchasePoNo(e.target.value);
                    //     console.log("purchasePoNo", purchasePoNo);
                    //   }}
                    />
                  </Form.Item>
                </div>

                </div>

                <div className="row my-4">
                <div className="col-3">
                  <label>Customer</label>
                  <Form.Item name="customer">
                    <SelectBox>

                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Source</label>
                  <Form.Item 
                  name="source"
                  className=""
                  >
                  
                  <SelectBox>
                        
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Contact Person</label>
                  <Form.Item name="contctperson">
                  
                    <InputType
                    //   value={purchasePoNo}
                    //   onChange={(e) => {
                    //     setPurchasePoNo(e.target.value);
                    //     console.log("purchasePoNo", purchasePoNo);
                    //   }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Contact Email</label>
                  <Form.Item name="contctemail">
                  
                  <InputType
                    //   value={purchasePoNo}
                    //   onChange={(e) => {
                    //     setPurchasePoNo(e.target.value);
                    //     console.log("purchasePoNo", purchasePoNo);
                    //   }}
                    />
                  </Form.Item>
                </div>

                </div>
                <div className="row">
                <div className="col-6">
                <label>Details</label>
                  <Form.Item name="purchasePoRef">
                  
                  <TextArea/>
                  </Form.Item>

                </div>

                <div className="col-6">
                <label>Attachments</label>
                  <Form.Item name="attachments" className="">
                   
                    <FileUpload
                      name="attachments"
                    //   value={attachments}
                      multiple
                      listType="picture"
                      accept=".png,.jpg,.jpeg"
                      height={100}
                      // onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 1000 && file.file.size < 500000) {
                          setImg(file.file.originFileObj);
                          setImgSizeError(false);
                          console.log(
                            "Image must be greater than 1 kb and less than 500 kb"
                          );
                        } else {
                          console.log("failed beacuse of large size");
                          setImgSizeError(true);
                        }
                      }}
                    />
                  </Form.Item>

                </div>
                </div>
<div className="row">
                <div className="col-3">
                  <label>Enquiry Status</label>
                  <Form.Item 
                  name="enquirystatus"
                  className=""
                  >
                  
                  <SelectBox>
                        
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Default Incoterm</label>
                  <Form.Item name="incoterm">
                  <SelectBox></SelectBox>
                    
                  </Form.Item>
                </div>
                </div>
                
                </Form>
            </div>
            </div>
            </div>
        </>
    )
}
export default Enquiry;