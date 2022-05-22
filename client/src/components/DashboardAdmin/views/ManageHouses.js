import React, { useEffect, useState } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllHouses } from "../../../actions/house";
import { formatCurrency } from "../../../utils";
import Pagination from "../../Pagination/Pagination";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

export default function ManageHouses() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const pageNumber = useParams().pageNumber || 1;
  // console.log(pageNumber);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  //   console.log(page);

  useEffect(() => {
    loadAllHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadAllHouses = async () => {
    setLoading(true);
    try {
      const res = await getAllHouses(page);
      console.log(res);
      // const { data, pages: totalPages } = await res.json();

      setPages(res.data.pages);
      // setHouses(res.data);
      //   setHouses(res.data.data);
      setHouses(res.data.data);
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
                      <Card.Title as="h4">All Houses</Card.Title>
                      <p className="card-category">Table list of all Houses</p>
                    </Card.Header>
                    {/* <Card.Body className="table-full-width table-responsive px-0"> */}
                    <div className="table-responsive">
                      <table class="table table-hover table-striped">
                        <thead className="table-light">
                          <tr
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">House Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">City</th>
                            <th scope="col">Max Guests</th>
                            <th scope="col">Number of Bedrooms</th>
                            <th scope="col">Property Size</th>
                            <th scope="col">Number of Beds</th>
                            <th scope="col">Host</th>
                            {/* <th scope="col">Hidden/Show</th> */}
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        {houses.map((h, index) => (
                          <tbody
                            key={h._id}
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <tr key={h._id}>
                              <th scope="row">{index + 1}</th>
                              {/* <td>{h.country}</td> */}
                              <td>
                                <img
                                  src={h.image}
                                  key={h._id}
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                  }}
                                  alt="ImageHouse"
                                />
                              </td>
                              <td>{h.title}</td>
                              <td>{formatCurrency(h.price)}</td>
                              <td>{h.city}</td>
                              <td>{h.max_guests}</td>
                              <td>{h.num_bedrooms}</td>
                              <td>{h.size} m2</td>
                              <td>{h.num_beds}</td>
                              <td>Name of Host</td>

                              {h.isBlocked === true ? (
                                <td>
                                  <Link to={`/house/ban/${h._id}`}>
                                    <button className="text-primary">
                                      Unban House
                                    </button>
                                  </Link>
                                </td>
                              ) : (
                                <td>
                                  <Link to={`/house/ban/${h._id}`}>
                                    <button className="text-danger">
                                      Ban House
                                    </button>
                                  </Link>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        ))}
                      </table>
                      {/* </ul> */}
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
