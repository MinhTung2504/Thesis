import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  acceptBooking,
  checkoutBooking,
  getBookingOfHostHouses,
  rejectBooking,
} from "../../../../actions/booking";
import { sendEmail } from "../../../../actions/email";
import { BOOKING_STATUS, formatCurrency, formatDate } from "../../../../utils";
import Pagination from "../../../Pagination/Pagination";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ManageBookings() {
  const { auth } = useSelector((state) => ({ ...state }));
  const pageNumber = useParams().pageNumber || 1;
  const { token } = auth;
  // console.log(pageNumber);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  // console.log(page);

  useEffect(() => {
    loadBookingsOfHostHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBookingsOfHostHouses = async () => {
    setLoading(true);
    try {
      const res = await getBookingOfHostHouses(token, page);

      setBookings(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
    }
  };

  const sendEmailToNotify = async (data) => {
    await sendEmail(token, data);
  };

  const handleAcceptBooking = async (bookingId, data) => {
    if (!window.confirm("Are you sure?")) return;
    acceptBooking(token, { status: BOOKING_STATUS.NOT_PAID }, bookingId).then(
      (res) => {
        toast.success("Accept Booking Successfully!");
        sendEmailToNotify(data);
      }
    );
  };
  const handleRejectBooking = async (bookingId, data) => {
    if (!window.confirm("Are you sure?")) return;
    rejectBooking(token, { status: BOOKING_STATUS.REJECTED }, bookingId).then(
      (res) => {
        toast.success("Reject Booking Successfully!");
        sendEmailToNotify(data);
      }
    );
  };
  const handleCheckoutBooking = async (bookingId, data) => {
    if (!window.confirm("Are you sure?")) return;
    checkoutBooking(
      token,
      { status: BOOKING_STATUS.COMPLETED },
      bookingId
    ).then((res) => {
      toast.success("Checkout Booking Successfully!");
      sendEmailToNotify(data);
    });
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Header />
          <div className="content">
            <Container fluid>
              <Row>
                <Col md="12">
                  <Card className="striped-tabled-with-hover">
                    <Card.Header>
                      <Card.Title as="h4">All Bookings</Card.Title>
                      <p className="card-category">
                        Table list of all Bookings
                      </p>
                    </Card.Header>
                    {/* <Card.Body className="table-full-width table-responsive px-0"> */}
                    <div className="table-responsive">
                      <table class="table table-hover table-striped">
                        <thead className="table-light">
                          <tr
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <th scope="col">ID</th>
                            <th scope="col">House</th>
                            <th scope="col">Price</th>
                            <th scope="col">Guest's Name</th>
                            <th scope="col">Date Checkin</th>
                            <th scope="col">Date Checkout</th>
                            <th scope="col">Total Payment</th>
                            <th scope="col">Status</th>
                            <th scope="col" colSpan="2">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {bookings.map((b, index) => (
                          <tbody
                            key={b._id}
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <tr key={b._id}>
                              <th scope="row">{index + 1}</th>
                              {/* <td>{index + 1}</td> */}
                              <td>{b.house.title}</td>
                              <td>{formatCurrency(b.house.price)}</td>
                              <td>{b.user.name}</td>
                              <td>{formatDate(new Date(b.date_check_in))}</td>
                              <td>{formatDate(new Date(b.date_check_out))}</td>
                              <td>{formatCurrency(b.payment)}</td>
                              <td>
                                <strong>{b.status.toUpperCase()}</strong>
                              </td>
                              {b.status === "pending" && (
                                <>
                                  <td>
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        handleAcceptBooking(b._id, {
                                          email: b.user.email,
                                          subject: `ACCEPTED YOUR BOOKING FOR ${b.house.title}`,
                                          content: `You can check it following this link: ${process.env.REACT_APP_URL}/user-booking. Thank you!`,
                                        });
                                        loadBookingsOfHostHouses();
                                      }}
                                    >
                                      <i class="fa-solid fa-circle-check"></i>
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        handleRejectBooking(b._id, {
                                          email: b.user.email,
                                          subject: `REJECTED YOUR BOOKING FOR ${b.house.title}`,
                                          content: `You can check it following this link: ${process.env.REACT_APP_URL}/user-booking. Thank you!`,
                                        });
                                        loadBookingsOfHostHouses();
                                      }}
                                    >
                                      <i class="fa-solid fa-circle-xmark"></i>
                                    </button>
                                  </td>
                                </>
                              )}
                              {(b.status === "completed" ||
                                b.status === "rejected") && (
                                  <>
                                    <td colSpan="2"></td>
                                  </>
                                )}
                              {(b.status === "not-paid" ||
                                b.status === "paid") && (
                                  <>
                                    <td colSpan="2">
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                          handleCheckoutBooking(b._id, {
                                            email: b.user.email,
                                            subject: `CHECKOUT SUCCESSFULLY YOUR BOOKING FOR ${b.house.title}`,
                                            content: `You can check it following this link: ${process.env.REACT_APP_URL}/user-booking. Thank you!`,
                                          });
                                          loadBookingsOfHostHouses();
                                        }}
                                      >
                                        <i class="fa-solid fa-right-from-bracket"></i>
                                      </button>
                                    </td>
                                  </>
                                )}
                            </tr>
                          </tbody>
                        ))}
                      </table>
                      <Pagination
                        page={page}
                        pages={pages}
                        changePage={setPage}
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
