import React from "react";
import { Route } from "react-router-dom";

import Login from "./pages/User/Login";
import Main from "./pages/Main/Main";
import Signup from "./pages/User/Signup";
import About from "./pages/About/About";
import Help from "./pages/Help/Help";
import Rides from "./pages/Your Rides/yourrides";
import Choose_rides from "./pages/Choose_rides/Choose_rides";
import Profile from "./pages/Profile/Profile";
import Edit_Profile from "./pages/Profile/edit_profile";
import Edit_Ride from "./pages/Main/edit_ride";



const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Main} />{" "}
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
    <Route exact path="/about/" component={About} />{" "}
    <Route exact path="/help/" component={Help} />{" "}
    <Route exact path="/your_rides/" component={Rides} />{" "}
    <Route exact path="/choose_rides/" component={Choose_rides} />{" "}
    <Route exact path="/profile/" component={Profile} />{" "}
    <Route exact path="/edit_profile/" component={Edit_Profile} />{" "}
    <Route exact path="/edit_ride/" component={Edit_Ride} />{" "}

  </div>
);

export default BaseRouter;
