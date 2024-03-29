import { EditOutlined } from "@ant-design/icons";
import { Form } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import Custom_model from "../../../components/custom_modal/custom_model";
import InputType from "../../../components/Input Type textbox/InputType";
import TableData from "../../../components/table/table_data";
import PublicFetch from "../../../utils/PublicFetch";
import "./roles_screen.scss";
import CheckUnique from "../../../check Unique/CheckUnique";
import { UniqueErrorMsg } from "../../../ErrorMessages/UniqueErrorMessage";

function Roles_and_Screen() {
  const [addForm] = Form.useForm();
  // const [editForm] = Form.useForm();
  const [isEditOn, setIsEditOn] = useState(false);
  const [isEditTwo, setIsEditTwo] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const [addemploytypename, setaddemploytypename] = useState("");
  const [newName,setNewName]=useState();
  const [getallRoles, setGetAllRoles] = useState();
  const [employeeType, setEmployeeType] = useState();
  const [role_id, setRole_id] = useState();
  const [serialNo, setserialNo] = useState(1);
  const [uniqueCode, setuniqueCode] = useState(false);
const [uniqueeditCode, setuniqueeditCode] = useState(false);
const [employeeTName, setEmployeeTName] = useState();
  

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessModal(false);
      }, time);
    }
  };
  const CreateRole = (data) => {
    PublicFetch.post(
      `${process.env.REACT_APP_BASE_URL}/permissions/roles`,
      {
        name: addemploytypename.trim(" ")
      }
    )
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success", res.data.data);
          setSuccessModal(true);
          close_modal(successModal, 1200);
          getRoles();
          addForm.resetFields();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getRoles = () => {
    PublicFetch.get(`${process.env.REACT_APP_BASE_URL}/permissions/roles`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of all Roles ", res.data.data);
          setGetAllRoles(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleEditClickRole = (data) => {
    console.log("Data's to edit", data);
    if (data) {
      addForm.setFieldsValue({
        id: data.id,
        name: data.name,
      });

      setIsEditOn(true);
      setRole_id(data.id);
    }
  };

  const updateRoles = (data) => {
    PublicFetch.patch(
      `${process.env.REACT_APP_BASE_URL}/permissions/roles/${role_id}`,
      {
        name: employeeTName.trim(""),
      }
    )
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Suucess in updating", res.data.data);
          getRoles();
          setSuccessModal(true);
          close_modal(successModal, 1200);
          setIsEditOn(false);
          addForm.resetFields();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  const Rolecolumns = [
    {
      title: "No.",
      key: "index",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "key",
      render: (data, index) => {
        return (
          <div className="">
            <div className="" onClick={() => handleEditClickRole(index)}>
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
      key: "name",
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
      <div className="container-fluid container_hrms pt-3">
        <div className="container">
          <div className="">
            <h2></h2>
          </div>
          <div className="row py-5">
            <div className="col-12">
              <h5 style={{ color: "#0891d1" }}>Roles</h5>
            </div>
            
            {isEditOn ? (
              <div className="col-6 mt-3 ">
                <Form
                  form={addForm}
                  onFinish={(value) => {
                    console.log("jdfhg", value);
                    updateRoles(value);
                  }}
                >
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Name is Required",
                      },
                      {
                        min: 2,
                        message: "Minimum 2 characters Required",
                      },
                    ]}
                  >
                    <InputType
                   
                   
                    value={employeeTName}
                    onChange={(e) => {
                      setEmployeeTName(e.target.value);
                      setuniqueeditCode(false);
                    }}
                   
                    onBlur={ async () => {
                     
                      if (newName !== employeeTName){
                        let a = await CheckUnique({type:"rolename",value:employeeTName})
                       setuniqueeditCode(a)
                      }
                   
                    }}
                    
                    />
                  </Form.Item>
                  {uniqueeditCode ? (
                        <p style={{ color: "red" }}>
                          Role {uniqueErrMsg.UniqueErrName}
                        </p>
                      ) : null}

                  <div className="d-flex justify-content-center ">
                    <Button type="submit" className="p-2 save_button_style" >
                      Save
                    </Button>
                  </div>
                </Form>
              </div>
            ) : (
              <div className="col-6 mt-3">
                <Form
                  id=""
                  name="addForm"
                  form={addForm}
                  onFinish={(value) => {
                    console.log("if successs of create", value);
                    CreateRole(value);
                  }}
                >
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Name is Required",
                      },
                      {
                        min: 2,
                        message: "Minimum 2 characters Required",
                      },
                    ]}
                    onChange={(e) => setaddemploytypename(e.target.value)}
                  >
                    <InputType 
                    
                    onChange={(e) => {
                      setEmployeeType(e.target.value);
                      setuniqueCode(false);
                    }}
                    onBlur={ async () => {
                        
                      let a = await CheckUnique({type:"rolename",value:employeeType})
                      
                      setuniqueCode(a)
                    }}
                    />
                  </Form.Item>
                  {uniqueCode ? (
                      <p style={{ color: "red" }}>
                     Role {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}


                  <div className="d-flex justify-content-center">
                    <Button type="submit" className="p-2 save_button_style">
                      Save
                    </Button>
                  </div>
                </Form>
              </div>
            )}

            <div className="col-6 ">
              <div className="">
                <TableData columns={Rolecolumns} data={getallRoles} />
              </div>
            </div>
          </div>
          {/* <div className="row py-5">
            <div className="col-12">
              <h5 style={{ color: "#0891d1" }}>Screens / Objects</h5>
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
          </div> */}
        </div>
      </div>
      <Custom_model show={successModal} success />
    </div>
  );
}

export default Roles_and_Screen;
