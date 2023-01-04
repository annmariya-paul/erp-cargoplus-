import { Form, Select } from "antd";
import React, { useMemo, useState } from "react";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import Button from "../../../components/button/button";
import SelectBox from "../../../components/Select Box/SelectBox";
import { getData, getNameList } from "country-list";

function CreateAgent() {
  const [countryis, setCountryis] = useState();
  const options = useMemo(() => getData(), []);

  const handleChange = (e) => {
    setCountryis(e);
  };

  console.log("country", options);
  return (
    <div>
      <div className="container p-5">
        <div className="row">
          {/* <div className="">
            <h3>Agent Mangement</h3>
          </div> */}
          <div className="col-12">
            <div className="card p-3 border-0 shadow-sm">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h4>Create An Agent</h4>
                    <div className="container-fluid">
                      <Form>
                        <div className="row">
                          <div className="col-6">
                            <div className="">
                              <label>Employee Id</label>
                              <SelectBox>
                                <Select.Option>Manger</Select.Option>
                              </SelectBox>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="">
                              <label>Country</label>
                              <Form.Item>
                                <SelectBox
                                  value={countryis}
                                  onChange={handleChange}
                                >
                                  {options.map((item, index) => {
                                    return (
                                      <Select.Option
                                        key={item.code}
                                        value={item.name}
                                      >
                                        {item.name}
                                      </Select.Option>
                                    );
                                  })}
                                </SelectBox>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="">
                              <label>Commission</label>
                              <Form.Item>
                                <TextArea />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-flex justify-content-center">
                              <Button
                                type="submit"
                                className="p-2 save_button_style"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAgent;
