import { Form, Select, Input } from "antd";
import { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import SelectBox from "../../../components/Select Box/SelectBox";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS, GENERAL_SETTING_BASE_URL } from "../../../api/bootapi";
import Custom_model from "../../../components/custom_modal/custom_model";

function Fmssettings() {
  const [addform] = Form.useForm();
  const[allincoterms,setallincoterms]=useState("")

  const[defaultincoterm,setdefaultincoterm]=useState("")
  const[qtnvalidity,setqtnvalidity]= useState("")

  const [saveSuccess, setSaveSuccess] = useState(false);

  const getAllincoterm = async () => {
    try {
      const allCountries = await PublicFetch.get(
        `${CRM_BASE_URL_FMS}/incoterms/minimal`
      );
      console.log("all incotermss", allCountries.data.data);
      setallincoterms(allCountries.data.data)
      // setGetCountries(allCountries.data.data);
    } catch (err) {
      console.log("error while getting the countries: ", err);
    }
  };

  const getfmssettings = async () => {
    try {
      const allfmssetting = await PublicFetch.get(
        `${GENERAL_SETTING_BASE_URL}/fms`
      );
      console.log("all fmssettinggg", allfmssetting.data);
      setdefaultincoterm(allfmssetting.data.data.fms_settings_incorterm)
      setqtnvalidity(allfmssetting.data.data.fms_settings_qtn_validity)
      // setallincoterms(allCountries.data.data)

      addform.setFieldsValue({
        incoterm: allfmssetting.data.data.fms_settings_incorterm,
        qtnvalidity: allfmssetting.data.data.fms_settings_qtn_validity,
      });
    } catch (err) {
      console.log("error while getting the fmssettinggg: ", err);
    }
  };

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSaveSuccess(false);
        // navigate(ROUTES.ATTRIBUTES);
      }, time);
    }
  };

 
  useEffect(() => {
    getAllincoterm();
    getfmssettings();
  }, []);


  const createfmssettings = async () => {
    try {
      const addfmssetting = await PublicFetch.post(
        `${GENERAL_SETTING_BASE_URL}/fms`,
        {
          fms_settings_incorterm: defaultincoterm,
          fms_settings_qtn_validity: qtnvalidity,
        }
      );
      console.log("all fmssetting are", addfmssetting.data.success);
     
      if (addfmssetting.data.success) {
        setSaveSuccess(true);
        close_modal(saveSuccess, 1000);
      } 
      // else if (addattributes.data.success === false) {
      //   alert(addattributes.data.data);
      // }
    } catch (err) {
      console.log("error while getting the tax types: ", err);
    }
  };



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
                form={addform}
              onFinish={(data) => {
                // console.log("val", data);
                createfmssettings()
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row my-4">
                <div className="col-3">
                  <label>Default Incoterm</label>
                  <Form.Item 
                  name="incoterm"
                  >
                  <SelectBox
                   placeholder={"--Please Select--"}
                   value={defaultincoterm}
                   onChange={(e) => {
                     console.log("select the brandss", e);
                     setdefaultincoterm(parseInt(e));
                   }}
                  >
                       {allincoterms &&
                        allincoterms.length > 0 &&
                        allincoterms.map((item, index) => {
                          return (
                            <Select.Option
                              key={item.incoterm_id}
                              value={item.incoterm_id}
                            >
                              {item.incoterm_full_name}
                            </Select.Option>
                          );
                        })}

                  </SelectBox>
                    
                  </Form.Item>
                </div>
                <div className="col-3">
                  <label>Quatation Validity</label>
                  <Form.Item 
                  name="qtnvalidity" 
                  className="">
                  <InputType
                      value={qtnvalidity}
                      onChange={(e) => {
                        setqtnvalidity(parseInt(e.target.value));
                        // console.log("purchasePoNo", purchasePoNo);
                      }}
                    />
                  </Form.Item>
                </div>
                
              </div>
              <div className="col-12 d-flex justify-content-center mt-5 pt-4 gap-3 ">
                  <Button className="save_button">Save</Button>{" "}
                  {/* <Button
                    as="input"
                    type="reset"
                    value="Reset"
                    // onClick={() => {
                    //   handleCancel();
                    // }}
                  >
                    Cancel
                  </Button> */}
                </div>
            </Form>
          </div>
        </div>
      </div>

      <Custom_model
          size={"sm"}
          show={saveSuccess}
          onHide={() => setSaveSuccess(false)}
          success
        />
    </>
  );
}
export default Fmssettings;
