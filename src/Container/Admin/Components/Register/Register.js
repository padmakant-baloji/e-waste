import React, { useState, useEffect } from "react";
import { Button, Grid, InputLabel, Select, TextField } from "@material-ui/core";
import "../../../../Assets/scss/common.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = ({ history }) => {
  const [register, setRegister] = useState({ isAdmin: "" });
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
    <div className="box">
      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField
            id="name"
            fullWidth
            label="Name"
            onChange={handleInput}
            value={register.name}
          />
          <p className="error">{error.name}</p>
        </Grid>
        <Grid item md={6}>
          <TextField
            id="email"
            fullWidth
            label="Email"
            onChange={handleInput}
            value={register.email}
            type="email"
          />
          <p className="error">{error.email}</p>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField
            id="mobile"
            fullWidth
            label="Mobile"
            onChange={handleInput}
            value={register.mobile}
            type="number"
          />
          <p className="error">{error.mobile}</p>
        </Grid>

        <Grid item md={6}>
          <TextField
            id="password"
            fullWidth
            label="Password"
            onChange={handleInput}
            value={register.password}
            type="password"
          />
          <p className="error">{error.password}</p>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField
            id="cPassword"
            fullWidth
            label="Confirm Password"
            onChange={handleInput}
            value={register.cPassword}
            type="password"
          />
          <p className="error">{error.cPassword}</p>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <InputLabel htmlFor="age-native-simple">Select user role</InputLabel>
          <Select
            id="isAdmin"
            fullWidth
            native
            value={register.isAdmin}
            onChange={handleInput}
          >
            <option aria-label="Select user role" value="Select user role" />
            <option value="">Please select</option>
            <option value={true}>Admin</option>
            <option value={false}>User</option>
          </Select>
        </Grid>
      </Grid>

      <Grid container spacing={3} className="divider-top">
        <Grid item md={6}>
          <Button
            className="btn"
            onClick={handleRegister}
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Register);
