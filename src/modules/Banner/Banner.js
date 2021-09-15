import React, { useState, useEffect } from "react";
import Axios from "axios";
import AWS from "aws-sdk";
import Resizer from "react-image-file-resizer";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import { Col, Row } from "antd";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Banner = (props) => {
  const classes = useStyles();
  useEffect(() => {
    fetchData();
    fetchCategoryData();
  }, []);

  const [banner1, setBanner1] = useState("");
  const [banner2, setBanner2] = useState("");
  const [banner3, setBanner3] = useState("");
  const [banner4, setBanner4] = useState("");
  const [imageData1, setImageData1] = useState("");
  const [imageData2, setImageData2] = useState("");
  const [imageData3, setImageData3] = useState("");
  const [imageData4, setImageData4] = useState("");
  //link
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  ////1
  const [CategoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandId, setBrandId] = useState([]);
  //   ///22
  const [CategoryData1, setCategoryData1] = useState([]);
  const [Category1, setCategory1] = useState("");
  const [brand1, setBrand1] = useState([]);
  const [brandId1, setBrandId1] = useState([]);
  //   ///33
  const [CategoryData2, setCategoryData2] = useState([]);
  const [Category2, setCategory2] = useState("");
  const [brand2, setBrand2] = useState([]);
  const [brandId2, setBrandId2] = useState([]);
  //   //4
  const [CategoryData3, setCategoryData3] = useState([]);
  const [Category3, setCategory3] = useState("");
  const [brand3, setBrand3] = useState([]);
  const [brandId3, setBrandId3] = useState([]);

  const fetchCategoryData = () => {
    Axios.get("/category/product")
      .then((data) => {
        setCategoryData(data.data);
        setCategoryData1(data.data);
        setCategoryData2(data.data);
        setCategoryData3(data.data);
      })
      .catch((err) => console.log(err));
  };

  const brandData = (id) => {
    console.log(id);
    Axios.get(`/brand/category/brand/${id}`)
      .then((data) => {
        setBrand(data.data);
        setBrand1(data.data);
        setBrand2(data.data);
        setBrand3(data.data);
      })
      .catch((err) => console.log(err));
  };

  const brandData1 = (id) => {
    console.log(id);
    Axios.get(`/brand/category/brand/${id}`)
      .then((data) => {
        setBrand1(data.data);
      })
      .catch((err) => console.log(err));
  };

  const brandData2 = (id) => {
    console.log(id);
    Axios.get(`/brand/category/brand/${id}`)
      .then((data) => {
        setBrand2(data.data);
      })
      .catch((err) => console.log(err));
  };

  const brandData3 = (id) => {
    console.log(id);
    Axios.get(`/brand/category/brand/${id}`)
      .then((data) => {
        setBrand3(data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchData = () => {
    Axios.get("/banner/list")
      .then((data) => {
        console.log(data.data.data.banner_img_one);
        setImageUrl1(data.data.data.banner_img_one);
        setImageUrl2(data.data.data.banner_img_two);
        setImageUrl3(data.data.data.banner_img_three);
        setImageUrl4(data.data.data.banner_img_four);
      })
      .catch((err) => console.log(err));
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    await Axios.put("/banner/update", {
      banner_img_one: imageUrl1,
      banner_img_two: imageUrl2,
      banner_img_three: imageUrl3,
      banner_img_four: imageUrl4,
      category: category,
      category1: Category1,
      category2: Category2,
      category3: Category3,
      name: brandId,
      name1: brandId1,
      name2: brandId2,
      name3: brandId3,
    })
      .then((data) => {
        if (data.data.status === 200) {
          return alert("Banner Updated Successfully");
        }
        console.log(data);
        alert("Updation Failed");
      })
      .catch((err) => {
        alert("Somthing Went Wrong");
      });
  };

  const handelImageChange1 = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      900,
      500,
      "JPEG",
      80,
      0,
      (uri) => {
        //   console.log(uri);
        setImageData1(uri);
      },
      "base64"
    );
  };

  const handelImageChange2 = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      900,
      500,
      "JPEG",
      80,
      0,
      (uri) => {
        //   console.log(uri);
        setImageData2(uri);
      },
      "base64"
    );
  };

  const handelImageChange3 = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      900,
      500,
      "JPEG",
      80,
      0,
      (uri) => {
        //   console.log(uri);
        setImageData3(uri);
      },
      "base64"
    );
  };

  const handelImageChange4 = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      900,
      500,
      "JPEG",
      80,
      0,
      (uri) => {
        //   console.log(uri);
        setImageData4(uri);
      },
      "base64"
    );
  };
  const handleUpload1 = (e) => {
    e.preventDefault();
    let random = Math.random().toString();
    let name = random.slice(3, 9);

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
    const type = imageData1.split(";")[0].split("/")[1];

    s3.putObject({
      Bucket: "dhalmart",
      Body: base64Data,
      Key: name + "-banner." + type,
      ACL: "public-read",
    })
      .promise()
      .then((result) => {
        setImageUrl1(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" +
            name +
            "-banner." +
            type
        );
        alert("Banner Uploaded Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpload2 = (e) => {
    e.preventDefault();
    let random = Math.random().toString();
    let name = random.slice(3, 9);

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
      Key: name + "-banner." + type,
      ACL: "public-read",
    })
      .promise()
      .then((result) => {
        setImageUrl2(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" +
            name +
            "-banner." +
            type
        );
        console.log(result);
        alert("Banner Uploaded Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpload3 = (e) => {
    e.preventDefault();
    let random = Math.random().toString();
    let name = random.slice(3, 9);

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
    const type = imageData3.split(";")[0].split("/")[1];

    s3.putObject({
      Bucket: "dhalmart",
      Body: base64Data,
      Key: name + "-banner." + type,
      ACL: "public-read",
    })
      .promise()
      .then((result) => {
        setImageUrl3(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" +
            name +
            "-banner." +
            type
        );
        console.log(result);
        alert("Banner Uploaded Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpload4 = (e) => {
    e.preventDefault();
    let random = Math.random().toString();
    let name = random.slice(3, 9);

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
    const type = imageData4.split(";")[0].split("/")[1];

    s3.putObject({
      Bucket: "dhalmart",
      Body: base64Data,
      Key: name + "-banner." + type,
      ACL: "public-read",
    })
      .promise()
      .then((result) => {
        setImageUrl4(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" +
            name +
            "-banner." +
            type
        );
        console.log(result);
        alert("Banner Uploaded Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      className="form-inline"
      style={{ flexDirection: "column", padding: 60 }}
    >
      <div style={{ paddingBottom: 100 }}>
        <h2>Existing Banners</h2>
        <tr>
          <td style={{ paddingLeft: 50 }}>Banner 1</td>
          <td style={{ paddingLeft: 5 }}>
            <img
              src={imageUrl1}
              class="existing-photo"
              style={{
                borderRadius: 10,
                borderColor: "black",
                width: 300,
                height: 180,
              }}
            />
          </td>
          <td style={{ paddingLeft: 50 }}>Banner 2</td>
          <td style={{ paddingLeft: 5 }}>
            <img
              src={imageUrl2}
              class="existing-photo"
              style={{
                marginTop: 20,
                borderRadius: 10,
                borderColor: "black",
                width: 300,
                height: 180,
              }}
            />
          </td>
        </tr>

        <tr>
          <td style={{ paddingLeft: 50 }}>Banner 3</td>
          <td style={{ paddingLeft: 5 }}>
            <img
              src={imageUrl3}
              class="existing-photo"
              style={{
                width: 300,
                borderRadius: 10,
                borderColor: "black",
                height: 180,
              }}
            />
          </td>

          <td style={{ paddingLeft: 50 }}>Banner 4</td>
          <td style={{ paddingLeft: 5 }}>
            <img
              src={imageUrl4}
              class="existing-photo"
              style={{
                marginTop: 20,
                borderRadius: 10,
                borderColor: "black",
                width: 300,
                height: 180,
              }}
            />
          </td>
        </tr>

        <h2 style={{ marginTop: 50 }}>Update New Banners</h2>
        <Row>
          <Col xl={6}>
            <p>Banner 1</p>
            <input
              style={{ maxWidth: "90%" }}
              type="file"
              className="input-image"
              onChange={(e) => handelImageChange1(e)}
            />
            <img
              style={{
                height: 100,
                width: 200,
                objectFit: "cover",
                marginTop: 10,
              }}
              src={imageData1}
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
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleUpload1(e)}
              style={{ marginTop: 15, marginLeft: 50,backgroundColor:"#53b175" }}
            >
              Upload
            </Button>
          </Col>
          {/* banner 2 */}
          <Col xl={6}>
            <p>Banner 2</p>
            <input
              style={{ maxWidth: "90%" }}
              type="file"
              className="input-image"
              onChange={(e) => handelImageChange2(e)}
            />
            <img
              style={{
                height: 100,
                width: 200,
                objectFit: "cover",
                marginTop: 10,
              }}
              src={imageData2}
            />
            <Dropdown
              data={CategoryData1}
              label="Category"
              onChange={(e) => {
                setCategory1(e);
                brandData1(e);
              }}
            />
            <Dropdown
              data={brand1}
              label="Brand"
              onChange={(e) => {
                setBrandId1(e);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleUpload2(e)}
              style={{ marginTop: 15, marginLeft: 50,backgroundColor:"#53b175" }}
            >
              Upload
            </Button>
          </Col>
          {/* banner 3 */}
          <Col xl={6}>
            <p>Banner 3</p>
            <input
              style={{ maxWidth: "90%" }}
              type="file"
              className="input-image"
              onChange={(e) => handelImageChange3(e)}
            />
            <img
              style={{
                height: 100,
                width: 200,
                objectFit: "cover",
                marginTop: 10,
              }}
              src={imageData3}
            />
            <Dropdown
              data={CategoryData2}
              label="Category"
              onChange={(e) => {
                setCategory2(e);
                brandData2(e);
              }}
            />
            <Dropdown
              data={brand2}
              label="Brand"
              onChange={(e) => {
                setBrandId2(e);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleUpload3(e)}
              style={{ marginTop: 15, marginLeft: 50,backgroundColor:"#53b175" }}
            >
              Upload
            </Button>
          </Col>
          {/* banner 4 */}
          <Col xl={6}>
            <p>Banner 4</p>
            <input
              style={{ maxWidth: "90%" }}
              type="file"
              className="input-image"
              onChange={(e) => handelImageChange4(e)}
            />
            <img
              style={{
                height: 100,
                width: 200,
                objectFit: "cover",
                marginTop: 10,
              }}
              src={imageData4}
            />
            <Dropdown
              data={CategoryData3}
              label="Category"
              onChange={(e) => {
                setCategory3(e);
                brandData3(e);
              }}
            />
            <Dropdown
              data={brand3}
              label="Brand"
              onChange={(e) => {
                setBrandId3(e);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleUpload4(e)}
              style={{ marginTop: 15, marginLeft: 50,backgroundColor:"#53b175" }}
            >
              Upload
            </Button>
          </Col>
        </Row>
      </div>
      <div style={{ paddingBottom: 10, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          style={{backgroundColor:"#53b175"}}
          onClick={(e) => saveChanges(e)}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default Banner;
