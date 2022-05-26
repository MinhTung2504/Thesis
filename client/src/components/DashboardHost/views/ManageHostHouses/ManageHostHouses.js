import React, { useEffect, useState } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteHouse, getHostHouses } from "../../../../actions/house";
import { formatCurrency } from "../../../../utils";
import Pagination from "../../../Pagination/Pagination";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ManageHostHouses() {
  const pageNumber = useParams().pageNumber || 1;
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // console.log(pageNumber);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  // console.log(page);

  useEffect(() => {
    loadHostHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadHostHouses = async () => {
    setLoading(true);
    try {
      const res = await getHostHouses(token, page);
      console.log(res);
      // const { data, pages: totalPages } = await res.json();

      setPages(res.data.pages);
      // setHouses(res.data);
      setHouses(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
    }
  };

  const handleHouseDelete = async (houseId) => {
    if (!window.confirm("Are you sure?")) return;
    deleteHouse(token, houseId).then((res) => {
      toast.success("House Deleted!");
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
                    <Row>
                      <Col md="10">
                        <Card.Header>
                          <Card.Title as="h4">All Host's Houses</Card.Title>
                          <p className="card-category">
                            Table list of all Host's Houses
                          </p>
                        </Card.Header>
                      </Col>
                      <Col md="2">
                        <Card.Header>
                          <Link
                            to="/host/houses/new"
                            className="btn btn-primary"
                          >
                            <i class="fa-solid fa-plus"></i>
                          </Link>
                        </Card.Header>
                      </Col>
                    </Row>
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
                            <th scope="col">No. Bedrooms</th>
                            <th scope="col">Area</th>
                            <th scope="col">No. Beds</th>
                            <th scope="col" colSpan={3}>
                              Actions
                            </th>
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

                              <td>
                                <img
                                  src={h.image}
                                  key={h._id}
                                  style={{
                                    width: "10rem",
                                    height: "5rem",
                                  }}
                                  alt="ImageHouse"
                                />
                              </td>
                              <td>{h.title}</td>
                              <td>{formatCurrency(h.price)}</td>
                              <td>{h.city}</td>
                              <td>{h.max_guests}</td>
                              <td>{h.num_bedrooms}</td>
                              <td>{h.size} (m2)</td>
                              <td>{h.num_beds}</td>

                              <td>
                                <Link to={`/host/houses/edit/${h._id}`}>
                                  <button className="btn btn-primary">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                  </button>
                                </Link>
                              </td>

                              <td>
                                <button
                                  onClick={() => {
                                    handleHouseDelete(h._id);
                                    loadHostHouses();
                                  }}
                                  className="btn btn-danger"
                                >
                                  <i class="fa-solid fa-trash-can"></i>
                                </button>
                              </td>
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
