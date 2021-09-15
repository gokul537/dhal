import React, { useState, useEffect } from "react";
import { Popconfirm, message } from "antd";
import Axios from "axios";
import { Link } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { Table, Tag, Space, Input } from "antd";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const ManageUser = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("");
  const [editOpen, setEditOpen] = React.useState(false);
  const [editId, setEditId] = useState(0);
  const [editCustomerId, setEditCustomerId] = useState(0);
  const [status, setStatus] = useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const { Search } = Input;

  const search = (keyword) => {
    let innerSearchResult = [];
    let searchData = data;
    searchData.map((d) => {
      d.first_name = d.first_name.toLowerCase();
      d.phone = d.phone.toLowerCase();
      if (
        d.first_name.includes(keyword.toLowerCase()) ||
        d.phone.includes(keyword.toLowerCase())
      ) {
        innerSearchResult.push(d);
      }
    });
    setSearchResults(innerSearchResult);
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
      Axios.get("/user/password/reset/" + id)
        .then((data) => {
          console.log(data.data.data[0]);
          let d = data.data.data[0];
          setPassword(d.password);
          setEditCustomerId(d.customer_id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert("Network error");
    }
  };

  const fetchData = () => {
    Axios.get("/user/customer/customerList/")
      .then((data) => {
        setData(data.data);

        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

  const update = () => {
    Axios.put("/user/reset", {
      password: password,
      customer_id: data.customer_id,
    })
      .then((data) => {
        alert("Password Updated Successfully");
        handleEditClose();
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const disable = () => {
    Axios.put("/user/disable", {
      status: "Deactive",
      customer_id: editId,
    })
      .then((data) => {
        alert("User Disabled");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function deleteCustomer(customer_id) {
    Axios.delete("/user/admin/delete/" + customer_id)
      .then((data) => {
        message.success("Customer Deleted Successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  }
  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
      key: "customer_id",
    },

    {
      title: "Customer Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Mobile",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (i, data) => (
        <Space size="middle">
          <Link
            align="center"
            onClick={() => {
              handleClickEditOpen(data.customer_id);
              setEditId(data.customer_id);
            }}
          >
            <EditFilled style={{ color: "black" }} />
          </Link>
          <Popconfirm
            title="Are you sure to disable this User?"
            onConfirm={() => {
              disable(data.customer_id);
              setEditId(data.customer_id);
            }}
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
      title: "Edit / Delete",
      key: "delete",
      render: (i, data) => (
        <Space size="middle">
          <Link to={"edituser/" + data.customer_id}>
            <EditFilled style={{ color: "black" }} />
          </Link>

          <Popconfirm
            title="Are you sure to Delete this User?"
            onConfirm={() => {
              deleteCustomer(data.customer_id);
            }}
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
      <h1 className="module-title">Customers</h1>
      <div
        className="body-inner-div-body"
        style={{ marginTop: -55, justifyContent: "flex-end" }}
      >
        <Link to={"/adduser/"}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#53b175" }}
          >
            Add
          </Button>
        </Link>
      </div>
      <div>
        <Dialog open={editOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update User Password</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                update();
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
      <div className="module-inner-div-manage">
        <Search
          style={{ width: 300, marginBottom: 20 }}
          placeholder="Enter the Name or Phone..."
          allowClear
          onChange={(e) => {
            search(e.target.value);
          }}
        />
        <Table
          dataSource={searchResults.length > 0 ? searchResults : data}
          columns={columns}
          pagination={{ pageSize: 20 }}
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};

export default ManageUser;
