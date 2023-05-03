import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { ACCOUNTS } from "../../../../api/bootapi";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";

function AccountSettings() {
  const [AddForm] = Form.useForm();
  const [AllLedgers, setAllLedgers] = useState();
  const [AllAccGroups, setAllAccGroups] = useState();
  const [SuccessPopup, setSuccessPopup] = useState(false);

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
  const CreateAccountSettings = (data) => {
    PublicFetch.get(`${ACCOUNTS}/account_settings/create_settings`)
      .then((res) => {
        console.log("Response from creating acc settings");
        if (res.data.success) {
          console.log("Success from creating");
          setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
          }, 1200);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    GetAllLedgers();
    GetAllAccGroups();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="">
          <h4 className="lead_text">Accounts Settings</h4>
        </div>
        <div className="col-12">
          <div className="card shadow-sm border-0 p-3">
            <Form
              form={AddForm}
              onFinish={(value) => {
                console.log("OnSubmitting Values", value);
                CreateAccountSettings(value);
              }}
            >
              <div className="row">
                <div className="col-6 p-2">
                  <label>
                    Sales Invoice Credit Ledger
                    <span className="required">*</span>
                  </label>
                  <Form.Item name="acc_setting_inv_cr">
                    <SelectBox>
                      {AllLedgers &&
                        AllLedgers.length > 0 &&
                        AllLedgers.map((item, index) => {
                          return (
                            <Select.Option
                              key={item?.acc_ledger_id}
                              value={item.acc_ledger_id}
                            >
                              {item?.acc_ledger_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-6 p-2">
                  <label>
                    Purchase Bill Debit Ledger
                    <span className="required">*</span>
                  </label>
                  <Form.Item name="acc_setting_pur_dr">
                    <SelectBox>
                      {AllLedgers &&
                        AllLedgers.length > 0 &&
                        AllLedgers.map((item, index) => {
                          return (
                            <Select.Option
                              key={item?.acc_ledger_id}
                              value={item.acc_ledger_id}
                            >
                              {item?.acc_ledger_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-6 p-2">
                  <label>
                    Sales Receipt Debit Ledger
                    <span className="required">*</span>
                  </label>
                  <Form.Item name="acc_setting_receipt_dr">
                    <SelectBox>
                      {AllLedgers &&
                        AllLedgers.length > 0 &&
                        AllLedgers.map((item, index) => {
                          return (
                            <Select.Option
                              key={item?.acc_ledger_id}
                              value={item.acc_ledger_id}
                            >
                              {item?.acc_ledger_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-6 p-2">
                  <label>
                    Purchase Payment Credit Ledger
                    <span className="required">*</span>
                  </label>
                  <Form.Item name="acc_setting_payment_cr">
                    <SelectBox>
                      {AllLedgers &&
                        AllLedgers.length > 0 &&
                        AllLedgers.map((item, index) => {
                          return (
                            <Select.Option
                              key={item?.acc_ledger_id}
                              value={item.acc_ledger_id}
                            >
                              {item?.acc_ledger_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-6 p-2">
                  <label>
                    Customer Group
                    <span className="required">*</span>
                  </label>
                  <Form.Item name="acc_setting_customer_group_id">
                    <SelectBox>
                      {AllAccGroups &&
                        AllAccGroups.length > 0 &&
                        AllAccGroups.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.acc_group_id}
                              value={item.acc_group_id}
                            >
                              {item.acc_group_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-6 p-2">
                  <label>
                    Vendor Group
                    <span className="required">*</span>
                  </label>
                  <Form.Item name="acc_setting_vendor_group_id">
                    <SelectBox>
                      {AllAccGroups &&
                        AllAccGroups.length > 0 &&
                        AllAccGroups.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.acc_group_id}
                              value={item.acc_group_id}
                            >
                              {item.acc_group_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-6 p-2">
                  <label>
                    Employee Group
                    <span className="required">*</span>
                  </label>
                  <Form.Item name="acc_setting_employee_group_id">
                    <SelectBox>
                      {AllAccGroups &&
                        AllAccGroups.length > 0 &&
                        AllAccGroups.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.acc_group_id}
                              value={item.acc_group_id}
                            >
                              {item.acc_group_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-12 p-2 mt-3">
                  <div className="d-flex justify-content-center gap-3">
                    <Button btnType="save">Save</Button>
                    {/* <Button btnType="add_borderless" className="">
                        Cancel
                      </Button> */}
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Custom_model
        success
        show={SuccessPopup}
        onHide={() => {
          setSuccessPopup(false);
        }}
      />
    </div>
  );
}

export default AccountSettings;
