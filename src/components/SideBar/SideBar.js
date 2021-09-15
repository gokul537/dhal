import React from "react";
import { Layout, Menu, Row } from "antd";
import "./SideBar.css";
import { Link, Redirect } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import Button from "../Button/Button";

const { SubMenu } = Menu;

const { Header, Footer, Sider, Content } = Layout;

const SideBar = ({ children, props }) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header id="header">
        <Row id="row">
          <img
            src="https://dhalmart.s3.us-east-2.amazonaws.com/3661027.jpg"
            style={{ height: 60, width: 60, marginTop:20}}
          />
          <div>
            <img
              src="https://dhalmart.s3.us-east-2.amazonaws.com/04204847.jpg"
              style={{ height: 100 }}
            />
          </div>
          <Link
            onClick={() => {
              window.location.reload();
              window.localStorage.setItem("isLogged", false);
            }}
          >
            <p style={{marginTop:20}}>Log-Out</p>
          </Link>
        </Row>
      </Header>
      <Layout>
        <Sider id="slider">
          <Menu mode="inline" style={{ width: 200 }}>
            <Menu.Item>
              <Link to="/dashbord" />
              Dashboard
            </Menu.Item>
            {/* <SubMenu key="sub1" title="Category">
              <Menu.Item key="1">
                <Link to="/addcategory" />
                Add Category
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/managecategory" />
                Manage Category
              </Menu.Item>
            </SubMenu> */}
            <Menu.Item>
              <Link to="/manageuser" />
              Customers
            </Menu.Item>

            <Menu.Item>
              <Link to="/managecategory" />
              Category
            </Menu.Item>
            {/* <SubMenu key="sub2" title="Brand">
              <Menu.Item key="3">
                <Link to="/addbrand" />
                Add Brand
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/managebrand" />
                Manage Brand
              </Menu.Item>
            </SubMenu> */}
            <Menu.Item>
              <Link to="/managebrand" />
              Brand
            </Menu.Item>
            {/* <SubMenu key="sub3" title="Product">
              <Menu.Item key="5">
                <Link to="/addproduct" />
                Add Product
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/manageproduct" />
                Manage Product
              </Menu.Item>
            </SubMenu> */}
            <Menu.Item>
              <Link to="/manageproduct" />
              Product
            </Menu.Item>

            {/* <SubMenu key="sub4" title="Exclusive Offers">
              <Menu.Item key="7">
                <Link to="/addexclusiveoffer" />
                Add Offers
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/manageexclusiveoffer" />
                Manage Offers
              </Menu.Item>
            </SubMenu> */}
          <Menu.Item>
              <Link to="/managecoupon" />
              Coupon
            </Menu.Item>
            <Menu.Item>
              <Link to="/orders" />
              Orders
            </Menu.Item>
            <Menu.Item>
              <Link to="/banner" />
              Banner
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ backgroundColor: "#f4f5f7" }}>
          <Content id="side-bar-content">{children}</Content>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
