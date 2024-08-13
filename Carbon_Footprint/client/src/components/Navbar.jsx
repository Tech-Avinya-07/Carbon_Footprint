import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import { useAuth } from "../store/auth";

function Navbar() {
  const { isLogedIn } = useAuth();

  return (
    <>
      <div className="navbar">
        <h1 className="logo">Mysite</h1>
        <div className="options">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>

          {isLogedIn ? (
            <NavLink to="/logout">Logout</NavLink>
          ) : (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
