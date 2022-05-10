import React from "react";
import "./Footer.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer class="text-center text-lg-start bg-light text-muted mt-5">
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>

      <section class="">
        <div class="container text-center text-md-start mt-5">
          <div class="row mt-3">
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-gem me-3"></i>Nice HomeStay
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Houses</h6>
              <p>
                <a href="#!" class="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Laravel
                </a>
              </p>
            </div>

            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" class="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Help
                </a>
              </p>
            </div>

            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i class="fas fa-home me-3"></i> Danang, VietNam
              </p>
              <p>
                <i class="fas fa-envelope me-3"></i>
                nicehomestay@gmail.com
              </p>
              <p>
                <i class="fas fa-phone me-3"></i> +(89) 90 123 4234
              </p>
              <p>
                <i class="fas fa-print me-3"></i> +(89) 90 123 4332
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        class="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright:
        <a class="text-reset fw-bold" href="https://mdbootstrap.com/">
          <span> </span>Nice HomeStay
        </a>
      </div>
    </footer>
  );
}
