import React from "react";
import { Grid, TextField } from "@material-ui/core";
import "../../Assets/scss/common.scss";

const Form1 = ({ handleAutoComplete, form, handleChange, source }) => {
  return (
    <div className="center">
      <div className="wrapper">
        <div className="heading">
          <h2>Company Information</h2>
        </div>
        <div className="box">
          <div className="form-container">
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                {source === "company" && (
                  <TextField
                    required
                    id="companyName"
                    label="Company Name"
                    value={form.companyName}
                    fullWidth
                    onChange={handleChange}
                  />
                )}
                {source === "individual" && (
                  <TextField
                    required
                    id="personName"
                    label="Name"
                    value={form.personName}
                    fullWidth
                    onChange={handleChange}
                  />
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  value={form.mobile}
                  required
                  id="mobile"
                  label="Mobile Number"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            {/* <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  id="category"
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  value={get(form, "category.name")}
                  onChange={(event, newValue) => {
                    handleAutoComplete("category", newValue);
                  }}
                  inputValue={form.categoryInput}
                  onInputChange={(event, newInputValue) => {
                    handleAutoComplete("categoryInput", newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      id="categoryInput"
                      {...params}
                      label="Category"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  id="subCategory"
                  options={get(form, "category.subCategories") || []}
                  getOptionLabel={(option) => option.name}
                  value={get(form, "subCategory.name")}
                  onChange={(event, newValue) => {
                    handleAutoComplete("subCategory", newValue);
                  }}
                  disabled={!get(form, "category.name")}
                  inputValue={form.subCategoryInput}
                  onInputChange={(event, newInputValue) => {
                    handleAutoComplete("subCategoryInput", newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Sub Category" fullWidth />
                  )}
                />
              </Grid>
            </Grid> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form1;
