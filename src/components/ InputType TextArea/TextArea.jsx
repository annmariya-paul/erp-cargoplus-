import React from "react";
import "./TextArea.scss";

function TextArea({ className, value, onChange, onClick }) {
  return (
    <div>
      <div>
        <textarea
          style={{ minHeight: "120px" }}
          onClick={onClick}
          onChange={onChange}
          value={value}
          className={`input_type_style w-100 ${className}`}
        />
      </div>
    </div>
  );
}

export default TextArea;
