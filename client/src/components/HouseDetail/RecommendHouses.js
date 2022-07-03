import React from "react";
import HouseItem from "../HouseItem/HouseItem";
import Slider from "react-slick";
import { settingsReactSlick } from "../../utils";

export default function RecommendHouses({ similarHouse }) {
  return (
    <div className="container mt-5">
      <hr />
      <h3 className="text-center"> Recommended Homestays For You </h3>
      <hr />
      <Slider {...settingsReactSlick}>
        {similarHouse.map((h) => (
          <div className="">
            <HouseItem key={h._id} h={h} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
