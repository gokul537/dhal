import React from "react";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";

const Dropdown = ({ label, value, data, onChange }) => {
  let options = data.map((d) => {
    return <Option value={d.id}>{d.name}</Option>;
  });
  return (
    <div id="input-main-div">
      <p id="input-label">{label}</p>
      <Select required={true} id="dropdown" value={value} onChange={onChange}>
        {options}
      </Select>
    </div>
  );
};

export default Dropdown;
