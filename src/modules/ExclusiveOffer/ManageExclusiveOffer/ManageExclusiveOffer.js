import React, { useState, useEffect } from "react";
import "./ManageExclusiveOffer.css";
import { Popconfirm, message } from "antd";
import Axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
const ManageExclusiveOffer = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);

  const fetchData = () => {
    Axios.get("/exclusiveoffer/")
      .then((data) => {
        setData(data.data.data);
        console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  };

  function deleteExclusiveOffer(exclusive_offer_id) {
    Axios.delete("/exclusiveoffer/" + exclusive_offer_id)
      .then((data) => {
        message.success("ExclusiveOffer Deleted Successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="module-main-div">
      <h1 className="module-title">Exclusive Offer</h1>
      <div className="module-inner-div-manage">
        <div id="manage-table">
          <div id="manage-table-header">
            <div className="header-inner-div-header">
              <p>Id</p>
            </div>
            <div className="header-inner-div-header">
              <p>Image</p>
            </div>
            <div className="header-inner-div-header">
              <p>Product Name</p>
            </div>
            <div className="header-inner-div-header">
              <p>MSRP</p>
            </div>
            <div className="header-inner-div-header">
              <p>Price</p>
            </div>
            <div className="header-inner-div-header">
              <p>Edit</p>
            </div>
            <div className="header-inner-div-header">
              <p>Delete</p>
            </div>
          </div>
          <div className="manage-table-body">
            {data.map((item, i) => {
              return (
                <div className="manage-table-body-particular">
                  <div className="body-inner-div-body">
                    <p>{i + 1}</p>
                  </div>
                  <div className="body-inner-div-body">
                    <img
                      src={item.img_url_1}
                      alt={item.item_name}
                      id="manage-img"
                    />
                  </div>
                  <div className="body-inner-div-body">
                    <p>{item.item_name}</p>
                  </div>
                  <div className="body-inner-div-body">
                    <p>{item.msrp}</p>
                  </div>
                  <div className="body-inner-div-body">
                    <p>{item.price}</p>
                  </div>
                  <div className="body-inner-div-body">
                    <Link to={"editexclusiveoffer/" + item.exclusive_offer_id}>
                      <button id="edit-btn">Edit</button>
                    </Link>
                  </div>
                  <Popconfirm
                    title="Are you sure to delete this Product?"
                    onConfirm={() =>
                      deleteExclusiveOffer(item.exclusive_offer_id)
                    }
                    onCancel={null}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div className="body-inner-div-body">
                      <button id="delete-btn">Delete</button>
                    </div>
                  </Popconfirm>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageExclusiveOffer;
