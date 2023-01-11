import { Checkbox, Row, Form, Select, Col } from "antd";
import React, { useEffect, useState } from "react";
import SelectBox from "../../../../components/Select Box/SelectBox";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import "./assign_opportunity.scss";
import CustomModel from "../../../../components/custom_modal/custom_model";
import { useParams } from "react-router-dom";
import { CRM_BASE_URL_HRMS } from "../../../../api/bootapi";

function Assign_opportunity() {
  const opp_id = useParams();
  console.log("opportunity_id", opp_id);
  const [module1Click, setModule1Click] = useState(true);
  const [allRoleData, seAllRoleData] = useState();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [allEmployees,setAllEmployees] = useState()
  const [successPopup, setSuccessPopup] = useState(false);

  // const getRoles = () => {
  //   PublicFetch.get(`${process.env.REACT_APP_BASE_URL}/permissions/roles`)
  //     .then((res) => {
  //       console.log("Response", res);
  //       if (res.data.success) {
  //         seAllRoleData(res.data.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // };

  

  

  const getAllEmployees = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees`)
      .then((res) => {
        console.log("Response", res);
        if(res.data.success){
          console.log("success",res.data.data);
          setAllEmployees(res.data.data)
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const createAssignOpp = ()=> {
    PublicFetch.post(``)
  }

  useEffect(() => {
    // getRoles();
    getAllEmployees();
  }, []);

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

            <Form onFinish={(value)=> {
              console.log("Data to send",value)
            }}>
              <div className="row">
                <div className="col-12 py-3">
                <Form.Item name="employee_ids">
                  <Checkbox.Group
                    style={{ width: "100%" }}
                    //   onChange={onChange}
                  >
                    <div className="row p-2 checkbox">
                      <Row>
                      {allEmployees && allEmployees.map((item,index) => {

                        if(item?.hrms_v1_employment_types?.employment_type_name === "Agent"){
                          return(
                          <Col span={8}>
                          
                          <Checkbox value={item.employee_id} onChange={(e)=> {
                            console.log("value",e.target.value)
                          }}>{item.employee_name} </Checkbox>
                          
                        </Col>
                        )
                        }
                       
                      })}
                        
                      
                      </Row>
                    </div>
                  </Checkbox.Group>
                  </Form.Item>
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
