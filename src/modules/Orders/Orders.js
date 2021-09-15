import React, { useState, useEffect } from "react";
import "./Orders.css";
import { Popconfirm, message, Input, Space, Table } from "antd";
import Axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Button,
  //   Select,
  //   Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { EditFilled } from "@ant-design/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";

const Orders = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [invoiceOrderNumber, setInvoiceOrderNumber] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [orderNumberStatus, setOrderNumberStatus] = useState("");
  const [Ordered, setOrdered] = useState("");
  const [InProgress, setInProgress] = useState("");
  const [Packed, setPacked] = useState("");
  const [Delivered, setDelivered] = useState("");
  const [outForDelivery, setOutForDelivery] = useState("");
  const [cancelled, setCancelled] = useState("");
  const [open, setOpen] = React.useState(false);
  const [object, setObject] = useState([]);
  const [total, setTotal] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const { Search } = Input;

  const search = (keyword) => {
    console.log(keyword);
    let innerSearchResult = [];
    let searchData = data;
    searchData.map((d) => {
      if (d.first_name && d.order_no != null) {
        d.first_name = d.first_name.toLowerCase() || null;
        d.order_no = d.order_no.toLowerCase() || null;
        if (
          d.first_name.includes(keyword.toLowerCase()) ||
          d.order_no.includes(keyword.toLowerCase())
        ) {
          innerSearchResult.push(d);
        }
      }
    });
    setSearchResults(innerSearchResult);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen(false);
  };

  const handleClick = (event, orderNumber) => {
    setAnchorEl(event.currentTarget);
    setOrderNumberStatus(orderNumber);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editStatus = (e, orderNumber, status) => {
    e.preventDefault();
    // alert(status)
    Axios.put("/orders/Update", {
      status: status,
      order_number: orderNumber,
    })
      .then((data) => {
        // console.log(orderNumber);
        alert("Order Updated Successfully");
        fetchData();
        // console.log(data);
      })
      .catch((err) => alert("Somthing went wrong"));
  };

  const fetchData = () => {
    Axios.get("/orders/")
      .then((data) => {
        setData(data.data);
        setOrderNumber(data.data.order_no);

        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchOrderData = (order_id) => {
    // alert(order_id)
    Axios.get("/orders/orderDetail/" + order_id).then((data) => {
      // console.log(data.data.data)
      setObject(data.data.data);
      setInvoiceOrderNumber(data.data.data[0].order_number);
      setDate(data.data.data[0].crte_dt);
    });
    // .catch((err) => alert("Somthing went wrong"));
  };

  const fetchSumData = (order_id) => {
    Axios.get("/orders/sum/orderDetail/" + order_id)
      .then((data) => {
        setTotal(data.data.data[0].item_sale_amount);
        // console.log(data.data.data[0].item_sale_amount);
      })
      .catch((err) => console.log(err));
  };

  const fetchCustomerData = (customer_id) => {
    // alert(customer_id)
    Axios.get("/user/" + customer_id)
      .then((data) => {
        console.log(data.data.data[0]);
        setCustomerData(data.data.data[0]);
      })
      .catch((err) => alert("Somthing went wrong"));
  };

  const printReceipt = () => {
    window.print();
  };

  const defaultProps = {
    bgcolor: "background.paper",
    m: 1,
    border: 1,
    style: { width: "35rem", padding: "1px" },
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
      key: "id",
    },

    {
      title: "Order No",
      dataIndex: "order_no",
      key: "order_no",
    },
    {
      title: "Date",
      dataIndex: "crte_dt",
      key: "crte_dt",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Action",
      key: "action",
      render: (i, data) => (
        <Space size="middle">
          <Link to={"/editorder/" + data.order_id}>
            <EditFilled style={{ color: "black" }} />
          </Link>
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (i, data) => (
        <Space>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onChange={(e) => setStatus(e.target.value)}
            onClick={(e) => handleClick(e, data.order_no)}
          >
            {data.state}
          </Button>
        </Space>
      ),
    },
    {
      title: "Generate Bill",
      key: "invoice",
      render: (i, data) => (
        <Space style={{ alignItems: "left" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClickOpen(data.order_id);
              fetchOrderData(data.order_id);
              fetchSumData(data.order_id);
              fetchCustomerData(data.customer_id);
            }}
          >
            Invoice
          </Button>
        </Space>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (i, data) => (
        <Space size="middle">
          <Link to={"/editorder/" + data.order_id}>
            <EditFilled style={{ color: "black" }} />
          </Link>
        </Space>
      ),
    },

    {
      title: "Order Detail",
      key: "detail",
      render: (i, data) => (
        <Space size="middle">
          <Link to={"orderdetail/" + data.order_id}>
            <button id="edit-btn">Detail</button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="module-main-div">
      <h1 className="module-title">Orders</h1>
      <div
        className="body-inner-div-body"
        style={{ marginTop: -55, justifyContent: "flex-end" }}
      >
        <Link to={"/createorder/"}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#53b175" }}
          >
            Create New Order
          </Button>
        </Link>
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Box borderColor="text.primary" {...defaultProps}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginLeft: 10 }}>
                <p id="form-dialog-title" align="left">
                  <b>dhalmart.com</b>
                </p>

                <p style={{ marginTop: -15 }} align="left">
                  <b>Reg Name : </b> Dhalmart
                </p>
                <p style={{ marginTop: -10 }} align="left">
                  1180 MarquetteDr, Frisco, USA, TX - 75033
                </p>
                <p style={{ marginTop: -10 }} align="left">
                  <b>Ph : </b> 9876543423
                </p>

                <p style={{ marginTop: -10, marginBottom: 0 }}>
                  <b>Website : </b>https://www.dhalmart.com/
                </p>
              </div>
              <div>
                <img
                  src="https://dhalmart.s3.us-east-2.amazonaws.com/04204847.jpg"
                  style={{ height: 100 }}
                />
              </div>
            </div>

            <hr />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginLeft: 10 }}>
                <p style={{ marginTop: 10 }} align="left">
                  <b>Buyer : </b> {customerData.first_name}
                </p>
                <p style={{ marginTop: -10 }} align="left">
                  <b>Address : </b> {customerData.address1}
                </p>
                <p style={{ marginTop: -10 }} align="left">
                  <b>City : </b> {customerData.city}
                </p>
                <p style={{ marginTop: -10 }}>
                  <b>Ph : </b> {customerData.phone}
                </p>
                <p style={{ marginTop: -10 }} align="left"></p>
              </div>
              <div>
                <p>
                  <b>Order No : </b> {invoiceOrderNumber}
                </p>
                <p>
                  <b> Order Date : </b> {moment(date).format("MM-DD-YYYY")}
                </p>
              </div>
            </div>

            <td style={{ paddingLeft: 5 }}></td>
            <hr />
            <DialogContent
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div id="table">
                <b>
                  <p style={{ textAlign: "left" }}>Total Amount : {total}</p>
                </b>

                <div id="manage-invoice-table">
                  <div id="manage-table-header">
                    <div className="header-inner-div-header">
                      <p>S.No</p>
                    </div>
                    <div className="header-inner-div-header">
                      <p>Item Id</p>
                    </div>
                    <div className="header-inner-div-header">
                      <p>Item Rate</p>
                    </div>
                    <div className="header-inner-div-header">
                      <p>Quantity</p>
                    </div>

                    <div className="header-inner-div-header">
                      <p>Amount</p>
                    </div>
                  </div>
                  <div className="manage-table-body">
                    {object.map((item, i) => {
                      return (
                        <div className="manage-table-body-particular">
                          <div className="body-inner-div-body">
                            <p>{item.s_no}</p>
                          </div>
                          <div className="body-inner-div-body">
                            <p>{item.item_id}</p>
                          </div>
                          <div className="body-inner-div-body">
                            <p>{item.item_rate}</p>
                          </div>
                          <div className="body-inner-div-body">
                            <p>{item.quantity}</p>
                          </div>
                          <div className="body-inner-div-body">
                            <p>{item.item_amount}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose1}
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#53b175" }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </div>

      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(e) => {
              editStatus(e, orderNumberStatus, "Ordered");
              handleClose();
            }}
            value={Ordered}
          >
            Ordered
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            onClick={(e) => {
              editStatus(e, orderNumberStatus, "In - Progress");
              handleClose();
            }}
            value={InProgress}
          >
            In - Progress
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            onClick={(e) => {
              editStatus(e, orderNumberStatus, "Out For Delivery");
              handleClose();
            }}
            value={outForDelivery}
          >
            Out For Delivery
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            onClick={(e) => {
              editStatus(e, orderNumberStatus, "Delivered");
              handleClose();
            }}
            value={Delivered}
          >
            Delivered
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            onClick={(e) => {
              editStatus(e, orderNumberStatus, "Cancelled");
              handleClose();
            }}
            value={cancelled}
          >
            Cancelled
          </MenuItem>
        </Menu>
      </div>
      <div className="module-inner-div-manage">
        <Search
          style={{ width: 300, marginBottom: 20 }}
          placeholder="Enter the Order No or Cust Name"
          allowClear
          onChange={(e) => {
            search(e.target.value);
          }}
        />
        <Table
          dataSource={searchResults.length > 0 ? searchResults : data}
          // dataSource={data}
          columns={columns}
          pagination={{ pageSize: 20 }}
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};

export default Orders;
