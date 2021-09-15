import React, { useState, useEffect } from "react";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { Row, Col } from "antd";
import styles from "./CreateOrder.module.css";
import { DeleteFilled } from "@ant-design/icons";
import { Table,  Space } from "antd";



const CreateOrder = () => {

  useEffect(() => {
    fetchCustomerData();
    fetchCategoryData();
    orderNumberGenerate();
  }, []);


  const [price, setPrice] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState("");
  const [brandData, setBrandData] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [customer, setCustomer] = useState("");
  const [itemData, setItemData] = useState([]);
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [image, setImage] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [loading, setLoading] = React.useState(true);
  const [OrderNo, setOrderNo] = useState('');
  const [NumGenerate, setNumGenerate] = useState('');
  const [lastId, setLastId] = useState('');

  const history = useHistory("");


  const fetchCartData = (customer) => {
    Axios.get(`/orders/addtocart/${customer}`)
      .then((data) => {
        // console.log("Cart", data.data.data);
        setData(data.data.data);
        setLoading(false);  
      })
      .catch((err) => console.log(err));
  };

  


  const fetchCartData1 = (customer) => {
    Axios.get(`/orders/admin/addtocart/${customer}`)
    .then((data) => {
        console.log("Cart table", data.data.data1);
        setData1(data.data.data1);
        setLoading(false);  
      })
      .catch((err) => console.log(err));
  };
  
  const fetchCustomerData = () => {
    Axios.get("/user/admin/list")
      .then((data) => {
        //   console.log(data.data.data);
        setCustomerData(data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchCategoryData = () => {
    Axios.get("/category/product")
      .then((data) => {
        // console.log("Category", data.data);
        setCategoryData(data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchbrandData = (id) => {
    Axios.get(`/brand/category/brand/${id}`)
      .then((data) => {
        // console.log("Brand", data.data);
        setBrandData(data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchItemData= (brandId) => {
    Axios.get(`/product/admin/product/list/${brandId}`)
      .then((data) => {
        // console.log("item", data.data);
         setItemData(data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchItemDetails= (item) => {
    Axios.get(`/product//v1/catalog/items/${item}`)
      .then((data) => {
        // console.log("itemDetails", data.data.data[0].price);
         setPrice(data.data.data[0].price)
         setImage(data.data.data[0].img_url_1)
         setItemName(data.data.data[0].item_name)
         setItemDesc(data.data.data[0].item_desc)
      })
      .catch((err) => console.log(err));
  };




  const save = (e) => {
    // e.preventDefault();
    Axios.post("/orders/addtocart/", {
        customerId: customer,
        item_name: itemName,
        item_desc: itemDesc,
        count: quantity,
        price: price,
        image:image
    })
      .then((data) => {
        message.success(data.data.message);
        setCategory("");
        setBrandId("");
        setItem("");
        setPrice("");
        setQuantity("");
        setTotalPrice("");
        fetchCartData(customer);
        fetchCartData1(customer);
        fetchTotalData(customer);

      })
      .catch((err) => alert("Something went wrong"));
  };

  const orderNumberGenerate = () => {
    Axios.get('/orders/ordernumgenerate').then((res) => {
      setOrderNo(res.data.num_generate_details[0].OrderNo);
      setNumGenerate(res.data.num_generate_details[0].Id);
    });
  };

  const [totalData, setTotalData] = useState({});
  var numeral = require("numeral");


  const fetchTotalData = (customer) => {
    Axios
      .get('/orders/sumTotal/' + customer)
      .then((data) => {
        setTotalData(data.data.data[0]);
      })
      .catch((err) => console.log(err));
    console.log(totalData);
  };
  let cartTotal= numeral(totalData.total_amount).format("$0,0.00");

  const deleteCartItem = (cart_id) => {
      // alert(cart_id)
    Axios
      .get("/orders/cartDelete/" + cart_id)

      .then((data) => {
        if (data.data.status == 1) {
            message.success('Product Deleted Successfully');
            fetchCartData(customer);
            fetchCartData1(customer);
            fetchTotalData(customer);
        }
      })
      .catch((err) => console.log(err));
  };

  const confirmorder = () => {
    Axios
      .post('/orders/', {
        order_number: OrderNo,
        customer_id: customer,
        total_discount_amount: 1,
        total_tax_amount: 1,
        total_amount: totalData.total_amount,
        crte_by: customer,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.status === 200) {
            insertOrderDetail(result.data.lastId);
            setLastId(result.data.lastId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertOrderDetail = (lastId) => {
    data.map((d) => {
      let item_discount = 10;
      let item_discount_amount = 10;
      let item_amount = d.rate * d.quantity;
      let item_sale_amount = item_amount + d.tax_amount - item_discount_amount;
      Axios
        .post('/orders/createorderdetails', {
          order_id: lastId,
          item_id: d.item_id,
          item_rate: d.rate,
          quantity: d.quantity,
          image_url: d.image_url,
          item_amount: item_amount,
          item_tax_amount: d.tax_amount,
          item_discount: item_discount,
          item_discount_amount: item_discount_amount,
          item_sale_amount: item_sale_amount,
          item_sale_amount: item_sale_amount,
          crte_by: customer,
          order_number: OrderNo,
        })
        .then((result) => {
          console.log(result);
          fetchCartData(customer);
          fetchCartData1(customer);
          if (result.data.status === 200) {
            message.success("Order Created")

        }
          
        })
        .catch((err) => console.log(err));
    });

  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
      key: "s_no",
    },

    {
      title: "Product Name",
      dataIndex: "item_id",
      key: "item_id",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Action",
      key: "action",
      render: (i, data1) => (
        <Space size="middle">

          <Popconfirm
            title="Are you sure to delete this Cart Item?"
            onConfirm={() => deleteCartItem(data1.cart_id)}
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
      <h1 className="module-title">Create Order</h1>
      <div className="module-inner-div" className={styles.addProductForm} >
        {/* <form className={styles.addProductForm} onSubmit={(e) => confirmorder(e)}> */}
          <div>
          
            <Row style={{ width: "100%" }}>
            <Col lg={12}>
              <Dropdown
              data={customerData}
                label="Customer"
                value={customer}
                onChange={(e) => {
                  setCustomer(e);
                  fetchCartData(e);
                  fetchCartData1(e);
                  fetchTotalData(e);
                }}
              />
            </Col>


            </Row>
          </div>
          <Row style={{ width: "100%" }}>
            <Col lg={8}>
              <Dropdown
                data={CategoryData}
                label="Category"
                value={category}
                onChange={(e) => {
                  setCategory(e);
                  fetchbrandData(e);
                }}
              />
            </Col>
            <Col lg={8}>
              <Dropdown
                data={brandData}
                label="Brand"
                value={brandId}
                onChange={(e) => {
                  setBrandId(e);
                  fetchItemData(e);

                }}
              />
            </Col>
            <Col lg={8}>
              <Dropdown
                data={itemData}
                label="Product"
                value={item}
                onChange={(e) => {
                  setItem(e);
                  fetchItemDetails(e);
                }}
              />
            </Col>
          </Row>

          <Row style={{ width: "100%" }}>
       
            <Col lg={8}>
              <Input
                value={price}
                label="Rate"
                type="none"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
            <Col lg={8}>
              <Input
                value={quantity}
                label="Quantity"
                type="none"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Col>
            <Col lg={8}>
              <Input
                value={quantity * price}
                label="Price"
                type="none"
                onChange={(e) => setTotalPrice(e.target.value)}
              />
            </Col>
          </Row>

<div style={{textAlign:"center"}}            
 onClick={() => { save(); }} >
          <Button label="Add To Cart" />
          </div>


        {loading ? (
              <p>Loading...</p>
            ) : (
          <div className="module-inner-div-manage">
            <p>Cart Total : {cartTotal}</p>
        <Table
          dataSource={data1}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ y: 400 }}
        />
      </div>
            )}


          <Row lg={24} justify="center" style={{ marginTop: 50 }}>
            <Link to={"/orders"}>
              <Button label="Cancel" />
            </Link>
            <Button  
            onClick={() => { confirmorder(); }}        
            label="Save" />
          </Row>
        {/* </form> */}

      </div>
    </div>
  );
};

export default CreateOrder;
