import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export default function Add_Attribute() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [attributeName, setAttributeName] = useState();
  const [attributeDescription, setAttributeDescription] = useState();

  //   useEffect(() => {
  //     Submit();
  //   }, []);
  //   const Submit = (event, data) => {
  //     const form = event.currentTarget;
  //     event.preventDefault();
  //     event.stopPropagation();
  //     setFormSubmitted(true);
  //     console.log(data);
  //     if (data) {
  //       localStorage.setItem("Form", JSON.stringify(data));
  //     }
  //   };
  return (
    <>
      <div className="container-fluid attribute_list pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Basic Info</h5>
          </div>
        </div>
        {/* <Form noValidate id="bidForm" onSubmit={Submit}> */}

        <div className="row py-1">
          <div className="col-sm-6 pt-2">
            <Form.Group className="mb-2" controlId="lead_customer_name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="lead_customer_name"
                placeholder="Name"
                required
                //   value={attributeName}
                //   isInvalid={
                //     !attributeName?.length > 0 &&
                //     (attributeName?.length || formSubmitted)
                //   }
                //   onChange={(e) => setAttributeName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                name is not registered
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-sm-6 pt-2">
            <Form.Group className="mb-2" controlId="attribute_description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                //   value={attributeDescription}
                //   onChange={(e) => setAttributeDescription(e.target.value)}
              />
            </Form.Group>
          </div>
        </div>
        {/* </Form> */}
      </div>
    </>
  );
}
