import React, { useEffect, useState } from "react";
import "./enquiries.scss";
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

export default function Agent_Response() {
  const [addForm] = Form.useForm();
  const [modalAddResponse, setModalAddResponse] = useState(false);
  const [modalEditResponse, setModalEditResponse] = useState(false);

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
              <FaEdit onClick={() => setModalEditResponse(true)} />
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
  const data = [
    { agent_name: "Agent one", agent_response: "This is a Test response" },
    { agent_name: "Agent two", agent_response: "Agent Tested response" },
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
              <p className="input_number_style">ENQ - 00001</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 d-flex">
            <div className="col-2 me-4 pt-2" style={{ fontWeight: 500 }}>
              Lead :
            </div>
            <div className="col-4 mt-1">
              <p className="input_number_style">Test Lead</p>
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
            data={data}
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
                // createTaxTypes();
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
                      name="agent_name"
                      rules={[
                        {
                          required: true,
                          message: "Please select a Valid Name",
                        },
                      ]}
                    >
                      <SelectBox>
                        <Select.Option value="agentone">Agent 1</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>

                <div className="col-12 pt-1">
                  <label>Response</label>
                  <Form.Item name="agent_response">
                    <TextArea
                    //   value={taxDescription}
                    //   onChange={(e) => setTaxDescription(e.target.value)}
                    />
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
                // createTaxTypes();
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
                      name="agent_name"
                      rules={[
                        {
                          required: true,
                          message: "Please select a Valid Name",
                        },
                      ]}
                    >
                      <SelectBox>
                        <Select.Option value="agentone">Agent 1</Select.Option>
                      </SelectBox>
                    </Form.Item>
                  </div>
                </div>

                <div className="col-12 pt-1">
                  <label>Response</label>
                  <Form.Item name="agent_response">
                    <TextArea
                    //   value={taxDescription}
                    //   onChange={(e) => setTaxDescription(e.target.value)}
                    />
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
