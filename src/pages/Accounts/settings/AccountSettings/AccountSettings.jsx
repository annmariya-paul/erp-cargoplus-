import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { ACCOUNTS } from "../../../../api/bootapi";
import Button from "../../../../components/button/button";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";

function AccountSettings() {
  const [AddForm] = Form.useForm();
  const [AllLedgers, setAllLedgers] = useState();
  const [AllAccGroups, setAllAccGroups] = useState();

  const GetAllLedgers = () => {
    PublicFetch.get(`${ACCOUNTS}/acc_ledger`)
      .then((res) => {
        console.log("Response from all ledgrs");
        if (res.data.success) {
          console.log("success from all ledgers");
          setAllLedgers(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const GetAllAccGroups = () => {
    PublicFetch.get(`${ACCOUNTS}/account_groups`)
      .then((res) => {
        console.log("Response from All acc groups");
        if (res.data.success) {
          console.log("Success from All Acc groups");
          setAllAccGroups(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const CreateAccountSettings = (data) => {};

  useEffect(() => {
    GetAllLedgers();
    GetAllAccGroups();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="">
          <h4>Accounts Settings</h4>
          <div className="col-12">
            <div className="card ">
              <Form
                form={AddForm}
                onFinish={(value) => {
                  console.log("OnSubmitting Values", value);
                  CreateAccountSettings(value);
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <label>
                      Sales Invoice Credit Ledger
                      <span className="required">*</span>
                    </label>
                    <Form.Item name="acc_setting_inv_cr">
                      <SelectBox>
                        <Select.Option></Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <label>
                      Purchase Bill Debit Ledger
                      <span className="required">*</span>
                    </label>
                    <Form.Item name="acc_setting_pur_dr">
                      <SelectBox>
                        <Select.Option></Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <label>
                      Sales Receipt Debit Ledger
                      <span className="required">*</span>
                    </label>
                    <Form.Item name="acc_setting_receipt_dr">
                      <SelectBox>
                        <Select.Option></Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <label>
                      Purchase Payment Credit Ledger
                      <span className="required">*</span>
                    </label>
                    <Form.Item name="acc_setting_payment_cr">
                      <SelectBox>
                        <Select.Option></Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <label>
                      Customer Group
                      <span className="required">*</span>
                    </label>
                    <Form.Item name="acc_setting_customer_group_id">
                      <SelectBox>
                        <Select.Option></Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <label>
                      Vendor Group
                      <span className="required">*</span>
                    </label>
                    <Form.Item name="acc_setting_vendor_group_id">
                      <SelectBox>
                        <Select.Option></Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <label>
                      Employee Group
                      <span className="required">*</span>
                    </label>
                    <Form.Item name="acc_setting_employee_group_id">
                      <SelectBox>
                        <Select.Option></Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-content-center gap-3">
                      <Button btnType="save">Save</Button>
                      <Button btnType="add_borderless">Cancel</Button>
                    </div>
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
