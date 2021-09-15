import React, { useState, useEffect } from "react";
import "../AddCategory/AddCategory.css";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditCategory = () => {
  let { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const fetchData = () => {
    try {
      Axios.get("/category/" + id)
        .then((data) => {
          console.log(data.data.data[0]);
          let d = data.data.data[0];
          setCategoryName(d.category_name);
          setCategoryId(d.category_id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert("Network error");
    }
  };

  const history = useHistory();

  const save = (e) => {
    e.preventDefault();
    Axios.put("/category/Update", {
      category_name: categoryName,
      category_id: categoryId,
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
      <h1 className="module-title">Edit Category</h1>
      <div className="module-inner-div">
        <form id="addCategory-form" onSubmit={(e) => save(e)}>
          <Input
            autoFocus={true}
            label="Category Name"
            required={true}
            type="none"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Input autoFocus={false} label="Category Image" type="file" />
          <Button label="Save" />
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
