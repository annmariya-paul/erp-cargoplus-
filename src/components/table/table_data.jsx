import React, { useState, useEffect, useCallback } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import "./table.styles.scss";
// import { Pagination } from "antd";

export default function TableData({ columns, data, custom_table_css }) {
  return (
    <>
      <div className={`row mt-3 table_data ${custom_table_css}`}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </>
  );
}
