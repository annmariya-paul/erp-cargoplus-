import { Checkbox, Select } from "antd";
import React, { useState } from "react";
import SelectBox from "../../../components/Select Box/SelectBox";
import "./permissions.scss";

function Permission() {
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="">
            <h2>Assign Permission</h2>
          </div>
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
                      <label>update</label>
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
                  <div className="d-flex justify-content-center">
                    <Checkbox></Checkbox>
                    <label className="ms-3">Hrms</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <div className=" d-flex justify-content-center ">
                        <p>branches</p>
                      </div>
                    </div>
                    <div className="col-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Permission;
