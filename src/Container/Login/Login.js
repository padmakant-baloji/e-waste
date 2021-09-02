import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./Login.scss";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ history }) => {
  const hasLoginToken = localStorage.getItem("token") || false;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLogin, setIsLogin] = useState(hasLoginToken);

  const handleUsername = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validate = () => {
    if (username && password) {
      if (validateEmail(username)) {
        setError({});
        return true;
      } else {
        setError({ username: "Please Enter Valid Username" });
        return false;
      }
    } else {
      if (!username) {
        setError({ username: "Please enter Username" });
      } else if (!password) {
        setError({ password: "Please enter Password" });
      }
    }
  };

  const handleLogin = () => {
    if (validate()) {
      const config = {
        method: "post",
        url: "http://localhost:5001/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: { username, password },
      };

      axios(config)
        .then((response) => {
          console.log("🚀 ~ file: Login.js ~ line 60 ~ response", response);
          if (response?.data?.status === 200) {
            localStorage.setItem("token", JSON.stringify(response?.data?.id));
            localStorage.setItem("user", JSON.stringify(response?.data));
            setTimeout(() => {
              console.log(history);
              if (response?.data?.isAdmin) {
                history.push("/admin");
              } else {
                history.push("/");
              }
            }, 500);
          } else {
            toast.error("Please check your credentials");
          }
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    }
  };

  if (isLogin) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="login-container">
      <div className="login-page">
        <h1>Please Login</h1>

        <div className="form">
          <div className="input-control">
            <TextField
              id="standard-basic"
              fullWidth
              label="Username"
              onChange={handleUsername}
              value={username}
            />
            <p className="error">{error.username}</p>
          </div>
          <div className="input-control">
            <TextField
              id="standard-basic"
              fullWidth
              label="Password"
              onChange={handlePassword}
              value={password}
              type="password"
            />
            <p className="error">{error.password}</p>
          </div>
          <div className="btn-container">
            <Button
              className="btn"
              onClick={handleLogin}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <div className="register-text">
              {" "}
              Don't Have Account <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
