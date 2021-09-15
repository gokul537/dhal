import React, { useState, useEffect } from "react";
import "./ManageProduct.css";
import { Popconfirm, message } from "antd";
import Axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { Table, Tag, Space, Input } from "antd";
import { Button } from "@material-ui/core";
import { $CombinedState } from "redux";
import Loader from "react-loader-spinner";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
const ManageProduct = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msrp, setMsrp] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [offerPrice, setOfferPrice] = React.useState("");
  const [editId, setEditId] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const { Search } = Input;

  const search = (keyword) => {
    let innerSearchResult = [];
    let searchData = data;
    searchData.map((d) => {
      d.item_name = d.item_name.toLowerCase();
      if (d.item_name.includes(keyword.toLowerCase())) {
        innerSearchResult.push(d);
      }
    });
    setSearchResults(innerSearchResult);
  };

  const fetchData = () => {
    setIsLoading(true);
    Axios.get("/product/admin")
      .then((data) => {
        setIsLoading(false);
        setData(data.data.data1);
        console.log(data.data.data1);
      })
      .catch((err) => console.log(err));
  };

  const fetchEditData = (item_id) => {
    try {
      Axios.get("product/v1/catalog/items/" + item_id)
        .then((data) => {
          console.log(data.data.data[0]);
          setMsrp(data.data.data[0].msrp);
          setPrice(data.data.data[0].price);
          setOfferPrice(data.data.data[0].offer_price);
          setEditId(data.data.data[0].item_id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert("Network error");
    }
  };

  function deleteProduct(item_id) {
    Axios.delete("/product/" + item_id)
      .then((data) => {
        message.success("Product Deleted Successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleClickEditOpen = (item_id) => {
    setEditOpen(true);
    fetchEditData(item_id);
  };

  const Update = (e) => {
    Axios.put("/product/Exclusive/Update", {
      offer_price: offerPrice,
      item_id: editId,
    })
      .then((data) => {
        console.log(data);
        alert("Offer Updated Successfully");
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
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (i, data) => (
        <>
          <img src={data.img_url_1} alt={data.item_name} id="manage-img" />
        </>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "item_name",
      key: "item_name",
    },
    {
      title: "MSRP",
      dataIndex: "msrp",
      key: "msrp",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (i, data) => (
        <Space size="middle">
          <Link to={"editproduct/" + data.item_id}>
            <EditFilled style={{ color: "black" }} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this Product?"
            onConfirm={() => deleteProduct(data.item_id)}
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
    {
      title: "Exclusive Offer",
      key: "action2",
      render: (i, data) => (
        <Space size="middle">
          <Link
            align="center"
            onClick={() => {
              handleClickEditOpen(data.item_id);
            }}
          >
            <EditFilled style={{ color: "black" }} />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="module-main-div">
      <div>
        <Dialog
          open={editOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Price</DialogTitle>

          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="MSRP"
              type="text"
              value={msrp}
              onChange={(e) => setMsrp(e.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              disable
              margin="dense"
              id="name"
              label="Price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              disable
              margin="dense"
              id="name"
              label="Offer Price"
              type="text"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleEditClose}
              color="primary"
              variant="contained"
              style={{ backgroundColor: "#53b175" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                Update();
              }}
              color="primary"
              variant="contained"
              style={{ backgroundColor: "#53b175" }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <h1 className="module-title">Product</h1>
      <div
        className="body-inner-div-body"
        style={{ marginTop: -55, justifyContent: "flex-end" }}
      >
        <Link to={"/addproduct/"}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#53b175" }}
          >
            Add
          </Button>
        </Link>
      </div>
      <Search
        style={{ width: 300, marginBottom: 20 }}
        placeholder="Enter the product name..."
        allowClear
        onChange={(e) => {
          search(e.target.value);
        }}
      />
      <div className="module-inner-div-manage">
        {isLoading ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={5000} //5 secs
            alignItems="center"
          />
        ) : (
          <Table
            dataSource={searchResults.length > 0 ? searchResults : data}
            columns={columns}
            pagination={{ pageSize: 20 }}
            scroll={{ y: 400 }}
          />
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
