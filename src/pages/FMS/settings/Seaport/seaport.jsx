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
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import MyPagination from "../../../../components/Pagination/MyPagination";


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
    const [current, setCurrent] = useState(1);
    const [numOfItems, setNumOfItems] = useState("25");
    const [allseaports,setallseaports]= useState();
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [editForm] = Form.useForm();
    const [totalCount, setTotalcount] = useState();
    const [seaportname,setseaportname]= useState();
    const [seaportcode ,setseaportcode]= useState();

    const [editseaportid,seteditseaportid]= useState();
    const [editseaportname,seteditseaportname]= useState();
    const [editseaportcode ,seteditseaportcode]= useState();
    const pageofIndex = numOfItems * (current - 1) - 1 + 1;

    const [viewseaport,setViewseaport]= useState({
      id:"",
      seaportname:"",
      seaportcode:""
  
     })
  
    const close_modal = (mShow, time) => {
      if (!mShow) {
        setTimeout(() => {
          setSaveSuccess(false);
        
        }, time);
      }
    }

    const handleViewClick = (item) => {
      console.log("view all seaports", item);
      setViewseaport({
        ...viewseaport,
        id: item.seaport_id,
        seaportname: item.seaport_name,
        seaportcode: item.seaport_code,
       
      });
  
      setShowViewModal(true);
    };
  
    const handleviewtoedit = (i) => {
      console.log("editing data iss", i);
      seteditseaportid(i.id);
      seteditseaportname(i.seaportname);
      seteditseaportcode(i.seaportname);
      editForm.setFieldsValue({
       
        seaportname: i.seaportname,
        seaportcode: i.seaportcode,
      });
      setFrightEditPopup(true);
      // setuniqueCode(false);
  
    };

    const handleEditclick = (e) => {
      console.log("editing id iss", e);
   seteditseaportid(e.seaport_id)
   seteditseaportname(e.seaport_name)
   seteditseaportcode(e.seaport_code)
  
      editForm.setFieldsValue({
        // unitid: e.unit_id,
        seaportname: e.seaport_name,
        seaportcode: e.seaport_code,
      });
      setFrightEditPopup(true)
    };
  
    const handleupdate = async () => {
      try {
        const updated = await PublicFetch.patch(
          `${CRM_BASE_URL_FMS}/seaports/${editseaportid}`,
          {
            seaport_name: editseaportname,
            seaport_code: editseaportcode,
          }
        );
        console.log("successfully updated ", updated);
        if (updated.data.success) {
          setSaveSuccess(true);
          setFrightEditPopup(false);
          getallseaport();
          close_modal(saveSuccess, 1000);
        } 
      } catch (err) {
        console.log("error to update airport");
      }
    };



    const createseaport = async () => {
      try {
        const addseaport = await PublicFetch.post(
          `${CRM_BASE_URL_FMS}/seaports`,
          {
            seaport_name: seaportname,
            seaport_code: seaportcode
          }
        );
        console.log("airports added successfully", addseaport);
        if (addseaport.data.success) {
          setSaveSuccess(true);
          setModalAddAirport(false);
          getallseaport()
       addForm.resetFields();
         
          close_modal(saveSuccess, 1000);
        } 
        // else if (addairport.data.success === false) {
        //   alert(addairport.data.data);
        // }
      } catch (err) {
        console.log("err to add the airports", err);
      }
    };




    const getallseaport = async () => {
      try {
        const allseaports = await PublicFetch.get(
          `${CRM_BASE_URL_FMS}/seaports?startIndex=${pageofIndex}&perPage=${numOfItems}`
        );
        console.log("getting all seaports", allseaports);
        setallseaports(allseaports.data.data)
      } catch (err) {
        console.log("error to fetching  seaports", err);
      }
    };

    useEffect(() => {
      getallseaport();
    }, []);
    const columns = [
        {
          title: "ACTION",
          dataIndex: "action",
          key: "key",
          width: "30%",
          render: (data, index) => {
            // console.log("index is :",index);
            return (
              <div className="d-flex justify-content-center align-items-center gap-2">
               
                  <div
                    className="editIcon m-0"
                    onClick={() =>{  
                      handleEditclick(index)
                        // setFrightEditPopup(true)
                          }}
                  >
                    <FaEdit />
                  </div>
                  <div
                  className="viewIcon m-0"
                  onClick={() => {
                      handleViewClick(index)
                    // setShowViewModal(true)
                  } }
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
          dataIndex: "seaport_name",
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
            dataIndex: "seaport_code",
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
        <div className="container-fluid container_fms pt-3">
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Seaports</h5>
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
              <Button
                btnType="add"
                onClick={() => {
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

              data={allseaports}
              columns={columns}
              custom_table_css="table_lead_list"
            />
          </div>

          <div className="d-flex mt-4 justify-content-center">
            <MyPagination
              total={parseInt(totalCount)}
              current={current}
              pageSize={numOfItems}
              onChange={(current, pageSize) => {
                setCurrent(current);
              }}
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
                <h5 className="lead_text pb-3">Add Seaport</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                  createseaport();
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <label>Seaport Name</label>
                    <div>
                      <Form.Item
                        name="seaportname"
                        rules={[
                          {
                            required: true,
                            // pattern: new RegExp("^[A-Za-z ]+$"),
                            message: "Please enter a Valid Seaport Name",
                          },
                        ]}
                      >
                        <InputType
                          value={seaportname}
                          onChange={(e) => {
                            setseaportname(e.target.value);
                          }}
                        />
                      </Form.Item>

                      {/* {uniqueCode ? (
                                <p style={{ color: "red",marginTop:"-24px" }}>
                                Fright Type Name {uniqueErrMsg.UniqueErrName}
                                </p>
                              ) : null} */}
                    </div>
                  </div>
                  <div className="col-12">
                    <label>Seaport Code</label>
                    <div>
                      <Form.Item
                        name="seaportcode"
                        rules={[
                          {
                            required: true,
                            // pattern: new RegExp("^[A-Za-z ]+$"),
                            message: "Please enter a Valid code",
                          },
                        ]}
                      >
                        <InputType
                          value={seaportcode}
                          onChange={(e) => {
                            setseaportcode(e.target.value);
                          }}
                        />
                      </Form.Item>

                      {/* {uniqueCode ? (
                                <p style={{ color: "red",marginTop:"-24px" }}>
                                Fright Type Name {uniqueErrMsg.UniqueErrName}
                                </p>
                              ) : null} */}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
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
            show={saveSuccess}
            onHide={() => setSaveSuccess(false)}
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
                      handleviewtoedit(viewseaport);
                      //   handleviewtoedit(viewfrights);
                      setFrightEditPopup(true);
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
                  <p className="modal-view-data">{viewseaport.seaportname} </p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <p> Seaport Code</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">{viewseaport.seaportcode} </p>
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
              <div>
                <h5 className="lead_text pb-3">Edit Seaport</h5>
              </div>
              <div className="container-fluid  my-3">
                <div className="row my-3 ">
                  <Form
                    form={editForm}
                    onFinish={(values) => {
                      console.log("values iss", values);
                      handleupdate();
                      //    handleUpdate();
                    }}
                    onFinishFailed={(error) => {
                      console.log(error);
                    }}
                  >
                    <div className="col-12">
                      <label>Seaport Name</label>
                      <Form.Item
                        name="seaportname"
                        rules={[
                          {
                            required: true,
                            // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Seaport Name",
                          },
                        ]}
                      >
                        <InputType
                          className="input_type_style w-100"
                          value={editseaportname}
                          onChange={(e) => {
                            seteditseaportname(e.target.value);
                          }}
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
                      <label>Seaport Code</label>
                      <Form.Item
                        name="seaportcode"
                        rules={[
                          {
                            required: true,
                            // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Seaport Code",
                          },
                        ]}
                      >
                        <InputType
                          className="input_type_style w-100"
                          value={editseaportcode}
                          onChange={(e) => {
                            seteditseaportcode(e.target.value);
                          }}
                        />
                      </Form.Item>

                      {/* {uniqueeditCode ? (
                            <p style={{ color: "red", marginTop:"-24px" }} className="mb-2">
                              Fright type Name {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null} */}
                    </div>

                    <div className="col-12 d-flex justify-content-center">
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
          show={saveSuccess}
          onHide={() => setSaveSuccess(false)}
          success
        />
        {error ? <ErrorMsg code={"500"} /> : " "}
      </>
    );

}
export default Seaport