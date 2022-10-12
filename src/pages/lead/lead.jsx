import React, { useEffect, useState } from "react";
import "./lead.styles.scss";
import { Form } from "react-bootstrap";
import Button from '../../components/button/button'
import { ROUTES } from "../../routes";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import FileUpload from "../../components/fileupload/fileUploader";
import ContactTable from "./tables/contactstable";
import AddressTable from "./tables/addresstable";
import AddAddress from "./modals/modal_addaddress";
import AddContact from "./modals/modal_addcontact";
import { LeadStatus } from "../../utils/leadStatus";
import SuccessMesssage from "../../components/modal_success/success_modal";
// import ErrorMsg from "../../components/errormessage";
import Countrystate from "./location/countryselect"

function Lead() {
  const [toggleState, setToggleState] = useState(1);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalContact, setModalContact] = React.useState(false);
  const [modalAddress, setModalAddress] = React.useState(false);
  const [error, setError] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const {
    register,
    handleSubmit,
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

  const Submit = (data) => {
    console.log(data);
    if (data) {
      localStorage.setItem("Form", JSON.stringify(data));
      setModalShow(true);
      close_modal(modalShow, 1000);
      setModalContact(false);
      reset();
    } else {
      setError(true);
    }
  };

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
              <Form onSubmit={handleSubmit(Submit)}>
                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content"
                  }
                >
                  <div className="row px-1" style={{ borderRadius: "3px" }}>
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Select
                          aria-label="type"
                          name="type"
                          className={`${errors.type && "invalid"}`}
                          {...register("type", {
                            required: "Type is required",
                          })}
                          onKeyUp={() => {
                            trigger("type");
                          }}
                        >
                          <option value="Lead" selected>
                            Lead
                          </option>
                          <option value="Customer">Customer</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Name"
                          className={`${errors.name && "invalid"}`}
                          {...register("name", {
                            required: "Please enter a valid Name",
                            minLength: {
                              value: 3,
                              message: "Minimum Required length is 3",
                            },
                            maxLength: {
                              value: 100,
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9 ]*$/,
                              message: "Only letters and numbers are allowed!",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("name");
                          }}
                        />
                        {errors.name && (
                          <small className="text-danger">
                            {errors.name.message}
                          </small>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="user_type">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select
                          aria-label="User_type"
                          name="user_type"
                          className={`${errors.user_type && "invalid"}`}
                          {...register("user_type", {
                            required: "User type is required",
                          })}
                          onKeyUp={() => {
                            trigger("user_type");
                          }}
                        >
                          <option value="Organisation" selected>
                            Organisation
                          </option>
                          <option value="Individual">Indivdual</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="organisation">
                        <Form.Label>Organisation</Form.Label>
                        <Form.Control
                          type="text"
                          className={`${errors.organisation && "invalid"}`}
                          {...register("organisation", {
                            minLength: {
                              value: 3,
                              message: "Minimum Required length is 3",
                            },
                            maxLength: {
                              value: 100,
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9 ]*$/,
                              message: "Only letters and numbers are allowed!",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("organisation");
                          }}
                        />{" "}
                        {errors.organisation && (
                          <small className="text-danger">
                            {errors.organisation.message}
                          </small>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-2">
                      <Form.Group className="mb-2" controlId="source">
                        <Form.Label>Source</Form.Label>
                        <Form.Select
                          aria-label="source"
                          name="source"
                          className={`${errors.source && "invalid"}`}
                          {...register("source", {
                            minLength: {
                              value: 5,
                              message: "Minimum Required length is 5",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("source");
                          }}
                        >
                          <option value="Reference">Reference</option>
                          <option value="Direct Visit">Direct Visit</option>
                          <option value="Online Registraion" selected>
                            Online Registration
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-12">
                      <FileUpload
                        className={`${errors.fileupload && "invalid"}`}
                        {...register("fileupload")}
                        onKeyUp={() => {
                          trigger("fileupload");
                        }}
                      />
                    </div>
                    <div className="col-sm-8 pt-3">
                      <Form.Group className="mb-2" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          className={`${errors.description && "invalid"}`}
                          {...register("description", {
                            minLength: {
                              value: 5,
                              message: "Minimum Required length is 5",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("description");
                          }}
                        />
                        {errors.organisation && (
                          <small className="text-danger">
                            {errors.organisation.message}
                          </small>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4 pt-3">
                      <Form.Group className="mb-2" controlId="leadstatus">
                        <Form.Label>Lead Status</Form.Label>
                        <Form.Select
                          aria-label="leadstatus"
                          name="leadstatus"
                          className={`${errors.leadstatus && "invalid"}`}
                          {...register("leadstatus", {
                            required: "Type is required",
                          })}
                          onKeyUp={() => {
                            trigger("leadstatus");
                          }}
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
                          {/* {LeadStatus &&
                            LeadStatus.map((item, index) => {
                              return (
                                <option
                                  key={item.id}
                                  value={item.value}
                                  {...(item.id == 3
                                    ? "selected"
                                    : "")}
                                >
                                  {item.name}
                                </option>
                              );
                            })} */}
                        </Form.Select>
                      </Form.Group>
                    </div>

                    <div className="col pt-3">
                      <Button onClick={Submit} btnType="save">
                        Save
                      </Button>
                      {/* <Button type="submit" className="btn_save">
                          Save
                        </Button>  */}
                      <SuccessMesssage
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
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
              <SuccessMesssage
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
