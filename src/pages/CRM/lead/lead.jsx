import React, { useEffect, useState } from "react";
import "./lead.styles.scss";
import { Form } from "react-bootstrap";
import Button from "../../../components/button/button";
import { ROUTES } from "../../../routes";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import {  BsPlusCircleFill } from "react-icons/bs";
import FileUpload from "../../../components/fileupload/fileUploader";
import ContactTable from "./tables/contactstable";
import AddressTable from "./tables/addresstable";
import AddAddress from "./modals/addaddress";
import AddContact from "./modals/addcontact";
import AddOpportunity from "./modals/addopportunity";
import PublicFetch from "../../../utils/PublicFetch";
import { LeadStatus } from "../../../utils/leadStatus";
import { CRM_BASE_URL } from "../../../api/bootapi";
// import ErrorMsg from "../../components/errormessage";
import Countrystate from "./location/countryselect";
import Custom_model from "../../../components/custom_modal/custom_model";

function Lead() {
  const [toggleState, setToggleState] = useState(1);
  const [basicinfoData, setBasicinfoData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalAddress, setModalAddress] = useState(false);
  const [modalOpportunity, setModalOpportunity] = useState(false);
  const [leadType, setLeadType] = useState();
  const [leadName, setLeadName] = useState();
  const [leadUsertype, setLeadUsertype] = useState();
  const [leadOrganization, setLeadOrganization] = useState();
  const [leadSource, setLeadSource] = useState();
  const [leadDescription, setLeadDescription] = useState();
  const [leadAttachment, setLeadAttachment] = useState();
  const [leadStatus, setLeadStatus] = useState();

  const [error, setError] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   trigger,
  // } = useForm();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setModalShow(false);
      }, time);
    }
  };

  const Submit = (data) => {
    const formData = new FormData();
    formData.append("lead_type", leadType);
    formData.append("lead_customer_name", leadName);
    formData.append("lead_user_type", leadUsertype);
    formData.append("lead_user_type", leadOrganization);
    formData.append("lead_source", leadSource);
    formData.append("lead_description", leadDescription);
    formData.append("attachments", leadAttachment);
    formData.append("lead_status", leadStatus);
    //  console.log(data);
    PublicFetch.post(`${CRM_BASE_URL}/lead/basic`, data)
      .then(function (response) {
        console.log("hello", response);
        setModalShow(true);
        close_modal(modalShow, 1000);
        setModalContact(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    Submit();
  }, []);
  // const Submit = (data) => {
  //   console.log(data);
  //   if (data) {
  //     localStorage.setItem("Form", JSON.stringify(data));
  //     reset();
  //   } else {
  //     setError(true);
  //   }
  // };

  return (
    <>
      <div className="container-fluid">
        <div className="lead_container">
          <div className="row justify-content-md-center">
            <div className="bloc-tabs tabs-responsive">
              <button
                id="button-tabs"
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                Basic Info
              </button>
              <button
                id="button-tabs"
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                Contacts
              </button>
              <button
                id="button-tabs"
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3)}
              >
                Address
              </button>
              <button
                className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(4)}
              >
                Location
              </button>
            </div>

            <div className="content-tabs">
              <Form >
                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content"
                  }
                >
                  <div className="row px-1">
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="lead_type">
                        <Form.Label>Type</Form.Label>
                        <Form.Select aria-label="lead_type" name="lead_type">
                          <option value="Lead" selected>
                            Lead
                          </option>
                          <option value="Customer">Customer</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group
                        className="mb-2"
                        controlId="lead_customer_name"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lead_customer_name"
                          placeholder="Name"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="lead_user_type">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select
                          aria-label="lead_user_type"
                          name="lead_user_type"
                        >
                          <option value="Organisation" selected>
                            Organisation
                          </option>
                          <option value="Individual">Indivdual</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group
                        className="mb-2"
                        controlId="lead_organization"
                      >
                        <Form.Label>Organisation</Form.Label>
                        <Form.Control type="text" name="lead_organization" />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="lead_source">
                        <Form.Label>Source</Form.Label>
                        <Form.Select
                          aria-label="lead_source"
                          name="lead_source"
                        >
                          <option value="Reference">Reference</option>
                          <option value="Direct Visit">Direct Visit</option>
                          <option value="Online Registraion" selected>
                            Online Registration
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12 mt-3">
                      <FileUpload
                      />
                    </div>
                    <div className="col-sm-8 pt-3">
                      <Form.Group className="mb-2" controlId="lead_description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          
                        />
                       
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-3">
                      <div className="row">
                        <div className="col-12">
                          <Form.Group className="mb-2" controlId="lead_status">
                            <Form.Label>Lead Status</Form.Label>
                            <Form.Select
                              aria-label="lead_status"
                              name="lead_status"
                             
                            >
                              <option value="Lead">Lead</option>
                              <option value="Opportunity">Opportunity</option>
                              <option value="Quotation">Quotation</option>
                              <option value="Interested" selected>
                                Interested
                              </option>
                              <option value="Converted">Converted</option>
                              <option value="Lost">Lost</option>
                              <option value="DND">DND</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <div className="row">
                            <div
                              className="col-xl-6 d-flex"
                              style={{ justifyContent: "center" }}
                            >
                              <Button
                                btnType="add_borderless"
                                onClick={() => setModalOpportunity(true)}
                              >
                                <BsPlusCircleFill /> 
                                Add Opportunity
                              </Button>
                              <AddOpportunity
                                show={modalOpportunity}
                                onHide={() => setModalOpportunity(false)}
                                style="width:1250px"
                              />
                            </div>
                            <div
                              className="col-xl-6 d-flex"
                              style={{ justifyContent: "center" }}
                            >
                              <Button onClick={Submit} btnType="add_borderless">
                                <BsPlusCircleFill /> View Opportunity
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col pt-3">
                      <Button onClick={Submit} btnType="save">
                        Save
                      </Button>
                      <Custom_model
                        size={`sm`}
                        success
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />

                      <div className="col">
                        <Custom_model
                          size={`sm`}
                          success
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <div className="row mt-3 px-1" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12">
                    <Button btnType="add" onClick={() => setModalContact(true)}>
                      Add <AiOutlinePlus />
                    </Button>
                    <AddContact
                      show={modalContact}
                      onHide={() => setModalContact(false)}
                    />
                  </div>
                  <div className="col-12 mt-2">
                    <ContactTable />
                  </div>
                  <div className="col mt-4">
                    <Button onClick={Submit} btnType="save">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={
                  toggleState === 3 ? "content  active-content" : "content"
                }
              >
                <div className="row mt-3 px-1" style={{ borderRadius: "3px" }}>
                  <div className="col-md-12">
                    <Button btnType="add" onClick={() => setModalAddress(true)}>
                      Add <AiOutlinePlus />
                    </Button>
                    <AddAddress
                      show={modalAddress}
                      onHide={() => setModalAddress(false)}
                    />
                  </div>
                  <div className="row mt-2 ms-2">
                    <AddressTable />
                  </div>
                  <div className="col mt-4">
                    <Button onClick={Submit} btnType="save">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={
                  toggleState === 4 ? "content  active-content" : "content"
                }
              >
                <div className="col-lg" style={{ borderRadius: "3px" }}>
                  <Countrystate />
                </div>
              </div>{" "}
              <Custom_model
                size={`sm`}
                success
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
        </div>
        <br />
        {/* {error ? (
            <div>
              {" "}
              <ErrorMsg />
            </div>
          ) : (
            ""
          )} */}
      </div>
    </>
  );
}

export default Lead;
