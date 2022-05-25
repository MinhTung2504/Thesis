import React from "react";
import { Rate } from "antd";
import { formatCurrency, formatDate } from "../../../utils";

export default function BookingHistory({ booking }) {
  console.log(booking);
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
          {booking.status === "in-progress" && (
            <h5 className="text-info">
              <strong>In Progress</strong>
            </h5>
          )}
        </div>
        <div className="col-md-3 justify-content-center my-auto">
          <h5>{booking.house.title}</h5>
          <img
            style={{ width: "90%", borderRadius: "5px" }}
            src={booking.house.image}
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
                <button className="btn btn-success">Book again</button>
              </div>
              <div className="row">
                <div>
                  <Rate />
                </div>
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
                <button className="btn btn-primary text-black">Pay</button>
              </div>
              <div className="row mb-3">
                <button className="btn btn-cancel text-black">
                  Cancel Booking
                </button>
              </div>
            </div>
          )}
          {booking.status === "paid" && (
            <div>
              <div className="row mb-3">
                <button className="btn btn-secondary text-black" disabled>
                  Paid
                </button>
              </div>
              <div className="row mb-3">
                <button className="btn btn-cancel text-black">
                  Cancel Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
