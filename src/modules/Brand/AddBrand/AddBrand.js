import React, { useState, useEffect } from "react";
import "../AddBrand/AddBrand.css";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { Link } from "react-router-dom";

const AddBrand = () => {
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const [brandName, setBrandName] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState("");
  const history = useHistory();

  const fetchCategoryData = () => {
    Axios.get("/category/product")
      .then((data) => {
        setCategoryData(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

  const save = (e) => {
    e.preventDefault();
    Axios.post("/brand/", {
      brandName: brandName,
      category: category,
    })
      .then((data) => {
        // console.log(data);
        history.push("/managebrand");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="module-main-div">
      <h1 className="module-title">
        Add Brand{" "}
        <Link to={"/managebrand/"}>
          <div style={{ marginLeft: 200, marginTop: -60 }}>
            <Button label="Back" />
          </div>
        </Link>
      </h1>
      <div className="module-inner-div">
        <form id="addCategory-form" onSubmit={(e) => save(e)}>
          <Dropdown
            data={CategoryData}
            label="Category"
            onChange={(e) => {
              setCategory(e);
            }}
          />

          <Input
            autoFocus={true}
            label="Brand Name"
            required={true}
            type="none"
            onChange={(e) => setBrandName(e.target.value)}
          />
          <Button label="Save" />
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
