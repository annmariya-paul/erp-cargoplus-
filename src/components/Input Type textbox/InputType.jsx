import { Input } from "antd";
import React from "react";
import "./InputType.scss";

function InputType({
  className,
  value,
  onChange,
  onClick,
  rule,
  minLength,
  onBlur,
  onKeyDown,
  align,
  controls,
  disabled,
}) {
  return (
    <div>
      <div>
        <Input
          bordered={false}
          onClick={onClick}
          onChange={onChange}
          value={value}
          rule={rule}
          align={align}
          controls={controls}
          minLength={minLength}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
          style={{ backgroundColor: "#f4f4f7" }}
          className={`input_type_style w-100  pb-2 ${className}`}
          type="text"
        />
      </div>
    </div>
  );
}

export default InputType;
