import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { checkPaidBooking } from "../../../actions/booking";
import { BOOKING_STATUS } from "../../../utils";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import "./SuccessPayment.css";

export default function SuccessPayment() {
  let param = useParams();
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const bookingId = param.bookingId;
  // console.log(param.bookingId, token);
  console.log(bookingId);

  useEffect(() => {
    handlecheckPaidBooking(bookingId);
  }, []);

  const handlecheckPaidBooking = async (bookingId) => {
    checkPaidBooking(token, { status: BOOKING_STATUS.PAID }, bookingId);
  };

  return (
    <>
      <Header />
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            <div className="payment bg-light">
              <div className="payment_header bg-success">
                <div className="check-payment text-center">
                  <i className="fa fa-check text-white" aria-hidden="true"></i>
                </div>
              </div>
              <div className="content">
                <h1 className="text-success">Payment Success!</h1>
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
