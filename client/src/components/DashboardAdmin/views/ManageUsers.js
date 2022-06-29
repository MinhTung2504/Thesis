import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { banUser, getUsers, unbanUser } from "../../../actions/user";
import { BOOLEAN_STATUS, formatDate } from "../../../utils";
import DialogConfirm from "../../DialogConfirm";
import Pagination from "../../Pagination/Pagination";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

export default function ManageUsers() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const pageNumber = useParams().pageNumber || 1;
  // console.log(pageNumber);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    loadAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadAllUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers(token, page);
      console.log(res.data.data);
      setUsers(res.data.data);
      setLoading(false);
      setPages(res.data.pages);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
    }
  };

  const handleBanUser = async (userId) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    banUser(token, { isBanned: BOOLEAN_STATUS.TRUE }, userId).then((res) => {
      toast.success("User Banned!");
      loadAllUsers();
    });
  };

  const handleUnbanUser = async (userId) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    unbanUser(token, { isBanned: BOOLEAN_STATUS.FALSE }, userId).then((res) => {
      toast.success("User Unbanned!");
      loadAllUsers();
    });
  };

  console.log(confirmDialog.isOpen);

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
                              <td>
                                {user.birthday !== null &&
                                  formatDate(new Date(user.birthday))}
                              </td>
                              <td>
                                {user.isBanned === true ? (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setConfirmDialog({
                                        isOpen: true,
                                        title:
                                          "Are you sure to unban this user?",
                                        subTitle:
                                          "You can't undo this operation",
                                        onConfirm: () => {
                                          handleUnbanUser(user._id);
                                        },
                                      });
                                    }}
                                  >
                                    <i class="fa-solid fa-user"></i>
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      setConfirmDialog({
                                        isOpen: true,
                                        title: "Are you sure to ban this user?",
                                        subTitle:
                                          "You can't undo this operation",
                                        onConfirm: () => {
                                          handleBanUser(user._id);
                                        },
                                      });
                                    }}
                                  >
                                    <i class="fa-solid fa-user-slash"></i>
                                  </button>
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
            <Pagination page={page} pages={pages} changePage={setPage} />
          </div>
        </div>
      </div>
      <DialogConfirm
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
