import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-4">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="form-group mb-4">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="text-center">
        <button disabled={!email || !password} className="btn btn-primary mb-2">
          Login
        </button>
        <p>
          Not registered?{" "}
          <Link to="/register">
            <strong className="text-warning">Create an account</strong>
          </Link>
        </p>
      </div>
    </form>
  );
}
