import { Select } from "antd";
import React, { Children } from "react";

function SelectBox({
  className,
  value,
  onChange,
  onClick,
  children,
  placeholder,
  options,
  showSearch,
  allowClear,
  optionFilterProp,
  disabled,
 
}) {
  return (
    <div>
      <div className="mt-2">
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
          placeholder={placeholder}
          options={options}
          showSearch={showSearch}
          allowClear={allowClear}
          optionFilterProp={optionFilterProp}
          disabled={disabled}
        
        >
          {children}
        </Select>
      </div>
    </div>
  );
}

export default SelectBox;
