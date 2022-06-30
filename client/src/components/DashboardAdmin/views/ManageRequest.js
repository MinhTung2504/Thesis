import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEmail } from "../../../actions/email";
import {
  acceptRequest,
  adminGetAllRequests,
  rejectRequest,
} from "../../../actions/requestToBecomeHost";
import { banUser, getUsers, unbanUser } from "../../../actions/user";
import { BOOLEAN_STATUS, formatDate, REQUEST_STATUS } from "../../../utils";
import DialogConfirm from "../../DialogConfirm";
import Pagination from "../../Pagination/Pagination";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

export default function ManageRequest() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const pageNumber = useParams().pageNumber || 1;
  // console.log(pageNumber);
  const [requests, setRequests] = useState([]);
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
    loadAllRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadAllRequests = async () => {
    setLoading(true);
    try {
      const res = await adminGetAllRequests(token, page);
      console.log(res.data.data);
      setRequests(res.data.data);
      setLoading(false);
      setPages(res.data.pages);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
    }
  };

  const sendEmailToNotify = async (data) => {
    await sendEmail(token, data);
  };

  const handleAcceptRequest = async (requestId, data, emailData) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    acceptRequest(token, data, requestId).then((res) => {
      toast.success("Request Accepted!");
      loadAllRequests();
      sendEmailToNotify(emailData);
    });
  };

  const handleRejectRequest = async (requestId, data, emailData) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    rejectRequest(token, data, requestId).then((res) => {
      toast.success("Request Rejected!");
      loadAllRequests();
      sendEmailToNotify(emailData);
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
                      <Card.Title as="h4">All Requests</Card.Title>
                      <p className="card-category">
                        Table list of all user's requests to become hosts
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
                            <th scope="col">Content</th>
                            <th scope="col">Created At</th>
                            <th scope="col" colSpan={2}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {requests.map((r, index) => (
                          <tbody
                            key={r._id}
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <tr key={r._id}>
                              <th scope="row">{index + 1}</th>
                              {/* <td>{index + 1}</td> */}
                              <td>{r.user.name}</td>
                              <td>{r.user.email}</td>
                              <td>{r.content}</td>
                              <td>
                                {r.createdAt !== null &&
                                  formatDate(new Date(r.createdAt))}
                              </td>
                              {r.status === "pending" && (
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    style={{ marginRight: "5px" }}
                                    onClick={() => {
                                      setConfirmDialog({
                                        isOpen: true,
                                        title:
                                          "Are you sure to accept this request?",
                                        subTitle:
                                          "You can't undo this operation",
                                        onConfirm: () => {
                                          handleAcceptRequest(
                                            r._id,
                                            {
                                              status: REQUEST_STATUS.ACCEPTED,
                                              user: r.user._id,
                                            },
                                            {
                                              email: r.user.email,
                                              subject: `ACCEPTED YOUR REQUEST FOR BECOMING A HOST`,
                                              content: `You can check it following this link: ${process.env.REACT_APP_URL}/user-request-become-host. Thank you!`,
                                            }
                                          );
                                        },
                                      });
                                    }}
                                  >
                                    <i class="fa-solid fa-check"></i>
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      setConfirmDialog({
                                        isOpen: true,
                                        title:
                                          "Are you sure to reject this request?",
                                        subTitle:
                                          "You can't undo this operation",
                                        onConfirm: () => {
                                          handleRejectRequest(
                                            r._id,
                                            {
                                              status: REQUEST_STATUS.REJECTED,
                                            },
                                            {
                                              email: r.user.email,
                                              subject: `REJECTED YOUR REQUEST FOR BECOMING A HOST`,
                                              content: `You can check it following this link: ${process.env.REACT_APP_URL}/user-request-become-host. Thank you!`,
                                            }
                                          );
                                        },
                                      });
                                    }}
                                  >
                                    <i class="fa-solid fa-xmark"></i>
                                  </button>
                                </td>
                              )}
                              {r.status === "accepted" && <td>Accepted</td>}
                              {r.status === "rejected" && <td>Rejected</td>}
                            </tr>
                          </tbody>
                        ))}
                      </table>
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
