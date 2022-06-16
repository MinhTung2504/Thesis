import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "../DashboardAdmin/Dashboard.css";
import { formatCurrency } from "../../utils";
import { useSelector } from "react-redux";
import { countCompletedBookingYearByHost, countRevenueYearByHost, getAllFeatureByHost } from "../../actions/statisticByHost";
import ChartBooking from "./components/Charts/ChartBooking";
import ChartRevenue from "./components/Charts/ChartRevenue";

export default function DashboardHost() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [bookingStat, setBookingStat] = useState([]);
  const [revenueStat, setRevenueStat] = useState([]);
  const [allFeatures, setAllFeatures] = useState();
  const [yearArray, setYearArray] = useState([]);
  const [yearBooking, setYearBooking] = useState("2022");
  const [yearRevenue, setYearRevenue] = useState("2022");

  useEffect(() => {
    loadBookingsStat();
    loadRevenueByHost();
    loadAllFeatures();
  }, [yearBooking, yearRevenue]);


  const loadBookingsStat = async () => {
    const res = await countCompletedBookingYearByHost(token, yearBooking);
    setBookingStat(res.data.data);
  };

  const loadRevenueByHost = async () => {
    const res = await countRevenueYearByHost(token, yearRevenue);
    console.log(res.data.data);
    setRevenueStat(res.data.data);
    setYearArray(res.data.yearArray)
  };

  const loadAllFeatures = async () => {
    const res = await getAllFeatureByHost(token);
    setAllFeatures(res.data);
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
                <Col lg="3" sm="6">
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="5">
                          <div className="icon-big text-center icon-warning">
                            {/* <i className="nc-icon nc-light-3 text-success"></i> */}
                            <i class="fa-solid fa-sack-dollar text-success"></i>
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">Revenue</p>
                            {allFeatures && (
                              <Card.Title as="h4">
                                {allFeatures &&
                                  formatCurrency(allFeatures.totalRevenue)}
                              </Card.Title>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="far fa-clock-o mr-1"></i>
                        In {revenueStat[0]._id.month.toString() + '-' + revenueStat[0]._id.year.toString()}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg="3" sm="6">
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="5">
                          <div className="icon-big text-center icon-warning">
                            {/* <i className="nc-icon nc-vector text-danger"></i> */}
                            <i class="fa-brands fa-paypal text-primary"></i>
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">Paid Booking</p>
                            {allFeatures && (
                              <Card.Title as="h4">
                                {allFeatures && allFeatures.paidBookings}
                              </Card.Title>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="far fa-clock-o mr-1"></i>
                        In {revenueStat[0]._id.month.toString() + '-' + revenueStat[0]._id.year.toString()}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg="3" sm="6">
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i class="fa-solid fa-house text-danger"></i>
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">Houses</p>
                            {allFeatures && (
                              <Card.Title as="h4">
                                {allFeatures.totalHouse[0].count}
                              </Card.Title>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        {/* <i className="fas fa-redo mr-1"></i>
                        Update Now */}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg="3" sm="6">
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i class="fa-solid fa-clipboard-check text-info"></i>
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">Completed Bookings</p>
                            {allFeatures && (
                              <Card.Title as="h4">
                                {allFeatures && allFeatures.completedBookings}
                              </Card.Title>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="far fa-clock-o mr-1"></i>
                        All Times
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">Completed Bookings</Card.Title>
                      {/* <p className="card-category">24 Hours performance</p> */}
                      <div className="">
                        <label htmlFor="cities">Choose Year:</label>

                        <select
                          id="cities"
                          name="cities"
                          value={yearRevenue}
                          onChange={(e) => setYearRevenue(e.target.value)}
                          className="btn btn-secondary"
                        >
                          {yearArray.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="" id="chartHours">
                        <ChartBooking bookingStat={bookingStat} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="12">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">Revenue</Card.Title>
                      {/* <p className="card-category">24 Hours performance</p> */}
                      <div className="">
                        <label htmlFor="cities">Choose Year:</label>

                        <select
                          id="cities"
                          name="cities"
                          value={yearRevenue}
                          onChange={(e) => setYearRevenue(e.target.value)}
                          className="btn btn-secondary"
                        >
                          {yearArray.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="" id="chartHours">
                        <ChartRevenue revenueStat={revenueStat} />
                      </div>
                    </Card.Body>

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
