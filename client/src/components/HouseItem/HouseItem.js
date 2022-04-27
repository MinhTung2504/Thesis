import React from "react";
import { Link } from "react-router-dom";
import "./HouseItem.css";

export default function HouseItem({ h }) {
  return (
    <Link className="listItem__room-list" to={`/house/${h._id}`}>
      <li key={h.id}>
        <img src={h.image} alt="" />
        <div className="listItem__room-info">
          <h3 className="listItem__room-info_title">{h.title}</h3>
          <span className="listItem__room-info_price">Price: {h.price}</span>
          <span>City: {h.city}</span> <span>sss</span>
        </div>
      </li>
    </Link>
  );
}
