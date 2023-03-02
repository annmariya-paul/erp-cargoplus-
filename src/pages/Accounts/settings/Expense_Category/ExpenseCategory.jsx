import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdPageview } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import TextArea from "../../../../components/ InputType TextArea/TextArea";
import Button from "../../../../components/button/button";
import CustomModel from "../../../../components/custom_modal/custom_model";
import InputType from "../../../../components/Input Type textbox/InputType";
import MyPagination from "../../../../components/Pagination/MyPagination";
import TableData from "../../../../components/table/table_data";

function ExpenseCategory() {
  const [AddForm] = Form.useForm();
  const navigate = useNavigate();
  const [oppnew, setOppnew] = useState([]);
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input
  const [totalCount, setTotalcount] = useState("");
  const [AllcategoryData, setAllCAtegoryData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [AddPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
  const [invoice_id, setInvoice_id] = useState();
  const [successPopup, setSuccessPopup] = useState(false);
  const [slno, setSlNo] = useState(1);
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
      dataIndex: "category_name",
      key: "category_name",
      width: "8%",
      // align: "center",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "category_description",
      key: "category_description",
      width: "15%",
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
              onClick={() => {
                handleEditedclick(index);
              }}
            />
            <MdPageview fontSize={18} onClick={() => viewcategory(index)} />
            {/* </div> */}
            {/* <div className="editcolor">
              <MdDelete />
            </div> */}
          </div>
        );
      },
      align: "center",
    },
    // {
    //   title: "JOB NO",
    //   dataIndex: "invoice_job_no",
    //   key: "invoice_job_no",
    //   width: "15%",
    //   //  filteredValue: [searchLead],
    //   onFilter: (value, record) => {
    //     return String(record.opportunity_from)
    //       .toLowerCase()
    //       .includes(value.toLowerCase());
    //   },
    // },

    // {
    //   title: "CONSIGNEE",
    //   dataIndex: "invoice_job_consignee",
    //   key: "invoice_job_consignee",
    //   width: "15%",
    //   //  filteredValue: [searchSource],
    //   onFilter: (value, record) => {
    //     return String(record.opportunity_source)
    //       .toLowerCase()
    //       .includes(value.toLowerCase());
    //   },
    // },
    // {
    //   title: "SHIPPER",
    //   dataIndex: "invoice_job_shipper",
    //   key: "invoice_job_shipper",
    //   width: "15%",
    //   // align: "center",
    // },
    // {
    //   title: "STATUS",
    //   dataIndex: "invoice_status",
    //   key: "invoice_status",
    //   width: "15%",
    //   // align: "center",
    // },
    // {
    //   title: "",
    //   dataIndex: "buttons",
    //   width: "17%",
    //   key: "buttons",
    //   align: "center",
    //   // display:"flex",
    //   render: (data, index) => {
    //     console.log("table data", index);
    //     return (
    //       <div className="d-flex justify-content-center p-1">
    //         {/* {index.assigned_employee && index.assigned_employee.length > 0 ? ( */}
    //         <div>
    //           <Button
    //             btnType="add"
    //             className="me-1 view_btn"
    //             onClick={() => {
    //               //   navigate(`${ROUTES.PRINT_INVOICE}/${index.invoice_id}`);
    //             }}
    //           >
    //             Print
    //           </Button>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "",
    //   dataIndex: "buttons",
    //   width: "17%",
    //   key: "buttons",
    //   align: "center",
    //   // display:"flex",
    //   render: (data, index) => {
    //     console.log("table data", index);
    //     return (
    //       <div className="d-flex justify-content-center p-1">
    //         <div>
    //           {/* <Popconfirm title="Are you sure ?" onConfirm={() => {}}> */}
    //           <Button
    //             btnType="add"
    //             className="me-1 view_btn"
    //             onClick={() => {
    //               setAddPopup(true);
    //               setInvoice_id(index.invoice_id);
    //             }}
    //           >
    //             cancel
    //           </Button>
    //           {/* </Popconfirm> */}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
  ];

  const data = [
    {
      category_name: "Lorem ispum",
      category_description: "lorem Ispum is a long test description",
    },
  ];
  //   setAllCAtegoryData(data);

  const handleEditedclick = () => {
    setEditPopup(true);
  };
  const viewcategory = () => {
    setViewPopup(true);
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
                    <MyPagination
                      total={parseInt(totalCount)}
                      current={current}
                      pageSize={numOfItems}
                      onChange={(current, pageSize) => {
                        setCurrent(current);
                      }}
                    />
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
                    data={data}
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
                    <h4 style={{ color: "#0891d1" }}>Create Category</h4>
                    <Form
                      form={AddForm}
                      onFinish={(value) => {
                        console.log("On finishing", value);
                        // cancelInvoice(value);
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
                                  name={"name"}
                                >
                                  <InputType />
                                </Form.Item>
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
                              name={"description"}
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
            />
            <CustomModel
              show={editPopup}
              onHide={() => {
                setEditPopup(false);
              }}
              centered
              View_list
              list_content={
                <div>
                  <div className="container">
                    <h4 style={{ color: "#0891d1" }}>Edit Category</h4>
                    <Form
                      form={AddForm}
                      onFinish={(value) => {
                        console.log("On finishing", value);
                        // cancelInvoice(value);
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
                                  name={"Editname"}
                                >
                                  <InputType />
                                </Form.Item>
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
                              name={"Editdescription"}
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
                                handleEditedclick();
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

                        <div className="row my-3">
                          <div className="col-12">
                            <table>
                              <tbody>
                                <tr>
                                  <td>Category Name</td>
                                  <td>:</td>
                                  <td>Lorem Ispum</td>
                                </tr>
                                <tr>
                                  <td>Category Description</td>
                                  <td>:</td>
                                  <td>
                                    lorem Ispum is a long test description
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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