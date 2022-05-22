import React, { useEffect, useState } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../../actions/user";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

export default function ManageUsers() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // console.log(pageNumber);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //   const [page, setPage] = useState(pageNumber);
  //   const [pages, setPages] = useState(1);
  // console.log(page);

  useEffect(() => {
    loadAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers(token);
      console.log(res);
      // const { data, pages: totalPages } = await res.json();

      //   setPages(res.data.pages);
      // setHouses(res.data);
      //   setHouses(res.data.data);
      setUsers(res.data);
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
                      <Card.Title as="h4">All Users</Card.Title>
                      <p className="card-category">
                        Table list of all system's users
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
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Country</th>
                            <th scope="col">City</th>
                            <th scope="col">Role</th>
                            <th scope="col">Birthday</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        {users.map((user, index) => (
                          <tbody
                            key={user._id}
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <tr key={user._id}>
                              <th scope="row">{index + 1}</th>
                              {/* <td>{index + 1}</td> */}
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.country}</td>
                              <td>{user.city}</td>
                              <td>{user.role}</td>
                              <td>{user.birthday}</td>
                              <td>
                                {user.isBanned === true ? (
                                  <Link
                                    className="text-primary"
                                    to={"ban-user"}
                                  >
                                    <button>Unban User</button>
                                  </Link>
                                ) : (
                                  <Link className="text-danger" to={"ban-user"}>
                                    <button>Ban User</button>
                                  </Link>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                        {/* </Table> */}
                      </table>
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
