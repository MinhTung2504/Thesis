import React from "react";

export default function RegisterForm({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-4">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
      </div>

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

      <button
        disabled={!name || !email || !password}
        className="btn btn-primary"
      >
        Sign up
      </button>
    </form>
  );
}
