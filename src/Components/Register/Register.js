import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import "./Register.scss";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = ({ history }) => {
  const [register, setRegister] = useState({ isAdmin: false });
  const [error, setError] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5001/users")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const handleInput = (e) => {
    setRegister({
      ...register,
      [e.target.id]: e.target.value,
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (!register.name) {
      setError({
        name: "Name should not be empty",
      });
    } else if (!register.email) {
      setError({
        email: "Email should not be empty",
      });
    } else if (!register.mobile) {
      setError({
        mobile: "Mobile should not be empty",
      });
    } else if (register.mobile.length !== 10) {
      setError({
        mobile: "Mobile number should be 10 digits",
      });
    } else if (!register.password) {
      setError({
        password: "Password should not be empty",
      });
    } else if (
      !register.cPassword ||
      register.password !== register.cPassword
    ) {
      setError({
        cPassword: "Password does not match",
      });
    } else {
      const config = {
        method: "post",
        url: "http://localhost:5001/users",
        headers: {
          "Content-Type": "application/json",
        },
        data: register,
      };

      axios(config)
        .then(function (response) {
          toast.success("Registration successful");
          history.push("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div className="register-container">
      <div className="register-page">
        <h1>Please Register</h1>
        <div className="form">
          <div className="input-control">
            <TextField
              id="name"
              fullWidth
              label="Name"
              onChange={handleInput}
              value={register.name}
            />
            <p className="error">{error.name}</p>
          </div>
          <div className="input-control">
            <TextField
              id="email"
              fullWidth
              label="Email"
              onChange={handleInput}
              value={register.email}
              type="email"
            />
            <p className="error">{error.email}</p>
          </div>
          <div className="input-control">
            <TextField
              id="mobile"
              fullWidth
              label="Mobile"
              onChange={handleInput}
              value={register.mobile}
              type="number"
            />
            <p className="error">{error.mobile}</p>
          </div>
          <div className="input-control">
            <TextField
              id="password"
              fullWidth
              label="Password"
              onChange={handleInput}
              value={register.password}
              type="password"
            />
            <p className="error">{error.password}</p>
          </div>
          <div className="input-control">
            <TextField
              id="cPassword"
              fullWidth
              label="Confirm Password"
              onChange={handleInput}
              value={register.cPassword}
              type="password"
            />
            <p className="error">{error.cPassword}</p>
          </div>
          <div className="btn-container">
            <Button
              className="btn"
              onClick={handleRegister}
              variant="contained"
              color="primary"
            >
              Register
            </Button>
            <div className="register-text">
              {" "}
              Already Have Account <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
