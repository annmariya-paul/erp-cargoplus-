

import { Form } from "antd";
import { DatePicker } from "antd";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import {Select} from "antd";
function CreateJob(){



    
   return(
    <>
    
    <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="row flex-wrap">
            <div className="col-6 ">
              <h5 className="lead_text">Create Job</h5>
            </div>
          </div>
          <div className="content-tabs">
        

           
            <Form
            //   form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="container mb-4">
                <div className="row">
                  <div className="row ">
                   
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Freight Type</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                      <SelectBox>
                      <Select.Option value="A">Air</Select.Option>
                          <Select.Option value="S">Sea</Select.Option>
                          <Select.Option value="R">Road</Select.Option>
                      </SelectBox>
                      </Form.Item>

                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Job No</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                     <InputType/>
                      </Form.Item>

                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Job Date</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                     <InputType/>
                      </Form.Item>

                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Consignee</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                     <SelectBox>

                     </SelectBox>
                      </Form.Item>

                    </div>

                    </div>

                    <div className="row ">
                   
                   <div className="col-xl-3 col-sm-6 mt-2">
                     <label>Quotation No</label>
                     <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                     <SelectBox>

                     </SelectBox>
                     </Form.Item>

                   </div>
                   <div className="col-xl-3 col-sm-6 mt-2">
                     <label>Shipper</label>
                     <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                     <SelectBox></SelectBox>
                     </Form.Item>

                   </div>
                   <div className="col-xl-3 col-sm-6 mt-2">
                     <label>Cargo Type</label>
                     <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                    <SelectBox></SelectBox>
                     </Form.Item>

                   </div>
                   <div className="col-xl-3 col-sm-6 mt-2">
                     <label>Mode</label>
                     <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                   <SelectBox></SelectBox>
                     </Form.Item>

                   </div>

                   </div>

                      <div className="row ">
                   
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Origin</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                      <SelectBox>

                      </SelectBox>
                      </Form.Item>

                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Destination</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                      <SelectBox></SelectBox>
                      </Form.Item>

                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                     <SelectBox></SelectBox>
                      </Form.Item>

                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>AWB/BL No</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid value",
                          },
                        ]}
                      >
                     <InputType/>
                      </Form.Item>

                    </div>

                    </div>
                    <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                     <label>Terms</label>
                     <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                  <SelectBox></SelectBox>
                     </Form.Item>

                   </div>
                   <div className="col-xl-3 col-sm-6 mt-2">
                     <label>No of pieces</label>
                     <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                   <InputType/>
                     </Form.Item>

                   </div>
                   <div className="col-xl-3 col-sm-6 mt-2">
                     <label>UOM</label>
                     <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                   <SelectBox></SelectBox>
                     </Form.Item>

                   </div>
                   <div className="col-xl-3 col-sm-6 mt-2">
                     <label>Gross wt</label>
                     <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                    <InputType/>
                     </Form.Item>

                   </div>
                 
                   </div>
<div className="row">
<div className="col-xl-3 col-sm-6 mt-2">
                     <label>Chargeable wt</label>
                     <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                    <InputType/>
                     </Form.Item>

                   </div>
           <div className="col-xl-3 col-lg-3 col-sm-6 ">
          <label>Attachments</label>
          <Form.Item
                       name="qdate"
                       rules={[
                         {
                           required: true,
                           pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                           message: "Please enter a Valid value",
                         },
                       ]}
                     >
                   <FileUpload/>
                     </Form.Item>
</div>
</div>

{/* <div className="row"> */}
     <div className="d-flex justify-content-center my-4">
                <div className="col-lg-1 ">
                  <Button className="qtn_save" btnType="save">
                    Save
                  </Button>
                </div>
                <div className="col-lg-1 ">
                  <Button className="qtn_save" btnType="cancel">
                    Cancel
                  </Button>
                </div>
              </div>
{/* </div> */}


                    </div>
                    </div>
                    </Form>
                    </div>
        
        </div>
       </div>
    </>
   )

}
export default CreateJob;