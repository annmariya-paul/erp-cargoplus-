import { Form, Checkbox, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import { TreeSelect } from "antd";
import moment from "moment";
import "../../../../components/custom_modal/custom_model.scss";
import Input_Number from "../../../../components/InputNumber/InputNumber"; 

import FileUpload from "../../../../components/fileupload/fileUploader";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import { ACCOUNTS, CRM_BASE_URL_PURCHASING } from "../../../../api/bootapi";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../../routes";
import SelectBox from "../../../../components/Select Box/SelectBox";

export default function Add_purchase() {
  const navigate = useNavigate();

  const [addform] = Form.useForm();
  const [purchase_date, setPurchasedate] = useState("");
  const [due_date, setDue_date] = useState("");
  const [img, setImg] = useState([]);
  const [imgSizeError, setImgSizeError] = useState(false);
  const [remarks, setRemarks] = useState("");
  const newDate = new Date();
  const [selectedDate, setSelectedDate] = useState();


  const [successModal, setSuccessModal] = useState();

  const [purchasePoNo, setPurchasePoNo] = useState();
  const [creditdays, setCreditdays] = useState();
  const [taxno, setTaxNo] = useState();
  const [billno, setBillNo] = useState();
  const [amount, setAmount] = useState();
  const [taxamount, setTaxAmount] = useState(0);
  const [totalamount, setTotalAmount] = useState();
  const [paymentmode, setPaymentmode] = useState();
  const [taxable, setTaxable] = useState();
  const [attachments, setAttachment] = useState();

  const [allvendors, setAllVendors] = useState();
  const [allpayments, setallpayments] = useState();
  const [vendorid,setvendorid]=useState("")
  const[purchases,setpurchases]=useState();

  const [isTaxable, setIsTaxable] = useState(false);

  // const[pay]
  const [currencyDefault, setCurrencyDefault] = useState();
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessModal(false);
        // navigate(ROUTES.VIEW_PURCHASE);
      }, time);
    }
  };
  const getpayments = async () => {
    try{
      const getpayment = await PublicFetch.get(
        `${ACCOUNTS}/payment-modes`,

      )
      console.log("res",getpayment);
      if(getpayment?.data.success){
        setallpayments(getpayment?.data?.data)
      }
    }catch(err){
      console.log(err);
    }
  }
  let TaxAmount = (amount * taxamount) / 100;

  let total = amount + taxamount;
  addform.setFieldsValue({
    totalamount: total,
  });

  console.log("tax amount", TaxAmount);



  const getvendors = async () =>{
    try{
      const getvendorss = await PublicFetch.get(
        `${CRM_BASE_URL_PURCHASING}/vendors`,
      )
    console.log("response", getvendorss);
    if(getvendorss?.data.success){
      setAllVendors(getvendorss?.data?.data)
     
      setvendorid(getvendorss?.data?.data.vendor_id)
      console.log("idddsss",getvendorss?.data?.data)
    }
    }catch(err){
        console.log(err);
      }
  }


  const handleChecked = (e) => {
    if (e.target.checked) {
      addform.setFieldsValue({ purchase_taxable: 1 });
    } else {
      addform.setFieldsValue({ purchase_taxable: 0 });
    }
  };


  const createPurchase = async (data) => {
    let a = parseInt(data.istaxable)
    let b = parseInt(data.totalamount)

    console.log("aaa",a);

    console.log("ddd", data);
    const formData = new FormData();
    formData.append("purchase_po_no", purchasePoNo);
    formData.append("purchase_vendor_id", vendorid);
    formData.append("purchase_amount", amount);
    formData.append("purchase_purchase_date", purchase_date);
    formData.append("purchase_tax_no", taxno);
    formData.append("purchase_bill_no", billno);
    formData.append("purchase_tax_amount", taxamount);
    formData.append("purchase_payment_mode", paymentmode);
    formData.append("purchase_credit_days", creditdays);
    formData.append("purchase_remarks", remarks);
    formData.append("purchase_taxable", a);
    formData.append("attachments", attachments?.file?.originFileObj);
    formData.append("purchase_total_amount", b);
    formData.append("purchase_due_date", due_date);
    try {
      const addpurchase = await PublicFetch.post(
        `${ACCOUNTS}/purchase`,
        formData,
        {
          "Content-Type": "Multipart/form-Data",
        }
      );

      console.log("purchase added successfully", addpurchase);
      if (addpurchase.data.success) {
        setPurchasePoNo();
        setCreditdays();
        setTaxNo();
        setBillNo();
        setTaxAmount();
        setTotalAmount();
        setPaymentmode();
        setTaxable();
        setDue_date();
        setPurchasedate();
        setRemarks();
        setAttachment();
        setvendorid();

        addform.resetFields()
        setSuccessModal(true);
        // getallpurchase();
        addform.resetFields();
        // setModalpaymentmode(false);
        // close_modal(successPopup, 1000);
        close_modal(successModal, 1200);
        // console.log("Success", res.data.data);
      }
    } catch (err) {
      console.log("err to add the purchase", err);
    }
  };
  addform.setFieldsValue({ istaxable: 0 });

  useEffect(()=> {
    getvendors()
    getpayments()
  },[])
  return (
    <div>
      <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <div closeButton>
              <h5 className="modal-title w-100">Add Purchase</h5>
            </div>
            <Form
              name="addForm"
              form={addform}
              onFinish={(data) => {
                console.log("val", data);
                createPurchase(data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-4">
                <div className="col-4">
                  <label>Po Reference</label>
                  <Form.Item name="purchasePoRef">
                    <InputType
                      value={purchasePoNo}
                      onChange={(e) => {
                        setPurchasePoNo(e.target.value);
                        console.log("purchasePoNo", purchasePoNo);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Purchase Date</label>
                  <Form.Item name="purchase_date" className="mt-2"
                   rules={[
                     {
                       required: true,
                       message: "Date is Required",
                     },
                   ]}>
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      defaultValue={moment(newDate)}
                      value={purchase_date}
                      onChange={(e) => {
                        setPurchasedate(e);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Due Date</label>
                  <Form.Item name="due_date" className="mt-2">
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      // defaultValue={moment(newDate)}
                      value={due_date}
                      onChange={(e) => {
                        setDue_date(e);
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="col-4">
                  <label>Vendor</label>
                  <Form.Item className="mt-2" name="vendor"
                    rules={[
                      {
                        required: true,
                        message: "Date is Required",
                      },
                    ]}>
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
                          console.log("itm",item)
                          return(
                            <Select.Option
                            key={item.vendor_id}
                            id={item.vendor_id}
                            value={item.vendor_id}
                          >
                            {item.vendor_name}
                          </Select.Option>
                          )
                         ;
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>

                <div className="col-4">
                  <label>Payment Mode</label>
                  <Form.Item className="mt-2" name="payment_mode">
                    <SelectBox
                    showSearch={true}
                    allowClear
                    value={paymentmode}
                    optionFilterProp="children"
                    onChange={(e) => {
                     setPaymentmode(e);
                    }}
                    >
                    {allpayments &&
                        allpayments.length > 0 &&
                        allpayments.map((item, index) => {
                          return(
                            <Select.Option
                            key={item.pay_mode_id}
                            id={item.pay_mode_id}
                            value={item.pay_mode_id}
                          >
                            {item.pay_mode_name}
                          </Select.Option>
                          )
                         ;
                        })}
                    </SelectBox>
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Credit Days</label>
                  <Form.Item className="mt-2" name="creditdays">
                    <InputType
                      value={creditdays}
                      onChange={(e) => {
                        setCreditdays(e.target.value);
                        // console.log("name name",name);
                      }}
                    />
                  </Form.Item>
                </div>

                <div
                  className="col-sm-4 pt-3 "
                  //  key={index.id}
                >
                  <label>Taxable</label>
                  <div className="">
                    <Form.Item name="istaxable" className="mt-2">
                      <Checkbox
                        onChange={(e) => {
                          handleChecked(e);
                          setIsTaxable(e.target.checked);
                          console.log("checked is", e);
                        }}
                      ></Checkbox>
                    </Form.Item>
                  </div>
                </div>

                <div className="col-4">
                  <label>Tax No</label>
                  <Form.Item className="mt-2" name="taxno">
                    <InputType
                      value={taxno}
                      onChange={(e) => {
                        setTaxNo(e.target.value);
                        // console.log("name name",name);
                      }}
                      disabled={isTaxable ? false : true} 
                    />
                    
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Bill No</label>
                  <Form.Item className="mt-2" name="billno">
                    <InputType
                      value={billno}
                      onChange={(e) => {
                        setBillNo(e.target.value);
                        // console.log("name name",name);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Amount</label>
                  <Form.Item className="mt-2" name="amount">
                    {/* <InputType
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        // console.log("name name",name);
                      }}
                      
                    /> */}
                    <Input_Number
                          onChange={(value) => {
                            setAmount(value);
                          }}
                          min={0}
                          precision={2}
                          control={true}
                        />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Tax Amount</label>
                  <Form.Item className="mt-2" name="taxamount">
                    {/* <InputType
                      value={taxamount}
                      onChange={(e) => {
                        setTaxAmount(e.target.value);
                        // console.log("name name",name);
                      }}
                    /> */}

                    <Input_Number
                          disabled={isTaxable ? false : true}
                          onChange={(value) => {
                            setTaxAmount(value);
                          }}
                          min={0}
                          precision={2}
                        />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <label>Total Amount</label>
                  <Form.Item className="mt-2" name="totalamount">
                    <Input_Number
                      min={0}
                      precision={2}
                      disabled={true} 
                    />
                  </Form.Item>
                </div>

                {/* <div className="row"> */}
                <div className="col-8 ">
                  <label> Remarks</label>
                  <div>
                    <Form.Item
                      className="mt-2"
                      name="remarks"
                      onChange={(e) => {
                        setRemarks(e.target.value);
                        // console.log("name name",name);
                      }}
                    >
                      <TextArea
                        value={remarks}
                        onChange={(e) => {
                          setRemarks(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                {/* </div> */}

                <div className="col-4">
                  <label>Attachments</label>
                  <Form.Item name="attachments" className="mt-2">
                    <FileUpload
                      name="attachments"
                      value={attachments}
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

                <div className="row justify-content-center ">
                  <div className="col-auto">
                    <Button btnType="save">Save</Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
