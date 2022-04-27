import React, { useState, useEffect } from "react";
import { getAllHouses } from "../../actions/house";
import HouseItem from "../HouseItem/HouseItem";
import "./HouseList.css";

export default function HouseList() {
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    loadAllHouses();
  }, []);
  const loadAllHouses = async () => {
    let res = await getAllHouses();
    console.log(res);
    setHouses(res.data);
  };
  return (
    // <div class="card-group">
    //   {houses.map((h) => (
    //     <HouseItem key={h._id} h={h} />
    //   ))}
    // </div>
    <div className="container listItem">
      <div className="listItem__title">
        <h2>Gợi ý khám phá</h2>
        <p>
          Để mỗi chuyến đi là một hành trình truyền cảm hứng, mỗi căn phòng là
          một khoảng trời an yên
        </p>
      </div>
      <ul className="listItem__room">
        {houses.map((h) => (
          <HouseItem key={h._id} h={h} />
        ))}
      </ul>
    </div>
  );
}
