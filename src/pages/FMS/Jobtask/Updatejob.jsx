import { Form } from "antd";
import { DatePicker } from "antd";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";

function Updatejob() {}
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
                          message: "Please enter a Valid freighttype",
                        },
                      ]}
                    >
                      <SelectBox></SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-xl-3 col-sm-6 mt-2">
                    <label>Job No</label>
                    <Form.Item
                      name="jobno"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid jobno",
                        },
                      ]}
                    >
                      <InputType />
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
                          message: "Please enter a Valid jobdate",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-xl-3 col-sm-6 mt-2">
                    <label>Consignee</label>
                    <Form.Item
                      name="consignee"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid consignee",
                        },
                      ]}
                    >
                      <SelectBox></SelectBox>
                    </Form.Item>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-xl-3 col-sm-6 mt-2">
                    <label>Quotation No</label>
                    <Form.Item
                      name="quotationno"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid quotationno",
                        },
                      ]}
                    >
                      <SelectBox></SelectBox>
                    </Form.Item>
                  </div>
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
                      name="cargotype"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid cargotype",
                        },
                      ]}
                    >
                      <SelectBox></SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-xl-3 col-sm-6 mt-2">
                    <label>Mode</label>
                    <Form.Item
                      name="Mode"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Mode",
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
                      name="origin"
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
                  <div className="col-xl-3 col-sm-6 mt-2">
                    <label>Destination</label>
                    <Form.Item
                      name="destination"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid destination",
                        },
                      ]}
                    >
                      <SelectBox></SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-xl-3 col-sm-6 mt-2">
                    <label>Carrier</label>
                    <Form.Item
                      name="carrier"
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
                      name="AWB"
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
                </div>
                <div className="row ">
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
                  <div className="col-xl-3 col-sm-6 mt-2">
                    <label>No of pieces</label>
                    <Form.Item
                      name="noofpieces"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid noofpieces",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-xl-3 col-sm-6 mt-2">
                    <label>UOM</label>
                    <Form.Item
                      name="Uom"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid Uom",
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
                          message: "Please enter a Valid grosswt",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-sm-6 mt-2">
                    <label>Chargeable wt</label>
                    <Form.Item
                      name="chargeablewt"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid chargeablewt",
                        },
                      ]}
                    >
                      <InputType />
                    </Form.Item>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-sm-6 ">
                    <label>Attachments</label>
                    <Form.Item
                      name="attachments"
                      // rules={[
                      //   {
                      //     required: true,
                      //     pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                      //     message: "Please enter a Valid chargeablewt",
                      //   },
                      // ]}
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
);
export default Updatejob;
