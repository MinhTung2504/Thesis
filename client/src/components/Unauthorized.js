import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header/Header";

export default function Unauthorized() {
  return (
    <>
      <Header />
      <div className="text-center p-5">
        <h1 className="h2 mb-5 p-5">
          403 <br />
          FORBIDDEN
        </h1>
        <p>Sorry, you are not allowed to enter here.</p>
        <p>Go To Homepage by Button Below</p>
        <Link to="/" className="btn btn-outline-primary">
          Home Page
        </Link>
      </div>
    </>
  );
}
