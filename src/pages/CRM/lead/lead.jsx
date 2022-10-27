import React, { useEffect, useState } from "react";
import "./lead.styles.scss";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from "../../../components/button/button";
import { ROUTES } from "../../../routes";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
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
  const [formSubmitted, setFormSubmitted] = useState(false);
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
  const [leadId, setLeadId] = useState();

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

  const Submit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setFormSubmitted(true);
    const formData = new FormData();
    formData.append("lead_type", leadType);
    formData.append("lead_customer_name", leadName);
    formData.append("lead_user_type", leadUsertype);
    formData.append("lead_organization", leadOrganization);
    formData.append("lead_source", leadSource);
    formData.append("lead_description", leadDescription);
    formData.append("attachments", leadAttachment);
    formData.append("lead_status", leadStatus);
    //  console.log(data);
    PublicFetch.post(`${CRM_BASE_URL}/lead/basic`, formData, {
      "Content-Type": "Multipart/form-Data",
    })
      .then(function (response) {
        console.log("hello", response);
        if (response.data.success) {
          console.log("hello", response.data.data);
          setLeadType();
          setLeadName();
          setLeadUsertype();
          setLeadOrganization();
          setLeadSource();
          setLeadAttachment();
          setLeadDescription();
          setLeadStatus();
          setModalShow(true);
          close_modal(modalShow, 1000);
          setModalContact(false);
          toggleTab(2);
          setLeadId(response?.data?.data?.lead_id);
        } else {
          console.log("Failed while adding data");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // useEffect(() => {
  //   Submit();
  // }, []);
  // const Submit = (data) => {
  //   console.log(data);
  //   if (data) {
  //     localStorage.setItem("Form", JSON.stringify(data));
  //     reset();
  //   } else {
  //     setError(true);
  //   }
  // };

  console.log("lead id::", leadId);

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
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                {/* <div className="col-12"> */}
                <div className="row mb-2 justify-content-end">
                  <div
                    className="col-md-3 col-xl-2 col-sm-6 d-flex"
                    style={{ justifyContent: "center" }}
                  >
                    <Button
                      btnType="add_borderless"
                      onClick={() => setModalOpportunity(true)}
                    >
                      <BsPlusCircleFill style={{ fontSize: "16px" }} /> Add
                      Opportunity
                    </Button>
                    <AddOpportunity
                      show={modalOpportunity}
                      onHide={() => setModalOpportunity(false)}
                      style="width:1250px"
                    />
                  </div>
                  <div
                    className="col-md-3 col-xl-2 col-sm-6 d-flex"
                    style={{ justifyContent: "center" }}
                  >
                    <Link to={ROUTES.OPPORTUNITY} className="nav-link">
                      <Button onClick={Submit} btnType="add_borderless">
                        <BsPlusCircleFill style={{ fontSize: "16px" }} /> View
                        Opportunity
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* </div> */}
                <Form noValidate id="bidForm" onSubmit={Submit}>
                  <div className="row px-1">
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="lead_type">
                        <Form.Label>Type</Form.Label>
                        <Form.Select
                          aria-label="lead_type"
                          name="lead_type"
                          value={leadType}
                          onChange={(e) => setLeadType(e.target.value)}
                        >
                          <option value="L" selected="selected">
                            Lead
                          </option>
                          <option value="C">Customer</option>
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
                          required
                          value={leadName}
                          isInvalid={
                            !leadName?.length > 0 &&
                            (leadName?.length || formSubmitted)
                          }
                          onChange={(e) => setLeadName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          name is not registered
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="lead_user_type">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select
                          aria-label="lead_user_type"
                          name="lead_user_type"
                          value={leadUsertype}
                          onChange={(e) => setLeadUsertype(e.target.value)}
                        >
                          <option value="O" selected>
                            Organisation
                          </option>
                          <option value="I">Indivdual</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group
                        className="mb-2"
                        controlId="lead_organization"
                      >
                        <Form.Label>Organisation</Form.Label>
                        <Form.Control
                          type="text"
                          name="lead_organization"
                          value={leadOrganization}
                          onChange={(e) => setLeadOrganization(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="lead_source">
                        <Form.Label>Source</Form.Label>
                        <Form.Select
                          aria-label="lead_source"
                          name="lead_source"
                          value={leadSource}
                          onChange={(e) => setLeadSource(e.target.value)}
                        >
                          <option value="reference">Reference</option>
                          <option value="direct visit">Direct Visit</option>
                          <option value="online registration" selected>
                            Online Registration
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-lg-3 col-xs-12 col-sm-5 col-md-5 mt-3">
                        <FileUpload
                          value={leadAttachment}
                          onChange={(e) => setLeadAttachment(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-8 pt-3">
                      <Form.Group className="mb-2" controlId="lead_description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={leadDescription}
                          onChange={(e) => setLeadDescription(e.target.value)}
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
                              value={leadStatus}
                              onChange={(e) => setLeadStatus(e.target.value)}
                            >
                              <option value="LE">Lead</option>
                              <option value="OP">Opportunity</option>
                              <option value="QU">Quotation</option>
                              <option value="IN" selected>
                                Interested
                              </option>
                              <option value="CO">Converted</option>
                              <option value="LO">Lost</option>
                              <option value="DN">DND</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col pt-3">
                      <Button type="submit" onClick={Submit} btnType="save">
                        Save
                      </Button>
                      <Custom_model
                        size={`sm`}
                        success
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </div>
                  </div>
                </Form>
              </div>
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
                    {/* <AddContact
                      lead={leadId}
                      show={modalContact}
                      onHide={() => setModalContact(false)}
                    /> */}
                  </div>
                  <div className="col-12 mt-2">
                    <ContactTable
                      show={modalContact}
                      onHide={() => setModalContact(false)}
                      lead={leadId}
                    />
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
                    {/* <AddAddress
                      show={modalAddress}
                      onHide={() => setModalAddress(false)}
                    /> */}
                  </div>
                  <div className="row mt-2 ms-2">
                    <AddressTable
                      lead={leadId}
                      show={modalAddress}
                      onHide={() => setModalAddress(false)}
                    />
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
