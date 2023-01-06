import "./quotation.scss";
import React, { useState } from "react";
import { Form, Select } from "antd";
import { useNavigate } from "react-router-dom";
import InputType from "../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../components/Select Box/SelectBox";
import Button from "../../../../components/button/button";

export default function EditQuotation() {
  const [editForm] = Form.useForm();

  return (
    <>
      <div className="row my-3">
        <h5 className="lead_text">Edit Quotation </h5>
      </div>
      <div className="container-fluid edit_quotation p-4 ">
        <Form
          form={editForm}
          onFinish={(values) => {
            console.log("values iss", values);
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row py-1">
            <div className="col-sm-4 pt-2">
              <label>Freight type</label>
              <Form.Item
                name="FreightType"
                rules={[
                  {
                    required: true,
                    message: "Please select a Freight Type",
                  },
                ]}
              >
                <SelectBox>
                  <Select.Option value="test">Test type</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Chargable weight</label>
              <Form.Item
                name="chargableWeight"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp("^[0-9]+$"),
                    message: "Please enter a Valid Chargable weight ",
                  },
                ]}
              >
                <InputType
                // value={attributeName}
                // onChange={(e) => setAttributeName(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Carrier</label>
              <Form.Item
                name="carrier"
                rules={[
                  {
                    required: true,
                    message: "Please select Carrier",
                  },
                ]}
              >
                <SelectBox>
                  <Select.Option value="testC">Test Carrier</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Mode</label>
              <Form.Item
                name="mode"
                rules={[
                  {
                    required: true,
                    message: "Please select a Mode",
                  },
                ]}
              >
                <SelectBox>
                  <Select.Option value="testM">Test Mode</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Project name</label>
              <Form.Item
                name="projectName"
                rules={[
                  {
                    required: true,
                    message: "Please enter a Valid Chargable weight",
                  },
                ]}
              >
                <InputType
                // value={attributeName}
                // onChange={(e) => setAttributeName(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Country origin </label>
              <Form.Item
                name="countryOrigin "
                rules={[
                  {
                    required: true,
                    message: "Please select a Country origin ",
                  },
                ]}
              >
                <SelectBox>
                  <Select.Option value="IN">India</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Country destination </label>
              <Form.Item
                name="countryDestination"
                rules={[
                  {
                    required: true,
                    message: "Please select a Country destination",
                  },
                ]}
              >
                <SelectBox>
                  <Select.Option value="destone">Destination one</Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Shipper</label>
              <Form.Item
                name="shipper"
                rules={[
                  {
                    required: true,
                    message: "Please enter a Valid Shipper",
                  },
                ]}
              >
                <InputType
                // value={attributeName}
                // onChange={(e) => setAttributeName(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Consignee</label>
              <Form.Item
                name="consignee"
                rules={[
                  {
                    required: true,
                    message: "Please select a Consignee",
                  },
                ]}
              >
                <SelectBox>
                  <Select.Option value="Consigntest">
                    test Consignee
                  </Select.Option>
                </SelectBox>
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Number of pieces</label>
              <Form.Item
                name="NoOfPieces"
                rules={[
                  {
                    required: true,
                    message: "Please enter Number of pieces",
                  },
                ]}
              >
                <InputType
                // value={attributeName}
                // onChange={(e) => setAttributeName(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 pt-2">
              <label>Gross weight</label>
              <Form.Item
                name="GrossWeight"
                rules={[
                  {
                    required: true,
                    message: "Please enter a Gross weight",
                  },
                ]}
              >
                <InputType
                // value={attributeName}
                // onChange={(e) => setAttributeName(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-1">
              <Button btnType="save">Save</Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
