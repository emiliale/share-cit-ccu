import React from "react";
import { Route } from "react-router-dom";

import Login from "./pages/User/Login";
import Main from "./pages/Main/Main";
import Signup from "./pages/User/Signup";
import About from "./pages/About/About";
import Help from "./pages/Help/Help";
import Choose_rides from "./pages/Choose_rides/Choose_rides";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Main} />{" "}
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
    <Route exact path="/about/" component={About} />{" "}
    <Route exact path="/help/" component={Help} />{" "}
    <Route exact path="/choose_rides/" component={Choose_rides} />{" "}
  </div>
);

export default BaseRouter;
