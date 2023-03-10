import { Checkbox, DatePicker, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ACCOUNTS, CRM_BASE_URL_HRMS } from "../../../api/bootapi";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import FileUpload from "../../../components/fileupload/fileUploader";
import InputType from "../../../components/Input Type textbox/InputType";
import Input_Number from "../../../components/InputNumber/InputNumber";
import SelectBox from "../../../components/Select Box/SelectBox";
import PublicFetch from "../../../utils/PublicFetch";
import moment from "moment";
import { ROUTES } from "../../../routes";

function EditExpence() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [addForm] = Form.useForm();
  const [employeeList, setEmployeeList] = useState();
  const [categoryList, setCategoryList] = useState();
  const [ischeck, setIsCheck] = useState(0);
  const [amount, setamount] = useState();
  const [taxAmount, setTaxAmount] = useState(0);
  const [successPopup, setSuccessPopup] = useState(false);
  const [isTaxable, setIsTaxable] = useState(false);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(`${ROUTES.DAILY_EXPENSE}`);
      }, time);
    }
  };

  let TaxAmount = (amount * taxAmount) / 100;

  useEffect(() => {
    if (amount) {
      let total = amount + taxAmount;

      addForm.setFieldsValue({
        daily_expense_total_amount: total,
      });
    }
  }, [amount, taxAmount]);

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

  const getsingleExpense = () => {
    PublicFetch.get(`${ACCOUNTS}/daily-expense/${id}`)
      .then((res) => {
        if (res.data.success) {
          console.log("Success of single expense", res.data.data);
          let item = res?.data?.data;
          let date = moment(item?.daily_expense_date);
          if (item.daily_expense_taxable == 1) {
            setIsTaxable(true);
          }
          addForm.setFieldsValue({
            daily_expense_date: date,
            daily_expense_category_id: item?.daily_expense_category_id,
            daily_expense_name: item.daily_expense_name,
            daily_expense_party: item.daily_expense_party,
            daily_expense_bill_no: item?.daily_expense_bill_no,
            daily_expense_party_address: item?.daily_expense_party_address,
            daily_expense_employee_id: item.daily_expense_employee_id,
            daily_expense_taxable: item.daily_expense_taxable,
            daily_expense_taxno: item.daily_expense_taxno,
            daily_expense_amount: item?.daily_expense_amount,
            daily_expense_tax_amount: item?.daily_expense_tax_amount,
            daily_expense_total_amount: item?.daily_expense_total_amount,
            daily_expense_remarks: item?.daily_expense_remarks,
            // daily_expense_docs:"",
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const updateExpense = (data) => {
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
    formData.append("daily_expense_date", date);
    if (data.daily_expense_docs) {
      formData.append(
        "daily_expense_docs",
        data.daily_expense_docs?.file?.originFileObj
      );
    }

    console.log("formdata", formData);

    PublicFetch.patch(`${ACCOUNTS}/daily-expense/${id}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success of res", res.data.data);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          addForm.resetFields();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    allEmployees();
    getExpenseCategory();
    addForm.setFieldsValue({ daily_expense_taxable: 0 });
    if (id) {
      getsingleExpense();
    }
  }, [id]);
  return (
    <div>
      <div className="container-fluid">
        <div className=" mb-3">
          <h4 style={{ color: "#0891d1" }}>Edit Daily Expense</h4>
        </div>
        <div className="row ">
          <div className="col-12 ">
            <div
              style={{
                borderRadius: "8px",
              }}
              className=""
            >
              <div className="container-fluid p-3">
                <Form
                  form={addForm}
                  onFinish={(value) => {
                    console.log("onFinish form submit", value);
                    updateExpense(value);
                  }}
                >
                  <div className="content-tabs-new row justify-content ">
                    <div className="row">
                      <div className="col-xl-4 my-2">
                        <label className="mb-2">Date</label>
                        <Form.Item name="daily_expense_date">
                          <DatePicker
                            rules={[
                              {
                                required: true,
                                message: "Date is Required",
                              },
                            ]}
                            format={"DD-MM-YYYY"}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-xl-4 my-2">
                        <label>Category</label>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Category is Required",
                            },
                          ]}
                          name="daily_expense_category_id"
                        >
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
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Name is Required",
                            },
                          ]}
                          name="daily_expense_name"
                        >
                          <InputType />
                        </Form.Item>
                      </div>
                      <div className="col-xl-4 my-2">
                        <label>Employee</label>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Employee is Required",
                            },
                          ]}
                          name="daily_expense_employee_id"
                        >
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
                      <div className="col-xl-4 my-2">
                        <label>Amount</label>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Amount is Required",
                            },
                          ]}
                          name="daily_expense_amount"
                        >
                          <Input_Number
                            onChange={(value) => {
                              setamount(value);
                            }}
                            min={0}
                            precision={2}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-12 my-2">
                        <label>Remarks</label>
                        <Form.Item name="daily_expense_remarks">
                          <TextArea />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="content-tabs-new row justify-content mt-4 ">
                    {/* <div className="col-xl-4  my-2">
                      <label>Voucher No</label>
                      <Form.Item>
                        <InputType />
                      </Form.Item>
                    </div> */}

                    <div className="col-xl-4 my-2">
                      <label>Bill No</label>
                      <Form.Item name="daily_expense_bill_no">
                        <InputType />
                      </Form.Item>
                    </div>

                    <div className="col-xl-4 my-2 d-flex justify-content-center">
                      <div className="">
                        <label>Taxable</label>
                        <Form.Item name="daily_expense_taxable">
                          <Checkbox
                            onChange={(e) => {
                              handleChecked(e);
                              setIsTaxable(e.target.checked);
                            }}
                            checked={isTaxable}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Tax No</label>
                      <Form.Item name="daily_expense_taxno">
                        <InputType disabled={isTaxable ? false : true} />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Party</label>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Party is Required",
                          },
                        ]}
                        name="daily_expense_party"
                      >
                        <InputType />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Tax Amount</label>
                      <Form.Item name="daily_expense_tax_amount">
                        <Input_Number
                          onChange={(value) => {
                            setTaxAmount(value);
                          }}
                          min={0}
                          precision={2}
                          disabled={isTaxable ? false : true}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-xl-4 my-2">
                      <label>Total Amount</label>
                      <Form.Item
                        name="daily_expense_total_amount"
                        rules={[
                          {
                            required: true,
                            message: "Total Amount is Required",
                          },
                        ]}
                      >
                        <Input_Number min={0} precision={2} disabled={true} />
                      </Form.Item>
                    </div>

                    {/* <div className="col-xl-4"></div> */}
                    <div className="col-xl-6 my-2">
                      <label>Party Address</label>
                      <Form.Item name="daily_expense_party_address">
                        <TextArea />
                      </Form.Item>
                    </div>
                    <div className="col-xl-6 my-2">
                      <div className="">
                        <label>Attachments</label>

                        <Form.Item name="daily_expense_docs">
                          <FileUpload beforeUpload={beforeUpload} />
                        </Form.Item>
                      </div>
                    </div>
                    {/* <div className="col-xl-4"></div> */}
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

export default EditExpence;
