import { Pagination } from "antd";
import React from "react";

function MyPagination({ total, onChange, current, pageSize }) {
  return (
    <div>
      <Pagination
        size="small"
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}
        defaultPageSize={25}
        pageSizeOptions={("25", "50", "100")}
        // showSizeChanger={showSizeChanger}
      />
    </div>
  );
}

export default MyPagination;
