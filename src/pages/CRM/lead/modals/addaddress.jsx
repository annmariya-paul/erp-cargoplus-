import React, { useState,useEffect } from "react";
import {CRM_BASE_URL} from "../../../../api/bootapi";
import { Form } from "react-bootstrap";
import {  FormGroup } from "react-bootstrap";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
import 'react-phone-number-input/style.css';
import Custom_model from "../../../../components/custom_modal/custom_model";
import PublicFetch from "../../../../utils/PublicFetch";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import PhoneInput,{formatPhoneNumber,formatPhoneNumberIntl,isValidPhoneNumber} from "react-phone-number-input";
import PhoneNumber from "../../../../components/phone_number/phonenumber";
import { message } from "antd";

export default function AddAddress(props) {
  const [modalShow, setModalShow] = React.useState(false);

  const [title,setTitle]= useState();
  const [address_data,setAddress_data] = useState();
  const [pincode,setPincode]=useState();
  const [value, setValue]=useState();

  const getAllAddress = async () => {
    try {
      const allAddress = await PublicFetch.get(
        `${CRM_BASE_URL}/lead/1/address`
      );
      console.log("All leads res : ", allAddress);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  const submit = (data) => {
   
    PublicFetch.post(`${CRM_BASE_URL}/lead/1/address`,{
     address_title:title,
     address_content:address_data,
     address_pin:pincode,
     address_contact:value,
    })
      .then(function (response) {
        console.log("hello", response);
       if (response.data.success){
         getAllAddress();
         setAddress_data();
         setValue();
         setPincode();
         setTitle();
         setModalShow(true)
       }else {
         message.error("fetch data error")
       }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    useEffect(() => {
      submit();
    }, []);
 
 







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
        close_modal(modalShow, 1200);
        props.onHide();
      }, time);
    }
  };

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
        show={modalShow}
        onHide={() => setModalShow(false)}
        header="Add Address"
        footer={[
          <Button onClick={submit} btnType="save">
            Save
          </Button>,
        ]}
        {...props}
      >
        <Form onSubmit={handleSubmit(submit)}>
          <div className="px-5">
            <Form.Group className="mb-3" controlId="address_title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                className={`${errors.address_title && "invalid"}`}
                {...register("address_title", {
                  required: "Please enter a valid Title",
                  minLength: {
                    value: 3,
                    message: "Minimum Required length is 3",
                  },
                  maxLength: {
                    value: 100,
                  },
                })}
                onKeyUp={() => {
                  trigger("address_title");
                }}
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
              />
              {errors.address_title && (
                <small className="text-danger">{errors.address_title.message}</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="address_content">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className={`${errors.address_content && "invalid"}`}
                {...register("address_content", {
                  required: "Please enter a valid Address",
                  minLength: {
                    value: 6,
                    message: "Minimum Required length is 6",
                  },
                  maxLength: {
                    value: 500,
                  },
                })}
                value={address_data}
                onKeyUp={() => {
                  trigger("address_content");
                }}
                onChange={(e)=> setAddress_data(e.target.value)}
              />
              {errors.address_content && (
                <small className="text-danger">
                  {errors.address_content.message}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-1" controlId="address_pin">
              <Form.Label>PIN</Form.Label>
              <Form.Control
                type="text"
                className={`form-control ${errors.address_pin && "invalid"}`}
                {...register("address_pin", {
                  required: "Please enter valid PIN eg:345 678",
                  pattern: {
                    value: /^[A-Z0-9- ]{2,10}$/i,
                    message: "Please enter valid PIN eg:345 678",
                  },
                })}
                onKeyUp={() => {
                  trigger("address_pin");
                }}
                value={pincode}
                onChange={(e)=> setPincode(e.target.value)}

              />
              {errors.address_pin && (
                <small className="text-danger">{errors.address_pin.message}</small>
              )}
            </Form.Group>
            <FormGroup >
              <div className="row mb-3">
                <label for="phone" className="form-label">
                  Mobile
                </label>

                <PhoneNumber
  
  defaultCountry="IN"

  
  value={value}
  onChange={value=>setValue(value)}
  
  />
  is this number possible :{value&&isPossiblePhoneNumber(value)?"yes":"Its not a valid Phone Number"}
</div>
            
              </FormGroup>
                
          </div>
        </Form>
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

