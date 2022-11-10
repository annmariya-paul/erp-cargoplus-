import React, {useEffect,useState} from "react";
import { useSortBy } from "react-table";
import {Form} from "antd";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../components/error/ErrorMessage";

export default function Add_Branch(){
    const [error,setError] = useState(false);
    
  useEffect(() => {
    Submit();
  }, []);
  const Submit = (data) => {
    console.log(data);
    if (data) {
      localStorage.setItem("Form", JSON.stringify(data));  
    } else {
      setError(true);
    }
  };
    return (
      <>
        <div className="row my-3">
          <h5 className="lead_text">Branches</h5>
        </div>
        <div className="container-fluid add_attributes p-4 ">
          <Form>
            <div className="row flex-wrap pt-2">
              <div className="col">
                <h6 className="lead_text">Basic Info</h6>
              </div>

              <div className="row ms-0 py-1">
                <div className="col-sm-6 pt-3">
                  <label htmlfor="branchname">Branch Name</label>
                  <InputType
                    rules={[
                      { required: true, message: "Branch Name is required" },
                    ]}
                  />
                </div>

                <div className="col-sm-6 pt-3">
                  <label htmlfor="branchname">Branch Code</label>
                  <InputType />
                </div>
              </div>
              <div className="row justify-content-center mt-5">
                <div className="col-auto">
                  <Button btnType="save" onClick={Submit}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </>
    );
}
