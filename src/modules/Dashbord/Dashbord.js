import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Dashbord/Dashbord.css";
import {
  BsFillBagFill,
  BsFillLayersFill,
  BsFillInboxesFill,
  BsPeopleFill,
} from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Link, Redirect } from "react-router-dom";

const Dashbord = () => {
  useEffect(() => {
    fetchData();
    fetchcategoryData();
    fetchorderData();
    fetchcustomerData();
  }, []);
  const [data, setData] = useState([]);
  const [category, setcategory] = useState([]);
  const [orders, setorders] = useState([]);
  const [user, setuser] = useState([]);

  const fetchData = () => {
    Axios.get("/dashboard/productCount/")
      .then((data) => {
        setData(data.data.data[0]);
        console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchcategoryData = () => {
    Axios.get("/dashboard/category/")
      .then((data) => {
        setcategory(data.data.data[0]);
        console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchorderData = () => {
    Axios.get("/dashboard/orders/")
      .then((data) => {
        setorders(data.data.data[0]);
        console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchcustomerData = () => {
    Axios.get("/dashboard/customer/")
      .then((data) => {
        setuser(data.data.data[0]);
        console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Dashbord-topnav">
      {/* {data.map((item) => {})} */}
      <Link to={"manageproduct"}>
        <IconContext.Provider value={{ size: "3rem", color: "red" }}>
          <div className="card">
            <h3 id="product">Total Product</h3>
            <h2>{data.product_count}</h2>

            <BsFillBagFill />
          </div>
        </IconContext.Provider>
      </Link>

      <Link to={"managecategory"}>
        <IconContext.Provider value={{ size: "3rem", color: "orange" }}>
          <div className="card">
            <h3 id="product">Total Category</h3>
            <h2>{category.category}</h2>

            <BsFillLayersFill />
          </div>
        </IconContext.Provider>
      </Link>

      <Link to={"orders"}>
        <IconContext.Provider value={{ size: "3rem", color: "Green" }}>
          <div className="card">
            <h3 id="product">Total Orders</h3>
            <h2>{orders.orders}</h2>

            <BsFillInboxesFill />
          </div>
        </IconContext.Provider>
      </Link>

      <Link to={"manageuser"}>
        <IconContext.Provider value={{ size: "3rem", color: "#ffb380" }}>
          <div className="card">
            <h3 id="product">Total Customers</h3>
            <h2>{user.customer}</h2>

            <BsPeopleFill />
          </div>
        </IconContext.Provider>
      </Link>
      <br />
    </div>
  );
};
export default Dashbord;
