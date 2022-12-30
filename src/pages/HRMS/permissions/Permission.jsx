import { Checkbox, Form, Select } from "antd";
import React, { useState } from "react";
import Button from "../../../components/button/button";
import SelectBox from "../../../components/Select Box/SelectBox";
import "./permissions.scss";

function Permission() {
  const [module1Click, setModule1Click] = useState(true);

  return (
    <div>
      <div className="">
        <div className="container p-3">
          <div className="">
            <h2 style={{ color: "#0891d1" }}>Assign Permission</h2>
          </div>
          <Form>
            <div className="row">
              <div className="col-4 py-3">
                <div className="">
                  <label>Roles</label>
                  <div className="">
                    <SelectBox>
                      <Select.Option>Manger</Select.Option>
                    </SelectBox>
                  </div>
                </div>
              </div>
              <div className="col-12 py-5">
                <div className="row">
                  <div className="col-6"></div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <label>Create</label>
                      </div>
                      <div className="col-3">
                        <label>Update</label>
                      </div>
                      <div className="col-3">
                        <label>Read</label>
                      </div>
                      <div className="col-3">
                        <label>Delete</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    {/* <div className="d-flex justify-content-center">
                    <Checkbox></Checkbox>
                    <button
                      onClick={() => setModule1Click(!module1Click)}
                      className="ms-3 btn-toggle"
                    >
                      Hrms
                    </button>
                  </div> */}
                  </div>
                  {module1Click ? (
                    <div className="col-12 my-3">
                      {/* {single screen/object  starts} */}
                      <div className="row">
                        <div className="col-6 ">
                          <div className="ms-5 d-flex justify-content-center gap-2">
                            <Checkbox></Checkbox>
                            <p>Branches</p>
                          </div>
                        </div>
                        <div className="col-6 ps-4">
                          <div className="row">
                            <div className="col-3">
                              <div className="">
                                <Checkbox />
                              </div>
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {single screen/object   ends} */}
                      <div className="row">
                        <div className="col-6 ">
                          <div className="ms-5 d-flex justify-content-center gap-2">
                            <Checkbox></Checkbox>
                            <p>Branches</p>
                          </div>
                        </div>
                        <div className="col-6 ps-4">
                          <div className="row">
                            <div className="col-3">
                              <div className="">
                                <Checkbox />
                              </div>
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 ">
                          <div className="ms-5 d-flex justify-content-center gap-2">
                            <Checkbox></Checkbox>
                            <p>Branches</p>
                          </div>
                        </div>
                        <div className="col-6 ps-4">
                          <div className="row">
                            <div className="col-3">
                              <div className="">
                                <Checkbox />
                              </div>
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 ">
                          <div className="ms-5 d-flex justify-content-center gap-2">
                            <Checkbox></Checkbox>
                            <p>Branches</p>
                          </div>
                        </div>
                        <div className="col-6 ps-4">
                          <div className="row">
                            <div className="col-3">
                              <div className="">
                                <Checkbox />
                              </div>
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 ">
                          <div className="ms-5 d-flex justify-content-center gap-2">
                            <Checkbox></Checkbox>
                            <p>Branches</p>
                          </div>
                        </div>
                        <div className="col-6 ps-4">
                          <div className="row">
                            <div className="col-3">
                              <div className="">
                                <Checkbox />
                              </div>
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 ">
                          <div className="ms-5 d-flex justify-content-center gap-2">
                            <Checkbox></Checkbox>
                            <p>Branches</p>
                          </div>
                        </div>
                        <div className="col-6 ps-4">
                          <div className="row">
                            <div className="col-3">
                              <div className="">
                                <Checkbox />
                              </div>
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                            <div className="col-3">
                              <Checkbox />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="row my-5">
                <div className="col-6">
                  <div className="d-flex justify-content-center">
                    <Checkbox></Checkbox>
                    <button
                      onClick={() => setModule1Click(!module1Click)}
                      className="ms-3 btn-toggle"
                    >
                      CRM
                    </button>
                  </div>
                </div>
                {module1Click ? (
                  <div className="col-12 my-3">
                    <div className="row">
                      <div className="col-6 ">
                        <div className="ms-5 d-flex justify-content-center ">
                          <label></label>
                          <p>sales</p>
                        </div>
                      </div>
                      <div className="col-6 ps-4">
                        <div className="row">
                          <div className="col-3">
                            <div className="">
                              <Checkbox />
                            </div>
                          </div>
                          <div className="col-3">
                            <Checkbox />
                          </div>
                          <div className="col-3">
                            <Checkbox />
                          </div>
                          <div className="col-3">
                            <Checkbox />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div> */}
              </div>
              <div className="col-12 d-flex justify-content-center">
                <Button className="p-2 save_button_style"> save</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Permission;
