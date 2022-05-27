import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

export default function CancelPayment() {
  return (
    <>
      <Header />
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            <div className="payment bg-light">
              <div className="payment_header bg-danger">
                <div className="check-payment text-center">
                  <i
                    className="fa-solid fa-xmark text-white"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <div className="content">
                <h1 className="text-danger">Payment Cancel!</h1>
                <Link to="/user-booking">
                  <button className="btn btn-secondary">
                    Go to Booking History
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
