import React, { useState, useEffect } from "react";
import "../EditExclusiveOffer/EditExclusiveOffer.css";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { useParams } from "react-router-dom";

const EditExclusiveOffer = () => {
  let { id } = useParams();

  useEffect(() => {
    fetchData();
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
  const [brandData, setBrandData] = useState([]);
  const [brandId, setBrandId] = useState("");

  const history = useHistory("");

  const fetchData = () => {
    try {
      Axios.get("/exclusiveoffer/offer/" + id)
        .then((data) => {
          console.log(data.data.data[0]);
          let d = data.data.data[0];
          setProductName(d.item_name);
          setProductDescription(d.item_desc);
          setProductDescription(d.item_desc);
          setIngredients(d.ingredients);
          setMsrp(d.msrp);
          setPrice(d.price);
          setGrossWeight(d.gross_wt);
          setNetWeight(d.net_wt);
          setWeightUnit(d.wt_unit);
          setCurrency(d.currency);
          setCategory(d.category_id);
          fetchbrandData(d.category_id);
          setBrandId(d.brand_id);
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

  const fetchbrandData = (id) => {
    Axios.get(`/brand/category/brand/${id}`)
      .then((data) => {
        console.log("Brand", data.data);
        setBrandData(data.data);
      })
      .catch((err) => console.log(err));
  };

  const save = (e) => {
    // alert("hi");
    e.preventDefault();
    Axios.put("/exclusiveoffer/Update", {
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
      exclusive_offer_id: id,
    })
      .then((data) => {
        console.log(data);
        history.push("/manageexclusiveoffer");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="module-main-div">
      <h1 className="module-title">Edit ExclusiveOffer</h1>
      <div className="module-inner-div">
        <form id="addProduct-form" onSubmit={(e) => save(e)}>
          <Input
            autoFocus={true}
            label="Product Name"
            required={true}
            type="none"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            label="Product Description"
            type="none"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <Dropdown
            data={CategoryData}
            label="Category"
            value={category}
            onChange={(e) => {
              setCategory(e);
              fetchbrandData(e);
            }}
          />

          <Dropdown
            data={brandData}
            label="Brand"
            value={brandId}
            onChange={(e) => {
              setBrandId(e);
            }}
          />

          <Input
            value={ingredients}
            label="Ingredients"
            type="none"
            onChange={(e) => setIngredients(e.target.value)}
          />
          <Input
            value={msrp}
            label="MSRP"
            type="none"
            onChange={(e) => setMsrp(e.target.value)}
          />
          <Input
            value={price}
            label="Price"
            type="none"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            value={grossWeight}
            label="Gross Weight"
            type="none"
            onChange={(e) => setGrossWeight(e.target.value)}
          />
          <Input
            value={neWeight}
            label="Net Weight"
            type="none"
            onChange={(e) => setNetWeight(e.target.value)}
          />
          <Input
            value={weightUnit}
            label="Weight Unit"
            type="none"
            onChange={(e) => setWeightUnit(e.target.value)}
          />
          <Input
            value={currency}
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

export default EditExclusiveOffer;
