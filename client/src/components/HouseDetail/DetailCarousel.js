import React from "react";
import { Carousel } from "react-responsive-carousel";

export default function DetailCarousel({ data }) {
  return (
    <>
      <Carousel centerMode={true} showThumbs={false}>
        {data &&
          data.map((image) => (
            <div key={image}>
              <img src={image} alt={image} />
              <p className="legend">Nice Homestay</p>
            </div>
          ))}
      </Carousel>
    </>
  );
}
