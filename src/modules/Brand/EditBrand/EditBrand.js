import React, { useState, useEffect } from "react";
import "../EditBrand/EditBrand.css";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { useParams } from "react-router-dom";

const EditBrand = () => {
  let { id } = useParams();

  useEffect(() => {
    fetchData();
    fetchCategoryData();
  }, []);

  const [Brandname, setBrand] = useState("");
  const [BrandId, setBrandId] = useState("");

  const [CategoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState("");

  const history = useHistory("");

  const fetchData = () => {
    try {
      Axios.get("/brand/category/" + id)
        .then((data) => {
          console.log(data.data.data[0]);
          let d = data.data.data[0];
          setBrand(d.brand_name);
          setBrandId(d.brand_id);
          setCategory(d.category_id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert("Network error");
    }
  };

  const fetchCategoryData = () => {
    Axios.get("/category/product")
      .then((data) => {
        console.log("Category", data.data);
        setCategoryData(data.data);
      })
      .catch((err) => console.log(err));
  };

  const save = (e) => {
    e.preventDefault();
    Axios.put("/brand/Update", {
      brand_id: BrandId,
      category_id: category,
      brand_name: Brandname,
    })
      .then((data) => {
        console.log(data);
        history.push("/managebrand");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="module-main-div">
      <h1 className="module-title">Edit Brand</h1>
      <div className="module-inner-div">
        <form id="addbrand-form" onSubmit={(e) => save(e)}>
          <Dropdown
            data={CategoryData}
            label="Category"
            value={category}
            onChange={(e) => {
              setCategory(e);
              // fetchbrandData(e);
            }}
          />

          <Input
            autoFocus={true}
            label="Brand Name"
            type="none"
            value={Brandname}
            onChange={(e) => setBrand(e.target.value)}
          />

          <Button label="Save" />
        </form>
      </div>
    </div>
  );
};

export default EditBrand;
