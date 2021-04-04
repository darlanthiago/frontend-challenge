import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

export default function PrivateRoutes() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/dashboard" component={Dashboard} />

      <Redirect to="/home" />
    </Switch>
  );
}
