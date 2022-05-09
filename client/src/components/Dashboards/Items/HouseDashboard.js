import React from "react";
import { Link } from "react-router-dom";
import HouseListTable from "../../HouseList/HouseListTable";

export default function HouseDashboard() {
  return (
    <div className="container">
      {/* <div className="">
        <Link to="/house/new" className="btn btn-primary">
          Create A New House
        </Link>
      </div> */}

      <div className="row">
        <div className="col-md-10">{/* <h1>Your Houses</h1>  */}</div>
        <div className="col-md-2">
          <Link to="/house/new" className="btn btn-primary">
            Create A New House
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <HouseListTable />
        </div>
      </div>
    </div>
  );
}
