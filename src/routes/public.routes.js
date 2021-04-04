import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export default function PublicRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Redirect to="/" />
    </Switch>
  );
}
