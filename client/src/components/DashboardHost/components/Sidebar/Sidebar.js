import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div
        className="sidebar-background "
        // style={{
        //   backgroundImage: "url(" + image + ")",
        // }}
      />
      <div className="sidebar-wrapper bg-secondary">
        <div className="logo d-flex align-items-center justify-content-center">
          <Link className="simple-text" to="/">
            Nice Homestay
          </Link>
        </div>
        <Nav defaultActiveKey="/admin" className="flex-column">
          <Nav.Link>
            <Link className="text-white" to="/host/dashboard">
              Host Dashboard
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="text-white" to="/host/houses">
              My Houses
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="text-white" to="/host/bookings">
              Bookings
            </Link>
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}
