import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <h4>SG</h4>
      </div>
      <div className="right">
        <NavLink className="link" to="/">Home</NavLink>
        <NavLink className="link" to="/about">About</NavLink>
        <NavLink className="link" to="/connect">Connect</NavLink>
        <NavLink className="link" to="/skils">Skiils</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
