import React from "react";
import "./InputType.scss";

function InputType({ className, value, onChange, onClick }) {
  return (
    <div>
      <div>
        <input
          onClick={onClick}
          onChange={onChange}
          value={value}
          className={`input_type_style w-100 ${className}`}
          type="text"
        />
      </div>
    </div>
  );
}

export default InputType;
