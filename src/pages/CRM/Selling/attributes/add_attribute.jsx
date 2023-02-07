import React, { useState, useEffect } from "react";
import "./attributes.styles.scss";
import { Link } from "react-router-dom";
// import { Form } from "react-bootstrap";
import { Form, Input } from "antd";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import InputType from "../../../../components/Input Type textbox/InputType";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import Custom_model from "../../../../components/custom_modal/custom_model";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../../check Unique/CheckUnique";

export default function Add_Attribute() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [attributeName, setAttributeName] = useState("");
  const [attributeDescription, setAttributeDescription] = useState("");
  const [uniqueCode, setuniqueCode] = useState();

  const [addForm] = Form.useForm();
  const navigate = useNavigate();

  // useEffect(() => {
  //   Submit();
  // }, []);
  // const Submit = (event,data) => {
  //   // const form = event.currentTarget;
  //   // event.preventDefault();
  //   // event.stopPropagation();
  //   setFormSubmitted(true);
  //   console.log(data);
  //   if (data) {
  //     localStorage.setItem("Form", JSON.stringify(data));
  //   }
  // };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSaveSuccess(false);
        navigate(ROUTES.ATTRIBUTES);
      }, time);
    }
  };

  // function to create attributes

  const createAttributes = async () => {
    try {
      const addattributes = await PublicFetch.post(
        `${CRM_BASE_URL_SELLING}/attribute`,
        {
          attribute_name: attributeName,
          attribute_description: attributeDescription,
        }
      );
      console.log("attributes added successfully", addattributes);
      if (addattributes.data.success) {
        setSaveSuccess(true);
        close_modal(saveSuccess, 1000);
      } else if (addattributes.data.success === false) {
        alert(addattributes.data.data);
      }
    } catch (err) {
      console.log("err to add the attributes", err);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    navigate(ROUTES.ATTRIBUTES);
  };

  // const checkAttributeNameis = (data) => {
  //   PublicFetch.get(
  //     `${process.env.REACT_APP_BASE_URL}/misc?type=attributename&value=${attributeName}`
  //   )
  //     .then((res) => {
  //       console.log("Response 1123", res);
  //       if (res.data.success) {
  //         console.log("Success", res.data.data);
  //         if (res.data.data.exist) {
  //           console.log("hai guys");
  //           setuniqueCode(true);
  //         } else {
  //           setuniqueCode(false);
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // };

  return (
    <>
      <div className="row my-3">
        <h5 className="lead_text">Attributes</h5>
      </div>
      <div className="container-fluid add_attributes p-4 ">
        <div className="row flex-wrap pt-2">
          {/* <div className="col">
            <h6 className="lead_text">Add Attribute</h6>
          </div> */}
        </div>

        <Form
          form={addForm}
          onFinish={(values) => {
            console.log("values iss", values);
            createAttributes();
          }}
          onFinishFailed={(error) => {
            console.log(error);
          }}
        >
          <div className="row py-1">
            <div className="col-sm-6 pt-3">
              <label>Name</label>
              <Form.Item
                name="attribute"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                    message: "Please enter a Valid attribute name",
                  },

                  {
                    whitespace: true,
                  },
                  {
                    min: 2,
                    message: "Attribute name must be at least 2 characters",
                  },
                  {
                    max: 100,
                    message:
                      "Attribute name cannot be longer than 100 characters",
                  },
                ]}
              >
                <InputType
                  value={attributeName}
                  onChange={(e) => {
                    setAttributeName(e.target.value);
                    setuniqueCode(false);
                  }}
                  onBlur={ async () => {
                    // checkAttributeNameis();
                    let a = await CheckUnique({type:"attributename",value:attributeName})
                    console.log("hai how are u", a)
                    setuniqueCode(a)
                  }}
                />
              </Form.Item>
              {uniqueCode ? (
                <div>
                  <label style={{ color: "red" }}>
                    Attribute Name {UniqueErrorMsg.UniqueErrName}
                  </label>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-sm-6 pt-3">
              <label>Description</label>
              <Form.Item
                name="description"
                rules={[
                  {
                    whitespace: true,
                  },
                  {
                    min: 2,
                    message: "Description must be at least 2 characters",
                  },
                  {
                    max: 500,
                    message: "Description cannot be longer than 500 characters",
                  },
                ]}
              >
                <TextArea
                  value={attributeDescription}
                  onChange={(e) => setAttributeDescription(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-1">
              <Button btnType="save">Save</Button>
            </div>
            <div className="col-1">
              <Button btnType="cancel" onClick={() => handleCancel()}>
                Cancel
              </Button>
            </div>
          </div>
        </Form>

        <Custom_model
          size={"sm"}
          show={saveSuccess}
          onHide={() => setSaveSuccess(false)}
          success
        />
      </div>
    </>
  );
}
