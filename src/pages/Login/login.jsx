import React, { useState } from "react";
import "../Login/login.scss";
import { Checkbox, Form, Input } from "antd";
import InputType from "../../components/Input Type textbox/InputType";
import { CRM_BASE_URL } from "../../api/bootapi";
import PublicFetch from "../../utils/PublicFetch";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";

function Login() {
  const [addForm] = Form.useForm();
  const [error403, setError403] = useState(false);
  const [username, setUsername] = useState("");
  console.log("username", username);
  const [password, setPassword] = useState("");
  console.log("password", password);
  const navigate = useNavigate();
  const Submit = () => {
    console.log("Entered");
    try {
      const logeduser = PublicFetch.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
          user_email: username,
          user_password: password,
        }
      ).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("UserToken", JSON.stringify(res.data.data.token));
        PublicFetch.get(
          `${process.env.REACT_APP_BASE_URL}/permissions/${res?.data?.data?.role}`
        ).then((res) => {
          if (res?.data?.success && res.data.data.length > 0) {
            let userPermissions = [];

            res.data.data.forEach((item, index) => {
              userPermissions.push({
                module: item?.objects?.name,
                permissions: item?.action,
              });
            });
            // console.log("Permissions : ", userPermissions);
            localStorage.setItem(
              "userPermissions",
              JSON.stringify(userPermissions)
            );
            navigate("/dashboard");
          }
        });
      });
      //  if(logeduser.data.success){
      // if(logeduser.request.status==201){
      // console.log("console of success ",logeduser.request.status);

      // alert("success");

      //  }
    } catch (err) {
      // console.log("newwww",err.response.request.status);
      // if(err.response.request.status==403){
      //   setError403(true);
      //   console.log("Invalid Username and password ");
      // }else if(err.response.request.status==500){
      //   console.log("Something went wrong",err);
      //   alert("Login failed");
      // }
    }
  };

  return (
    <div className="container mb-4 d-flex justify-content-center">
      <div className="container1 ">
        <div className="row mx-2">
          <Form
            form={addForm}
            onFinish={(value) => {
              console.log("valuezzzzzzz", value);
              Submit();
              // submitaddunit()
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
          >
            <div className="row flex-wrap pt-1">
              <div className="row ms-0 py-1">
                <div className="col-12 pt-3">
                  <h3>LOGIN</h3>
                  <label>User Name</label>
                  <Form.Item
                    name="user_email"
                    rules={[
                      {
                        required: true,
                        // pattern: new RegExp("^[A-Za-z]+$"),
                        message: "Please enter a valid User Name",
                      },
                    ]}
                    onChange={(e) => {
                      setError403(false);
                      setUsername(e.target.value);
                    }}
                  >
                    <Input
                      style={{ backgroundColor: "#f4f4f7" }}
                      autocomplete="off"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="row ms-0 py-1">
                <div className="col-12 ">
                  <label>Password</label>
                  <Form.Item
                    name="user_password"
                    rules={[
                      {
                        required: true,
                        // pattern: new RegExp("^[A-Za-z]+$"),
                        message: "Please enter a valid password",
                      },
                    ]}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError403(false);
                    }}
                  >
                    {/* <InputType type="password" /> */}
                    <Input
                      type="password"
                      style={{ backgroundColor: "#f4f4f7" }}
                    />
                  </Form.Item>
                </div>
              </div>
              {error403 ? (
                <div>
                  <p style={{ textAlign: "center", color: "red" }}>
                    Login Failed ... Please check Username and password{" "}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <Button btnType="add" htmlType="submit">
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Login;
