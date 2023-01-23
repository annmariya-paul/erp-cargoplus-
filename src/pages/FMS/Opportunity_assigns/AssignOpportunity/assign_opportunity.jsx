import { Checkbox, Row, Form, Select, Col } from "antd";
import React, { useEffect, useState } from "react";
import SelectBox from "../../../../components/Select Box/SelectBox";
import Button from "../../../../components/button/button";
import PublicFetch from "../../../../utils/PublicFetch";
import "./assign_opportunity.scss";
import CustomModel from "../../../../components/custom_modal/custom_model";
import { useNavigate, useParams } from "react-router-dom";
import { CRM_BASE_URL_HRMS, CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import { ROUTES } from "../../../../routes";

function Assign_opportunity() {
  const opp_id = useParams();
  console.log("opportunity_id::::", opp_id);
  const navigate = useNavigate();
  const [addForm] = Form.useForm();
  const [module1Click, setModule1Click] = useState(true);
  const [allRoleData, seAllRoleData] = useState();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [allEmployees, setAllEmployees] = useState();
  const [successPopup, setSuccessPopup] = useState(false);
  const [agnetData, setAgentData] = useState();
  const [assign_opp_data, setAssign_Opp_Data] = useState();
  const [errormsg, setErrormsg] = useState(false);
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

  const getAssignOpportunity = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiry/${opp_id?.id}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAssign_Opp_Data(res.data.data);
          let arr = [];
          res.data.data.forEach((item, index) => {
            arr.push({
              employee_branch: item.hrms_v1_employee.employee_branch,
              employee_id: item.hrms_v1_employee.employee_id,
              employee_name: item.hrms_v1_employee.employee_name,
            });
            addForm.setFieldsValue({
              employee_ids: item.hrms_v1_employee.employee_id,
            });
          });

          setAgentData(arr);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getAllEmployees = () => {
    PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAllEmployees(res.data.data);
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
        // editForm.setFieldsValue({employee_id: emp_id})
      }
      setAgentData([...temp]);
      // editForm.setFieldsValue([...temp])
    } else {
      temp = agnetData.filter((item, index) => {
        return item?.employee_id !== emp_id;
      });
      setAgentData([...temp]);
      // editForm.setFieldsValue([...temp])
    }
  };

  const createAssignOpp = (data) => {
    console.log("form dataa", data);
    if (agnetData && agnetData.length > 0) {
      let temp = [];
      if (agnetData) {
        agnetData.forEach((item, index) => {
          temp.push(item.employee_id);
        });
      }
      PublicFetch.post(`${CRM_BASE_URL_FMS}/enquiry`, {
        opportunity_assign_opportunity_id: parseInt(opp_id?.id),
        employee_ids: temp,
        opportunity_assign_agent_id: 1,
      })
        .then((res) => {
          console.log("Response", res);
          if (res.data.success) {
            setSuccessPopup(true);
            close_modal(successPopup, 1200);
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else {
      setErrormsg(true);
    }
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
    // getRoles();
    getAllEmployees();
    getAssignOpportunity();
  }, [opp_id?.id]);

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

            <Form
              form={addForm}
              // name="addForm"
              onFinish={(value) => {
                console.log("Data to send", value);
                createAssignOpp(value);
              }}
            >
              <div className="row">
                <div className="col-12 py-3">
                  {/* <Checkbox.Group
                      style={{ width: "100%" }}
                      //   onChange={onChange}
                    > */}
                  <div className="row p-2 checkbox">
                    {/* <Row> */}
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
                                // rules={[{ required: true, message: "Agents are Required" }]}
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
                                    setErrormsg(false);
                                  }}
                                  checked={checkEmployee(item?.employee_id)}
                                >
                                  {item.employee_name}{" "}
                                </Checkbox>
                              </Form.Item>
                            </div>
                          );
                        }
                      })}
                    {/* </Row> */}
                    {errormsg ? (
                      <div>
                        <label style={{ color: "red" }}>
                          Agent is Required
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* </Checkbox.Group> */}
                </div>

                <div className="col-12 d-flex justify-content-center gap-2 pt-2">
                  <Button className="save_button">Save</Button>
                  <Button
                    className="cancel_button"
                    onClick={() => {
                      navigate(`${ROUTES.ENQUIRIES}`);
                    }}
                  >
                    cancel
                  </Button>
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
