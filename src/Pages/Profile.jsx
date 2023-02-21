import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import Loader from "../Components/Loader";
import Repos from "../Components/Repos";

const Profile = () => {
  const { id } = useParams();
  const { loading, data: profile } = useFetch(`/profile/user/${id}`, "get");

  console.log(profile);

  return (
    <div>
      <div className="container py-5">
        {loading || !profile ? (
          <Loader />
        ) : (
          <>
            <Link to="/profiles" className="btn btn-light">
              Back to Profiles
            </Link>
            <section className="bg-info text-white p-5 text-center my-3">
              <img
                src="https://gravatar.com/avatar/045c2457648f3ecbf3f41dcb45e208d0?d=mm&r=pg&s=200"
                alt=""
                className="rounded-circle"
              />
              <h1 className="display-1">{profile?.user?.name}</h1>
              <p className="fs-2">
                {profile?.status} at {profile?.company}
              </p>
              <div className="d-inline-flex gap-3 fs-2">
                {profile?.website && (
                  <a
                    className="text-reset text-decoration-none"
                    href={profile?.website}
                  >
                    <i className="fa-solid fa-globe"></i>
                  </a>
                )}
                {Object.keys(profile?.social || {}).map((key) => {
                  let url = profile?.social?.[key];
                  if (url)
                    return (
                      <a
                        key={key}
                        className="text-reset text-decoration-none"
                        href={url}
                      >
                        <i className={`fa-brands fa-${key}`}></i>
                      </a>
                    );
                })}
              </div>
            </section>
            <section className="text-bg-light text-center p-5 border my-3">
              <h2 className="display-5 text-info">
                {profile.user.name.split(" ")[0]}s Bio
              </h2>
              <p>{profile.bio}</p>
              <hr />
              <h3 className="fs-1 text-info">Skill Set</h3>
              <ul className="list-unstyled m-0 d-flex align-items-center justify-content-center gap-3">
                {profile.skills.map((skill, index) => {
                  return (
                    <li key={index}>
                      <i className="fa-solid fa-check text-info"></i> {skill}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="my-3">
              <div className="row g-5">
                <div className="col-md-8">
                  <div className="border p-5">
                    <h2 className="display-5 text-info">Experience</h2>
                    {profile.experience.length === 0 && (
                      <h5>No experience credentials</h5>
                    )}
                    {profile.experience.map((exp, index, arr) => {
                      let fromDate = new Date(exp.from);
                      let fromYear = fromDate.getFullYear();
                      let fromMonth = fromDate.getMonth() + 1;
                      let fromDay = fromDate.getDate();
                      let toDate = new Date(exp.to);
                      return (
                        <React.Fragment key={index}>
                          <h5>{exp.company}</h5>
                          <p>
                            {fromMonth}/{fromDay}/{fromYear} -{" "}
                            {exp.current
                              ? "Now"
                              : `${
                                  toDate.getMonth() + 1
                                }/${toDate.getDate()}/${toDate.getFullYear()}`}
                          </p>
                          <p>
                            <strong>Position</strong>: {exp.title}
                          </p>
                          <p>
                            <strong>Location</strong>: {exp.location}
                          </p>
                          <p>
                            <strong>Description</strong>: {exp.description}
                          </p>
                          {index + 1 < arr.length && <hr />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="border p-5">
                    <h2 className="display-5 text-info">Education</h2>
                    {profile.education.length === 0 && (
                      <h5>No education credentials</h5>
                    )}
                    {profile.education.map((edu, index, arr) => {
                      let fromDate = new Date(edu.from);
                      let fromYear = fromDate.getFullYear();
                      let fromMonth = fromDate.getMonth() + 1;
                      let fromDay = fromDate.getDate();
                      let toDate = new Date(edu.to);
                      return (
                        <React.Fragment key={index}>
                          <h5>{edu.company}</h5>
                          <p>
                            {fromMonth}/{fromDay}/{fromYear} -{" "}
                            {edu.current
                              ? "Now"
                              : `${
                                  toDate.getMonth() + 1
                                }/${toDate.getDate()}/${toDate.getFullYear()}`}
                          </p>
                          <p>
                            <strong>Degree</strong>: {edu.degree}
                          </p>
                          <p>
                            <strong>Field Of Study</strong>: {edu.fieldofstudy}
                          </p>
                          <p>
                            <strong>School</strong>: {edu.school}
                          </p>
                          <p>
                            <strong>Description</strong>: {edu.description}
                          </p>

                          {index + 1 < arr.length && <hr />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <Repos username={profile.githubusername} />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
