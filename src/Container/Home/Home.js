import { Button } from "@material-ui/core";
import React from "react";
import Header from "./Components/Header/Header";
import "./Home.scss";
import Menu from "../../Components/SideMenu/SideMenu";
import { Redirect } from "react-router-dom";

const Home = () => {
  const isLogin = window.localStorage.getItem("token");
  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <Menu>
      <div className="home-container">
        <div>
          <Header />
        </div>
        <div className="fixed-button">
          <Button variant="contained" color="primary">
            Raise Request
          </Button>
        </div>
      </div>
    </Menu>
  );
};
export default Home;
