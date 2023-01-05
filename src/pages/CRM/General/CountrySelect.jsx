import { getData, getNameList } from "country-list";
import { Form, Select } from "antd";
import React, { useMemo, useState } from "react";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import SelectBox from "../../../components/Select Box/SelectBox";

export default function  SelectCountry(){
    const [countryis, setCountryis] = useState();
    const options = useMemo(() => getData(), []);

    const handleChange = (e) => {
      setCountryis(e);
    };

    console.log("country", options);
    return (
      <>
        <div className="container">
          <div className="row justify-content-center">
            <div className="containerdesig p-4">
              <div className="row">
                <h5 className="lead_text">Add Country</h5>
              </div>{" "}
              <Form>
                <div className="row">
                  <div className="col-12">
                    <label>Country</label>
                    <Form.Item>
                      <SelectBox value={countryis} onChange={handleChange}>
                        {options.map((item, index) => {
                          return (
                            <Select.Option key={item.code} value={item.name}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-auto">
                    <Button btnType="save">Save</Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
}