import React, { useState, useEffect } from "react";
import "../AddExclusiveOffer/AddExclusiveOffer.css";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";

const ExclusiveOffer = () => {
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [msrp, setMsrp] = useState("");
  const [price, setPrice] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [neWeight, setNetWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [currency, setCurrency] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const history = useHistory("");

  const save = (e) => {
    e.preventDefault();
    Axios.post("/exclusiveoffer/", {
      item_name: productName,
      item_desc: productDescription,
      ingredients: ingredients,
      msrp: msrp,
      price: price,
      gross_wt: grossWeight,
      net_wt: neWeight,
      wt_unit: weightUnit,
      currency: currency,
      category: category,
      brand: brandId,
    })
      .then((data) => {
        console.log(data);
        history.push("/manageexclusiveoffer");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCategoryData = () => {
    Axios.get("/category/product")
      .then((data) => {
        setCategoryData(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

  const brandData = (id) => {
    console.log(id);
    Axios.get(`/brand/category/brand/${id}`)
      .then((data) => {
        // console.log(data.data);
        setBrand(data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="module-main-div">
      <h1 className="module-title">Exclusiveoffer</h1>
      <div className="module-inner-div">
        <form id="addProduct-form" onSubmit={(e) => save(e)}>
          <Input
            autoFocus={true}
            label="Product Name"
            required={true}
            type="none"
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            label="Product Description"
            type="none"
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <Dropdown
            data={CategoryData}
            label="Category"
            onChange={(e) => {
              setCategory(e);
              brandData(e);
            }}
          />

          <Dropdown
            data={brand}
            label="Brand"
            onChange={(e) => {
              setBrandId(e);
            }}
          />

          <Input
            label="Ingredients"
            type="none"
            onChange={(e) => setIngredients(e.target.value)}
          />
          <Input
            label="MSRP"
            type="none"
            onChange={(e) => setMsrp(e.target.value)}
          />
          <Input
            label="Price"
            type="none"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Gross Weight"
            type="none"
            onChange={(e) => setGrossWeight(e.target.value)}
          />
          <Input
            label="Net Weight"
            type="none"
            onChange={(e) => setNetWeight(e.target.value)}
          />
          <Input
            label="Weight Unit"
            type="none"
            onChange={(e) => setWeightUnit(e.target.value)}
          />
          <Input
            label="Currency"
            type="none"
            onChange={(e) => setCurrency(e.target.value)}
          />

          <Input autoFocus={false} label="Product Image 1" type="file" />
          <Input autoFocus={false} label="Product Image 2" type="file" />
          <Input autoFocus={false} label="Product Image 3" type="file" />
          <Input autoFocus={false} label="Product Image 4" type="file" />
          <Button label="Save" />
        </form>
      </div>
    </div>
  );
};

export default ExclusiveOffer;
