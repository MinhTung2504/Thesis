import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserBooking } from "../../actions/booking";
import Header from "../Header/Header";
import BookingHistory from "./BookingHistory/BookingHistory";

export default function UserBooking() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [bookings, setBookings] = useState([]);
  const pageNumber = useParams().pageNumber || 1;
  // console.log(pageNumber);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  // console.log(page);
  useEffect(() => {
    loadUserBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadUserBooking = async () => {
    setLoading(true);
    try {
      const res = await getUserBooking(token, page);
      // console.log(res);
      // const { data, pages: totalPages } = await res.json();

      setPages(res.data.pages);
      setBookings(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
    }
  };
  return (
    <>
      {/* <pre>{JSON.stringify(bookings)}</pre> */}
      <Header />
      <div className="container-fluid bg-secondary p-5 mb-5">
        <h1 className="text-center">Your Booking History</h1>
      </div>
      <div className="container text-center">
        {bookings.map((b) => (
          <BookingHistory booking={b} />
        ))}
        <br />
        <Pagination page={page} pages={pages} changePage={setPage} />
      </div>
    </>
  );
}
