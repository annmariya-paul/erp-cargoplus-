// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
// import { Form, Icon, Input, Button, Checkbox } from 'antd';

// class NormalLoginForm extends React.PureComponent {
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//       }
//     });
//   };

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <Form onSubmit={this.handleSubmit} className="login-form">
//         <Form.Item>
//           {getFieldDecorator('username', {
//             rules: [{ required: true, message: 'Please input your username!' }],
//           })(
//             <Input
//               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               placeholder="Username"
//             />
//           )}
//         </Form.Item>
//         <Form.Item>
//           {getFieldDecorator('password', {
//             rules: [{ required: true, message: 'Please input your Password!' }],
//           })(
//             <Input
//               prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               type="password"
//               placeholder="Password"
//             />
//           )}
//         </Form.Item>
//         <Form.Item>
//           {getFieldDecorator('remember', {
//             valuePropName: 'checked',
//             initialValue: true,
//           })(<Checkbox>Remember me</Checkbox>)}
//           <a className="login-form-forgot" href="">
//             Forgot password
//           </a>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="login-form-button"
//           >
//             Log in
//           </Button>
//           Or <a href="">register now!</a>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
//   NormalLoginForm
// );

// ReactDOM.render(
//   <WrappedNormalLoginForm />,
//   document.getElementById('container')
// );
import React,{ useState } from "react";
import "../Login/login.scss";
import { Checkbox, Form, Input } from 'antd';
import InputType from "../../components/Input Type textbox/InputType";
import { CRM_BASE_URL } from "../../api/bootapi";
import PublicFetch from "../../utils/PublicFetch";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";

function Login () {
    const [addForm]= Form.useForm();
    const [username,setUsername] = useState("");
    console.log("username",username);
    const [password,setPassword] = useState("");
    console.log("password",password);
    const navigate=useNavigate();
    const Submit = async()=>{
        console.log("Entered");
        try{
        const logeduser= await PublicFetch.post(`${process.env.REACT_APP_BASE_URL}/auth/login`,{
            user_name:username,
            user_password:password,
          })
         console.log("login data is added ",logeduser)
         if(logeduser.data.success){
        
        navigate("/dashboard")
        // alert("success");
        
         
         }
        //  else{
        //   //  <ErrorMsg code={"500"} />
        //   alert("Login failed");
        //  }
        }
        catch(err) {
         console.log("err to login user",err)
        }
        
        }

return (
    // <Form
    //   name="basic"
    // //   labelCol={{ span: 8 }}
    // //   wrapperCol={{ span: 16 }}
    //   initialValues={{ remember: true }}
    // //   onFinish={onFinish}
    // //   onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    // >
    //   <Form.Item
    //     label="Username"
    //     name="username"
    //     rules={[{ required: true, message: 'Please input your username!' }]}
    //   >
    //     <Input />
    //   </Form.Item>

    //   <Form.Item
    //     label="Password"
    //     name="password"
    //     rules={[{ required: true, message: 'Please input your password!' }]}
    //   >
    //     <Input.Password />
    //   </Form.Item>

    //   <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
    //     <Checkbox>Remember me</Checkbox>
    //   </Form.Item>

    //   <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //     <Button type="primary" htmlType="submit">
    //       Submit
    //     </Button>
    //   </Form.Item>
    // </Form>
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
                <h4>LOGIN</h4>
                <label >User Name</label>
                <Form.Item
                  name="user_name"
                //   rules={[
                //     {
                //       required: true,
                //       pattern: new RegExp("^[A-Za-z]+$"),
                //       message: "Please enter a valid User Name",
                //     },
                //   ]}
                  onChange={(e) => setUsername(e.target.value)}
                >
                  <InputType />
                </Form.Item>
              </div>
            </div>

            <div className="row ms-0 py-1">
              <div className="col-12 ">
                <label >Password</label>
                <Form.Item
                  name="user_password"
                //   rules={[
                //     {
                //       required: true,
                //       // pattern: new RegExp("^[A-Za-z]+$"),
                //       message: "Please enter a valid password",
                //     },
                //   ]}
                  onChange={(e) => setPassword(e.target.value)}
                >
                  <InputType />
                </Form.Item>
              </div>
            </div>

          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <Button btnType="add" >Login</Button>
            </div>
          </div>
        </Form>
        {/* <Custom_model
          size={"sm"}
          show={successModal}
          onHide={() => setSuccessModal(false)}
          success
        /> */}
      </div>
    </div>

  </div>
  );
};
export default Login;








