import React, { useEffect, useState } from "react";
// import {  Button } from "react-bootstrap";
import Button from "../../../../components/button/button";
import { Form } from "antd";
import { useForm } from "react-hook-form";
import Custom_model from "../../../../components/custom_modal/custom_model";
import axios from "axios";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL, GENERAL_SETTING_BASE_URL } from "../../../../api/bootapi";
import SelectBox from "../../../../components/Select Box/SelectBox";
import { Select } from "antd";
import InputType from "../../../../components/Input Type textbox/InputType";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";

function Countrystate() {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [getCity, setCity] = useState([]);
  const [countries, setCountries] = useState("");
  const [addForm] = Form.useForm();
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
        navigate(ROUTES.LEADLIST)
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

  useEffect(() => {
    getAllCountries();
  }, []);


  const OnSubmit =  (data) => {
    PublicFetch.post(`${CRM_BASE_URL}/lead-location`, data)
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

      <Form  form={addForm}
              onFinish={(values) => {
                console.log("values iss", values);
                OnSubmit(values);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}>
        <div className="row py-5 px-1">
          <div className="col-sm-4">
           
              <label>Country</label>
              <Form.Item
             name="lead_location_country"
              >
                <SelectBox allowClear
                          showSearch
                          optionFilterProp="children"
                        >
                {countries &&
                            countries.length > 0 &&
                            countries.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.country_id}
                                  value={item.country_id}
                                >
                                  {item.country_name}
                                </Select.Option>
                              );
                            })}
            
              </SelectBox>
                      </Form.Item>
          </div>
         
        
          <div className="col-sm-4">
           
              <label>States</label>
              <Form.Item
             name="lead_location_state"
              >
            <InputType/>
                      </Form.Item>
          </div>
        
          <div className="col-sm-4">
           
              <label>City</label>
              <Form.Item
             name="lead_location_city"
              >
                 <InputType/>
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
