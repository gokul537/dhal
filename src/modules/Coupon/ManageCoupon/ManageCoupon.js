import React, { useState, useEffect } from "react";
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

const ManageCoupon = () => {
  useEffect(() => {
    fetchData();

  }, []);

  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponAmount, setCouponAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [editId, setEditId] = useState(0);
  const [editCouponCode, setEditCouponCode] = useState("");
  const [editCouponAmount, setEditCouponAmount] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editExpiryDate, setEditExpiryDate] = useState("");
  const [editCouponId, setEditCouponId] = useState("");


  const fetchData = () => {
    Axios.get("/coupon/")
      .then((data) => {
        setData(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

  const save = (e) => {
    e.preventDefault();
    Axios.post("/coupon/", {
      coupon_code: couponCode,
      coupon_amount: couponAmount,
      start_dt: startDate,
      exp_dt: expiryDate,
    })
      .then((data) => {
        message.success(data.data.message);
        console.log(data);
        handleClose();
        fetchData();
        setCouponCode("");
        setCouponAmount("");
        setStartDate("");
        setExpiryDate("");
      })
      .catch((err) => alert("Something went wrong"));
  };


  const Update = (e) => {
    Axios.put("/coupon/Update", {
      coupon_code: editCouponCode,
      coupon_amount: editCouponAmount,
      start_dt: editStartDate,
      exp_dt: editExpiryDate,
      coupon_id: editCouponId,
    })
      .then((data) => {
        console.log(data);
        alert("Coupon Updated Successfully");
        handleEditClose();
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEditData = (editCouponId) => {
    try {
      Axios.get("/coupon/updateList/" + editCouponId)
        .then((data) => {
          console.log(data.data.data[0]);
          let d = data.data.data[0];
          setEditCouponId(d.coupon_id)
          setEditCouponAmount(d.coupon_amount);
          setEditCouponCode(d.coupon_code);
          setEditStartDate(moment(d.start_dt).format("yyyy-MM-DD"));
          setEditExpiryDate(moment(d.exp_dt).format("yyyy-MM-DD"));
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
  const handleClickEditOpen = (editCouponId) => {
    setEditOpen(true);
    fetchEditData(editCouponId);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  function deleteCoupon(coupon_id) {
    Axios.delete("/coupon/" + coupon_id)
      .then((data) => {
        message.success("Coupon Deleted Successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  }

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
      key: "coupon_id",
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
      title: "Coupon Code",
      dataIndex: "coupon_code",
      key: "coupon_code",
    },
    {
      title: "Coupon Amuont",
      dataIndex: "coupon_amount",
      key: "coupon_amount",
    },
    {
      title: "Start Date",
      dataIndex: "start_dt",
      key: "start_dt",
    },
    {
      title: "Expiry Date",
      dataIndex: "exp_dt",
      key: "exp_dt",
    },
    {
      title: "Action",
      key: "action",
      render: (i, data) => (
        <Space size="middle">
       <Link
            align="center"
            onClick={() => {
              handleClickEditOpen(data.coupon_id);
              setEditId(data.coupon_id);
            }}
          >
            <EditFilled style={{ color: "black" }} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this Coupon?"
            onConfirm={() => deleteCoupon(data.coupon_id)}
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
      <h1 className="module-title">Discount Coupons</h1>
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
        <DialogTitle id="form-dialog-title">Add New Coupon</DialogTitle>



        <DialogContent style={{ width: "100%" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Coupon Code"
            type="text"
            style={{ marginTop: 20 }}
            onChange={(e) => setCouponCode(e.target.value)}
          />


        </DialogContent>
        <DialogContent style={{ width: "100%" }}>
        <TextField
            margin="dense"
            id="name"
            label="Coupon Amount"
            type="number"
            style={{ marginTop: 20 }}
            onChange={(e) => setCouponAmount(e.target.value)}
          />
        </DialogContent>
        <DialogContent style={{ width: "100%" }}>
        <TextField
            id="start_date"
            type="date"
            label="Start Date"
            style={{ marginTop: 20 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </DialogContent>
        <DialogContent style={{ width: "100%" }}>
        <TextField
            id="exp_date"
            type="date"
            label="Expiry Date"
            style={{ marginTop: 20 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setExpiryDate(e.target.value)}
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
          <DialogTitle id="form-dialog-title">Update Coupon</DialogTitle>
          
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Coupon Code"
              type="text"
              value={editCouponCode}
              onChange={(e) => setEditCouponCode(e.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Coupon Amount"
              type="text"
              value={editCouponAmount}
              onChange={(e) => setEditCouponAmount(e.target.value)}
            />
          </DialogContent>
          <DialogContent style={{ width: "100%" }}>
        <TextField
            id="start_date"
            type="date"
            label="Start Date"
            value={editStartDate}
            style={{ marginTop: 20 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setEditStartDate(e.target.value)}
          />
        </DialogContent>
        <DialogContent style={{ width: "100%" }}>
        <TextField
            id="exp_date"
            type="date"
            label="Expiry Date"
            style={{ marginTop: 20 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={editExpiryDate}
            onChange={(e) => setEditExpiryDate(e.target.value)}
          />
        </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary" variant="contained" style={{backgroundColor:"#53b175"}}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                Update();
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

export default ManageCoupon;
