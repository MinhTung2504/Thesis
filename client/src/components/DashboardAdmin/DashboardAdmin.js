import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./Dashboard.css";
import ChartUser from "./components/Charts/ChartUser";
import { useSelector } from "react-redux";
import {
  getAllFeatureByAdmin,
  getHouseByCities,
  getHouseStatistic,
  getUserStatistic,
} from "../../actions/statistic";
import ChartHouse from "./components/Charts/ChartHouse";
import HouseByCitiesChart from "./components/Charts/HouseByCitiesChart";
import { formatCurrency } from "../../utils";

export default function DashboardAdmin() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [userStat, setUserStat] = useState([]);
  const [houseStat, setHouseStat] = useState([]);
  const [houseByCities, setHouseByCities] = useState([]);
  const [allFeatures, setAllFeatures] = useState();
  const [yearArray, setYearArray] = useState([]);
  const [yearUser, setYearUser] = useState("2021");
  const [yearHouse, setYearHouse] = useState("2021");

  useEffect(() => {
    loadUserStat();
    loadHouseStat();
    loadHouseByCities();
    loadAllFeatures();
  }, [yearUser, yearHouse]);

  const loadUserStat = async () => {
    const res = await getUserStatistic(token, yearUser);
    setUserStat(res.data.data);
    setYearArray(res.data.yearArray);
  };

  const loadHouseStat = async () => {
    const res = await getHouseStatistic(token, yearHouse);
    setHouseStat(res.data.data);
  };

  const loadHouseByCities = async () => {
    const res = await getHouseByCities(token);
    console.log(res);
    setHouseByCities(res.data);
  };

  const loadAllFeatures = async () => {
    const res = await getAllFeatureByAdmin(token);
    console.log(res);
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
                <Col lg="2" sm="6">
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
                            <p className="card-category">Users</p>
                            {allFeatures && (
                              <Card.Title as="h4">
                                {allFeatures.totalUser[0].count}
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
                <Col lg="2" sm="6">
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i class="fa-solid fa-building-user text-secondary"></i>
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">Hosts</p>
                            {allFeatures && (
                              <Card.Title as="h4">
                                {allFeatures && allFeatures.totalHost[0].count}
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
                <Col lg="2" sm="6">
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
                            <p className="card-category">Houses</p>
                            {allFeatures && (
                              <Card.Title as="h4">
                                {allFeatures && allFeatures.totalHouse[0].count}
                              </Card.Title>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        {/* <i className="far fa-clock-o mr-1"></i>
                        In the last hour */}
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
                            {/* <i className="nc-icon nc-light-3 text-success"></i> */}
                            <i class="fa-solid fa-sack-dollar text-success"></i>
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">Paypal</p>
                            {allFeatures && (
                              <Card.Title as="h4">
                                {allFeatures &&
                                  formatCurrency(allFeatures.sumMoneySendHost)}
                              </Card.Title>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats"></div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg="3" sm="6">
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
                            <p className="card-category">Completed Bookings</p>
                            {allFeatures && (
                              <Card.Title as="h4">
                                {allFeatures &&
                                  allFeatures.totalCompletedBooking[0].count}
                              </Card.Title>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats"></div>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">System Users</Card.Title>
                      {/* <p className="card-category">24 Hours performance</p> */}
                      <div className="">
                        <label htmlFor="cities">Choose Year:</label>

                        <select
                          id="cities"
                          name="cities"
                          value={yearUser}
                          onChange={(e) => setYearUser(e.target.value)}
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
                        <ChartUser userStat={userStat} />
                      </div>
                    </Card.Body>
                    {/* <Card.Footer>
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
                    </Card.Footer> */}
                  </Card>
                </Col>
                <Col md="8">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">System Houses</Card.Title>
                      {/* <p className="card-category">24 Hours performance</p> */}
                      <div className="">
                        <label htmlFor="cities">Choose Year:</label>

                        <select
                          id="cities"
                          name="cities"
                          value={yearHouse}
                          onChange={(e) => setYearHouse(e.target.value)}
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
                        <ChartHouse houseStat={houseStat} />
                      </div>
                    </Card.Body>
                    {/* <Card.Footer>
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
                    </Card.Footer> */}
                  </Card>
                </Col>
                <Col md="4">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">System Houses By Cities</Card.Title>
                      {/* <p className="card-category">24 Hours performance</p> */}
                    </Card.Header>
                    <Card.Body>
                      <div className="pb-5 pt-3" id="chartHours">
                        {/* <ChartHouse houseStat={houseStat} /> */}
                        <HouseByCitiesChart houseByCities={houseByCities} />
                      </div>
                    </Card.Body>
                    {/* <Card.Footer>
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
                    </Card.Footer> */}
                  </Card>
                </Col>
              </Row>
              <Row></Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
