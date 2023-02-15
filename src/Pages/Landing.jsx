import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main id="landing-showcase" className="text-white d-flex flex-column align-items-center justify-content-center">
      <h1 className="display-1 fw-bold">Developer Connector</h1>
      <p>
        Create a developer profile/portfolio, share posts and get help from
        other developers
      </p>
      <div className="d-flex gap-3">
        <Link to="/register" className="btn btn-info">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-light">
          Login
        </Link>
      </div>
    </main>
  );
};

export default Landing;
