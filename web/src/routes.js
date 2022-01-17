import React from "react";
import { Route } from "react-router-dom";

import Login from "./pages/User/Login";
import Main from "./pages/Main/Main";
import Signup from "./pages/User/Signup";
import About from "./pages/About/About";
import Help from "./pages/Help/Help";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Main} />{" "}
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
    <Route exact path="/about/" component={About} />{" "}
    <Route exact path="/help/" component={Help} />{" "}
  </div>
);

export default BaseRouter;
