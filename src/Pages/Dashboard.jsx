import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const Dashboard = () => {
  const { data: user } = useFetch("/auth");
  const { data: profile } = useFetch("/profile/me");

  console.log(profile);
  return (
    <div className="container py-5">
      <h1 className="text-info">Dashboard</h1>
      <p className="fs-4">
        <i className="fa-solid fa-user"></i> Welcome {user?.name}
      </p>
      {!profile ? (
        <div>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-info">
            Create Profile
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Dashboard;
