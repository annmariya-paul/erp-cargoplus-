import { Form, Select, Input } from "antd";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";

function Fmssettings() {
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
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Fmssettings;
