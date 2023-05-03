import { Select } from "antd";
import React, { Children } from "react";

function SelectBox({
  className,
  value,
  onChange,
  onSearch,
  filterOption,
  loading,
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
  open,
  mode,
  maxTagCount,
}) {
  return (
    <div>
      <div className="">
        <Select
          style={{
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
          }}
          bordered={false}
          className={`w-100 ${className}`}
          onClick={onClick}
          onChange={onChange}
          open={open}
          value={value}
          placeholder={placeholder}
          options={options}
          onSearch={onSearch}
          filterOption={filterOption}
          loading={loading}
          showSearch={true}
          allowClear={true}
          defaultValue={defaultValue}
          optionFilterProp="children"
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
