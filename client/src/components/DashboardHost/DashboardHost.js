import React from "react";
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

export default function DashboardHost() {
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Header />
          <div className="content">
            <Container fluid>
              <Row>
                {/* <Col lg="3" sm="6">
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i className="fa-solid fa-user text-warning"></i>
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">Number</p>
                            <Card.Title as="h4">150GB</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-redo mr-1"></i>
                        Update Now
                      </div>
                    </Card.Footer>
                  </Card>
                </Col> */}
                <Col lg="4" sm="6">
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
                            <Card.Title as="h4">{formatCurrency(5500000)}</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="far fa-calendar-alt mr-1"></i>
                        Last day
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg="4" sm="6">
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="5">
                          <div className="icon-big text-center icon-warning">
                            {/* <i className="nc-icon nc-vector text-danger"></i> */}
                            <i class="fa-solid fa-house text-danger"></i>
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">Total Houses</p>
                            <Card.Title as="h4">23</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="far fa-clock-o mr-1"></i>
                        In the last hour
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg="4" sm="6">
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="5">
                          <div className="icon-big text-center icon-warning">
                            {/* <i className="nc-icon nc-favourite-28 text-primary"></i> */}
                            <i class="fa-solid fa-clipboard-check text-primary"></i>
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">Total Bookings</p>
                            <Card.Title as="h4">+45K</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-redo mr-1"></i>
                        Update now
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">Users Behavior</Card.Title>
                      <p className="card-category">24 Hours performance</p>
                    </Card.Header>
                    <Card.Body>
                      <div className="ct-chart" id="chartHours">
                        {/* <ChartistGraph
                          data={{
                            labels: [
                              "9:00AM",
                              "12:00AM",
                              "3:00PM",
                              "6:00PM",
                              "9:00PM",
                              "12:00PM",
                              "3:00AM",
                              "6:00AM",
                            ],
                            series: [
                              [287, 385, 490, 492, 554, 586, 698, 695],
                              [67, 152, 143, 240, 287, 335, 435, 437],
                              [23, 113, 67, 108, 190, 239, 307, 308],
                            ],
                          }}
                          type="Line"
                          options={{
                            low: 0,
                            high: 800,
                            showArea: false,
                            height: "245px",
                            axisX: {
                              showGrid: false,
                            },
                            lineSmooth: true,
                            showLine: true,
                            showPoint: true,
                            fullWidth: true,
                            chartPadding: {
                              right: 50,
                            },
                          }}
                          responsiveOptions={[
                            [
                              "screen and (max-width: 640px)",
                              {
                                axisX: {
                                  labelInterpolationFnc: function (value) {
                                    return value[0];
                                  },
                                },
                              },
                            ],
                          ]}
                        /> */}
                      </div>
                    </Card.Body>
                    <Card.Footer>
                      <div className="legend">
                        <i className="fas fa-circle text-info"></i>
                        Open <i className="fas fa-circle text-danger"></i>
                        Click <i className="fas fa-circle text-warning"></i>
                        Click Second Time
                      </div>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-history"></i>
                        Updated 3 minutes ago
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col md="4">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">Email Statistics</Card.Title>
                      <p className="card-category">Last Campaign Performance</p>
                    </Card.Header>
                    <Card.Body>
                      <div
                        className="ct-chart ct-perfect-fourth"
                        id="chartPreferences"
                      >
                        {/* <ChartistGraph
                          data={{
                            labels: ["40%", "20%", "40%"],
                            series: [40, 20, 40],
                          }}
                          type="Pie"
                        /> */}
                      </div>
                      <div className="legend">
                        <i className="fas fa-circle text-info"></i>
                        Open <i className="fas fa-circle text-danger"></i>
                        Bounce <i className="fas fa-circle text-warning"></i>
                        Unsubscribe
                      </div>
                      <hr></hr>
                      <div className="stats">
                        <i className="far fa-clock"></i>
                        Campaign sent 2 days ago
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
