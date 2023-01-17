import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import {Link} from "react-router-dom";
import { MdPageview } from "react-icons/md";
import { Form,Input,Select,DatePicker} from "antd";
import TableData from "../../../../components/table/table_data";
import { FaEdit,FaTrash } from "react-icons/fa";
import Leadlist_Icons from "../../../../components/lead_list_icon/lead_list_icon";
import {ROUTES} from "../../../../routes";
import PublicFetch from "../../../../utils/PublicFetch";
import { FiEdit } from "react-icons/fi";
import CustomModel from "../../../../components/custom_modal/custom_model";


function Seaport (){
    const [frightType, setFrightType] = useState();
    const [addForm] = Form.useForm();
    const [error, setError] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [searchedText, setSearchedText] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const [modalAddairport, setModalAddAirport] = useState(false);
  
    const [pageSize, setPageSize] = useState("25");
  
    const [showViewModal, setShowViewModal] = useState(false);
    const [FrightEditPopup, setFrightEditPopup] = useState(false);
    const [editForm] = Form.useForm();


    const columns = [
        {
          title: "ACTION",
          dataIndex: "action",
          key: "key",
          width: "30%",
          render: (data, index) => {
            console.log("index is :",index);
            return (
              <div className="d-flex justify-content-center align-items-center gap-2">
               
                  <div
                    className="editIcon m-0"
                    onClick={() =>{  
                        setFrightEditPopup(true)
                          }}
                  >
                    <FaEdit />
                  </div>
                  <div
                  className="viewIcon m-0"
                  onClick={() => setShowViewModal(true) }
                >
                  <MdPageview   style={{marginLeft:15,marginRight:15}}/>
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
          title: "SEAPORT NAME",
          dataIndex: "airport_name",
          key: "freight_type_name",
          filteredValue: [searchedText],
          onFilter: (value, record) => {
            return String(record.fright_name)
              .toLowerCase()
              .includes(value.toLowerCase());
          },
          align: "center",
        },
        {
            title: "SEAPORT CODE",
            dataIndex: "airport_code",
            key: "freight_type_name",
            filteredValue: [searchedText],
            onFilter: (value, record) => {
              return String(record.fright_name)
                .toLowerCase()
                .includes(value.toLowerCase());
            },
            align: "center",
          },
      ];
    
      const data = [
        {
           airport_name: "test abc",
           airport_code: "0623",
           key: "1",
        },
        {
            airport_name: "tested",
            airport_code: "0568",
            key: "2",
        },
      ];  

    return (
        <>
          <div className="container-fluid container2 pt-3">
            <div className="row flex-wrap">
              <div className="col">
                <h5 className="lead_text">Seaport</h5>
              </div>
              {/* <Leadlist_Icons /> */}
            </div>
            <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
              <div className="col-4">
                <Input.Search
                  placeholder="Search by Airport Name"
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
              <div className="col-9 d-flex justify-content-end">
                <Button btnType="add" 
                onClick={() =>
                  {
                    setModalAddAirport(true);
                  }}
                  >
                  Add Seaport
                </Button>
              </div>
            </div>
            <div className="datatable">
              <TableData
                // data={getData(numofItemsTo, pageofIndex)}
               
                data={data}
                columns={columns}
                custom_table_css="table_lead_list"
              />
            </div>
          </div>
    
    
    
          <CustomModel
          
            show={modalAddairport}
            onHide={() => setModalAddAirport(false)}
            header="Add Fright"
            footer={false}
            // {...props}
            View_list
            list_content={
              <>
                <div className="row">
                  <h5 className="lead_text">Add Seaport</h5>
                </div>
                <Form
               form={addForm}
                //   onFinish={(data) => {
                //     console.log("valuezzzzzzz", data);
                //     createFrights();
                //   }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                  <div className="row py-4">
                    <div className="col-12 pt-1">
                      <label>SeaPort Name</label>
                      <div>
                      <Form.Item
                        name="freightname"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z ]+$"),
                            message: "Please enter a Valid  Name",
                          },
                          
                          {
                            min: 3,
                            message: "Name must be atleast 3 characters",
                          },
                          {
                            max: 100,
                            message:
                              " Name cannot be longer than 100 characters",
                          },
                        ]}
                      >
                        <InputType 
                       
                        />
                      </Form.Item>
                      
                      {/* {uniqueCode ? (
                                <p style={{ color: "red",marginTop:"-24px" }}>
                                Fright Type Name {uniqueErrMsg.UniqueErrName}
                                </p>
                              ) : null} */}
                    </div>
                    </div>
                    <div className="col-12 pt-1">
                      <label>Seaport Code</label>
                      <div>
                      <Form.Item
                        name="freightcode"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp("^[A-Za-z ]+$"),
                            message: "Please enter a Valid  Name",
                          },
                          
                          {
                            min: 3,
                            message: "Name must be atleast 3 characters",
                          },
                          {
                            max: 100,
                            message:
                              " Name cannot be longer than 100 characters",
                          },
                        ]}
                      >
                        <InputType 
                       
                        />
                      </Form.Item>
                      
                      {/* {uniqueCode ? (
                                <p style={{ color: "red",marginTop:"-24px" }}>
                                Fright Type Name {uniqueErrMsg.UniqueErrName}
                                </p>
                              ) : null} */}
                    </div>
                    </div>
    
                    {/* <div className="col-12 pt-1">
                      <label>Date</label>
                      <Form.Item
                        name="date"
                        rules={[
                          {
                            required: true,
                            message: "Please select a date",
                          },  
                        ]}
                       
                      >
                         <DatePicker
                            style={{ borderWidth: 0 }}
                            //  disabledDate={today}
                            disabledDate={(d) => !d || d.isBefore(today)}
                            onChange={(e) => {
                              console.log("date mmm", e);
                              setDate(e);
                            }}
                          />
                        
                      </Form.Item>
                    </div> */}
                  </div>
                  <div className="row justify-content-center ">
                    <div className="col-auto">
                      <Button btnType="save">Save</Button>
                    </div>
                  </div>
                </Form>
              </>
            }
          >
            <Custom_model
              size={"sm"}
              show={successPopup}
              onHide={() => setSuccessPopup(false)}
              success
            />
          </CustomModel>
    
    
           <Custom_model
              show={showViewModal}
              onHide={() => setShowViewModal(false)}
              View_list
              list_content={
                <div className="container-fluid p-3">
                  <div className="row">
                    <div className="col-9">
                      <h5 className="lead_text">Seaport</h5>
                    </div>
                    <div className="col-3">
                      <Button
                        btnType="add_borderless"
                        className="edit_button"
                        onClick={() => {
                        //   handleviewtoedit(viewfrights);
                          setFrightEditPopup(true)
                          setShowViewModal(false);
                        }}
                      >
                        Edit
                        <FiEdit 
                          style={{ marginBottom: "4px", marginInline: "3px" }}
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-4">
                      <p> Seaport Name</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-6 justify-content-start">
                      <p className="modal-view-data">test abc</p>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-4">
                      <p> Seaport Code</p>
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-6 justify-content-start">
                      <p className="modal-view-data">0786</p>
                    </div>
                  </div>
                 
                </div>
              }
            />
          <Custom_model
             show={FrightEditPopup}
            onHide={() => setFrightEditPopup(false)}
            View_list
            list_content={
              <div>
                <div className="container-fluid px-4 my-3">
                  <div>
                    <h5 className="lead_text">Edit Seaport</h5>
                  </div>
                  <div className="row my-3 ">
                    <Form
                      form={editForm}
                      onFinish={(values) => {
                        console.log("values iss", values);
                    //    handleUpdate();
                      }}
                      onFinishFailed={(error) => {
                        console.log(error);
                      }}
                    >
                      <div className="col-12">
                        <label>Name</label>
                        <Form.Item
                          name="NameInput"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                              message: "Please enter a Valid Fright type Name",
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
                            className="input_type_style w-100"
                            // value={NameInput}
                            // onChange={(e) => {
                            //   setNameInput(e.target.value);
                            //   setErrormsg("");
                            //   setuniqueeditCode(false);
                            // }}
                            // onBlur={ async () => {
                                
                            //   if (newName !== NameInput){
                            //     let a = await CheckUnique({type:"freighttypename",value:NameInput})
                            //     console.log("hai how are u", a)
                            //     setuniqueeditCode(a);
                               
                            //   }
                              
                            // }}
                          />
                        </Form.Item>
                        
                         {/* {uniqueeditCode ? (
                            <p style={{ color: "red", marginTop:"-24px" }} className="mb-2">
                              Fright type Name {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null} */}
                      </div>
                      <div className="col-12">
                        <label>Code</label>
                        <Form.Item
                          name="NameInput"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                              message: "Please enter a Valid Fright type Name",
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
                            className="input_type_style w-100"
                         
                          />
                        </Form.Item>
                        
                         {/* {uniqueeditCode ? (
                            <p style={{ color: "red", marginTop:"-24px" }} className="mb-2">
                              Fright type Name {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null} */}
                      </div>
                     
                      <div className="col-12 d-flex justify-content-center mt-5">
                        <Button className="save_button">Save</Button>
                      </div>
                    </Form>
                  </div>
                  {/* {error ? (
                    <div className="">
                      <ErrorMsg code={"400"} />
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
            }
          />
              <CustomModel
            size={"sm"}
            show={successPopup}
            onHide={() => setSuccessPopup(false)}
            success
          />
          {error? <ErrorMsg code={"500"} /> : " "}
        </>
      );

}
export default Seaport