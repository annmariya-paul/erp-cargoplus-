import React, { useEffect, useState } from "react";
import Button from "../../../../components/button/button";
import InputType from "../../../../components/Input Type textbox/InputType";
import ErrorMsg from "../../../../components/error/ErrorMessage";
import Custom_model from "../../../../components/custom_modal/custom_model";
import SelectBox from "../../../../components/Select Box/SelectBox";
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
import {CRM_BASE_URL_FMS} from "../../../../api/bootapi";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";


export default function Carrierlist(props) {

 
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [searchedText, setSearchedText] = useState("");
 
  const [modalAddCarrier, setModalAddCarrier] = useState(false);

  const [pageSize, setPageSize] = useState("25");
  const [codeInput, setCodeInput] = useState();
  const [typeInput, setTypeInput] = useState();

 
  const [Errormsg, setErrormsg] = useState();
  const [NameInput, setNameInput] = useState();

   const [showViewModal, setShowViewModal] = useState(false);
  const [CarrierEditPopup, setCarrierEditPopup] = useState(false);
  const [editForm] = Form.useForm();
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };



 

  

 

 
 

  const carrierEdit = (e) => {
    console.log("carrier edit", e);
    setNameInput(e.carrier_name);
    setCodeInput(e.carrier_code);
    setTypeInput(e.carrier_type);
   

    // setCarrier_id(e.carrier_id);
    editForm.setFieldsValue({
      carrier_id: e.carrier_id,
      NameInput: e.carrier_name,
      codeInput:e.carrier_code,
      typeInput:e.carrier_type,
  
    });
    setCarrierEditPopup(true);
  };
  const [viewcarriers,setViewCarriers]=useState({
    id:"",
    carrierviewname:"",
    carrierviewcode:"",
    carrierviewtype:""
  })
  const handleViewClick=(item)=>{
    console.log("view all carrier",item)
    setViewCarriers({
      ...viewcarriers,
    id:item.carrier_id,
    carrierviewname:item.carrier_name,
    carrierviewcode:item.carrier_code,
    carrierviewtype:item.carrier_type,
    })
  
  
      setShowViewModal(true)
   }
  


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
                onClick={() =>carrierEdit(index)}
              >
                <FaEdit />
              </div>
              <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index) }
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
      title: "CARRIER NAME",
      dataIndex: "carrier_name",
      key: "carrier_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.carrier_name)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "CARRIER CODE",
      dataIndex: "carrier_code",
      key: "carrier_code",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.carrier_code)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "CARRIER TYPE",
      dataIndex: "carrier_type",
      key: "carrier_type",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.carrier_type)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    
  ];

  const data = [
    {
       carrier_name: "Carrier X",
       carrier_code:"3241",
       carrier_type:"Airline",
      
       key: "1",
    },
    {
        carrier_name: "Carrier y",
        carrier_code:"3242",
        carrier_type:"Shipper",
        key: "2",
    },
    {
        carrier_name: "Carrier z",
        carrier_code:"3243",
        carrier_type:"Road",
        key: "3",
    },
  ];  
 
 
 
 



  const [carriername, setCarriername] = useState();
  const [carrier_id, setCarrier_id] = useState();
 

  const handleviewtoedit=(i)=>{
    console.log("editing data iss",i)
    setCarrier_id(i.id)
  setCarriername(i.carrierviewname)

  addForm.setFieldsValue({
    // unitid: e.unit_id,
    carrier: i.carrierviewname,
   
  });
  setCarrierEditPopup(true);
  }





  

  
  return (
    <>
      <div className="container-fluid container2 pt-3">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Carriers</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Fright type Name"
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
            <Button btnType="add" onClick={() => setModalAddCarrier(true)}>
              Add Carrier types
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
      
        show={modalAddCarrier}
        onHide={() => setModalAddCarrier(false)}
        header="Add Carrier"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Carrier</h5>
            </div>
            <Form
           form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Carrier Name</label>
                  <div>
                  <Form.Item
                    name="carriername"
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
                 
                </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Carrier Code</label>
                  <div>
                  <Form.Item
                    name="carriercode"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z ]+$"),
                        message: "Please enter a Valid  Code",
                      },
                      
                      {
                        min: 3,
                        message: "code must be atleast 3 characters",
                      },
                     
                    ]}
                   
                  >
                    <InputType 
                    />
                  </Form.Item>
                 
                 
                </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Carrier Type</label>
                  <div>
                  <Form.Item
                    name="carriertype"
                    rules={[
                      {
                        required: true,
                       
                        message: "Please select a Valid Carrier Type",
                      },
                      
                     
                    ]}
                   
                  >
                   <SelectBox>
                             
                                    <Select.Option  
                                      value="Airline"
                                     >
                                      Airline
                                    </Select.Option><Select.Option  
                                      value="Shipper"
                                     >
                                     Shipper
                                    </Select.Option><Select.Option  
                                      value="Road"
                                     >
                                      Road
                                    </Select.Option>
                             
                            </SelectBox>
                  </Form.Item>
                 
                </div>
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
                <div className="col-10">
                  <h5 className="lead_text">Carrier</h5>
                </div>
                <div className="col-2">
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                    onClick={() => {
                        handleviewtoedit(viewcarriers);
                      // setShowModalEdit(true);
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
                  <p> Carrier Name</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">ABC</p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Carrier Code</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">3342</p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Carrier Type</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">Airline</p>
                </div>
              </div>
             
            </div>
          }
        />
      <Custom_model
         show={CarrierEditPopup}
        onHide={() => setCarrierEditPopup(false)}
        View_list
        list_content={
          <div>
            <div className="container-fluid px-4 my-3">
              <div>
                <h5 className="lead_text">Edit Carrier</h5>
              </div>
              <div className="row my-3 ">
                <Form
                  form={editForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                  
                  }}
                  onFinishFailed={(error) => {
                    console.log(error);
                  }}
                >
                 <div className="col-12 pt-1">
                    <label>Name</label>
                    <Form.Item
                      name="NameInput"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                          message: "Please enter a Valid  Name",
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
                
                  </div>
                  <div className="col-12 pt-1">
                  <label>Carrier Code</label>
                  <div>
                  <Form.Item
                    name="codeInput"
                    rules={[
                      {
                        required: true,
                        
                        message: "Please enter a Valid  Code",
                      },
                      
                    
                     
                    ]}
                   
                  >
                    <InputType 
                    />
                  </Form.Item>
                 
                 
                </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Carrier Type</label>
                  <div>
                  <Form.Item
                    name="typeInput"
                    rules={[
                      {
                        required: true,
                       
                        message: "Please select a Valid Carrier Type",
                      },
                      
                     
                    ]}
                   
                  >
                   <SelectBox>
                             
                                    <Select.Option  
                                      value="Airline"
                                     >
                                      Airline
                                    </Select.Option><Select.Option  
                                      value="Shipper"
                                     >
                                     Shipper
                                    </Select.Option><Select.Option  
                                      value="Road"
                                     >
                                      Road
                                    </Select.Option>
                             
                            </SelectBox>
                  </Form.Item>
                 
                </div>
                </div>
                
                 
                  <div className="col-12 d-flex justify-content-center mt-5">
                    <Button className="save_button">Save</Button>
                  </div>
                </Form>
              </div>
              {error ? (
                <div className="">
                  <ErrorMsg code={"400"} />
                </div>
              ) : (
                ""
              )}
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
