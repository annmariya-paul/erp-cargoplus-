import { Form } from "antd";
import { DatePicker } from "antd";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import { Select } from "antd";
import { cargo_typeoptions } from "../../../utils/SelectOptions";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
function CreateJob() {

  const [cargooptions, setCargooptions] = useState(cargo_typeoptions);
  console.log("cargo options : ", cargooptions);

  return (
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
                        name="freighttype"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox>
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Job Date</label>
                      <Form.Item
                        name="jobdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid date",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Consignee</label>
                      <Form.Item
                        name="job_consignee"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid  consignee",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Quotation No</label>
                      <Form.Item
                        name="quotationno"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid quotation no",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Shipper</label>
                      <Form.Item
                        name="shipper"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid shipper",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Cargo Type</label>
                      <Form.Item
                        name="Cargotype"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid cargotype",
                          },
                        ]}
                      >
                        <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          {cargooptions &&
                            cargooptions.length > 0 &&
                            cargooptions.map((item, index) => {
                              return (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Mode</label>
                      <Form.Item
                        name="job_mode"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid mode",
                          },
                        ]}
                      >
                         <SelectBox
                          allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                          <Select.Option value="A">Air</Select.Option>
                          <Select.Option value="S">Sea</Select.Option>
                          <Select.Option value="R">Road</Select.Option>
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Origin</label>
                      <Form.Item
                        name="job_origin"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid origin",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Destination</label>
                      <Form.Item
                        name="job_destination"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Destination",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
                      <Form.Item
                        name="job_carrier"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid carrier",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>AWB/BL No</label>
                      <Form.Item
                        name="job_awb"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid AWB",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Terms</label>
                      <Form.Item
                        name="terms"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid terms",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>No of pieces</label>
                      <Form.Item
                        name="qdate"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid no of pieces",
                          },
                        ]}
                      >
                        <InputType />
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
                            message: "Please enter a Valid UOM",
                          },
                        ]}
                      >
                        <SelectBox></SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Gross wt</label>
                      <Form.Item
                        name="grosswt"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid gross wt",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Chargeable wt</label>
                      <Form.Item
                        name="chargeablewt"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid chargeable wt",
                          },
                        ]}
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-sm-6 ">
                      <label>Attachments</label>
                      <Form.Item
                        name="attachment"
                        //  rules={[
                        //    {
                        //      required: true,
                        //      pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        //      message: "Please enter a Valid attachment",
                        //    },
                        //  ]}
                      >
                        <FileUpload />
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
                     
                     <Link  to={ROUTES.LIST_JOB} >
                      <Button className="qtn_save" btnType="cancel">
                        Cancel
                      </Button>
                      </Link>
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
  );
}
export default CreateJob;
