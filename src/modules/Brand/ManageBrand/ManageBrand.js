import React, { useState, useEffect } from "react";
import "./ManageBrand.css";
import { Popconfirm, message } from "antd";
import Axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { Table, Tag, Space } from "antd";
import { Button, Select } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 200,
    marginLeft: 20,
  },
}));

const ManageBrand = () => {
  useEffect(() => {
    fetchData();
    fetchCategoryData();
    fetchEditCategoryData();
  }, []);

  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editBrand, setEditBrand] = useState("");
  const [editBrandId, setEditBrandId] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [editCategoryData, setEditCategoryData] = useState([]);

  const fetchCategoryData = () => {
    Axios.get("/category/product")
      .then((data) => {
        setCategoryData(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchEditCategoryData = () => {
    Axios.get("/category/product")
      .then((data) => {
        // console.log("Category", data.data);
        setEditCategoryData(data.data);
      })
      .catch((err) => console.log(err));
  };
  let CategoryOptions = CategoryData.map((s, i) => {
    return <option value={s.id}>{s.name}</option>;
  });

  const fetchData = () => {
    Axios.get("/brand/admin")
      .then((data) => {
        setData(data.data);
        console.log(data.data);
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
        message.success(data.data.message);
        console.log(data);
        handleClose();
        fetchData();
        setCategory("");
        setBrandName("");
      })
      .catch((err) => alert("Something went wrong"));
  };

  function deleteBrand(brand_id) {
    Axios.delete("/brand/" + brand_id)
      .then((data) => {
        message.success("Brand Deleted Successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  }

  const Update = (e) => {
    Axios.put("/brand/Update", {
      category_id: editCategory,
      brand_name: editBrand,
      brand_id: editBrandId,
    })
      .then((data) => {
        console.log(data);
        alert("Brand Updated Successfully");
        handleEditClose();
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEditData = (editBrandId) => {
    try {
      Axios.get("/brand/category/" + editBrandId)
        // Axios.get("/brand/category/" + id)
        .then((data) => {
          console.log(data.data.data[0]);
          let d = data.data.data[0];
          setEditBrand(d.brand_name);
          setEditBrandId(d.brand_id);
          setEditCategory(d.category_id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert("Network error");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickEditOpen = (editBrandId) => {
    setEditOpen(true);
    fetchEditData(editBrandId);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  function deleteBrand(brand_id) {
    Axios.delete("/brand/" + brand_id)
      .then((data) => {
        message.success("Brand Deleted Successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  }

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
      key: "brand_id",
    },
    // {
    //   title: "Image",
    //   dataIndex: "image_url",
    //   key: "image_url",
    //   render: (i, data) => (
    //     <>
    //       <img src={data.img_url_1} alt={data.item_name} id="manage-img" />
    //     </>
    //   ),
    // },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Brand Name",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: "Action",
      key: "action",
      render: (i, data) => (
        <Space size="middle">
          <Link to={"editbrand/" + data.brand_id}>
            <EditFilled style={{ color: "black" }} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this Brand?"
            onConfirm={() => deleteBrand(data.brand_id)}
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
      <h1 className="module-title">Brand</h1>
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
        <DialogTitle id="form-dialog-title">Add New Brand</DialogTitle>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={(value) => {
              setCategory(value.target.value);
            }}
            label="Category"
          >
            {CategoryOptions}
          </Select>
        </FormControl>

        <DialogContent style={{ width: "100%" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Brand"
            type="text"
            style={{ marginTop: 20 }}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained" style={{backgroundColor:"#53b175"}}>
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              save(e);
            }}
            color="primary"
            variant="contained"
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
          <DialogTitle id="form-dialog-title">Update Brand</DialogTitle>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(value) => {
                setEditCategory(value.target.value);
              }}
              label="Category"
              value={editCategory}
            >
              {CategoryOptions}
            </Select>
          </FormControl>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Brand Name"
              type="text"
              value={editBrand}
              onChange={(e) => setEditBrand(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                Update();
              }}
              color="primary"
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

export default ManageBrand;
