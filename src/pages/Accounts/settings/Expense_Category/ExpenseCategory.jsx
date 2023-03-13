import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdPageview } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ACCOUNTS } from "../../../../api/bootapi";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import InputType from "../../../../components/Input Type textbox/InputType";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";
import PublicFetch from "../../../../utils/PublicFetch";
import Custom_model from "../../../../components/custom_modal/custom_model";
import CheckUnique from "../../../../check Unique/CheckUnique";
import { UniqueErrorMsg } from "../../../../ErrorMessages/UniqueErrorMessage";

function ExpenseCategory() {
  const [AddForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const navigate = useNavigate();
  const [oppnew, setOppnew] = useState([]);
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input
  const [totalCount, setTotalcount] = useState("");
  const [AllcategoryData, setAllCategoryData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [AddPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [uniqueEditName, setUniqueEditName] = useState(false);
  const [editUniqueName, setEditUniqueName] = useState();
  const [viewPopup, setViewPopup] = useState(false);
  const [invoice_id, setInvoice_id] = useState();
  const [successPopup, setSuccessPopup] = useState(false);
  const [slno, setSlNo] = useState(1);
  const [category_id, setCategory_Id] = useState();
  const [editcategoryid,seteditcategoryid] =useState();
  const[totallocation,settotallocation]=useState();
  const [uniqueName, setUniqueName] = useState(false);
  const [categoryName, setCategoryName] = useState(false);
  const [uniqueErrMsg, setUniqueErrMsg] = useState(UniqueErrorMsg);
  const columns = [
    {
      title: "Slno",
      dataIndex: "slno",
      key: "slno",
      width: "2%",
      render: (data, index, no) => {
        return (
          <div>
            <lable>{slno + no}</lable>
          </div>
        );
      },
    },
    {
      title: "CATEGORY NAME",
      dataIndex: "expense_category_name",
      key: "expense_category_name",
      width: "8%",
      filteredValue: [searchSource],
      onFilter: (value, record) => {
        return String(record.expense_category_name)
          .toLowerCase()
          .includes(value.toLowerCase()) || 
          String(record.expense_category_description )
          .toLowerCase()
          .includes(value.toLowerCase())
      },
      // align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "expense_category_description",
      key: "expense_category_description",
      width: "15%",
      filteredValue: [searchSource],
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "5%",
      render: (data, index) => {
        console.log("mere index", index);
        return (
          <div className="d-flex editcolor justify-content-center gap-4 align-items-center">
            {/* <div className="editcolor "> */}
            <FaEdit
              fontSize={17}
              onClick={() => 
                expEdit(index)
              }   // handleEditedclick(index);
            />
              <div
              className="viewIcon m-0"
              onClick={() => handleViewClick(index)
              }
            >
              <MdPageview style={{ marginLeft: 15, marginRight: 15 }} />
            </div>

        
            {/* </div> */}
            {/* <div className="editcolor">
              <MdDelete />
            </div> */}
          </div>
        );
      },
      align: "center",
    },
  
 
   
   

  ];

  // const data = [
  //   {
  //     category_name: "Lorem ispum",
  //     category_description: "lorem Ispum is a long test description",
  //   },
  // ];
  //   setAllCAtegoryData(data);

  const getAllExpenseCategory = () => {
    PublicFetch.get(`${ACCOUNTS}/expense-category`)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("SuccessFully", res.data.data);
          setAllCategoryData(res.data.data);
          settotallocation(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
 
  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, time);
    }
  };


  const [viewexp, setViewExp] = useState({
    id: "",
    name: "",
   description: "",
   
  });
  const handleViewClick = (item) => {
    console.log("view all ", item);
    setViewExp({
      ...viewexp,
      id: item.expense_category_id,
      expense_category_name: item.expense_category_name,
      expense_category_description: item.expense_category_description,
     
    });

    setViewPopup(true);
  };

  const createExpenseCategory = (data) => {
    PublicFetch.post(`${ACCOUNTS}/expense-category`, {
      expense_category_name: data.name,
      expense_category_description: data.description,
    })
      .then((res) => {
        console.log("response of create", res);
        if (res.data.success) {
          console.log("success of create", res.data.data);
          setSuccessPopup(true);
          getAllExpenseCategory()
          editForm.resetFields();
          setAddPopup(false);
          close_modal(successPopup, 1000);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const [expname, setExpname] = useState();
  const [expdescription, setexpdescription] = useState();
  const [editexpdescription, setEditexpdescription] = useState();
  const [editexpname, setEditexpname] = useState();
  const [pageSize, setPageSize] = useState("25");
  // const [current, setCurrent] = useState(1);
  // const handleupdate = () => {
  //   PublicFetch.patch(`${ACCOUNTS}/expense-category/${editcategoryid}`, {
  //     expense_category_name: editexpname,
  //     expense_category_description: editexpdescription,
  //   })
  //     .then((res) => {
  //       console.log("Response of update", res);
  //       if (res.data.success) {
  //         console.log("Success of Update", res.data.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // };

  const handleupdate = async () => {
    try {
      const updated = await PublicFetch.patch(`${ACCOUNTS}/expense-category/${editcategoryid}`,
        {
          expense_category_name:  editexpname,
          expense_category_description: editexpdescription,
        }
      );
      console.log("successfully updated ", updated);
      if (updated.data.success) {
        setSuccessPopup(true);
        // setCarrierEditPopup(false);
        setEditPopup(false);
        getAllExpenseCategory();
        // getallcarrier()
        close_modal(successPopup, 1000);
      } 
    } catch (err) {
      console.log("error to update carrier");
    }
  };






  useEffect(() => {
    getAllExpenseCategory();
  }, []);

  const expEdit= (e) => {
    console.log("exp edit", e);
    seteditcategoryid(e.expense_category_id)
   setEditexpname(e.expense_category_name);
   setEditexpdescription(e.expense_category_description);

    // setCarrier_id(e.carrier_id);
    editForm.setFieldsValue({
      category_id: e.expense_category_id,
      expname: e.expense_category_name,
      expdescription: e.expense_category_description,
      
    });
 setEditPopup(true);
  };
  const handleviewtoedit = (i) => {
    console.log("editing data iss", i);
    seteditcategoryid(i.id);
    setEditexpname(i.expense_category_name);
    setEditexpdescription(i.expense_category_description)
   

    editForm.setFieldsValue({
      // unitid: e.unit_id,
      // carrier: i.carrierviewname,
      expense_category_name: i.expense_category_name,
      expense_category_description: i.expense_category_description,
    
    });
    setEditPopup(true);
  };


  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="container-fluid lead_list  my-3 py-3">
              {/* invoice listing section One */}

              <div>
                <div className="row flex-wrap">
                  <div className="col">
                    <h5 className="lead_text">Expense Category</h5>
                  </div>

                  {/* <Leadlist_Icons
                  // datas={OpportunityList}
                  // columns={columns}
                  // items={data12}
                  // xlheading={OppHeads}
                  // filename="data.csv"
                  // chechboxes={
                  //   <Checkbox.Group
                  //     onChange={onChange}
                  //     value={selectedColumns}
                  //   >
                  //     {columnsKeys.map((column) => (
                  //       <li>
                  //         <Checkbox value={column} key={column}>
                  //           {column}
                  //         </Checkbox>
                  //       </li>
                  //     ))}
                  //   </Checkbox.Group>
                  // }
                  /> */}
                </div>
                <div className="row p-1" style={{ backgroundColor: "#f4f4f7" }}>
                  <div className="col-3">
                    <Input.Search
                      placeholder="Search by "
                      style={{ margin: "5px", borderRadius: "5px" }}
                      value={searchSource}
                      onChange={(e) => {
                        setSearchSource(e.target.value ? [e.target.value] : []);
                      }}
                      onSearch={(value) => {
                        setSearchSource(value);
                      }}
                    />
                  </div>
                </div>
                <div className="row my-3 ">
                  <div className="col-4 ">
                    <Select
                      // defaultValue={"25"}
                      bordered={false}
                      className=" page_size_style"
                      value={numOfItems}
                      onChange={(e) => {
                        setNumOfItems(e);
                        setCurrent(1);
                      }}
                    >
                      <Select.Option value="25">
                        Show{" "}
                        <span style={{ color: "lightgray" }} className="ms-1">
                          |
                        </span>
                        <span style={{ color: "#2f6b8f" }} className="ms-2">
                          25
                        </span>{" "}
                      </Select.Option>
                      <Select.Option value="50">
                        {" "}
                        Show{" "}
                        <span style={{ color: "lightgray" }} className="ms-1">
                          |
                        </span>
                        <span style={{ color: "#2f6b8f" }} className="ms-2">
                          50
                        </span>{" "}
                      </Select.Option>
                      <Select.Option value="100">
                        {" "}
                        Show{" "}
                        <span style={{ color: "lightgray" }} className="ms-1">
                          |
                        </span>
                        <span style={{ color: "#2f6b8f" }} className="ms-2">
                          100
                        </span>{" "}
                      </Select.Option>
                    </Select>
                  </div>

                  <div className="col-4 d-flex  justify-content-center align-items-center">
                  {totallocation?.length >0 &&(
            <MyPagination
              total={parseInt(totallocation?.length)}
              current={current}
              showSizeChanger={true}
              pageSize={pageSize}
              onChange={(current, pageSize) => {
                setCurrent(current);
                setPageSize(pageSize);
              }}
            />
            )  }
                    
                  </div>
                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div> */}
                  <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 d-flex justify-content-end">
                    <div className="">
                      {/* <Link style={{ color: "white" }}> */}
                      <Button
                        onClick={() => {
                          setAddPopup(true);
                          // setInvoice_id(index.invoice_id);
                        }}
                        btnType="save"
                      >
                        Add Expense Category
                      </Button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
                <div className="datatable">
                  {/* {AllinvoiceData && ( */}
                  <TableData
                    data={AllcategoryData}
                    // data={allLeadList}
                    // data={OpportunityList}
                    columns={columns}
                    custom_table_css="table_lead_list"
                  />
                  {/* )} */}
                </div>
                <div className="d-flex py-2 justify-content-center">
                  {/* <MyPagination
                    total={parseInt(totalCount)}
                    current={current}
                    pageSize={numOfItems}
                    onChange={(current, pageSize) => {
                      setCurrent(current);
                    }}
                  /> */}
                </div>
              </div>
            </div>
            <CustomModel
              show={AddPopup}
              onHide={() => {
                setAddPopup(false);
              }}
              centered
              View_list
              list_content={
                <div>
                  <div className="container">
                    <h4 style={{ color: "#0891d1" }}>Create Expense Category</h4>
                    <Form
                      form={AddForm}
                      onFinish={(value) => {
                        console.log("On finishing", value);
                        createExpenseCategory(value)
                      }}
                    >
                      <div className="row">
                        <div className="col-12">
                          <div className="col-12">
                            <div className="">
                              <div className="">
                                <label>Category Name</label>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Category Name is Required",
                                    },
                                  ]}
                                  name="name"
                                >
                                  <InputType 
                                   onChange={(e) => {

                                    setCategoryName(e.target.value);
                                  
                                    setUniqueName(false);
                                  }}
                                  onBlur={async () => {
                                    let n = await CheckUnique({
                                      type: "expensecategoryname",
                                      value: categoryName,
                                    });
                                    setUniqueName(n);
                                  }}
                                  
                                  
                                  />
                                </Form.Item>
                                {uniqueName ? (
                      <p style={{ color: "red" }}>
                      Expense category name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <lable>Description</lable>
                            <Form.Item
                              rules={[
                                {
                                  min: 5,
                                  message: "Required minimum 5 Letter",
                                },
                              ]}
                              name="description"
                            >
                              <TextArea />
                            </Form.Item>
                          </div>
                          <div className="col-12 d-flex justify-content-center">
                            <Button btnType="save" type="submit">
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              }
              
            >
              <Custom_model
          size={"sm"}
          show={successPopup}
          onHide={() => setSuccessPopup(false)}
          success
        />
              </CustomModel>

            <CustomModel
              show={editPopup}
              onHide={() => {
                setEditPopup(false);
              }}
              // centered
              View_list
              list_content={
                <div>
                  <div className="container">
                    <h4 style={{ color: "#0891d1" }}>Edit Expense Category</h4>
                    <Form
                      form={editForm}
                      onFinish={(value) => {
                        console.log("On finishing", value);
                     handleupdate();
                      }}
                      onFinishFailed={(error) => {
                        console.log(error);
                      }}
                    >
                      <div className="row">
                        <div className="col-12">
                          <div className="col-12">
                            <div className="">
                              <div className="">
                                <label>Category Name</label>
                                <Form.Item
                                  name="expname"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Category Name is Required",
                                    },
                                  ]}
                                
                                >
                                  <InputType value={editexpname}
                                  onChange={(e) => {
                                    setEditexpname(e.target.value);
                                    setUniqueEditName(false);
                          
                                  }}
                                  
                                  onBlur={ async () => {
                         
                                    if (editUniqueName !== editexpname) {
                                      let a = await CheckUnique({type:"expensecategoryname",value:editexpname})
                                   
                                      setUniqueEditName(a);
                                    }
                                 
                                  }}
                                  
                                  
                                  />
                                </Form.Item>

                                {uniqueEditName ? (
                      <p style={{ color: "red" }}>
                       Expense category name {uniqueErrMsg.UniqueErrName}
                      </p>
                    ) : null}
                   

                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <lable>Description</lable>
                            <Form.Item
                             name="expdescription"
                              rules={[
                                {
                                  min: 5,
                                  message: "Required minimum 5 Letter",
                                },
                              ]}
                             
                            >
                              <TextArea 
                              
                              value={editexpdescription}
                              onChange={(e) => {
                                setEditexpdescription(e.target.value);
                             
                              }}
                              />
                            </Form.Item>
                          </div>
                          <div className="col-12 d-flex justify-content-center">
                          <Button className="save_button">Save</Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              }
            /><CustomModel
            size={"sm"}
            show={successPopup}
            onHide={() => setSuccessPopup(false)}
            success
          />
         

            <CustomModel
              show={viewPopup}
              onHide={() => {
                setViewPopup(false);
              }}
              //   centered
              View_list
              list_content={
                <>
                  <div className="container p-3">
                    <div className="row mt-3">
                      <div className="col-12 ">
                        <div className="d-flex justify-content-between ">
                          <h4 className="lead_text">Expense Category</h4>
                          <div className="">
                            <Button
                              btnType="add_borderless"
                              className="edit_button"
                              onClick={() => {
                                // handleEditedclick();
                                // handleupdate();
                                handleviewtoedit(viewexp);
                                setViewPopup(false);
                              }}
                            >
                              Edit
                              <FiEdit
                                style={{
                                  marginBottom: "4px",
                                  marginInline: "3px",
                                }}
                              />
                            </Button>
                          </div>
                        </div>

                        {/* <div className="row my-3">
                          <div className="col-12">
                            <table>
                              <tbody>
                                <tr>
                                  <td>Category Name</td>
                                  <td>:</td>
                                  <td>
{viewexp?.expense_category_name}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Category Description</td>
                                  <td>:</td>
                                  <td>
                                  {viewexp?.expense_category_description}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div> */}
                          <div className="row mt-4">
              <div className="col-4">
                <p>Category Name</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                {viewexp?.expense_category_name}{" "}
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <p> Category Description</p>
              </div>
              <div className="col-1">:</div>
              <div className="col-6 justify-content-start">
                <p className="modal-view-data">
                {viewexp?.expense_category_description}{" "}
                </p>
              </div>
            </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <CustomModel
              success
              show={successPopup}
              onHide={() => {
                setSuccessPopup(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCategory;
