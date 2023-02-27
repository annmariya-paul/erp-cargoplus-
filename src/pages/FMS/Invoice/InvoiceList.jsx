import { Form, Input, Popconfirm, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Button from "../../../components/button/button";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";
import MyPagination from "../../../components/Pagination/MyPagination";
import TableData from "../../../components/table/table_data";
import moment from "moment";
import { MdDelete, MdPageview } from "react-icons/md";
import PublicFetch from "../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../api/bootapi";
import CustomModel from "../../../components/custom_modal/custom_model";
import TextArea from "../../../components/ InputType TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";

function InvoiceList() {
  const [AddForm] = Form.useForm();
  const navigate = useNavigate();
  const [oppnew, setOppnew] = useState([]);
  const [numOfItems, setNumOfItems] = useState("25");
  const [current, setCurrent] = useState(1); // current page
  const [searchSource, setSearchSource] = useState(""); // search by text input
  const [totalCount, setTotalcount] = useState("");
  const [AllinvoiceData, setAllInvoiceData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [cancelPopup, setCancelPopup] = useState(false);
  const [invoice_id, setInvoice_id] = useState();
  const [successPopup, setSuccessPopup] = useState(false);

  const data = [
    {
      invoice_no: 12234444,
      invoice_date: "23-03-2023",
    },
  ];

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      key: "ACTION",
      width: "15%",
      render: (data, index) => {
        console.log("mere index", index);
        return (
          <div className="d-flex justify-content-center gap-2">
            <div className="editcolor">
              {/* <FaEdit
                onClick={() => {
                  if (
                    index.assigned_employee &&
                    index.assigned_employee.length > 0
                  ) {
                    //   handleEditedclick(index)
                  }
                }}
              /> */}
              <MdPageview
                // onClick={()=>viewprogressoppurtunity(index)}
                onClick={() => {}}
              />
            </div>
            {/* <div className="editcolor">
              <MdDelete />
            </div> */}
          </div>
        );
      },
      align: "center",
    },
    {
      title: "INVOICE NO",
      dataIndex: "invoice_no",
      key: "invoice_no",
      width: "12%",
      // align: "center",
    },
    {
      title: "DATE",
      dataIndex: "invoice_date",
      key: "invoice_date",
      width: "10%",
      render: (record) => {
        return <div>{moment(record?.invoice_date).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      title: "JOB NO",
      dataIndex: "invoice_job_no",
      key: "invoice_job_no",
      width: "15%",
      //  filteredValue: [searchLead],
      onFilter: (value, record) => {
        return String(record.opportunity_from)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },

    {
      title: "CONSIGNEE",
      dataIndex: "invoice_job_consignee",
      key: "invoice_job_consignee",
      width: "15%",
      //  filteredValue: [searchSource],
      onFilter: (value, record) => {
        return String(record.opportunity_source)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "SHIPPER",
      dataIndex: "invoice_job_shipper",
      key: "invoice_job_shipper",
      width: "15%",
      // align: "center",
    },
    {
      title: "STATUS",
      dataIndex: "invoice_status",
      key: "invoice_status",
      width: "15%",
      // align: "center",
    },
    {
      title: "",
      dataIndex: "buttons",
      width: "17%",
      key: "buttons",
      align: "center",
      // display:"flex",
      render: (data, index) => {
        console.log("table data", index);
        return (
          <div className="d-flex justify-content-center p-1">
            {/* {index.assigned_employee && index.assigned_employee.length > 0 ? ( */}
            <div>
              <Button
                btnType="add"
                className="me-1 view_btn"
                onClick={() => {
                  navigate(`${ROUTES.PRINT_INVOICE}/${index.invoice_id}`);
                }}
              >
                Print
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "buttons",
      width: "17%",
      key: "buttons",
      align: "center",
      // display:"flex",
      render: (data, index) => {
        console.log("table data", index);
        return (
          <div className="d-flex justify-content-center p-1">
            <div>
              {/* <Popconfirm title="Are you sure ?" onConfirm={() => {}}> */}
              <Button
                btnType="add"
                className="me-1 view_btn"
                onClick={() => {
                  setCancelPopup(true);
                  setInvoice_id(index.invoice_id);
                }}
              >
                cancel
              </Button>
              {/* </Popconfirm> */}
            </div>
          </div>
        );
      },
    },
  ];

  const close_modal = (mShow, time) => {
    if (!mShow) {
      setTimeout(() => {
        setSuccessPopup(false);

        // navigate(ROUTES.INVOICE_LIST);
      }, time);
    }
  };

  const getAllInvoices = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/invoice`)
      .then((res) => {
        setInvoiceData(res?.data?.data);
        console.log("response", res);
        if (res.data.success) {
          console.log("success of invoices", res.data.data);
          let temp = [];
          res?.data?.data?.forEach((item, index) => {
            temp.push({
              invoice_no: item.invoice_no,
              invoice_id: item.invoice_id,
              invoice_job_id: item.invoice_job_id,
              invoice_date: item.invoice_date,
              invoice_cancel_date: item.invoice_cancel_date,
              invoice_cancel_reason: item.invoice_cancel_reason,
              invoice_status: item.invoice_status,
              invoice_currency: item.invoice_currency,
              invoice_exchange_rate: item.invoice_exchange_rate,
              invoice_grand_total: item.invoice_grand_total,
              invoice_job_no: item.fms_v1_jobs?.job_number,
              invoice_job_consignee:
                item.fms_v1_jobs?.crm_v1_leads?.lead_customer_name,
              invoice_job_shipper: item?.fms_v1_jobs?.job_shipper,
            });
          });

          setAllInvoiceData(temp);

          // console.log(temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  console.log("response to the point", AllinvoiceData);

  const cancelInvoice = (data) => {
    console.log("reson", data);
    PublicFetch.patch(`${CRM_BASE_URL_FMS}/invoice/cancel/${invoice_id}`, {
      invoice_cancel_reason: data.cancel_reason,
    })
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("Success of cancel", res.data.data);
          setSuccessPopup(true);
          close_modal(successPopup, 1200);
          getAllInvoices();
          setCancelPopup(false);
          AddForm.resetFields();
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getAllInvoices();
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
                    <h5 className="lead_text">Invoices</h5>
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
                <div className="row my-3">
                  <div className="col-4   px-3">
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
                  <div className="col-4 d-flex align-items-center justify-content-center">
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
                  <div className="col-lg-3 col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-end"></div>
                </div>
                <div className="datatable">
                  {/* {AllinvoiceData && ( */}
                  <TableData
                    data={AllinvoiceData}
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
            <CustomModel
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

export default InvoiceList;
