import React, { useState, useEffect } from "react";
import "../AddProduct/AddProduct.css";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AWS from "aws-sdk";
import Resizer from "react-image-file-resizer";
import { Row, Col } from "antd";
import styles from "./EditProduct.module.css";

const EditProfile = () => {
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

  const fetchData = () => {
    try {
      Axios.get("product/v1/catalog/items/" + id)
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
          setPhotoUrl1(d.img_url_1);
          setPhotoUrl2(d.img_url_2);
          setPhotoUrl3(d.img_url_3);
          setPhotoUrl4(d.img_url_4);
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
    Axios.put("/product/Update", {
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
      item_id: id,
    })
      .then((data) => {
        console.log(data);
        history.push("/manageproduct");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="module-main-div">
      <h1 className="module-title">Edit Product</h1>
      <div className="module-inner-div">
        <form className={styles.addProductForm} onSubmit={(e) => save(e)}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: "bold" }}>
              Product Details
            </h1>
            <Row style={{ width: "100%" }}>
              <Col lg={12}>
                <Input
                  autoFocus={true}
                  label="Product Name"
                  required={true}
                  type="none"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Col>
              <Col lg={12}>
                <Input
                  label="Product Description"
                  type="none"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </Col>
            </Row>
          </div>
          <Row style={{ width: "100%" }}>
            <Col lg={12}>
              <Dropdown
                data={CategoryData}
                label="Category"
                value={category}
                onChange={(e) => {
                  setCategory(e);
                  fetchbrandData(e);
                }}
              />
            </Col>
            <Col lg={12}>
              <Dropdown
                data={brandData}
                label="Brand"
                value={brandId}
                onChange={(e) => {
                  setBrandId(e);
                }}
              />
            </Col>
          </Row>
          <h1
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 30,
              marginBottom: -10,
            }}
          >
            Price Details
          </h1>
          <Row style={{ width: "100%" }}>
            <Col lg={12}>
              <Input
                value={msrp}
                label="MSRP"
                type="none"
                onChange={(e) => setMsrp(e.target.value)}
              />
            </Col>
            <Col lg={12}>
              <Input
                value={price}
                label="Price"
                type="none"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col lg={12}>
              <Input
                value={grossWeight}
                label="Gross Weight"
                type="none"
                onChange={(e) => setGrossWeight(e.target.value)}
              />
            </Col>
            <Col lg={12}>
              <Input
                value={neWeight}
                label="Net Weight"
                type="none"
                onChange={(e) => setNetWeight(e.target.value)}
              />
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col lg={12}>
              <Input
                value={weightUnit}
                label="Weight Unit"
                type="none"
                onChange={(e) => setWeightUnit(e.target.value)}
              />
            </Col>
            <Col lg={12}>
              <Input
                value={currency}
                label="Currency"
                type="none"
                onChange={(e) => setCurrency(e.target.value)}
              />
            </Col>
          </Row>

          <h2 style={{ marginTop: 20 }}>Images</h2>
          <Row>
            <Col lg={6}>
              <img src={photoUrl1} style={{ height: 200, width: 200 }} />
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
            </Col>
            <Col lg={6}>
              <img src={photoUrl2} style={{ height: 200, width: 200 }} />
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
            </Col>
            <Col lg={6}>
              <img src={photoUrl3} style={{ height: 200, width: 200 }} />
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
            </Col>
            <Col lg={6}>
              <img src={photoUrl4} style={{ height: 200, width: 200 }} />
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
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col lg={16}>
              <Input
                value={ingredients}
                label="Ingredients"
                type="none"
                onChange={(e) => setIngredients(e.target.value)}
              />
            </Col>
          </Row>
          <Row lg={24} justify="center" style={{ marginTop: 50 }}>
            <Link to={"/manageproduct"}>
              <Button label="Cancel" />
            </Link>
            <Button label="Save" />
          </Row>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
