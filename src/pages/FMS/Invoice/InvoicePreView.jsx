import React from "react";
import { Form } from "antd";
import SelectBox from "../../../components/Select Box/SelectBox";
import InputType from "../../../components/Input Type textbox/InputType";
import { Collapse } from "antd";
import TableData from "../../../components/table/table_data";
import Button from "../../../components/button/button";
function InvoicePreView() {
  const { Panel } = Collapse;

  const progress = [
    {
      title: "TASKS",
      dataIndex: "service_name",
      key: "service_name",
      align: "center",
      width: "35%",
      // render: (value, item, indx) => count + indx,
    },
    {
      title: "TAX TYPE",
      dataIndex: "tax_type_name",
      key: "tax_type_name",
      align: "center",
    },
    {
      title: "COST",
      dataIndex: "quotation_details_cost",
      key: "quotation_details_cost",
      align: "center",
    },
    {
      title: "TAX AMOUNT",
      dataIndex: "quotation_details_tax_amount",
      key: "quotation_details_tax_amount",
      // width: "35%",
      align: "center",
     
    },
    {
      title: "TOTAL AMOUNT(KWD) ",
      dataIndex: "quotation_details_total",
      key: "quotation_details_total",
  
      align: "center",
    },
  ];

  const [addForm] = Form.useForm();
  return (
<>
<div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="row flex-wrap">
            <div className="col-6 ">
              <h5 className="lead_text">Invoice Preview</h5>
            </div>
          </div>

          <div className="content-tabs">
          <Form
              form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
                // OnSubmit(values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >

<div className="container mb-4">

<div className=" row mt-5">
          <div className="col-6 d-flex">
            <div className="col-4">Frieght type</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Frieght type</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Invoice Date</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">12/2/2023</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Consignee</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Consignee</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Job No</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Jobnoo</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Shipper</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Shipper</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Cargo Type</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">cargotype</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Mode</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">mode</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Origin</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">orign</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Destination</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Destination</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Carrier</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Carrier</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">AWB/BL</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">orign</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Terms</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">terms</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">No of Pieces</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">terms</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">UOM</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">terms</p>
            </div>
          </div>

          <div className="col-6 d-flex">
            <div className="col-4">Gross wt</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Gross</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Chargeble wt</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Chargeble</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Currency</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Currency</p>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4">Exchange Rate</div>
            <div className="col-1">:</div>

            <div className="col-7">
              <p className="modal-view-data">Exchange</p>
            </div>
          </div>


          <div className="mt-3">
                <div>
                  <TableData 
                  columns={progress} 
                  // data={tabledata}
                   bordered />
                </div>
          </div>
<div className="row mt-4">
<div className="d-flex  justify-content-center gap-2 ">
<Button  btnType="save">Generate </Button>
<Button btnType="cancel" >Cancel </Button>
</div>
</div>
          </div>

          



               
{/* <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Freight Type</label>
                      <Form.Item
                        name="jobdate"
                      >
                      <SelectBox></SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Invoice Date</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Consignee</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Job No</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>

                    </div>


                    <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Shipper</label>
                      <Form.Item
                        name="jobdate"
                      >
                      <SelectBox></SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Cargo Type</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Mode</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Origin</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>

                    </div>

                    <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Destination</label>
                      <Form.Item
                        name="jobdate"
                      >
                      <SelectBox></SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Carrier</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>AWB/BL NO</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Terms</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>

                    </div>
                    <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>No of pieces</label>
                      <Form.Item
                        name="jobdate"
                      >
                      <SelectBox></SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>UOM</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Gross Wt</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Chargeble wt</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                        <SelectBox  
                        >
                        </SelectBox>
                      </Form.Item>
                    </div>

                    </div>
                    <div className="row ">
                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Currency</label>
                      <Form.Item
                        name="jobdate"
                      >
                      <SelectBox></SelectBox>
                      </Form.Item>
                    </div>

                    <div className="col-xl-3 col-sm-6 mt-2">
                      <label>Exchange Rate</label>
                      <Form.Item
                        name="job_freight_type"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid freight type",
                          },
                        ]}
                      >
                       

                      <InputType/>
                      </Form.Item>
                    </div>

                   
                   

                    </div> */}

                    </div>
              </Form>

            </div>
          </div>
            </div>

</>
  ) 
}

export default InvoicePreView;
