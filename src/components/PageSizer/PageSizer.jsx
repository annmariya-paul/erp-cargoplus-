import { Select } from "antd";
import React, { useState } from "react";
import "./pageSizer.scss";

function PageSizer({ value, onClick, onChange }) {
  const [pageSize, setPageSize] = useState("15");

  localStorage.setItem("noofitem", pageSize);
  // console.log("locaal",localStorage.getItem("noofitem"))

  return (
    <div>
      <Select
        bordered={false}
        className="showpage_size_style"
        value={pageSize}
        // onChange={onChange}
        onChange={(e) => setPageSize(e)}
        onClick={onClick}
      >
        <Select.Option value="15">
          <span className="sizes ms-2"> 15</span>
        </Select.Option>
        <Select.Option value="25">
          {/* Show
          <span className="vertical ms-1">|</span> */}
          <span className="sizes ms-2"> 25</span>
        </Select.Option>
        <Select.Option value="50">
          {/* Show
          <span className="vertical ms-1">|</span> */}
          <span className="sizes ms-2"> 50</span>
        </Select.Option>
        <Select.Option value="100">
          {/* Show
          <span className="vertical ms-1">|</span> */}
          <span className="sizes ms-1">100</span>
        </Select.Option>
      </Select>
    </div>
  );
}

export default PageSizer;
