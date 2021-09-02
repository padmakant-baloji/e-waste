import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import CategoryForm from "./Components/CategoryForm/CategoryForm";
import "./Admin.scss";
import { Redirect, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Register from "./Components/Register/Register";

const Admin = ({ history }) => {
  const [id, setId] = useState(0);
  const [category, setCategory] = useState({
    subCategories: [],
  });

  const handleSubCategories = (e) => {
    if (e.target.id === "subCategory") {
      if (e.key === "Enter") {
        setCategory({
          ...category,
          subCategories: [
            ...category.subCategories,
            { name: category.subCategory, id: uuidv4() },
          ],
          subCategory: "",
        });
      }
      return;
    }
  };

  const handleAddCategories = () => {
    if (!category.categoryName) {
      toast.error("Please enter category name");
    } else if (category.subCategories.length === 0) {
      toast.error("Please add sub categories");
    } else {
      const config = {
        method: "post",
        url: "http://localhost:5001/categories",
        headers: {
          "Content-Type": "application/json",
        },
        data: { ...category },
      };

      axios(config)
        .then((data) => {
          if (data?.data?.status === 200) {
            toast.success("Category Added successfully");
            setCategory({
              subCategories: [],
              categoryName: "",
            });
          }
        })
        .catch((error) => {
          toast.error("Something went wrong!!");
        });
    }
  };

  const handleFormChange = (e) => {
    setCategory({
      ...category,
      [e.target.id]: e.target.value,
    });
  };

  const handleClick = (id) => {
    setId(id);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    history.push("/login");
  };

  const hasToken = localStorage.getItem("token");
  if (!hasToken) {
    return <Redirect to="/login" />;
  }

  const user = localStorage.getItem("user");
  const parsedUser = user && JSON.parse(user);
  const isAdmin = !!parsedUser.isAdmin;

  if (!isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="admin-container">
      <div className="button-container">
        <Button
          variant="contained"
          onClick={() => {
            handleClick(0);
          }}
          color="primary"
        >
          Add categories
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleClick(1);
          }}
        >
          Add users
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleClick(2);
          }}
        >
          List
        </Button>
        <Button variant="contained" color="primary">
          User
        </Button>
        <Button onClick={handleLogout} variant="contained" color="primary">
          Logout
        </Button>
      </div>
      <div className="details">
        {id === 0 && (
          <CategoryForm
            form={category}
            handleFormChange={handleFormChange}
            handleSubCategories={handleSubCategories}
            handleAddCategories={handleAddCategories}
          />
        )}

        {id === 1 && <Register />}
      </div>
    </div>
  );
};

export default withRouter(Admin);
