import React from "react";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
export default function Add_Department() {
  return (
    <>
      <div className="row my-3">
        <h5 className="lead_text">Departments</h5>
      </div>
      <div className="container-fluid add_attributes p-4 ">
        <div className="row flex-wrap pt-2">
          <div className="col">
            <h6 className="lead_text">Basic Info</h6>
          </div>
          <div className="row ms-0 py-1">
            <div className="col-sm-6 pt-3">
              <label htmlfor="branchname">Department Name</label>
              <InputType />
            </div>

            <div className="col-sm-6 pt-3">
              <label htmlfor="branchname">Department Code</label>
              <InputType />
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-auto">
              <Button btnType="save">Save</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
