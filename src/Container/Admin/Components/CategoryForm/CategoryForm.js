import { Chip, Grid, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { get } from "lodash";
import React from "react";
import "../../../../Assets/scss/common.scss";

const CategoryForm = ({
  form,
  handleFormChange,
  handleSubCategories,
  handleAddCategories,
}) => {
  return (
    <div className="box">
      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField
            id="categoryName"
            label="Category Name"
            value={form.categoryName}
            onChange={handleFormChange}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            id="subCategory"
            label="Add Subcategories"
            value={form.subCategory}
            onChange={handleFormChange}
            fullWidth
            onKeyUp={handleSubCategories}
          />
          <div className="sub-category">
            {get(form, "subCategories", []).map((x) => (
              <Chip label={x.name} />
            ))}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Button
            onClick={handleAddCategories}
            variant="contained"
            color="primary"
          >
            Add category
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default CategoryForm;
