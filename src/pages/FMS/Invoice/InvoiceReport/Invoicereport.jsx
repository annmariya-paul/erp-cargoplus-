import React, { useEffect, useState } from "react";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import SelectBox from "../../../../components/Select Box/SelectBox";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";
import moment from "moment";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx/xlsx.js"; //for xl download
import LeadlistIcons from "../../../../components/lead_list_icon/lead_list_icon";

function Invoicereport() {
  const [serialNo, setserialNo] = useState(1);
  const [Allinvoice, setAllInvoice] = useState();
  const [Alljobs, setAllJobs] = useState();
  const [allReports, setAllReports] = useState();

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "7%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "INVOICE No",
      dataIndex: "invoice_no",
      key: "invoice_no",
      width: "16%",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.freight_type_name  || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
    },
    {
      title: "DATE",
      dataIndex: "invoice_date",
      key: "invoice_date",
      width: "10%",
      align: "center",
      render: (data, index) => {
        return <div>{moment(index.invoice_date).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      title: "JOB NO",
      dataIndex: "job_no",
      key: "job_no",
      width: "15%",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.freight_type_name  || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "customer",
      width: "10%",
    },
    {
      title: "CURRENCY",
      dataIndex: "currency",
      key: "currency",
      width: "10%",
    },
    {
      title: "TOTAL COST (Fx)",
      dataIndex: "cost_fx",
      key: "cost_fx",
      align: "center",
      width: "16%",
    },
    {
      title: "TOTAL COST (Lx)",
      dataIndex: "const_lx",
      key: "const_lx",
      align: "center",
      width: "16%",
    },
  ];
  const data = [
    {
      invoice_no: "JB34u893",
      date: "12/03/22",
      job_no: "00111",
      customer: "Test",
      currency: "US Dollar",
      totalcost_fx: "7675",
      totalcost_lx: "9877",
    },
  ];

  const GetAllInvoices = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/invoice`)
      .then((res) => {
        console.log("response data", res);
        if (res.data.success) {
          console.log("success of data", res.data.data);
          setAllInvoice(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const GetAllJobs = () => {
    PublicFetch.get(`${CRM_BASE_URL_FMS}/job?startIndex=0&noOfItems=1000`)
      .then((res) => {
        console.log("response", res);
        if (res.data.success) {
          console.log("Success", res.data.data.job);
          setAllJobs(res.data.data.job);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const SearchReport = (data) => {
    let date_f = "";
    let date_t = "";
    if (data.date_from) {
      date_f = moment(data.date_from);
    }
    if (data.date_to) {
      date_t = moment(data.date_to);
    }

    let data1 = {
      invoice_no: data.invoice_no,
      date_from: date_f,
      date_to: date_t,
      job_no: data.job_no,
    };
    PublicFetch.post(`${CRM_BASE_URL_FMS}/reports/invoice-report`, data1)
      .then((res) => {
        console.log("Response", res);
        if (res.data.success) {
          console.log("success of response", res.data.data);
          let temp = [];
          res.data.data.forEach((item, index) => {
            temp.push({
              invoice_date: item.invoice_date,
              invoice_no: item.invoice_no,
              job_no: item.job_no,
              customer: item?.customer?.customer_name,
              currency: item?.currency?.currency_name,
              cost_fx: item.cost_fx.toFixed(2),
              const_lx: item.const_lx.toFixed(2),
            });
          });
          setAllReports(temp);
          // console.log("deu", temp);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const Invoice_Report_header = [
    [
      "invoice_no",
      "invoice_date",
      "job_no",
      "customer",
      "currency",
      "cost_fx",
      "const_lx",

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

  const data12 = allReports?.map((item) => [
    item.action,
    item.invoice_no,
    item.invoice_date,
    item.job_no,
    item.customer,
    item.currency,
    item.cost_fx,
    item.const_lx,
  ]);

  useEffect(() => {
    GetAllInvoices();
    GetAllJobs();
  }, []);

  return (
    <>
      <div className="container-fluid container_agent_report py-3">
        <div className="row flex-wrap">
          <div className="col-6">
            <h5 className="lead_text">Invoice Report</h5>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end">
              {/* <div className="icon-border p-1">
                <a className="icon" href="#">
                  <FaFileExcel onClick={handleExport} />
                </a>
              </div> */}
              {allReports && (
                <LeadlistIcons
                  datas={allReports}
                  columns={filteredColumns}
                  items={data12}
                  xlheading={Invoice_Report_header}
                  filename="data.csv"
                  chechboxes={
                    <Checkbox.Group onChange={onChange} value={selectedColumns}>
                      {columnsKeys.map((column) => (
                        <li>
                          <Checkbox value={column} key={column}>
                            {column}
                          </Checkbox>
                        </li>
                      ))}
                    </Checkbox.Group>
                  }
                  name="Invoice Report"
                />
              )}
            </div>
          </div>
        </div>
        <Form
          onFinish={(value) => {
            console.log("submitted values", value);
            SearchReport(value);
          }}
        >
          <div className="row">
            <div className="col-sm-4 col-12">
              <p>Invoice No</p>
              <Form.Item name="invoice_no">
                <SelectBox>
                  {Allinvoice &&
                    Allinvoice.length > 0 &&
                    Allinvoice.map((item, index) => {
                      return (
                        <Select.Option
                          key={item.invoice_no}
                          value={item.invoice_no}
                        >
                          {item.invoice_no}{" "}
                        </Select.Option>
                      );
                    })}
                </SelectBox>
              </Form.Item>
            </div>
            {/* <div className="col-2 d-flex justify-content-end pt-3">
            <p></p>
          </div> */}
            <div className="col-sm-4 col-6">
              <p>Date From</p>
              <div className="mt-4">
                <Form.Item name="date_from">
                  <DatePicker format={"DD-MM-YYYY"} />
                </Form.Item>
              </div>
            </div>

            {/* <div className="col-1 pt-3 d-flex justify-content-end">To</div> */}
            <div className="col-sm-4 col-6">
              <p>To</p>
              <div className="mt-4">
                <Form.Item name="date_to">
                  <DatePicker format={"DD-MM-YYYY"} />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-4 col-6">
              <p>Job No</p>
              <div className="">
                <Form.Item name="job_no">
                  <SelectBox>
                    {Alljobs &&
                      Alljobs.length > 0 &&
                      Alljobs.map((item, index) => {
                        return (
                          <Select.Option
                            key={item.job_number}
                            value={item.job_number}
                          >
                            {item.job_number}{" "}
                          </Select.Option>
                        );
                      })}
                  </SelectBox>
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-2 d-flex mt-4 pt-3 justify-content-center">
              <Button btnType="save" type="submit">
                Search
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className="container-fluid container_agent_report py-2">
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={allReports}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
    </>
  );
}
export default Invoicereport;
