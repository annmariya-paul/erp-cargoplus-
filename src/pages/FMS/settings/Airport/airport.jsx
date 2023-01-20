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
import { FiEdit } from "react-icons/fi";
import CustomModel from "../../../../components/custom_modal/custom_model";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import PublicFetch from "../../../../utils/PublicFetch";
import MyPagination from "../../../../components/Pagination/MyPagination";


function Airport (){
    const [frightType, setFrightType] = useState();
    const [addForm] = Form.useForm();
    const [error, setError] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [searchedText, setSearchedText] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const [modalAddairport, setModalAddAirport] = useState(false);
  
    const [pageSize, setPageSize] = useState("25");
    const [current, setCurrent] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false);
    const [FrightEditPopup, setFrightEditPopup] = useState(false);

    const [allairports,setAllairports] =useState()
    const [numOfItems, setNumOfItems] = useState("25");

    const [editForm] = Form.useForm();
    const [totalCount, setTotalcount] = useState();

    const [airportName,setAirportName]= useState();
    const [airportCode,setAirportCode]= useState();
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [editairportid,setEditairportid]=useState()
    const[editairportname,seteditairportname]=useState()
    const[editairportcode,seteditairportcode]=useState()

   const [viewairport,setViewairport]= useState({
    id:"",
    airportname:"",
    airportcode:""

   })

   const handleViewClick = (item) => {
    console.log("view all airports", item);
    setViewairport({
      ...viewairport,
      id: item.airport_id,
      airportname: item.airport_name,
      airportcode: item.airport_code,
     
    });

    setShowViewModal(true);
  };

  const handleviewtoedit = (i) => {
    console.log("editing data iss", i);
    setEditairportid(i.id);
    seteditairportname(i.airportname);
    seteditairportcode(i.airportcode);
    editForm.setFieldsValue({
      // unitid: e.unit_id,
      airportname: i.airportname,
      airportcode: i.airportcode,
    });
    setFrightEditPopup(true);
    // setuniqueCode(false);

  };

  const handleEditclick = (e) => {
    console.log("editing id iss", e);
 setEditairportid(e.airport_id)
 seteditairportname(e.airport_name)
 seteditairportcode(e.airport_code)

    editForm.setFieldsValue({
      // unitid: e.unit_id,
      airportname: e.airport_name,
      airportcode: e.airport_code,
    });
    setFrightEditPopup(true)
  };


    const pageofIndex = numOfItems * (current - 1) - 1 + 1;

    const getallairport = async () => {
      try {
        const allairports = await PublicFetch.get(
          `${CRM_BASE_URL_FMS}/airports?startIndex=${pageofIndex}&perPage=${numOfItems}`
        );
        console.log("getting all airports", allairports);
        setAllairports(allairports.data.data)
        // setAttributes(allattributes.data.data);
      } catch (err) {
        console.log("error to fetching  airports", err);
      }
    };

    const close_modal = (mShow, time) => {
      if (!mShow) {
        setTimeout(() => {
          setSaveSuccess(false);
        
        }, time);
      }
    }

    const createAirport = async () => {
      try {
        const addairport = await PublicFetch.post(
          `${CRM_BASE_URL_FMS}/airports`,
          {
            airport_name: airportName,
            airport_code: airportCode,
          }
        );
        console.log("airports added successfully", addairport);
        if (addairport.data.success) {
          setSaveSuccess(true);
          getallairport()
       addForm.resetFields();
          setModalAddAirport(false);
          close_modal(saveSuccess, 1000);
        } 
        // else if (addairport.data.success === false) {
        //   alert(addairport.data.data);
        // }
      } catch (err) {
        console.log("err to add the airports", err);
      }
    };

    const handleupdate = async () => {
      try {
        const updated = await PublicFetch.patch(
          `${CRM_BASE_URL_FMS}/airports/${editairportid}`,
          {
            airport_name: editairportname,
            airport_code: editairportcode,
          }
        );
        console.log("successfully updated ", updated);
        if (updated.data.success) {
          setSaveSuccess(true);
          setFrightEditPopup(false);
          getallairport();
          close_modal(saveSuccess, 1000);
        } 
      } catch (err) {
        console.log("error to update airport");
      }
    };



    // `freightManagement/v1/airports?startIndex=0&perPage=10`
    useEffect(() => {
      getallairport();
    }, []);

    
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
                      handleEditclick(index)
                        setFrightEditPopup(true)
                          }}
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
          title: "AIRPORT NAME",
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
            title: "AIRPORT CODE",
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
        <div className="container-fluid container_fms pt-3">
          <div className="row flex-wrap">
            <div className="col">
              <h5 className="lead_text">Airport</h5>
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
                Add Airport
              </Button>
            </div>
          </div>
          <div className="datatable">
            <TableData
              // data={getData(numofItemsTo, pageofIndex)}

              data={allairports}
              columns={columns}
              custom_table_css="table_lead_list"
            />
          </div>

          <div className="d-flex mt-3 justify-content-center">
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
                <h5 className="lead_text">Add Airport</h5>
              </div>
              <Form
                form={addForm}
                onFinish={(data) => {
                  console.log("valuezzzzzzz", data);
                  createAirport();
                }}
                onFinishFailed={(error) => {
                  console.log(error);
                }}
              >
                <div className="row py-4">
                  <div className="col-12 pt-1">
                    <label>Airport Name</label>
                    <div>
                      <Form.Item
                        name="airportName"
                        rules={[
                          {
                            required: true,
                            // pattern: new RegExp("^[A-Za-z ]+$"),
                            message: "Please enter a Valid Airport Name",
                          },
                        ]}
                      >
                        <InputType
                          onChange={(e) => {
                            setAirportName(e.target.value);
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
                  <div className="col-12 pt-1">
                    <label>Airport Code</label>
                    <div>
                      <Form.Item
                        name="airportCode"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Valid Airport Code",
                          },
                        ]}
                      >
                        <InputType
                          onChange={(e) => {
                            setAirportCode(e.target.value);
                          }}
                        />
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
                <div className="col-9">
                  <h5 className="lead_text">Airport</h5>
                </div>
                <div className="col-3">
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                    onClick={() => {
                      //   handleviewtoedit(viewfrights);
                      handleviewtoedit(viewairport);
                      // setFrightEditPopup(true)
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
                  <p> Airport Name</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">{viewairport.airportname}</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <p> Airport Code</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">{viewairport.airportcode}</p>
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
                  <h5 className="lead_text">Edit Airport</h5>
                </div>
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
                      <label>Name</label>
                      <Form.Item
                        name="airportname"
                        rules={[
                          {
                            required: true,
                            // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a valid Airport Name",
                          },
                        ]}
                      >
                        <InputType
                          className="input_type_style w-100"
                          value={editairportname}
                          onChange={(e) => {
                            seteditairportname(e.target.value);
                          }}
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
                        name="airportcode"
                        rules={[
                          {
                            required: true,
                            // pattern: new RegExp("^[A-Za-z0-9 ]+$"),
                            message: "Please enter a Valid Airport Code",
                          },
                        ]}
                      >
                        <InputType
                          className="input_type_style w-100"
                          value={editairportcode}
                          onChange={(e) => {
                            seteditairportcode(e.target.value);
                          }}
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
          show={saveSuccess}
          onHide={() => setSaveSuccess(false)}
          success
        />
        {error ? <ErrorMsg code={"500"} /> : " "}
      </>
    );

}
export default Airport