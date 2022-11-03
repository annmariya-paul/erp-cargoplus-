import { Input } from "antd";
import React from "react";
import "./InputType.scss";

function InputType({ className, value, onChange, onClick, rule, minLength }) {
  return (
    <div>
      <div>
        <Input
          bordered={false}
          onClick={onClick}
          onChange={onChange}
          value={value}
          rule={rule}
          minLength={minLength}
          style={{ backgroundColor: "whitesmoke" }}
          className={`input_type_style w-100 ${className}`}
          type="text"
        />
      </div>
    </div>
  );
}

export default InputType;
