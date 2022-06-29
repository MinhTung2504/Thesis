import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendEmail } from "../../actions/email";
import { getUserRequests } from "../../actions/requestToBecomeHost";
import Header from "../Header/Header";
import ListRequest from "./ListRequest.js/ListRequest";

export default function RequestToBecomeHost() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadUserRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserRequest = async () => {
    const res = await getUserRequests(token);
    // console.log(res.data.data);
    setRequests(res.data.data);
  };
  const sendEmailToNotify = async (data) => {
    await sendEmail(token, data);
  };

  console.log(requests);

  return (
    <>
      <>
        <Header />
        <div className="container-fluid bg-secondary p-5 mb-5">
          <h1 className="text-center">Your Request To Become Host</h1>
        </div>
        {/* <div className="container mb-5">
            <label class="text-muted">Sort by Status</label>
            <select
              name="filter"
              id="sort"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="status=pending">Pending</option>
              <option value="status=not-paid">Not-Paid</option>
              <option value="status=paid">Paid</option>
              <option value="status=rejected">Rejected</option>
              <option value="status=completed">Completed</option>
            </select>
          </div> */}
        <div className="container text-center">
          {requests.length === 0 ? (
            <div>
              <h2>You haven't requested yet</h2>
              <p>
                If you want to send request to become host.{" "}
                <Link className="bold" to="/user-profile">
                  Click Here!
                </Link>
              </p>
            </div>
          ) : (
            requests.map((r) => <ListRequest request={r} key={r._id} />)
          )}
          <br />
          {/* <Pagination page={page} pages={pages} changePage={setPage} /> */}
        </div>
      </>
    </>
  );
}
