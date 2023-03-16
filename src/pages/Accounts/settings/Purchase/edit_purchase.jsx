import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Checkbox } from "antd";
import Button from "../../../../components/button/button";
import FileUpload from "../../../../components/fileupload/fileUploader";
import InputType from "../../../../components/Input Type textbox/InputType";
import moment from "moment";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import SelectBox from "../../../../components/Select Box/SelectBox";
import PublicFetch from "../../../../utils/PublicFetch";
import { ACCOUNTS, CRM_BASE_URL_PURCHASING } from "../../../../api/bootapi";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import Input_Number from "../../../../components/InputNumber/InputNumber";

export default function Edit_purchase() {
  const { id } = useParams();
  const [editForm] = Form.useForm();
  const navigate = useNavigate();

  const newDate = new Date();
  // const newDate1 = new Date();
  const [vendorid, setvendorid] = useState("");
  const [allvendors, setAllVendors] = useState();
  const [allpayments, setallpayments] = useState();
  const [imgSizeError, setImgSizeError] = useState(false);

  const [selectedDate, setSelectedDate] = useState();
  const [selectedDatee, setSelectedDatee] = useState();

  const [editpurchaseid, seteditpurchaseid] = useState("");

  const [editpurchasebillno, seteditpurchasebillno] = useState("");
  const [editpurchasedate, seteditpurchasedate] = useState("");
  const [editpurchaseduedate, seteditpurchaseduedate] = useState("");
  const [editpurchasepono, seteditpurchasepono] = useState("");
  const [editpurchasestatus, seteditpurchasestatus] = useState("");
  const [editpurchasetotalamount, seteditpurchasetotalamount] = useState("");
  // const [editpurchasevendor, seteditpurchasevendor] = useState("");
  const [editpurchasepaymentmode, seteditpurchasepaymentmode] = useState("");
  const [editpurchasecreditdays, seteditpurchasecreditdays] = useState("");
  const [editpurchasetaxable, seteditpurchasetaxable] = useState("");
  const [editpurchasetaxno, seteditpurchasetaxno] = useState("");
  const [editpurchaseremarks, seteditpurchaseremarks] = useState("");
  const [editpurchaseattachments, seteditpurchaseattachments] = useState("");
  const [editpurchaseamount, seteditpurchaseamount] = useState("");
  const [editpurchasetaxamount, seteditpurchasetaxamount] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isTaxable, setIsTaxable] = useState(false);
  const [amount, setamount] = useState();
  const [taxAmount, setTaxAmount] = useState(0);

  const [img, setImg] = useState([]);

  const [successModal, setSuccessModal] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessModal(false);
        navigate(ROUTES.PURCHASE);
      }, time);
    }
  };

  let TaxAmount = (editpurchaseamount * editpurchasetaxamount) / 100;

  useEffect(() => {
    if (amount) {
      let total = amount + taxAmount;

      editForm.setFieldsValue({
      total_amount: total,
      });
    }
  }, [amount, taxAmount]);


  const handleChecked = (e, key) => {
    console.log("isChecked", e);
    if (e.target.checked) {
      console.log("suceccss checked", e.target.checked);
      seteditpurchasetaxable(1);
    }
  };

  const getvendors = async () => {
    try {
      const getvendorss = await PublicFetch.get(
        `${CRM_BASE_URL_PURCHASING}/vendors`
      );
      console.log("response", getvendorss);
      if (getvendorss?.data.success) {
        setAllVendors(getvendorss?.data?.data);

        setvendorid(getvendorss?.data?.data.vendor_id);
        console.log("idddsss", getvendorss?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getpayments = async () => {
    try {
      const getpayment = await PublicFetch.get(`${ACCOUNTS}/payment-modes`);
      console.log("res", getpayment);
      if (getpayment?.data.success) {
        setallpayments(getpayment?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleChecked = (e) => {
  //   if (e.target.checked) {
  //     addForm.setFieldsValue({ daily_expense_taxable: 1 });
  //   } else {
  //     addForm.setFieldsValue({ daily_expense_taxable: 0 });
  //   }
  // };

  const getsinglePurchase = () => {
    PublicFetch.get(`${ACCOUNTS}/purchase/${id}`)
      .then((res) => {
        console.log("resr", res);
        if (res.data.success) {
          let date1 = moment(res.data.data.purchase_purchase_date);
          let date2 = moment(res.data.data.purchase_due_date);
          if (res.data.data.purchase_taxable == 1) {
            setIsTaxable(true);
          }
          editForm.setFieldsValue({
            po_no: res.data.data.purchase_po_no,
            date: date1,
            datee: date2,
            vendor: res.data.data.purchase_vendor_id,
            payment_mode: res.data.data.purchase_payment_mode,
            credit_days: res.data.data.purchase_credit_days,
            taxable: res.data.data.purchase_taxable,
            tax_no: res.data.data.purchase_tax_no,
            bill_no: res.data.data.purchase_bill_no,
            amount: res.data.data.purchase_amount,
            tax_amount: res.data.data.purchase_tax_amount,
            total_amount: res.data.data.purchase_total_amount,
            status: res.data.data.purchase_status,
            remarks: res.data.data.purchase_remarks,
            attachments: res.data.data.purchase_docs,
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (id) {
      getsinglePurchase();
      getvendors();
      getpayments();
    }
  }, [id]);

  const handleupdate = (data) => {
    console.log("dddaaaattttaaa", data);
    setFormSubmitted(true);
    let datedue = moment(data.datee);
    let datepur = moment(data.date);
    const formData = new FormData();
    formData.append("purchase_po_no", data.po_no);
    formData.append("purchase_vendor_id", data.vendor);
    formData.append("purchase_amount", data.amount);
    formData.append("purchase_purchase_date", datepur);
    formData.append("purchase_tax_no", data.tax_no);
    formData.append("purchase_bill_no", data.bill_no);
    formData.append("purchase_tax_amount", data.tax_amount);
    formData.append("purchase_payment_mode", data.payment_mode);
    formData.append("purchase_credit_days", data.credit_days);
    formData.append("purchase_remarks", data.remarks);
    formData.append("purchase_taxable", data.taxable);
    formData.append(
      "attachments",
      editpurchaseattachments?.file?.originFileObj
    );
    formData.append("purchase_total_amount", data.total_amount);
    formData.append("purchase_due_date", datedue);

    PublicFetch.patch(`${ACCOUNTS}/purchase/${id}`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then(function (response) {
        console.log("hellooooooo", response);

        if (response.data.success) {
          console.log("hello", response.data.data);
          setModalShow(true);
          close_modal(modalShow, 1200);
        } else {
          console.log("Failed while adding data");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <div>
              <h5 className="lead_text my-2">Edit Purchase</h5>
            </div>
            <Form
              form={editForm}
              onFinish={(values) => {
                console.log("values iss", values);
                handleupdate(values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-4">
                <div className="col-3">
                  <label>Po No</label>
                  <Form.Item name="po_no">
                    <InputType
                      className="input_type_style w-100"
                      value={editpurchasepono}
                      onChange={(e) => {
                        seteditpurchasepono(e.target.value);
                        console.log("editpurchasepono", editpurchasepono);
                        //   setErrormsg("");
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="col-3">
                  <label>Po Reference</label>
                  <Form.Item name="po_no">
                    <InputType
                      className="input_type_style w-100"
                      // value={editpurchasepono}
                      // onChange={(e) => {
                      //   seteditpurchasepono(e.target.value);
                      //   console.log("editpurchasepono", editpurchasepono);
                      //   //   setErrormsg("");
                      // }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Purchase Date</label>
                  <Form.Item name="date" className="mt-2">
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      defaultValue={moment(newDate)}
                      value={editpurchasedate}
                      onChange={(e) => {
                        seteditpurchasedate(e);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Due Date</label>
                  <Form.Item name="datee" className="mt-2">
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      defaultValue={moment(newDate)}
                      value={editpurchaseduedate}
                      onChange={(e) => {
                        seteditpurchaseduedate(e);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Vendor</label>
                  <Form.Item className="mt-2" name="vendor">
                    <SelectBox
                      showSearch={true}
                      allowClear
                      value={vendorid}
                      optionFilterProp="children"
                      onChange={(e) => {
                        setvendorid(e);
                      }}
                    >
                      {allvendors &&
                        allvendors.length > 0 &&
                        allvendors.map((item, index) => {
                          console.log("itm", item);
                          return (
                            <Select.Option
                              key={item.vendor_id}
                              id={item.vendor_id}
                              value={item.vendor_id}
                            >
                              {item.vendor_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Payment Mode</label>
                  <Form.Item className="mt-2" name="payment_mode">
                    <SelectBox
                      showSearch={true}
                      allowClear
                      value={editpurchasepaymentmode}
                      optionFilterProp="children"
                      onChange={(e) => {
                        seteditpurchasepaymentmode(e);
                      }}
                    >
                      {allpayments &&
                        allpayments.length > 0 &&
                        allpayments.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.pay_mode_id}
                              id={item.pay_mode_id}
                              value={item.pay_mode_id}
                            >
                              {item.pay_mode_name}
                            </Select.Option>
                          );
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Credit Days</label>
                  <Form.Item name="credit_days">
                    <InputType
                      value={editpurchasecreditdays}
                      onChange={(e) => {
                        seteditpurchasecreditdays(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                <div className="row">
                <div className="col-3">
                  <label>Taxable</label>
                  <Form.Item name="taxable">
                    <Checkbox
                      onChange={(e) => {
                        handleChecked(e);
                        setIsTaxable(e.target.checked);
                      }}
                      checked={isTaxable}
                    />
                  </Form.Item>
                </div>
                <div className="col-9">
                  <label>Tax No</label>
                  <Form.Item name="tax_no">
                    <InputType
                      value={editpurchasetaxno}
                      onChange={(e) => {
                        seteditpurchasetaxno(e.target.value);
                      }}
                      disabled={isTaxable ? false : true}
                    />
                  </Form.Item>
                </div>

                </div>
                </div>
               
               
                <div className="col-3">
                  <label>Bill No</label>
                  <Form.Item name="bill_no">
                    <InputType
                      value={editpurchasebillno}
                      onChange={(e) => {
                        seteditpurchasebillno(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label> Amount</label>
                  <Form.Item name="amount">
                    <Input_Number
                      // value={editpurchaseamount}
                      // onChange={(e) => {
                      //   seteditpurchaseamount(e.target.value);
                      // }}
                      onChange={(value) => {
                        seteditpurchaseamount(value);
                        setamount(value)
                      }}
                      min={0}
                      precision={2}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Tax Amount</label>
                  <Form.Item name="tax_amount">
                    <Input_Number
                      value={editpurchasetaxamount}
                      onChange={(value) => {
                        seteditpurchasetaxamount(value);
                        setTaxAmount(value)
                      }}
                      disabled={isTaxable ? false : true}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Total Amount</label>
                  <Form.Item name="total_amount">
                    <Input_Number min={0} precision={2} disabled={true} />
                  </Form.Item>
                </div>
                {/* <div className="col-4">
                  <label>Status</label>
                  <Form.Item name="status">
                    <InputType
                      value={editpurchasestatus}
                      onChange={(e) => {
                        seteditpurchasestatus(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div> */}
                <div className="col-8">
                  <label>Remarks</label>
                  <Form.Item name="remarks">
                    <TextArea
                      value={editpurchaseremarks}
                      onChange={(e) => {
                        seteditpurchaseremarks(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Attachments</label>
                  <Form.Item name="attachments" className="mt-2">
                    <FileUpload
                      name="attachments"
                      value={editpurchaseattachments}
                      multiple
                      listType="picture"
                      accept=".png,.jpg,.jpeg"
                      height={100}
                      // onPreview={handlePreview}
                      beforeUpload={false}
                      onChange={(file) => {
                        console.log("Before upload", file.file);
                        console.log("Before upload file size", file.file.size);

                        if (file.file.size > 1000 && file.file.size < 500000) {
                          setImg(file.file.originFileObj);
                          setImgSizeError(false);
                          console.log(
                            "Image must be greater than 1 kb and less than 500 kb"
                          );
                        } else {
                          console.log("failed beacuse of large size");
                          setImgSizeError(true);
                        }
                      }}
                    />
                  </Form.Item>
                  {imgSizeError ? (
                    <div>
                      <label style={{ color: "red" }}>
                        Please Select Image Size under 500kb
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-12 d-flex justify-content-center mt-5">
                  <Button className="save_button">Save</Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
