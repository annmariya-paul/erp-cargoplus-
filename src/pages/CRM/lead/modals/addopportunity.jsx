//Opportunity adding model created 14.10.22 shahida

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Form } from "react-bootstrap";
import { DatePicker, Form, Select } from "antd";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { message } from "antd";
// import TextArea from "antd/lib/input/TextArea";
import "../opportunity_ List/opportunitylist.scss";
import SelectBox from "../../../../components/Select Box/SelectBox";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
// export default function AddOpportunity(props) {
  export default function AddOpportunity() {
  const { id } = useParams();
  console.log("ID is ...", id);

  const [form] = Form.useForm();

  // const typevalues = [
  //   {
  //     value: "sales",
  //     label: "sales",
  //   },
  //   {
  //     value: "support",
  //     label: "support",
  //   },
  //   {
  //     value: "maintenance",
  //     label: "maintenance",
  //   },
  // ];

  const today = new Date().toISOString().split("T")[0];
  const [modalOpportunity, setModalOpportunity] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [date, setDate] = useState();
  console.log(date);
  const [name, setName] = useState();
 
  const [value, setValue] = useState([]);
  const [ShowEditModal, setShowEditModal] = useState(false); //oppertunity edit modal
  const [showProgressModal, setShowProgresssModal] = useState(false); //Oppoertunity progress modal
  const [successPopup, setSuccessPopup] = useState(false); //success popups
  const [showViewModal, setShowViewModal] = useState(false);

  const [amount, setAmount] = useState();
  //  const result=Number(amount).toFixed(2);

  const numberChange = (e) => {
    const float = parseFloat(e.target.value);
    setOppAmount(float.toFixed(2));
  };
  const config = {
    rules: [{ required: true, message: 'Please select Date!' }],
  };
  const [oppoNumber, setOppoNumber] = useState();
  const [opptype, setOppType] = useState(null);
  // console.log(opptype);
  const [oppfrom, setOppFrom] = useState();
  // console.log(oppfrom);
  const [oppId, setOppID] = useState(parseInt(id));
  // console.log(oppId);
  const [oppsource, setOppSource] = useState();
  // console.log(oppsource);
  const [oppparty, setOppParty] = useState();
  // console.log(oppparty);
  // const [date, setDate] = useState(); //for date

  const [oppvalidity, setOppValidity] = useState();
  const [oppamount, setOppAmount] = useState();
  // console.log(typeof oppamount);
  const [oppprobability, setOppProbaility] = useState();
  // console.log(oppprobability);
  const [oppdescription, setOppDescription] = useState();
  // console.log(oppdescription);
  const [oppstatus, setOppStatus] = useState();
  const [leadName, setLeadName] = useState("");
  console.log("lead name :",leadName);
  // console.log(typeof oppstatus);
  const GetLeadData = () => {
    PublicFetch.get(`${CRM_BASE_URL}/lead/${id}`)
      .then((res) => {
        if (res?.data?.success) {
          console.log("Unique Lead Id data", res?.data?.data);
       
          setLeadName(res?.data?.data?.lead_customer_name);
        
         
        } else {
          console.log("FAILED T LOAD DATA");
        }
      })
      .catch((err) => {
        console.log("Errror while getting data", err);
      });
  };

  useEffect(() => {
    GetLeadData();
  }, [id]);

  const oppdata = (data) => {
    console.log("ssss");
    PublicFetch.post(`${CRM_BASE_URL}/opportunity`, {
      opportunity_number: oppoNumber,
      opportunity_type: opptype,
      opportunity_from: oppfrom,
      opportunity_lead_id: oppId,
      opportunity_source: oppsource,
      opportunity_party: name,
      opportunity_validity: date,
      opportunity_amount: oppamount,
      opportunity_probability: oppprobability,
      opportunity_description: oppdescription,
      opportunity_status: oppstatus,
    })
      .then(function (response) {
        console.log("post of opportuity", response);
        if (response.data.success) {
          setOppoNumber();
          setOppType();
          setOppFrom();
          setOppSource();
          setOppParty();
          setDate();
          setOppAmount();
          setOppProbaility();
          setOppDescription();
          setName();
          setAmount();
          setDate();
          setOppValidity();
          setOppID();
          setOppStatus();
          setModalShow(true);
          setShowViewModal(false);
          setShowEditModal(false);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          // props.onCancel();
          form.resetFields();
        } else {
          message.error("fetch data error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    oppdata();
  }, []);

  //API added
  useEffect(() => {
    getAllContact();
  }, []);

  const getAllContact = async () => {
    try {
      const allNames = await PublicFetch.get(`${CRM_BASE_URL}/contact`);
      if (allNames.data.success) {
        setValue(allNames.data.data);
        console.log("hello data names new add content", allNames.data.data);
      } else {
        message.error("fetch data error");
      }
      console.log("All leads res : ", allNames);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  const {
    register,
    // handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setModalShow(false);
      }, time);
    }
  };
  //local storage
  // const submit = (data) => {
  //   console.log(data);
  //   localStorage.setItem("Form", JSON.stringify(data));
  //   setModalShow(true);
  //   close_modal(modalShow, 1200);
  //   props.onHide();
  //   reset();
  // };

  return (
    <>
      {/* <Custom_model
        //  Adding_contents
        width={900}
        // Adding_contents
        // visible={props.modalOpportunity}
        show={props.modalOpportunity}
        onHide={props.onCancel}
        // header="Add Opportunity"
        header="Add Opportunity"
        centered
        footer={false}
        View_list
        list_content={
          <> */}
           <div className="container-fluid">
        <div className="row justify-content-md-center">
        <div className="content-tabs">
            <Form form={form}>
              <div className="px-5">
                <h5 className="lead_text mt-3">Add Opportunity</h5>
                <div className="row px-1">
                  {/* <div className="col-sm-4 pt-2">
                    <label>Opportunity No.</label>
                    <Form.Item
                      name="oppoNumber"
                    >
                      <InputType
                        value={oppoNumber}
                        onChange={(e) => setOppoNumber(e.target.value)}
                      />
                    </Form.Item>
                  </div> */}
                  <div className="col-sm-4 pt-2">
                    <label>Type<span className="required">*</span></label>
                    <Form.Item
                      name="lead_type"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a value",
                        },
                      ]}
                    >
                      <SelectBox
                        placeholder={"--Please Select--"}
                        value={opptype}
                        onChange={(e) => setOppType(e)}
                      >
                        <Select.Option value="sales">sales</Select.Option>
                        <Select.Option value="support">support</Select.Option>
                        <Select.Option value="maintenance">
                          maintenance
                        </Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 pt-2">
                    <label>From<span className="required">*</span></label>
                    <Form.Item
                      name="lead_customer_from"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a value",
                        },
                      ]}
                    >
                      <SelectBox
                        placeholder={"--Please Select--"}
                        value={oppfrom}
                        onChange={(e) => setOppFrom(e)}
                      >
                        <Select.Option value="customer">customer</Select.Option>
                        <Select.Option value="lead">lead</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 pt-2">
                    <label>Generated/Converted by</label>
                    <Form.Item
                      name="lead_customer_generated"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please select an option",
                      //   },
                      // ]}
                    >
                      <SelectBox
                      // defaultValue={defaultValue}
                        // placeholder={"--Please Select--"}
                        disabled={true}
                        defaultValue={leadName}
                      >
                        <Select.Option value="oppId">{leadName}</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 pt-2">
                    <label>Source<span className="required">*</span></label>
                    <Form.Item
                      name="lead_source"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a value",
                        },
                      ]}
                    >
                      <SelectBox
                        placeholder={"--Please Select--"}
                        value={oppsource}
                        onChange={(e) => setOppSource(e)}
                      >
                        <Select.Option value="reference">
                          reference
                        </Select.Option>
                        <Select.Option value="direct visit">
                          direct visit
                        </Select.Option>
                        <Select.Option value="online registration">
                          online registration
                        </Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 pt-2">
                    <label>Party<span className="required">*</span></label>
                    <Form.Item
                      name="lead_party"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a value",
                        },
                      ]}
                    >
                      <SelectBox
                        placeholder={"--Please Select--"}
                        value={name}
                        onChange={(e) => setName(parseInt(e))}
                      >
                        {value &&
                          value.length > 0 &&
                          value.map((item, index) => {
                            if (id == item.contact_lead_id) {
                              return (
                                <option
                                  key={item.contact_id}
                                  value={item.contact_id}
                                >
                                  {item.contact_person_name}
                                </option>
                              );
                            }
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 pt-2">
                    <label>Valid Up to<span className="required">*</span></label>
                    <Form.Item className="mt-2" name="lead_valid_up_to"  {...config}>
                
                      {/* <SelectBox placeholder={"--Please Select--"} value={oppId}>
                    <Select.Option value="oppId">{oppId}</Select.Option>
                  </SelectBox> */}
                      <DatePicker
                      format={"DD-MM-YYYY"}
                        style={{ borderWidth: 0 }}
                        //  disabledDate={today}
                        disabledDate={(d) => !d || d.isBefore(today)}
                        onChange={(e) => {
                          console.log("date mmm", e);
                          setDate(e);
                        }}
                      />
                    </Form.Item>
                  </div>

                 

                  <div className="col-sm-4 pt-2">
                    <label>Expecting Amount</label>
                    <Form.Item
                      name="lead_expecting_amt"
                      // type="number"
                      rules={[
                        {
                          pattern: new RegExp("^[0-9.]+$"),
                          message: "Please enter a valid amount",
                        },
                      ]}
                    >
                      <InputType
                        value={oppamount}
                        // onBlur={ float = parseFloat(e.target.value),
                        //   setOppAmount(float.toFixed(2))}
                        onChange={(e) =>
                          setOppAmount(parseFloat(e.target.value).toFixed(2))
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 pt-2">
                    <label>Probability of conversion<span className="required">*</span></label>
                    <Form.Item
                      name="lead_probability"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a value",
                        },
                      ]}
                    >
                      <SelectBox
                        placeholder={"--Please Select--"}
                        value={oppprobability}
                        onChange={(e) => setOppProbaility(e)}
                      >
                        <Select.Option value="L">Low</Select.Option>
                        <Select.Option value="M">Medium</Select.Option>
                        <Select.Option value="H">High</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                  <div className="col-sm-4 pt-2">
                    <label>Status<span className="required">*</span></label>
                    <Form.Item
                      name="lead_status"
                      rules={[
                        {
                          required: true,
                          message: "Please Select a value",
                        },
                      ]}
                    >
                      <SelectBox
                        placeholder={"--Please Select--"}
                        value={oppstatus}
                        onChange={(e) => setOppStatus(e)}
                      >
                        <Select.Option value={1}>quotation</Select.Option>
                        <Select.Option value={2}>interested</Select.Option>
                        <Select.Option value={3}>converted</Select.Option>
                        <Select.Option value={4}>lost</Select.Option>
                        <Select.Option value={5}>DND</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>

                  <div className="col-sm-12 pt-2">
                    <label>Details<span className="required">*</span></label>
                    <Form.Item
                      className="mt-2"
                      name="lead_details"
                      rules={[
                        {
                          required: true,
                          message: "Please enter valid details",
                        },
                      ]}
                    >
                      <TextArea
                        value={oppdescription}
                        onChange={(e) => setOppDescription(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="col-12 d-flex justify-content-center pt-2">
                <Button btnType="save" onClick={oppdata}>
                  Save
                </Button>
              </div>
            </Form>
          {/* </>
        }
        // {...props}
      ></Custom_model> */}
      <Custom_model
        size={`sm`}
        success
        show={modalShow}
        onHide={() => setModalShow(false)}
        footer={false}
      />
      </div>
       </div>
      </div>
    </>
  );
}
