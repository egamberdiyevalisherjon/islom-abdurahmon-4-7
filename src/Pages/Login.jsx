import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    let email = e.target[0].value;
    let password = e.target[1].value;

    if (!email || !password)
      return toast("Please fill all the fields!", { type: "error" });

    try {
      let {
        data: { token },
      } = await axios.post("/auth", { email, password });

      localStorage.setItem("token", token);
      axios.defaults.headers[("x-auth-token", token)];
      toast("Logged in", { type: "success" });
      navigate("/dashboard");
    } catch (error) {}
  }
  return (
    <div className="container py-5">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="my-1">
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
        </div>
        <div className="my-1">
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <button className="btn btn-info" type="submit">
          Login
        </button>
      </form>
      <p>
        Do not have an account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
