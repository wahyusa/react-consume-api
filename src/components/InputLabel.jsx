import React from "react";

function InputLabel({ value, children, className = "", ...props }) {
  const classes = `block font-medium text-sm text-gray-700 ${className}`;
  return (
    <label className={classes} {...props}>
      {value || children}
    </label>
  );
}

export default InputLabel;
