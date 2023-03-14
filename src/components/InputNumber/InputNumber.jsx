import { InputNumber } from "antd";
import React from "react";
import "./InputNumber.scss";

function Input_Number({
  className,
  value,
  onChange,
  onClick,
  rule,
  minLength,
  onBlur,
  onKeyDown,
  align,
  precision,
  min,
  step,
  onPressEnter,
  disabled,
}) {
  return (
    <div>
      <div>
        <InputNumber
          bordered={false}
          onClick={onClick}
          onChange={onChange}
          value={value}
          rule={rule}
          align={align}
          step={step}
          min={min}
          precision={precision}
          minLength={minLength}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          style={{ backgroundColor: "#f4f4f7" }}
          className={`input_number_style w-100 my-2 pb-1 ${className}`}
          type="number"
          onPressEnter={onPressEnter}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default Input_Number;
