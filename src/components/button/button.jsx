import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import "./button.scss";

const Button = React.forwardRef((props, ref) => {
  const {
    btnType = "",
    children,
    id,
    onClick,
    className,
    type,
    prependIcon = null,
    appendIcon = null,
    disabled,
    ...rest
  } = props;
  var classNames = "";

  if (btnType === "save") {
    classNames += "btn_save";
  }
  if (btnType === "add") {
    classNames += "btn_add";
  }
  if (btnType === "add_borderless") {
    classNames += "btn_add_borderless";
  }

  if (prependIcon) {
    classNames += "prepend-icon";
  }

  if (appendIcon) {
    classNames += "append-icon";
  }
  if (btnType === "cancel") {
    classNames += "btn_cancel";
  }
  return (
    <button
      disabled={disabled}
      ref={ref}
      id={id}
      onClick={onClick}
      className={`px-3 ${classNames} ${className}`}
      {...rest}
      type={type}
    >
      {prependIcon ? (
        <span ref={ref} className="cif__btn-prepend-icon-wrapper">
          {prependIcon}
        </span>
      ) : null}{" "}
      <span ref={ref} className="">
        {children}
      </span>
      {appendIcon ? (
        <span ref={ref} className="cif__btn-append-icon-wrapper">
          {appendIcon}
        </span>
      ) : null}
    </button>
  );
});

export default Button;
