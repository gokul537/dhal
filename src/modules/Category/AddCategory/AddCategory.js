import React, { useState } from "react";
import "../AddCategory/AddCategory.css";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const history = useHistory();

  const save = (e) => {
    e.preventDefault();
    Axios.post("/category/v1/catalog/categories/add", {
      category_name: formData.name,
    })
      .then((data) => {
        // console.log(data);
        history.push("/managecategory");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="module-main-div">
      <h1 className="module-title">
        Add Category
        <Link to={"/managecategory/"}>
          <div style={{ marginLeft: 200, marginTop: -60 }}>
            <Button label="Back" />
          </div>
        </Link>
      </h1>
      <div className="module-inner-div">
        <form id="addCategory-form" onSubmit={(e) => save(e)}>
          <Input
            autoFocus={true}
            label="Category Name"
            required={true}
            type="none"
            onChange={(e) =>
              setFormData({
                name: e.target.value,
              })
            }
          />
          <Input autoFocus={false} label="Category Image" type="file" />
          <Button label="Save" />
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
