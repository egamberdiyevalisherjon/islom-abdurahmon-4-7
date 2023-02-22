import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function handleRegister(data) {
    if (data.password !== data.confirmPassword)
      return toast("Passwords do not match!", { type: "error" });

    let body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      let {
        data: { token },
      } = await axios.post("/users", body);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token;
      toast("Registered successfully", { type: "success" });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      error?.response?.data?.errors?.forEach?.((err) => {
        toast(err.msg, { type: "error" });
      });
    }
  }

  return (
    <div className="container py-5">
      <h1 className="text-info">Sign Up</h1>
      <p className="fs-4">
        <i className="fa-solid fa-user"></i> Create Your Account
      </p>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required!",
              minLength: {
                value: 4,
                message: "Name must be at least 4 character long!",
              },
            })}
          />
          {!!errors.name && (
            <p className="text-danger">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            {...register("email", { required: "Email is required!" })}
          />
          {!!errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <p className="text-muted">
          This site uses Gravatar so if you want a profile image, use a Gravatar
          email
        </p>
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 6,
                message: "Password must be at least 6 character long!",
              },
            })}
          />
          {!!errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            className="form-control"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "You must confirm password!",
            })}
          />
          {!!errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button className="btn btn-info my-3" type="submit">
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link className="text-info text-decoration-none" to="/login">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
