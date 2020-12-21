import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import Photos from "../photos/Photos";
const Navigation = () => {
  return (
    <div id="nav-links">
      <ul id="nav-items">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/photos">
            <Photos />
          </Route>
        </Switch>
        <li>
          <NavLink to="/" activeClassName="selected" exact={true}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/photos" activeClassName="selected">
            Photos
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
