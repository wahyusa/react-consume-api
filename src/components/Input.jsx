import React from "react";

function Input({ disabled = false, className = "", ...props }) {
  const classes = ` focus:outline-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`;
  return <input disabled={disabled} className={classes} {...props} />;
}

export default Input;
