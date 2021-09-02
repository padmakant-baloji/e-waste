import React, { Component } from "react";
import { Redirect } from "react-router-dom";

function withLogin(Comp) {
  const isLogin = window.localStorage.getItem("token");
  console.log("with login", isLogin);
  return class extends Component {
    render() {
      if (isLogin === undefined) {
        return null;
      }
      if (!isLogin) {
        return <Redirect to="/login" />;
      }
      return <Comp {...this.props} />;
    }
  };
}

export default withLogin;
