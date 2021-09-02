import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get } from "lodash";
import categories from "../../config/categories.json";
import "../../Assets/scss/common.scss";
import axios from "axios";
import { toast } from "react-toastify";

const WasteForm = ({
  handleAutoComplete,
  form,
  handleChange,
  handleFile,
  handleNext,
}) => {
  const [categories, setCategories] = useState({});
  useEffect(() => {
    const config = {
      method: "get",
      url: "http://localhost:5001/categories",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((data) => {
        if (data?.data?.status === 200) {
          setCategories(data?.data?.result);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong while fetching the categories");
      });
  }, []);
  return (
    <div className="center divider-top">
      <div className="wrapper">
        <div className="heading">
          <h2>E-Waste Information</h2>
        </div>
        <div className="box">
          <div className="form-container">
            {/* <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  id="companyName"
                  label="Company Name"
                  value={form.companyName}
                  fullWidth
                  onChange={handleChange}
                />
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
            </Grid> */}
            <Grid container className="divider-bottom" spacing={3}>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  id="category"
                  options={categories}
                  getOptionLabel={(option) => option.categoryName}
                  value={get(form, "category.categoryName")}
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
                  disabled={!get(form, "category.categoryName")}
                  inputValue={form.subCategoryInput}
                  onInputChange={(event, newInputValue) => {
                    handleAutoComplete("subCategoryInput", newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Sub Category" fullWidth />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={6} className="">
                <div className="divider-bottom">
                  <Button variant="contained" color="primary" component="label">
                    Upload File
                    <input
                      onChange={handleFile}
                      onClick={(e) => {
                        e.target.value = null;
                      }}
                      type="file"
                      hidden
                      accept="image/*"
                    />
                  </Button>
                </div>
                {form.image && <img src={form.image} alt="" />}
              </Grid>
              <Grid item md={6} className="">
                <Button
                  variant="contained"
                  onClick={() => handleNext("company")}
                  color="primary"
                >
                  Submit Request
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WasteForm;
