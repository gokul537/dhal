import React from "react";
import "./Input.css";

const Input = ({ type, label, value, autoFocus, required, onChange }) => {
  return (
    <div id="input-main-div">
      <p id="input-label">{label}</p>
      <input
        id="input"
        value={value}
        required={required || false}
        type={type}
        autoFocus={autoFocus || false}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
