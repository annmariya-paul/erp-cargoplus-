import React, { useEffect, useState } from "react";
import "./enquiries.scss";
import { useParams } from "react-router-dom";
import { Form, Input, Select } from "antd";
import Button from "../../../../components/button/button";
import SelectBox from "../../../../components/Select Box/SelectBox";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import TableData from "../../../../components/table/table_data";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { ROUTES } from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL, CRM_BASE_URL_FMS } from "../../../../api/bootapi";

export default function Agent_Response() {
  const { id } = useParams();
  console.log("idddddddddddddddd", id);
  const [addForm] = Form.useForm();
  const [successPopup, setSuccessPopup] = useState(false);
  const [modalAddResponse, setModalAddResponse] = useState(false);
  const [modalEditResponse, setModalEditResponse] = useState(false);
  const [opportunityId, setOpportunityId] = useState();
  const [opporNumber, setOpporNumber] = useState();
  const [opporLead, setOpporLead] = useState();
  const [assignOpporData, setAssignOpporData] = useState();
  const [agentResponseId, setAgentResponseId] = useState();
  const [responseEnquiryId,setResponseEnquiryId] = useState();
  const [responseId, setResponseId] = useState();
  const [agentResponse, setAgentResponse] = useState([]);

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  // {function to fetch one opportunity data - Ann - 27/1/23}
  const getOneOpportunity = () => {
    PublicFetch.get(`${CRM_BASE_URL}/opportunity/${id}`).then((res) => {
      console.log("single brand value", res);
      if (res.data.success) {
        setOpportunityId(res.data.data.opportunity_id);
        setOpporNumber(res.data.data.opportunity_number);
        setOpporLead(res.data.data.crm_v1_leads.lead_customer_name);
      }
    });
  };

  // {function to get assigned agents - Ann - 27/1/23}
  const getAssignOpportunity = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiry/${id}`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          setAssignOpporData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // {function to get agents responses - Ann - 27/1/23}
  const getAgentResponses = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/enquiry-response`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("success", res.data.data);
          let arr = [];
          res.data.data.forEach((item, index) => {
            setAgentResponseId(item?.enquiry_response_enquiry_id);
            if (opportunityId === item?.enquiry_response_enquiry_id) {
              {
                arr.push({
                  enquiry_response_id: item.enquiry_response_id,
                  agent_name: item.agents.hrms_v1_employee.employee_name,
                  agent_response: item.enquiry_response_response,
                });
              }
            }
            setAgentResponse(arr);
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAssignOpportunity();
    getOneOpportunity();
    getAgentResponses();
  }, [opportunityId]);

  // { API to add agent reponse - Ann - 27/1/23}
  const addResponses = (data) => {
    console.log("response dataaa:::", data);
    PublicFetch.post(`${CRM_BASE_URL_FMS}/enquiry-response`, {
      enquiry_response_enquiry_id: parseInt(id),
      enquiry_response_agent: data.enquiry_response_agent,
      enquiry_response_response: data.enquiry_response_response,
    })
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success agect response Data", res.data.data);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          addForm.resetFields();
          setModalAddResponse(false);
          getAgentResponses();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // {function to repopulate data to edit - Ann - 25/1/23}
  const ResponseEdit = (e) => {
    console.log("eeeeeeeeeeeee", e);
    setResponseId(e.enquiry_response_id);
    addForm.setFieldsValue({
      responseId: e.enquiry_response_id,
      responseEnquiryId: e.enquiry_response_enquiry_id,
      agentName: e.agent_name,
      enquiryResponse: e.agent_response,
    });
    setModalEditResponse(true);
  };

  const updateAgentResponse = (data) => {
    PublicFetch.patch(`${CRM_BASE_URL_FMS}/enquiry-response/${responseId}`, {
      enquiry_response_enquiry_id: parseInt(id),
      enquiry_response_agent: data.agentName,
      enquiry_response_response: data.enquiryResponse,
    })
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          getAgentResponses();
          setModalEditResponse(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "key",
      width: "20%",
      render: (data, index) => {
        console.log("index is :", index);
        return (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="editIcon m-0">
              <FaEdit onClick={() => ResponseEdit(index)} />
            </div>
            <div className="deleteIcon m-0">
              <FaTrash />
            </div>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "AGENT",
      dataIndex: "agent_name",
      key: "agent_name",
      align: "center",
    },
    {
      title: "RESPONSE",
      dataIndex: "agent_response",
      key: "agent_response",
      align: "center",
    },
  ];

  return (
    <>
      <div className="container-fluid container_fms p-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Agents Responses</h5>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-6 d-flex">
            <div className="pe-2 pt-2" style={{ fontWeight: 500 }}>
              Opportunity No :
            </div>
            <div className="col-4 mt-1">
              <p className="input_number_style">{opporNumber}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 d-flex">
            <div className="col-2 me-4 pt-2" style={{ fontWeight: 500 }}>
              Lead :
            </div>
            <div className="col-4 mt-1">
              <p className="input_number_style">{opporLead}</p>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div className="col">
              <Button btnType="add" onClick={() => setModalAddResponse(true)}>
                Add Response
              </Button>
            </div>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={agentResponse}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
      {/* {add Response modal - Ann - 24/1/23} */}
      <Custom_model
        show={modalAddResponse}
        onHide={() => setModalAddResponse(false)}
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Response</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzz", data);
                addResponses(data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Agent Name</label>
                  <div>
                    <Form.Item
                      name="enquiry_response_agent"
                      rules={[
                        {
                          required: true,
                          message: "Please select a Valid Name",
                        },
                      ]}
                    >
                      <SelectBox>
                        {assignOpporData &&
                          assignOpporData.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.opportunity_assign_id}
                                value={item.opportunity_assign_id}
                              >
                                {item.hrms_v1_employee.employee_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>

                <div className="col-12 pt-1">
                  <label>Response</label>
                  <Form.Item
                    name="enquiry_response_response"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid Response",
                      },
                    ]}
                  >
                    <TextArea />
                  </Form.Item>
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />
      {/* {Edit Response modal - Ann - 24/1/23} */}
      <Custom_model
        show={modalEditResponse}
        onHide={() => setModalEditResponse(false)}
        footer={false}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Edit Response</h5>
            </div>
            <Form
              form={addForm}
              onFinish={(data) => {
                console.log("valuezzzz", data);
                updateAgentResponse(data);
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Agent Name</label>
                  <div>
                    <Form.Item
                      name="agentName"
                      rules={[
                        {
                          required: true,
                          message: "Please select a Valid Name",
                        },
                      ]}
                    >
                      <SelectBox>
                        {assignOpporData &&
                          assignOpporData.map((item, index) => {
                            return (
                              <Select.Option
                                key={item.opportunity_assign_employee_id}
                                value={item.opportunity_assign_employee_id}
                              >
                                {item.hrms_v1_employee.employee_name}
                              </Select.Option>
                            );
                          })}
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>

                <div className="col-12 pt-1">
                  <label>Response</label>
                  <Form.Item
                    name="enquiryResponse"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid Response",
                      },
                    ]}
                  >
                    <TextArea />
                  </Form.Item>
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
          </>
        }
      />
    </>
  );
}
