import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import Photos from "../photos/Photos";
const Navigation = () => {
  return (
    <div id="nav-links">
      <div id="nav-items">
        <div>
          <NavLink to="/" activeClassName="selected" exact={true}>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/photos" activeClassName="selected">
            Photos
          </NavLink>
        </div>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/photos">
          <Photos />
        </Route>
      </Switch>
    </div>
  );
};

export default Navigation;
