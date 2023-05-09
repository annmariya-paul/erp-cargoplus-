import React, { useState, useEffect, useCallback } from "react";
import { Table, Typography } from "antd";
import "antd/dist/antd.css";
import "./table.styles.scss";
// import { Pagination } from "antd";

export default function TableData({
  columns,
  data,
  custom_table_css,
  expandable,
  expandIconColumnIndex,
  className,
  style,
  bordered,
  rowKey,
  footer,
  totalSummary,
  tableType,
  rowClassName,
}) {
  const { Text } = Typography;
  return (
    <>
      <div className={`row mt-3 table_data ${custom_table_css}`}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          expandable={expandable}
          expandIconColumnIndex={expandIconColumnIndex}
          className={className}
          style={style}
          bordered={bordered}
          rowKey={rowKey}
          footer={footer}
          rowClassName={(record, index) =>
            tableType === "secondary"
              ? "table-row-light"
              : index % 2 === 0
              ? "table-row-light"
              : "table-row-dark"
          }
          summary={() => {
            if (totalSummary) {
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={4} align="right">
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text>{totalSummary[0]?.costTotal}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text>{totalSummary[0]?.expenseTotal}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align="right">
                      <Text>{totalSummary[0]?.profitLossTotal}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            } else {
              return null;
            }
          }}
        />
      </div>
    </>
  );
}
