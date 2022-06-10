import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="text-center text-lg-start bg-light text-muted mt-5">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Nice HomeStay
              </h6>
              <p>
                We provide affordable rental homestay services for your travel, helping you to have a great vacation experience.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Information</h6>
              <p>
                <Link to="/about-us" className="text-reset">
                  About us
                </Link>
              </p>
              <p>
                <Link to="/privacy-policy" className="text-reset">
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link to="/houses-filter" className="text-reset">
                  Our HomeStay
                </Link>
              </p>
              <p></p>
            </div>


            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> Danang, VietNam
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                nicehomestay@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> +(89) 90 123 4234
              </p>
              <p>
                <i className="fas fa-print me-3"></i> +(89) 90 123 4332
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright:
        <Link className="text-reset fw-bold" to="/">
          <span> </span>Nice HomeStay
        </Link>
      </div>
    </footer>
  );
}
