import React from "react";
import "./TextArea.scss";

function TextArea({ className, value, onChange, onClick ,height}) {
  const textareaStyle = {
    minHeight: height ? "160px" : "100px", // Use specialHeight prop to conditionally set the height
  };
  return (
    <div>
      <div>
        <textarea
          // style={{ minHeight: "100px" }}
          style={textareaStyle}
          onClick={onClick}
          onChange={onChange}
          value={value}
          height={height}
          className={`input_type_style w-100 ${className}`}
        />
      </div>
    </div>
  );
}

export default TextArea;
