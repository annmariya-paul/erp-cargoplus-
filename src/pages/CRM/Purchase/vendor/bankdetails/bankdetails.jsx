import React, { useEffect, useState } from "react";
import { Checkbox, Form } from "antd";
import { useForm } from "react-hook-form";
import InputType from "../../../../../components/Input Type textbox/InputType";
import SelectBox from "../../../../../components/Select Box/SelectBox";
import Custom_model from "../../../../../components/custom_modal/custom_model";
import Button from "../../../../../components/button/button";
import TableData from "../../../../../components/table/table_data";
import { AiOutlinePlus } from "react-icons/ai";
import { CRM_BASE_URL_PURCHASING } from "../../../../../api/bootapi";
import PublicFetch from "../../../../../utils/PublicFetch";
import { FaEdit, FaTrash } from "react-icons/fa";
import { message, Popconfirm } from "antd";
function Bankdetails({ vendor, toggle }) {
  const [successPopup, setSuccessPopup] = useState(false);
  const [addForm] = Form.useForm();
  const [serialNo, setserialNo] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [vendorId, setvendorId] = useState();
  const [bnkdetails, setbnkdetails] = useState();

  const [editForm] = Form.useForm();
  const [editmodalShow, seteditModalShow] = useState(false);
  const [bnkdetailid, setbnkdetailid] = useState("");
  const [bankdefault, setbankdefault] = useState(0);
  const [editbankdefault, seteditbankdefault] = useState(0);

  const [successmsg, setSuccessmsg] = useState(false);

  const handleEditedclick = (e) => {
    console.log("bankdataa", e);

    setbnkdetailid(e.vend_bankdetail_id);
    seteditbankdefault(e.vend_bankdefault);
    editForm.setFieldsValue({
      editvend_accname: e.vend_account_name,
      editvend_bankname: e.vend_account_bnk,
      editvend_accno: e.vend_account_no,
      editvend_branchname: e.vend_branchname,
      editvend_ibanno: e.vend_account_iban,
      // editvend_defaultbnk:e.vend_bankdefault,
    });
    seteditModalShow(true);
  };

  const handleChecked = (e, key) => {
    console.log("isChecked", e);
    if (e.target.checked) {
      console.log("suceccss checked", e.target.checked);
      setbankdefault(1);
    }
    else{
      setbankdefault(0)
    }
  };

  const handleCheckededit = (e, key) => {
    console.log("isChecked", e);
    if (e.target.checked) {
      console.log("suceccss checked", e.target.checked);
      seteditbankdefault(1);
    }
    else{
      seteditbankdefault(0)
    }
  };

  const Getvendordata = () => {
    PublicFetch.get(`${CRM_BASE_URL_PURCHASING}/vendors/${vendor?.vendor_id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("one vendor dataa bnk", res?.data?.data);
          // setOneLeadData(res?.data?.data);
          setvendorId(res?.data?.data?.vendor_id);
        } else {
          console.log("FAILED TO LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Error while getting data", err);
      });
  };
  console.log("bnkkkvendeor id iss", vendor?.vendor_id);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        // setTimeOuts(true);
        // console.log("ediittt",venderdata)
        // setVendorId(venderdata);
      }, time);
    }
  };

  const getvendorbankdetails = async () => {
    try {
      const allvendortypes = await PublicFetch.get(
        `${process.env.REACT_APP_BASE_URL}/crm/purchase/v1/vendor-bank-details`
      );
      console.log("getting all  vendorbankdetails", allvendortypes);
      if (allvendortypes.data.success) {
        let array = [];
        allvendortypes?.data?.data?.forEach((item, index) => {
          // setContactCustomerId(item?.contact_customer_id);
          // console.log("Lead Id : ", CustomerId);
          if (vendor?.vendor_id === item?.ven_bank_det_vendor_id) {
            console.log("bank in one vendorr", item);
            array.push({
              vend_account_name: item?.ven_bank_det_account_name,
              vend_account_no: item?.ven_bank_det_account_no,
              vend_account_bnk: item?.ven_bank_det_bank,
              vend_account_iban: item?.ven_bank_det_IBAN,
              vend_bankdetail_id: item?.ven_bank_det_id,
              vend_branchname: item?.ven_bank_det_branch,
              vend_bankdefault: item?.ven_bank_det_default,
            });
          }
        });
        setbnkdetails([...array]);
      }
      // setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendorbankdetails", err);
    }
  };

  const createvendorbankdetails = async (data) => {
    try {
      const addvendorbnkdetails = await PublicFetch.post(
        `${process.env.REACT_APP_BASE_URL}/crm/purchase/v1/vendor-bank-details`,
        {
          ven_bank_det_account_name: data.vend_accname,
          ven_bank_det_account_no: data.vend_accno,
          ven_bank_det_bank: data.vend_bankname,
          ven_bank_det_IBAN: data.vend_ibanno,
          ven_bank_det_branch: data.vend_branchname,
          ven_bank_det_default: bankdefault,
          ven_bank_det_vendor_id: vendor?.vendor_id,
        }
      );
      console.log(
        "successfully addinggg vendorbankdetails",
        addvendorbnkdetails
      );
      if (addvendorbnkdetails.data.success) {
        getvendorbankdetails();
        setModalShow(false);
        addForm.resetFields();
        setSuccessPopup(true);
        close_modal(successPopup, 1000);
      }
      // setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendorbankdetails", err);
    }
  };

  const updatevendorbankdetails = async (data) => {
    try {
      const editvendorbnkdetails = await PublicFetch.patch(
        `${process.env.REACT_APP_BASE_URL}/crm/purchase/v1/vendor-bank-details/${bnkdetailid}`,
        {
          ven_bank_det_account_name: data.editvend_accname,
          ven_bank_det_account_no: data.editvend_accno,
          ven_bank_det_bank: data.editvend_bankname,
          ven_bank_det_IBAN: data.editvend_ibanno,
          ven_bank_det_branch: data.editvend_branchname,
          ven_bank_det_default: editbankdefault,
          ven_bank_det_vendor_id: vendor?.vendor_id,
        }
      );
      console.log(
        "successfully updated vendorbankdetails",
        editvendorbnkdetails
      );
      if (editvendorbnkdetails?.data?.success) {
        getvendorbankdetails();
        seteditModalShow(false);
        //  addForm.resetFields()
        setSuccessPopup(true);
        close_modal(successPopup, 1000);
      }
      // setvendortypes(allvendortypes.data.data);
    } catch (err) {
      console.log("error to fetching  vendorbankdetails", err);
    }
  };

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: " ACCOUNT NAME",
      dataIndex: "vend_account_name",
      key: "contact_email",
    },
    {
      title: "ACCOUNT NO",
      dataIndex: "vend_account_no",
      key: "contact_email",
    },
    {
      title: "BANK NAME",
      dataIndex: "vend_account_bnk",
      key: "contact_phone_1",
    },
    {
      title: "IBAN NO",
      dataIndex: "vend_account_iban",
      key: "contact_phone_2",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: "15%",
      render: (data, index) => {
        return (
          <div className="d-flex justify-content-center gap-2">
            <div className="editcolor">
              <FaEdit onClick={() => handleEditedclick(index)} />
            </div>
            <div className="editcolor">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  useEffect(() => {
    getvendorbankdetails();
    if (vendor?.vendor_id) {
      // getallvendorbankdetails();
      Getvendordata();
    }
  }, [vendorId, vendor?.vendor_id]);

  useEffect(() => {
    if (toggle == true && bnkdetails?.length <= 0) {
      setModalShow(true);
      console.log("this ais test", modalShow);
    }
  }, [toggle, bnkdetails?.length]);

  console.log("vendorbankk id iss", vendor?.vendor_id);

  const confirm = (e) => {
    // console.log(e);
    // message.success("Click on Yes");
    setbankdefault(1)
  };

  const cancel = (e) => {
    // console.log(e);
    // message.error("Click on No");
    setbankdefault(0)
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Button btnType="add" onClick={() => setModalShow(true)}>
            New Bank Details 
          </Button>
        </div>
      </div>
      <div className="datatable">
        <TableData
          data={bnkdetails}
          columns={columns}
          custom_table_css="contact_table"
        />
      </div>

      <Custom_model
        bodyStyle={{ height: 580, overflowY: "auto" }}
        show={modalShow}
        onHide={() => setModalShow(false)}
        View_list
        footer={false}
        //  {...props}
        list_content={
          <>
            <div className="row ">
              <h5 className="lead_text">New Bank Details </h5>
            </div>
            <Form
              form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
                createvendorbankdetails(values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              {/* <div className="row py-5 px-1"> */}
                <div className="col-sm-12  ">
                  <label>Account Name</label>
                  <Form.Item name="vend_accname">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-12  mt-3">
                  <label>Account No</label>
                  <Form.Item name="vend_accno">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-12   mt-3">
                  <label>Bank Name</label>
                  <Form.Item name="vend_bankname">
                    <InputType />
                  </Form.Item>
                </div>

                <div className="col-sm-12  mt-3">
                  <label>Branch Name</label>
                  <Form.Item name="vend_branchname">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-12  mt-3">
                  <label>IBAN No</label>
                  <Form.Item name="vend_ibanno">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-12  mt-3">
                  <label>Default Bank</label>
                  <div>
                    <Form.Item name="vend_defaultbnk">
                      <Popconfirm
                        title="Are you sure to setdefault?"
                        // description="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Checkbox
                          onChange={handleChecked}
                          checked={bankdefault === 1 ? true : false}
                        ></Checkbox>
                      </Popconfirm>
                    </Form.Item>
                  </div>
                </div>

                <div className=" pt-4 d-flex justify-content-center">
                  <Button type="submit" className="qtn_save" btnType="save">
                    Save
                  </Button>
                  <Custom_model
                    centered
                    size={`sm`}
                    success
                    show={successPopup}
                    onHide={() => setSuccessPopup(false)}
                  />
                </div>
              {/* </div> */}
            </Form>
          </>
        }
      />

      <Custom_model
        bodyStyle={{ height: 580, overflowY: "auto" }}
        show={editmodalShow}
        onHide={() => seteditModalShow(false)}
        View_list
        footer={false}
        //  {...props}
        list_content={
          <>
            <div className="row ">
              <h5 className="lead_text">New Bank Details </h5>
            </div>
            <Form
              form={editForm}
              onFinish={(values) => {
                console.log("values iss", values);
                updatevendorbankdetails(values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              {/* <div className="row py-5 px-1"> */}
                <div className="col-sm-12 pb-2 ">
                  <label>Account Name</label>
                  <Form.Item name="editvend_accname">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-12 pb-2">
                  <label>Account No</label>
                  <Form.Item name="editvend_accno">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-12 pb-2  mt-2">
                  <label>Bank Name</label>
                  <Form.Item name="editvend_bankname">
                    <InputType />
                  </Form.Item>
                </div>

                <div className="col-sm-12 pb-2 mt-2">
                  <label>Branch Name</label>
                  <Form.Item name="editvend_branchname">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-12 pb-2 mt-2">
                  <label>IBAN No</label>
                  <Form.Item name="editvend_ibanno">
                    <InputType />
                  </Form.Item>
                </div>
                <div className="col-sm-12 pt-2 pb-2 mt-2">
                  <label>Default Bank</label>
                  <div>
                    <Form.Item name="editvend_defaultbnk">
                      <Checkbox
                        onChange={handleCheckededit}
                        checked={editbankdefault === 1 ? true : false}
                      ></Checkbox>
                    </Form.Item>
                  </div>
                </div>

                <div className=" pt-4 d-flex justify-content-center">
                  <Button type="submit" className="qtn_save" btnType="save">
                    Save
                  </Button>
                </div>
              {/* </div> */}
            </Form>
          </>
        }
      />

      <Custom_model
        centered
        size={`sm`}
        success
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
      />
      {/* <Custom_model
                    centered
                    size={`sm`}
                    success
                    show={successmsg}
                    onHide={() => setSuccessmsg(false)}
                  /> */}
    </>
  );
}
export default Bankdetails;
