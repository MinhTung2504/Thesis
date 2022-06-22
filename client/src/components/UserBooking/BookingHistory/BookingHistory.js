import React, { useState } from "react";
import { Rate } from "antd";
import { formatCurrency, formatDate } from "../../../utils";
import { payBooking } from "../../../actions/paypal";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PaymentModal from "../Modals/PaymentModal";
import { getPayment } from "../../../actions/payment";
import { getFeedbackById } from "../../../actions/feedback";
import FeedbackModal from "../Modals/FeedbackModal";
import ViewFeedbackModal from "../Modals/ViewFeedbackModal";

export default function BookingHistory({
  booking,
  handleCancelBooking = (f) => f,
  handleSendFeedback = (f) => f,
}) {
  // console.log(booking);
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [payment, setPayment] = useState();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [contentFeedback, setContentFeedback] = useState("");
  const navigate = useNavigate();
  // console.log(booking);
  const handlePayment = async (bookingId, bookingInfo) => {
    const res = await payBooking(bookingId, bookingInfo);
    console.log(res.data);
    window.location = res.data;
  };
  const getPaymentByBooking = async (bookingId) => {
    const res = await getPayment(bookingId, token);
    console.log(res.data);
    setPayment(res.data);
  };

  const handleGetFeedbackById = async (bookingId) => {
    const res = await getFeedbackById(token, bookingId);
    // console.log(res);
    setFeedback(res.data);
  };

  const handleChange = (e) => {
    setContentFeedback(e.target.value);
  };

  console.log(rating);
  console.log(contentFeedback);

  return (
    <div className="container mb-2">
      <div
        className="row justify-content-center"
        style={{
          boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px",
          borderRadius: "5px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div className="col-md-1 my-auto mx-auto ">
          {booking.status === "pending" && (
            <h5 className="text-warning">
              <strong>Pending</strong>
            </h5>
          )}
          {booking.status === "completed" && (
            <h5 className="text-success">
              <strong>Completed</strong>
            </h5>
          )}
          {booking.status === "paid" && (
            <h5 className="text-muted">
              <strong>Paid</strong>
            </h5>
          )}
          {booking.status === "not-paid" && (
            <h5 className="text-secondary">
              <strong>Not Paid</strong>
            </h5>
          )}
          {booking.status === "canceled" && (
            <h5 className="text-danger">
              <strong>Canceled</strong>
            </h5>
          )}
          {booking.status === "rejected" && (
            <h5 className="text-danger">
              <strong>Rejected</strong>
            </h5>
          )}
          {booking.status === "in-progress" && (
            <h5 className="text-info">
              <strong>In Progress</strong>
            </h5>
          )}
        </div>
        <div className="col-md-3 justify-content-center my-auto">
          <h5>{booking.house && booking.house.title}</h5>
          <img
            style={{ width: "90%", borderRadius: "5px" }}
            src={booking.house && booking.house.image}
            alt="houseCheckBookingImg"
          />
        </div>
        <div className="col-md-4 my-auto">
          <div className="row">
            <div className="form-group col-md-6">
              <p>
                <b>Check-in Date: </b>
              </p>
              <p>{formatDate(new Date(booking.date_check_in))}</p>
              <p>
                <b>Booked At: </b>
              </p>
              <p>{formatDate(new Date(booking.createdAt))}</p>
            </div>
            <div className="form-group col-md-6">
              <p>
                <b>Check-out Date: </b>{" "}
              </p>
              <p>{formatDate(new Date(booking.date_check_out))}</p>
              <p>
                <b>Total: </b>
              </p>
              <p>{formatCurrency(booking.payment)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 my-auto" style={{ textAlign: "center" }}>
          {booking.status === "completed" && (
            <div>
              <div className="row mb-3">
                <button className="btn btn-success">
                  <Link
                    to={`/house/${booking.house._id}`}
                    className="text-dark"
                  >
                    Book again
                  </Link>
                </button>
              </div>
              <div className="row">
                {booking.isFeedback === true ? (
                  <button
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#viewFeedback"
                    onClick={() => handleGetFeedbackById(booking._id)}
                  >
                    <Rate value={feedback.star} />
                  </button>
                ) : (
                  <button
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#feedbackModal"
                  >
                    Feedback
                  </button>
                )}
                {/* <Rate /> */}

                <FeedbackModal
                  setRating={setRating}
                  rating={rating}
                  handleChange={handleChange}
                  contentFeedback={contentFeedback}
                  handleSendFeedback={handleSendFeedback}
                  booking={booking}
                />
                <ViewFeedbackModal feedback={feedback} />
              </div>
            </div>
          )}
          {booking.status === "pending" && (
            <div>
              <div className="row mb-3 ">
                <button className="btn btn-secondary text-black" disabled>
                  Wait To Comfirm
                </button>
              </div>
            </div>
          )}
          {booking.status === "canceled" && (
            <div>
              <div className="row mb-3 ">
                <button className="btn btn-danger text-black" disabled>
                  Canceled
                </button>
              </div>
            </div>
          )}
          {booking.status === "rejected" && (
            <div>
              <div className="row mb-3 ">
                <button className="btn btn-danger text-black" disabled>
                  Rejected
                </button>
              </div>
            </div>
          )}
          {booking.status === "in-progress" && (
            <div>
              <div className="row mb-3">
                <button className="btn btn-secondary text-black" disabled>
                  In Progress
                </button>
              </div>
            </div>
          )}
          {booking.status === "not-paid" && (
            <div>
              <div className="row mb-3">
                <button
                  className="btn btn-primary text-black"
                  onClick={() => {
                    handlePayment(booking._id, {
                      name: booking.house.title,
                      sku: booking._id,
                      price: (booking.payment / 23000).toFixed().toString(),
                      currency: "USD",
                      quantity: 1,
                    });
                  }}
                >
                  Pay
                </button>
              </div>
              <div className="row mb-3">
                <button
                  className="btn btn-cancel text-black"
                  onClick={() => {
                    handleCancelBooking(booking._id, {
                      email: booking.house.host.email,
                      subject: `User ${booking.user.name} CANCELED BOOKING OF YOUR HOMESTAY NAMED ${booking.house.title}`,
                      content: `You can check it following this link: ${process.env.REACT_APP_URL}/host/bookings. Thank you!`,
                    });
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          )}
          {booking.status === "paid" && (
            <>
              <div>
                <div className="row mb-3">
                  <button
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#paymentModalDetail"
                    onClick={() => getPaymentByBooking(booking._id)}
                  >
                    View Payment
                  </button>
                </div>
                <div className="row mb-3">
                  <button
                    className="btn btn-cancel text-black"
                    onClick={() => {
                      handleCancelBooking(booking._id, {
                        email: booking.house.host.email,
                        subject: `User ${booking.user.name} CANCELED BOOKING OF YOUR HOMESTAY NAMED ${booking.house.title}`,
                        content: `You can check it following this link: ${process.env.REACT_APP_URL}/host/bookings. Thank you!`,
                      });
                    }}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
              {payment && <PaymentModal payment={payment} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
