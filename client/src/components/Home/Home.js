import React from "react";
import { Carousel } from "react-bootstrap";
import image1 from "../../assets/images/carousel-1.jpg";
import image2 from "../../assets/images/carousel-2.jpg";
import image3 from "../../assets/images/carousel-3.jpg";
import HouseList from "../HouseList/HouseList";

export default function Home() {
  return (
    <>
      {/* <div className="container-fluid p-5 text-center">
        <h1>All hotels</h1>
      </div> */}
      <Carousel fade>
        <Carousel.Item
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            objectFit: "contain",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            src={image1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Friendly Homestay</h3>
            <p>With the price is extremely suitable for your travel.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            objectFit: "contain",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            src={image2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Friendly Homestay</h3>
            <p>With the price is extremely suitable for your travel.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            objectFit: "contain",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            src={image3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Friendly Homestay</h3>
            <p>With the price is extremely suitable for your travel.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <HouseList />
    </>
  );
}
