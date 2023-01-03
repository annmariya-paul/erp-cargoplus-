import { Checkbox,Row, Form, Select ,Col} from "antd";
import React, { useEffect, useState } from "react";
import SelectBox from "../../../../components/Select Box/SelectBox";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import "./assign_opportunity.scss";
import CustomModel from "../../../../components/custom_modal/custom_model";



function Assign_opportunity() {
  const [module1Click, setModule1Click] = useState(true);
  const [allRoleData, seAllRoleData] = useState();
  const [successPopup, setSuccessPopup] = useState(false);

  const getRoles = () => {
    PublicFetch.get(`${process.env.REACT_APP_BASE_URL}/permissions/roles`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          seAllRoleData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);



  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
 

 

  

 

  return (
    <div>
       <div className="container-fluid">
       <div>
          <h5 className="lead_text">Assign Opportunity to Agents</h5>
        </div>
        <div
          style={{ borderRadius: "8px" }}
          className="card border-0 content-tabs  my-3 px-4"
        >
        <div className="container my-3">
        <div className="my-3">
              <h6 className="lead_text">Assign Opportunity</h6>
            </div>
         
          <Form>
            <div className="row">
              <div className="col-12 py-3">
              <Checkbox.Group style={{ width: '100%' }} 
            //   onChange={onChange}
              >
                <div className="row p-2 checkbox">
    <Row>
      <Col span={8}>
        <Checkbox value="A">Abbbbbb</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="B">Bffffffff</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="C">Cffffff</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="D">Dwwwww</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="E">Esssss</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="F">Fsssss</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="G">Gdddddd</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="H">Hjjjjjj</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="I">fggggI</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="J">Jkkkkkk</Checkbox>
      </Col>
    </Row>
    </div>
  </Checkbox.Group>
             
              </div>
             
              <div className="col-12 d-flex justify-content-center pt-2">
                  <Button className="save_button">Save</Button>
                </div>
            </div>
           
          </Form>
          </div>
        </div>
      </div>
      <CustomModel
        size={"sm"}
        show={successPopup}
        onHide={() => setSuccessPopup(false)}
        success
      />
    </div>
    
  );
}

export default Assign_opportunity;
