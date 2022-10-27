import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";

function Addunit() {
  const [error, setError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  return (
    <>
      <div className="container-fluid my-3">
        <h4 className="lead_text">Units And Measures</h4>
        <div className="card content-tabs px-4">
          <div className="row py-3 ">
            <h5 className="lead_text">Basic Info</h5>
          </div>
          <div className="row ">
            <div className="col-xl-5 col-lg-5 col-12">
              <label>Name</label>
              <div>
                <input type="text" className="input_style" />
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-12">
              <label>Code</label>
              <div>
                <input type="text" className="input_style" />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 col-12 py-5">
            <label className="fw_label">Description</label>
            <div>
              <textarea className="input_style " />
            </div>
          </div>

          {/* <div className=" row justify-content-center py-5">
            <div className="col-xl-3 col-lg-3 col-12 d-flex justify-content-center">
              <Button
                onClick={() => {
                  setSaveSuccess(true);
                }}
                className="save_button"
              >
                Save
              </Button>
            </div>
          </div> */}
          <div className="row justify-content-center  my-2">
            <div className="col-xl-2 col-lg-2 col-12 d-flex justify-content-center">
              <Button btnType="save" className="">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Custom_model />

      <Custom_model
        size={"sm"}
        show={saveSuccess}
        onHide={() => setSaveSuccess(false)}
        success
      />
    </>
  );
}
export default Addunit;
