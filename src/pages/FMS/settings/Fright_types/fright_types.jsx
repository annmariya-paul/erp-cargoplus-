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
import {CRM_BASE_URL_FMS} from "../../../../api/bootapi";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";
import CheckUnique from "../../../../check Unique/CheckUnique";
import MyPagination from "../../../../components/Pagination/MyPagination";

export default function Frightlist(props) {
  const [uniqueCode, setuniqueCode] = useState(false);
  const [frightType, setFrightType] = useState();
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
 
  const [addForm] = Form.useForm();
  const [error, setError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [searchedText, setSearchedText] = useState("");
  const [searchedPrefix, setSearchedPrefix] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [modalAddFright, setModalAddFright] = useState(false);

  const [pageSize, setPageSize] = useState("25");
  const [current, setCurrent] = useState(1);

 
  const [Errormsg, setErrormsg] = useState();
  const [NameInput, setNameInput] = useState();
  const [PrefixInput, setprefixInput] = useState();

   const [showViewModal, setShowViewModal] = useState(false);
  const [FrightEditPopup, setFrightEditPopup] = useState(false);
  const [editForm] = Form.useForm();
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };

  const getData = (current, pageSize) => {
    return frights?.slice((current - 1) * pageSize, current * pageSize);
  };



  // const checkemployeeCodeis = (data) => {
  //   PublicFetch.get(
  //     `${process.env.REACT_APP_BASE_URL}/misc?type=freighttypename&value=${frightType}`
  //   )
  //     .then((res) => {
  //       console.log("Response", res);
  //       if (res.data.success) {
  //         console.log("Success", res.data.data);
  //         if (res.data.data.exist) {
  //           console.log("data exist");
  //           setuniqueCode(true);
  //         } else {
  //           setuniqueCode(false);
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // };
  const [fright_id, setFright_id] = useState();
  console.log("fright id in state",fright_id);

  const [frights,setFrights]=useState();
  const [frighttypename,setFrighttypename]=useState();
  const [frighttypeprefix,setFrighttypeprefix]=useState();

  const createFrights =async()=>{
    try{
    const addfrights = await PublicFetch.post(
    `${CRM_BASE_URL_FMS}/freightTypes`,{
      freight_type_name:frighttypename,
      freight_type_prefix:frighttypeprefix
     })
    console.log("fright added successfully",addfrights)
    if(addfrights.data.success){
      setSuccessPopup(true);
      getallfright();
      addForm.resetFields();
      setModalAddFright(false);
      close_modal(successPopup,1000 );
    }
    }
    catch(err){ 
    console.log("err to add the frights",err)
    }
  
    }
  //API for get all frieght types --shahida 11.1.23
  const getallfright= async () => {
    try {
      const allfright = await PublicFetch.get(`${CRM_BASE_URL_FMS}/freightTypes`);
      console.log("all frights are", allfright.data.data);
      setFrights(allfright.data.data);
      // setFright_id(allfright.data.data.freight_type_id);
      // console.log("fright id",allfright.data.data);
      
      
//       let arr=[];
//       allfright?.data?.data?.forEach((item,index)=>{
   
// let selectdate = moment(selectedDate).format("MM-DD-YYYY");
//         var frightdate=moment(allfright.data.data.freight_type_created_at).format("MM-DD-YYYY");
//         arr.push({
//           freight_type_id:item?.freight_type_id,
//           freight_type_created_at:item?.selectdate,
//           freight_type_name:item?.freight_type_name,
//         })
//         setFrights(arr);
//       });
    } catch (err) {
      console.log("error while getting the frights: ", err);
    }
  };

  useEffect(() => {
    getallfright();
  }, []);
  const [viewfrights,setViewFrights]=useState({
    id:"",
    frightviewname:"",
    frightprefixviewname:""
  })

 const handleViewClick=(item)=>{
  console.log("view all frights",item)
  setViewFrights({
    ...viewfrights,
  id:item.freight_type_id,
  frightviewname:item.freight_type_name,
  frightprefixviewname:item.freight_type_prefix,
  })


    setShowViewModal(true)
 }


 const [uniqueeditCode, setuniqueeditCode] = useState(false);

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
                onClick={() =>
                  {  frightEdit(index)  
                    setuniqueeditCode(false);
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
      title: "FREIGHT TYPE NAME",
      dataIndex: "freight_type_name",
      key: "freight_type_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.freight_type_name  || nameSearch)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    {
      title: "FREIGHT TYPE PREFIX",
      dataIndex: "freight_type_prefix",
      key: "freight_type_prefix",
      filteredValue: [searchedPrefix],
      onFilter: (value, record) => {
        return String(record.freight_type_prefix || prefixSearch)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: "center",
    },
    // {
    //   title: "Date",
    //   dataIndex: "freight_type_created_at",
    //   key: "freight_type_created_at",
    //   align: "center",
    // },
  ];

  // const data = [
  //   {
  //      fright_name: "Fright X",
  //      date: "2-1-23",
  //      key: "1",
  //   },
  //   {
  //       fright_name: "Fright y",
  //       date: "12-1-23",
  //       key: "2",
  //   },
  //   {
  //       fright_name: "Fright z",
  //       date: "22-1-23",
  //       key: "3",
  //   },
  // ];  
  const [nameSearch, setNamesearch] = useState();
  
  const [prefixSearch, setprefixSearch] = useState();
  const [newName, setNewName] = useState();
  const [saveSuccess, setSaveSuccess] =useState(false)
  const [frightError, setFrightError] = useState();
   const [viewfright,setViewfright]=useState({
    id:"",
    frightname:"",
    frightprefix:""
    
  
  })
 
  const handleUpdate = (e) => {
    console.log("edit data", e);
    const formData = new FormData();

  
    let data = { 
      freight_type_name : NameInput.trim(""),
      freight_type_prefix:PrefixInput
     
    }

    PublicFetch.patch(`${CRM_BASE_URL_FMS}/freightTypes/${fright_id}`, data )
      .then((res) => {
        console.log("success", res);
        if (res.data.success) {
          console.log("successDataa", res.data.data);
          getallfright();
          setSuccessPopup(true);
          close_modal(successPopup, 1000);
          setFrightEditPopup(false);
        } else {
          setErrormsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setError(true);
      });
  };
  const [frightId,setFrightId] =useState()

  const handleviewtoedit=(i)=>{
    console.log("editing data iss",i)
    setFright_id(i.id)
  setFrightname(i.frightviewname)
  setFrightType(i.freight_type_prefix)

  addForm.setFieldsValue({
    // unitid: e.unit_id,
    fright: i.frightviewname,
    frightprefix:i.frightprefixviewname,
   
  });
  setFrightEditPopup(true);
  }

  const [frightname, setFrightname] = useState();
  const [frighttype, setFrighttype] = useState();

  const frightEdit = (e) => {
    console.log("Fright edit", e);
    setNameInput(e.freight_type_name);
    setNewName(e.freight_type_name);
    setprefixInput(e.freight_type_prefix);
    // setImageInput(e.brand_pic);
    setFright_id(e.freight_type_id);
    editForm.setFieldsValue({
      fright_id: e.freight_type_id,
      NameInput: e.freight_type_name,
      PrefixInput:e.freight_type_prefix
  
    });
    setFrightEditPopup(true);
  };

  





  

  
  return (
    <>
      <div className="container-fluid container_fms ">
        <div className="row flex-wrap">
          <div className="col">
            <h5 className="lead_text">Freight types</h5>
          </div>
          {/* <Leadlist_Icons /> */}
        </div>
        <div className="row py-1" style={{ backgroundColor: "#f4f4f7" }}>
          <div className="col-4">
            <Input.Search
              placeholder="Search by Freight type Name"
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
          <div className="col-4">
            <Input.Search
              placeholder="Search by Freight type prefix"
              style={{ margin: "5px", borderRadius: "5px" }}
              value={searchedPrefix}
              onChange={(e) => {
                setSearchedPrefix(e.target.value ? [e.target.value] : []);
              }}
              onSearch={(value) => {
                setSearchedPrefix(value);
              }}
            />
          </div>
        </div>
        
        <div className="row my-3">
          <div className="col-4 ">
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

          <div className="col-4 d-flex  align-items-center justify-content-center">
          <MyPagination
           total={parseInt(frights?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
        </div>

          <div className="col-4 ">
            <Button btnType="add" onClick={() =>
              {
                setuniqueCode(false);
                setModalAddFright(true);
              } }>
              Add Freight types
            </Button>
          </div>
        </div>
        <div className="datatable">
          <TableData
            data={getData(current, pageSize)}
            // data={frights}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex  justify-content-center">
          
          <MyPagination
          
           total={parseInt(frights?.length)}
            current={current}
            showSizeChanger={true}
            pageSize={pageSize}
            onChange={(current, pageSize) => {
              setCurrent(current);
              setPageSize(pageSize);
            }}
          />
        </div>

      </div>



      <CustomModel
      
        show={modalAddFright}
        onHide={() => setModalAddFright(false)}
        header="Add Fright"
        footer={false}
        // {...props}
        View_list
        list_content={
          <>
            <div className="row">
              <h5 className="lead_text">Add Freight Type</h5>
            </div>
            <Form
           form={addForm}
              onFinish={(data) => {
                console.log("valuezzzzzzz", data);
                createFrights();
              }}
              onFinishFailed={(error) => {
                console.log(error);
              }}
            >
              <div className="row py-4">
                <div className="col-12 pt-1">
                  <label>Freight Type Name</label>
                  <div>
                  <Form.Item
                    name="freightname"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp("^[A-Za-z ]+$"),
                        message: "Please enter a Valid Freight type Name",
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
                    onChange={(e) => setFrighttypename(e.target.value)}
                  >
                    <InputType 
                    value={NameInput}
                    onChange={(e) => {
                      setFrightType(e.target.value);
                      setuniqueCode(false);
                    }}
                    // onBlur={(e) => {
                    //   checkemployeeCodeis();
                    // }}
                    onBlur={ async () => {
                      
                      let a = await CheckUnique({type:"freighttypename",value:frightType})
                      console.log("hai how are u", a)
                      setuniqueCode(a);
                      
                    }}
                    // onChange={(e) => {
                      // setFrighttypename(e.target.value)

                      // setFrightError("");
                    // }}
                    
                    />
                  </Form.Item>
                  {uniqueCode ? (
                            <p style={{ color: "red" }}>
                            Freight Type Name {uniqueErrMsg.UniqueErrName}
                            </p>
                          ) : null}
                </div>
                </div>
                <div className="col-12 pt-1">
                  <label>Freight Type Prefix</label>
                  <div>
                  <Form.Item
                    name="freightprefix"
                   
                    onChange={(e) => setFrighttypeprefix(e.target.value)}
                  >
                    <InputType 
                    value={PrefixInput}
                    onChange={(e) => {
                      setprefixInput(e.target.value);
                      // setuniqueCode(false);
                    }}
                    // onBlur={(e) => {
                    //   checkemployeeCodeis();
                    // }}
                    // onBlur={ async () => {
                      
                    //   let a = await CheckUnique({type:"freighttypename",value:frightType})
                    //   console.log("hai how are u", a)
                    //   setuniqueCode(a);
                      
                    // }}
                    // onChange={(e) => {
                      // setFrighttypename(e.target.value)

                      // setFrightError("");
                    // }}
                    
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
                  <h5 className="lead_text">Freight Type</h5>
                </div>
                <div className="col-3">
                  <Button
                    btnType="add_borderless"
                    className="edit_button"
                    onClick={() => {
                      handleviewtoedit(viewfrights);
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
                  <p> Freight Name</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">{viewfrights.frightviewname}</p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <p> Freight Prefix</p>
                </div>
                <div className="col-1">:</div>
                <div className="col-6 justify-content-start">
                  <p className="modal-view-data">{viewfrights.frightprefixviewname}</p>
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
                <h5 className="lead_text">Edit Freight Type</h5>
              </div>
              <div className="row my-3 ">
                <Form
                  form={editForm}
                  onFinish={(values) => {
                    console.log("values iss", values);
                   handleUpdate();
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
                          message: "Please enter a Valid Freight type Name",
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
                        value={NameInput}
                        onChange={(e) => {
                          setNameInput(e.target.value);
                          setErrormsg("");
                          setuniqueeditCode(false);
                        }}
                        onBlur={ async () => {
                            
                          if (newName !== NameInput){
                            let a = await CheckUnique({type:"freighttypename",value:NameInput})
                            console.log("hai how are u", a)
                            setuniqueeditCode(a);
                           
                          }
                          
                        }}
                      />
                    </Form.Item>
                    {/* {Errormsg ? (
                      <label style={{ color: "red" }}>{Errormsg}</label>
                    ) : (
                      ""
                    )} */}
                     {uniqueeditCode ? (
                        <p style={{ color: "red", marginTop:"-24px" }} className="mb-2">
                          Freight type Name {uniqueErrMsg.UniqueErrName}
                        </p>
                      ) : null}
                  </div>
                  <div className="col-12">
                    <label>Freight Prefix</label>
                    <Form.Item
                      name="PrefixInput"
                      
                    >
                      <InputType
                        className="input_type_style w-100"
                        value={PrefixInput}
                        onChange={(e) => {
                          setprefixInput(e.target.value);
                         
                        }}
                       
                      />
                    </Form.Item>
                  
                  </div>


                  {/* <div className="col-6">
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
                    {Errormsg ? (
                      <label style={{ color: "red" }}>{Errormsg}</label>
                    ) : (
                      ""
                    )}
                  </div> */}
                 
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
