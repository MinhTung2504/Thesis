import React from "react";
import Header from "../Header/Header";
import BookingHistory from "./BookingHistory/BookingHistory";

export default function UserBooking() {
  return (
    <>
      <Header />
      <div className="container-fluid bg-secondary p-5 mb-5">
        <h1 className="text-center">Your Booking History</h1>
      </div>
      <BookingHistory />;
      <BookingHistory />
    </>
  );
}
