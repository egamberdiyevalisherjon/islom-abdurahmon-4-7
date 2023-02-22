import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HeaderLink = ({ children, className = "", ...rest }) => (
  <Link className={`text-reset text-decoration-none ${className}`} {...rest}>
    {children}
  </Link>
);

const Header = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    toast("Logged out", { type: "info" });
    navigate("/login");
  }

  return (
    <header
      id="main-header"
      className="text-bg-secondary py-3 border-bottom border-2 border-info"
    >
      <nav className="container-fluid px-5 d-flex justify-content-between align-items-center">
        <HeaderLink to="/" className="fs-4">
          <i className="fa-solid fa-code"></i> DevConnector
        </HeaderLink>
        <ul className="list-unstyled d-flex m-0 gap-3 align-items-center">
          <li>
            <HeaderLink to="/profiles">Developers</HeaderLink>
          </li>
          {token ? (
            <>
              <li>
                <HeaderLink to="/posts">Posts</HeaderLink>
              </li>
              <li>
                <HeaderLink to="/dashboard">Dashboard</HeaderLink>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-danger">
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <HeaderLink to="/register">Register</HeaderLink>
              </li>
              <li>
                <HeaderLink to="/login">Login</HeaderLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
