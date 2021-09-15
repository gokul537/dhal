import React, { useState, useEffect } from "react";
import "./ManageCategory.css";
import { Popconfirm, message } from "antd";
import Axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import AWS from "aws-sdk";
import Resizer from "react-image-file-resizer";
import { Table, Tag, Space } from "antd";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Input from "../../../components/Input/Input";
import DialogActions from "@material-ui/core/DialogActions";

const ManageCategory = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editOpen, setEditOpen] = React.useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState("");
  const [imageData, setImageData] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [editImageData, setEditImageData] = useState("");
  const [editPhotoUrl, setEditPhotoUrl] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editId, setEditId] = useState(0);

  const handeleImageChange = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      650,
      460,
      "jpg",
      90,
      0,
      (uri) => {
        setImageData(uri);
      },
      "base64"
    );
  };

  const handeleEditImageChange = async (e) => {
    const file = e.target.files[0];
    await Resizer.imageFileResizer(
      e.target.files[0],
      800,
      500,
      "jpg",
      90,
      0,
      (uri) => {
        setEditImageData(uri);
      },
      "base64"
    );
  };

  const handleUpload = (e) => {
    e.preventDefault();
    let id = Math.random().toString().slice(11);

    AWS.config.update({
      accessKeyId: "AKIAWUANKMAPID2O3LUH",
      secretAccessKey: "gU/bB617l1djnmdzBYebNeQQrzWBrcSs4EjAd2lO",
      region: "ap-south-1",
    });
    var s3 = new AWS.S3();
    const base64Data = new Buffer.from(
      imageData.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    s3.putObject({
      Bucket: "dhalmart",
      Body: base64Data,
      Key: id + ".jpg",
      ACL: "public-read",
    })
      .promise()
      .then((result) => {
        alert("New Image Uploaded Successfully");
        setPhotoUrl(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" + id + ".jpg"
        );
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditUpload = (e) => {
    e.preventDefault();
    let id1 = Math.random().toString().slice(11);

    AWS.config.update({
      accessKeyId: "AKIAWUANKMAPID2O3LUH",
      secretAccessKey: "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",
      region: "ap-south-1",
    });
    var s3 = new AWS.S3();
    const base64Data = new Buffer.from(
      editImageData.replace(/^data:image\/\w+;base64,/, ""),
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
        alert("Image Uploaded Successfully");
        setEditPhotoUrl(
          "https://dhalmart.s3.us-east-2.amazonaws.com/" + id1 + ".jpg"
        );
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickEditOpen = (id) => {
    setEditOpen(true);
    fetchDataList(id);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const fetchDataList = (id) => {
    try {
      Axios.get("/category/" + id)
        .then((data) => {
          // console.log(data.data.data[0]);
          let d = data.data.data[0];
          setEditCategoryName(d.category_name);
          setEditCategoryImage(d.category_image);
          setEditCategoryId(d.category_id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert("Network error");
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    Axios.post("/category/v1/catalog/categories/add", {
      category_name: categoryName,
      categoryImage: photoUrl,
    })
      .then((data) => {
        alert("Category Inserted Successfully");
        handleClose();
        fetchData();
        setCategoryName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    Axios.get("/category/admin")
      .then((data) => {
        setData(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

  // const addPost = async (e) => {
  //   e.preventDefault();
  //   Axios.post("/category/v1/catalog/categories/add", {
  //     category_name: categoryName,
  //     category_image: photoUrl,
  //   })
  //     .then((data) => {
  //       message.warn(data.data.message);
  //       console.log(data);
  //       handleClose();
  //       fetchData();
  //       setCategoryName("");
  //     })
  //     .catch((err) => alert("Somthing went wrong"));
  // };

  function deleteCategory(category_id) {
    Axios.delete("/category/" + category_id)
      .then((data) => {
        message.success("Category Deleted Successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  }

  const update = () => {
    Axios.put("/category/Update", {
      category_name: editCategoryName,
      category_image: editPhotoUrl,
      category_id: editCategoryId,
    })
      .then((data) => {
        alert("category Updated Successfully");
        handleEditClose();
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
      key: "category_id",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (i, data) => (
        <>
          <img src={data.image_url} alt={data.category_name} id="manage-img" />
        </>
      ),
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Action",
      key: "action",
      render: (i, data) => (
        <Space size="middle">
          <Link
            align="center"
            onClick={() => {
              handleClickEditOpen(data.category_id);
              setEditId(data.category_id);
            }}
          >
            <EditFilled style={{ color: "black" }} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this Category?"
            onConfirm={() => deleteCategory(data.category_id)}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <div className="body-inner-div-body">
              <DeleteFilled />
            </div>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="module-main-div">
      <h1 className="module-title">Category</h1>
      <div
        className="body-inner-div-body"
        style={{ marginTop: -55, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="primary" style={{backgroundColor:"#53b175"}} onClick={handleClickOpen}>
          Add
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            style={{ width: "100%" }}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Input
            style={{ width: "100%" }}
            autoFocus={false}
            label="Category Image"
            type="file"
            onChange={(e) => handeleImageChange(e)}
          >
            <img
              src={imageData}
              style={{ height: 100, margin: 10, borderRadius: 8 }}
            />
          </Input>
          <Button
            style={{
              backgroundColor: "#53b175",
              color: "white",
              marginLeft: 250,
              borderRadius: 5,
              marginTop: -62,
            }}
            id="photoUploadBtn1"
            name="form1"
            type="submit"
            onClick={(e) => {
              handleUpload(e);
            }}
          >
            {/* <PublishIcon /> */}
            Upload
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            style={{backgroundColor:"#53b175"}}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              addPost(e);
            }}
            color="primary"
            variant="contained"
            color="primary"
            style={{backgroundColor:"#53b175"}}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Dialog
          open={editOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category Name"
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
            />
            <img
              style={{
                width: "80px",
                height: "70px",
                margin: 10,
                borderRadius: 8,
              }}
              src={editCategoryImage}
            />
            <Input
              style={{ width: "100%" }}
              autoFocus={false}
              label="Category Image"
              type="file"
              onChange={(e) => handeleEditImageChange(e)}
            >
              <img
                src={editImageData}
                style={{ height: 100, margin: 10, borderRadius: 8 }}
              />
            </Input>
            <Button
              style={{
                backgroundColor:"#53b175",              
                color: "white",
                marginLeft: 250,
                borderRadius: 5,
                marginTop: -62,
              }}
              id="photoUploadBtn2"
              name="form1"
              type="submit"
              variant="contained"
              
              onClick={(e) => {
                handleEditUpload(e);
              }}
            >
              {/* <PublishIcon /> */}
              Upload
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary" variant="contained" style={{backgroundColor:"#53b175"}}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                update();
              }}
              color="primary"
              variant="contained"
              style={{backgroundColor:"#53b175"}}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="module-inner-div-manage">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};

export default ManageCategory;
