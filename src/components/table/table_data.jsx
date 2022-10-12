import React, { useState, useEffect, useCallback } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import "./table.styles.scss";
// import { Pagination } from "antd";

export default function TableData({ columns, data }) {
  

  return (
    <>
      <div className="row mt-3 table_data">
        <Table columns={columns} dataSource={data} pagination={false}/>
      </div>
    </>
  );
}
