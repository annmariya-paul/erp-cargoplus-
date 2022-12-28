import { EditOutlined } from "@ant-design/icons";
import { Form } from "antd";
import React, { useState } from "react";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import TableData from "../../../components/table/table_data";
import "./roles_screen.scss";

function Roles_and_Screen() {
  const [isEditOn, setIsEditOn] = useState(false);
  const [isEditTwo, setIsEditTwo] = useState(false);

  const Rolecolumns = [
    {
      title: "Slno",
      dataIndex: "slno",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "key",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "key",
      render: () => {
        return (
          <div className="">
            <div className="" onClick={() => setIsEditOn(true)}>
              <EditOutlined />
            </div>
          </div>
        );
      },
    },
  ];

  const Screencolumns = [
    {
      title: "Slno",
      dataIndex: "slno",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "key",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "key",
      render: () => {
        return (
          <div className="">
            <div className="" onClick={() => setIsEditTwo(true)}>
              <EditOutlined />
            </div>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      slno: "1",
      key: "1",
      name: "manger",
    },
  ];
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="">
            <h2></h2>
          </div>
          <div className="row py-3">
            <div className="col-12">
              <h5>Roles</h5>
            </div>
            {isEditOn ? (
              <div className="col-6 mt-2">
                <Form>
                  <Form.Item>
                    <InputType value={"jjsddjdj"} />
                  </Form.Item>
                  <div className="d-flex justify-content-center">
                    <Button className="p-2 save_button_style">Save</Button>
                  </div>
                </Form>
              </div>
            ) : (
              <div className="col-6 mt-2">
                <Form>
                  <Form.Item>
                    <InputType />
                  </Form.Item>
                  <div className="d-flex justify-content-center">
                    <Button className="p-2 save_button_style">Save</Button>
                  </div>
                </Form>
              </div>
            )}

            <div className="col-6">
              <div className="">
                <TableData columns={Rolecolumns} data={data} />
              </div>
            </div>
          </div>
          <div className="row py-3">
            <div className="col-12">
              <h5>Screens</h5>
            </div>
            {isEditTwo ? (
              <div className="col-6 mt-2">
                <Form>
                  <Form.Item>
                    <InputType value={"jjsddjdj"} />
                  </Form.Item>
                  <div className="d-flex justify-content-center">
                    <Button className="p-2 save_button_style">Save</Button>
                  </div>
                </Form>
              </div>
            ) : (
              <div className="col-6 mt-2">
                <Form>
                  <Form.Item>
                    <InputType />
                  </Form.Item>
                  <div className="d-flex justify-content-center">
                    <Button className="p-2 save_button_style">Save</Button>
                  </div>
                </Form>
              </div>
            )}

            <div className="col-6">
              <div className="">
                <TableData columns={Screencolumns} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roles_and_Screen;
