import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import Photos from "../photos/Photos";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
  return (
    <div>
      <Navbar fixed="top" variant="dark" className="bg-blue">
        <Navbar.Brand className="brand">Kenziegram</Navbar.Brand>
        <Nav className="ml-auto">
          <NavLink to="/" activeClassName="selected" exact={true} className="mr-3 nav-link">Home</NavLink>
          <NavLink to="/photos" activeClassName="selected" className="nav-link">Photos</NavLink>
        </Nav>
      </Navbar>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/photos">
            <Photos />
          </Route>
        </Switch>
        
      {/* <div id="nav-items"> */}
      {/* <li>
          <NavLink to="/" activeClassName="selected" exact={true}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/photos" activeClassName="selected">
            Photos
          </NavLink>
        </li> */}
      {/* </div> */}

    </div>
  );
};

export default Navigation;
