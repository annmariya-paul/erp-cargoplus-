// import { Form, Select } from "antd";
// import React, { useEffect, useMemo, useState } from "react";
// import TextArea from "../../../components/ InputType TextArea/TextArea";
// import Button from "../../../components/button/button";
// import SelectBox from "../../../components/Select Box/SelectBox";
// import { getData, getNameList } from "country-list";
// import PublicFetch from "../../../utils/PublicFetch";
// import {
//   CRM_BASE_URL_HRMS,
//   GENERAL_SETTING_BASE_URL,
// } from "../../../api/bootapi";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../../../routes";
// import Custom_model from "../../../components/custom_modal/custom_model";

// function CreateAgent() {
//   const [countryis, setCountryis] = useState();
//   const options = useMemo(() => getData(), []);
//   const [allempname, setAllempname] = useState();
//   const [empname, setEmpname] = useState();
//   const [empcommision, setempcommision] = useState("");
//   const [countryname, setcountryname] = useState();
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [allCountries, setAllCountries] = useState();
//   const [addForm] = Form.useForm();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCountryis(e);
//   };

//   const close_modal = (mShow, time) => {
//     if (!mShow) {
//       setTimeout(() => {
//         setSaveSuccess(false);
//         navigate(ROUTES.LISTAGENT);
//       }, time);
//     }
//   };

//   const getAllEmployee = () => {
//     PublicFetch.get(`${CRM_BASE_URL_HRMS}/employees`)
//       .then((res) => {
//         console.log("all employeessss", res);
//         console.log("all emp types aree", res.data.data);
//         let arry = [];
//         res.data.data.map((item, indx) => {
//           console.log("all jifvn", item);
//           console.log(
//             "all emp agentmap",
//             item.hrms_v1_employment_types.employment_type_name
//           );
//           arry.push({
//             emptype_name: item.hrms_v1_employment_types.employment_type_name,
//             emp_agent_name: item.employee_name,
//             emp_agent_id: item.employee_id,
//           });
//         });
//         setAllempname(arry);
//         // setAllempname(res.data.data)

//         // if (res.data.success) {
//         //   console.log("Success of employee", res.data.data);
//         //   let array = [];
//         //   res.data.data.forEach((item, index) => {
//         //     array.push({
//         //       employee_id: item.employee_id,
//         //       employee_name: item.employee_name,
//         //       employee_code: item.employee_code,
//         //       employee_department: item.hrms_v1_departments.department_name,
//         //       employee_branch:item.hrms_v1_branches.branch_name,
//         //       employee_grade: item.hrms_v1_employee_grades.employee_grade_name,
//         //       employee_type: item.hrms_v1_employment_types.employment_type_name,
//         //       employee_designation: item.hrms_v1_designations.designation_name,
//         //     });
//         //   });
//         //   setAllEmployees(array);
//         //   console.log("array data ::", array);

//         // }
//       })
//       .catch((err) => {
//         console.log("Error", err);
//       });
//   };

//   const getCountry = () => {
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
//     getCountry();
//   }, []);

//   const submitaddagent = async () => {
//     try {
//       const addagent = await PublicFetch.post(
//         `${process.env.REACT_APP_BASE_URL}/agents`,
//         {
//           agent_emp_id: empname,
//           agent_country: countryis,
//           agent_commission_details: empcommision,
//         }
//       );
//       console.log(" agent data is added ", addagent);
//       if (addagent.data.success) {
//         setSaveSuccess(true);
//         close_modal(saveSuccess, 1000);
//       }
//       //  else{
//       //    <ErrorMsg code={"500"} />
//       //  }
//     } catch (err) {
//       console.log("err to add the unit", err);
//     }
//   };

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
//                     <h4 className="">Create An Agent</h4>
//                     <div className="container-fluid">
//                       <Form
//                         form={addForm}
//                         onFinish={(value) => {
//                           console.log("the formvaluess iss", value);
//                           submitaddagent();
//                           // submitaddunit();
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
//                                 name="employee_branch"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: "Employee agent is Required",
//                                   },
//                                 ]}
//                               >
//                                 <SelectBox
//                                   value={allempname}
//                                   onChange={(e) => {
//                                     console.log("selected unit iss", e);
//                                     setEmpname(e);
//                                   }}
//                                 >
//                                   {allempname &&
//                                     allempname.length > 0 &&
//                                     allempname.map((item, index) => {
//                                       console.log("all emptypenamess", item);
//                                       if (item.emptype_name == "Agent")
//                                         return (
//                                           <Select.Option
//                                             key={item.emp_agent_id}
//                                             value={item.emp_agent_id}
//                                           >
//                                             {item.emp_agent_name}
//                                           </Select.Option>
//                                         );
//                                     })}
//                                 </SelectBox>
//                               </Form.Item>
//                               {/* <SelectBox>
//                                 <Select.Option>Manger</Select.Option>
//                               </SelectBox> */}
//                             </div>
//                           </div>
//                           <div className="col-6">
//                             <div className="">
//                               <label>Country</label>
//                               <Form.Item>
//                                 <SelectBox
//                                   showSearch={true}
//                                   allowClear
//                                   value={countryis}
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
//                                   value={empcommision}
//                                   onChange={(e) =>
//                                     setempcommision(e.target.value)
//                                   }
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

// export default CreateAgent;
