import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Custom_model from "../../../../components/custom_modal/custom_model";
import axios from "axios";

function Countrystate() {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [getCity, setCity] = useState([]);

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
      close_modal(modalShow, 1200);
      reset();
    } else {
      //  setError(true);
    }
  };

  const fetchData = () => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  const handleCountry = (e) => {
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
  };
  const handleState = (e) => {
    let cities = data.filter((city) => city.subcountry === e.target.value);
    cities.sort();
    setCity(cities);
  };
  return (
    <>
      {" "}
      <Form onSubmit={handleSubmit(Submit)}>
        <div className="row py-5 px-1">
          <div className="col-sm-4">
            <Form.Group className="mb-3" controlId="countries">
              <Form.Label>Country</Form.Label>
              <Form.Select
                aria-label="country"
                className={`${errors.city && "invalid"}`}
                {...register("countries", {
                  required: "Required",
                })}
                onKeyUp={() => {
                  trigger("countries");
                }}
                onChange={(e) => handleCountry(e)}
              >
                <option value="">Select Country</option>
                {country.map((items) => (
                  <option key={items} value={getCountry}>
                    {items}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-sm-4">
            <Form.Group className="mb-3" controlId="state">
              <Form.Label>States</Form.Label>
              <Form.Select
                aria-label="States"
                className={`${errors.city && "invalid"}`}
                {...register("state", {
                  required: "Required",
                })}
                onKeyUp={() => {
                  trigger("state");
                }}
                onChange={(e) => handleState(e)}
              >
                <option value="">Select State</option>
                {getState.map((items) => (
                  <option key={items} value={selectedState}>
                    {items}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-sm-4">
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Select
                aria-label="city"
                className={`${errors.city && "invalid"}`}
                {...register("city", {
                  required: "Required",
                })}
                onKeyUp={() => {
                  trigger("city");
                }}
              >
                <option value="">Select City</option>
                {getCity.map((items) => (
                  <option key={items.name}>{items.name}</option>
                ))}
              </Form.Select>
              {errors.city && (
                <small className="text-danger">{errors.city.message}</small>
              )}
            </Form.Group>
          </div>
          <div className=" pt-4">
            <Button
              type="submit"
              className="btn_save"
              // onClick={() => setModalShow(true)}
            >
              Save
            </Button>
            <Custom_model
              centered
              size={`sm`}
              success
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </Form>
    </>
  );
}

export default Countrystate;
