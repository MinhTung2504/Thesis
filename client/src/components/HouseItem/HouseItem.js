import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";
import "./HouseItem.css";

// const number = 12342;
// console.log(
//   number.toLocaleString("vi-VN", {
//     style: "currency",
//     currency: "VND",
//   })
// );
// const formatCurrency = (num) => {
//   return num.toLocaleString("vi-VN", {
//     style: "currency",
//     currency: "VND",
//   });
// };
export default function HouseItem({ h }) {
  return (
    <Link className="listItem__room-list" to={`/house/${h._id}`}>
      <li key={h.id}>
        <img src={h.image} alt="" />
        <div className="listItem__room-info">
          <h3 className="listItem__room-info_title">{h.title}</h3>
          <span className="listItem__room-info_price">
            Price: {formatCurrency(h.price)}
          </span>
          <span>City: {h.city}</span> <span>Max Guests: {h.max_guests}</span>
          <span>Property Size: {h.size} m2</span>
        </div>
      </li>
    </Link>
  );
}
