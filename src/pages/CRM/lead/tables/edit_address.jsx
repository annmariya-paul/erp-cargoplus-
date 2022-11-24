import "./table.scss";
import React, { useState, useEffect } from "react";
import TableData from "../../../../components/table/table_data";
import { CRM_BASE_URL } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import PhoneNumber from "../../../../components/phone_number/phonenumber";
import { message } from "antd";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FormGroup } from "react-bootstrap";
import Button from "../../../../components/button/button";
import { useForm } from "react-hook-form";
// import "react-phone-number-input/style.css";
import Custom_model from "../../../../components/custom_modal/custom_model";

function Edit_Address(props) {
  const [value, setValue] = useState();

  const [modalShow, setModalShow] = useState(false);
  const [modelshowAdd, setModalshowAdd] = useState(true);
  const [title, setTitle] = useState();
  const [address_data, setAddress_data] = useState();
  const [pincode, setPincode] = useState();
  const [phone, setPhone] = useState();
  const [serialNo,setserialNo]=useState(1);
  const [addressLeadId,setAddressLeadId] = useState();
  const [addressTable,setAddressTable] = useState();

const [oneLeadData, setOneLeadData] = useState();
const [LeadId, setLeadId] = useState();
// {funtion to fetch each Lead data - Ann mariya (22/11/22) }
console.log("hai halo", props.leadid);
const GetLeadData = () => {
  PublicFetch.get(`${CRM_BASE_URL}/lead/${props.leadid}`)
    .then((res) => {
      if (res?.data?.success) {
        console.log("Unique Lead Id", res?.data?.data);
        setOneLeadData(res?.data?.data);
        setLeadId(res?.data?.data?.lead_id);
      } else {
        console.log("FAILED TO LOAD DATA");
      }
    })
    .catch((err) => {
      console.log("Error while getting data", err);
    });
};

  const getAddresses = async () => {
    try {
      const allAddress = await PublicFetch.get(`${CRM_BASE_URL}/address`);
      if (allAddress.data.success) {
        setValue(allAddress.data.data);
        console.log("hello data", allAddress.data.data);
        let array=[];
         allAddress?.data?.data?.forEach((item, index) => {
           setAddressLeadId(item?.address_lead_id);
           if (LeadId === item?.address_lead_id) {
             {
               array.push({
                 address_title: item?.address_title,
                 address_content: item?.address_content,
                 address_pin: item?.address_pin,
                 address_contact: item?.address_contact,
               });
               setAddressTable(array);
             }
           }
         });
      } else {
        message.error("fetch data error");
      }
      console.log("All leads res : ", allAddress);
    } catch (err) {
      console.log("error while getting all leads: ", err);
    }
  };

  useEffect(() => {
    getAddresses();
    GetLeadData();
  }, [LeadId]);

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (value, item, index) => serialNo + index,
      align: "center",
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
              <FaEdit />
            </div>
            <div className="editcolor">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "TITLE",
      dataIndex: "address_title",
      key: "address_title",
    },
    {
      title: "ADDRESS",
      dataIndex: "address_content",
      key: "address_content",
    },
    {
      title: "PIN",
      dataIndex: "address_pin",
      key: "address_pin",
    },
    {
      title: "CONTACT",
      dataIndex: "address_contact",
      key: "address_contact",
    },
  ];

    

  const submit = (data) => {
    PublicFetch.post(`${CRM_BASE_URL}/lead/${props.lead}/address`, {
      address_title: title,
      address_content: address_data,
      address_pin: pincode,
      address_contact: phone,
    })
      .then(function (response) {
        console.log("hello", response);
        if (response.data.success) {
          getAddresses();
          setAddress_data();
          setPhone();
          setPincode();
          setTitle();
          setModalshowAdd(false);
          setModalShow(true);
          close_modal(modalShow, 1200);
          props.onHide();
          reset();
        } else {
          message.error("fetch data error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // useEffect(() => {
  //   submit();
  // }, []);

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
  return (
    <div>
      <div className="datatable">
        <TableData
          data={addressTable}
          columns={columns}
          custom_table_css="addresstable"
        />
      </div>
      <Custom_model
        Adding_contents
        show={modelshowAdd}
        onHide={() => setModalshowAdd(false)}
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
                value={title}
                // className={`${errors.address_title && "invalid"}`}
                // {...register("address_title", {
                //   required: "Please enter a valid Title",
                //   minLength: {
                //     value: 3,
                //     message: "Minimum Required length is 3",
                //   },
                //   maxLength: {
                //     value: 100,
                //   },
                // })}
                onChange={(e) => setTitle(e.target.value)}
                // onKeyUp={() => {
                //   trigger("address_title");
                // }}
              />
              {errors.address_title && (
                <small className="text-danger">
                  {errors.address_title.message}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="address_content">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                // className={`${errors.address_content && "invalid"}`}
                // {...register("address_content", {
                //   required: "Please enter a valid Address",
                //   minLength: {
                //     value: 6,
                //     message: "Minimum Required length is 6",
                //   },
                //   maxLength: {
                //     value: 500,
                //   },
                // })}
                value={address_data}
                // onKeyUp={() => {
                //   trigger("address_content");
                // }}
                onChange={(e) => setAddress_data(e.target.value)}
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
                // className={`form-control ${errors.address_pin && "invalid"}`}
                // {...register("address_pin", {
                //   required: "Please enter valid PIN eg:345 678",
                //   pattern: {
                //     value: /^[A-Z0-9- ]{2,10}$/i,
                //     message: "Please enter valid PIN eg:345 678",
                //   },
                // })}
                // onKeyUp={() => {
                //   trigger("address_pin");
                // }}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              {/* {errors.address_pin && (
                <small className="text-danger">
                  {errors.address_pin.message}
                </small>
              )} */}
            </Form.Group>
            <FormGroup>
              <div className="Phno row mb-3">
                <label for="phone" className="form-label">
                  Mobile
                </label>
                <PhoneNumber
                  defaultCountry="IN"
                  value={phone}
                  onChange={(value) => setPhone(value)}
                />
                {phone ? (
                  <small style={{ color: "red" }}>
                    {phone && isPossiblePhoneNumber(phone)
                      ? " "
                      : "Enter a valid Phone Number"}
                  </small>
                ) : (
                  ""
                )}
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
    </div>
  );
}

export default Edit_Address;
