import React, { useEffect, useState } from "react";
// import {  Button } from "react-bootstrap";
import Button from "../../../../components/button/button";
import { Form } from "antd";
import { useForm } from "react-hook-form";
import Custom_model from "../../../../components/custom_modal/custom_model";
import axios from "axios";
import PublicFetch from "../../../../utils/PublicFetch";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
  GENERAL_SETTING_BASE_URL,
} from "../../../../api/bootapi";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { Select } from "antd";
import InputType from "../../../../components/Input Type textbox/InputType";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import Input_Number from "../../../../components/InputNumber/InputNumber";

function Countrystate(props) {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [getCity, setCity] = useState([]);
  const [countries, setCountries] = useState("");
  const [addForm] = Form.useForm();
  const [frighttype, setFrighttype] = useState();
  const [successPopup, setSuccessPopup] = useState(false);

  const navigate = useNavigate();
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
        setSuccessPopup(false);
        navigate(ROUTES.LEADLIST);
      }, time);
    }
  };

  const getAllCountries = async () => {
    try {
      const allCountries = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/country`
      );
      console.log("countries are", allCountries.data.data);
      setCountries(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  const getallfrighttype = async () => {
    try {
      const allfrighttypes = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/freightTypes`
      );
      console.log("Getting all frieght types : ", allfrighttypes.data.data);
      setFrighttype(allfrighttypes.data.data);
      // setFrighttypemode(allfrighttypes.data.data.freight_type_mode);
    } catch (err) {
      console.log("Error in fetching fright types : ", err);
    }
  };
  console.log("customer id", props.customerId, props.customer_id);

  const getAccounts = () => {
    PublicFetch.get(
      `${CRM_BASE_URL}/customer-accounting?startIndex=0&noOfItems=10`
    )
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success of accounts", res.data.data.customerAccounting);
          let temp = [];
          res?.data?.data?.customerAccounting?.forEach((item, index) => {
            // console.log("acounts of custiomer", item);

            if (props?.customerId == item?.customer_accounting_customer_id) {
              console.log("acounts of custiomer", item);
              temp.push({
                customer_accounting_id: item.customer_accounting_id,
                customer_accounting_credit_days:
                  item.customer_accounting_credit_days,
                customer_accounting_preferred_freight_type:
                  item.customer_accounting_preferred_freight_type,
                customer_accounting_qtn_validity_days:
                  item.customer_accounting_qtn_validity_days,
                customer_accounting_credit_limit:
                  item.customer_accounting_credit_limit,
                customer_accounting_tax_no: item.customer_accounting_tax_no,
                customer_accounting_customer_id:
                  item.customer_accounting_customer_id,
              });
              addForm.setFieldsValue({
                customer_accounting_id: item.customer_accounting_id,
                customer_accounting_credit_days:
                  item.customer_accounting_credit_days,
                customer_accounting_preferred_freight_type:
                  item.customer_accounting_preferred_freight_type,
                customer_accounting_qtn_validity_days:
                  item.customer_accounting_qtn_validity_days,
                customer_accounting_credit_limit:
                  item.customer_accounting_credit_limit,
                customer_accounting_tax_no: item.customer_accounting_tax_no,
                customer_accounting_customer_id:
                  item.customer_accounting_customer_id,
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (props.customerId) {
      getAccounts();
    }
    getallfrighttype();
    getAllCountries();
  }, [props.customerId]);

  const OnSubmit = (value) => {
    const data = {
      customer_accounting_tax_no: value.customer_accounting_tax_no,
      customer_accounting_customer_id: props?.customer_id,
      customer_accounting_credit_days: value.customer_accounting_credit_days,
      customer_accounting_preferred_freight_type:
        value.customer_accounting_preferred_freight_type,
      customer_accounting_qtn_validity_days:
        value.customer_accounting_qtn_validity_days,
      customer_accounting_credit_limit: value.customer_accounting_credit_limit,
    };
    PublicFetch.post(`${CRM_BASE_URL}/customer-accounting`, data)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setSuccessPopup(true);
          // getallPaymentTerms()
          // close_modal(successPopup, 1200);

          addForm.resetFields();
          close_modal(successPopup, 1000);
          // setModalAddPayment(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  // const Submit = (data) => {
  //   console.log(data);
  //   if (data) {
  //     localStorage.setItem("Form", JSON.stringify(data));
  //     setModalShow(true);
  //     close_modal(modalShow, 1200);
  //     reset();
  //   } else {
  //     //  setError(true);
  //   }
  // };

  // const fetchData = () => {
  //   axios
  //     .get(
  //       "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
  //     )
  //     .then(function (response) {
  //       setData(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const country = [...new Set(data.map((item) => item.country))];
  // country.sort();

  // const handleCountry = (e) => {
  //   let states = data.filter((state) => state.country === e.target.value);
  //   states = [...new Set(states.map((item) => item.subcountry))];
  //   states.sort();
  //   setState(states);
  // };
  // const handleState = (e) => {
  //   let cities = data.filter((city) => city.subcountry === e.target.value);
  //   cities.sort();
  //   setCity(cities);
  // };
  return (
    <>
      <Form
        form={addForm}
        onFinish={(values) => {
          console.log("values iss", values);
          OnSubmit(values);
        }}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <div className="row py-5 px-1">
          <div className="col-sm-4">
            <label>Tax No</label>
            <Form.Item name="customer_accounting_tax_no">
              <InputType />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <label>Credit Days</label>
            <Form.Item name="customer_accounting_credit_days">
              <Input_Number />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <label>Credit Limit</label>
            <Form.Item name="customer_accounting_credit_limit">
              <Input_Number />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <label>Preferecd Freight Type</label>
            <Form.Item name="customer_accounting_preferred_freight_type">
              <SelectBox allowClear showSearch optionFilterProp="children">
                {frighttype &&
                  frighttype.length > 0 &&
                  frighttype.map((item, index) => {
                    return (
                      <Select.Option
                        key={item.freight_type_id}
                        value={item.freight_type_id}
                      >
                        {item.freight_type_name}
                      </Select.Option>
                    );
                  })}
              </SelectBox>
            </Form.Item>
          </div>

          <div className="col-sm-4">
            <label>Qtn validity Days</label>
            <Form.Item name="customer_accounting_qtn_validity_days">
              <Input_Number />
            </Form.Item>
          </div>

          <div className=" pt-4">
            {/* <Button
              btntype="submit"
              className="btn_save"
              // onClick={() => setModalShow(true)}
            >
              Save
            </Button> */}
            <Button type="submit" className="qtn_save" btnType="save">
              Save
            </Button>
            <Custom_model
              centered
              size={`sm`}
              success
              show={successPopup}
              onHide={() => setSuccessPopup(false)}
            />
          </div>
        </div>
      </Form>
    </>
  );
}

export default Countrystate;
