import React from "react";
import { Rate } from "antd";

export default function BookingHistory() {
  return (
    <div className="container">
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
          <h5 className="text-success">
            <strong>Completed</strong>
          </h5>
        </div>
        <div className="col-md-3 justify-content-center my-auto">
          <h5>Dragon Bridge View Apartment</h5>
          <img
            style={{ width: "90%", borderRadius: "5px" }}
            // src={house.image}
            src="https://cdn.luxstay.com/rooms/70226/large/TA703152.jpg"
            alt="houseCheckBookingImg"
          />
        </div>
        <div className="col-md-4 my-auto">
          <div className="row">
            <div className="form-group col-md-6">
              <p>Check-in Date: </p>
              <p>12/05/2022</p>
              <p>Booked At: </p>
              <p>12/05/2022</p>
            </div>
            <div className="form-group col-md-6">
              <p>Check-out Date: </p>
              <p>12/05/2022</p>
              <p>Total: </p>
              <p>500.000 vnd</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 my-auto" style={{ textAlign: "center" }}>
          <div>
            <b>
              <div className="row mb-3 ">
                <button className="btn btn-success">Book again</button>
              </div>
              <div className="row">
                <div>
                  {/* <p>Guest's Name: </p> */}
                  <Rate />
                </div>
              </div>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}
