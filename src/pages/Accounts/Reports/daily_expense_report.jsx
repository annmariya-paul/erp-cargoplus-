import "./accounts_reports.scss";
import React, { useState, useEffect } from "react";
import { DatePicker, Input, Select } from "antd";
import TableData from "../../../components/table/table_data";
import SelectBox from "../../../components/Select Box/SelectBox";
import Button from "../../../components/button/button";
import PublicFetch from "../../../utils/PublicFetch";
import Leadlist_Icons from "../../../components/lead_list_icon/lead_list_icon";

export default function DailyExpenseReport() {
  const [serialNo, setserialNo] = useState(1);
  const [reportData, setReportData] = useState([]);

  const columns = [
    {
      title: "Sl. No.",
      key: "index",
      width: "8%",
      render: (value, item, index) => serialNo + index,
      align: "center",
    },
    {
      title: "VOUCHER NO",
      dataIndex: "voucher_no",
      key: "voucher_no",
      width: "18%",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      width: "15%",
      align: "right",
    },
  ];

  const columnsKeys = columns.map((column) => column.key);

  const [selectedColumns, setSelectedColumns] = useState(columnsKeys);
  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  );
  console.log("filtered columns::", filteredColumns);
  const onChange1 = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  //for Xlsx data
  const UnitHeads = [
    [
      "Slno",
      "VENDOR",
      "CONTACT",
      "PHONE",
      "EMAIL",
      "VENDOR TYPE",
      // "PROFIT/LOSS",
    ],
  ];
  //for pdf download
  const data12 = reportData?.map((item, index) => [
    index + serialNo,
    item.vendor_name,
    item.vendor_contact,
    item.vendor_contact,
    item.vendor_email,
    item.vendor_org_type,
    // item.profit,
  ]);

  return (
    <>
      <div className="container-fluid container_account_report py-3">
        <div className="row align-items-center">
          <div className="col-6">
            <h5 className="lead_text">Daily Expense Report</h5>
          </div>
          <div className="col-6 d-flex justify-content-end">
            {data12 && (
              <Leadlist_Icons
                datas={data12}
                columns={filteredColumns}
                items={data12}
                xlheading={UnitHeads}
                filename="data.csv"
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 col-12">
            <lable>Category</lable>
            <SelectBox
              showSearch={true}
              allowClear
              optionFilterProp="children"
            ></SelectBox>
          </div>
          <div className="col-sm-3 col-6">
            <label>Date From</label>
            <div className="mt-2">
              <DatePicker></DatePicker>
            </div>
          </div>
          <div className="col-sm-3 col-6">
            <label>To</label>
            <div className="mt-2">
              <DatePicker></DatePicker>
            </div>
          </div>
          <div className="col-sm-3 d-flex mt-4 pt-1 px-2 justify-content-center gap-3">
            <Button btnType="save">Search</Button>
          </div>
        </div>
      </div>
      <div className="container-fluid container_agent_report py-2">
        <div className="datatable">
          <TableData
            // data={getData(current, pageSize)}
            data={reportData}
            columns={columns}
            custom_table_css="table_lead_list"
          />
        </div>
        <div className="d-flex justify-content-end">
          <div className="col-1">
            <p className="boldhd">Total :</p>
          </div>
          <p>0.00</p>
        </div>
      </div>
    </>
  );
}
