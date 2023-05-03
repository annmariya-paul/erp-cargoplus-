import { Form, Select } from "antd";
import React from "react";
import SelectBox from "../../../../components/Select Box/SelectBox";

function AccountSettings() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="">
          <h4>Accounts Settings</h4>
          <div className="col-12">
            <div className="card ">
              <Form>
                <div className="row">
                  <div className="col-12">
                    <label>
                      Sales Invoice Credit Ledger
                      <span className="required">*</span>
                    </label>
                    <Form.Item>
                      <SelectBox>
                        <Select.Option></Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
