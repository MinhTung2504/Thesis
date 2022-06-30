import React from "react";
import { formatDate } from "../../../utils";

export default function ListRequest({ request }) {
  return (
    <div className="container mb-2">
      <div
        className="row justify-content-center"
        style={{
          boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px",
          borderRadius: "5px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div className="col-md-1 my-auto mx-auto ">
          {request && request.status === "pending" && (
            <h5 className="text-warning">
              <strong>Pending</strong>
            </h5>
          )}
          {request && request.status === "rejected" && (
            <h5 className="text-danger">
              <strong>Rejected</strong>
            </h5>
          )}
          {request && request.status === "accepted" && (
            <h5 className="text-success">
              <strong>accepted</strong>
            </h5>
          )}
        </div>
        <div className="col-md-3 justify-content-center my-auto">
          <h5>{request && request.content}</h5>
        </div>
        <div className="col-md-4 my-auto">
          <div className="row">
            <div className="form-group col-md-6">
              <p>
                <b>Requested At: </b>{" "}
              </p>
              <p>{formatDate(new Date(request.createdAt))}</p>
            </div>
            <div className="form-group col-md-6">
              <p>
                <b>Checked At: </b>{" "}
              </p>
              <p>
                {request.updatedAt > request.createdAt ? (
                  formatDate(new Date(request.updatedAt))
                ) : (
                  <h5>Haven't checked</h5>
                )}
              </p>
            </div>
          </div>
        </div>
        {request.status === "rejected" && (
          <div className="col-md-2 my-auto" style={{ textAlign: "center" }}>
            <div className="row mb-3">
              <button className="btn btn-cancel text-black">
                Request again
              </button>
            </div>
          </div>
        )}
        {request.status === "accepted" && (
          <div className="col-md-2 my-auto" style={{ textAlign: "center" }}>
            <div className="row">
              <h5 className="text-success">You was a host</h5>
            </div>
          </div>
        )}
        {request.status === "pending" && (
          <div className="col-md-2 my-auto" style={{ textAlign: "center" }}>
            <div className="row">
              <h5 className="text-warning">Your request is pending</h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
