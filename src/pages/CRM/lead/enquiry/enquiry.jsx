import { Form, Checkbox, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import FileUpload from "../../../../components/fileupload/fileUploader";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { ROUTES } from "../../../../routes";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/button/button";
import { BsPlusCircleFill } from "react-icons/bs";
import "../enquiry/enquiry.scss";
import CustomModel from "../../../../components/custom_modal/custom_model";

import Custom_model from "../../../../components/custom_modal/custom_model";
function Enquiry() {
  const [addForm] = Form.useForm();
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [img, setImg] = useState([]);
  const navigate = useNavigate();
  const [modalAddCustomer, setModalAddCustomer] = useState(false);
  const [imgSizeError, setImgSizeError] = useState(false);
  return (
    <>
      <div className="container-fluid">
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
          <div className="row px-1 pt-2">
            <h5 className="lead_text">Add Enquiry</h5>
          </div>

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Basic Info</h5>
            </div>

            <div className="col-sm-4 pt-2 d-flex">
              <div className="col-11">
                <label>Customer<span className="required">*</span></label>
                <Form.Item name="customer">
                  <SelectBox></SelectBox>
                </Form.Item>
              </div>
              <div className="col-1 ">
                <Button btnType="add_borderless"
                onClick={() =>
                  {
                    setModalAddCustomer(true);
                   addForm.resetFields();
                  }
                  }
                >
                  <BsPlusCircleFill style={{ fontSize: "21px" ,marginTop:"30px",marginLeft:"10px" }} />{" "}
                </Button>
              </div>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Enquiry No<span className="required">*</span></label>
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

            <div className="col-sm-4 pt-2">
              <label>Date<span className="required">*</span></label>
              <Form.Item name="Date" className="mt-2">
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

            <div className="col-sm-4 pt-2">
              <label>Source<span className="required">*</span></label>
              <Form.Item name="source" className="">
                <SelectBox></SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Customer Reference<span className="required">*</span></label>
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
          </div>

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-3">
            <div className="col-12">
              <h5 className="lead_text">Contact Details</h5>
            </div>

            <div className="col-sm-4 pt-3">
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
            <div className="col-sm-4 pt-3">
              <label>Email</label>
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
            <div className="col-sm-4 pt-3">
              <label>Phone</label>
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

          <div className="row jobpay_cards mt-3 mx-0 px-2 py-5">
            <div className="col-12">
              <h5 className="lead_text">Extra Info</h5>
            </div>

            {/* <div className="col-3">
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

                </div> */}

            <div className="col-sm-6 pt-2">
              <label>Remarks</label>
              <Form.Item name="purchasePoRef">
                <TextArea />
              </Form.Item>
            </div>

            <div className="col-sm-6 pt-2">
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

          <div className="col-12 d-flex justify-content-center my-4 gap-3">
            <Button className="save_button" btnType="save">
              Save
            </Button>
            <Button
              as="input"
              type="reset"
              value="Reset"
              onClick={() => {
                navigate(ROUTES.LIST_JOB);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>

        {/* Modal for add Customer */}
      <CustomModel
        show={modalAddCustomer}
        onHide={() => setModalAddCustomer(false)}
        header="Add Customer"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Customer</h5>
            </div>
            <Form
              // form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
            
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-6 pt-1">
                  <label>Customer Name<span className="required">*</span></label>
                  <div>
                    <Form.Item
                      name="customername"
                  
                    >
                      <InputType
                        
                      />
                    </Form.Item>
                   
                  </div>
                </div>

                <div className="col-6 pt-1">
                  <label>Contact Person<span className="required">*</span></label>
                  <Form.Item
                    name="contactperson"
                 
                  >
                    <InputType
                     
                    />
                  </Form.Item>
                
                </div>
                <div className="col-6 pt-1">
                  <label>Email<span className="required">*</span></label>
                  <Form.Item
                    name="email"
                 
                  >
                    <InputType
                     
                    />
                  </Form.Item>
                
                </div>
                <div className="col-6 pt-1">
                  <label>Phone<span className="required">*</span></label>
                  <Form.Item
                    name="phone"
                 
                  >
                    <InputType
                     
                    />
                  </Form.Item>
                
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      >
        <Custom_model
          size={"sm"}
          // show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </CustomModel>
        <Custom_model
          success
          show={SuccessPopup}
          onHide={() => {
            setSuccessPopup(false);
          }}
        />
      </div>
    </>
  );
}
export default Enquiry;
