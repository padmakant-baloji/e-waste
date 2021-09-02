import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Company from "./Container/Company/Company";
import Home from "./Container/Home/Home";
import Login from "./Container/Login/Login";
import Admin from "./Container/Admin/Admin";
import Register from "./Container/Register/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Individual from "./Container/Individual/Individual";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/company-waste">
          <Company />
        </Route>
        <Route path="/individual-waste">
          <Individual />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  );
};

export default App;
