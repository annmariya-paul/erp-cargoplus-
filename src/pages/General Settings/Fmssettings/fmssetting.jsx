import { Form, Select, Input } from "antd";
import { useEffect } from "react";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";

function Fmssettings() {

  const getAllincoterm = async () => {
    try {
      const allCountries = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/incoterms?startIndex=0&noOfItems=10`
      );
      console.log("incotermss", allCountries.data.data);
      // setGetCountries(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

 
  useEffect(() => {
    getAllincoterm();
  }, []);



  return (
    <>
      <div className="container-fluid">
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs px-2"
        >
          <div className="container my-3">
            <div>
              <h5 className="modal-title w-100">Add Fmssettings</h5>
            </div>

            <Form
              name="addForm"
              //   form={addform}
              onFinish={(data) => {
                // console.log("val", data);
                // createPurchase(data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-4">
                <div className="col-3">
                  <label>Default Incoterm</label>
                  <Form.Item name="incoterm">
                  <SelectBox></SelectBox>
                    
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Quatation Validity</label>
                  <Form.Item name="Date" className="">
                  <InputType
                    //   value={purchasePoNo}
                    //   onChange={(e) => {
                    //     setPurchasePoNo(e.target.value);
                    //     console.log("purchasePoNo", purchasePoNo);
                    //   }}
                    />
                  </Form.Item>
                </div>
                
              </div>
              <div className="col-12 d-flex justify-content-center mt-5 pt-4 gap-3 ">
                  <Button className="save_button">Save</Button>{" "}
                  <Button
                    as="input"
                    type="reset"
                    value="Reset"
                    // onClick={() => {
                    //   handleCancel();
                    // }}
                  >
                    Cancel
                  </Button>
                </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Fmssettings;
