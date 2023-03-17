import { Checkbox, Form, Input, Popconfirm, Select } from "antd";
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

  const [noofItems, setNoofItems] = useState("25");
  // const [current, setCurrent] = useState(1);

  const [totalinvoice, settotalinvoice] = useState("");
  const [serialNo, setserialNo] = useState(1);

  const pageofIndex = noofItems * (current - 1) - 1 + 1;

  const data = [
    {
      invoice_no: 12234444,
      invoice_date: "23-03-2023",
    },
  ];

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
      render: (value, item, index) => serialNo + index,
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
      render: (data, record) => {
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
      title: "PAYMENT STATUS",
      dataIndex: "invoice_status",
      key: "invoice_status",
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
                fontSize={18}
                // onClick={()=>viewprogressoppurtunity(index)}
                onClick={() => {
                  navigate(`${ROUTES.INVOICE_VIEW}/${index.invoice_job_id}`);
                }}
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
                  // navigate(`${ROUTES.PRINT_INVOICE}/${index.invoice_id}`);
                  window.open(
                    `http://localhost:3000/print_invoice/${index.invoice_id}`,
                    `_blank`
                  );
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
          let status = "";
          res?.data?.data?.forEach((item, index) => {
            if (item.invoice_status == 1) {
              status = "pending";
            }
            temp.push({
              invoice_no: item.invoice_no,
              invoice_id: item.invoice_id,
              invoice_job_id: item.invoice_job_id,
              invoice_date: item.invoice_date,
              invoice_cancel_date: item.invoice_cancel_date,
              invoice_cancel_reason: item.invoice_cancel_reason,
              invoice_status: status,
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

          console.log("status", status);
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

  const Invoice_header = [
    [
      "sl_no",
      "invoice_no",
      "invoice_date",
      "job_no",
      "customer",
      "shipper",
      "payment_status",
      "action",
      // "currency",

      //  "lead_status",
    ],
  ];

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  const data12 = AllinvoiceData?.map((item, index) => [
    index + 1,
    item.invoice_no,
    item.invoice_date,
    item.invoice_job_no,
    item.invoice_job_consignee,
    // item.currency,
    item.invoice_job_shipper,
    item.invoice_status,
    item.action,
    // item.cost_fx,
    // item.const_lx,
  ]);

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
                  {AllinvoiceData && (
                    <Leadlist_Icons
                      datas={data12}
                      columns={filteredColumns}
                      items={data12}
                      xlheading={Invoice_header}
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
                      name="Invoice"
                    />
                  )}
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
                    {invoiceData && (
                      <MyPagination
                        total={parseInt(invoiceData?.length)}
                        current={current}
                        pageSize={numOfItems}
                        onChange={(current, pageSize) => {
                          setCurrent(current);
                        }}
                      />
                    )}
                  </div>
                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12"></div> */}
                  <div className="col-4 d-flex justify-content-end"></div>
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
                  {invoiceData && (
                    <MyPagination
                      total={parseInt(invoiceData?.length)}
                      current={current}
                      pageSize={numOfItems}
                      onChange={(current, pageSize) => {
                        setCurrent(current);
                      }}
                    />
                  )}
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
