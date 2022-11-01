//Opportunity adding model created 14.10.22 shahida

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import { message } from "antd";


export default function AddOpportunity(props) {
  const { id } = useParams();
 console.log("ID is ...",id);
 
 

  const today = new Date().toISOString().split("T")[0];
  const [modalOpportunity, setModalOpportunity] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [date, setDate] = useState();
  console.log(date);
  const [name, setName] = useState();
 const [value, setValue] = useState([]);
 const [ShowEditModal, setShowEditModal] = useState(false); //oppertunity edit modal
 const [showProgressModal, setShowProgresssModal] = useState(false); //Oppoertunity progress modal
 const [successPopup, setSuccessPopup] = useState(false); //success popups
 const [showViewModal, setShowViewModal] = useState(false);

 const [amount,setAmount]=useState();
//  const result=Number(amount).toFixed(2);

const onBlur = (e) => {
  const float = parseFloat(e.target.value)
  setOppAmount(float.toFixed(2))
}


  const [opptype, setOppType] = useState();
  console.log(opptype);
  const [oppfrom, setOppFrom] = useState();
  console.log(oppfrom);
  const [oppId, setOppID] = useState(parseInt(id));
  console.log(oppId);
  const [oppsource, setOppSource] = useState();
  console.log(oppsource);
  const [oppparty, setOppParty] = useState();
  console.log(oppparty);
  // const [date, setDate] = useState(); //for date



  const [oppvalidity, setOppValidity] = useState();
  const [oppamount, setOppAmount] = useState();
  console.log(oppamount);
  const [oppprobability, setOppProbaility] = useState();
  console.log(oppprobability);
  const [oppdescription, setOppDescription] = useState();
  console.log(oppdescription);
  const [oppstatus, setOppStatus] = useState();
  console.log(typeof oppstatus);
 
  const oppdata = (data) => {
    console.log("ssss")
    PublicFetch.post(`${CRM_BASE_URL}/opportunity/basic`, {
    
      opportunity_type: opptype,
      opportunity_from: oppfrom,
      opportunity_lead_id:oppId,
      opportunity_source: oppsource,
      opportunity_party: name,
      opportunity_validity: date,
      opportunity_amount: oppamount,
      opportunity_probability: oppprobability,
      opportunity_description: oppdescription,
      opportunity_status:oppstatus,
     
    }).then(function (response) {
      console.log("post of opportuity", response);
      if (response.data.success) {
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
        props.onHide();
        reset();
      } else {
        message.error("fetch data error");
      }
    })
    .catch(function (error) {
      console.log(error);
    })
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
      const allNames = await PublicFetch.get(`${CRM_BASE_URL}/lead/${id}/contact`);
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
      <Custom_model
        Adding_contents
        show={modalOpportunity}
        onHide={() => setModalOpportunity(false)}
        header="Add Opportunity"
        size={`xl`}
       
        {...props}
      >
        
          <div className="px-5">
            <div className="row px-1">
              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_type">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    aria-label="lead_type"
                    name="lead_type"
                    value={opptype}
                    onChange={(e) => setOppType(e.target.value)}
                  >
                    <option value="sales">
                      sales
                    </option>
                    <option value="support">support</option>
                    <option value="maintenance">maintenance</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_customer_from">
                  <Form.Label>From</Form.Label>
                  <Form.Select
                    aria-label="lead_customer_from"
                    name="lead_customer_from"
                    value={oppfrom}
                    onChange={(e)=>setOppFrom(e.target.value)}
                  >
                   

                    <option value="customer" >
                      customer
                    </option>
                    <option value="lead">lead</option>
                  </Form.Select>

                 
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group
                  className="mb-2"
                  controlId="lead_customer_generated"
                >
                  <Form.Label>Generated/Converted by</Form.Label>
                  <Form.Control
                    type="text"
                    name="lead_customer_generated"
                   value={oppId}
           
                   
                  />
                 
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_source">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    aria-label="lead_source"
                    name="lead_source"
                    value={oppsource}
                    onChange={(e)=>setOppSource(e.target.value)}
                  >
                    <option value="reference" >
                      reference
                    </option>
                    <option value="direct visit">direct visit</option>
                    <option value="online registration">
                      online registration
                    </option>
                  </Form.Select>
                </Form.Group>
              </div>
{/* upadations on fetching data from api 21.10.22 shahida */}
              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_party">
                  <Form.Label>Party</Form.Label>
                  <Form.Select
                   
                    // value={name}
                    onChange={(e) => setName(parseInt(e.target.value))}
                    aria-label="lead_party"
                    name="lead_party"
                    
                  // value={oppparty}
                  // onChange={(e)=>{
                  //   console.log(e.target.value);
                  //   setOppParty(e.target.value)}}
                 
                  >
                    {value &&
                      value.map((item, index) => (
                        <option key={item.contact_id} value={item.contact_id}>
                          {item.contact_person_name}
                        </option>
                      ))}
                 </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_valid_up_to">
                  <Form.Label>Valid Up to</Form.Label>
                  <div className="form-control">
                    <input
                     type="date"
                     
                      style={{ borderWidth: 0 }}
                      // onChange={(date) => setDate(date)}
                      min={today}
                      // value={oppvalidity}
                      onChange={(e)=>{console.log("date mmm",e.target.value);
                      setDate(e.target.value) }
                       }
                    
                    />
                  </div>
                </Form.Group>
              </div>

              <div className="col-sm-8 pt-3">
                <Form.Group className="mb-2" controlId="lead_details">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={oppdescription}
                    onChange={(e)=>setOppDescription(e.target.value)}
                  
                   
                  />
                  
                 
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-3">
                <Form.Group className="mb-2" controlId="lead_expecting_amt">
                  <Form.Label>Expecting Amount</Form.Label>
                  <Form.Control
                   type="number"
                    value={oppamount}
                    // onChange={(e) => setOppAmount(e.target.value)}
                    onBlur={onBlur}
                    // {...register("lead_expecting_amt", {
                    //   maxLength: {
                    //     value: 100,
                    //   },
                    //   pattern: {
                    //     value: /^[1-9]\d*(\.\d+)?$/,
                    //     message: "Please enter a valid amount!",
                    //   },
                    // })}
                  // onBlur={result}
                    // onKeyUp={() => {
                    //   trigger("lead_expecting_amt");
                    // }}
                    // className={`${errors.lead_expecting_amt && "invalid"}`}
                  />
                  
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_probability">
                  <Form.Label>Probability of conversion</Form.Label>
                  <Form.Select
                    aria-label="lead_probability"
                    name="lead_probability"
                    value={oppprobability}
                    onChange={(e)=>setOppProbaility(e.target.value)}
                  >
                    <option value="L">
                      Low
                    </option>
                    <option value="M">Medium</option>
                    <option value="H">High</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-sm-4 pt-2">
                <Form.Group className="mb-2" controlId="lead_status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    aria-label="lead_status"
                    name="lead_status"
                    value={oppstatus}
                    onChange={(e)=>setOppStatus(parseInt(e.target.value) )}
                  >
                    <option value="1">
                      quotation
                    </option>
                    <option value="2">interested</option>
                    <option value="3">converted</option>
                    <option value="4">lost</option>
                    <option value="5">DND</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div>
          <button onClick={oppdata} >Save</button>
        
      </Custom_model>
      <Custom_model
        centered
        size={`sm`}
        success
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
