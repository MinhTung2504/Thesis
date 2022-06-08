import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  blockHouse,
  getAllHousesByAdmin,
  unlockHouse,
} from "../../../actions/house";
import { formatCurrency, HOUSE_ISBLOCKED } from "../../../utils";
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
      const res = await getAllHousesByAdmin(token, page);
      console.log(res);

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

  const handleBlockHouse = async (houseId) => {
    if (!window.confirm("Are you sure?")) return;
    blockHouse(token, { isBlocked: HOUSE_ISBLOCKED.TRUE }, houseId).then(
      (res) => {
        toast.success("House Blocked!");
        loadAllHouses();
      }
    );
  };

  const handleUnlockHouse = async (houseId) => {
    if (!window.confirm("Are you sure?")) return;
    unlockHouse(token, { isBlocked: HOUSE_ISBLOCKED.FALSE }, houseId).then(
      (res) => {
        toast.success("House Unlocked!");
        loadAllHouses();
      }
    );
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
                            <th scope="col">No. Bedrooms</th>
                            <th scope="col">Area</th>
                            <th scope="col">No. Beds</th>
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
                              <td>{h.size} (m2)</td>
                              <td>{h.num_beds}</td>
                              <td>{h.host.name}</td>

                              {h.isBlocked === true ? (
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      handleUnlockHouse(h._id);
                                      loadAllHouses();
                                    }}
                                  >
                                    <i class="fa-solid fa-lock-open"></i>
                                  </button>
                                </td>
                              ) : (
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      handleBlockHouse(h._id);
                                    }}
                                  >
                                    <i class="fa-solid fa-lock"></i>
                                  </button>
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
