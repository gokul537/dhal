import React, { useState, useEffect } from "react";
import "../AddProduct/AddProduct.css";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AWS from "aws-sdk";
import Resizer from "react-image-file-resizer";

const AddProduct = () => {
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
  const [imageData1, setImageData1] = useState("");
  const [imageData2, setImageData2] = useState("");
  const [imageData3, setImageData3] = useState("");
  const [imageData4, setImageData4] = useState("");
  const [photoUrl1, setPhotoUrl1] = useState("");
  const [photoUrl2, setPhotoUrl2] = useState("");
  const [photoUrl3, setPhotoUrl3] = useState("");
  const [photoUrl4, setPhotoUrl4] = useState("");

  const handelImageChange1 = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      800,
      460,
      "jpg",
      90,
      0,
      (uri) => {
        setImageData1(uri);
      },
      "base64"
    );
  };

  const handelImageChange2 = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      800,
      460,
      "jpg",
      90,
      0,
      (uri) => {
        setImageData2(uri);
      },
      "base64"
    );
  };

  const handelImageChange3 = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      800,
      460,
      "jpg",
      90,
      0,
      (uri) => {
        setImageData3(uri);
      },
      "base64"
    );
  };

  const handelImageChange4 = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      800,
      460,
      "jpg",
      90,
      0,
      (uri) => {
        setImageData4(uri);
      },
      "base64"
    );
  };

  const handleUpload1 = (e) => {
    e.preventDefault();
    let id1 = Math.random().toString().slice(11);

    AWS.config.update({
      accessKeyId: "AKIAWUANKMAPID2O3LUH",
      secretAccessKey: "gU/bB617l1djnmdzBYebNeQQrzWBrcSs4EjAd2lO",
      region: "ap-south-1",
    });
    var s3 = new AWS.S3();
    const base64Data = new Buffer.from(
      imageData1.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    s3.putObject({
      Bucket: "dhalmart",
      Body: base64Data,
      Key: id1 + ".jpg",
      ACL: "public-read",
    })
      .promise()
      .then((result) => {
        alert("New Image Uploaded Successfully");
        setPhotoUrl1(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" + id1 + ".jpg"
        );
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpload2 = (e) => {
    e.preventDefault();
    let id2 = Math.random().toString().slice(11);

    AWS.config.update({
      accessKeyId: "AKIAWUANKMAPID2O3LUH",
      secretAccessKey: "gU/bB617l1djnmdzBYebNeQQrzWBrcSs4EjAd2lO",
      region: "ap-south-1",
    });
    var s3 = new AWS.S3();
    const base64Data = new Buffer.from(
      imageData2.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const type = imageData2.split(";")[0].split("/")[1];

    s3.putObject({
      Bucket: "dhalmart",
      Body: base64Data,
      Key: id2 + ".jpg",
      ACL: "public-read",
    })
      .promise()
      .then((result) => {
        alert("New Image Uploaded Successfully");
        setPhotoUrl2(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" + id2 + ".jpg"
        );
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpload3 = (e) => {
    e.preventDefault();

    AWS.config.update({
      accessKeyId: "AKIAWUANKMAPID2O3LUH",
      secretAccessKey: "gU/bB617l1djnmdzBYebNeQQrzWBrcSs4EjAd2lO",
      region: "ap-south-1",
    });
    var s3 = new AWS.S3();
    const base64Data = new Buffer.from(
      imageData3.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    let id3 = Math.random().toString().slice(11);
    console.log(base64Data);
    s3.putObject({
      Bucket: "dhalmart",
      Body: base64Data,
      Key: id3 + ".jpg",
      ACL: "public-read",
    })
      .promise()
      .then((result) => {
        alert("New Image Uploaded Successfully");
        setPhotoUrl3(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" + id3 + ".jpg"
        );
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpload4 = (e) => {
    e.preventDefault();

    AWS.config.update({
      accessKeyId: "AKIAWUANKMAPID2O3LUH",
      secretAccessKey: "gU/bB617l1djnmdzBYebNeQQrzWBrcSs4EjAd2lO",
      region: "ap-south-1",
    });
    var s3 = new AWS.S3();
    const base64Data = new Buffer.from(
      imageData4.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    let id4 = Math.random().toString().slice(11);
    console.log(base64Data);
    s3.putObject({
      Bucket: "dhalmart",
      Body: base64Data,
      Key: id4 + ".jpg",
      ACL: "public-read",
    })
      .promise()
      .then((result) => {
        alert("New Image Uploaded Successfully");
        setPhotoUrl4(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" + id4 + ".jpg"
        );
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const history = useHistory("");

  const save = (e) => {
    e.preventDefault();
    Axios.post("/product/items", {
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
      img_url_1: photoUrl1,
      img_url_2: photoUrl2,
      img_url_3: photoUrl3,
      img_url_4: photoUrl4,
    })
      .then((data) => {
        console.log(data);
        history.push("/manageproduct");
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
      <div id="module-title-div">
        <Link to={"/manageproduct/"}>
          <ArrowLeftOutlined style={{ fontSize: "22px", color: "#000" }} />
        </Link>
        <h1 className="module-title">Add Product</h1>
      </div>

      <div className="module-inner-div">
        <form id="addProduct-form" onSubmit={(e) => save(e)}>
          <div
            style={{
              width: "100%",
              alignContent: "flex-start",
              marginLeft: -350,
            }}
          >
            <h1 style={{ fontSize: 18, fontWeight: "bold" }}>
              {" "}
              Product Details
            </h1>
            <div>
              <Input
                autoFocus={true}
                label="Product Name"
                required={true}
                type="none"
                onChange={(e) => setProductName(e.target.value)}
              />
              <div style={{ marginTop: -101, marginLeft: 450, width: "100%" }}>
                <Input
                  label="Product Description"
                  type="none"
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Dropdown
                data={CategoryData}
                label="Category"
                onChange={(e) => {
                  setCategory(e);
                  brandData(e);
                }}
              />
              <div style={{ marginTop: -87, marginLeft: 450, width: "100%" }}>
                <Dropdown
                  data={brand}
                  label="Brand"
                  onChange={(e) => {
                    setBrandId(e);
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              alignContent: "flex-start",
              marginLeft: -350,
              marginTop: 30,
            }}
          >
            <h1 style={{ fontSize: 18, fontWeight: "bold" }}>Price Details</h1>
            <div>
              <Input
                label="MSRP"
                type="none"
                onChange={(e) => setMsrp(e.target.value)}
              />
              <div style={{ marginTop: -101, marginLeft: 450, width: "100%" }}>
                <Input
                  label="Price"
                  type="none"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Input
                label="Gross Weight"
                type="none"
                onChange={(e) => setGrossWeight(e.target.value)}
              />
              <div style={{ marginTop: -101, marginLeft: 450, width: "100%" }}>
                <Input
                  label="Net Weight"
                  type="none"
                  onChange={(e) => setNetWeight(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Input
                label="Weight Unit"
                type="none"
                onChange={(e) => setWeightUnit(e.target.value)}
              />
              <div style={{ marginTop: -101, marginLeft: 450, width: "100%" }}>
                <Input
                  label="Currency"
                  type="none"
                  onChange={(e) => setCurrency(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              alignContent: "flex-start",
              marginLeft: -350,
              marginTop: 30,
            }}
          >
            <h1 style={{ fontSize: 18, fontWeight: "bold" }}>Images</h1>
            <div style={{ width: "50%" }}>
              <Input
                autoFocus={false}
                onChange={(e) => handelImageChange1(e)}
                label="Product Image 1"
                type="file"
              />
              <Button
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  borderRadius: 5,
                }}
                label="Upload"
                id="photoUploadBtn2"
                name="form1"
                type="submit"
                onClick={(e) => {
                  handleUpload1(e);
                }}
              />
            </div>
            <div style={{ marginTop: -178, marginLeft: 220, width: "50%" }}>
              <Input
                autoFocus={false}
                onChange={(e) => handelImageChange2(e)}
                label="Product Image 2"
                type="file"
              />
              <Button
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  borderRadius: 5,
                }}
                label="Upload"
                id="photoUploadBtn2"
                name="form1"
                type="submit"
                onClick={(e) => {
                  handleUpload2(e);
                }}
              />
            </div>
            <div style={{ marginTop: -178, marginLeft: 440, width: "50%" }}>
              <Input
                autoFocus={false}
                onChange={(e) => handelImageChange3(e)}
                label="Product Image 3"
                type="file"
              />
              <Button
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  borderRadius: 5,
                }}
                label="Upload"
                id="photoUploadBtn2"
                name="form1"
                type="submit"
                onClick={(e) => {
                  handleUpload3(e);
                }}
              />
            </div>
            <div style={{ marginTop: -178, marginLeft: 660, width: "50%" }}>
              <Input
                autoFocus={false}
                onChange={(e) => handelImageChange4(e)}
                label="Product Image 4"
                type="file"
              />
              <Button
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  borderRadius: 5,
                }}
                label="Upload"
                id="photoUploadBtn2"
                name="form1"
                type="submit"
                onClick={(e) => {
                  handleUpload4(e);
                }}
              />
            </div>
            <div>
              <Input
                label="Ingredients"
                type="none"
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
          </div>

          <Button label="Save" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
