import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div id="nav-links">
      <ul id="nav-items">
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
