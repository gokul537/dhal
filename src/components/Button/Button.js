import React from "react";
import "../Button/Button.css";

const Button = ({ label, onClick }) => {
  return (
    <button id="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
