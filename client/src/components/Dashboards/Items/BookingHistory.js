import React from "react";
import { Link } from "react-router-dom";

export default function BookingHistory() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          <h2>Your bookings</h2>
        </div>
        <div className="col-md-2">
          <Link to="/" className="btn btn-primary">
            Browse Hotels
          </Link>
        </div>
      </div>
    </div>
  );
}
