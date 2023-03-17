import { Input, Select,Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ACCOUNTS } from "../../../api/bootapi";
import Button from "../../../components/button/button";
import CustomModel from "../../../components/custom_modal/custom_model";
import MyPagination from "../../../components/Pagination/MyPagination";
import TableData from "../../../components/table/table_data";
import { ROUTES } from "../../../routes";
import PublicFetch from "../../../utils/PublicFetch";
import moment from "moment";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";

function DailyExpence() {
  const navigate = useNavigate();
  const [oppnew, setOppnew] = useState([]);
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input
  const [totalCount, setTotalcount] = useState("");
  const [AllexpenceData, setAllExpenseData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [ViewPopup, setViewPopup] = useState(false);
  const [invoice_id, setInvoice_id] = useState();
  const [successPopup, setSuccessPopup] = useState(false);
  const [viewData, setViewData] = useState();

  const pageofIndex = numOfItems * (current - 1) - 1 + 1;
  const [serialNo, setserialNo] = useState(1);

  const [dailyexpenseList, setDailyexpenseList] = useState([]);

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "VOUCHER NO",
      dataIndex: "daily_expense_voucher_no",
      key: "daily_expense_voucher_no",
      width: "12%",
      // align: "center",
    },
    {
      title: "DATE",
      dataIndex: "daily_expense_date",
      key: "daily_expense_voucher_no",
      width: "12%",
      // align: "center",
       render: (record) => {
        return <div>{moment(record?.daily_expense_date).format("DD-MM-YYYY")}</div>
      },
    },
    {
      title: "NAME",
      dataIndex: "daily_expense_name",
      key: "daily_expense_name",
      width: "10%",
      // render: (record) => {
      //   // return <div>{moment(record?.invoice_date).format("DD-MM-YYYY")}</div>;
      // },
    },
    {
      title: "BILL NO",
      dataIndex: "daily_expense_bill_no",
      key: "daily_expense_bill_no",
      width: "15%",
      //  filteredValue: [searchLead],
      onFilter: (value, record) => {
        return String(record.opportunity_from)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },

    // {
    //   title: "TAX",
    //   dataIndex: "daily_expense_taxno",
    //   key: "daily_expense_taxno",
    //   width: "15%",
    //   //  filteredValue: [searchSource],
    //   onFilter: (value, record) => {
    //     return String(record.opportunity_source)
    //       .toLowerCase()
    //       .includes(value.toLowerCase());
    //   },
    // },
    {
      title: "PARTY",
      dataIndex: "daily_expense_party",
      key: "daily_expense_party",
      width: "15%",
      // align: "center",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "15%",
      render: (data, index) => {
        console.log("mere index", index);
        return (
          <div className="d-flex justify-content-center gap-3">
            <div className="editcolor">
              <FaEdit
                fontSize={15}
                onClick={() => {
                  navigate(`${ROUTES.EDIT_EXPENSE}/${index.daily_expense_id}`);
                }}
              />
            </div>
            <div className="editcolor">
              <MdPageview
                fontSize={18}
                // onClick={()=>viewprogressoppurtunity(index)}
                onClick={() => {
                  handleView(index);
                }}
              />
            </div>
            {/* <div className="editcolor">
              < />
            </div> */}
          </div>
        );
      },
      align: "center",
    },
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
    //               navigate(`${ROUTES.PRINT_INVOICE}/${index.invoice_id}`);
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
    //               setCancelPopup(true);
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

  // const pageofIndex = numOfItems * (current - 1) - 1 + 1;
  const pagesizecount = Math.ceil(totalCount / numOfItems);

  const getDailyExpense = () => {
   
    PublicFetch.get(
      `${ACCOUNTS}/daily-expense?startIndex=${pageofIndex}&noOfItems=${numOfItems}`
    )
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          setAllExpenseData(res.data.data.dailyExpenses);
          setTotalcount(res.data.data.total);
setDailyexpenseList(res.data.data.dailyExpenses)
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }


  const handleView = (data) => {
    if (data) {
      setViewPopup(true);
      setViewData(data);
    }
  };

  console.log("Data from Table", viewData);

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  const data12 = dailyexpenseList?.map((item) => [
    item.action,
    item.opportunity_type,
    item.opportunity_from,
    item.opportunity_lead_id,
    item.opportunity_source,
    item.opportunity_party,
  ]);
  const OppHeads = [
    [
      "opportunity_id",
      "opportunity_type",
      "opportunity_source",
      "opportunity_validity",
      "opportunity_description",
      "opportunity_status",
      "opportunity_amount",
    ],
  ];
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  useEffect(() => {
    getDailyExpense();
  }, []);
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
                    <h5 className="lead_text">Daily Expense</h5>
                  </div>
                  
                  <Leadlist_Icons
                  datas={dailyexpenseList}
                  columns={columns}
                  items={data12}
                  xlheading={OppHeads}
                  filename="data.csv"
                  chechboxes={
                    <Checkbox.Group
                      onChange={onChange}
                      value={selectedColumns}
                    >
                      {columnsKeys.map((column) => (
                        <li>
                          <Checkbox value={column} key={column}>
                            {column}
                          </Checkbox>
                        </li>
                      ))}
                    </Checkbox.Group>
                  }
                  />
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
                      <Link
                        to={ROUTES.CREATE_EXPENSE}
                        style={{ color: "white" }}
                      >
                        <Button btnType="save">Add Daily Expense</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="datatable">
                  {/* {AllinvoiceData && ( */}
                  <TableData
                    data={AllexpenceData}
                    // data={allLeadList}
                    // data={OpportunityList}
                    columns={columns}
                    custom_table_css="table_lead_list"
                  />
                  {/* )} */}
                </div>
                <div className="d-flex py-2 justify-content-center">
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
            </div>
            {/* <CustomModel
              show={cancelPopup}
              onHide={() => {
                setCancelPopup(false);
              }}
              centered
              View_list
              list_content={
                <div>
                  <div className="container">
                    <h4 style={{ color: "#0891d1" }}>Cancel Invoice</h4>
                    <Form
                      form={AddForm}
                      onFinish={(value) => {
                        console.log("On finishing", value);
                        cancelInvoice(value);
                      }}
                    >
                      <div className="row">
                        <div className="col-12">
                          <div className="col-12">
                            <div className="">
                              <div className="">
                                <label>Reason For Cancellation</label>
                                <Form.Item name={"cancel_reason"}>
                                  <TextArea />
                                </Form.Item>
                              </div>
                            </div>
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
            /> */}

            <CustomModel
              width={"800px"}
              show={ViewPopup}
              onHide={() => {
                setViewPopup(false);
              }}
              View_list
              list_content={
                <>
                  <div className="container p-3">
                    <div className="row">
                      <div className="col-12">
                        <h4 style={{ color: "#0891d1" }}>View Daily Expense</h4>
                      </div>
                    </div>
                    <div className="row p-2">
                      <div className="col-6">
                        <table>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Voucher No
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_voucher_no}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                BillNo
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_bill_no}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Employee
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {
                                  viewData?.daily_expense_employee
                                    ?.employee_name
                                }
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Tax No
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_taxno}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Remarks
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_remarks}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Amount
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_amount}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Total Amount
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_total_amount}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="col-6">
                        <table>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Date
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {moment(viewData?.daily_expense_date).format(
                                  "DD-MM-YYYY"
                                )}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Name
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_name}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Party
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_party}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Category
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {" "}
                                {
                                  viewData?.accounts_v1_expense_category
                                    ?.expense_category_name
                                }
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Party Address
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_party_address}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Tax Amount
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_tax_amount}
                              </p>
                            </td>
                          </tr>
                          <tr className="py-2">
                            <td>
                              <p
                                style={{ color: "#000" }}
                                className="modal_view_p_style"
                              >
                                Attachments
                              </p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p className="modal_view_p_sub">
                                {viewData?.daily_expense_docs}
                              </p>
                            </td>
                          </tr>
                        </table>
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


export default DailyExpence;
