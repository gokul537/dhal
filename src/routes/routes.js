import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import AddCategory from "../modules/Category/AddCategory/AddCategory";
import ManageCategory from "../modules/Category/ManageCategory/ManageCategory";
import EditCategory from "./../modules/Category/EditCategory/EditCategory";
import AddProduct from "../modules/Product/AddProduct/AddProduct";
import ManageProduct from "../modules/Product/ManageProduct/ManageProduct";
import AddBrand from "../modules/Brand/AddBrand/AddBrand";
import EditBrand from "./../modules/Brand/EditBrand/EditBrand";
import ManageBrand from "../modules/Brand/ManageBrand/ManageBrand";
import AddExclusiveOffer from "../modules/ExclusiveOffer/AddExclusiveOffer/AddExclusiveOffer";
import ManageExclusiveOffer from "../modules/ExclusiveOffer/ManageExclusiveOffer/ManageExclusiveOffer";
import Login from "../Screens/login/Login";
import Orders from "../modules/Orders/Orders";
import Orderdetail from "../modules/Orders/Orderdetail/Orderdetail";
import EditProfile from "../modules/Product/EditProduct/EditProduct";
import EditExclusiveOffer from "../modules/ExclusiveOffer/EditExclusiveOffer/EditExclusiveOffer";
import Banner from "../modules/Banner/Banner";
import ManageUser from "../modules/User/ManageUser/ManageUser";
import Dashbord from "../modules/Dashbord/Dashbord";
import ManageCoupon from "../modules/Coupon/ManageCoupon/ManageCoupon";
import CreateOrder from "../modules/Orders/CreateOrder/CreateOrder";
import EditOrder from "../modules/Orders/EditOrder/EditOrder";
import AddUser from "../modules/User/AddUser/AddUser";
import EditUser from "../modules/User/EditUser/EditUser";

const Home = () => {
  return (
    <div>
      <h3>Home</h3>
    </div>
  );
};

const AuthRoute = () => {
  return (
    <Router>
      <Switch>
        <SideBar>
          <Route exact path="/home" component={Home} />
          <Route exact path="/addproduct" component={AddProduct} />
          <Route exact path="/editproduct/:id" component={EditProfile} />
          <Route exact path="/manageproduct" component={ManageProduct} />
          <Route exact path="/addcategory" component={AddCategory} />
          <Route exact path="/managecategory" component={ManageCategory} />
          <Route exact path="/editcategory/:id" component={EditCategory} />
          <Route exact path="/addbrand" component={AddBrand} />
          <Route exact path="/editbrand/:id" component={EditBrand} />
          <Route exact path="/managebrand" component={ManageBrand} />
          <Route
            exact
            path="/editexclusiveoffer/:id"
            component={EditExclusiveOffer}
          />
          <Route
            exact
            path="/addexclusiveoffer"
            component={AddExclusiveOffer}
          />
          <Route
            exact
            path="/manageexclusiveoffer"
            component={ManageExclusiveOffer}
          />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/orderdetail/:id" component={Orderdetail} />
          <Route exact path="/banner" component={Banner} />
          <Route exact path="/manageuser" component={ManageUser} />
          <Route exact path="/dashbord" component={Dashbord} />
          <Route exact path="/managecoupon" component={ManageCoupon} />
          <Route exact path="/createorder" component={CreateOrder} />
          <Route exact path="/editorder/:id" component={EditOrder} />
          <Route exact path="/adduser" component={AddUser} />
          <Route exact path="/editUser/:id" component={EditUser} />

        </SideBar>
      </Switch>
    </Router>
  );
};

const UnAuthRoute = () => {
  return (
    <Router>
      <Redirect to="/" />
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default function Routes() {
  const [authentication, setAuthentication] = useState(false);

  useEffect(() => {
    let data = null;
    data = window.localStorage.getItem("isLogged");
    if (data == "true") {
      setAuthentication(true);
    }
  }, []);

  return authentication ? <AuthRoute /> : <UnAuthRoute />;
}
