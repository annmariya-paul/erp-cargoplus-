import React, { useState, useEffect } from "react";
import "./attributes.styles.scss";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from "../../../components/button/button";

export default function Add_Attribute() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [attributeName, setAttributeName] = useState();
  const [attributeDescription, setAttributeDescription] = useState();

  useEffect(() => {
    Submit();
  }, []);
  const Submit = (event,data) => {
    // const form = event.currentTarget;
    // event.preventDefault();
    // event.stopPropagation();
    setFormSubmitted(true);
    console.log(data);
    if (data) {
      localStorage.setItem("Form", JSON.stringify(data));
    }
  };
  return (
    <>
      <div className="row my-3">
        <h5 className="lead_text">Attributes</h5>
      </div>
      <div className="container-fluid add_attributes p-4 ">
        <div className="row flex-wrap pt-2">
          <div className="col">
            <h6 className="lead_text">Basic Info</h6>
          </div>
        </div>
        <Form noValidate id="bidForm" onSubmit={Submit}>
          <div className="row py-1">
            <div className="col-sm-6 pt-3">
              <Form.Group className="mb-2" controlId="attribute_name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="attribute_name"
                  placeholder="Name"
                  required
                  value={attributeName}
                  isInvalid={
                    !attributeName?.length > 0 &&
                    (attributeName?.length || formSubmitted)
                  }
                  onChange={(e) => setAttributeName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  name is not registered
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-sm-6 pt-3">
              <Form.Group className="mb-2" controlId="attribute_description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={attributeDescription}
                  onChange={(e) => setAttributeDescription(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-1">
              <Button btnType="save">Save</Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
// BsCircleHalf
// FaArrowsAlt