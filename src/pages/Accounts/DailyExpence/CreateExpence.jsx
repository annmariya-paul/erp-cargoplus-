import { Checkbox, DatePicker, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { ACCOUNTS, CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import Input_Number from "../../../components/InputNumber/InputNumber";
import SelectBox from "../../../components/Select Box/SelectBox";
import PublicFetch from "../../../utils/PublicFetch";
import moment from "moment";

function CreateExpence() {
  const [addForm] = Form.useForm();
  const [employeeList, setEmployeeList] = useState();
  const [categoryList, setCategoryList] = useState();
  const [ischeck, setIsCheck] = useState(0);
  const [amount, setamount] = useState();

  const allEmployees = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees`)
      .then((res) => {
        console.log("response from employees", res);
        if (res.data.success) {
          console.log("success from employee");
          setEmployeeList(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getExpenseCategory = () => {
    PublicFetch.get(`${ACCOUNTS}/expense-category`)
      .then((res) => {
        console.log("Response from expensecatgeory", res);
        if (res.data.success) {
          console.log("success of catgeory", res.data.data);
          setCategoryList(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const beforeUpload = (file, filelist) => {};

  const handleChecked = (e) => {
    if (e.target.checked) {
      addForm.setFieldsValue({ daily_expense_taxable: 1 });
    } else {
      addForm.setFieldsValue({ daily_expense_taxable: 0 });
    }
  };

  const createExpense = (data) => {
    console.log("submitted ", data);

    let date = moment(data.daily_expense_date);

    const formData = new FormData();

    formData.append(
      "daily_expense_category_id",
      data.daily_expense_category_id
    );
    formData.append("daily_expense_name", data.daily_expense_name);
    formData.append("daily_expense_party", data.daily_expense_party);
    formData.append("daily_expense_bill_no", data.daily_expense_bill_no);
    formData.append(
      "daily_expense_party_address",
      data.daily_expense_party_address
    );
    formData.append(
      "daily_expense_employee_id",
      data.daily_expense_employee_id
    );
    formData.append("daily_expense_taxable", data.daily_expense_taxable);
    if (data.daily_expense_taxable == 1) {
      formData.append("daily_expense_taxno", data.daily_expense_taxno);
      formData.append(
        "daily_expense_tax_amount",
        data.daily_expense_tax_amount
      );
    }
    formData.append("daily_expense_amount", data.daily_expense_amount);
    formData.append(
      "daily_expense_total_amount",
      data.daily_expense_total_amount
    );
    formData.append("daily_expense_remarks", data.daily_expense_remarks);
    formData.append("daily_expense_date");
    formData.append("daily_expense_docs", "");

    PublicFetch.get(`${ACCOUNTS}/daily-expense`);
  };

  useEffect(() => {
    allEmployees();
    getExpenseCategory();
    addForm.setFieldsValue({ daily_expense_taxable: 0 });
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className=" mb-3">
          <h2 style={{ color: "#0891d1" }}>Create Daily Expense</h2>
        </div>
        <div className="row ">
          <div className="col-12 ">
            <div
              style={{
                borderRadius: "8px",
              }}
              className="card border-0 p-3 shadow-sm"
            >
              <div className="container-fluid p-3">
                <Form
                  form={addForm}
                  onFinish={(value) => {
                    console.log("onFinish form submit", value);
                    createExpense(value);
                  }}
                >
                  <div className="row ">
                    {/* <div className="col-xl-4  my-2">
                      <label>Voucher No</label>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div> */}
                    <div className="col-xl-4 my-2">
                      <label className="mb-2">Date</label>
                      <Form.Item name="daily_expense_date">
                        <DatePicker format={"DD-MM-YYYY"} />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Category</label>
                      <Form.Item name="daily_expense_category_id">
                        <SelectBox>
                          {categoryList &&
                            categoryList.length > 0 &&
                            categoryList.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.expense_category_id}
                                  value={item.expense_category_id}
                                >
                                  {item.expense_category_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Name</label>
                      <Form.Item name="daily_expense_name">
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Party</label>
                      <Form.Item name="daily_expense_party">
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Bill No</label>
                      <Form.Item name="daily_expense_bill_no">
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-12 my-2">
                      <label>Party Address</label>
                      <Form.Item name="daily_expense_party_address">
                        <TextArea />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Employee</label>
                      <Form.Item name="daily_expense_employee_id">
                        <SelectBox>
                          {employeeList &&
                            employeeList.length > 0 &&
                            employeeList.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.employee_id}
                                  value={item.employee_id}
                                >
                                  {item.employee_name}
                                </Select.Option>
                              );
                            })}
                        </SelectBox>
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2 d-flex justify-content-center">
                      <div className="">
                        <label>Taxable</label>
                        <Form.Item name="daily_expense_taxable">
                          <Checkbox
                            onChange={(e) => {
                              handleChecked(e);
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Tax No</label>
                      <Form.Item name="daily_expense_taxno">
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Amount</label>
                      <Form.Item name="daily_expense_amount">
                        <Input_Number
                          onChange={(value) => {
                            setamount(value);
                          }}
                          min={0}
                          precision={2}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Tax Amount</label>
                      <Form.Item name="daily_expense_tax_amount">
                        <Input_Number min={0} precision={2} />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Total Amount</label>
                      <Form.Item name="daily_expense_total_amount">
                        <Input_Number min={0} precision={2} />
                      </Form.Item>
                    </div>
                    <div className="col-12 my-2">
                      <label>Remarks</label>
                      <Form.Item name="daily_expense_remarks">
                        <TextArea />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4 my-2">
                      <div className="">
                        <label>Attachments</label>

                        <Form.Item name="daily_expense_docs">
                          <FileUpload beforeUpload={beforeUpload} />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-xl-4"></div>
                    <div className="col-12 d-flex justify-content-center my-4 pt-2">
                      <Button btnType="save" type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateExpence;
