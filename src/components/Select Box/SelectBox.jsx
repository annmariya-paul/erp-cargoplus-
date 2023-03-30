import { Select } from "antd";
import React, { Children } from "react";

function SelectBox({
  className,
  value,
  onChange,
  defaultValue,
  onClick,
  children,
  placeholder,
  options,
  showSearch,
  allowClear,
  optionFilterProp,
  disabled,
  onBlur,
  mode,
  maxTagCount,
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
          defaultValue={defaultValue}
          optionFilterProp={optionFilterProp}
          disabled={disabled}
          onBlur={onBlur}
          mode={mode}
          maxTagCount={maxTagCount}
        >
          {children}
        </Select>
      </div>
    </div>
  );
}

export default SelectBox;
