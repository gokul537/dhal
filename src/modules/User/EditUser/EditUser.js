import React, { useState, useEffect } from "react";
import "../EditUser/EditUser.css";
import Axios from "axios";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import { useParams } from "react-router-dom";



const EditUser = () => {

  let { id } = useParams();

  useEffect(() => {
    fetchStateData();
    fetchZipData();
    fetchData();
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateData, setStateData] = useState([]);
  const [state, setState] = useState("");
  const [zipData, setZipData] = useState([]);
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
 
  
  const history = useHistory("");


  const fetchData = () => {
    try {
      Axios.get("/user/" + id)
        .then((data) => {
          console.log(data.data.data[0]);
          let d = data.data.data[0];
          setFirstName(d.first_name);
          setLastName(d.last_name);
          setAddress1(d.address1);
          setAddress2(d.address2);
          setCity(d.city);
          setState(d.state);
          setEmail(d.email);
          setPhone(d.phone);
          setZip(d.zip);

        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert("Network error");
    }
  };

  const save = (e) => {
    e.preventDefault();
    Axios.put("/user/Update/admin", {
      first_name: firstName,
      last_name: lastName,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      email: email,
      customer_id: id,
      

    })
      .then((data) => {
        console.log(data);
        message.success(data.data.message);
        fetchData();
      
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const fetchStateData = () => {
    Axios.get("/user/admin/state/list")
      .then((data) => {
        setStateData(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  };


  const fetchZipData = () => {
    Axios.get("/user/admin/zip/list")
      .then((data) => {
        setZipData(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

 

  return (
    <div className="module-main-div">
      <div id="module-title-div">
        <Link to={"/manageuser/"}>
          <ArrowLeftOutlined style={{ fontSize: "22px", color: "#000" }} />
        </Link>
        <h1 className="module-title">Edit User</h1>
      </div>

      <div className="module-inner-div">
        <form id="addProduct-form" onSubmit={(e) => save(e)}>
          <div
            style={{
              width: "100%",
              alignContent: "flex-start",
              marginLeft: -350,
            }}
          >
       
            <div>
              <Input
                autoFocus={true}
                label="First Name"
                required={true}
                value={firstName}
                type="none"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div style={{ marginTop: -101, marginLeft: 450, width: "100%" }}>
                <Input
                  label="Last Name"
                  value={lastName}
                  type="none"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Input
                label="Address 1"
                value={address1}
                type="none"
                onChange={(e) => setAddress1(e.target.value)}
              />
              <div style={{ marginTop: -101, marginLeft: 450, width: "100%" }}>
                <Input
                  label="Address 2"
                  value={address2}
                  type="none"
                  onChange={(e) => setAddress2(e.target.value)}
                />

              </div>
            </div>

            <div>
            <Input
                  label="City"
                  type="none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              <div style={{ marginTop: -87, marginLeft: 450, width: "100%" }}>

            <Dropdown
                data={stateData}
                label="State"
                value={state}
                onChange={(e) => {
                  setState(e);
                }}
              />
                 
              </div>
            </div>

            <div>
              <Input
                label="E-mail"
                required={true}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={{ marginTop: -101, marginLeft: 450, width: "100%" }}>
              <Dropdown
                data={zipData}
                value={zip}
                label="Zip"
                onChange={(e) => {
                  setZip(e);
                }}
              />
              </div>
            </div>

            <div>
              <Input
                label="Mobile"
                type="none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            
            </div>

          </div>

         

          <Button label="Update" />
        </form>
      </div>
    </div>
  );
};

export default EditUser;
