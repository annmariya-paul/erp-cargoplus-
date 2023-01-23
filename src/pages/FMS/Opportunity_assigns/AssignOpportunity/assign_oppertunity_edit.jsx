import { Checkbox, Col, Form, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_HRMS, CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import { ROUTES } from "../../../../routes";

function Assign_oppertunity_edit() {
  const [editForm] = Form.useForm();
  const assign_opp_id = useParams();
  const navigate = useNavigate();

  console.log("assign oppp id", parseInt(assign_opp_id.id));

  const [allEmployees, setAllEmployees] = useState();
  const [successPopup, setSuccessPopup] = useState();
  const [employee_id, setEmployee_id] = useState();
  const [opp_idd, setOppID] = useState(parseInt(assign_opp_id.id));
  const [assign_opp_data, setAssign_Opp_Data] = useState();
  const [agnetData, setAgentData] = useState();

  console.log("jsdj", opp_idd);

  const getAssignOpportunity = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiry/${opp_idd}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAssign_Opp_Data(res.data.data);
          let arr = [];
          res.data.data.forEach((item,index)=> {
             arr.push({
            employee_branch: item.hrms_v1_employee.employee_branch,
            employee_id: item.hrms_v1_employee.employee_id,
            employee_name:item.hrms_v1_employee.employee_name,
          });
          editForm.setFieldsValue({
            employee_ids: item.hrms_v1_employee.employee_id,
          });
          })
         

          setAgentData(arr);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  console.log("ffgdsce", agnetData);

  const getAllEmployees = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAllEmployees(res.data.data);
          //   res.data.data.forEach((item,index)=>{
          //     setEmployee_id(item.employee_id)
          //   })
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const checkEmployee = (value) => {
    console.log("values ssss", value);
    let ref = false;

    ref = agnetData.some((agent, agentindex) => {
      return agent?.employee_id === value;
    });
    console.log("cecking", ref);
    return ref;
  };

  const onHandleChange = (checked, emp_id) => {
    let temp = agnetData;
    if (checked) {
      if (temp) {
        temp.push({
          employee_id: emp_id,
        });
      } else {
        temp = [{ employee_id: emp_id }];
        editForm.setFieldsValue({employee_id: emp_id})
      }
      setAgentData([...temp]);
      editForm.setFieldsValue([...temp])
    } else {
      temp = agnetData.filter((item, index) => {
        return item?.employee_id !== emp_id;
      });
      setAgentData([...temp]);
      editForm.setFieldsValue([...temp])
    }
  };

  const updateAssignOpportunity = (value) => {
    

    let temp = [];
    if (agnetData) {
      agnetData.forEach((item, index) => {
        temp.push(item.employee_id);
      });
    }
    PublicFetch.post(`${CRM_BASE_URL_FMS}/enquiry`, {
      opportunity_assign_opportunity_id: opp_idd,
      employee_ids: temp,
      opportunity_assign_agent_id: 1,
    })
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          setSuccessPopup(true);
          // getAssignOpportunity();
          close_modal(successPopup, 1200);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(`${ROUTES.ENQUIRIES}`);
      }, time);
    }
  };

  useEffect(() => {
    getAllEmployees();
    getAssignOpportunity();
  }, [opp_idd]);

  console.log("ftaaysjd", agnetData);

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
              <h6 className="lead_text">Edit Assign Opportunity</h6>
            </div>

            <Form
              name="editForm"
              form={editForm}
              onFinish={(value) => {
                console.log("Data to send", value.employee_ids);
                updateAssignOpportunity(value); 
              }}
            >
              <div className="row">
                <div className="col-12 py-3">
                  {/* <Checkbox.Group
                      style={{ width: "100%" }}
                      //   onChange={onChange}
                    > */}
                  <div className="row p-2 checkbox">
                    <div className="row">
                      {allEmployees &&
                        allEmployees.map((item, index) => {
                          if (
                            item?.hrms_v1_employment_types
                              ?.employment_type_name === "Agent"
                          ) {
                            return (
                              <div className="col-xl-4 col-lg-4 col-sm-6">
                                <Form.Item
                                  name="employee_ids"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Agents are Required",
                                    },
                                  ]}
                                >
                                  <Checkbox
                                    key={item.employee_id}
                                    value={item.employee_id}
                                    onChange={(e) => {
                                      console.log("value", e.target.value);
                                      onHandleChange(
                                        e.target.checked,
                                        item.employee_id
                                      );
                                    }}
                                    checked={checkEmployee(item.employee_id)}
                                  >
                                    {item.employee_name}
                                  </Checkbox>
                                </Form.Item>
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                  {/* </Checkbox.Group> */}
                  {/* </Form.Item> */}
                </div>

                <div className="col-12 d-flex justify-content-center gap-2 pt-2">
                  <Button type="submit" className="save_button">Save</Button>
                  <Button className="cancel_button" onClick={()=>{
                    navigate(`${ROUTES.ENQUIRIES}`)
                  }}>cancel</Button>

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

export default Assign_oppertunity_edit;
