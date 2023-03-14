import React, { useEffect, useState } from "react";
import { DatePicker, Input, Select } from "antd";
import SelectBox from "../../../../components/Select Box/SelectBox";
import Button from "../../../../components/button/button";
import TableData from "../../../../components/table/table_data";
import PublicFetch from "../../../../utils/PublicFetch";
import { CRM_BASE_URL_FMS } from "../../../../api/bootapi";

function Invoicereport() {
  const [serialNo, setserialNo] = useState(1);
  const [Allinvoice, setAllInvoice] = useState();
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
      key: "job_no",
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
      dataIndex: "date",
      key: "job_no",
      width: "10%",
      //   filteredValue: [searchedText],
      //   onFilter: (value, record) => {
      //     return String(record.freight_type_name  || nameSearch)
      //       .toLowerCase()
      //       .includes(value.toLowerCase());
      //   },
      align: "center",
    },
    {
      title: "JOB NO",
      dataIndex: "job_no",
      key: "job_no",
      width: "18%",
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
    },
    {
      title: "CURRENCY",
      dataIndex: "currency",
      key: "currency",
      width: "15%",
    },
    {
      title: "TOTAL COST (Fx)",
      dataIndex: "totalcost_fx",
      key: "totalcost_fx",
      align: "center",
      width: "16%",
    },
    {
      title: "TOTAL COST (Lx)",
      dataIndex: "totalcost_lx",
      key: "totalcost_lx",
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

  useEffect(() => {
    GetAllInvoices();
  }, []);

  return (
    <>
      <div className="container-fluid container_agent_report py-3">
        <div className="row flex-wrap">
          <h5 className="lead_text">Invoice Report</h5>
        </div>
        <div className="row">
          <div className="col-sm-4 col-12">
            <p>Invoice No</p>

            <SelectBox>
              <Select.Option>Agent 1</Select.Option>
            </SelectBox>
            {/* </Form.Item> */}
          </div>
          {/* <div className="col-2 d-flex justify-content-end pt-3">
            <p></p>
          </div> */}
          <div className="col-sm-3 col-6">
            <p>Date From</p>
            <div className="mt-2">
              <DatePicker></DatePicker>
            </div>
          </div>

          {/* <div className="col-1 pt-3 d-flex justify-content-end">To</div> */}
          <div className="col-sm-3 col-6">
            <p>To</p>
            <div className="mt-2">
              <DatePicker></DatePicker>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-6">
            <p>Job No</p>
            <div className="mt-2">
              <SelectBox></SelectBox>
            </div>
          </div>
          <div className="col-sm-2 d-flex mt-4 pt-3 justify-content-center">
            <Button btnType="save">Search</Button>
          </div>
        </div>
      </div>
      <div className="container-fluid container_agent_report py-2">
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={data}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
      </div>
    </>
  );
}
export default Invoicereport;
