import "./agentReport.scss";
import React, { useState } from "react";
import { DatePicker, Input, Select } from "antd";
import TableData from "../../../components/table/table_data";
import SelectBox from "../../../components/Select Box/SelectBox";
import Button from "../../../components/button/button";

export default function AgentReport() {
  const [serialNo, setserialNo] = useState(1);
  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
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
      width: "18%",
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
      job_no: "00111",
      customer: "Test",
      currency: "US Dollar",
      totalcost_fx: "7675",
      totalcost_lx: "9877",
    },
  ];
  return (
    <>
      <div className="container-fluid container_agent_report py-3">
        <div className="row flex-wrap">
          <h5 className="lead_text">Agent Report</h5>
        </div>
        <div className="row">
          <div className="col-sm-4 col-12">
            <p>Agent</p>
            {/* <Form.Item
                    name="job_no"
                    // onChange={(e) => setName(e.target.value)}
                  > */}
            <SelectBox>
              <Select.Option>Agent 1</Select.Option>
            </SelectBox>
            {/* </Form.Item> */}
          </div>
          {/* <div className="col-2 d-flex justify-content-end pt-3">
            <p></p>
          </div> */}
          <div className="col-sm-3 col-6">
            <p>
              Date From
            </p>
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
