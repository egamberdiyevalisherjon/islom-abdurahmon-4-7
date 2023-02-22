import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadUserData } from "../store/slices/user";

const CreateProfile = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  async function handleCreateProfile(data) {
    if (!data.status) return toast("Status is required!", { type: "error" });
    if (!data.skills) return toast("Skills are required!", { type: "error" });

    try {
      let { data: user } = await axios.post("/profile", data);
      dispatch(loadUserData(user));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container py-5">
      <h1 className="display-1 fw-bold text-info">Create Your Profile</h1>
      <p className="fs-4">
        <i className="fa-solid fa-user"></i> Let's get some information to make
        your
      </p>
      <p className="text-muted">* = required field</p>
      <form onSubmit={handleSubmit(handleCreateProfile)}>
        <div>
          <select className="form-select" {...register("status")}>
            <option value="">* Select professional status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student Or Learning">Student Or Learning</option>
            <option value="Instructor Or Teacher">Instructor Or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <p className="text-muted">
            Give us an idea of where you are at in your career
          </p>
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Company"
            {...register("company")}
          />
          <p className="text-muted">
            Could be your own company or one you work for
          </p>
        </div>
        <div>
          <input
            type="url"
            className="form-control"
            placeholder="Web site"
            {...register("website")}
          />
          <p className="text-muted">Could be your own or a company website</p>
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            {...register("location")}
          />
          <p className="text-muted">City & state suggested (eg. Boston, MA)</p>
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="* Skills"
            {...register("skills")}
          />
          <p className="text-muted">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </p>
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Github username"
            {...register("githubusername")}
          />
          <p className="text-muted">
            If you want your latest repos and a Github link, include your
            username
          </p>
        </div>
        <div>
          <textarea
            className="form-control"
            placeholder="A short bio of yourself"
            {...register("bio")}
          />
          <p className="text-muted">Tell us a little about yourself</p>
        </div>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => setOpen(!open)}
        >
          Add social Network Links
        </button>
        <span>Optional</span>
        {open && (
          <div>
            <div className="d-flex gap-3 my-3">
              <i className="fa-brands fa-twitter fa-2x text-info"></i>
              <input
                className="form-control"
                placeholder="Twitter URL"
                type="url"
                {...register("twitter")}
              />
            </div>
            <div className="d-flex gap-3 my-3">
              <i className="fa-brands fa-facebook fa-2x text-primary"></i>
              <input
                className="form-control"
                placeholder="Facebook URL"
                type="url"
                {...register("facebook")}
              />
            </div>
            <div className="d-flex gap-3 my-3">
              <i className="fa-brands fa-youtube fa-2x text-danger"></i>
              <input
                className="form-control"
                placeholder="Youtube URL"
                type="url"
                {...register("youtube")}
              />
            </div>
            <div className="d-flex gap-3 my-3">
              <i className="fa-brands fa-linkedin fa-2x text-primary"></i>
              <input
                className="form-control"
                placeholder="Linkedin URL"
                type="url"
                {...register("linkedin")}
              />
            </div>
            <div className="d-flex gap-3 my-3">
              <i className="fa-brands fa-instagram fa-2x text-danger"></i>
              <input
                className="form-control"
                placeholder="Instagram URL"
                type="url"
                {...register("instagram")}
              />
            </div>
          </div>
        )}
        <div className="my-3">
          <button className="btn btn-info">Submit</button>
          <Link to="/dashboard" className="btn btn-light">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
