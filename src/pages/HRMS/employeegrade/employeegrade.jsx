import React, { useEffect, useState } from "react";
// import "../designation/designation.scss";
import { Link } from "react-router-dom";
import { Form, Input, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import Button from "../../../components/button/button";
import InputType from "../../../components/Input Type textbox/InputType";
import TableData from "../../../components/table/table_data";
import ErrorMsg from "../../../components/error/ErrorMessage";
import Custom_model from "../../../components/custom_modal/custom_model";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_HRMS } from "../../../api/bootapi";



function Employeegrade(){
    // const [addForm, setAddForm] = useState();
    const [searchedText, setSearchedText] = useState("");
    const [successModal, setSuccessModal] = useState(false);
    const [pageSize, setPageSize] = useState("25");
    const [current, setCurrent] = useState(1);
    const [editShow,setEditShow]= useState(false)
    
    const [employeegradedata,setemployeegradedata]= useState("")
    const[employeegradename, setemployeegradename ]= useState("")
    const [addForm]= Form.useForm()


    const close_modal = (mShow, time) => {
        if (!mShow) {
          setTimeout(() => {
            setSuccessModal(false);
          }, time);
        }
      };
  
      const getData = (current, pageSize) => {
        return employeegradedata?.slice((current - 1) * pageSize, current * pageSize);
      };  


      

    const getallempgrade=async ()=>{
        try{
        const  allemptype =await PublicFetch.get(
          `${CRM_BASE_URL_HRMS}/employee-grades`)
          console.log("all empolymntgrades are ::",allemptype?.data?.data)
        //   setEmploymentType(allemptype?.data?.data)
        setemployeegradedata(allemptype?.data?.data)
        }
        catch(err) {
        console.log("error to getting all employmntgrade",err)
        }
        }

        useEffect(() => {
            getallempgrade()
           
          }, []); 


          const submitaddemp=async()=>{
            try{
            const addemployegrade = await PublicFetch.post(
              `${CRM_BASE_URL_HRMS}/employee-grades`,{
                employee_grade_name:employeegradename,
              })
             console.log("employegrade data is added ",addemployegrade)
             if(addemployegrade.data.success){
              getallempgrade() 
              setSuccessModal(true)
              addForm.resetFields()
              // setSaveSuccess(true)
              close_modal(successModal,1000)
             
             }

            //  else{
            //    <ErrorMsg code={"500"} />
            //  }
            }
            catch(err) {
             console.log("err to add the unit",err)
            }
            
            }


        const columns = [
            {
              title: "ACTION",
              dataIndex: "action",
              key: "key",
              width: "30%",
      
              render: (data, index) => {
                return (
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <div className="m-0">
                      <div
                        className="editIcon m-0"
                        // onClick={()=>{
                        //   handleEditclick(index)
                        // }}
                      //   onClick={() => }
                      >
                        <FaEdit />
                      </div>
                    </div>
                  </div>
                );
              },
              align: "center",
            },
            {
              title: "EMPLOYMENT TYPE NAME",
              dataIndex: "employee_grade_name",
              key: "employee_grade_name",
              filteredValue: [searchedText],
              onFilter: (value, record) => {
                return String(record.employee_grade_name)
                  .toLowerCase()
                  .includes(value.toLowerCase());
              },
              align: "center",
            },
          ];

          // const data = [
          //   {
          //     emp_type_name: "Full-time",
          //     key: "1",
          //   },
          //   {
          //     emp_type_name: "Part-time",
          //     key: "2",
          //   },
          //   {
          //     emp_type_name: "Temporary",
          //     key: "3",
          //   },
          // ];
      

    return(
<>
        <div className="container mb-4 d-flex justify-content-center">
        <div className="containerdesig ">
          <div className="row mx-2">
            <Form
              name="addForm"
              form={addForm}
              onFinish={(value) => {
                console.log("valuezzzzzzz", value);
                submitaddemp()
                // submitaddemp()
                // Submit();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row flex-wrap pt-1">
                <div className="row ms-0 py-1">
                  <div className="col-12 pt-3">
                    <label htmlfor="emp_type_name">
                      Employment grade Name
                    </label>
                    <Form.Item
                      name="Employment_type_name"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z]+$"),
                          message:
                            "Please enter a valid Employment Type Name",
                        },
                        {
                          min: 2,
                          message: "Branch Name must be atleast 2 characters",
                        },
                        {
                          max: 100,
                          message:
                            "Branch Name cannot be longer than 100 characters",
                        },
                      ]}
                      
                    >
                      <InputType
                      onChange={(e)=> setemployeegradename(e.target.value)}
                    //   onChange={(e) => setEmptypename(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button btnType="save">Save</Button>
                </div>
              </div>
            </Form>
            <Custom_model
              size={"sm"}
              show={successModal}
              onHide={() => setSuccessModal(false)}
              success
            />
          </div>
        </div>
      </div>

      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Employment Grade</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Employment Types"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 px-3">
            <Select
              bordered={false}
              className="page_size_style"
              value={pageSize}
              onChange={(e) => setPageSize(e)}
            >
              <Select.Option value="25">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">25</span>
              </Select.Option>
              <Select.Option value="50">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1"> 50</span>
              </Select.Option>
              <Select.Option value="100">
                Show
                <span className="vertical ms-1">|</span>
                <span className="sizes ms-1">100</span>
              </Select.Option>
            </Select>
          </div>
        </div>
        <div className="datatable">
          <TableData
            // data={getData(numofItemsTo, pageofIndex)}
            data={getData(current, pageSize)}
            // data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
{/* 
        <Custom_model
        size={"sm"}
        show={editShow}
        onHide={() => {
          setEditShow(false);
        }}
        View_list
        list_content={
          <div className="container-fluid px-4 my-4 ">
            <h6 className="lead_text">Edit Employment Type</h6>
            <Form
              // form={editForm}
              onFinish={(value) => {
                console.log("the formvaluess iss", value);
                // updateClick()
                // updateClick();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row">
                <div className="col-12">
                  <label>Name</label>
                  <Form.Item
                    name="Employment_type_name"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                        message: "Please enter a valid employement type",
                      },
                      {
                        whitespace: true,
                      },
                      {
                        min: 2,
                        message: "Name must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message: "Name cannot be longer than 100 characters",
                      },
                    ]}
                  >
                    <InputType
                    //   value={editemptypename }
                    //   onChange={(e) => setEditemptypename(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-xl-2 col-lg-2 col-12 justify-content-center">
                    <Button
                      btnType="save"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        }
      /> */}

      </div>
    </>
  

    )
}
export default Employeegrade