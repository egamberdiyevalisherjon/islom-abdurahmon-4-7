import React from "react";
import { Link } from "react-router-dom";

const HeaderLink = ({ children, className = "", ...rest }) => (
  <Link className={`text-reset text-decoration-none ${className}`} {...rest}>
    {children}
  </Link>
);

const Header = () => {
  return (
    <header id="main-header" className="text-bg-secondary py-3 border-bottom border-2 border-info">
      <nav className="container-fluid px-5 d-flex justify-content-between align-items-center">
        <HeaderLink to="/" className="fs-4">
          <i className="fa-solid fa-code"></i> DevConnector
        </HeaderLink>
        <ul className="list-unstyled d-flex m-0 gap-3 align-items-center">
          <li>
            <HeaderLink to="/profiles">Developers</HeaderLink>
          </li>
          <li>
            <HeaderLink to="/register">Register</HeaderLink>
          </li>
          <li>
            <HeaderLink to="/login">Login</HeaderLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
