import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "../store/slices/user";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { data: user } = useFetch("/auth");
  const { info: profile } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteExp(id) {
    if (confirm("Are you sure to delete?!")) {
      try {
        let { data } = await axios.delete(`/profile/experience/${id}`);
        dispatch(loadUserData(data));
        toast("Experience is deleted", { type: "success" });
      } catch (error) {
        // TOAST
      }
    }
  }

  async function handleDeleteEdu(id) {
    if (confirm("Are you sure to delete?!")) {
      try {
        let { data } = await axios.delete(`/profile/education/${id}`);
        dispatch(loadUserData(data));
        toast("Education is deleted", { type: "success" });
      } catch (error) {
        // TOAST
      }
    }
  }

  async function handleDeleteProfile() {
    if (confirm("Are you sure to delete PROFILE?!")) {
      try {
        await axios.delete(`/profile`);
        dispatch(loadUserData(null));
        toast("Profile is deleted", { type: "success" });
        navigate("/login");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["x-auth-token"];
      } catch (error) {
        // TOAST
      }
    }
  }

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
        <div>
          <div className="d-flex gap-1">
            <Link className="btn btn-light border" to="/edit-profile">
              Edit Profile
            </Link>
            <Link className="btn btn-light border" to="/add-experience">
              Add experience
            </Link>
            <Link className="btn btn-light border" to="/add-education">
              Add education
            </Link>
          </div>
          <h2>Experience Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profile.experience.map((exp) => {
                console.log(exp);
                return (
                  <tr key={exp._id}>
                    <td>{exp.company}</td>
                    <td>{exp.title}</td>
                    <td>
                      {exp.from} - {exp.to}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteExp(exp._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>Education Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profile.education.map((edu) => {
                console.log(edu);
                return (
                  <tr key={edu._id}>
                    <td>{edu.school}</td>
                    <td>{edu.degree}</td>
                    <td>
                      {edu.from} - {edu.to}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteEdu(edu._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn btn-danger my-3" onClick={handleDeleteProfile}>
            Delete my account
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
