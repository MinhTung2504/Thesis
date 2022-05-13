import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";
import "./HouseItem.css";

export default function HouseItem({ h }) {
  return (
    <Link className="listItem__room-list" to={`/house/${h._id}`}>
      <div className="col">
        <div key={h.id} className="card" style={{ height: "600px" }}>
          <img
            src={h.image}
            alt="card-img-top"
            className="card-img-top"
            style={{ width: "100%", height: "50%" }}
          />
          <div className="card-body text-dark">
            <h3 className="card-title" style={{ fontSize: "1.5rem" }}>
              {h.title}
            </h3>
            <p className="card-text">Price: {formatCurrency(h.price)}</p>
            <p className="card-text">City: {h.city}</p>{" "}
            <p className="card-text">Max Guests: {h.max_guests}</p>
            <p className="card-text">Property Size: {h.size} m2</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
