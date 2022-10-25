import { Input } from "antd";
import React, { useState } from "react";
import "../lead.styles.scss";
import "../../../opportunity_ List/opportunitylist.scss";
import FileUpload from "../../../../components/fileupload/fileUploader";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import ErrorMsg from "../../../../components/error/ErrorMessage";

function BrandCreate() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div>
      <div className="container-fluid my-4">
        <div>
          <h4 className="lead_text">Brands</h4>
        </div>
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs  my-3 px-4"
        >
          <div className="container my-3">
            <div className="my-3">
              <h5 className="lead_text">Basic Info</h5>
            </div>
            <div className="row my-5">
              <div className="col-4">
                <p>Name</p>
                <div>
                  <input type="text" className="input_type_style w-100" />
                </div>
              </div>
              <div className="col-8">
                <p>Description</p>
                <div>
                  <textarea className="input_type_style w-100" />
                </div>
              </div>
              <div className="col-4">
                <p>Display Picture</p>
                <FileUpload />
              </div>

              <div className="col-12 d-flex justify-content-center py-5">
                <Button
                  onClick={() => {
                    setSuccessPopup(true);
                    setError(true);
                  }}
                  className="save_button"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
      {error ? <ErrorMsg code={"500"} /> : ""}
    </div>
  );
}

export default BrandCreate;
