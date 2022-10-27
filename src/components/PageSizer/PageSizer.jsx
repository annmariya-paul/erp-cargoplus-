import { Select } from "antd";
import React from "react";
import "./pageSizer.scss";

function PageSizer({ value, onClick, onChange }) {
  return (
    <div>
      <Select
        bordered={false}
        className=" page_size_style"
        value={value}
        onChange={onChange}
        onClick={onClick}
      >
        <Select.Option value="25">
          Show
          <span className="vertical ms-1">|</span>
          <span className="sizes ms-2"> 25</span>
        </Select.Option>
        <Select.Option value="50">
          Show
          <span className="vertical ms-1">|</span>
          <span className="sizes ms-1"> 50</span>
        </Select.Option>
        <Select.Option value="100">
          Show
          <span className="vertical ms-1">|</span>
          <span className="sizes ms-1">100</span>
        </Select.Option>
      </Select>
    </div>
  );
}

export default PageSizer;
