import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBookingOfHostHouses } from "../../../../actions/booking";
import { formatCurrency, formatDate } from "../../../../utils";
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
      console.log(res);
      // const { data, pages: totalPages } = await res.json();

      //   setPages(res.data.pages);
      // setHouses(res.data);
      //   setHouses(res.data.data);
      setBookings(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
    }
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
                            <th scope="col" colspan="2">
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
                              <td>{b.status}</td>
                              {/* <td> */}
                              {b.status === "pending" && (
                                <>
                                  <td>
                                    {/* <Link
                                      className="text-primary"
                                      to={"accept-booking"}
                                    > */}
                                    <button className="text-primary">
                                      <i class="fa-solid fa-circle-check"></i>
                                    </button>
                                    {/* </Link> */}
                                  </td>
                                  <td>
                                    {/* <Link
                                      className="text-danger"
                                      to={"reject-booking"}
                                    > */}
                                    <button className="text-danger">
                                      <i class="fa-solid fa-circle-xmark"></i>
                                    </button>
                                    {/* </Link> */}
                                  </td>
                                </>
                              )}
                              {b.status === "completed" && (
                                <>
                                  <td colSpan="2">
                                    <button disabled className="text-success">
                                      Completed
                                    </button>
                                  </td>
                                </>
                              )}
                              {(b.status === "not-paid" ||
                                b.status === "paid") && (
                                <>
                                  <td colSpan="2">
                                    <Link
                                      className="text-primary"
                                      to={"checkout-booking"}
                                    >
                                      <button>Check out</button>
                                    </Link>
                                  </td>
                                </>
                              )}
                              {/* </td> */}
                            </tr>
                          </tbody>
                        ))}
                        {/* </Table> */}
                      </table>
                      <Pagination
                        page={page}
                        pages={pages}
                        changePage={setPage}
                      />
                      {/* </Card.Body> */}
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
