import { Grid, TextField } from "@material-ui/core";
import React from "react";
import "../../Assets/scss/common.scss";

const AddressForm = ({ form, handleChange }) => {
  return (
    <div className="center divider-top">
      <div className="wrapper">
        <div className="heading">
          <h2>Address Information</h2>
        </div>
        <div className="box">
          <Grid className="divider-bottom" container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                id="firstName"
                label="First Name"
                value={form.firstName}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                value={form.lastName}
                required
                id="lastName"
                label="Last Name"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid className="divider-bottom" container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="addressLine1"
                label="Address Line 1"
                value={form.addressLine1}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid className="divider-bottom" container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="addressLine2"
                label="Address Line 2"
                fullWidth
                onChange={handleChange}
                value={form.addressLine2}
              />
            </Grid>
          </Grid>
          <Grid className="divider-bottom" container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                id="state"
                label="State"
                value={form.state}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                value={form.city}
                required
                id="city"
                label="City"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid className="divider-bottom" container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                id="pincode"
                label="Pincode"
                value={form.pincode}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
