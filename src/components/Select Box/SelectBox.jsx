import { Select } from "antd";
import React, { Children } from "react";

function SelectBox({ className, value, onChange, onClick, children }) {
  return (
    <div>
      <div>
        <Select
          style={{
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
          }}
          bordered={false}
          className={`w-100 ${className}`}
          onClick={onClick}
          onChange={onChange}
          value={value}
        >
          {children}
        </Select>
      </div>
    </div>
  );
}

export default SelectBox;
