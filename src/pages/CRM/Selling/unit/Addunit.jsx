import { useState } from "react";
import { Form, Input } from "antd";
// import { Form } from "react-bootstrap";
import Button from "../../../../components/button/button";
import Custom_model from "../../../../components/custom_modal/custom_model";
import InputType from "../../../../components/Input Type textbox/InputType";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_SELLING } from "../../../../api/bootapi";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import { ROUTES } from "../../../../routes";
import { Link,  } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Addunit() {
  const [error, setError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const[unitName,setUnitName]=useState("")
  const[unitCode,setUnitCode]=useState("")
  const[unitDescription,setUnitDescription]= useState("")
  const navigate = useNavigate();
  
  const [addForm]=Form.useForm()

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSaveSuccess(false);
        navigate(ROUTES.UNIT_LIST)
      }, time);
    }
  };
  
  const handleCancel=()=>{
    navigate(ROUTES.UNIT_LIST)
  }


  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const submitaddunit=async()=>{
try{
const addunit= await PublicFetch.post(
  `${CRM_BASE_URL_SELLING}/unit`,{
    unit_name:unitName,
    unit_code:unitCode,
    unit_description:unitDescription
    
  })
 console.log("unit data is added ",addunit)
 if(addunit.data.success){
  setSaveSuccess(true)
  close_modal(saveSuccess,1000)
 
 }
 else{
   <ErrorMsg code={"500"} />
 }
}
catch(err) {
 console.log("err to add the unit",err)
}

}

  return (
    <>
      <div className="container-fluid my-3">
        <h4 className="lead_text">Units And Measurements </h4>
        <div className="card content-tabs px-4">
          <div className="row py-3 ">
            <h5 className="lead_text">Basic Info</h5>
          </div>
          <Form
            form={addForm}
            onFinish={(value) => {
              console.log("the formvaluess iss", value);
              submitaddunit();
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
          >
            <div className="row ">
              <div className="col-xl-5 col-lg-5 col-12">
                <label>Name</label>
                <div>
                  <Form.Item
                    name="unitname"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),

                        message: "Please enter a Valid Unit Name",
                      },
                      {
                        whitespace: true,
                      },
                      {
                        min: 2,
                        message: "Name must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message: "Name cannot be longer than 100 characters",
                      },
                    ]}
                  >
                    <InputType
                      value={unitName}
                      onChange={(e) => setUnitName(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-12">
                <label>Code</label>
                <div>
                  <Form.Item
                    name="unitcode"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9]+$"),
                        message: "Please enter a Valid Unit code",
                      },
                      {
                        min: 2,
                        message: "code must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message:
                          "Unit code cannot be longer than 100 characters",
                      },
                    ]}
                  >
                    <InputType
                      value={unitCode}
                      onChange={(e) => setUnitCode(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-12 py-5">
              <label className="fw_label">Description</label>
              <div>
                <Form.Item
                  name="unitdescription"
                  rules={[
                    {
                      min: 2,
                      message: "Description must be at least 2 characters",
                    },
                    {
                      max: 500,
                      message:
                        "Description cannot be longer than 500 characters",
                    },
                  ]}
                >
                  <TextArea
                    value={unitDescription}
                    onChange={(e) => setUnitDescription(e.target.value)}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="row d-flex justify-content-center  my-2">
              <div className="col-xl-1 col-lg-1 col-12 d-flex justify-content-center">
                <Button btnType="save" className="">
                  Save
                </Button>
              </div>
              <div className="col-xl-1 col-lg-1 col-12  justify-content-center">
                <Button
                  btnType="cancel"
                  onClick={() => {
                    handleCancel();
                  }}
                  className=""
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
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
