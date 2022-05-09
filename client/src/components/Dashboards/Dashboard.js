import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardNav from "./DashboardNav";

export default function Dashboard() {
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <h1 className="p-5 text-center">Statistics</h1>
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
    </>
  );
}
