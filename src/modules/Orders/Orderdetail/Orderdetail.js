import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

function Orderdetail() {
  let { id } = useParams();

  useEffect(() => {
    fetchData();
    fetchSumData();
  }, []);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const fetchData = () => {
    Axios.get("/orders/orderDetail/" + id)
      .then((data) => {
        setData(data.data.data);
        setOrderNumber(data.data.data[0].order_number);
        // console.log(data.data.data[0].order_number);
      })
      .catch((err) => console.log(err));
  };

  const fetchSumData = () => {
    Axios.get("/orders/sum/orderDetail/" + id)
      .then((data) => {
        setTotal(data.data.data[0].item_sale_amount);
        // console.log(data.data.data[0].item_sale_amount);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="module-main-div">
      <h1 className="module-title">Order Detail</h1>
      <div className="module-inner-div-manage">
        <b>
          <p style={{ textAlign: "left" }}>
            Order No : {orderNumber}
            <p style={{ textAlign: "left" }}>Total Amount : {total}</p>
          </p>
        </b>

        <div id="manage-table">
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
            {data.map((item, i) => {
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
    </div>
  );
}
export default Orderdetail;
