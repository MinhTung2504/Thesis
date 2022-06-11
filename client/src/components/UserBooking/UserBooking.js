import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cancelBooking, getUserBooking } from "../../actions/booking";
import { sendEmail } from "../../actions/email";
import { createFeedback } from "../../actions/feedback";
import { BOOKING_STATUS } from "../../utils";
import Header from "../Header/Header";
import Pagination from "../Pagination/Pagination";
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
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  // console.log(page);
  useEffect(() => {
    loadUserBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  const loadUserBooking = async () => {
    setLoading(true);
    try {
      const res = await getUserBooking(token, page, status);
      // console.log(res);
      // const { data, pages: totalPages } = await res.json();

      setPages(res.data.pages);
      setBookings(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
      // setError(true);
    }
  };
  const sendEmailToNotify = async (data) => {
    await sendEmail(token, data);
  };

  const handleCancelBooking = async (bookingId, data) => {
    if (!window.confirm("Are you sure?")) return;
    cancelBooking(token, { status: BOOKING_STATUS.CANCELED }, bookingId).then(
      (res) => {
        toast.success("Cancel Booking Successfully!");
        sendEmailToNotify(data);
        loadUserBooking();
      }
    );
  };

  const handleSendFeedback = async (data) => {
    try {
      let res = await createFeedback(token, data);
      console.log(res);
      toast.success("Your feedback is sent");
      loadUserBooking();
      setTimeout(() => window.location.reload(), 0)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  }
  return (
    <>
      {loading ? (
        <h1> Loading...</h1>
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <>
          <Header />
          <div className="container-fluid bg-secondary p-5 mb-5">
            <h1 className="text-center">Your Booking History</h1>
          </div>
          <div className="container mb-5">
            <label class="text-muted">Sort by Status</label>
            <select
              name="filter"
              id="sort"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="status=pending">Pending</option>
              <option value="status=not-paid">Not-Paid</option>
              <option value="status=paid">Paid</option>
              <option value="status=rejected">Rejected</option>
              <option value="status=completed">Completed</option>
            </select>
          </div>
          <div className="container text-center">
            {bookings.map((b) => (
              <BookingHistory booking={b} key={b._id} handleCancelBooking={handleCancelBooking} handleSendFeedback={handleSendFeedback} />
            ))}
            <br />
            <Pagination page={page} pages={pages} changePage={setPage} />
          </div>
        </>
      )}
      ;
    </>
  );
}
