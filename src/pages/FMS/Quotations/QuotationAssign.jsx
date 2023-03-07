import React, { useEffect, useState } from "react";
import { Checkbox, Form } from "antd";
import Button from "../../../components/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import {
  CRM_BASE_URL,
  CRM_BASE_URL_FMS,
  CRM_BASE_URL_HRMS,
  CRM_BASE_URL_PURCHASING,
} from "../../../api/bootapi";
import CustomModel from "../../../components/custom_modal/custom_model";

function QuotationAssign() {
  const { id } = useParams();
  console.log("id::params", id);
  const navigate = useNavigate();
  const [addForm] = Form.useForm();
  const [allAgents, setAllAgents] = useState();
  const [agnetData, setAgentData] = useState();
  const [opportunity_id, setOpportunity_id] = useState();
  const [errormsg, setErrormsg] = useState(false);

  const [successPopup, setSuccessPopup] = useState();

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
        navigate(`${ROUTES.QUATATIONS}`);
      }, time);
    }
  };

  const AllEnquires = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/quotation/${id}`)
      .then((res) => {
        console.log("response_quotation", res);
        if (res.data.success) {
          console.log("scuccess_quotation", res.data.data);
          if (
            res.data.data?.quotation?.fms_v1_enquiry_quotations &&
            res.data.data?.quotation?.fms_v1_enquiry_quotations.length > 0
          ) {
            res.data.data?.quotation?.fms_v1_enquiry_quotations.forEach(
              (item, index) => {
                setOpportunity_id(item.enquiry_quotation_opportunity_id);
                PublicFetch.get(
                  `${CRM_BASE_URL}/opportunity/${item?.enquiry_quotation_opportunity_id}`
                )
                  .then((res) => {
                    console.log("Response opportunity", res);
                    if (res.data.success) {
                      console.log("Success opportunity", res.data.data);
                      let temp = [];
                      res?.data?.data?.assigned_employees.forEach(
                        (item, index) => {
                          temp.push({
                            employee_id: item?.agent_id,
                            employee_name: item?.crm_v1_vendors?.vendor_name,
                          });
                        }
                      );
                      setAllAgents(temp);
                    }
                  })
                  .catch((err) => {
                    console.log("Error", err);
                  });
              }
            );
          } else {
            PublicFetch.get(`${process.env.REACT_APP_BASE_URL}/agents`)
              .then((res) => {
                console.log("response employee", res);
                if (res.data.success) {
                  console.log("success employee", res.data.data);
                  let tmp = [];
                  res.data.data.forEach((item, index) => {
                    console.log("all employee who is agent", item);
                    tmp.push({
                      employee_id: item?.agent_id,
                      employee_name: item?.crm_v1_vendors?.vendor_name,
                    });
                  });
                  setAllAgents(tmp);
                  // console.log("all temp employe", tmp);/
                }
              })
              .catch((err) => {
                console.log("Error", err);
              });
          }
          let tmparr = [];
          res?.data?.data?.quotation?.fms_v1_quotation_agents?.forEach(
            (item, index) => {
              tmparr.push({
                employee_id: item?.quotation_agent_agent_id,
                quotation_agent_id: item.quotation_agent_id,
                quotation_agent_quotation_id: item.quotation_agent_quotation_id,
              });
            }
          );

          setAgentData(tmparr);
          res.data.data?.quotation?.fms_v1_quotation_agents.forEach(
            (item, index) => {
              console.log("Qouatation agnet id", item.quotation_agent_agent_id);
              addForm.setFieldsValue({
                employees: item.quotation_agent_agent_id,
              });
            }
          );
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const checkEmployee = (value) => {
    console.log("values ssss", value);
    let ref = false;

    ref = agnetData?.some((agent, agentindex) => {
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

  console.log("Agents Are>>", agnetData);

  const CreateAgentToQuotation = (data) => {
    console.log("data of submitting", data);
    if (agnetData && agnetData.length > 0) {
      let temp = [];
      if (agnetData) {
        agnetData.forEach((item, index) => {
          temp.push(item.employee_id);
        });
      }
      console.log("temperery value", temp);

      PublicFetch.post(`${CRM_BASE_URL_FMS}/quotation/assign-agent/${id}`, {
        quotation_agent_agent_id: temp,
      })
        .then((res) => {
          console.log("response create agent", res);
          if (res.data.success) {
            console.log("SUccess of creste agnet", res.data.data);
            setSuccessPopup(true);
            close_modal(successPopup, 1200);
            AllEnquires();
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else {
      setErrormsg(true);
    }
  };

  useEffect(() => {
    if (id) {
      AllEnquires();
    }
  }, [id, opportunity_id]);

  return (
    <div>
      <div className="container-fluid">
        <div>
          <h5 className="lead_text">Assign Quotation Agents</h5>
        </div>
        <div className="card border-0 content-tabs  my-3 px-4">
          <div className="container my-3">
            <div className="my-3">
              <h6 className="lead_text">Assign to Quotation</h6>
            </div>
            <Form
              // name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("Form Values", value);
                CreateAgentToQuotation(value);
              }}
            >
              <div className="row my-5">
                {allAgents &&
                  allAgents.length > 0 &&
                  allAgents.map((item, index) => {
                    return (
                      <div className="col-6">
                        <Form.Item name="employees">
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
                            {item.employee_name}
                          </Checkbox>
                        </Form.Item>
                      </div>
                    );
                  })}

                <div className="col-6">
                  {errormsg ? (
                    <div>
                      <label style={{ color: "red" }}>Agent is Required</label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-12 d-flex justify-content-center align-item-center gap-3 mt-5">
                  <Button type={"submit"} className="save_button">
                    Save
                  </Button>
                  <Button
                    className="cancel_button"
                    onClick={() => {
                      navigate(`${ROUTES.QUATATIONS}`);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <CustomModel
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
      </div>
    </div>
  );
}

export default QuotationAssign;
