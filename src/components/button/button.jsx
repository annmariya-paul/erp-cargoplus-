import React from 'react';
import "./button.scss";

const Button = React.forwardRef((props, ref) => {
const {
  btnType = "",
  children,
  onClick,
  className,
  prependIcon = null,
  appendIcon = null,
  ...rest
} = props;
   var classNames = "";

   if (btnType === "save") {
     classNames += "btn_save";
   }
    if (btnType === "add") {
      classNames += "btn_add";
    }

    if (prependIcon) {
      classNames += "prepend-icon";
    }

    if (appendIcon) {
      classNames += "append-icon";
    }
return (
  <button
    ref={ref}
    onClick={() => onClick()}
    className={`px-3 ${classNames} ${className}`}
    {...rest}
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
    })

export default Button; 