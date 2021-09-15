import React from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";

const Login = ({ setAuthentication }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Axios.get(`/admin/${data.email}/email/${data.password}/password/`)
      .then((res) => {
        if (res.data.message === "Invalid E-Mail")
          return message.warn("Invalid E-Mail");
        if (res.data.message === "Invalid Password")
          return message.warn("Invalid Password");

        <Link to="/dashbord" />;
        window.location.reload();
        localStorage.setItem("isLogged", true);
      })

      .catch((e) => console.log(e));
  };

  return (
    <div id="login-main-div">
      <p id="login-title">Dhalmart Admin</p>
      <form onSubmit={handleSubmit(onSubmit)} id="login-sub-div">
        <p className="login-label">Email</p>
        <input
          ref={register({
            required: true,
          })}
          name="email"
        ></input>
        {errors.email && <p id="valid-wrong-text">This field is required</p>}
        <p className="login-label">Password</p>
        <input
          name="password"
          ref={register({ required: true, maxLength: 10 })}
        />
        {errors.password && <p id="valid-wrong-text">This field is required</p>}
        <button id="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
