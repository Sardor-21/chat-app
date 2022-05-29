import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./register.scss";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import api from "../../api/register-login";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const handleOnchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { username, email, password, confirmPassword } = data;
    if (!username) {
      toast.error("Must have a username");
      return false;
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return false;
    }
    if (!email) {
      toast.error("Must have a email");
      return false;
    }
    if (!password) {
      toast.error("Must have a password");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same");
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      api.register(data, setData, navigate, toast);
    }
  };
  useEffect(() => {
    // if (JSON.parse(localStorage.getItem("user"))) {
    //   navigate("/");
    // }
  }, []);
  return (
    <div className="page-warpper">
      <form className="form" onSubmit={onSubmit}>
        <h2 className="title">CREATE ACCOUNT</h2>
        <div className="form-group">
          <input
            type="text"
            name="username"
            id="username"
            className="form-input"
            placeholder="Username"
            value={data.username || ""}
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="Email"
            value={data.email || ""}
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <div className="form-group password">
          {passwordType === "text" ? (
            <BsEye
              className="eye-icon"
              onClick={() => setPasswordType("password")}
            />
          ) : (
            <BsEyeSlash
              className="eye-icon"
              onClick={() => setPasswordType("text")}
            />
          )}

          <input
            type={passwordType}
            name="password"
            id="password"
            className="form-input"
            placeholder="Password"
            value={data.password || ""}
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type={passwordType}
            name="confirmPassword"
            id="confirmPassword"
            className="form-input"
            placeholder="Confirm password"
            value={data.confirmPassword || ""}
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Register
        </button>
        <p className="text-center mb-0">
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
