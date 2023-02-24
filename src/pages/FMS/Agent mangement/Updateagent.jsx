// import { Form, Select } from "antd";
// import React, { useEffect, useMemo, useState } from "react";
// import TextArea from "../../../components/ InputType TextArea/TextArea";
// import Button from "../../../components/button/button";
// import SelectBox from "../../../components/Select Box/SelectBox";
// import { getData, getNameList } from "country-list";
// import { useNavigate, useParams } from "react-router-dom";
// import PublicFetch from "../../../utils/PublicFetch";
// import {
//   CRM_BASE_URL_HRMS,
//   GENERAL_SETTING_BASE_URL,
// } from "../../../api/bootapi";
// import Custom_model from "../../../components/custom_modal/custom_model";
// import { ROUTES } from "../../../routes";
// // import { useNavigate } from "react-router-dom";

// function UpdateAgent() {
//   const [countryis, setCountryis] = useState();
//   const [editempname, setEditempname] = useState("");
//   const [editcountrynme, seteditcountrynme] = useState("");
//   const [editcommision, seteditcommision] = useState("");
//   const [allempname, setAllempname] = useState();
//   const [editempid, seteditempid] = useState();
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [allCountries, setAllCountries] = useState();
//   const [employeeagentid,setemployeeagentid]= useState()
//   const navigate = useNavigate();

//   const options = useMemo(() => getData(), []);
//   const { id } = useParams();
//   const [addForm] = Form.useForm();

//   console.log("Idsaa", id);
//   const close_modal = (mShow, time) => {
//     if (!mShow) {
//       setTimeout(() => {
//         setSaveSuccess(false);
//         navigate(ROUTES.LISTAGENT);
//       }, time);
//     }
//   };

//   const handleChange = (e) => {
//     seteditcountrynme(e);
//     // setCountryis(e);
//   };

//   const getAllEmployee = () => {
//     PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees`)
//       .then((res) => {
//         console.log("all employeessss", res);
//         setAllempname(res.data.data);
//       })
//       .catch((err) => {
//         console.log("Error", err);
//       });
//   };

//   const getoneagent = async () => {
//     try {
//       const oneagent = await PublicFetch.get(
//         `${process.env.REACT_APP_BASE_URL}/agents/${id}`
//       );
//       console.log("one agentss are ::", oneagent?.data?.data);
//       console.log("one employee agent id ::", oneagent?.data?.data.agent_emp_id);
//       setemployeeagentid(oneagent?.data?.data?.agent_emp_id)

//       console.log(
//         "emp agent is ::",
//         oneagent?.data?.data.hrms_v1_employee.employee_name
//       );

//       seteditempid(oneagent?.data?.data.agent_id);
//       setEditempname(oneagent?.data?.data?.hrms_v1_employee.employee_name);
//       seteditcountrynme(oneagent?.data?.data.agent_country);
//       seteditcommision(oneagent?.data?.data.agent_commission_details);
//       // setAgentdata(allagent?.data?.data)
//     } catch (err) {
//       console.log("error to getting all units", err);
//     }
//   };

//   console.log("emp id ", editempid);
//   const updateClick = async () => {
//     try {
//       const updating = await PublicFetch.patch(
//         `${process.env.REACT_APP_BASE_URL}/agents/${id}`,
//         {
//           agent_emp_id: employeeagentid,
//           agent_country: editcountrynme,
//           agent_commission_details: editcommision,
//         }
//       );
//       console.log("editedd data is", updating);
//       if (updating.data.success) {
//         console.log("successfully updating ");
//         //  getallunits()
//         //  setEditShow(false);
//         setSaveSuccess(true);
//         close_modal(saveSuccess, 1200);
//       }
//     } catch (err) {
//       console.log("error to getting all units", err);
//     }
//   };

//   const getAllCountries = () => {
//     PublicFetch.get(`${GENERAL_SETTING_BASE_URL}/country`)
//       .then((res) => {
//         console.log("response", res);
//         if (res.data.success) {
//           console.log("success", res.data.data);
//           setAllCountries(res.data.data);
//         }
//       })
//       .catch((err) => {
//         console.log("Error", err);
//       });
//   };

//   useEffect(() => {
//     getAllEmployee();
//     getoneagent();
//     getAllCountries();
//   }, [id]);

//   console.log("nameee", allempname);
//   console.log("countty nmee", editcountrynme);
//   console.log("country", options);
//   return (
//     <div>
//       <div className="container p-5">
//         <div className="row">
//           {/* <div className="">
//             <h3>Agent Mangement</h3>
//           </div> */}
//           <div className="col-12">
//             <div className="card p-3 border-0 shadow-sm">
//               <div className="container">
//                 <div className="row">
//                   <div className="col-12">
//                     <h4 className="">Update An Agent</h4>
//                     <div className="container-fluid">
//                       <Form
//                         form={addForm}
//                         onFinish={(value) => {
//                           console.log("the formvaluess iss", value);
//                           updateClick();
//                         }}
//                         onFinishFailed={(error) => {
//                           console.log(error);
//                         }}
//                       >
//                         <div className="row">
//                           <div className="col-6">
//                             <div className="">
//                               <label>Employee Id</label>
//                               <Form.Item
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: "empname is Required",
//                                   },
//                                 ]}
//                               >
//                                 <SelectBox
//                                   value={editempname}
//                                   onChange={(e) => {
//                                     console.log("sdf", e);
//                                     setEditempname(parseInt(e));
//                                   }}
//                                   // onChange={(e) => {
//                                   //   console.log("selected unit iss", e);
//                                   //   // setEmpname(e);
//                                   // }}
//                                 >
//                                   {allempname &&
//                                     allempname.length > 0 &&
//                                     allempname.map((item, index) => {
//                                       if (item.employee_type == "1") {
//                                         return (
//                                           <Select.Option
//                                             key={item.employee_id}
//                                             value={item.employee_id}
//                                           >
//                                             {item.employee_name}
//                                             {/* {item.employee_type == "2" ?item.employee_name :"" } */}
//                                           </Select.Option>
//                                         );
//                                       }
//                                     })}
//                                 </SelectBox>
//                               </Form.Item>
//                             </div>
//                           </div>
//                           <div className="col-6">
//                             <div className="">
//                               <label>Country</label>
//                               <Form.Item>
//                                 <SelectBox
//                                   value={editcountrynme}
//                                   showSearch
//                                   allowClear={true}
//                                   optionFilterProp="children"
//                                   onChange={handleChange}
//                                 >
//                                   {allCountries &&
//                                     allCountries.length > 0 &&
//                                     allCountries.map((item, index) => {
//                                       return (
//                                         <Select.Option
//                                           key={item.country_id}
//                                           id={item.country_id}
//                                           value={item.country_name}
//                                         >
//                                           {item.country_name}
//                                         </Select.Option>
//                                       );
//                                     })}
//                                 </SelectBox>
//                               </Form.Item>
//                             </div>
//                           </div>
//                           <div className="col-6">
//                             <div className="">
//                               <label>Commission</label>
//                               <Form.Item>
//                                 <TextArea
//                                   value={editcommision}
//                                   onChange={(e) => {
//                                     seteditcommision(e.target.value);
//                                   }}
//                                 />
//                               </Form.Item>
//                             </div>
//                           </div>
//                           <div className="col-12">
//                             <div className="d-flex justify-content-center">
//                               <Button
//                                 type="submit"
//                                 className="p-2 save_button_style"
//                               >
//                                 Save
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       </Form>

//                       <Custom_model
//                         size={"sm"}
//                         show={saveSuccess}
//                         onHide={() => setSaveSuccess(false)}
//                         success
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpdateAgent;
