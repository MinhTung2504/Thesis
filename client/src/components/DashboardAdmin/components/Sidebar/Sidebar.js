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
            <Link className="text-white" to="/admin/dashboard">
              Dashboard
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="text-white" to="/admin/users">
              Users
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="text-white" to="/admin/houses">
              Houses
            </Link>
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}
