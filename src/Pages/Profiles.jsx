import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { toast } from "react-toastify";

const Profiles = () => {
  const { isError, errors, loading, data, isFetched } = useFetch(
    "/profile",
    "get"
  );

  if (isError) {
    errors.forEach((err) => toast(err.message, { type: "error" }));
    return <h1>Something Went Wrong. Sorry For Inconvenience. 😢</h1>;
  }

  return (
    <main className="py-3">
      <div className="container">
        <h1 className="display-2 fw-bold text-info">Developers</h1>
        <p className="fs-4">
          <i className="fa-brands fa-connectdevelop"></i> Browse and connect
          with developers
        </p>
        {!isFetched || loading ? (
          <div className="d-flex flex-column gap-3">
            {[1, 2, 3, 4].map((profile) => (
              <div
                key={profile}
                className="text-bg-light p-3 row align-items-center border"
              >
                <div className="col-12 col-md-3 placeholder-glow">
                  <span
                    className="placeholder col-7 rounded-circle"
                    style={{ aspectRatio: "1" }}
                  ></span>
                </div>
                <div className="col-12 col-md-7">
                  <h2 className="placeholder-glow">
                    <span className="placeholder col-7"></span>
                  </h2>
                  <p className="placeholder-glow">
                    <span className="placeholder col-7"></span>
                  </p>
                  <p className="placeholder-glow">
                    <span className="placeholder disabled btn btn-info col-2"></span>
                  </p>
                </div>
                <div className="col-12 col-md-2">
                  <ul className="list-unstyled m-0">
                    {[1, 2, 3, 4].map((skill) => (
                      <li className="placeholder-glow" key={skill}>
                        <span className={`placeholder col-${skill}`}></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {data.map((profile) => (
              <div
                key={profile._id}
                className="text-bg-light p-3 row align-items-center border"
              >
                <div className="col-12 col-md-3">
                  <img
                    className="rounded-circle img-fluid"
                    src={profile?.user?.avatar}
                    alt=""
                  />
                </div>
                <div className="col-12 col-md-7">
                  <h2>{profile?.user?.name}</h2>
                  <p>
                    {profile.status} at {profile.company}
                  </p>
                  <Link
                    to={`/profiles/${profile._id}`}
                    className="btn btn-info"
                  >
                    View Profile
                  </Link>
                </div>
                <div className="col-12 col-md-2">
                  <ul className="list-unstyled m-0">
                    {profile.skills.slice(0, 4).map((skill, index) => (
                      <li className="text-info" key={index}>
                        <i className="fa-solid fa-check"></i> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Profiles;
