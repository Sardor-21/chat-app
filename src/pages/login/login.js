import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/register-login";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [passwordType, setPasswordType] = useState("password");

  const handleOnchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { email, password } = data;

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
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      api.login(data, setData, navigate, toast);
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="page-warpper">
      <form className="form" onSubmit={onSubmit}>
        <h2 className="title">Sign In</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="Email"
            value={data.email || ""}
            onChange={handleOnchange}
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
            onChange={handleOnchange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>
        <p className="text-center mb-0">
          Do not have an account? <Link to={"/register"}>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
